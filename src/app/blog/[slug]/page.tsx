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
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { supabase, type NewsContent } from "@/lib/supabase";
import { siteConfig } from "@/lib/siteConfig";

/* ── Simple markdown-to-HTML renderer ─────────────────────────── */
function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Close list if we leave a list context
    if (inList && !line.startsWith("- ")) {
      html.push("</ul>");
      inList = false;
    }

    if (line.startsWith("### ")) {
      const text = applyInline(line.slice(4));
      html.push(`<h3 class="text-xl font-bold text-brand-900 mt-8 mb-3">${text}</h3>`);
    } else if (line.startsWith("## ")) {
      const text = applyInline(line.slice(3));
      html.push(`<h2 class="text-2xl font-bold text-brand-900 mt-10 mb-4">${text}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="list-disc pl-6 mb-4 space-y-1">');
        inList = true;
      }
      const text = applyInline(line.slice(2));
      html.push(`<li class="text-brand-600 leading-relaxed">${text}</li>`);
    } else if (line.trim() === "") {
      // blank line — skip
    } else {
      const text = applyInline(line);
      html.push(`<p class="text-brand-600 leading-relaxed mb-4">${text}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}

function applyInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/* ── Article page ─────────────────────────────────────────────── */
export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLanguage();

  const [article, setArticle] = useState<NewsContent | null>(null);
  const [related, setRelated] = useState<NewsContent[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      setLoading(true);

      const { data } = await supabase
        .from("news_content")
        .select("*")
        .eq("seo_slug", slug)
        .eq("status", "published")
        .single();

      if (data) {
        setArticle(data as NewsContent);

        // Fetch related articles by overlapping tags
        if (data.tags?.length) {
          const { data: rel } = await supabase
            .from("news_content")
            .select("*")
            .eq("status", "published")
            .overlaps("tags", data.tags)
            .neq("id", data.id)
            .limit(3);

          setRelated((rel as NewsContent[]) ?? []);
        }
      }

      setLoading(false);
    }

    load();
  }, [slug]);

  /* ── Loading state ──────────────────────────────────────────── */
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent-400 border-t-transparent" />
        </main>
        <Footer />
      </>
    );
  }

  /* ── 404-ish fallback ───────────────────────────────────────── */
  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
          <h1 className="text-2xl font-bold text-brand-900">
            {locale === "en" ? "Article not found" : "Artigo nao encontrado"}
          </h1>
          <Link href="/blog" className="text-accent-700 underline">
            {t.blog.backToBlog}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Derived data ───────────────────────────────────────────── */
  const title =
    locale === "en" && article.title_en ? article.title_en : article.title_pt;
  const body =
    locale === "en" && article.body_en ? article.body_en : article.body_pt;

  const wordCount = body.split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(
        locale === "en" ? "en-GB" : "pt-PT",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : "";

  const articleUrl = `${siteConfig.url}/blog/${article.seo_slug}`;

  /* ── Share helpers ──────────────────────────────────────────── */
  function shareLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      "_blank",
    );
  }

  function shareWhatsApp() {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(title + " " + articleUrl)}`,
      "_blank",
    );
  }

  async function copyOrShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: articleUrl });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  /* ── Render body HTML ───────────────────────────────────────── */
  const bodyHtml = renderMarkdown(body);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-16">
          {/* Back link */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-accent-700 hover:text-accent-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blog.backToBlog}
            </Link>
          </motion.div>

          {/* Tag pills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex flex-wrap gap-2 mb-4"
          >
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-700 hover:bg-accent-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-3xl lg:text-5xl font-bold text-brand-900 leading-tight mb-6"
          >
            {title}
          </motion.h1>

          {/* Date + reading time */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex items-center gap-4 text-sm text-brand-900/50 mb-6"
          >
            {formattedDate && (
              <span>
                {t.blog.publishedOn} {formattedDate}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readingTime} min {t.blog.readingTime}
            </span>
          </motion.div>

          {/* Accent gradient divider */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="h-px w-20 bg-gradient-to-r from-accent-700 to-accent-400 mb-10"
          />

          {/* Body */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* Share bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex items-center gap-4 mt-12 pt-8 border-t border-brand-100"
          >
            <span className="text-sm font-medium text-brand-900/60">
              {t.blog.shareArticle}
            </span>

            <button
              onClick={shareLinkedIn}
              className="p-2 rounded-lg hover:bg-accent-50 text-brand-900/50 hover:text-accent-700 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>

            <button
              onClick={shareWhatsApp}
              className="p-2 rounded-lg hover:bg-accent-50 text-brand-900/50 hover:text-accent-700 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={copyOrShare}
              className="p-2 rounded-lg hover:bg-accent-50 text-brand-900/50 hover:text-accent-700 transition-colors"
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
            </button>
          </motion.div>

          {/* Dark CTA box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 rounded-2xl bg-brand-900 p-8 text-center"
          >
            <h2 className="text-xl font-bold text-white mb-3">
              Precisa de ajuda com o seu credito?
            </h2>
            <Link
              href="/#pre-qualification"
              className="inline-block px-8 py-3 rounded-xl bg-accent-700 text-white font-semibold hover:bg-accent-600 transition-colors"
            >
              Simular Credito
            </Link>
          </motion.div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-16">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-bold text-brand-900 mb-8"
            >
              {t.blog.relatedArticles}
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel, i) => (
                <BlogCard key={rel.id} article={rel} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <NewsletterSignup />
      </main>

      <Footer />
    </>
  );
}
