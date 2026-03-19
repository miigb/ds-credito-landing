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
  ];
}
