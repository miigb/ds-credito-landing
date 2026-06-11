"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fx/RevealText";
import { useLanguage } from "@/lib/LanguageContext";
import { teamMembers } from "@/lib/teamData";

/*
 * TeamGrid — paper chapter of /equipa (Amanhecer 2026).
 * White editorial cards with warm shadows on paper; 3:4 portraits with the
 * warm grade (.img-warm on the frame) composing with grayscale → colour on
 * hover. Sort-by-order, initials fallback, "A anunciar" TBD dimming and the
 * /equipa/[id] links are unchanged.
 */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamMemberCard({ member, index }: { member: (typeof teamMembers)[number]; index: number }) {
  const { locale } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const isTBD = member.name === "A anunciar";

  return (
    <FadeIn delay={(index % 3) * 0.1} className="h-full">
      <Link
        href={`/equipa/${member.id}`}
        className={`group block h-full bg-white rounded-3xl p-5 lg:p-6 transition-all duration-500 shadow-[0_18px_60px_rgba(29,29,27,0.06)] ${
          isTBD
            ? "opacity-50 pointer-events-none"
            : "hover:shadow-[0_24px_70px_rgba(29,29,27,0.12)] hover:-translate-y-1"
        }`}
      >
        {/* Portrait — warm grade on the frame, grayscale → colour on hover */}
        <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl img-warm bg-brand-100">
          {imgError || isTBD ? (
            <div className="w-full h-full flex items-center justify-center font-bold text-4xl tracking-tight text-brand-900/60">
              {isTBD ? "?" : getInitials(member.name)}
            </div>
          ) : (
            <Image
              src={member.photo}
              alt={member.name}
              width={480}
              height={640}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
              style={{ objectPosition: member.photoPosition || "center" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Caption — big name, tiny wide-tracked bronze role */}
        <div className="pt-6 pb-2 px-1">
          <h3 className="text-brand-900 font-bold text-xl lg:text-2xl tracking-tight">
            {member.name}
          </h3>
          <p className="text-bronze text-[11px] font-semibold tracking-[0.2em] uppercase mt-1.5 mb-4">
            {member.role[locale]}
          </p>
          <p className="text-brand-500 text-sm leading-relaxed">
            {member.bioShort?.[locale] ?? member.bio[locale]}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function TeamGrid() {
  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);

  return (
    <section className="relative py-20 lg:py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sorted.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
