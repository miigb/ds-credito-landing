"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import type { NewsContent } from "@/lib/supabase";

interface BlogCardProps {
  article: NewsContent;
  index: number;
  featured?: boolean;
}

export default function BlogCard({ article, index, featured = false }: BlogCardProps) {
  const { locale, t } = useLanguage();

  const title = locale === "en" && article.title_en ? article.title_en : article.title_pt;
  const wordCount = (locale === "en" && article.body_en ? article.body_en : article.body_pt)
    .split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(locale === "en" ? "en-GB" : "pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link
        href={`/blog/${article.seo_slug}`}
        className={`block bg-white rounded-2xl border border-brand-100 hover:shadow-xl hover:border-accent-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
          featured ? "md:grid md:grid-cols-2" : ""
        }`}
      >
        <div className="p-6 flex flex-col gap-3">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            {article.importance === "major" && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-700 text-white">
                {locale === "en" ? "Featured" : "Destaque"}
              </span>
            )}
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-50 text-accent-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-brand-900 ${featured ? "text-2xl" : "text-lg"}`}>
            {title}
          </h3>

          {/* Summary */}
          <p className={`text-brand-900/60 text-sm leading-relaxed ${featured ? "" : "line-clamp-2"}`}>
            {article.summary_pt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-brand-900/40">
            {formattedDate && <span>{formattedDate}</span>}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
