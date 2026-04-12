"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/BlogHero";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { supabase } from "@/lib/supabase";
import type { NewsContent } from "@/lib/supabase";
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

      const { data, error } = await query;
      if (error) console.error("Blog fetch error:", error.message);
      setArticles((data as NewsContent[]) ?? []);
      setLoading(false);
    }

    fetchArticles();
  }, [activeTag]);

  const [featured, ...rest] = articles;

  return (
    <>
      <Navbar />
      <BlogHero activeTag={activeTag} onTagChange={setActiveTag} />

      <main className="max-w-5xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-brand-900/50 py-20">
            {t.blog.noArticles}
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Featured article */}
            {featured && (
              <BlogCard article={featured} index={0} featured />
            )}

            {/* Article grid */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {rest.map((article, i) => (
                  <BlogCard key={article.id} article={article} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <NewsletterSignup />
      <Footer />
    </>
  );
}
