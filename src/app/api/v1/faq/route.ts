import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

const faq = [
  {
    id: "what-is",
    question: {
      en: "What is Letraperfeiçoada?",
      pt: "O que é a Letraperfeiçoada?",
    },
    answer: {
      en: "Letraperfeiçoada is an independent credit brokerage in Setúbal, Portugal, part of the Decisões e Soluções group. We help international property buyers and Portuguese clients secure the best mortgage terms by comparing offers across multiple partner banks, managing all documentation, and providing end-to-end support from pre-check to deed signing — at no cost to the buyer.",
      pt: "A Letraperfeiçoada é um intermediário de crédito independente em Setúbal, Portugal, parte do grupo Decisões e Soluções. Ajudamos compradores internacionais e clientes portugueses a obter as melhores condições de crédito, comparando ofertas de múltiplos bancos parceiros, gerindo toda a documentação e providenciando acompanhamento do início à escritura — sem custo para o comprador.",
    },
    category: "general",
  },
  {
    id: "cost",
    question: {
      en: "Is there a cost for using the service?",
      pt: "O serviço tem algum custo?",
    },
    answer: {
      en: "No. Our service is completely free for property buyers. As credit intermediaries, we are compensated by the lending institutions, so there is no direct cost to the client.",
      pt: "Não. O nosso serviço é totalmente gratuito para compradores de imóveis. Como intermediários de crédito, somos remunerados pelas instituições financeiras, pelo que não há custo direto para o cliente.",
    },
    category: "pricing",
  },
  {
    id: "international-buyers",
    question: {
      en: "Can international buyers get a mortgage in Portugal?",
      pt: "Compradores internacionais podem obter crédito em Portugal?",
    },
    answer: {
      en: "Yes. We specialize in supporting international and non-resident buyers. We handle remote document collection, coordinate with lawyers and notaries, communicate professionally in English, and guide international clients through every step of the Portuguese mortgage process.",
      pt: "Sim. Especializamo-nos no apoio a compradores internacionais e não residentes. Tratamos da recolha remota de documentos, coordenamos com advogados e notários, comunicamos profissionalmente em inglês e orientamos clientes internacionais em cada etapa do processo de crédito português.",
    },
    category: "eligibility",
  },
  {
    id: "opening-hours",
    question: {
      en: "What are the opening hours?",
      pt: "Qual é o horário de funcionamento?",
    },
    answer: {
      en: "We are open Monday to Friday from 09:00 to 18:00, and Saturday from 10:00 to 13:00. We are closed on Sundays and public holidays.",
      pt: "Estamos abertos de segunda a sexta das 09:00 às 18:00, e sábado das 10:00 às 13:00. Encerrados aos domingos e feriados.",
    },
    category: "contact",
  },
  {
    id: "process",
    question: {
      en: "How does the credit brokerage process work?",
      pt: "Como funciona o processo de intermediação de crédito?",
    },
    answer: {
      en: "Our process has 5 steps: (1) Initial contact and feasibility assessment within 24-48 hours, (2) Profile review and comparison of multiple bank offers, (3) Pre-approval submission and liaison with banks, (4) Document management and coordination with all parties, (5) Support through deed signing and post-completion steps.",
      pt: "O nosso processo tem 5 etapas: (1) Contacto inicial e avaliação de viabilidade em 24-48 horas, (2) Análise do perfil e comparação de ofertas de múltiplos bancos, (3) Submissão de pré-aprovação e intermediação com bancos, (4) Gestão documental e coordenação com todas as partes, (5) Apoio até à escritura e passos pós-conclusão.",
    },
    category: "process",
  },
  {
    id: "location",
    question: {
      en: "Where are you located?",
      pt: "Onde estão localizados?",
    },
    answer: {
      en: `We are located at ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}, Portugal. We are part of the Decisões e Soluções group which has 170+ offices across the country. Contact us at ${siteConfig.email} to schedule an appointment.`,
      pt: `Estamos localizados na ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}, Portugal. Fazemos parte do grupo Decisões e Soluções com mais de 170 lojas no país. Contacte-nos em ${siteConfig.email} para agendar uma reunião.`,
    },
    category: "contact",
  },
  {
    id: "how-many-banks",
    question: {
      en: "How many banks do you compare?",
      pt: "Com quantos bancos comparam?",
    },
    answer: {
      en: "We work with 10 partner banks including Caixa Geral de Depósitos, Santander, Novo Banco, BPI, Bankinter, Banco CTT, ABANCA, BNI Europa, UCI, and Unicre. This allows us to compare a wide range of mortgage products to find the best fit for each client.",
      pt: "Trabalhamos com 10 bancos parceiros incluindo Caixa Geral de Depósitos, Santander, Novo Banco, BPI, Bankinter, Banco CTT, ABANCA, BNI Europa, UCI e Unicre. Isto permite-nos comparar uma vasta gama de produtos de crédito para encontrar a melhor solução para cada cliente.",
    },
    category: "services",
  },
  {
    id: "timeline",
    question: {
      en: "How long does the mortgage process take?",
      pt: "Quanto tempo demora o processo de crédito?",
    },
    answer: {
      en: "The typical timeline from initial contact to deed signing is 4-8 weeks, depending on the complexity of the case, the bank's processing times, and how quickly documents are provided. We work to expedite the process at every stage.",
      pt: "O prazo típico desde o contacto inicial até à escritura é de 4-8 semanas, dependendo da complexidade do caso, dos tempos de processamento do banco e da rapidez com que os documentos são fornecidos. Trabalhamos para acelerar o processo em cada etapa.",
    },
    category: "process",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const lang = searchParams.get("lang");

  let filtered = faq;

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  const result = lang && (lang === "en" || lang === "pt")
    ? filtered.map((item) => ({
        id: item.id,
        question: item.question[lang],
        answer: item.answer[lang],
        category: item.category,
      }))
    : filtered;

  return NextResponse.json(
    {
      total: result.length,
      categories: [...new Set(faq.map((f) => f.category))],
      items: result,
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
