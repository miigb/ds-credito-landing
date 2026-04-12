import { NextRequest, NextResponse } from "next/server";
import {
  b2bContactPT,
  b2bContactEN,
  b2cCreditPT,
  b2cCreditEN,
} from "@/lib/emailTemplates";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = "DS Crédito <noreply@meuintermediario.com>";

const SUBJECTS = {
  b2b: {
    pt: "Recebemos o seu contacto — DS Crédito",
    en: "We received your message — DS Crédito",
  },
  b2c: {
    pt: "Pedido de crédito recebido — DS Crédito",
    en: "Credit request received — DS Crédito",
  },
};

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Resend not configured" },
      { status: 503 }
    );
  }

  try {
    const { name, email, locale, formType } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const lang = locale === "pt" ? "pt" : "en";
    const userName = name || (lang === "pt" ? "Cliente" : "Client");

    let html: string;
    let subject: string;

    if (formType === "b2c") {
      html = lang === "pt" ? b2cCreditPT(userName) : b2cCreditEN(userName);
      subject = SUBJECTS.b2c[lang];
    } else {
      html = lang === "pt" ? b2bContactPT(userName) : b2bContactEN(userName);
      subject = SUBJECTS.b2b[lang];
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend API error:", err);
      return NextResponse.json({ error: "Email send failed", detail: err, keyPresent: !!RESEND_API_KEY, keyLength: RESEND_API_KEY.length }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Auto-reply error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
