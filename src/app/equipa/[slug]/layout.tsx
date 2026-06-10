import type { Metadata } from "next";
import { teamMembers } from "@/lib/teamData";
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.id === slug);

  if (!member) {
    return {};
  }

  const profileUrl = `${siteConfig.url}/equipa/${member.id}`;
  const photoUrl = `${siteConfig.url}${member.photo}`;

  return {
    title: `${member.name} — ${member.role.pt} | Letraperfeiçoada`,
    description: member.bio.pt,
    manifest: `/equipa/${member.id}/manifest.webmanifest`,
    openGraph: {
      title: `${member.name} — ${member.role.pt}`,
      description: member.bio.pt,
      url: profileUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: photoUrl,
          width: 600,
          height: 600,
          alt: member.name,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${member.name} — ${member.role.pt}`,
      description: member.bio.pt,
      images: [photoUrl],
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": member.name,
      "mobile-web-app-capable": "yes",
    },
  };
}

export default function AgentProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
