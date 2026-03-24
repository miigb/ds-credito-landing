import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

const services = [
  {
    id: "pre-check",
    name: {
      en: "Financial Viability Pre-Check",
      pt: "Pré-Avaliação de Viabilidade Financeira",
    },
    description: {
      en: "Quick assessment of purchasing capacity before property search. We analyze income, existing commitments, and residency status to determine maximum financing.",
      pt: "Avaliação rápida da capacidade de compra antes da procura de imóvel. Analisamos rendimentos, compromissos existentes e situação de residência para determinar o financiamento máximo.",
    },
    cost: "free",
    eligibility: ["portuguese-residents", "non-residents", "eu-citizens", "non-eu-citizens"],
  },
  {
    id: "bank-comparison",
    name: {
      en: "Bank Offer Comparison",
      pt: "Comparação de Ofertas Bancárias",
    },
    description: {
      en: "Simulation and comparison of mortgage offers across multiple partner banks to find the best rates and conditions.",
      pt: "Simulação e comparação de ofertas de crédito habitação em múltiplos bancos parceiros para encontrar as melhores taxas e condições.",
    },
    cost: "free",
    eligibility: ["portuguese-residents", "non-residents", "eu-citizens", "non-eu-citizens"],
  },
  {
    id: "documentation",
    name: {
      en: "Documentation Management",
      pt: "Gestão Documental",
    },
    description: {
      en: "Complete document handling for mortgage applications, including remote support for international clients. We coordinate with banks, lawyers, and notaries.",
      pt: "Gestão completa de documentação para pedidos de crédito, incluindo suporte remoto para clientes internacionais. Coordenamos com bancos, advogados e notários.",
    },
    cost: "free",
    eligibility: ["portuguese-residents", "non-residents", "eu-citizens", "non-eu-citizens"],
  },
  {
    id: "negotiation",
    name: {
      en: "Bank Negotiation",
      pt: "Negociação Bancária",
    },
    description: {
      en: "Expert negotiation with banking entities to secure optimal credit conditions, including interest rates, spreads, and associated products.",
      pt: "Negociação especializada com entidades bancárias para garantir as melhores condições de crédito, incluindo taxas de juro, spreads e produtos associados.",
    },
    cost: "free",
    eligibility: ["portuguese-residents", "non-residents", "eu-citizens", "non-eu-citizens"],
  },
  {
    id: "full-support",
    name: {
      en: "Full Approval Support",
      pt: "Acompanhamento Integral",
    },
    description: {
      en: "End-to-end support through final approval, deed signing, and funding. We accompany the entire process from pre-check to completion.",
      pt: "Acompanhamento completo desde a aprovação final até à escritura e desembolso. Acompanhamos todo o processo do início ao fim.",
    },
    cost: "free",
    eligibility: ["portuguese-residents", "non-residents", "eu-citizens", "non-eu-citizens"],
  },
];

const process = [
  {
    step: 1,
    name: { en: "Initial Contact", pt: "Contacto Inicial" },
    description: {
      en: "Feasibility call scheduled within 24-48 hours. We assess your situation and explain how we can help.",
      pt: "Chamada de viabilidade agendada em 24-48 horas. Avaliamos a sua situação e explicamos como podemos ajudar.",
    },
    duration: "24-48 hours",
  },
  {
    step: 2,
    name: { en: "Analysis & Simulation", pt: "Análise & Simulação" },
    description: {
      en: "Profile assessment and multi-bank offer comparison. We present clear scenarios with budget, down payment, and timeline.",
      pt: "Avaliação do perfil e comparação de ofertas de múltiplos bancos. Apresentamos cenários claros com orçamento, entrada necessária e cronograma.",
    },
    duration: "2-5 business days",
  },
  {
    step: 3,
    name: { en: "Pre-Approval", pt: "Pré-Aprovação" },
    description: {
      en: "Direct submission and liaison with banks. We manage the pre-approval process and negotiate the best terms.",
      pt: "Submissão direta e intermediação com os bancos. Gerimos o processo de pré-aprovação e negociamos as melhores condições.",
    },
    duration: "5-15 business days",
  },
  {
    step: 4,
    name: { en: "Formalization", pt: "Formalização" },
    description: {
      en: "Document management and coordination with all parties — banks, lawyers, notaries, and real estate agents.",
      pt: "Gestão documental e coordenação com todas as partes — bancos, advogados, notários e agentes imobiliários.",
    },
    duration: "2-4 weeks",
  },
  {
    step: 5,
    name: { en: "Completion", pt: "Conclusão" },
    description: {
      en: "Deed signing support and post-completion assistance including insurance setup and account management.",
      pt: "Apoio na escritura e assistência pós-conclusão, incluindo configuração de seguros e gestão de conta.",
    },
    duration: "1-2 weeks",
  },
];

const partnerBanks = [
  { name: "Caixa Geral de Depósitos", shortName: "CGD" },
  { name: "Banco Santander Totta", shortName: "Santander" },
  { name: "Novo Banco", shortName: "Novo Banco" },
  { name: "Banco BPI", shortName: "BPI" },
  { name: "Bankinter", shortName: "Bankinter" },
  { name: "Banco CTT", shortName: "Banco CTT" },
  { name: "ABANCA Portugal", shortName: "ABANCA" },
  { name: "BNI Europa", shortName: "BNI Europa" },
  { name: "UCI", shortName: "UCI" },
  { name: "Unicre", shortName: "Unicre" },
];

const creditTypes = [
  {
    id: "mortgage",
    name: { en: "Mortgage / Housing Credit", pt: "Crédito à Habitação" },
    description: {
      en: "Financing for property purchase, construction, or renovation in Portugal.",
      pt: "Financiamento para compra, construção ou renovação de imóvel em Portugal.",
    },
  },
  {
    id: "consumer",
    name: { en: "Consumer Credit", pt: "Crédito ao Consumo" },
    description: {
      en: "Personal loans and consumer financing solutions.",
      pt: "Empréstimos pessoais e soluções de financiamento ao consumo.",
    },
  },
];

export async function GET() {
  return NextResponse.json(
    {
      company: siteConfig.name,
      legalName: siteConfig.legalName,
      website: siteConfig.url,
      services,
      process,
      partnerBanks,
      creditTypes,
      pricing: {
        model: "free-for-client",
        description: {
          en: "All services are completely free for the client. We are compensated by lending institutions.",
          pt: "Todos os serviços são totalmente gratuitos para o cliente. Somos remunerados pelas instituições financeiras.",
        },
      },
      regulation: siteConfig.regulation,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
