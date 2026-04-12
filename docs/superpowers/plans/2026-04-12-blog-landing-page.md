# Blog Section — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a blog section to meuintermediario.com that displays published articles from Supabase, with full SEO optimization and AI discoverability.

**Architecture:** Blog pages fetch published content from the shared Supabase instance via `@supabase/supabase-js`. Blog index uses ISR (revalidate 30 min). Article pages use ISR (revalidate 1 hour). Newsletter subscriber collection via a simple Supabase insert + Resend confirmation email. Public JSON API for AI crawlers.

**Tech Stack:** Next.js 15 (App Router), Supabase client, Tailwind CSS 4, Framer Motion, existing design system (brand-900/accent-700 palette)

**Spec:** `docs/superpowers/specs/2026-04-12-content-engine-design.md`

**Depends on:** Supabase tables must exist (created in Plan 2 or manually). This plan includes seed data for development.

---

## File Structure

```
src/
├── lib/
│   ├── supabase.ts                    # Supabase client (new)
│   └── translations.ts               # Add blog + newsletter keys (modify)
├── app/
│   ├── blog/
│   │   ├── page.tsx                   # Blog index (new)
│   │   └── [slug]/
│   │       └── page.tsx               # Article page (new)
│   ├── api/v1/blog/
│   │   ├── route.ts                   # Blog list API (new)
│   │   └── [slug]/
│   │       └── route.ts              # Single article API (new)
│   ├── api/newsletter/
│   │   ├── subscribe/route.ts         # Subscribe endpoint (new)
│   │   └── confirm/route.ts           # Confirm double opt-in (new)
│   ├── sitemap.ts                     # Add blog routes (modify)
│   ├── layout.tsx                     # No changes needed
│   └── page.tsx                       # Add "Últimas Notícias" section (modify)
├── components/
│   ├── BlogCard.tsx                   # Reusable article card (new)
│   ├── BlogHero.tsx                   # Blog index hero section (new)
│   ├── NewsletterSignup.tsx           # Email subscribe form (new)
│   └── LatestNews.tsx                 # Homepage "Últimas Notícias" (new)
├── .well-known/agent.json/route.ts    # Add blog capability (modify)
public/
└── llms.txt                           # Add blog section (modify)
.env.local                             # Add SUPABASE vars (modify)
```

---

### Task 1: Install Supabase and create client utility

**Files:**
- Modify: `package.json`
- Create: `src/lib/supabase.ts`
- Modify: `.env.local`

- [ ] **Step 1: Install @supabase/supabase-js**

```bash
npm install @supabase/supabase-js
```

- [ ] **Step 2: Add Supabase env vars to .env.local**

Add these lines to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://dyknwyxztoixxpdyepdk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from Supabase dashboard or emailflow .env.local>
```

- [ ] **Step 3: Create Supabase client utility**

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions matching the Supabase tables
export interface NewsContent {
  id: string;
  raw_id: string | null;
  type: "article" | "bite" | "linkedin" | "instagram" | "newsletter";
  title_pt: string;
  title_en: string;
  body_pt: string;
  body_en: string;
  summary_pt: string;
  seo_slug: string;
  seo_description: string;
  tags: string[];
  importance: "major" | "minor";
  status: "draft" | "approved" | "published" | "rejected";
  approved_by: string | null;
  published_at: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  confirmed: boolean;
  confirm_token: string;
  active: boolean;
  subscribed_at: string;
}
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/supabase.ts .env.local
git commit -m "feat: install Supabase client and create utility with types"
```

---

### Task 2: Create Supabase tables (SQL migration)

**Files:**
- Create: `supabase/migrations/001_content_engine.sql`

- [ ] **Step 1: Create migration file**

