import { NextResponse } from "next/server";

const agentCard = {
  name: "Letraperfeiçoada",
  description:
    "Tied credit intermediary in Setúbal, Portugal. Part of Decisões e Soluções group. We compare mortgage offers across 10 partner banks, handle all documentation, and support buyers from pre-check to deed signing — at no cost to the client.",
  url: "https://meuintermediario.com",
  provider: {
    organization: "Letraperfeiçoada - Unipessoal Lda",
    url: "https://meuintermediario.com",
  },
  version: "1.0.0",
  capabilities: [
    "read:company",
    "read:services",
    "read:faq",
    "write:consultation",
  ],
  endpoints: {
    company: {
      url: "https://meuintermediario.com/api/v1/company",
      method: "GET",
      description: "Company information, contact details, regulation, and statistics.",
    },
    services: {
      url: "https://meuintermediario.com/api/v1/services",
      method: "GET",
      description:
        "List of credit brokerage services, the 5-step process, partner banks, and credit types.",
    },
    faq: {
      url: "https://meuintermediario.com/api/v1/faq",
      method: "GET",
      description:
        "Frequently asked questions. Supports ?category= and ?lang= query parameters.",
      parameters: {
        category: {
          type: "string",
          enum: ["general", "pricing", "eligibility", "contact", "process", "services"],
          description: "Filter FAQ by category",
        },
        lang: {
          type: "string",
          enum: ["en", "pt"],
          description: "Return single-language responses",
        },
      },
    },
    consultation: {
      url: "https://meuintermediario.com/api/v1/consultation",
      method: "POST",
      description:
        "Submit a consultation request on behalf of a user. Returns a reference ID. GET the same URL for full schema documentation.",
      contentType: "application/json",
      requiredFields: ["name", "email"],
      authentication: "none",
    },
  },
  authentication: {
    type: "none",
    description: "All read endpoints are publicly accessible. The consultation endpoint requires no authentication for initial contact.",
  },
  rateLimit: {
    requests: 60,
    period: "minute",
    description: "Standard rate limiting applies. Please be respectful of server resources.",
  },
  contact: {
    email: "info@letraperfeicoada.pt",
    phone: "+351 265 117 174",
    website: "https://meuintermediario.com",
  },
  languages: ["pt", "en"],
  region: "PT",
  industry: "Financial Services — Credit Intermediation",
};

export async function GET() {
  return NextResponse.json(agentCard, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
