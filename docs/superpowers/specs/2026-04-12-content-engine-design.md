# Content Engine — News Scraping, Blog, Social Media & Newsletter

## Overview

Automated content pipeline that scrapes Portuguese credit/housing market news, uses Gemini AI to generate blog posts, social media variants, and weekly newsletters — all reviewed via a dashboard before publishing.

**Goal:** Consistent 2-3x/week content output across blog, LinkedIn, Instagram, and email newsletter with minimal manual effort.

## Architecture

```
Sources (6+ categories)
    ↓ Cron Mon/Wed/Fri 7:00
[Step 1: Scrape] → news_raw (Supabase)
    ↓ Cron Mon/Wed/Fri 7:30
[Step 2: Generate] → news_content (Supabase) as "draft"
    ↓ Cron Friday 8:00
[Step 3: Newsletter compile] → newsletter draft
    ↓
ContentFlow Dashboard (emailflow) → Paulo reviews → approve/edit/reject
    ↓
Published content ← fetched by landing page blog via API (ISR)
    ↓
/blog on meuintermediario.com + social copy + weekly newsletter
```

**Key principle:** Nothing goes live without human approval. AI drafts, humans publish.

---

## 1. Data Model (Supabase)

### `news_sources`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| name | text | "Banco de Portugal", "Idealista", etc. |
| url | text | Base URL or feed URL |
| category | enum | regulatory, market, media, stats, corporate, government |
| scrape_config | jsonb | CSS selectors, pagination rules, or "firecrawl" flag |
| active | boolean | Whether to include in scrape runs |
| last_scraped_at | timestamptz | |
| created_at | timestamptz | |

### `news_raw`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| source_id | uuid FK | → news_sources |
| title | text | Original headline |
| url | text | Original article URL (unique constraint for dedup) |
| content | text | Scraped body text |
| image_url | text | Original article image if found |
| published_at | timestamptz | Original publish date |
| scraped_at | timestamptz | When we scraped it |
| processed | boolean | false until AI generation runs |
| relevant | boolean | null until AI classifies, true/false after |

### `news_content`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| raw_id | uuid FK | → news_raw |
| type | enum | article, bite, linkedin, instagram, newsletter |
| title_pt | text | Portuguese title |
| title_en | text | English title |
| body_pt | text | Full content (markdown) |
| body_en | text | English version |
| summary_pt | text | 1-2 sentence summary |
| seo_slug | text | URL-safe slug |
| seo_description | text | Meta description (150-160 chars) |
| tags | text[] | ["euribor", "crédito habitação", "mercado"] |
| importance | enum | major, minor |
| status | enum | draft, approved, published, rejected |
| approved_by | text | User ID who approved |
| published_at | timestamptz | When it went live |
| created_at | timestamptz | |

### `newsletter_subscribers`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | PK |
| email | text | Unique |
| confirmed | boolean | Double opt-in |
| confirm_token | text | For verification link |
| active | boolean | Can unsubscribe |
| subscribed_at | timestamptz | |

---

## 2. Scraping Pipeline

Three serverless API routes in emailflow, triggered by Vercel Cron.

### Step 1: Scrape (`/api/content/scrape`)
- **Schedule:** Mon/Wed/Fri 7:00 AM Lisbon time
- Iterates active `news_sources`
- Per source: fetch latest articles using source-specific config
  - Simple sources: `fetch` + cheerio (CSS selectors from `scrape_config`)
  - Complex sources: Firecrawl MCP for JavaScript-rendered pages
- Deduplicates by URL against existing `news_raw`
- Stores new articles with `processed: false`, `relevant: null`
- Rate limiting: 2-3 second delay between sources
- **Timeout safety:** Processes sources sequentially, commits after each. If timeout, next run continues from remaining sources.