Create `supabase/migrations/001_content_engine.sql`:
```sql
-- News sources configuration
CREATE TABLE IF NOT EXISTS news_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('regulatory', 'market', 'media', 'stats', 'corporate', 'industry', 'literacy')),
  scrape_config JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  last_scraped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Raw scraped articles
CREATE TABLE IF NOT EXISTS news_raw (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_id UUID REFERENCES news_sources(id),
  title TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  processed BOOLEAN DEFAULT false,
  relevant BOOLEAN
);

-- AI-generated content
CREATE TABLE IF NOT EXISTS news_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  raw_id UUID REFERENCES news_raw(id),
  type TEXT NOT NULL CHECK (type IN ('article', 'bite', 'linkedin', 'instagram', 'newsletter')),
  title_pt TEXT NOT NULL,
  title_en TEXT,
  body_pt TEXT NOT NULL,
  body_en TEXT,
  summary_pt TEXT,
  seo_slug TEXT UNIQUE,
  seo_description TEXT,
  tags TEXT[] DEFAULT '{}',
  importance TEXT CHECK (importance IN ('major', 'minor')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'rejected')),
  approved_by TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN DEFAULT false,
  confirm_token TEXT,
  active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for blog queries
CREATE INDEX IF NOT EXISTS idx_news_content_status ON news_content(status);
CREATE INDEX IF NOT EXISTS idx_news_content_type_status ON news_content(type, status);
CREATE INDEX IF NOT EXISTS idx_news_content_slug ON news_content(seo_slug);
CREATE INDEX IF NOT EXISTS idx_news_content_published ON news_content(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_content_tags ON news_content USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_news_raw_processed ON news_raw(processed);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- RLS policies for public read access to published content
ALTER TABLE news_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published content is publicly readable"
  ON news_content FOR SELECT
  USING (status = 'published' AND type IN ('article', 'bite'));

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for newsletter signup"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);
```

- [ ] **Step 2: Run migration**

Run this SQL in the Supabase dashboard SQL editor (or via CLI if Supabase CLI is installed):
```bash
# If Supabase CLI is available:
npx supabase db push
# Otherwise: copy-paste the SQL into Supabase Dashboard > SQL Editor > Run
```

- [ ] **Step 3: Insert seed data for development**

Run in Supabase SQL editor:
```sql
-- Seed 3 sample published articles for development
INSERT INTO news_content (type, title_pt, title_en, body_pt, body_en, summary_pt, seo_slug, seo_description, tags, importance, status, published_at) VALUES
('article', 'Euribor desce para mínimos de 2 anos — o que significa para o seu crédito', 'Euribor drops to 2-year low — what it means for your mortgage', '## A descida da Euribor

A taxa Euribor a 12 meses desceu para 2,4%, o valor mais baixo dos últimos dois anos. Esta descida reflete a política monetária do BCE e tem impacto direto nas prestações de crédito habitação com taxa variável.

### O que isto significa para si

Se tem crédito habitação com taxa variável, a sua prestação mensal deverá diminuir na próxima revisão. Para um empréstimo de €200.000 a 30 anos, esta descida pode representar uma poupança de cerca de €40 por mês.

### O que fazer agora

É o momento ideal para rever as condições do seu crédito. A Letraperfeiçoada compara ofertas de 10+ bancos parceiros para encontrar as melhores condições — sem qualquer custo para si.', 'The 12-month Euribor rate has dropped to 2.4%, the lowest in two years. This drop reflects ECB monetary policy and directly impacts variable-rate mortgage payments.', 'A Euribor a 12 meses desceu para mínimos de 2 anos, impactando positivamente as prestações de crédito habitação com taxa variável.', 'euribor-desce-minimos-2-anos', 'Euribor desce para mínimos de 2 anos. Saiba como esta descida afeta o seu crédito habitação e o que pode fazer para poupar.', ARRAY['euribor', 'crédito habitação', 'taxas de juro'], 'major', 'published', now() - interval '2 days'),

('bite', 'INE: preços da habitação subiram 6,2% no último trimestre', 'INE: housing prices rose 6.2% in the last quarter', '## Preços da habitação em alta

Segundo os dados do INE, os preços da habitação subiram 6,2% no último trimestre face ao período homólogo. Setúbal registou um aumento de 7,1%, acima da média nacional.

A tendência de subida reforça a importância de uma análise de viabilidade financeira antes de avançar com a compra de imóvel.', 'According to INE data, housing prices rose 6.2% in the last quarter year-over-year.', 'Preços da habitação subiram 6,2% no último trimestre segundo o INE. Setúbal acima da média nacional com 7,1%.', 'ine-precos-habitacao-subiram-62-porcento', 'Preços da habitação em Portugal subiram 6,2% no último trimestre. Setúbal regista 7,1% de aumento.', ARRAY['mercado imobiliário', 'preços habitação', 'INE'], 'minor', 'published', now() - interval '1 day'),

('article', 'Literacia financeira: 5 conceitos que deve conhecer antes de pedir crédito', '5 financial concepts to know before applying for a mortgage', '## Antes de pedir crédito, informe-se

Pedir crédito habitação é provavelmente a decisão financeira mais importante da sua vida. Antes de avançar, é fundamental entender alguns conceitos-chave.

### 1. Taxa de Esforço
A taxa de esforço é a percentagem do seu rendimento mensal líquido que vai para o pagamento de créditos. Os bancos recomendam que não ultrapasse 35%.

### 2. Spread
O spread é a margem de lucro do banco, adicionada à taxa Euribor. Quanto menor o spread, melhores as condições do seu crédito.

### 3. TAEG
A Taxa Anual de Encargos Efetiva Global inclui todos os custos do crédito — juros, seguros, comissões. É o indicador mais fiável para comparar propostas.

### 4. LTV (Loan-to-Value)
O rácio entre o montante do empréstimo e o valor do imóvel. Em Portugal, o financiamento máximo é geralmente 90% do valor do imóvel.

### 5. Prazo do Empréstimo
O prazo máximo é 40 anos (para menores de 30 anos). Um prazo maior reduz a prestação mensal mas aumenta o custo total do crédito.

### Conclusão
Na Letraperfeiçoada, explicamos tudo isto sem complicações — e tratamos de todo o processo por si, sem custo.', 'Applying for a mortgage is likely the most important financial decision of your life. Before proceeding, its essential to understand some key concepts.', 'Conheça os 5 conceitos fundamentais antes de pedir crédito habitação: taxa de esforço, spread, TAEG, LTV e prazo do empréstimo.', 'literacia-financeira-5-conceitos-credito', '5 conceitos financeiros essenciais antes de pedir crédito habitação. Taxa de esforço, spread, TAEG, LTV e prazo explicados.', ARRAY['literacia financeira', 'crédito habitação', 'educação financeira'], 'major', 'published', now());
```

