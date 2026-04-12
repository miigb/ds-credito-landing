import { siteConfig } from "./siteConfig";

const ACCENT = "#A30F4F";
const HEADER_BG = "#1E293B";
const DARK = "#334155";
const MUTED = "#64748B";
const LIGHT_BG = "#F8FAFC";
const BORDER = "#E2E8F0";
// Absolute URL for email clients — must be the live domain
const LOGO_URL = "https://meuintermediario.com/ds-credito-logo.png";

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body{margin:0;padding:0;background:${LIGHT_BG};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
    .wrapper{max-width:600px;margin:0 auto;background:#ffffff}
    .header{background:${HEADER_BG};padding:32px 40px;text-align:center}
    .wordmark{font-size:22px;letter-spacing:1.5px;color:#ffffff}
    .wordmark b{font-weight:700}
    .wordmark span{font-weight:300}
    .subtitle{font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.5px;margin-top:6px}
    .body{padding:40px}
    .greeting{font-size:20px;font-weight:700;color:${DARK};margin:0 0 16px 0}
    .text{font-size:15px;color:#334155;line-height:1.7;margin:0 0 16px 0}
    .divider{height:2px;background:linear-gradient(90deg,${ACCENT},#D9286F);border-radius:1px;width:80px;margin:24px 0}
    .steps{margin:0;padding:0;list-style:none}
    .steps li{font-size:14px;color:#475569;line-height:1.6;padding:8px 0 8px 28px;position:relative}
    .steps li::before{content:attr(data-n);position:absolute;left:0;top:8px;width:20px;height:20px;border-radius:50%;background:${ACCENT};color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:20px}
    .cta-box{background:${HEADER_BG};border-radius:12px;padding:28px 32px;text-align:center;margin:28px 0}
    .cta-title{font-size:16px;font-weight:700;color:#ffffff;margin:0 0 8px 0}
    .cta-text{font-size:13px;color:rgba(255,255,255,0.6);margin:0 0 16px 0}
    .cta-btn{display:inline-block;background:${ACCENT};color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none}
    .footer{background:${LIGHT_BG};padding:28px 40px;border-top:1px solid ${BORDER}}
    .footer-name{font-size:13px;font-weight:600;color:${DARK};margin:0 0 4px 0}
    .footer-text{font-size:12px;color:${MUTED};line-height:1.6;margin:0}
    .footer-text a{color:${ACCENT};text-decoration:none}
    .footer-reg{font-size:11px;color:#94A3B8;margin-top:12px}
    .footer-reg a{color:#94A3B8;text-decoration:underline}
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="wordmark"><b>LETRA</b><span>PERFEI&Ccedil;OADA</span></div>
      <div style="font-size:12px;color:${ACCENT};letter-spacing:2px;font-weight:600;margin-top:10px;text-transform:uppercase">Uma Quest&atilde;o de Compromisso</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.5px;margin-top:8px">Intermediários de Crédito</div>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p class="footer-name">${siteConfig.name}</p>
      <p class="footer-text">
        ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}<br>
        <a href="tel:${siteConfig.phone.replace(/\s/g, "")}">${siteConfig.phone}</a> &middot;
        <a href="mailto:${siteConfig.email}">${siteConfig.email}</a><br>
        <a href="${siteConfig.url}">${siteConfig.url.replace("https://", "")}</a>
      </p>
      <p class="footer-reg">
        ${siteConfig.legalName} &middot; Intermediário de Crédito Vinculado<br>
        Banco de Portugal Nº <a href="${siteConfig.regulation.registryUrl}">${siteConfig.regulation.registrationNumber}</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// --- B2B Contact Auto-Reply ---

export function b2bContactPT(name: string) {
  return layout(`
    <p class="greeting">Olá ${name},</p>
    <p class="text">Recebemos o seu pedido de contacto. Obrigado pelo interesse em trabalhar connosco.</p>
    <p class="text">A nossa equipa irá analisar a sua mensagem e entrará em contacto consigo <strong>em menos de 24 horas</strong>.</p>
    <div class="divider"></div>
    <p class="text" style="font-weight:600;color:${DARK}">O que acontece a seguir:</p>
    <ol class="steps">
      <li data-n="1">Análise do seu pedido pela nossa equipa</li>
      <li data-n="2">Contacto por telefone ou email para agendar reunião</li>
      <li data-n="3">Reunião para discutir a parceria e próximos passos</li>
    </ol>
    <div class="cta-box">
      <p class="cta-title">Precisa de falar connosco antes?</p>
      <p class="cta-text">Estamos disponíveis por telefone nos dias úteis das 9h às 18h.</p>
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn" style="color:#ffffff!important;text-decoration:none">Ligar ${siteConfig.phone}</a>
    </div>
  `);
}

export function b2bContactEN(name: string) {
  return layout(`
    <p class="greeting">Hello ${name},</p>
    <p class="text">We have received your contact request. Thank you for your interest in partnering with us.</p>
    <p class="text">Our team will review your message and get back to you <strong>within 24 hours</strong>.</p>
    <div class="divider"></div>
    <p class="text" style="font-weight:600;color:${DARK}">What happens next:</p>
    <ol class="steps">
      <li data-n="1">Our team reviews your request</li>
      <li data-n="2">We contact you by phone or email to schedule a meeting</li>
      <li data-n="3">Meeting to discuss the partnership and next steps</li>
    </ol>
    <div class="cta-box">
      <p class="cta-title">Need to reach us sooner?</p>
      <p class="cta-text">We're available by phone on weekdays from 9am to 6pm.</p>
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn" style="color:#ffffff!important;text-decoration:none">Call ${siteConfig.phone}</a>
    </div>
  `);
}

// --- B2C Credit Request Auto-Reply ---

export function b2cCreditPT(name: string) {
  return layout(`
    <p class="greeting">Olá ${name},</p>
    <p class="text">Recebemos o seu pedido de simulação de crédito. Obrigado pela confiança na DS Crédito.</p>
    <p class="text">Com base na sua pré-qualificação, reúne as condições iniciais para avançar. Um especialista irá contactá-lo <strong>em menos de 24 horas</strong> para analisar o seu caso em detalhe.</p>
    <div class="divider"></div>
    <p class="text" style="font-weight:600;color:${DARK}">O que acontece a seguir:</p>
    <ol class="steps">
      <li data-n="1">Análise detalhada do seu perfil financeiro</li>
      <li data-n="2">Simulação e comparação de ofertas de múltiplos bancos</li>
      <li data-n="3">Apresentação das melhores condições para o seu caso</li>
      <li data-n="4">Acompanhamento completo até à escritura</li>
    </ol>
    <div class="cta-box">
      <p class="cta-title">Serviço 100% gratuito</p>
      <p class="cta-text">Não tem qualquer custo para si. Somos remunerados pelas instituições bancárias.</p>
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn" style="color:#ffffff!important;text-decoration:none">Ligar ${siteConfig.phone}</a>
    </div>
  `);
}

// --- B2B Advogados Outreach Email ---

const CONTACT_URL = "https://meuintermediario.com/#contact";
const LANDING_URL = "https://meuintermediario.com";

// Color schemes combining landing page design system + brand guide
export type EmailColorScheme = "default" | "brand-plum" | "slate-teal" | "warm-gold" | "deep-navy" | "light-rose" | "light-mint" | "light-lavender" | "light-gold" | "light-slate";

interface SchemeColors {
  label: string;
  headerBg: string;
  headerText: string;       // wordmark + subtitle text on header
  heroGradient: string;
  heroText: string;          // hero heading text
  heroSubText: string;       // hero subtitle
  ctaGradient: string;
  ctaText: string;           // CTA section text
  primary: string;
  primaryHover: string;
  iconHighlight: string;
  iconBg: string;
  bodyText: string;
  mutedText: string;
  lightMuted: string;
  borderColor: string;
  footerBg: string;
  pageBg: string;
  glassBorder: string;
}

export const EMAIL_SCHEMES: Record<EmailColorScheme, SchemeColors> = {
  // V1: Original — landing page design system (dark)
  "default": {
    label: "Original",
    headerBg: "#0F172A", headerText: "#ffffff",
    heroGradient: "linear-gradient(160deg,#0F172A 0%,#1a1f3a 40%,#2a1a2e 70%,#5B0A2E 100%)",
    heroText: "#ffffff", heroSubText: "rgba(255,255,255,0.5)",
    ctaGradient: "linear-gradient(160deg,#0F172A 0%,#1a1f3a 40%,#2a1a2e 70%,#5B0A2E 100%)",
    ctaText: "#ffffff",
    primary: "#A30F4F", primaryHover: "#D9286F",
    iconHighlight: "#E85D91", iconBg: "#FEF1F6",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F8FAFC",
    glassBorder: "rgba(255,255,255,0.12)",
  },
  // V2: Brand Plum (dark)
  "brand-plum": {
    label: "Brand Plum",
    headerBg: "#181015", headerText: "#ffffff",
    heroGradient: "linear-gradient(135deg,#181015 0%,#2b1620 50%,#230f1a 100%)",
    heroText: "#ffffff", heroSubText: "rgba(255,255,255,0.5)",
    ctaGradient: "linear-gradient(135deg,#230f1a 0%,#2b1620 50%,#181015 100%)",
    ctaText: "#ffffff",
    primary: "#d60072", primaryHover: "#AC0F5A",
    iconHighlight: "#d60072", iconBg: "#fdf2f7",
    bodyText: "#181015", mutedText: "#8d5e77", lightMuted: "#8d5e77",
    borderColor: "#ecdfe6", footerBg: "#f8f5f7", pageBg: "#f8f5f7",
    glassBorder: "rgba(255,255,255,0.15)",
  },
  // V3: Slate & Teal (dark)
  "slate-teal": {
    label: "Slate & Teal",
    headerBg: "#0F172A", headerText: "#ffffff",
    heroGradient: "linear-gradient(160deg,#0F172A 0%,#134e4a 100%)",
    heroText: "#ffffff", heroSubText: "rgba(255,255,255,0.5)",
    ctaGradient: "linear-gradient(160deg,#0F172A 0%,#134e4a 100%)",
    ctaText: "#ffffff",
    primary: "#0d9488", primaryHover: "#14b8a6",
    iconHighlight: "#2dd4bf", iconBg: "#f0fdfa",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F8FAFC",
    glassBorder: "rgba(255,255,255,0.12)",
  },
  // V4: Warm Gold (dark)
  "warm-gold": {
    label: "Warm Gold",
    headerBg: "#1a1118", headerText: "#ffffff",
    heroGradient: "linear-gradient(160deg,#1a1118 0%,#2b1620 40%,#3d2010 100%)",
    heroText: "#ffffff", heroSubText: "rgba(255,255,255,0.5)",
    ctaGradient: "linear-gradient(160deg,#1a1118 0%,#2b1620 40%,#3d2010 100%)",
    ctaText: "#ffffff",
    primary: "#b8860b", primaryHover: "#e6a817",
    iconHighlight: "#e6a817", iconBg: "#fef9ee",
    bodyText: "#1a1118", mutedText: "#6b5563", lightMuted: "#8d5e77",
    borderColor: "#ecdfe6", footerBg: "#f8f5f7", pageBg: "#f8f5f7",
    glassBorder: "rgba(255,255,255,0.15)",
  },
  // V5: Deep Navy (dark)
  "deep-navy": {
    label: "Deep Navy",
    headerBg: "#0c1222", headerText: "#ffffff",
    heroGradient: "linear-gradient(160deg,#0c1222 0%,#1e293B 50%,#1e3a5f 100%)",
    heroText: "#ffffff", heroSubText: "rgba(255,255,255,0.5)",
    ctaGradient: "linear-gradient(160deg,#0c1222 0%,#1e293B 50%,#1e3a5f 100%)",
    ctaText: "#ffffff",
    primary: "#2563eb", primaryHover: "#3b82f6",
    iconHighlight: "#60a5fa", iconBg: "#eff6ff",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F8FAFC",
    glassBorder: "rgba(255,255,255,0.12)",
  },
  // V6: Light Rose — light header with brand magenta accents
  "light-rose": {
    label: "Light Rose",
    headerBg: "#ffffff", headerText: "#A30F4F",
    heroGradient: "linear-gradient(135deg,#FEF1F6 0%,#fce4f0 100%)",
    heroText: "#0F172A", heroSubText: "#A30F4F",
    ctaGradient: "linear-gradient(135deg,#FEF1F6 0%,#fce4f0 100%)",
    ctaText: "#0F172A",
    primary: "#A30F4F", primaryHover: "#D9286F",
    iconHighlight: "#E85D91", iconBg: "#FEF1F6",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F8FAFC",
    glassBorder: "rgba(163,15,79,0.2)",
  },
  // V7: Light Mint — light header with teal accents
  "light-mint": {
    label: "Light Mint",
    headerBg: "#ffffff", headerText: "#0d9488",
    heroGradient: "linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 100%)",
    heroText: "#0F172A", heroSubText: "#0d9488",
    ctaGradient: "linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 100%)",
    ctaText: "#0F172A",
    primary: "#0d9488", primaryHover: "#14b8a6",
    iconHighlight: "#2dd4bf", iconBg: "#f0fdfa",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F8FAFC",
    glassBorder: "rgba(13,148,136,0.2)",
  },
  // V8: Light Lavender — soft purple/blue
  "light-lavender": {
    label: "Light Lavender",
    headerBg: "#ffffff", headerText: "#6d28d9",
    heroGradient: "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)",
    heroText: "#0F172A", heroSubText: "#6d28d9",
    ctaGradient: "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)",
    ctaText: "#0F172A",
    primary: "#7c3aed", primaryHover: "#8b5cf6",
    iconHighlight: "#a78bfa", iconBg: "#f5f3ff",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#faf8ff", pageBg: "#faf8ff",
    glassBorder: "rgba(124,58,237,0.2)",
  },
  // V9: Light Gold — warm cream with gold accents
  "light-gold": {
    label: "Light Gold",
    headerBg: "#ffffff", headerText: "#92400e",
    heroGradient: "linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%)",
    heroText: "#1a1118", heroSubText: "#92400e",
    ctaGradient: "linear-gradient(135deg,#fffbeb 0%,#fef3c7 100%)",
    ctaText: "#1a1118",
    primary: "#b45309", primaryHover: "#d97706",
    iconHighlight: "#f59e0b", iconBg: "#fffbeb",
    bodyText: "#1a1118", mutedText: "#6b5563", lightMuted: "#8d5e77",
    borderColor: "#ecdfe6", footerBg: "#fffdf7", pageBg: "#fffdf7",
    glassBorder: "rgba(180,83,9,0.2)",
  },
  // V10: Light Slate — clean minimal gray with brand accent
  "light-slate": {
    label: "Light Slate",
    headerBg: "#F8FAFC", headerText: "#0F172A",
    heroGradient: "linear-gradient(135deg,#F1F5F9 0%,#E2E8F0 100%)",
    heroText: "#0F172A", heroSubText: "#64748B",
    ctaGradient: "linear-gradient(135deg,#F1F5F9 0%,#E2E8F0 100%)",
    ctaText: "#0F172A",
    primary: "#A30F4F", primaryHover: "#D9286F",
    iconHighlight: "#E85D91", iconBg: "#FEF1F6",
    bodyText: "#0F172A", mutedText: "#64748B", lightMuted: "#94A3B8",
    borderColor: "#E2E8F0", footerBg: "#F8FAFC", pageBg: "#F1F5F9",
    glassBorder: "rgba(163,15,79,0.2)",
  },
};

export type EmailLayout = "full" | "compact" | "card-first" | "executive" | "sidebar";

export const EMAIL_LAYOUTS: Record<EmailLayout, { label: string; description: string }> = {
  full: { label: "Full Hero", description: "Hero banner + cards + stats + CTA" },
  compact: { label: "Compact", description: "Accent bar, inline features, streamlined" },
  "card-first": { label: "Card First", description: "Features above the fold, body below" },
  executive: { label: "Executive", description: "Clean letter, single CTA, no cards" },
  sidebar: { label: "Sidebar", description: "Left accent stripe, integrated stats" },
};

interface OutreachParams {
  recipientName: string;
  agentName: string;
  agentTitle: string;
  agentEmail: string;
  storeName: string;
  bdpNumber: string;
  scheme?: EmailColorScheme;
  layout?: EmailLayout;
}

// --- Shared HTML building blocks ---

function _wrap(s: SchemeColors, inner: string) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body{margin:0;padding:0;background:${s.pageBg};font-family:'Inter','Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
    .wrapper{max-width:600px;margin:0 auto;background:#ffffff}
  </style>
</head>
<body>
  <div class="wrapper">
${inner}
  </div>
</body>
</html>`;
}

function _header(s: SchemeColors) {
  const subColor = s.headerText === "#ffffff" ? "rgba(255,255,255,0.4)" : s.mutedText;
  const border = s.headerBg === "#ffffff" ? `border-bottom:1px solid ${s.borderColor};` : "";
  return `    <div style="background:${s.headerBg};padding:24px 32px;text-align:center;${border}">
      <div style="font-size:20px;letter-spacing:1.5px;color:${s.headerText}"><b>LETRA</b><span style="font-weight:300">PERFEI&Ccedil;OADA</span></div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px auto 0 auto">
        <tr>
          <td style="font-size:10px;color:${subColor};letter-spacing:0.5px;padding-right:6px;vertical-align:middle">Intermediários de Crédito</td>
          <td style="vertical-align:middle"><img src="${LOGO_URL}" alt="DS" width="18" height="18" style="border-radius:3px;display:block" /></td>
          <td style="font-size:10px;color:${subColor};letter-spacing:0.5px;padding-left:4px;vertical-align:middle">DS Cr&eacute;dito</td>
        </tr>
      </table>
    </div>`;
}

function _hero(s: SchemeColors) {
  return `    <div style="background:${s.heroGradient};padding:48px 40px;text-align:center">
      <h1 style="margin:0;font-size:26px;font-weight:900;font-style:italic;color:${s.heroText};line-height:1.2;text-transform:uppercase">Solu&ccedil;&otilde;es Financeiras Para<br>Os Seus Clientes</h1>
      <p style="margin:12px 0 0 0;font-size:13px;color:${s.heroSubText};letter-spacing:0.5px">Intermedi&aacute;rios de Cr&eacute;dito</p>
    </div>`;
}

function _bodyText(s: SchemeColors, p: OutreachParams) {
  return `      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Exmo.(a) Sr.(a), ${p.recipientName},<br>Espero que este e-mail o(a) encontre bem.</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Devido aos excelentes resultados que temos tido na parceria com v&aacute;rios escrit&oacute;rios de advocacia, decidimos alargar a apresenta&ccedil;&atilde;o dos nossos servi&ccedil;os para este nicho espec&iacute;fico.</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Neste sentido, venho por este meio e em representa&ccedil;&atilde;o da <strong>${p.storeName}</strong>, do Grupo Decis&otilde;es e Solu&ccedil;&otilde;es, apresentar uma proposta de colabora&ccedil;&atilde;o, assente nos benef&iacute;cios adquiridos pelos nossos parceiros atuais.</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Sabemos que muitos processos, especialmente em sede de <strong>Div&oacute;rcios, Partilhas e Transa&ccedil;&otilde;es Imobili&aacute;rias</strong>, dependem da viabilidade financeira das partes.</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Como consultor na DS (Decis&otilde;es e Solu&ccedil;&otilde;es), o meu papel &eacute; garantir que a componente banc&aacute;ria deixe de ser um obst&aacute;culo ao seu sucesso jur&iacute;dico. Atuamos como um <strong>parceiro estrat&eacute;gico</strong> que protege a celeridade dos seus prazos e a satisfa&ccedil;&atilde;o dos seus constituintes.</p>`;
}

function _bulletPoints(s: SchemeColors) {
  return `      <div style="height:2px;background:linear-gradient(90deg,${s.primary},${s.primaryHover});border-radius:1px;width:80px;margin:24px 0"></div>
      <p style="font-size:16px;font-weight:700;color:${s.bodyText};margin:0 0 16px 0">O que oferecemos aos seus clientes:</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 8px 0">
        <tr><td style="padding:0 0 8px 0;font-size:15px;color:${s.bodyText};line-height:1.7">&bull; <strong>Acesso Direto:</strong> Protocolos com a maioria das institui&ccedil;&otilde;es banc&aacute;rias em Portugal.</td></tr>
        <tr><td style="padding:0 0 8px 0;font-size:15px;color:${s.bodyText};line-height:1.7">&bull; <strong>Poder de Negocia&ccedil;&atilde;o:</strong> Condi&ccedil;&otilde;es de taxas e seguros mais competitivos.</td></tr>
        <tr><td style="padding:0 0 8px 0;font-size:15px;color:${s.bodyText};line-height:1.7">&bull; <strong>Agilidade:</strong> Pr&eacute;-an&aacute;lise de viabilidade em 24h/48h para garantir seguran&ccedil;a em CPCVs e Acordos de Tornas.</td></tr>
      </table>`;
}

function _closingAndSignature(s: SchemeColors, p: OutreachParams) {
  return `      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:16px 0">Gostaria de agendar uma breve reuni&atilde;o de 15 minutos para avaliar como podemos agregar valor ao seu servi&ccedil;o e lhe apresentar o nosso <strong>Protocolo de Parceria para Advogados</strong>, sem qualquer custo para o vosso escrit&oacute;rio.</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 16px 0">Teria disponibilidade para uma breve conversa?</p>
      <p style="font-size:15px;color:${s.bodyText};line-height:1.7;margin:0 0 4px 0">Com os meus melhores cumprimentos,<br><strong>${p.agentName}</strong></p>
      <p style="font-size:13px;color:${s.mutedText};margin:0 0 4px 0">${p.agentTitle}</p>
      <p style="font-size:13px;color:${s.mutedText};margin:0">Registo BdP n&ordm; ${p.bdpNumber}</p>`;
}

function _cards2x2(s: SchemeColors) {
  const card = (icon: string, title: string, desc: string) =>
    `<div style="border:1px solid ${s.borderColor};border-radius:12px;padding:20px">
              <div style="width:36px;height:36px;background:${s.iconBg};border-radius:8px;text-align:center;line-height:36px;font-size:18px;margin-bottom:12px;color:${s.iconHighlight}">${icon}</div>
              <p style="font-size:14px;font-weight:700;color:${s.bodyText};margin:0 0 6px 0">${title}</p>
              <p style="font-size:12px;color:${s.mutedText};line-height:1.5;margin:0">${desc}</p>
            </div>`;
  return `    <div style="padding:0 40px 32px 40px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="48%" style="vertical-align:top;padding:0 4px 8px 0">${card("&#9878;", "Apoio Jur&iacute;dico-Financeiro", "Complemento perfeito aos servi&ccedil;os jur&iacute;dicos imobili&aacute;rios.")}</td>
          <td width="48%" style="vertical-align:top;padding:0 0 8px 4px">${card("&#128196;", "Documenta&ccedil;&atilde;o Completa", "Processo documental organizado e transparente.")}</td>
        </tr>
        <tr>
          <td width="48%" style="vertical-align:top;padding:0 4px 0 0">${card("&#9989;", "Conformidade Total", "Registados no Banco de Portugal &mdash; total conformidade legal.")}</td>
          <td width="48%" style="vertical-align:top;padding:0 0 0 4px">${card("&#128101;", "Parceria Exclusiva", "Canal dedicado ao seu escrit&oacute;rio com acompanhamento personalizado.")}</td>
        </tr>
      </table>
    </div>`;
}

function _stats(s: SchemeColors) {
  return `    <div style="padding:0 40px 32px 40px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="33%" style="text-align:center;padding:16px 8px;border:1px solid ${s.borderColor};border-radius:12px">
            <p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0">Escrit&oacute;rios<br>Parceiros</p>
            <p style="font-size:28px;font-weight:900;color:${s.primary};margin:0">40+</p>
          </td>
          <td width="4%"></td>
          <td width="33%" style="text-align:center;padding:16px 8px;border:1px solid ${s.borderColor};border-radius:12px">
            <p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0">Processos<br>Fechados</p>
            <p style="font-size:28px;font-weight:900;color:${s.primary};margin:0">600+</p>
          </td>
          <td width="4%"></td>
          <td width="33%" style="text-align:center;padding:16px 8px;border:1px solid ${s.borderColor};border-radius:12px">
            <p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;letter-spacing:1px;margin:0 0 4px 0">Aprova&ccedil;&atilde;o</p>
            <p style="font-size:28px;font-weight:900;color:${s.primary};margin:0">91%</p>
          </td>
        </tr>
      </table>
    </div>`;
}

function _ctaBand(s: SchemeColors) {
  return `    <div style="background:${s.ctaGradient};padding:40px 32px;text-align:center">
      <h2 style="margin:0 0 8px 0;font-size:22px;font-weight:900;font-style:italic;color:${s.ctaText}">Vamos conversar?</h2>
      <p style="margin:0 0 24px 0;font-size:14px;color:${s.heroSubText}">Agende uma reuni&atilde;o gratuita de 15 minutos para analisarmos o seu caso.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto">
        <tr>
          <td style="padding-right:12px">
            <a href="${CONTACT_URL}" style="display:inline-block;background:${s.primary};color:#ffffff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none">Agendar Reuni&atilde;o</a>
          </td>
          <td>
            <a href="${LANDING_URL}" style="display:inline-block;background:${s.ctaText === "#ffffff" ? "rgba(255,255,255,0.08)" : "transparent"};color:${s.ctaText};font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;border:1px solid ${s.glassBorder}">Saber Mais</a>
          </td>
        </tr>
      </table>
    </div>`;
}

function _agentCard(s: SchemeColors, p: OutreachParams, initials: string) {
  return `    <div style="padding:32px 40px">
      <div style="border:1px solid ${s.borderColor};border-radius:16px;padding:28px;text-align:center">
        <div style="width:64px;height:64px;border-radius:50%;border:2px solid ${s.primary};background:${s.iconBg};margin:0 auto 12px auto;text-align:center;line-height:64px;font-size:22px;font-weight:700;color:${s.primary}">${initials}</div>
        <p style="font-size:18px;font-weight:700;color:${s.bodyText};margin:0 0 4px 0">${p.agentName}</p>
        <p style="font-size:12px;font-weight:600;color:${s.primary};text-transform:uppercase;letter-spacing:1px;margin:0 0 16px 0">Intermedi&aacute;rios de Cr&eacute;dito</p>
        <a href="mailto:${p.agentEmail}" style="display:inline-block;background:${s.primary};color:#ffffff;font-size:13px;font-weight:600;padding:10px 20px;border-radius:6px;text-decoration:none">&#9993; ${p.agentEmail}</a>
      </div>
    </div>`;
}

function _footer(s: SchemeColors) {
  return `    <div style="background:${s.footerBg};padding:28px 40px;text-align:center">
      <p style="font-size:14px;font-weight:900;font-style:italic;color:${s.primary};letter-spacing:1px;margin:0 0 12px 0">${siteConfig.stats.yearsExperience} ANOS DE BOAS DECIS&Otilde;ES</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 12px auto">
        <tr>
          <td style="padding:0 8px"><a href="${siteConfig.social.facebook}" style="color:${s.bodyText};text-decoration:none;font-size:20px">&#9679;</a></td>
          <td style="padding:0 8px"><a href="${siteConfig.social.instagram}" style="color:${s.bodyText};text-decoration:none;font-size:20px">&#9679;</a></td>
          <td style="padding:0 8px"><a href="${siteConfig.social.linkedin}" style="color:${s.bodyText};text-decoration:none;font-size:20px">&#9679;</a></td>
        </tr>
      </table>
      <p style="font-size:13px;color:${s.mutedText};margin:0 0 16px 0"><a href="${LANDING_URL}" style="color:${s.mutedText};text-decoration:none">${LANDING_URL.replace("https://", "")}</a></p>
      <p style="font-size:10px;color:${s.lightMuted};line-height:1.5;margin:0;text-transform:uppercase;letter-spacing:0.5px">${siteConfig.legalName} &mdash; Intermedi&aacute;rios de Cr&eacute;dito. Registados junto do Banco de Portugal. A informa&ccedil;&atilde;o contida neste email &eacute; meramente informativa e n&atilde;o constitui uma proposta contratual.</p>
    </div>`;
}

// --- Layout builders ---

function _layoutFull(s: SchemeColors, p: OutreachParams, initials: string) {
  return _wrap(s, [_header(s), _hero(s), `    <div style="padding:40px">\n${_bodyText(s, p)}\n${_bulletPoints(s)}\n${_closingAndSignature(s, p)}\n    </div>`, _cards2x2(s), _stats(s), _ctaBand(s), _agentCard(s, p, initials), _footer(s)].join("\n"));
}

function _layoutCompact(s: SchemeColors, p: OutreachParams, initials: string) {
  // Thin accent bar instead of hero, inline features as rows, compact signature
  const featureRow = (icon: string, title: string, desc: string) =>
    `<tr><td style="width:40px;vertical-align:top;padding:8px 12px 8px 0"><div style="width:32px;height:32px;background:${s.iconBg};border-radius:6px;text-align:center;line-height:32px;font-size:14px;color:${s.iconHighlight}">${icon}</div></td><td style="vertical-align:top;padding:8px 0"><p style="font-size:13px;font-weight:700;color:${s.bodyText};margin:0">${title}</p><p style="font-size:12px;color:${s.mutedText};margin:2px 0 0 0">${desc}</p></td></tr>`;

  return _wrap(s, [
    _header(s),
    // Thin accent bar
    `    <div style="height:4px;background:linear-gradient(90deg,${s.primary},${s.primaryHover})"></div>`,
    // Body
    `    <div style="padding:32px 40px">
${_bodyText(s, p)}
${_bulletPoints(s)}
${_closingAndSignature(s, p)}
    </div>`,
    // Inline feature rows
    `    <div style="padding:0 40px 24px 40px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        ${featureRow("&#9878;", "Apoio Jur&iacute;dico-Financeiro", "Complemento perfeito aos servi&ccedil;os jur&iacute;dicos imobili&aacute;rios.")}
        ${featureRow("&#128196;", "Documenta&ccedil;&atilde;o Completa", "Processo documental organizado e transparente.")}
        ${featureRow("&#9989;", "Conformidade Total", "Registados no Banco de Portugal.")}
        ${featureRow("&#128101;", "Parceria Exclusiva", "Canal dedicado com acompanhamento personalizado.")}
      </table>
    </div>`,
    // Inline stats
    `    <div style="padding:0 40px 24px 40px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="font-size:13px;color:${s.mutedText}"><strong style="font-size:20px;color:${s.primary}">40+</strong> escrit&oacute;rios parceiros</td>
          <td style="font-size:13px;color:${s.mutedText}"><strong style="font-size:20px;color:${s.primary}">600+</strong> processos</td>
          <td style="font-size:13px;color:${s.mutedText}"><strong style="font-size:20px;color:${s.primary}">91%</strong> aprova&ccedil;&atilde;o</td>
        </tr>
      </table>
    </div>`,
    // Single CTA button
    `    <div style="padding:0 40px 32px 40px;text-align:center">
      <a href="${CONTACT_URL}" style="display:inline-block;background:${s.primary};color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none">Agendar Reuni&atilde;o &rarr;</a>
    </div>`,
    // Compact agent line
    `    <div style="padding:0 40px 24px 40px;border-top:1px solid ${s.borderColor}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px">
        <tr>
          <td style="vertical-align:middle;padding-right:12px"><div style="width:40px;height:40px;border-radius:50%;background:${s.iconBg};border:2px solid ${s.primary};text-align:center;line-height:40px;font-size:14px;font-weight:700;color:${s.primary}">${initials}</div></td>
          <td style="vertical-align:middle"><p style="font-size:14px;font-weight:700;color:${s.bodyText};margin:0">${p.agentName}</p><p style="font-size:12px;color:${s.mutedText};margin:0">${p.agentTitle} &middot; <a href="mailto:${p.agentEmail}" style="color:${s.primary};text-decoration:none">${p.agentEmail}</a></p></td>
        </tr>
      </table>
    </div>`,
    _footer(s),
  ].join("\n"));
}

function _layoutCardFirst(s: SchemeColors, p: OutreachParams, initials: string) {
  // Cards immediately after header, then body text
  return _wrap(s, [
    _header(s),
    // Mini hero — just the tagline
    `    <div style="background:${s.heroGradient};padding:28px 40px;text-align:center">
      <p style="margin:0;font-size:18px;font-weight:700;color:${s.heroText};letter-spacing:0.5px">Solu&ccedil;&otilde;es Financeiras Para Os Seus Clientes</p>
    </div>`,
    // Spacer before cards
    `    <div style="height:24px"></div>`,
    // Cards first
    _cards2x2(s),
    _stats(s),
    // Body text
    `    <div style="padding:8px 40px 32px 40px">
${_bodyText(s, p)}
${_bulletPoints(s)}
${_closingAndSignature(s, p)}
    </div>`,
    _ctaBand(s),
    _agentCard(s, p, initials),
    _footer(s),
  ].join("\n"));
}

function _layoutExecutive(s: SchemeColors, p: OutreachParams, _initials: string) {
  // Clean letter style — no cards, no stats, single elegant CTA
  return _wrap(s, [
    _header(s),
    // Subtle accent line
    `    <div style="height:3px;background:linear-gradient(90deg,${s.primary},${s.primaryHover})"></div>`,
    // Letter body
    `    <div style="padding:48px 48px 32px 48px">
${_bodyText(s, p)}
${_bulletPoints(s)}
${_closingAndSignature(s, p)}
    </div>`,
    // Elegant single CTA
    `    <div style="padding:0 48px 40px 48px;text-align:center">
      <div style="border-top:1px solid ${s.borderColor};padding-top:32px">
        <p style="font-size:18px;font-weight:700;color:${s.bodyText};margin:0 0 8px 0">Vamos conversar?</p>
        <p style="font-size:13px;color:${s.mutedText};margin:0 0 20px 0">Reuni&atilde;o gratuita de 15 minutos, sem compromisso.</p>
        <a href="${CONTACT_URL}" style="display:inline-block;background:${s.primary};color:#ffffff;font-size:15px;font-weight:600;padding:14px 40px;border-radius:8px;text-decoration:none">Agendar Reuni&atilde;o</a>
      </div>
    </div>`,
    _footer(s),
  ].join("\n"));
}

function _layoutSidebar(s: SchemeColors, p: OutreachParams, initials: string) {
  // Left accent stripe with content
  const featureItem = (icon: string, title: string) =>
    `<tr><td style="padding:4px 0;font-size:14px;color:${s.bodyText}"><span style="color:${s.iconHighlight};margin-right:8px">${icon}</span> <strong>${title}</strong></td></tr>`;

  return _wrap(s, [
    _header(s),
    // Sidebar layout: colored left bar + content
    `    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="4" style="background:linear-gradient(180deg,${s.primary},${s.primaryHover})"></td>
        <td style="padding:40px">
${_bodyText(s, p)}
          <div style="height:1px;background:${s.borderColor};margin:24px 0"></div>
          <p style="font-size:16px;font-weight:700;color:${s.bodyText};margin:0 0 12px 0">O que oferecemos:</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${featureItem("&#9878;", "Apoio Jur&iacute;dico-Financeiro")}
            ${featureItem("&#128196;", "Documenta&ccedil;&atilde;o Completa")}
            ${featureItem("&#9989;", "Conformidade Total")}
            ${featureItem("&#128101;", "Parceria Exclusiva")}
          </table>
          <div style="height:1px;background:${s.borderColor};margin:24px 0"></div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-right:24px"><p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;margin:0">Parceiros</p><p style="font-size:24px;font-weight:900;color:${s.primary};margin:4px 0 0 0">40+</p></td>
              <td style="padding-right:24px"><p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;margin:0">Processos</p><p style="font-size:24px;font-weight:900;color:${s.primary};margin:4px 0 0 0">600+</p></td>
              <td><p style="font-size:10px;font-weight:700;color:${s.mutedText};text-transform:uppercase;margin:0">Aprova&ccedil;&atilde;o</p><p style="font-size:24px;font-weight:900;color:${s.primary};margin:4px 0 0 0">91%</p></td>
            </tr>
          </table>
          <div style="height:1px;background:${s.borderColor};margin:24px 0"></div>
${_closingAndSignature(s, p)}
          <div style="margin-top:24px"><a href="${CONTACT_URL}" style="display:inline-block;background:${s.primary};color:#ffffff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none">Agendar Reuni&atilde;o &rarr;</a></div>
        </td>
      </tr>
    </table>`,
    // Compact agent
    `    <div style="padding:0 40px 24px 40px;border-top:1px solid ${s.borderColor}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px">
        <tr>
          <td style="vertical-align:middle;padding-right:12px"><div style="width:44px;height:44px;border-radius:50%;background:${s.iconBg};border:2px solid ${s.primary};text-align:center;line-height:44px;font-size:15px;font-weight:700;color:${s.primary}">${initials}</div></td>
          <td style="vertical-align:middle"><p style="font-size:14px;font-weight:700;color:${s.bodyText};margin:0">${p.agentName}</p><p style="font-size:12px;color:${s.mutedText};margin:2px 0 0 0"><a href="mailto:${p.agentEmail}" style="color:${s.primary};text-decoration:none">${p.agentEmail}</a></p></td>
        </tr>
      </table>
    </div>`,
    _footer(s),
  ].join("\n"));
}

// --- Main entry point ---

export function advogadosOutreachPT(params: OutreachParams) {
  const { scheme = "default", layout: layoutType = "full" } = params;
  const s = EMAIL_SCHEMES[scheme];
  const initials = params.agentName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  switch (layoutType) {
    case "compact": return _layoutCompact(s, params, initials);
    case "card-first": return _layoutCardFirst(s, params, initials);
    case "executive": return _layoutExecutive(s, params, initials);
    case "sidebar": return _layoutSidebar(s, params, initials);
    default: return _layoutFull(s, params, initials);
  }
}

export function b2cCreditEN(name: string) {
  return layout(`
    <p class="greeting">Hello ${name},</p>
    <p class="text">We have received your credit simulation request. Thank you for choosing DS Crédito.</p>
    <p class="text">Based on your pre-qualification, you meet the initial conditions to proceed. A specialist will contact you <strong>within 24 hours</strong> to review your case in detail.</p>
    <div class="divider"></div>
    <p class="text" style="font-weight:600;color:${DARK}">What happens next:</p>
    <ol class="steps">
      <li data-n="1">Detailed analysis of your financial profile</li>
      <li data-n="2">Simulation and comparison of offers from multiple banks</li>
      <li data-n="3">Presentation of the best conditions for your case</li>
      <li data-n="4">Full support through to deed signing</li>
    </ol>
    <div class="cta-box">
      <p class="cta-title">100% free service</p>
      <p class="cta-text">There is no cost to you. We are compensated by the lending institutions.</p>
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn" style="color:#ffffff!important;text-decoration:none">Call ${siteConfig.phone}</a>
    </div>
  `);
}
