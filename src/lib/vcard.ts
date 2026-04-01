import { TeamMember } from "./teamData";
import { siteConfig } from "./siteConfig";

async function imageToBase64(src: string): Promise<string | null> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });

    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Crop to square from center-top (face area)
    const aspect = img.width / img.height;
    let sx = 0, sy = 0, sw = img.width, sh = img.height;
    if (aspect > 1) {
      sx = (img.width - img.height) / 2;
      sw = img.height;
    } else {
      sh = img.width;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
  } catch {
    return null;
  }
}

export function generateVCard(member: TeamMember, photoBase64?: string | null): string {
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
  );

  if (photoBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}`);
  } else {
    lines.push(`PHOTO;VALUE=URI:${siteConfig.url}${member.photo}`);
  }

  lines.push("END:VCARD");

  return lines.join("\r\n");
}

export async function downloadVCard(member: TeamMember) {
  const photoBase64 = await imageToBase64(member.photo);
  const vcf = generateVCard(member, photoBase64);
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${member.id}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}