- [ ] **Step 4: Commit**

```bash
git add supabase/
git commit -m "feat: add Supabase migration for content engine tables + seed data"
```

---

### Task 3: Add blog translation keys

**Files:**
- Modify: `src/lib/translations.ts`

- [ ] **Step 1: Add EN blog keys**

Find the `en` section (after `profile:` block, before `// Success Stories`). Add:

```typescript
    blog: {
      eyebrow: "News & Analysis",
      headline: "Stay informed about the credit market",
      subheading: "Articles, analysis, and insights on the Portuguese credit and housing market.",
      allPosts: "All",
      creditoHabitacao: "Mortgages",
      mercado: "Market",
      euribor: "Euribor",
      regulacao: "Regulation",
      literacia: "Financial Literacy",
      readMore: "Read more",
      readingTime: "min read",
      publishedOn: "Published on",
      relatedArticles: "Related articles",
      sourceAttribution: "Based on article from",
      backToBlog: "Back to blog",
      shareArticle: "Share this article",
      allArticles: "See all articles",
      noArticles: "No articles yet. Check back soon.",
    },
    newsletter: {
      title: "Weekly Newsletter",
      description: "Receive a weekly summary of the latest credit and housing market news.",
      placeholder: "Your email",
      subscribe: "Subscribe",
      subscribing: "Subscribing...",
      success: "Check your email to confirm your subscription.",
      error: "Something went wrong. Please try again.",
      privacy: "We respect your privacy. Unsubscribe anytime.",
    },
```

- [ ] **Step 2: Add PT blog keys**

Find the `pt` section (same position). Add:

```typescript
    blog: {
      eyebrow: "Notícias & Análises",
      headline: "Mantenha-se informado sobre o mercado de crédito",
      subheading: "Artigos, análises e insights sobre o mercado de crédito e habitação em Portugal.",
      allPosts: "Todos",
      creditoHabitacao: "Crédito Habitação",
      mercado: "Mercado",
      euribor: "Euribor",
      regulacao: "Regulação",
      literacia: "Literacia Financeira",
      readMore: "Ler mais",
      readingTime: "min de leitura",
      publishedOn: "Publicado a",
      relatedArticles: "Artigos relacionados",
      sourceAttribution: "Baseado em artigo do",
      backToBlog: "Voltar ao blog",
      shareArticle: "Partilhar este artigo",
      allArticles: "Ver todas as notícias",
      noArticles: "Ainda não há artigos. Volte em breve.",
    },
    newsletter: {
      title: "Newsletter Semanal",
      description: "Receba um resumo semanal das últimas notícias do mercado de crédito e habitação.",
      placeholder: "O seu email",
      subscribe: "Subscrever",
      subscribing: "A subscrever...",
      success: "Verifique o seu email para confirmar a subscrição.",
      error: "Algo correu mal. Tente novamente.",
      privacy: "Respeitamos a sua privacidade. Cancele quando quiser.",
    },
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add blog and newsletter translation keys (PT + EN)"
```

