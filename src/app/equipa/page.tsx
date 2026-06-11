"use client";

import Navbar from "@/components/Navbar";
import TeamGrid from "@/components/TeamGrid";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import Link from "next/link";

/*
 * /equipa — Amanhecer 2026 re-skin (see docs/redesign/DESIGN-BRIEF.md).
 * Hero band: ink canvas with the dark dawn radial rising from the fold.
 * Grid section: paper (TeamGrid owns its canvas). Copy and structure
 * (t.team.* / t.success.*, headline-highlight split, /#contact CTA) unchanged.
 */

export default function EquipaPage() {
  const { t } = useLanguage();

  // Split headline around the highlight word
  const headline = t.team.headline;
  const highlight = t.team.headlineHighlight;
  const highlightIndex = headline
    .toLowerCase()
    .indexOf(highlight.toLowerCase());

  let headlineBefore = headline;
  let headlineAfter = "";
  if (highlightIndex >= 0) {
    headlineBefore = headline.slice(0, highlightIndex);
    headlineAfter = headline.slice(highlightIndex + highlight.length);
  }

  return (
    <main className="relative">
      <Navbar />

      {/* Hero band — ink, dawn rising from the fold */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-brand-900">
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="text-center">
            <FadeIn onMount>
              <p className="inline-flex items-center gap-2.5 text-[11px] lg:text-xs font-semibold tracking-[0.3em] text-accent-400 uppercase mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-400"
                  style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
                />
                {t.team.eyebrow}
              </p>
            </FadeIn>
            <h1 className="text-4xl lg:text-7xl font-bold text-white tracking-tight mb-7 text-balance">
              <RevealLine index={0} onMount>
                {headlineBefore}
                <span className="text-accent-400">{highlight}</span>
                {headlineAfter}
              </RevealLine>
            </h1>
            <FadeIn delay={0.4} onMount>
              <p className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto">
                {t.team.subheading}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Grid — paper chapter */}
      <TeamGrid />

      {/* Success Stories */}
      <SuccessStories />

      {/* CTA Section — ember glow on ink */}
      <section className="relative py-28 overflow-hidden bg-brand-900">
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6 text-balance">
              {t.success.ctaHeadline}
            </h2>
            <p className="text-white/60 text-lg mb-10">
              {t.success.ctaSubheading}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-accent-700 text-white rounded-full font-semibold shadow-2xl shadow-accent-700/30 hover:bg-accent-600 hover:-translate-y-0.5 transition-all"
            >
              {t.success.ctaButton}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
