"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { MonolineSun } from "@/components/brand/Logo";
import SectionCTA from "@/components/ui/section-cta";

/*
 * WhyUs — the two benefit tracks (business vs clients) recomposed as a single
 * editorial spread: two contrasting pages sharing one rounded canvas.
 *  cinema    · ink section — tonal ink-lift page + ember-tinted dawn page
 *  editorial · paper section — white page + the ONE ink chapter (brief §3B)
 * Copy (t.whyUs.b2b|b2c), section id and the #contact SectionCTA are unchanged.
 */

/* Tiny ray glyph replaces the checkmark — the sun marks each benefit. */
function BenefitList({
  items,
  glyph,
  text,
}: {
  items: { id: string; text: string }[];
  glyph: string;
  text: string;
}) {
  const reduced = useReducedMotion();

  const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
  };
  const line: Variants = {
    hidden: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -26 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduced ? 0 : 0.6, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="space-y-5"
    >
      {items.map((b) => (
        <motion.li key={b.id} variants={line} className="flex items-start gap-3.5">
          <span className="w-[22px] shrink-0 pt-[7px]">
            <MonolineSun size={18} strokeWidth={2.4} className={glyph} />
          </span>
          <p className={`leading-relaxed ${text}`}>{b.text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* Page header inside each panel — track label + faint folio numeral. */
function PanelHead({
  label,
  numeral,
  labelClass,
  numeralClass,
}: {
  label: string;
  numeral: string;
  labelClass: string;
  numeralClass: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-8 lg:mb-10">
      <span
        className={`text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] ${labelClass}`}
      >
        {label}
      </span>
      <span
        className={`text-xs font-semibold tabular-nums tracking-[0.2em] ${numeralClass}`}
      >
        {numeral}
      </span>
    </div>
  );
}

export default function WhyUs() {
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const whyAud = audience === "partner" ? t.whyUs.b2b : t.whyUs.b2c;
  const dark = direction === "cinema";

  const businessBenefits = [
    { id: "biz1", text: whyAud.biz1 },
    { id: "biz2", text: whyAud.biz2 },
    { id: "biz3", text: whyAud.biz3 },
    { id: "biz4", text: whyAud.biz4 },
    { id: "biz5", text: whyAud.biz5 },
  ];

  const clientBenefits = [
    { id: "cli1", text: whyAud.cli1 },
    { id: "cli2", text: whyAud.cli2 },
    { id: "cli3", text: whyAud.cli3 },
    { id: "cli4", text: whyAud.cli4 },
    { id: "cli5", text: whyAud.cli5 },
  ];

  return (
    <section
      id="why-us"
      className={`relative py-24 lg:py-32 overflow-hidden ${
        dark ? "bg-ink" : "bg-paper"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Section header — left-set editorial type ── */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <FadeIn>
            <div
              className={`inline-flex items-center gap-3 mb-6 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] ${
                dark ? "text-accent-400" : "text-bronze"
              }`}
            >
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              {whyAud.eyebrow}
            </div>
          </FadeIn>

          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight leading-[1.04] mb-6 ${
              dark ? "text-white" : "text-brand-900"
            }`}
          >
            <RevealLine>{whyAud.headline}</RevealLine>
          </h2>

          <FadeIn delay={0.25}>
            <p
              className={`text-lg max-w-2xl ${
                dark ? "text-white/60" : "text-brand-500"
              }`}
            >
              {whyAud.subheading}
            </p>
          </FadeIn>
        </div>

        {/* ── The spread — two contrasting pages, one canvas ── */}
        <div
          className={`grid lg:grid-cols-2 rounded-3xl overflow-hidden ${
            dark
              ? "border border-white/[0.07]"
              : "shadow-[0_28px_90px_rgba(29,29,27,0.10)]"
          }`}
        >
          {/* Page 01 — business track */}
          <div
            className={`p-8 lg:p-12 ${
              dark
                ? "bg-white/[0.04] border-b lg:border-b-0 lg:border-r border-white/[0.06]"
                : "bg-white"
            }`}
          >
            <PanelHead
              label={whyAud.forBusiness}
              numeral="01"
              labelClass={dark ? "text-accent-400" : "text-bronze"}
              numeralClass={dark ? "text-white/25" : "text-brand-300"}
            />
            <BenefitList
              items={businessBenefits}
              glyph={dark ? "text-accent-400" : "text-accent-700"}
              text={dark ? "text-white/75" : "text-brand-700"}
            />
          </div>

          {/* Page 02 — clients track, the warm/dark counterpart */}
          <div
            className={`relative p-8 lg:p-12 overflow-hidden ${
              dark ? "bg-accent-800/20" : "bg-ink"
            }`}
          >
            <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark" />
            <div className="relative">
              <PanelHead
                label={whyAud.forClients}
                numeral="02"
                labelClass="text-accent-400"
                numeralClass="text-white/25"
              />
              <BenefitList
                items={clientBenefits}
                glyph="text-accent-400"
                text="text-white/75"
              />
            </div>
          </div>
        </div>

        <SectionCTA
          label={audience === "partner" ? t.whyUs.ctaLabelB2b : t.whyUs.ctaLabelB2c}
          href="#contact"
          source="why-us"
        />
      </div>
    </section>
  );
}
