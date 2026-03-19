import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
}
