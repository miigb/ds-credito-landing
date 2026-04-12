import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Token inválido ou expirado." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ confirmed: true, confirm_token: null })
    .eq("confirm_token", token)
    .select("id");

  if (error || !data || data.length === 0) {
    return NextResponse.json(
      { error: "Token inválido ou expirado." },
      { status: 400 }
    );
  }

  return NextResponse.redirect(new URL("/blog?subscribed=true", request.url));
}
