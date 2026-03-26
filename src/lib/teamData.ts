export interface TeamMember {
  id: string;
  name: string;
  role: { pt: string; en: string };
  bio: { pt: string; en: string };
  photo: string;
  featured: boolean;
  linkedin?: string;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "paulo-brito",
    name: "Paulo Brito",
    role: {
      pt: "Fundador / Agente de Intermediação",
      en: "Founder / Credit Intermediation Agent",
    },
    bio: {
      pt: "Mais de 20 anos de experiência em intermediação de crédito e solicitadoria. Fundador da Letraperfeiçoada e responsável pela estratégia e operações da Letraperfeiçoada.",
      en: "Over 20 years of experience in credit intermediation and legal advisory. Founder of Letraperfeiçoada and head of strategy and operations at Letraperfeiçoada.",
    },
    photo: "/team/paulo-brito.webp",
    featured: true,
    order: 1,
  },
  {
    id: "patricia",
    name: "Patrícia",
    role: {
      pt: "Agente Sénior / Responsável Programa de Parcerias",
      en: "Senior Agent / Partnership Program Lead",
    },
    bio: {
      pt: "Gestão do programa de parcerias com imobiliárias, mediadores e promotores. Responsável pela expansão da rede de parceiros B2B.",
      en: "Manages the partnership program with real estate agencies, brokers, and promoters. Drives B2B partner network expansion.",
    },
    photo: "/team/Happy-black-woman-398455920.jpg",
    featured: true,
    order: 2,
  },
  {
    id: "armanda-amorim",
    name: "Armanda Amorim",
    role: {
      pt: "Agente Sénior / Responsável Comercial",
      en: "Senior Agent / Sales Lead",
    },
    bio: {
      pt: "Especialista em crédito habitação com foco em angariação e acompanhamento de clientes particulares. Responsável pela equipa comercial.",
      en: "Specialist in mortgage credit focused on client acquisition and support. Leads the commercial team.",
    },
    photo: "/team/armanda-amorim.png",
    featured: true,
    order: 3,
  },
  {
    id: "agent-4",
    name: "A anunciar",
    role: {
      pt: "Agente de Intermediação de Crédito",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 4,
  },
  {
    id: "agent-5",
    name: "A anunciar",
    role: {
      pt: "Agente de Intermediação de Crédito",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 5,
  },
  {
    id: "agent-6",
    name: "A anunciar",
    role: {
      pt: "Agente de Intermediação de Crédito",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 6,
  },
];
