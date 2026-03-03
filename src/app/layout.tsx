import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/lib/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:
      "DS Crédito Setúbal Vitória | Credit Brokerage Portugal",
    template: "%s | DS Crédito Setúbal Vitória",
  },

  description: siteConfig.description.en,

  keywords: [
    "credit brokerage Portugal",
    "mortgage Portugal international buyers",
    "buy property Portugal financing",
    "Decisões e Soluções Setúbal",
    "DS Crédito Setúbal",
    "intermediário de crédito Setúbal",
    "crédito habitação Portugal",
    "mortgage broker Setúbal",
    "property financing Portugal expats",
    "credit intermediary Portugal",
  ],

  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.parentOrganization,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
      pt: siteConfig.url,
      "x-default": siteConfig.url,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["pt_PT"],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "DS Crédito Setúbal Vitória | Credit Brokerage in Portugal",
    description: siteConfig.description.en,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DS Crédito Setúbal Vitória - Credit brokerage for international buyers in Portugal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "DS Crédito Setúbal Vitória | Credit Brokerage in Portugal",
    description: siteConfig.description.en,
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.webmanifest",

  other: {
    "geo.region": "PT-15",
    "geo.placename": "Setúbal",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <StructuredData />
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
            <h1>DS Crédito Setúbal Vitória</h1>
            <p>
              Independent credit brokerage in Setúbal, Portugal. Part of
              Decisões e Soluções group.
            </p>
            <p>
              Services: Mortgage advisory, credit brokerage, documentation
              management for international buyers.
            </p>
            <p>Address: Av. Bento Gonçalves nº 2, 2910-431 Setúbal, Portugal</p>
            <p>Contact: ibrantinabrito@dsicredito.pt</p>
            <p>Hours: Mon-Fri 09:00-18:00, Sat 10:00-13:00</p>
          </div>
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
