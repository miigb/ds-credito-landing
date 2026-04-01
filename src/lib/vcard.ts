import { TeamMember } from "./teamData";
import { siteConfig } from "./siteConfig";

export function generateVCard(member: TeamMember): string {
  const [firstName, ...lastParts] = member.name.split(" ");
  const lastName = lastParts.join(" ");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${member.name}`,
    `ORG:${siteConfig.name}`,
    `TITLE:${member.role.pt}`,
  ];

  if (member.phone) {
    lines.push(`TEL;TYPE=CELL:${member.phone}`);
  }
  if (member.email) {
    lines.push(`EMAIL;TYPE=WORK:${member.email}`);
  }

  lines.push(
    `ADR;TYPE=WORK:;;${siteConfig.address.streetAddress};${siteConfig.address.addressLocality};${siteConfig.address.addressRegion};${siteConfig.address.postalCode};Portugal`,
    `URL:${siteConfig.url}/equipa/${member.id}`,
    `PHOTO;VALUE=URI:${siteConfig.url}${member.photo}`,
    "END:VCARD"
  );

  return lines.join("\r\n");
}

export function downloadVCard(member: TeamMember) {
  const vcf = generateVCard(member);
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${member.id}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}
