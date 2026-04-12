import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://img.logo.dev https://images.unsplash.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.web3forms.com https://ipapi.co https://va.vercel-scripts.com https://vitals.vercel-insights.com https://dyknwyxztoixxpdyepdk.supabase.co",
      "media-src 'self'",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
