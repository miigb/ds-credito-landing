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
      pt: "Mais de 20 anos de experiência em intermediação de crédito e solicitadoria. Fundador da Letraperfeiçoada e responsável pela estratégia e operações.",
      en: "Over 20 years of experience in credit intermediation and legal advisory. Founder of Letraperfeiçoada and head of strategy and operations.",
    },
    photo: "/team/paulo-brito.jpg",
    featured: true,
    order: 1,
  },
  {
    id: "armanda-amorim",
    name: "Armanda Amorim",
    role: {
      pt: "Gestora de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Especialista em crédito habitação com foco em angariação e acompanhamento de clientes particulares. Responsável pela equipa comercial.",
      en: "Specialist in mortgage credit focused on client acquisition and support. Leads the commercial team.",
    },
    photo: "/team/armanda-amorim.jpg",
    featured: true,
    order: 2,
  },
  {
    id: "patricia-pereira",
    name: "Patrícia Pereira",
    role: {
      pt: "Gestora de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Gestão do programa de parcerias com imobiliárias, mediadores e promotores. Responsável pela expansão da rede de parceiros B2B.",
      en: "Manages the partnership program with real estate agencies, brokers, and promoters. Drives B2B partner network expansion.",
    },
    photo: "/team/patricia-pereira.jpg",
    featured: true,
    order: 3,
  },
  {
    id: "lilia-fernandes",
    name: "Lília Fernandes",
    role: {
      pt: "Gestora de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Especializada no atendimento ao cliente e gestão de processos de crédito, garantindo uma experiência personalizada.",
      en: "Specialized in client service and credit process management, ensuring a personalized experience.",
    },
    photo: "/team/lilia-fernandes.jpg",
    featured: false,
    order: 4,
  },
  {
    id: "armando-serra",
    name: "Armando Serra",
    role: {
      pt: "Gestor de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Focado na análise de crédito e no acompanhamento de processos junto das instituições financeiras.",
      en: "Focused on credit analysis and process management with financial institutions.",
    },
    photo: "/team/armando-serra.jpg",
    featured: false,
    order: 5,
  },
  {
    id: "jose-januario",
    name: "José Januário",
    role: {
      pt: "Gestor de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Dedicado ao acompanhamento personalizado de clientes na obtenção das melhores condições de crédito.",
      en: "Dedicated to personalized client support in securing the best credit conditions.",
    },
    photo: "/team/jose-januario.jpg",
    featured: false,
    order: 6,
  },
];
