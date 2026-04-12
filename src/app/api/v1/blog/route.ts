import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "public, max-age=1800",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tag = searchParams.get("tag");
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);
  const offset = Number(searchParams.get("offset")) || 0;

  let query = supabase
    .from("news_content")
    .select(
      "id, type, title_pt, title_en, summary_pt, seo_slug, seo_description, tags, importance, published_at",
      { count: "exact" }
    )
    .in("type", ["article", "bite"])
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: HEADERS });
  }

  const items = (data ?? []).map((item) => ({
    ...item,
    url: `/blog/${item.seo_slug}`,
  }));

  return NextResponse.json({ total: count, items }, { status: 200, headers: HEADERS });
}
