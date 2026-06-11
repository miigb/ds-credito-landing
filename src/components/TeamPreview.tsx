"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { teamMembers } from "@/lib/teamData";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";

/*
 * TeamPreview — editorial portrait row: three large warm-duotone portraits
 * (grayscale + warm grade → full colour on hover), captioned in big
 * tracking-tight type. Oversized section headline with the highlight in ember.
 *  cinema    · ink canvas with a faint dawn glow
 *  editorial · alabaster canvas, white portrait frames with warm shadows
 * First-3-by-order logic, initials fallback, /equipa links and all t.team
 * copy are unchanged.
 */

function TeamCard({
  member,
  index,
  locale,
  dark,
}: {
  member: (typeof teamMembers)[number];
  index: number;
  locale: "pt" | "en";
  dark: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <FadeIn delay={index * 0.12}>
      <Link href={`/equipa/${member.id}`} className="group block">
        {/* Portrait — .img-warm on the frame so the warm grade composes with
            the grayscale filter on the img (duotone → colour on hover). */}
        <div
          className={`aspect-[3/4] w-full overflow-hidden rounded-2xl img-warm ${
            dark
              ? "bg-white/[0.04]"
              : "bg-white shadow-[0_18px_60px_rgba(29,29,27,0.10)]"
          }`}
        >
          {imgError ? (
            <div
              className={`w-full h-full flex items-center justify-center font-bold text-4xl tracking-tight ${
                dark ? "text-white/80" : "text-brand-900/70"
              }`}
            >
              {initials}
            </div>
          ) : (
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
              style={{ objectPosition: member.photoPosition || "center" }}
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Caption — big name, tiny wide-tracked role */}
        <div className="mt-5 lg:mt-6">
          <h3
            className={`text-xl lg:text-2xl font-bold tracking-tight ${
              dark ? "text-white" : "text-brand-900"
            }`}
          >
            {member.name}
          </h3>
          <p
            className={`mt-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] ${
              dark ? "text-accent-400" : "text-bronze"
            }`}
          >
            {member.role[locale]}
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed ${
              dark ? "text-white/50" : "text-brand-500"
            }`}
          >
            {member.bioShort?.[locale] ?? member.bio[locale]}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function TeamPreview() {
  const { locale, t } = useLanguage();
  const { direction } = usePrototype();
  const dark = direction === "cinema";

  const sorted = [...teamMembers].sort((a, b) => a.order - b.order);
  const previewMembers = sorted.slice(0, 3);

  // Split headline around the highlight
  const headline = t.team.headline;
  const highlight = t.team.headlineHighlight;
  const idx = headline.toLowerCase().indexOf(highlight.toLowerCase());
  let before = headline;
  let after = "";
  if (idx >= 0) {
    before = headline.slice(0, idx);
    after = headline.slice(idx + highlight.length);
  }

  return (
    <section
      id="team"
      className={`relative py-20 md:py-24 lg:py-28 overflow-hidden ${
        dark ? "bg-ink" : "bg-alabaster"
      }`}
    >
      {dark && (
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-60" />
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header — oversized type left, supporting copy right ── */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-12 items-end mb-10 lg:mb-14">
          <div>
            <FadeIn>
              <div
                className={`inline-flex items-center gap-3 mb-6 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] ${
                  dark ? "text-accent-400" : "text-bronze"
                }`}
              >
                <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                {t.team.eyebrow}
              </div>
            </FadeIn>

            <h2
              className={`text-4xl lg:text-6xl font-bold tracking-tight leading-[1.04] ${
                dark ? "text-white" : "text-brand-900"
              }`}
            >
              <RevealLine>
                {before}
                <span className="text-accent-700">{highlight}</span>
                {after}
              </RevealLine>
            </h2>
          </div>

          <FadeIn delay={0.25}>
            <p
              className={`text-lg leading-relaxed lg:pb-1.5 ${
                dark ? "text-white/60" : "text-brand-500"
              }`}
            >
              {t.team.subheading}
            </p>
          </FadeIn>
        </div>

        {/* ── Portrait row — Paulo, Armanda, Lília ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {previewMembers.map((member, index) => (
            <TeamCard
              key={member.id}
              member={member}
              index={index}
              locale={locale}
              dark={dark}
            />
          ))}
        </div>

        {/* CTA — subtle link variant; primary CTAs live in adjacent sections */}
        <FadeIn delay={0.1} className="text-center mt-12 lg:mt-16">
          <Link
            href="/equipa"
            className={`group inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              dark
                ? "text-accent-400 hover:text-accent-300"
                : "text-bronze hover:text-brand-900"
            }`}
          >
            {t.team.cta}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