---

### Task 4: Create BlogCard component

**Files:**
- Create: `src/components/BlogCard.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/BlogCard.tsx`:
```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import type { NewsContent } from "@/lib/supabase";

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({
  article,
  index = 0,
  featured = false,
}: {
  article: NewsContent;
  index?: number;
  featured?: boolean;
}) {
  const { locale, t } = useLanguage();
  const title = locale === "pt" ? article.title_pt : (article.title_en || article.title_pt);
  const summary = article.summary_pt;
  const body = locale === "pt" ? article.body_pt : (article.body_en || article.body_pt);
  const readTime = estimateReadingTime(body);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      <Link
        href={`/blog/${article.seo_slug}`}
        className={`group block bg-white rounded-2xl border border-brand-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent-200 hover:-translate-y-1 ${
          featured ? "md:grid md:grid-cols-2" : ""
        }`}
      >
        {/* Tags + importance badge */}
        <div className={`p-6 ${featured ? "md:p-8 md:flex md:flex-col md:justify-center" : ""}`}>
          <div className="flex items-center gap-2 mb-3">
            {article.importance === "major" && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-700 bg-accent-50 px-2 py-0.5 rounded">
                {locale === "pt" ? "Destaque" : "Featured"}
              </span>
            )}
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-brand-500 bg-brand-100 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`font-bold text-brand-900 group-hover:text-accent-700 transition-colors mb-2 ${
              featured ? "text-2xl lg:text-3xl" : "text-lg"
            }`}
          >
            {title}
          </h3>

          {summary && (
            <p className={`text-brand-500 leading-relaxed mb-4 ${featured ? "text-base" : "text-sm line-clamp-2"}`}>
              {summary}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-brand-400">
            {article.published_at && (
              <span>{formatDate(article.published_at, locale)}</span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readTime} {t.blog.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BlogCard.tsx
git commit -m "feat: create BlogCard component for blog index"
```

---

### Task 5: Create blog index page

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/components/BlogHero.tsx`
- Create: `src/components/NewsletterSignup.tsx`

- [ ] **Step 1: Create BlogHero component**

Create `src/components/BlogHero.tsx`:
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const FILTER_TAGS = [
  { key: "all", labelKey: "allPosts" },
  { key: "crédito habitação", labelKey: "creditoHabitacao" },
  { key: "mercado", labelKey: "mercado" },
  { key: "euribor", labelKey: "euribor" },
  { key: "regulação", labelKey: "regulacao" },
  { key: "literacia financeira", labelKey: "literacia" },
] as const;

export default function BlogHero({
  activeTag,
  onTagChange,
}: {
  activeTag: string;
  onTagChange: (tag: string) => void;
}) {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-brand-900">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
            {t.blog.eyebrow}
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-5">
            {t.blog.headline}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            {t.blog.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="flex flex-wrap justify-center gap-2"
        >
          {FILTER_TAGS.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => onTagChange(key)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                activeTag === key
                  ? "bg-accent-700 text-white font-semibold"
                  : "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80"
              }`}
            >
              {t.blog[labelKey as keyof typeof t.blog]}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create NewsletterSignup component**

