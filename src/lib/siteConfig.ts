export const siteConfig = {
  name: "DS Crédito Setúbal Vitória",
  legalName:
    "DS Crédito Setúbal Vitória - Intermediário de Crédito Vinculado",
  parentOrganization: "Decisões e Soluções",
  url: "https://www.dssetubalvitoria.pt",
  email: "ibrantinabrito@dsicredito.pt",
  phone: "+351 265 117 174",
  foundingYear: 2003,

  address: {
    streetAddress: "Avenida Bento Gonçalves nº 2",
    addressLocality: "Setúbal",
    addressRegion: "Setúbal",
    postalCode: "2910-431",
    addressCountry: "PT",
  },

  geo: {
    latitude: 38.5244,
    longitude: -8.8882,
  },

  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    { days: ["Saturday"], opens: "10:00", closes: "13:00" },
  ],

  social: {
    facebook: "https://www.facebook.com/dssetubalvitoria",
    instagram: "https://www.instagram.com/dssetubalvitoria",
    linkedin: "https://www.linkedin.com/company/dssetubalvitoria",
  },

  description: {
    en: "Independent credit brokerage supporting international buyers with end-to-end financing in Portugal. Part of Decisões e Soluções group with 22+ years of experience and 170+ stores nationwide. No cost to the client.",
    pt: "Intermediário de crédito independente em Setúbal, parte do grupo Decisões e Soluções. Mais de 22 anos de experiência, 170 lojas em Portugal. Sem custo para o cliente.",
  },
} as const;