### Step 2: Generate (`/api/content/generate`)
- **Schedule:** Mon/Wed/Fri 7:30 AM Lisbon time
- Fetches up to 10 unprocessed `news_raw` entries
- Per article, single Gemini 2.5-flash call with structured output:
  1. **Relevance filter:** Is this relevant to credit intermediation / housing market / Portuguese economy? → sets `relevant` field
  2. **Importance classification:** major (full article) or minor (news bite)
  3. **Content generation** (only if relevant):
     - Blog post PT + EN (500-800 words for major, 150-300 for minor)
     - LinkedIn post PT (professional tone, ≤1300 chars, 2-3 hashtags)
     - Instagram caption PT (casual, emojis, ≤2200 chars, hashtags)
     - Newsletter snippet (2-3 sentences for weekly digest)
     - SEO: slug, meta description, tags
  4. **Internal linking suggestions:** References to relevant site sections (#services, #process, /equipa)
- Stores all variants in `news_content` with `status: "draft"`
- Sets `news_raw.processed = true`
- **Timeout safety:** Processes articles one at a time, commits after each.

### Step 3: Newsletter compile (`/api/content/newsletter`)
- **Schedule:** Friday 8:00 AM Lisbon time
- Collects all `news_content` with `status: "approved"` from current week (Mon-Fri)
- If no approved content, collects `status: "draft"` with `importance: "major"` as fallback
- Compiles into newsletter format:
  - Intro paragraph (AI-generated weekly summary)
  - 3-5 article summaries with "Ler mais →" links to blog
  - CTA: "Simular Crédito" button
- Stores as `news_content` entry with `type: "newsletter"`

### AI Prompt Strategy
- System prompt establishes Letraperfeiçoada's brand voice: professional but approachable, Portuguese European (PT-PT, not PT-BR), focused on helping clients understand credit
- Each content type has specific tone/format instructions
- Blog articles must include: source attribution, key takeaway for buyers, relevance to credit intermediation
- Social posts must include: hook in first line, value for the reader, soft CTA

### Source Categories (initial)
| Category | Sources | What to scrape |
|----------|---------|---------------|
| regulatory | Banco de Portugal, ASF | Euribor rates, policy changes, circulars |
| market | Idealista, Imovirtual | Price indices, market reports, trend articles |
| media | Eco, Jornal de Negócios, Dinheiro Vivo | Credit/mortgage/housing articles |
| government | INE, Portal da Habitação | Housing statistics, government programs |
| corporate | Decisões e Soluções | Group news, achievements |
| industry | ANICA, APEMIP | Industry association news |
| literacy | Banco de Portugal (educação), DECO, Todos Contam | Financial literacy content, school programs, consumer education |

---

## 3. ContentFlow Dashboard (emailflow)

New tab in emailflow platform alongside ScriptFlow, EmailFlow, SlideFlow.

### Queue View (default)
- Card grid showing draft content awaiting approval
- Each card: source badge, original headline, AI title, content type pills (article, linkedin, instagram)
- Click → side panel with all variants previewed
- Actions per card: ✅ Approve, ✏️ Edit, ❌ Reject
- Bulk actions: select multiple → approve/reject
- Filters: type, date range, source, tags, status
- Sort: newest first (default), importance, source

### Calendar View
- Week view (Mon-Sun columns)
- Shows content by status: green=published, yellow=approved, gray=draft
- Visual density indicator per day
- Click any item → opens edit panel

### Newsletter View
- Full email preview as recipients will see it
- Edit intro text, reorder/remove articles
- Send test email to self
- Approve + send (triggers Resend)
- Subscriber count display

### Editing Experience
- Side panel with Tiptap rich text editor (already in emailflow)
- Tabs: PT content, EN content
- Below: social variant cards with character counters
  - LinkedIn: 1300 char limit, visual counter
  - Instagram: 2200 char limit, visual counter
- "Regenerate" button → re-runs Gemini with different angle
- "Regenerate as..." → switch between article ↔ bite format
- Preview button → opens blog post preview in new tab

---

## 4. Blog on Landing Page

### Routes
- `/blog` — Index page with article grid
- `/blog/[slug]` — Individual article page

### Blog Index (`/blog`)
- Hero section matching site design (dark theme)
- Eyebrow: "NOTÍCIAS & ANÁLISES"
- Headline: "Mantenha-se informado sobre o mercado de crédito"
- Filter tabs: Todos, Crédito Habitação, Mercado, Euribor, Regulação, Literacia Financeira
- Featured article: large card at top (latest major article)
- Grid: 2-column below, responsive to 1-column on mobile
- Each card: title, date, tags, 2-line summary, reading time
- Pagination (12 per page)
- Newsletter subscribe CTA between rows

### Article Page (`/blog/[slug]`)
- Full article with prose typography
- Reading time estimate
- Source attribution: "Baseado em artigo do [Source Name]" with original link
- Table of contents for major articles (auto-generated from headings)
- Sidebar (desktop):
  - "Simular Crédito" CTA card
  - Related articles (by tag overlap)
  - Agent contact card (random featured agent)
- Social share: LinkedIn, WhatsApp, Copy link, native share on mobile
- "Últimas notícias" grid at bottom (3 related posts)

### Data Flow
- Landing page fetches from Supabase via new API endpoint on emailflow: `GET /api/content/published`
- Supports: `?type=article&status=published&limit=12&offset=0&tag=euribor&lang=pt`
- Landing page uses ISR: revalidate every 30 minutes
- Also exposes on landing page: `GET /api/v1/blog` and `GET /api/v1/blog/[slug]` for AI crawlers

### Homepage Integration
- New "Últimas Notícias" section before footer
- 3 latest published articles as cards
- "Ver todas as notícias →" link to /blog

---

## 5. Newsletter

### Subscriber Collection
- Email input on `/blog` page (below hero)
- Email input in footer (all pages)
- Double opt-in: submit → confirmation email via Resend → click link → confirmed
- RGPD compliant: explicit consent checkbox, unsubscribe link in every email

### Weekly Newsletter
- Compiled every Friday from the week's approved content
- Template: reuses existing email layout (LETRAPERFEIÇOADA header + "Uma Questão de Compromisso")
- Sections:
  - Brief editorial intro (AI-generated, human-edited)
  - 3-5 article summaries with "Ler mais →" to blog
  - "Simular Crédito" CTA
  - Footer with unsubscribe link
- Send: manual trigger from ContentFlow after Paulo approves

### Unsubscribe
- One-click unsubscribe link in every email (RGPD required)
- Sets `newsletter_subscribers.active = false`
- Confirmation page: "Foi removido da nossa newsletter"

---

## 6. Social Media Output

### V1: Copy from Dashboard
- Each approved content piece shows platform-specific copy cards
- LinkedIn card: formatted text with hashtags, "Copy" button
- Instagram card: caption with emojis and hashtags, "Copy" button
- Character counter per platform
- Preview how it will look (approximate)

### V2 (future): Direct API Posting
- LinkedIn API integration (requires business verification)
- Meta/Instagram Graph API (requires Facebook Page + app review)
- Scheduling: pick date/time for each post
- Not in scope for v1

---

## 7. SEO + AI Discoverability

### Per-Article SEO
- Dynamic `<title>`: `{article title} | Letraperfeiçoada Blog`
- `<meta name="description">`: AI-generated, 150-160 chars
- Canonical URL: `https://meuintermediario.com/blog/{slug}`
- Open Graph: title, description, image, type=article, published_time, author, section
- Twitter/X card: summary_large_image

### Structured Data (JSON-LD)
- `Article` schema per post: headline, datePublished, dateModified, author, publisher, image, articleSection
- `BreadcrumbList`: Home → Blog → Article
- `BlogPosting` subtype for news articles
- `FAQPage` on articles with Q&A content (AI detects and generates)
- `WebPage` with speakable for voice search

### Technical SEO
- Dynamic sitemap: `/blog` entries auto-added from Supabase published slugs
- ISR: 30 min blog index, 1 hour articles
- robots.txt: allow `/blog/` for all crawlers + AI bots
- Proper heading hierarchy (single h1, h2/h3 sections)
- AI auto-links relevant terms to other blog posts and service pages
- Image alt text: AI-generated descriptive alt
- Financial literacy content pillar: AI identifies posts suitable for general financial education (not just credit professionals), tags as "literacia-financeira", uses simpler language, explains concepts from scratch. Supports Letraperfeiçoada's school programs and consumer education initiatives. These posts can be repurposed for children/youth financial literacy programs in v2.
- Reading time in structured data

### AI/LLM Discoverability
- Update `llms.txt` with blog section + sample article titles
- Update `/.well-known/agent.json`: add `read:blog` capability
- `GET /api/v1/blog` — published articles as structured JSON
- `GET /api/v1/blog/[slug]` — full article content for AI consumption
- Both with CORS headers + `Cache-Control: public, max-age=1800`

---

## 8. Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| AI model | Gemini 2.5-flash | Already in emailflow, fast, cheap, good at structured output |
| Scraping | fetch + cheerio + Firecrawl fallback | Simple sources don't need headless browser |
| Content format | Markdown in DB, render to HTML | Portable, editable, works with Tiptap |
| Blog rendering | ISR (Next.js) | Static performance + fresh content every 30min |
| Newsletter | Resend | Already integrated and working |
| Cron | Vercel Cron | Free on hobby plan, no infra to manage |
| Auth | Existing emailflow Supabase + Google OAuth | No new auth system |

---

## 9. Not in V1

- AI-generated cover images (noted for v2 — may use DALL-E or Flux)
- Direct social media API posting
- Comment system on blog
- A/B testing on headlines
- Calendar drag-and-drop scheduling
- Multi-language blog content (EN articles are generated but blog page is PT-first)
- RSS feed (easy to add later)
- Podcast/audio version of articles

---

## 10. Dependencies

**Landing page (ds-credito-landing):**
- No new npm dependencies needed
- New routes: `/blog`, `/blog/[slug]`
- New API: `/api/v1/blog`, `/api/v1/blog/[slug]`
- Supabase client (new dependency: `@supabase/supabase-js`)

**Emailflow platform:**
- Already has: Supabase, Gemini SDK, Tiptap, auth
- New: cheerio for scraping (`npm install cheerio`)
- New: Vercel Cron config in `vercel.json`
- New routes: `/api/content/scrape`, `/api/content/generate`, `/api/content/newsletter`, `/api/content/published`
- New UI: ContentFlow tab with queue/calendar/newsletter views
