import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articles } = await supabase
    .from("news_content")
    .select("seo_slug, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const articleEntries: MetadataRoute.Sitemap = (articles ?? []).map((article) => ({
    url: `https://meuintermediario.com/blog/${article.seo_slug}`,
    lastModified: article.published_at ?? undefined,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://meuintermediario.com",
      lastModified: "2026-03-19",
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://meuintermediario.com",
          pt: "https://meuintermediario.com",
        },
      },
    },
    {
      url: "https://meuintermediario.com/equipa",
      lastModified: "2026-03-20",
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: "https://meuintermediario.com/equipa",
          pt: "https://meuintermediario.com/equipa",
        },
      },
    },
    {
      url: "https://meuintermediario.com/blog",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://meuintermediario.com/privacidade",
      lastModified: "2026-03-19",
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          pt: "https://meuintermediario.com/privacidade",
        },
      },
    },
    {
      url: "https://meuintermediario.com/termos",
      lastModified: "2026-04-07",
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          pt: "https://meuintermediario.com/termos",
        },
      },
    },
    ...articleEntries,
  ];
}
