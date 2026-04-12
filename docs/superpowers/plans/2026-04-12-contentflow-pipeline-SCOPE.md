# ContentFlow Pipeline — Scope Note

> **Status:** Not yet planned. Write full implementation plan before starting.
> **Codebase:** emailflow (DS-Projects/emailflow), NOT ds-credito-landing
> **Depends on:** Plan 1 (Blog Landing Page) Supabase tables must exist first

## What this plan will cover

1. **Scraping pipeline** — 3 cron API routes in emailflow:
   - `/api/content/scrape` — Mon/Wed/Fri 7:00 AM, fetch from 7 source categories
   - `/api/content/generate` — Mon/Wed/Fri 7:30 AM, Gemini AI content generation
   - `/api/content/newsletter` — Friday 8:00 AM, compile weekly digest

2. **ContentFlow dashboard** — New tab in emailflow platform:
   - Queue view (draft review + approve/edit/reject)
   - Calendar view (week overview)
   - Newsletter view (preview + send)
   - Tiptap editing with PT/EN tabs + social variant cards

3. **Source configuration** — Seed `news_sources` table with:
   - Banco de Portugal, ASF (regulatory)
   - Idealista, Imovirtual (market)
   - Eco, Jornal de Negócios, Dinheiro Vivo (media)
   - INE, Portal da Habitação (government)
   - Decisões e Soluções (corporate)
   - ANICA, APEMIP (industry)
   - Todos Contam, DECO (financial literacy)

4. **AI prompt engineering** — Gemini structured output for:
   - Relevance classification
   - Importance scoring (major → article, minor → bite)
   - Blog post PT + EN
   - LinkedIn post PT
   - Instagram caption PT
   - Newsletter snippet
   - SEO metadata + tags
   - Financial literacy tagging

5. **Newsletter send** — Resend integration for weekly digest

6. **Vercel Cron config** — `vercel.json` schedule definitions

## Key dependencies in emailflow
- Supabase client (already configured)
- Gemini SDK `@google/genai` (already installed)
- Tiptap editor (already in use)
- Auth via Google OAuth (already working)
- cheerio (new — for scraping)

## Full spec
See: `docs/superpowers/specs/2026-04-12-content-engine-design.md`
