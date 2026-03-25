export type Locale = "en" | "pt";

export const translations = {
  en: {
    // Navbar
    nav: {
      about: "About",
      services: "Services",
      process: "Process",
      whyUs: "Why Us",
      contact: "Contact",
      cta: "Get Started",
      team: "Team",
    },
    // Hero
    hero: {
      eyebrow: "Letraperfeiçoada",
      b2c: {
        headlineStart: "Where international buyers meet ",
        headlineHighlight: "effortless financing",
        subheading:
          "Independent credit brokerage for international property buyers in Portugal. We compare offers across partner banks, handle all documentation, and support you from pre-check to deed signing — at no direct cost.",
        ctaPrimary: "Start Your Pre-Check",
        ctaSecondary: "See How It Works",
      },
      b2b: {
        headlineStart: "Your clients' financing, ",
        headlineHighlight: "sorted.",
        subheading:
          "We handle the entire financing process for your clients — bank comparison, documentation, and end-to-end support through to deed signing. More deals closed, less paperwork for your team.",
        ctaPrimary: "Become a Partner",
        ctaSecondary: "How the Partnership Works",
      },
      badgeIndependent: "Independent Advisory",
      badgeInternational: "International Clients",
      badgeNoCost: "No Cost to Client",
      scroll: "Scroll",
    },
    // Stats
    stats: {
      eyebrow: "Decisões e Soluções Group",
      headline: "A national reference in credit brokerage",
      years: "Years of Experience",
      stores: "Stores Across Portugal",
      team: "Team Members",
      deeds: "Deeds Completed (2025)",
      growth: "Overall growth in 2025 — historic year for our structure",
    },
    // Services
    services: {
      b2c: {
        eyebrow: "Our Services",
        headline: "How we simplify your financing",
        subheading:
          "From first contact to deed signing, we handle everything so you can focus on what matters — finding your home.",
      },
      b2b: {
        eyebrow: "What We Do",
        headline: "Independent, solution-driven credit brokerage",
        subheading:
          "Personalised advisory with full offer comparison across partner banks. No direct cost to you — ever.",
      },
      preCheck: "Financial Viability Pre-Check",
      preCheckDesc:
        "Quick assessment of your purchasing capacity to set clear expectations from the start.",
      compare: "Compare Multiple Bank Offers",
      compareDesc:
        "We simulate and compare offers across our partner banks to find the best terms for you.",
      docs: "Documentation Management",
      docsDesc:
        "We organise, optimise, and handle all paperwork — even remotely for international clients.",
      negotiation: "Bank Negotiation",
      negotiationDesc:
        "Expert negotiation with partner banking entities to secure optimal conditions.",
      approval: "Full Approval Support",
      approvalDesc:
        "End-to-end support through final approval, deed signing, and funding.",
      transparency: "Total Transparency",
      transparencyDesc:
        "Complete confidentiality and compliance mindset throughout the entire process.",
      intl: {
        b2c: {
          eyebrow: "Who This Is For",
          headline: "Whatever your situation, we can help",
          desc: "Whether you're buying your first home, investing, relocating to Portugal, or restructuring credit — we handle the entire process for you, at no cost.",
          cta: "Start Your Pre-Check",
          ctaHref: "#pre-qualification",
        },
        b2b: {
          eyebrow: "International Clients",
          headline: "Specialist support for non-residents",
          desc: "From remote document handling and coordination with lawyers and notaries, to clear professional communication in English — we make buying property in Portugal seamless.",
          cta: "Get in touch",
          ctaHref: "#contact",
        },
      },
      situationHome: "Buying a Home in Portugal",
      situationInvestment: "Investment & Rental Properties",
      situationRelocation: "Relocation to Portugal",
      situationCredit: "Credit Restructuring",
    },
    // Process
    process: {
      b2c: {
        eyebrow: "How It Works",
        headline: "Simple, transparent process",
        subheading:
          "From first contact to deed signing, we guide you through every step of your financing journey in Portugal.",
      },
      b2b: {
        eyebrow: "How the Partnership Works",
        headline: "Simple for you, complete for your client",
        subheading:
          "Refer your client and we handle the entire financing process. You focus on the sale.",
      },
      step: "Step",
      b2cSteps: {
        step1Title: "Initial Contact",
        step1Desc:
          "We understand your goals, timeframe and context. A short feasibility call is scheduled within 24–48 hours.",
        step1Detail:
          "We explain necessary documentation depending on country, profession, and loan purpose.",
        step2Title: "Review & Scenarios",
        step2Desc:
          "We assess your profile and present clear options. A detailed finance roadmap with budget, down payment expectations, and timeline is shared.",
        step2Detail:
          "We simulate and compare multiple bank offers side by side.",
        step3Title: "Pre-Approval",
        step3Desc:
          "We submit and liaise directly with banks and lenders on your behalf.",
        step3Detail:
          "Weekly status updates after each bank milestone for you and your agent.",
        step4Title: "Formalisation",
        step4Desc:
          "We manage documents and validations end-to-end, coordinating with banks, lawyers, and notaries.",
        step4Detail:
          "All steps are aligned between all parties for a seamless experience.",
        step5Title: "Completion",
        step5Desc:
          "We support you through signing and funding, and assist with all post-deed steps.",
        step5Detail:
          "From deed signing to final settlement — we're with you all the way.",
      },
      b2bSteps: {
        step1Title: "Referral",
        step1Desc:
          "Send us your client's contact. We schedule a feasibility call within 24–48 hours.",
        step1Detail:
          "We inform about required documentation based on profile and loan purpose.",
        step2Title: "Review & Scenarios",
        step2Desc:
          "We assess your client's profile and present clear scenarios with budget, down payment, and timeline.",
        step2Detail:
          "We compare multiple bank offers side by side for your client.",
        step3Title: "Pre-Approval",
        step3Desc:
          "We submit and liaise directly with banks on your client's behalf.",
        step3Detail:
          "We keep you informed with weekly updates after each bank milestone.",
        step4Title: "Formalisation",
        step4Desc:
          "We manage documents and validations end-to-end, coordinating with banks, lawyers, and notaries.",
        step4Detail:
          "All steps are aligned between all parties so the deal moves without delays.",
        step5Title: "Completion & Deed",
        step5Desc:
          "We support signing, funding, and all post-deed steps.",
        step5Detail:
          "From deed signing to final settlement — we ensure everything goes as planned.",
      },
    },
    // Why Us
    whyUs: {
      b2c: {
        eyebrow: "Why Choose Us",
        headline: "Your financing, handled from A to Z",
        subheading:
          "We take care of the entire process so you can focus on finding your home.",
        forBusiness: "What You Get",
        forClients: "How We Work",
        biz1: "Comparison across 10+ partner banks",
        biz2: "Clear financing expectations from day one",
        biz3: "Zero paperwork headaches — we handle it all",
        biz4: "Single point of contact throughout",
        biz5: "No cost to you — ever",
        cli1: "Independent advice, not tied to one bank",
        cli2: "Transparent process at every stage",
        cli3: "Support from pre-check to deed signing",
        cli4: "Confidence navigating Portuguese lenders",
        cli5: "Smooth coordination with lawyers/notaries",
      },
      b2b: {
        eyebrow: "Why Partner with DS",
        headline: "More conversions, less friction",
        subheading:
          "Better client experience for international buyers, and stronger outcomes for your business.",
        forBusiness: "For Your Business",
        forClients: "For Your Clients",
        biz1: "Higher close rate on international leads",
        biz2: "Clear financing expectations early",
        biz3: "Faster document readiness and fewer delays",
        biz4: "Professional communication in English",
        biz5: "Single point of contact and structured updates",
        cli1: "Independent advice and offer comparison",
        cli2: "Transparent process, no direct cost",
        cli3: "Support from pre-check to deed signing",
        cli4: "Confidence navigating Portuguese lenders",
        cli5: "Smooth coordination with lawyers/notaries",
      },
    },
    // Contact
    contact: {
      b2c: {
        eyebrow: "Get in Touch",
        headline: "Have questions? Talk to us.",
        subheading: "We're here to answer any questions about your financing. No commitment, no cost.",
      },
      b2b: {
        eyebrow: "Get in Touch",
        headline: "Ready to simplify your clients' financing?",
        subheading: "Whether you're a real estate agent, relocation specialist, or property developer — let's discuss how we can support your international buyers.",
      },
      location: "Location",
      locationValue: "Av. Bento Gonçalves nº 2, 2910-431 Setúbal",
      email: "Email",
      phone: "Phone",
      formName: "Full Name *",
      formNamePlaceholder: "John Doe",
      formEmail: "Email *",
      formEmailPlaceholder: "john@example.com",
      formPhone: "Phone",
      formPhonePlaceholder: "+351 ...",
      formRole: "Your Role",
      formRoleSelect: "Select...",
      formRoleAgent: "Real Estate Agent",
      formRoleRelocation: "Relocation Specialist",
      formRoleDeveloper: "Property Developer",
      formRoleBuyer: "International Buyer",
      formRoleOther: "Other",
      formGoal: "Credit Goal",
      formGoalSelect: "Select...",
      formGoalBuy: "Buy a property",
      formGoalTransfer: "Transfer existing mortgage",
      formGoalPersonal: "Personal loan",
      formGoalConsolidate: "Debt consolidation",
      formGoalSimulate: "Simulate buying capacity",
      formGoalOther: "Other",
      formMessage: "Message",
      formMessagePlaceholderB2c: "Tell us about your situation...",
      formMessagePlaceholder: "Tell us about your needs...",
      formSubmit: "Send Message",
      formSending: "Sending...",
      formError: "Something went wrong. Please try again or email us directly.",
      formDisclaimer:
        "We respond within 24–48 hours. Your data is kept confidential.",
      successTitle: "Message Sent",
      successMessage:
        "We'll be in touch within 24–48 hours. Thank you for your interest.",
    },
    // Video
    video: {
      eyebrow: "Partner Network",
      headline: "A National Network Working for You",
      description:
        "Part of Portugal's largest credit intermediary group with 170+ offices nationwide.",
      hover: "Hover to play",
    },
    // Audience toggle
    audienceToggle: {
      client: "Private",
      partner: "Partner",
    },
    // Sticky bar
    stickyBar: {
      b2c: {
        text: "Free simulation within 24h — no commitment",
        cta: "Simulate Now",
      },
      b2b: {
        text: "Free partnership — more deals for your business",
        cta: "Become a Partner",
      },
    },
    // Audience selector (PT only — EN stubs for type safety)
    audienceSelector: {
      title: "",
      partner: "",
      client: "",
    },
    // Pre-Qualification (PT only — EN stubs)
    preQualification: {
      eyebrow: "",
      headline: "",
      questionOf: "",
      reset: "",
      q1Title: "",
      q1Desc: "",
      q1a: "",
      q1b: "",
      q1c: "",
      q1d: "",
      q2Title: "",
      q2Desc: "",
      q2a: "",
      q2b: "",
      q2c: "",
      q3Title: "",
      q3Desc: "",
      q3a: "",
      q3b: "",
      q3c: "",
      q3d: "",
      q4Title: "",
      q4Desc: "",
      q4a: "",
      q4b: "",
      q4c: "",
      passTitle: "",
      passDesc: "",
      passCta: "",
      passRestart: "",
      failTitle: "",
      failDesc: "",
      failDetail: "",
      failCta: "",
      failRestart: "",
    },
    // Credit Form (PT only — EN stubs)
    creditForm: {
      eyebrow: "",
      headline: "",
      subheading: "",
      freeBadge: "",
      freeBadgeLabel: "",
      group1Title: "",
      operationType: "",
      operationPlaceholder: "",
      optAquisicao: "",
      optTransferencia: "",
      optPessoal: "",
      optConsolidacao: "",
      group2Title: "",
      helpLabel: "",
      helpPlaceholder: "",
      optSimular: "",
      optImovelEscolhido: "",
      optTransferir: "",
      financingValue: "",
      financingPlaceholder: "",
      propertyChoice: "",
      propertyChosen: "",
      propertySearching: "",
      sellCurrent: "",
      yes: "",
      no: "",
      proponents: "",
      income: "",
      incomeHint: "",
      incomePlaceholder: "",
      group3Title: "",
      firstName: "",
      firstNamePlaceholder: "",
      lastName: "",
      lastNamePlaceholder: "",
      email: "",
      emailPlaceholder: "",
      phone: "",
      phonePlaceholder: "",
      schedule: "",
      scheduleAny: "",
      scheduleMorning: "",
      scheduleAfternoon: "",
      scheduleEvening: "",
      submit: "",
      sending: "",
      disclaimer: "",
      successTitle: "",
      successMessage: "",
      errorMessage: "",
    },
    // Privacy / Cookie Consent
    privacy: {
      cookieTitle: "This website uses cookies",
      cookieDesc: "We use cookies and local storage to improve your experience.",
      cookieAccept: "Accept",
      cookieNecessary: "Necessary only",
      cookiePolicy: "Privacy Policy",
      consentLabel: "I have read and accept the",
      consentLink: "Privacy Policy",
    },
    // Footer
    footer: {
      legal1: "Decisões e Soluções Group",
      legal2: "Intermediário de Crédito Vinculado",
      legal3: "Registered with Banco de Portugal",
      rights: "All rights reserved.",
    },
    // Team
    team: {
      eyebrow: "Our Team",
      headline: "The specialists behind your financing",
      headlineHighlight: "specialists",
      subheading:
        "A dedicated team of credit intermediation professionals committed to finding the best conditions for every client.",
      cta: "Meet the full team",
      bioLabel: "About",
    },
    // Success Stories
    success: {
      eyebrow: "Results",
      headline: "Measured impact",
      headlineHighlight: "impact",
      subheading:
        "We don't just facilitate — we deliver measurable results for our clients and partners.",
      stat1Value: "98%",
      stat1Label: "Approval rate",
      stat2Value: "€2.4M+",
      stat2Label: "Financed in 2024",
      testimonial1Quote:
        "The process was incredibly smooth. They handled everything from documentation to bank negotiation — we just had to sign.",
      testimonial1Name: "Ana & Miguel S.",
      testimonial1Role: "First-time buyers, Setúbal",
      testimonial1Metric: "Approved in 12 days",
      testimonial2Quote:
        "Since partnering with DS Crédito, our conversion rate on financed deals has increased significantly. They close what we bring.",
      testimonial2Name: "Ricardo M.",
      testimonial2Role: "Real Estate Agency, Lisbon",
      testimonial3Quote:
        "As a non-resident, I expected complexity. They made it seamless — remote documentation, clear communication, and a great rate.",
      testimonial3Name: "James W.",
      testimonial3Role: "International buyer, UK",
      testimonial3Metric: "4.2x faster than expected",
      ctaHeadline: "Ready to get started?",
      ctaSubheading:
        "Talk to our team and find the best conditions for your financing.",
      ctaButton: "Contact us",
    },
  },

  pt: {
    // Navbar
    nav: {
      about: "Sobre",
      services: "Serviços",
      process: "Processo",
      whyUs: "Porquê Nós",
      contact: "Contacto",
      cta: "Começar Agora",
      team: "Equipa",
    },
    // Hero
    hero: {
      eyebrow: "Letraperfeiçoada",
      b2c: {
        headlineStart: "O seu crédito, ",
        headlineHighlight: "simplificado.",
        subheading:
          "Comparamos ofertas de múltiplos bancos, tratamos de toda a documentação e acompanhamos o processo do início à escritura — sem custo para si.",
        ctaPrimary: "Simular Crédito",
        ctaSecondary: "Como Funciona",
      },
      b2b: {
        headlineStart: "O crédito dos seus clientes, ",
        headlineHighlight: "resolvido.",
        subheading:
          "Tratamos de todo o processo de financiamento dos seus clientes — comparação bancária, documentação e acompanhamento até à escritura. Mais negócios fechados, menos burocracia para a sua equipa.",
        ctaPrimary: "Tornar-se Parceiro",
        ctaSecondary: "Como Funciona a Parceria",
      },
      badgeIndependent: "Intermediário Independente",
      badgeInternational: "Particulares & Empresas",
      badgeNoCost: "Sem Custo para o Seu Cliente",
      scroll: "Descer",
    },
    // Stats
    stats: {
      eyebrow: "Grupo Decisões e Soluções",
      headline: "Uma referência nacional em intermediação de crédito",
      years: "Anos de Experiência",
      stores: "Lojas em Portugal",
      team: "Colaboradores",
      deeds: "Escrituras Realizadas (2025)",
      growth: "Crescimento global em 2025 — ano histórico para a nossa estrutura",
    },
    // Services
    services: {
      b2c: {
        eyebrow: "Os Nossos Serviços",
        headline: "Como simplificamos o seu crédito",
        subheading:
          "Do primeiro contacto à escritura, tratamos de tudo para que se foque no que importa — encontrar a sua casa.",
      },
      b2b: {
        eyebrow: "O Que Fazemos Pelos Seus Clientes",
        headline: "Tratamos do crédito para que feche mais negócios",
        subheading:
          "Acompanhamento completo do financiamento dos seus clientes — comparação de ofertas, gestão documental e negociação bancária. Sem custo direto para o comprador.",
      },
      preCheck: "Pré-Análise de Viabilidade",
      preCheckDesc:
        "Avaliação rápida da capacidade de compra do seu cliente para definir expectativas claras antes de avançar.",
      compare: "Comparação de Ofertas Bancárias",
      compareDesc:
        "Simulamos e comparamos ofertas de múltiplos bancos parceiros para encontrar as melhores condições para cada caso.",
      docs: "Gestão Documental Completa",
      docsDesc:
        "Organizamos e tratamos de toda a documentação necessária — o seu cliente e a sua equipa não perdem tempo com burocracia.",
      negotiation: "Negociação Bancária Especializada",
      negotiationDesc:
        "Negociamos diretamente com as entidades bancárias para garantir as condições mais competitivas.",
      approval: "Acompanhamento até à Escritura",
      approvalDesc:
        "Suporte de ponta a ponta até à aprovação final, escritura e financiamento — sem surpresas.",
      transparency: "Transparência e Conformidade",
      transparencyDesc:
        "Total confidencialidade e conformidade regulatória em cada etapa do processo.",
      intl: {
        b2c: {
          eyebrow: "Para Quem é Este Serviço",
          headline: "Seja qual for a sua situação, podemos ajudar",
          desc: "Quer esteja a comprar a sua primeira casa, a investir, a mudar-se para Portugal ou a reestruturar crédito — tratamos de todo o processo por si, sem custo.",
          cta: "Simular Crédito",
          ctaHref: "#pre-qualification",
        },
        b2b: {
          eyebrow: "Clientes Internacionais",
          headline: "Também tratamos de clientes não-residentes",
          desc: "Se tem clientes estrangeiros a comprar em Portugal, tratamos de tudo: documentação remota, coordenação com advogados e notários, e comunicação profissional em inglês.",
          cta: "Saber mais",
          ctaHref: "#contact",
        },
      },
      situationHome: "Compra de Habitação",
      situationInvestment: "Investimento & Arrendamento",
      situationRelocation: "Mudança para Portugal",
      situationCredit: "Reestruturação de Crédito",
    },
    // Process
    process: {
      b2c: {
        eyebrow: "O Processo",
        headline: "Como funciona",
        subheading:
          "Do primeiro contacto à escritura, acompanhamos cada etapa do seu financiamento.",
      },
      b2b: {
        eyebrow: "Como Funciona a Parceria",
        headline: "Simples para si, completo para o seu cliente",
        subheading:
          "Encaminhe o seu cliente e nós tratamos de todo o processo de financiamento. Você foca-se na venda.",
      },
      step: "Passo",
      b2cSteps: {
        step1Title: "Contacto Inicial",
        step1Desc:
          "Contacte-nos para uma avaliação gratuita da sua capacidade de financiamento. Respondemos em 24-48 horas.",
        step1Detail:
          "Saiba quanto pode financiar sem compromisso.",
        step2Title: "Análise & Simulação",
        step2Desc:
          "Avaliamos o seu perfil e apresentamos cenários claros com orçamento, entrada necessária e cronograma.",
        step2Detail:
          "Receba propostas de múltiplos bancos sem sair de casa.",
        step3Title: "Pré-Aprovação",
        step3Desc:
          "Submetemos o seu pedido aos bancos parceiros e negociamos as melhores condições para o seu caso.",
        step3Detail:
          "Tratamos de tudo com os bancos por si.",
        step4Title: "Formalização",
        step4Desc:
          "Organizamos toda a documentação necessária e coordenamos com advogados, notários e bancos.",
        step4Detail:
          "Zero burocracia para si.",
        step5Title: "Escritura",
        step5Desc:
          "Acompanhamos até à assinatura da escritura e apoiamos nos passos pós-conclusão.",
        step5Detail:
          "Estamos consigo até ao fim.",
      },
      b2bSteps: {
        step1Title: "Encaminhamento",
        step1Desc:
          "Envia-nos o contacto do seu cliente. Agendamos uma chamada de viabilidade em 24–48 horas.",
        step1Detail:
          "Informamos sobre a documentação necessária consoante o perfil e finalidade do crédito.",
        step2Title: "Análise & Simulação",
        step2Desc:
          "Avaliamos o perfil do cliente e apresentamos cenários claros com orçamento, entrada necessária e cronograma.",
        step2Detail:
          "Comparamos múltiplas ofertas bancárias lado a lado para o seu cliente.",
        step3Title: "Pré-Aprovação",
        step3Desc:
          "Submetemos e articulamos diretamente com os bancos em nome do seu cliente.",
        step3Detail:
          "Mantemo-lo informado com atualizações semanais após cada etapa bancária.",
        step4Title: "Formalização",
        step4Desc:
          "Gerimos documentos e validações de ponta a ponta, coordenando com bancos, advogados e notários.",
        step4Detail:
          "Todas as etapas são alinhadas entre todas as partes para que o negócio avance sem atrasos.",
        step5Title: "Escritura & Conclusão",
        step5Desc:
          "Apoiamos na assinatura, financiamento e todos os passos pós-escritura.",
        step5Detail:
          "Da escritura à liquidação final — garantimos que tudo corre como previsto.",
      },
    },
    // Why Us
    whyUs: {
      b2c: {
        eyebrow: "Porquê Nós",
        headline: "O seu financiamento, tratado de A a Z",
        subheading:
          "Tratamos de todo o processo para que se foque no que importa — encontrar a sua casa.",
        forBusiness: "O Que Ganha",
        forClients: "Como Trabalhamos",
        biz1: "Comparação em mais de 10 bancos parceiros",
        biz2: "Expectativas claras de financiamento desde o primeiro dia",
        biz3: "Zero burocracia — tratamos de tudo por si",
        biz4: "Um único ponto de contacto do início ao fim",
        biz5: "Sem qualquer custo para si — nunca",
        cli1: "Aconselhamento independente, sem ligação a um só banco",
        cli2: "Processo transparente em cada etapa",
        cli3: "Acompanhamento dedicado da pré-análise à escritura",
        cli4: "Confiança num processo bem gerido e profissional",
        cli5: "Coordenação fluida com advogados, notários e bancos",
      },
      b2b: {
        eyebrow: "Vantagens da Parceria",
        headline: "Mais negócios fechados, menos dores de cabeça",
        subheading:
          "Ao trabalhar connosco, os seus clientes têm financiamento tratado de A a Z — e você ganha mais tempo e mais negócios.",
        forBusiness: "Para a Sua Empresa",
        forClients: "Para os Seus Clientes",
        biz1: "Maior taxa de fecho — clientes financiados mais rápido",
        biz2: "Viabilidade financeira clara antes de avançar com propostas",
        biz3: "Menos atrasos por documentação ou burocracias bancárias",
        biz4: "Ponto de contacto único com atualizações regulares",
        biz5: "Diferenciação: ofereça um serviço completo aos seus clientes",
        cli1: "Aconselhamento independente e comparação real de ofertas",
        cli2: "Processo transparente, sem custo direto para o comprador",
        cli3: "Acompanhamento dedicado da pré-análise à escritura",
        cli4: "Confiança num processo bem gerido e profissional",
        cli5: "Coordenação fluida com advogados, notários e bancos",
      },
    },
    // Contact
    contact: {
      b2c: {
        eyebrow: "Contacte-nos",
        headline: "Tem dúvidas? Fale connosco.",
        subheading: "Estamos disponíveis para esclarecer qualquer questão sobre o seu crédito. Sem compromisso, sem custos.",
      },
      b2b: {
        eyebrow: "Contacte-nos",
        headline: "Quer oferecer crédito como serviço aos seus clientes?",
        subheading: "Se é agente imobiliário, mediador, promotor imobiliário, advogado, contabilista ou profissional liberal — vamos conversar sobre como podemos ajudar a fechar mais negócios juntos.",
      },
      location: "Localização",
      locationValue: "Av. Bento Gonçalves nº 2, 2910-431 Setúbal",
      email: "Email",
      phone: "Telefone",
      formName: "Nome Completo *",
      formNamePlaceholder: "João Silva",
      formEmail: "Email *",
      formEmailPlaceholder: "joao@exemplo.com",
      formPhone: "Telefone",
      formPhonePlaceholder: "+351 ...",
      formRole: "A Sua Função",
      formRoleSelect: "Selecionar...",
      formRoleAgent: "Agente Imobiliário",
      formRoleRelocation: "Mediador de Seguros",
      formRoleDeveloper: "Promotor Imobiliário",
      formRoleBuyer: "Consultor Financeiro",
      formRoleOther: "Outro",
      formGoal: "Objetivo do Crédito",
      formGoalSelect: "Selecionar...",
      formGoalBuy: "Comprar imóvel",
      formGoalTransfer: "Transferir crédito habitação",
      formGoalPersonal: "Crédito pessoal",
      formGoalConsolidate: "Consolidação de créditos",
      formGoalSimulate: "Simular capacidade de compra",
      formGoalOther: "Outro",
      formMessage: "Mensagem",
      formMessagePlaceholderB2c: "Conte-nos sobre a sua situação...",
      formMessagePlaceholder: "Conte-nos sobre o seu negócio e como podemos colaborar...",
      formSubmit: "Enviar Mensagem",
      formSending: "A enviar...",
      formError: "Algo correu mal. Tente novamente ou envie-nos um email diretamente.",
      formDisclaimer:
        "Respondemos em 24–48 horas. Os seus dados são tratados com total confidencialidade.",
      successTitle: "Mensagem Enviada",
      successMessage:
        "Entraremos em contacto em 24–48 horas. Obrigado pelo seu interesse na parceria.",
    },
    // Video
    video: {
      eyebrow: "Rede de Parceiros",
      headline: "Faça Parte da Maior Rede de Crédito em Portugal",
      description:
        "Com mais de 170 lojas em todo o país, a DS é o maior grupo de intermediação de crédito em Portugal. Junte-se à nossa rede de parceiros.",
      hover: "Passe o rato para reproduzir",
    },
    // Audience toggle
    audienceToggle: {
      client: "Particular",
      partner: "Parceiro",
    },
    // Sticky bar
    stickyBar: {
      b2c: {
        text: "Simulação gratuita em 24h — sem compromisso",
        cta: "Simular Agora",
      },
      b2b: {
        text: "Parceria sem custos — mais negócios para a sua empresa",
        cta: "Tornar-se Parceiro",
      },
    },
    // Audience selector
    audienceSelector: {
      title: "Que tipo de utilizador é?",
      partner: "Sou Parceiro / Empresa",
      client: "Sou Particular",
    },
    // Pre-Qualification
    preQualification: {
      eyebrow: "Pré-Qualificação",
      headline: "Verifique se reúne as condições para crédito habitação",
      questionOf: "Pergunta {current} de {total}",
      reset: "Recomeçar",
      q1Title: "Qual é a sua situação laboral?",
      q1Desc: "A estabilidade profissional é um dos critérios principais na aprovação de crédito.",
      q1a: "Trabalhador por conta de outrem (efetivo)",
      q1b: "Trabalhador por conta de outrem (contrato a termo)",
      q1c: "Trabalhador independente / empresário",
      q1d: "Desempregado / Sem rendimentos",
      q2Title: "Tem capitais próprios de pelo menos 10%?",
      q2Desc: "O financiamento bancário cobre normalmente até 90% do valor do imóvel. Precisa de ter pelo menos 10% do valor como entrada.",
      q2a: "Sim, tenho 10% ou mais do valor do imóvel",
      q2b: "Tenho entre 5% e 10%",
      q2c: "Não tenho capitais próprios",
      q3Title: "Qual é o seu estatuto de residência?",
      q3Desc: "A residência em Portugal é um fator determinante na aprovação do crédito habitação.",
      q3a: "Residente permanente / Nacionalidade portuguesa",
      q3b: "Residência temporária há mais de 4 anos",
      q3c: "Residência temporária há menos de 4 anos",
      q3d: "Não resido em Portugal",
      q4Title: "Tem outros créditos ou encargos mensais?",
      q4Desc: "A taxa de esforço total (todos os créditos) não deve ultrapassar ~35% do rendimento líquido.",
      q4a: "Não tenho outros créditos",
      q4b: "Sim, mas representam menos de 35% do meu rendimento",
      q4c: "Sim, representam mais de 35% do meu rendimento",
      passTitle: "Parabéns! Cumpre os critérios iniciais.",
      passDesc: "Com base nas suas respostas, reúne as condições básicas para avançar com a simulação de crédito habitação.",
      passCta: "Avançar para Formulário",
      passRestart: "Repetir pré-qualificação",
      failTitle: "A sua situação pode ter soluções.",
      failDesc: "Embora não cumpra todos os critérios padrão, cada caso é único. Preencha o formulário e a nossa equipa analisa pessoalmente as suas opções.",
      failDetail: "Sem qualquer custo para si — analisamos cada caso em detalhe e encontramos alternativas.",
      failCta: "Avançar para Formulário",
      failRestart: "Repetir pré-qualificação",
    },
    // Credit Form
    creditForm: {
      eyebrow: "Pedido de Crédito",
      headline: "Formulário de Pedido de Crédito",
      subheading: "Preencha o formulário e receba o contacto de um especialista em menos de 24h.",
      freeBadge: "0€",
      freeBadgeLabel: "Serviço\ngratuito",
      group1Title: "Qual será o tipo de operação?",
      operationType: "Tipo de Operação",
      operationPlaceholder: "Selecione uma opção",
      optAquisicao: "Quero adquirir um novo imóvel com Crédito Habitação",
      optTransferencia: "Transferir o meu Crédito Habitação",
      optPessoal: "Crédito Pessoal",
      optConsolidacao: "Consolidação de Créditos",
      group2Title: "Preencha com a informação referente ao seu caso",
      helpLabel: "Em que podemos ajudar?",
      helpPlaceholder: "Selecione uma opção",
      optSimular: "Simular que imóvel consigo comprar",
      optImovelEscolhido: "Já tenho imóvel escolhido",
      optTransferir: "Quero transferir crédito",
      financingValue: "Valor a financiar",
      financingPlaceholder: "50.000",
      propertyChoice: "Escolha do imóvel",
      propertyChosen: "Já tenho imóvel escolhido",
      propertySearching: "Ainda estou à procura",
      sellCurrent: "Pensa vender o seu imóvel atual?",
      yes: "Sim",
      no: "Não",
      proponents: "Número de proponentes",
      income: "Rendimento total do agregado",
      incomeHint: "Valor líquido mensal",
      incomePlaceholder: "1.000",
      group3Title: "Preencha com os seus dados de contacto",
      firstName: "Nome",
      firstNamePlaceholder: "Ana",
      lastName: "Apelido",
      lastNamePlaceholder: "Sousa",
      email: "Email",
      emailPlaceholder: "ana.sousa@mail.com",
      phone: "Telefone",
      phonePlaceholder: "000 000 000",
      schedule: "Horário preferencial de contacto",
      scheduleAny: "Qualquer hora",
      scheduleMorning: "Manhã (9h-12h)",
      scheduleAfternoon: "Tarde (14h-18h)",
      scheduleEvening: "Final do dia (18h-20h)",
      submit: "Enviar Pedido",
      sending: "A enviar...",
      disclaimer: "Serviço totalmente gratuito. Respondemos em menos de 24h.",
      successTitle: "Pedido Enviado!",
      successMessage: "Um especialista entrará em contacto consigo em menos de 24 horas. Obrigado pela confiança.",
      errorMessage: "Algo correu mal. Tente novamente ou ligue-nos diretamente.",
    },
    // Privacy / Cookie Consent
    privacy: {
      cookieTitle: "Este site utiliza cookies",
      cookieDesc: "Utilizamos cookies e armazenamento local para melhorar a sua experiência.",
      cookieAccept: "Aceitar",
      cookieNecessary: "Apenas necessários",
      cookiePolicy: "Política de Privacidade",
      consentLabel: "Li e aceito a",
      consentLink: "Política de Privacidade",
    },
    // Footer
    footer: {
      legal1: "Grupo Decisões e Soluções",
      legal2: "Intermediário de Crédito Vinculado",
      legal3: "Registado no Banco de Portugal",
      rights: "Todos os direitos reservados.",
    },
    // Team
    team: {
      eyebrow: "A Nossa Equipa",
      headline: "Os especialistas por trás do seu crédito",
      headlineHighlight: "especialistas",
      subheading:
        "Uma equipa dedicada de profissionais de intermediação de crédito, empenhada em encontrar as melhores condições para cada cliente.",
      cta: "Conhecer toda a equipa",
      bioLabel: "Sobre",
    },
    // Success Stories
    success: {
      eyebrow: "Resultados",
      headline: "Impacto mensurável",
      headlineHighlight: "Impacto",
      subheading:
        "Não nos limitamos a facilitar — entregamos resultados concretos aos nossos clientes e parceiros.",
      stat1Value: "98%",
      stat1Label: "Taxa de aprovação",
      stat2Value: "€2.4M+",
      stat2Label: "Financiados em 2024",
      testimonial1Quote:
        "O processo foi incrivelmente simples. Trataram de tudo, desde a documentação à negociação bancária — só tivemos de assinar.",
      testimonial1Name: "Ana & Miguel S.",
      testimonial1Role: "Primeiros compradores, Setúbal",
      testimonial1Metric: "Aprovado em 12 dias",
      testimonial2Quote:
        "Desde que fazemos parceria com a DS Crédito, a nossa taxa de conversão em negócios financiados aumentou significativamente.",
      testimonial2Name: "Ricardo M.",
      testimonial2Role: "Agência imobiliária, Lisboa",
      testimonial3Quote:
        "Como não-residente, esperava complexidade. Tornaram tudo simples — documentação remota, comunicação clara e uma excelente taxa.",
      testimonial3Name: "James W.",
      testimonial3Role: "Comprador internacional, UK",
      testimonial3Metric: "4.2x mais rápido que o esperado",
      ctaHeadline: "Pronto para começar?",
      ctaSubheading:
        "Fale com a nossa equipa e encontre as melhores condições para o seu financiamento.",
      ctaButton: "Contacte-nos",
    },
  },
};

export type Translations = (typeof translations)["en"];