Create `src/components/NewsletterSignup.tsx`:
```tsx
"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewsletterSignup() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-brand-900 rounded-2xl p-8 lg:p-10 text-center">
      <div className="w-12 h-12 rounded-xl bg-accent-700/20 flex items-center justify-center mx-auto mb-4">
        <Mail size={22} className="text-accent-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{t.newsletter.title}</h3>
      <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
        {t.newsletter.description}
      </p>

      {status === "success" ? (
        <p className="text-green-400 text-sm font-medium">{t.newsletter.success}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.newsletter.placeholder}
            inputMode="email"
            autoComplete="email"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-base placeholder-white/30 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-accent-700 text-white font-semibold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-700/20 disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? t.newsletter.subscribing : t.newsletter.subscribe}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">{t.newsletter.error}</p>
      )}

      <p className="text-white/25 text-xs mt-4">{t.newsletter.privacy}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create blog index page**

Create `src/app/blog/page.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/BlogHero";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { supabase, type NewsContent } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<NewsContent[]>([]);
  const [activeTag, setActiveTag] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      let query = supabase
        .from("news_content")
        .select("*")
        .in("type", ["article", "bite"])
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(12);

      if (activeTag !== "all") {
        query = query.contains("tags", [activeTag]);
      }

      const { data } = await query;
      setArticles(data || []);
      setLoading(false);
    }

    fetchArticles();
  }, [activeTag]);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="relative">
      <Navbar />
      <BlogHero activeTag={activeTag} onTagChange={setActiveTag} />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-accent-700 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-brand-500 py-20">{t.blog.noArticles}</p>
        ) : (
          <>
            {/* Featured article */}
            {featured && (
              <div className="mb-12">
                <BlogCard article={featured} featured index={0} />
              </div>
            )}

            {/* Article grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {rest.map((article, i) => (
                <BlogCard key={article.id} article={article} index={i + 1} />
              ))}
            </div>

            {/* Newsletter signup between content */}
            <div className="mb-16">
              <NewsletterSignup />
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/BlogHero.tsx src/components/NewsletterSignup.tsx src/app/blog/page.tsx
git commit -m "feat: create blog index page with hero, cards, and newsletter signup"
```

---

### Task 6: Create article page

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create the article page**

Create `src/app/blog/[slug]/page.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Linkedin, MessageCircle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { supabase, type NewsContent } from "@/lib/supabase";
import { siteConfig } from "@/lib/siteConfig";
import { useLanguage } from "@/lib/LanguageContext";
import { fadeUp } from "@/lib/animations";

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Simple markdown-to-HTML (handles ##, ###, **, lists)
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-brand-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-brand-900 mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-brand-600">$1</li>')
    .replace(/^(?!<[hl])(.*\S.*)$/gm, '<p class="text-brand-600 leading-relaxed mb-4">$1</p>');
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale, t } = useLanguage();
  const [article, setArticle] = useState<NewsContent | null>(null);
  const [related, setRelated] = useState<NewsContent[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from("news_content")
        .select("*")
        .eq("seo_slug", slug)
        .eq("status", "published")
        .single();

      if (data) {
        setArticle(data);

        // Fetch related articles by tag overlap
        const { data: relatedData } = await supabase
          .from("news_content")
          .select("*")
          .in("type", ["article", "bite"])
          .eq("status", "published")
          .neq("id", data.id)
          .overlaps("tags", data.tags)
          .order("published_at", { ascending: false })
          .limit(3);

        setRelated(relatedData || []);
      }
    }

    if (slug) fetchArticle();
  }, [slug]);

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="w-8 h-8 border-2 border-accent-700 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  const title = locale === "pt" ? article.title_pt : (article.title_en || article.title_pt);
  const body = locale === "pt" ? article.body_pt : (article.body_en || article.body_pt);
  const readTime = estimateReadingTime(body);
  const articleUrl = `${siteConfig.url}/blog/${article.seo_slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: articleUrl });
    } else {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        {/* Back link */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-accent-700 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {t.blog.backToBlog}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <div className="flex items-center gap-2 mb-4">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-[10px] uppercase tracking-wider text-accent-700 bg-accent-50 px-2 py-0.5 rounded hover:bg-accent-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-brand-400 mb-8">
            {article.published_at && (
              <span>{t.blog.publishedOn} {formatDate(article.published_at, locale)}</span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readTime} {t.blog.readingTime}
            </span>
          </div>

          <div className="h-px bg-gradient-to-r from-accent-700 to-accent-400 w-20 mb-10" />
        </motion.div>

        {/* Body */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
        />

        {/* Share bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-3 mt-12 pt-8 border-t border-brand-100"
        >
          <span className="text-sm text-brand-500 font-medium">{t.blog.shareArticle}:</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center text-brand-500 hover:bg-accent-50 hover:text-accent-700 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(title + " " + articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center text-brand-500 hover:bg-green-50 hover:text-green-600 transition-colors"
          >
            <MessageCircle size={16} />
          </a>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center text-brand-500 hover:bg-accent-50 hover:text-accent-700 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
          </button>
        </motion.div>

        {/* CTA */}
        <div className="mt-12 p-8 bg-brand-900 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            {locale === "pt" ? "Precisa de ajuda com o seu crédito?" : "Need help with your mortgage?"}
          </h3>
          <p className="text-white/50 text-sm mb-6">
            {locale === "pt"
              ? "Simulação gratuita em 24h — sem compromisso."
              : "Free simulation within 24h — no commitment."}
          </p>
          <a
            href="/#pre-qualification"
            className="inline-flex items-center px-8 py-3 bg-accent-700 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors shadow-lg shadow-accent-700/20"
          >
            {locale === "pt" ? "Simular Crédito" : "Simulate Now"}
          </a>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">{t.blog.relatedArticles}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((r, i) => (
              <BlogCard key={r.id} article={r} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
        <NewsletterSignup />
      </section>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "feat: create article page with markdown rendering, share, CTA, related articles"
```

