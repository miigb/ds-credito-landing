"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn, RevealLine } from "@/components/fx/RevealText";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcons";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import SectionCTA from "@/components/ui/section-cta";

/*
 * Services — the light chapter (see docs/redesign/DESIGN-BRIEF.md §6).
 *  cinema    · paper canvas — daylight inside the dark arc
 *  editorial · alabaster canvas, white cards with warm shadows
 * Copy, audience switching, section id, intl sub-panel and SectionCTA are
 * identical to the legacy component — presentation only.
 */

/* Asymmetric 12-col rhythm: 7/5 · 5/7 · 6/6 — never six identical boxes. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -70]);
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const svcAud = audience === "partner" ? t.services.b2b : t.services.b2c;
  const intlAud = audience === "partner" ? t.services.intl.b2b : t.services.intl.b2c;

  const services: {
    id: string;
    icon: BrandIconName;
    title: string;
    description: string;
  }[] = [
    { id: "pre-check", icon: "credit", title: t.services.preCheck, description: t.services.preCheckDesc },
    { id: "compare", icon: "guidance", title: t.services.compare, description: t.services.compareDesc },
    { id: "docs", icon: "clarity", title: t.services.docs, description: t.services.docsDesc },
    { id: "negotiation", icon: "trust", title: t.services.negotiation, description: t.services.negotiationDesc },
    { id: "approval", icon: "progress", title: t.services.approval, description: t.services.approvalDesc },
    { id: "transparency", icon: "protection", title: t.services.transparency, description: t.services.transparencyDesc },
  ];

  const situations: { id: string; icon: BrandIconName; label: string }[] = [
    { id: "home", icon: "solidity", label: t.services.situationHome },
    { id: "investment", icon: "investment", label: t.services.situationInvestment },
    { id: "relocation", icon: "reach", label: t.services.situationRelocation },
    { id: "credit", icon: "credit", label: t.services.situationCredit },
  ];

  const editorial = direction === "editorial";

  const cardSurface = editorial
    ? "bg-white shadow-[0_6px_30px_rgba(29,29,27,0.06)] hover:shadow-[0_22px_55px_rgba(29,29,27,0.12)]"
    : "bg-white ring-1 ring-brand-900/[0.04] shadow-[0_10px_40px_rgba(29,29,27,0.05)] hover:shadow-[0_24px_60px_rgba(29,29,27,0.11)]";
  const numeral = editorial ? "text-bronze/80" : "text-brand-300";

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative py-20 md:py-24 lg:py-28 overflow-hidden ${
        editorial ? "bg-alabaster" : "bg-paper"
      }`}
    >
      {/* soft amber dawn glow, gentle scroll drift */}
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="absolute -top-24 right-[-12%] w-[480px] h-[480px] rounded-full bg-accent-400/15 blur-[110px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <FadeIn>
            <p className="inline-flex items-center gap-3 mb-5 text-xs lg:text-sm font-semibold uppercase tracking-[0.3em] text-bronze">
              <span aria-hidden className="h-px w-8 bg-bronze/60" />
              {svcAud.eyebrow}
            </p>
          </FadeIn>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-brand-900 mb-5 text-balance">
            <RevealLine>{svcAud.headline}</RevealLine>
          </h2>
          <FadeIn delay={0.2}>
            <p className="text-lg text-brand-500 leading-relaxed">
              {svcAud.subheading}
            </p>
          </FadeIn>
        </div>

        {/* ── Service cards — editorial asymmetric grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 mb-12 lg:mb-16">
          {services.map((s, i) => {
            const featured = i === 0;
            return (
              <FadeIn key={s.id} delay={Math.min(i * 0.07, 0.35)} className={SPANS[i]}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 ${cardSurface} ${
                    featured ? "p-8 lg:p-10" : "p-7 lg:p-8"
                  }`}
                >
                  <div className="flex items-start justify-between mb-6 lg:mb-7">
                    <div
                      className={`flex items-center justify-center rounded-2xl bg-accent-700/10 transition-all duration-500 group-hover:bg-accent-700/15 group-hover:shadow-[0_0_32px_rgba(243,146,0,0.28)] ${
                        featured ? "w-[4.5rem] h-[4.5rem]" : "w-16 h-16"
                      }`}
                    >
                      <BrandIcon
                        name={s.icon}
                        size={featured ? 40 : 34}
                        className="text-accent-700"
                      />
                    </div>
                    <span
                      className={`pt-1 text-[10px] font-semibold tracking-[0.3em] tabular-nums ${numeral}`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <h3
                    className={`font-semibold text-brand-900 tracking-tight mb-2.5 ${
                      featured ? "text-xl lg:text-2xl" : "text-lg"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`text-brand-500 leading-relaxed ${
                      featured ? "text-sm lg:text-base max-w-md" : "text-sm"
                    }`}
                  >
                    {s.description}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* ── International clients — warm-ink sub-panel ── */}
        <FadeIn delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-6 sm:p-10 lg:p-14">
            <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-80" />
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent-700/15 blur-[100px]"
            />
            <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <p className="inline-flex items-center gap-2.5 mb-5 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full bg-accent-400"
                    style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
                  />
                  {intlAud.eyebrow}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-5 text-balance">
                  {intlAud.headline}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-7">
                  {intlAud.desc}
                </p>
                <a
                  href={intlAud.ctaHref}
                  className="group inline-flex items-center gap-2 text-accent-400 text-sm font-semibold hover:text-accent-300 transition-colors"
                >
                  {intlAud.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              </div>

              {/* situation chips — amber pills */}
              <div className="flex flex-wrap gap-3 content-center lg:justify-end">
                {situations.map(({ id, icon, label }) => (
                  <div
                    key={id}
                    className="inline-flex items-center gap-2.5 rounded-full border border-accent-400/25 bg-white/[0.05] px-4 py-2.5 hover:bg-white/[0.09] hover:border-accent-400/40 transition-colors duration-300"
                  >
                    <BrandIcon
                      name={icon}
                      size={20}
                      strokeWidth={1.8}
                      className="text-accent-400 shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-white/80 leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <SectionCTA
          label={audience === "partner" ? t.services.ctaLabelB2b : t.services.ctaLabelB2c}
          href={audience === "partner" ? "#contact" : "#pre-qualification"}
          source="services"
        />
      </div>
    </section>
  );
}
