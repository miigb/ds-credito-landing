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
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:10px auto 0 auto">
        <tr>
          <td style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.5px;padding-right:6px;vertical-align:middle">Parte da rede</td>
          <td style="vertical-align:middle"><img src="${LOGO_URL}" alt="DS" width="20" height="20" style="border-radius:4px;display:block" /></td>
          <td style="font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.5px;padding-left:6px;vertical-align:middle">&middot; meuintermediario.com</td>
        </tr>
      </table>
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
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn">Ligar ${siteConfig.phone}</a>
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
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn">Call ${siteConfig.phone}</a>
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
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn">Ligar ${siteConfig.phone}</a>
    </div>
  `);
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
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" class="cta-btn">Call ${siteConfig.phone}</a>
    </div>
  `);
}