---

### Task 7: Create blog API endpoints for AI crawlers

**Files:**
- Create: `src/app/api/v1/blog/route.ts`
- Create: `src/app/api/v1/blog/[slug]/route.ts`

- [ ] **Step 1: Create blog list API**

Create `src/app/api/v1/blog/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);
  const offset = Number(searchParams.get("offset")) || 0;

  let query = supabase
    .from("news_content")
    .select("id, type, title_pt, title_en, summary_pt, seo_slug, seo_description, tags, importance, published_at", { count: "exact" })
    .in("type", ["article", "bite"])
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, count } = await query;

  return NextResponse.json(
    {
      total: count,
      items: (data || []).map((a) => ({
        ...a,
        url: `https://meuintermediario.com/blog/${a.seo_slug}`,
      })),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
```

- [ ] **Step 2: Create single article API**

Create `src/app/api/v1/blog/[slug]/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data } = await supabase
    .from("news_content")
    .select("*")
    .eq("seo_slug", slug)
    .eq("status", "published")
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ...data,
      url: `https://meuintermediario.com/blog/${data.seo_slug}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/v1/blog/
git commit -m "feat: add blog API endpoints for AI crawlers (/api/v1/blog)"
```

---

### Task 8: Create newsletter subscribe API

**Files:**
- Create: `src/app/api/newsletter/subscribe/route.ts`
- Create: `src/app/api/newsletter/confirm/route.ts`

- [ ] **Step 1: Create subscribe endpoint**

Create `src/app/api/newsletter/subscribe/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "crypto";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const token = randomUUID();

    // Upsert: if email exists but unconfirmed, update token
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email, confirm_token: token, confirmed: false, active: true },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    // Send confirmation email via Resend
    if (RESEND_API_KEY) {
      const confirmUrl = `https://meuintermediario.com/api/newsletter/confirm?token=${token}`;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Letraperfeiçoada <noreply@meuintermediario.com>",
          to: email,
          subject: "Confirme a sua subscrição — Letraperfeiçoada",
          html: `<p>Obrigado por subscrever a nossa newsletter!</p>
                 <p>Para confirmar a sua subscrição, clique no link abaixo:</p>
                 <p><a href="${confirmUrl}" style="display:inline-block;background:#A30F4F;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Confirmar Subscrição</a></p>
                 <p style="color:#64748B;font-size:12px;margin-top:16px">Se não solicitou esta subscrição, pode ignorar este email.</p>`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Newsletter subscribe error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create confirm endpoint**

Create `src/app/api/newsletter/confirm/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return new NextResponse("Token inválido.", { status: 400 });
  }

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ confirmed: true, confirm_token: null })
    .eq("confirm_token", token)
    .select()
    .single();

  if (error || !data) {
    return new NextResponse("Token inválido ou expirado.", { status: 400 });
  }

  // Redirect to a thank-you page or blog
  return NextResponse.redirect(new URL("/blog?subscribed=true", req.url));
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/newsletter/
git commit -m "feat: add newsletter subscribe + double opt-in confirm endpoints"
```

---

### Task 9: Add homepage "Últimas Notícias" section

**Files:**
- Create: `src/components/LatestNews.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create LatestNews component**

Create `src/components/LatestNews.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import BlogCard from "@/components/BlogCard";
import { supabase, type NewsContent } from "@/lib/supabase";

