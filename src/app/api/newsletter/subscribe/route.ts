import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Email inválido." },
      { status: 400 }
    );
  }

  const confirm_token = randomUUID();

  const { error: dbError } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      { email, confirm_token, confirmed: false },
      { onConflict: "email" }
    );

  if (dbError) {
    return NextResponse.json(
      { error: "Erro ao registar subscrição." },
      { status: 500 }
    );
  }

  const confirmUrl = `${request.nextUrl.origin}/api/newsletter/confirm?token=${confirm_token}`;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Letraperfeiçoada <noreply@meuintermediario.com>",
      to: [email],
      subject: "Confirme a sua subscrição — Letraperfeiçoada",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
          <p style="font-size: 16px; line-height: 1.6; color: #1a1a1a;">
            Obrigado por subscrever a newsletter da Letraperfeiçoada.
            Para confirmar a sua subscrição, clique no botão abaixo:
          </p>
          <a href="${confirmUrl}" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #6D28D9; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Confirmar subscrição
          </a>
          <p style="font-size: 13px; color: #666; margin-top: 24px;">
            Se não solicitou esta subscrição, pode ignorar este email.
          </p>
        </div>
      `,
    }),
  });

  if (!resendRes.ok) {
    console.error("Resend error:", await resendRes.text());
  }

  return NextResponse.json({ success: true });
}
