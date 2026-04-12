import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=3600",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("news_content")
    .select("*")
    .eq("seo_slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Artigo não encontrado." },
      { status: 404, headers: HEADERS }
    );
  }

  const article = { ...data, url: `/blog/${data.seo_slug}` };

  return NextResponse.json(article, { status: 200, headers: HEADERS });
}
