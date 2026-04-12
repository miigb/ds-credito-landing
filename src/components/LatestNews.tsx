"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { supabase } from "@/lib/supabase";
import type { NewsContent } from "@/lib/supabase";
import BlogCard from "@/components/BlogCard";

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

      if (data) setArticles(data);
    }
    fetchLatest();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-brand-50 via-white to-brand-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold tracking-wider uppercase text-accent-700 mb-3">
            {t.blog.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-brand-900">
            {t.blog.headline}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-700 font-semibold hover:underline transition-colors"
          >
            {t.blog.allArticles}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
