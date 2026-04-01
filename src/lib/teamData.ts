export interface TeamMember {
  id: string;
  name: string;
  role: { pt: string; en: string };
  bio: { pt: string; en: string };
  photo: string;
  photoPosition?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  specializations: string[];
  languages: string[];
  showAvailability?: boolean;
  featured: boolean;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "paulo-brito",
    name: "Paulo Brito",
    role: {
      pt: "CEO",
      en: "CEO",
    },
    bio: {
      pt: "Mais de 20 anos de experiência em intermediação de crédito e solicitadoria. Fundador da Letraperfeiçoada e responsável pela estratégia e operações.",
      en: "Over 20 years of experience in credit intermediation and legal advisory. Founder of Letraperfeiçoada and head of strategy and operations.",
    },
    photo: "/team/paulo-brito.jpg",
    photoPosition: "center 25%",
    email: "info@letraperfeicoada.pt",
    phone: "+351 265 117 174",
    specializations: ["Estratégia", "Parcerias", "Gestão"],
    languages: [],
    showAvailability: false,
    featured: true,
    order: 1,
  },
  {
    id: "armanda-amorim",
    name: "Armanda Amorim",
    role: {
      pt: "Diretora Comercial",
      en: "Commercial Director",
    },
    bio: {
      pt: "Especialista em crédito habitação com foco em angariação e acompanhamento de clientes particulares. Responsável pela equipa comercial.",
      en: "Specialist in mortgage credit focused on client acquisition and support. Leads the commercial team.",
    },
    photo: "/team/armanda-amorim.jpg",
    photoPosition: "center 30%",
    email: "armandaamorim@dsicredito.pt",
    phone: "+351 931 049 374",
    whatsapp: "+351931049374",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português"],
    featured: true,
    order: 2,
  },
  {
    id: "patricia-pereira",
    name: "Patrícia Pereira",
    role: {
      pt: "Agente Sénior",
      en: "Senior Agent",
    },
    bio: {
      pt: "Especialista em intermediação de crédito com foco no acompanhamento personalizado de clientes e na obtenção das melhores condições.",
      en: "Credit intermediation specialist focused on personalized client support and securing the best conditions.",
    },
    photo: "/team/patricia-pereira.jpg",
    photoPosition: "center 40%",
    email: "patriciapereira@dsicredito.pt",
    phone: "+351 932 982 787",
    whatsapp: "+351932982787",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português", "English"],
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
    photoPosition: "center 28%",
    email: "liliafernandes@dsicredito.pt",
    phone: "+351 939 301 834",
    whatsapp: "+351939301834",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português", "English"],
    featured: true,
    order: 4,
  },
  {
    id: "jose-nobre",
    name: "José Nobre",
    role: {
      pt: "Gestor de Crédito",
      en: "Credit Manager",
    },
    bio: {
      pt: "Focado no acompanhamento de clientes e na gestão de processos de crédito com rigor e proximidade.",
      en: "Focused on client support and credit process management with precision and proximity.",
    },
    photo: "/team/jose-nobre.jpg",
    photoPosition: "center 32%",
    email: "josenobre@dsicredito.pt",
    phone: "+351 966 587 771",
    whatsapp: "+351966587771",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português", "English"],
    featured: true,
    order: 5,
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
    photoPosition: "center 50%",
    email: "armandoserra@dsicredito.pt",
    phone: "+351 961 316 637",
    whatsapp: "+351961316637",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português"],
    featured: true,
    order: 6,
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
    photoPosition: "center 30%",
    email: "josejanuario@dsicredito.pt",
    phone: "+351 937 064 118",
    whatsapp: "+351937064118",
    specializations: ["Crédito Habitação", "Crédito Pessoal"],
    languages: ["Português", "English"],
    featured: true,
    order: 7,
  },
];