export default function LatestNews() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<NewsContent[]>([]);

  useEffect(() => {
    async function fetchLatest() {
      const { data } = await supabase
        .from("news_content")
        .select("*")
        .in("type", ["article", "bite"])
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

      setArticles(data || []);
    }

    fetchLatest();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-brand-50 via-white to-brand-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            {t.blog.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight"
          >
            {t.blog.headline}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {articles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:text-accent-600 transition-colors"
          >
            {t.blog.allArticles}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add LatestNews to homepage**

In `src/app/page.tsx`, add the import and component before the Contact section:

Add import at top:
```typescript
import LatestNews from "@/components/LatestNews";
```

Add component before `<Contact />`:
```tsx
      <LatestNews />
      <Contact />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LatestNews.tsx src/app/page.tsx
git commit -m "feat: add Últimas Notícias section to homepage"
```

---

### Task 10: Update sitemap, llms.txt, and agent.json

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `src/app/.well-known/agent.json/route.ts`
- Modify: `src/app/robots.ts`

- [ ] **Step 1: Update sitemap with dynamic blog routes**

In `src/app/sitemap.ts`, add the Supabase import and dynamic blog entries:

```typescript
import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch published blog slugs
  const { data: articles } = await supabase
    .from("news_content")
    .select("seo_slug, published_at")
    .in("type", ["article", "bite"])
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const blogEntries = (articles || []).map((a) => ({
    url: `https://meuintermediario.com/blog/${a.seo_slug}`,
    lastModified: a.published_at || new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    // ... existing static routes ...
    {
      url: "https://meuintermediario.com/blog",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
```

- [ ] **Step 2: Update llms.txt**

Add to the end of `public/llms.txt` before the API Endpoints section:

```markdown
## Blog

The Letraperfeiçoada blog publishes articles and analysis on the Portuguese credit and housing market, including Euribor rate updates, market trends, regulatory changes, and financial literacy content.

- Blog index: /blog
- Individual articles: /blog/{slug}
- API: GET /api/v1/blog (supports ?tag=, ?limit=, ?offset=)
- API: GET /api/v1/blog/{slug} (full article content)
```

- [ ] **Step 3: Update agent.json with blog capability**

In `src/app/.well-known/agent.json/route.ts`, add to capabilities array:
```typescript
"read:blog",
```

Add to endpoints object:
```typescript
blog: {
  url: "https://meuintermediario.com/api/v1/blog",
  method: "GET",
  description: "Published blog articles. Supports ?tag=, ?limit=, ?offset= filters.",
},
blogArticle: {
  url: "https://meuintermediario.com/api/v1/blog/{slug}",
  method: "GET",
  description: "Full article content by slug.",
},
```

- [ ] **Step 4: Update robots.ts to allow /blog/**

Already allowed via `/` wildcard, but add explicit entry for clarity:

In `src/app/robots.ts`, add `/blog/` to the allow arrays.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts public/llms.txt src/app/.well-known/agent.json/route.ts src/app/robots.ts
git commit -m "feat: update sitemap, llms.txt, agent.json, robots.txt for blog SEO + AI"
```

---

### Task 11: Add Supabase env vars to Vercel and verify

- [ ] **Step 1: Add env vars to Vercel**

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://dyknwyxztoixxpdyepdk.supabase.co

npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter: <anon key from Supabase dashboard>
```

- [ ] **Step 2: Build locally to verify**

```bash
rm -rf .next && npm run build
```

Expected: Clean build with `/blog` and `/blog/[slug]` routes listed.

- [ ] **Step 3: Test blog index locally**

```bash
npm run dev
# Visit http://localhost:3000/blog
# Should show 3 seeded articles
```

- [ ] **Step 4: Test article page**

Visit `http://localhost:3000/blog/euribor-desce-minimos-2-anos`
Should render full article with share buttons, CTA, and related articles.

- [ ] **Step 5: Test API endpoints**

```bash
curl http://localhost:3000/api/v1/blog | python3 -m json.tool
curl http://localhost:3000/api/v1/blog/euribor-desce-minimos-2-anos | python3 -m json.tool
```

- [ ] **Step 6: Final commit and push**

```bash
git add -A
git commit -m "feat: blog section complete — index, articles, API, newsletter, SEO"
git push origin feature/news-content-engine
```
