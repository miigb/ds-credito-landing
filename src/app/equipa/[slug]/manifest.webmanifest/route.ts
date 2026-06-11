import { NextRequest, NextResponse } from "next/server";
import { teamMembers } from "@/lib/teamData";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.id === slug);

  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const manifest = {
    name: `${member.name} — Letraperfeiçoada`,
    short_name: member.name,
    description: member.role.pt,
    start_url: `/equipa/${member.id}`,
    display: "standalone",
    background_color: "#1D1D1B",
    theme_color: "#F39200",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
    },
  });
}
