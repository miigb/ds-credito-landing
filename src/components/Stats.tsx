"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { siteConfig } from "@/lib/siteConfig";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import SectionCTA from "@/components/ui/section-cta";

/*
 * Stats — the numbers are the heroes (see docs/redesign/DESIGN-BRIEF.md §6).
 * Asymmetric editorial composition: display-XL count-up numerals over thin
 * hairline rules, tiny wide-tracked labels.
 *  cinema    · ember numerals on warm ink, bg-dawn-radial-dark whisper
 *  editorial · ink numerals on paper, thin bronze hairline rules
 * Count-up logic, stats data, growth pill, ANICA link, copy and section id
 * are identical to the legacy component — presentation only.
 */

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  inView: boolean;
}) {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    // Reduced motion: render the final value instantly, no count-up.
    if (reduced) {
      setCurrent(value);
      setHasAnimated(true);
      return;
    }

    // Fallback: if inView hasn't triggered after 3s (e.g. in-app browsers
    // where IntersectionObserver misbehaves), show the final value anyway.
    const fallbackTimer = setTimeout(() => {
      setCurrent(value);
      setHasAnimated(true);
    }, 3000);

    if (!inView) return () => clearTimeout(fallbackTimer);

    clearTimeout(fallbackTimer);
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        setHasAnimated(true);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
    };
  }, [inView, value, hasAnimated, reduced]);

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

/* Asymmetric grid spans + sunrise stagger — wide/narrow alternation per row. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const LIFTS = ["", "lg:mt-12", "", "lg:mt-12"];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const { direction } = usePrototype();
  const dark = direction === "cinema";

  const stats = [
    { id: "years", value: siteConfig.stats.yearsExperience, suffix: "+", label: t.stats.years },
    { id: "stores", value: siteConfig.stats.stores, suffix: "", label: t.stats.stores },
    { id: "team", value: siteConfig.stats.teamMembers, suffix: "+", label: t.stats.team },
    { id: "deeds", value: siteConfig.stats.deedsValueMillions, suffix: "M+", prefix: "€", label: t.stats.deeds },
  ];

  return (
    <section
      id="about"
      className={`relative py-20 md:py-24 lg:py-28 overflow-hidden ${dark ? "bg-ink" : "bg-paper"}`}
    >
      {/* ── Canvas ── */}
      {dark ? (
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-60" />
      ) : (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/35 to-transparent"
        />
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header — left-set, editorial ── */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <p
              className={`mb-6 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] ${
                dark ? "text-accent-400" : "text-bronze"
              }`}
            >
              {t.stats.eyebrow}
            </p>
          </FadeIn>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-balance ${
              dark ? "text-white" : "text-brand-900"
            }`}
          >
            <RevealLine>{t.stats.headline}</RevealLine>
          </h2>
        </div>

        {/* ── Numbers — display-XL over hairline rules, staggered ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-8 lg:gap-y-12">
          {stats.map((stat, i) => (
            <FadeIn
              key={stat.id}
              delay={0.1 + i * 0.1}
              className={`${SPANS[i]} ${LIFTS[i]}`}
            >
              <div
                className={`border-t pt-6 lg:pt-7 ${
                  dark ? "border-white/10" : "border-bronze/40"
                }`}
              >
                <div
                  className={`text-[clamp(3.5rem,6vw,6rem)] font-extrabold tabular-nums tracking-tight leading-none ${
                    dark ? "text-accent-700" : "text-brand-900"
                  }`}
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    inView={inView}
                  />
                </div>
                <p
                  className={`mt-4 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                    dark ? "text-white/45" : "text-brand-500"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* ── Growth pill + ANICA membership ── */}
        <FadeIn
          delay={0.2}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-5 sm:gap-6"
        >
          <div
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full self-start border ${
              dark
                ? "bg-accent-400/10 border-accent-400/25"
                : "bg-accent-50 border-accent-200/80"
            }`}
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-700 text-white text-xs font-bold tabular-nums shrink-0"
              aria-label={`${siteConfig.stats.growthPercent}% growth`}
            >
              {siteConfig.stats.growthPercent}%
            </span>
            <span
              className={`text-sm font-medium ${dark ? "text-white/80" : "text-brand-700"}`}
            >
              {t.stats.growth}
            </span>
          </div>

          {/* ANICA membership badge */}
          <a
            href="https://anica.org.pt"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-3 px-4 py-2.5 rounded-full self-start border transition-all duration-300 ${
              dark
                ? "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                : "bg-white border-brand-900/10 shadow-[0_6px_30px_rgba(29,29,27,0.05)] hover:border-bronze/40 hover:shadow-[0_10px_40px_rgba(29,29,27,0.08)]"
            }`}
          >
            <span className="inline-flex items-center justify-center bg-white rounded-lg px-2 py-1.5">
              <img
                src="/anica-logo.png"
                alt="ANICA - Associação Nacional de Intermediários de Crédito Autorizados"
                className="h-7 w-auto"
              />
            </span>
            <span className="flex flex-col">
              <span
                className={`text-[9px] font-semibold uppercase tracking-[0.25em] ${
                  dark ? "text-white/40" : "text-brand-500"
                }`}
              >
                Membro
              </span>
              <span
                className={`text-xs font-bold transition-colors ${
                  dark
                    ? "text-white/85 group-hover:text-accent-400"
                    : "text-brand-800 group-hover:text-accent-700"
                }`}
              >
                ANICA
              </span>
            </span>
          </a>
        </FadeIn>

        <SectionCTA
          label={t.stats.ctaLabel}
          href="#contact"
          source="stats"
          tone={dark ? "dark" : "light"}
        />
      </div>
    </section>
  );
}
