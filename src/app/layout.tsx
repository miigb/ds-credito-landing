import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { AudienceProvider } from "@/lib/AudienceContext";
import { PrototypeProvider } from "@/lib/PrototypeContext";
import ControlPanel from "@/components/proto/ControlPanel";
import Grain from "@/components/fx/Grain";
import SmoothScroll from "@/components/fx/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import CookieConsent from "@/components/CookieConsent";
import { siteConfig } from "@/lib/siteConfig";
import { Analytics } from '@vercel/analytics/next';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

/* Brown Sugar — licensed logo-wordmark face. LOGO USE ONLY (var(--font-logo)). */
const brownSugar = localFont({
  src: "../../public/fonts/Brown-Sugar-Regular.woff2",
  variable: "--font-brownsugar",
  display: "swap",
  preload: false,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1D1D1B" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:
      "Letraperfeiçoada | Credit Brokerage Portugal",
    template: "%s | Letraperfeiçoada",
  },

  description: siteConfig.description.en,

  keywords: [
    "credit brokerage Portugal",
    "mortgage Portugal international buyers",
    "buy property Portugal financing",
    "Decisões e Soluções",
    "Letraperfeiçoada",
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
      "Letraperfeiçoada | Credit Brokerage in Portugal",
    description: siteConfig.description.en,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Letraperfeiçoada - Credit brokerage for international buyers in Portugal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Letraperfeiçoada | Credit Brokerage in Portugal",
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
    // Prevent Chrome / Google auto-translate from breaking React state
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${montserrat.variable} ${brownSugar.variable}`}
      translate="no"
    >
      <body className="font-sans antialiased notranslate" suppressHydrationWarning>
        <StructuredData />
        <noscript>
          <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
            <h1>Letraperfeiçoada</h1>
            <p>
              Tied credit intermediary in Setúbal, Portugal. Part of
              Decisões e Soluções group.
            </p>
            <p>
              Services: Mortgage advisory, credit brokerage, documentation
              management for international buyers.
            </p>
            <p>Address: Av. Bento Gonçalves nº 2, 2910-431 Setúbal, Portugal</p>
            <p>Contact: info@letraperfeicoada.pt</p>
            <p>Hours: Mon-Fri 09:00-18:00, Sat 10:00-13:00</p>
          </div>
        </noscript>
        <LanguageProvider>
          <AudienceProvider>
            {/* PROTOTYPE wrapper — remove PrototypeProvider/ControlPanel/Grain for production */}
            <PrototypeProvider>
              <SmoothScroll>{children}</SmoothScroll>
              <Grain />
              <ControlPanel />
            </PrototypeProvider>
          </AudienceProvider>
          <CookieConsent />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
