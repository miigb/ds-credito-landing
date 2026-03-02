import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.dssetubalvitoria.pt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://www.dssetubalvitoria.pt",
          pt: "https://www.dssetubalvitoria.pt",
        },
      },
    },
  ];
}
