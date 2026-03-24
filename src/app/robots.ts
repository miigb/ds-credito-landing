import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/v1/", "/.well-known/"],
        disallow: ["/api/lead", "/api/auto-reply", "/_next/"],
      },
      { userAgent: "GPTBot", allow: ["/", "/api/v1/"] },
      { userAgent: "ChatGPT-User", allow: ["/", "/api/v1/"] },
      { userAgent: "ClaudeBot", allow: ["/", "/api/v1/"] },
      { userAgent: "PerplexityBot", allow: ["/", "/api/v1/"] },
      { userAgent: "Applebot-Extended", allow: ["/", "/api/v1/"] },
      { userAgent: "GoogleOther", allow: ["/", "/api/v1/"] },
    ],
    sitemap: "https://meuintermediario.com/sitemap.xml",
  };
}
