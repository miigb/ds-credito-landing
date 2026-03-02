import { siteConfig } from "@/lib/siteConfig";

const financialServiceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${siteConfig.url}/#financialservice`,
  name: siteConfig.name,
  alternateName: "DS Crédito Setúbal",
  description: siteConfig.description.en,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  foundingDate: String(siteConfig.foundingYear),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "13:00",
    },
  ],
  image: `${siteConfig.url}/og-image.jpg`,
  logo: `${siteConfig.url}/icon.svg`,
  priceRange: "Free for clients",
  currenciesAccepted: "EUR",
  areaServed: {
    "@type": "Country",
    name: "Portugal",
  },
  parentOrganization: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#parentorg`,
    name: siteConfig.parentOrganization,
    url: "https://www.decisoesesolucoes.pt",
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Credit Brokerage Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Financial Viability Pre-Check",
          description:
            "Quick assessment of purchasing capacity for property buyers in Portugal.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bank Offer Comparison",
          description:
            "Simulation and comparison of mortgage offers across multiple partner banks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Documentation Management",
          description:
            "Complete document handling for mortgage applications, including remote support for international clients.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bank Negotiation",
          description:
            "Expert negotiation with banking entities to secure optimal credit conditions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Approval Support",
          description:
            "End-to-end support through final approval, deed signing, and funding.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description.en,
  publisher: { "@id": `${siteConfig.url}/#financialservice` },
  inLanguage: ["en", "pt"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is DS Crédito Setúbal Vitória?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DS Crédito Setúbal Vitória is an independent credit brokerage in Setúbal, Portugal, part of the Decisões e Soluções group. We help international property buyers and Portuguese clients secure the best mortgage terms by comparing offers across multiple partner banks, managing all documentation, and providing end-to-end support from pre-check to deed signing — at no cost to the buyer.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a cost for using DS Crédito's services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Our service is completely free for property buyers. As credit intermediaries, we are compensated by the lending institutions, so there is no direct cost to the client.",
      },
    },
    {
      "@type": "Question",
      name: "Can international buyers get a mortgage in Portugal through DS Crédito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We specialize in supporting international and non-resident buyers. We handle remote document collection, coordinate with lawyers and notaries, communicate professionally in English, and guide international clients through every step of the Portuguese mortgage process.",
      },
    },
    {
      "@type": "Question",
      name: "What are the opening hours of DS Crédito Setúbal Vitória?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are open Monday to Friday from 09:00 to 18:00, and Saturday from 10:00 to 13:00. We are closed on Sundays and public holidays.",
      },
    },
    {
      "@type": "Question",
      name: "How does the credit brokerage process work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our process has 5 steps: (1) Initial contact and feasibility assessment within 24-48 hours, (2) Profile review and comparison of multiple bank offers, (3) Pre-approval submission and liaison with banks, (4) Document management and coordination with all parties, (5) Support through deed signing and post-completion steps.",
      },
    },
    {
      "@type": "Question",
      name: "Where is DS Crédito Setúbal Vitória located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are located at Avenida Bento Gonçalves nº 2, 2910-431 Setúbal, Portugal. We are part of the Decisões e Soluções group which has 170+ offices across the country. Contact us at ibrantinabrito@dsicredito.pt to schedule an appointment.",
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
