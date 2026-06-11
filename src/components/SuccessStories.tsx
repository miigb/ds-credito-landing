"use client";

import { Star, Quote } from "lucide-react";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { useLanguage } from "@/lib/LanguageContext";

/*
 * SuccessStories — ink chapter of /equipa (Amanhecer 2026).
 * Tonal white/[0.04] cards on warm ink with a soft ember glow; amber
 * eyebrow + highlight, display metrics in tabular-nums. The bento layout,
 * headline-highlight split and every t.success.* string are unchanged.
 */

export default function SuccessStories() {
  const { t } = useLanguage();

  // Split headline around highlight word
  const headline = t.success.headline;
  const highlight = t.success.headlineHighlight;
  const hlIdx = headline.toLowerCase().indexOf(highlight.toLowerCase());
  let hlBefore = headline;
  let hlAfter = "";
  if (hlIdx >= 0) {
    hlBefore = headline.slice(0, hlIdx);
    hlAfter = headline.slice(hlIdx + highlight.length);
  }

  return (
    <section className="relative py-28 overflow-hidden bg-brand-900">
      {/* Background — soft ember glow on ink */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Row 1 Left: Intro + Stats */}
          <FadeIn className="md:col-span-5 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2.5 text-[11px] lg:text-xs font-semibold tracking-[0.3em] text-accent-400 uppercase mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-400"
                style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
              />
              {t.success.eyebrow}
            </span>
            <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-tight mb-5">
              <RevealLine>
                {hlBefore}
                <span className="text-accent-400">{highlight}</span>
                {hlAfter}
              </RevealLine>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              {t.success.subheading}
            </p>
            <div className="flex items-center gap-8 mt-10 pt-6 border-t border-white/10">
              <div>
                <p className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                  {t.success.stat1Value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-semibold mt-2">
                  {t.success.stat1Label}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Row 1 Right: Large testimonial */}
          <FadeIn
            delay={0.15}
            className="md:col-span-7 bg-white/[0.04] border border-white/10 rounded-3xl p-8 lg:p-10 relative"
          >
            <Quote
              size={48}
              className="absolute top-6 right-6 text-accent-400/15"
            />
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-accent-400 fill-accent-400"
                />
              ))}
            </div>
            <p className="text-xl lg:text-2xl italic text-white/80 leading-relaxed">
              &ldquo;{t.success.testimonial1Quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-accent-700/25 text-white font-bold flex items-center justify-center">
                {t.success.testimonial1Name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-bold text-white">{t.success.testimonial1Name}</p>
                <p className="text-sm text-white/50">{t.success.testimonial1Role}</p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex px-3.5 py-1 rounded-full bg-accent-700/15 text-accent-400 text-xs font-bold tracking-wider uppercase">
                {t.success.testimonial1Metric}
              </span>
            </div>
          </FadeIn>

          {/* Row 2 Left: quiet tonal testimonial */}
          <FadeIn className="md:col-span-4 bg-white/[0.02] border border-white/[0.07] rounded-3xl p-8">
            <p className="text-lg italic text-white/70 leading-relaxed">
              &ldquo;{t.success.testimonial2Quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-accent-700/25 text-white font-bold flex items-center justify-center text-sm">
                {t.success.testimonial2Name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{t.success.testimonial2Name}</p>
                <p className="text-xs text-white/40">{t.success.testimonial2Role}</p>
              </div>
            </div>
          </FadeIn>

          {/* Row 2 Right: Metric + testimonial */}
          <FadeIn
            delay={0.1}
            className="md:col-span-8 bg-white/[0.04] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/3 text-center md:text-left">
              <p className="text-4xl lg:text-5xl font-extrabold text-accent-400 tracking-tight tabular-nums">
                {t.success.testimonial3Metric}
              </p>
            </div>
            <div className="md:w-2/3">
              <p className="italic text-white/70 leading-relaxed">
                &ldquo;{t.success.testimonial3Quote}&rdquo;
              </p>
              <p className="font-bold text-white mt-4">
                {t.success.testimonial3Name},{" "}
                <span className="text-white/50 font-normal">{t.success.testimonial3Role}</span>
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
