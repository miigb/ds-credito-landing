"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MeshHero from "@/components/fx/MeshHero";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { RayBurst } from "@/components/brand/BrandIcons";
import MiniSimulator from "./MiniSimulator";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";

/*
 * Hero — two art directions of the same content (see docs/redesign/DESIGN-BRIEF.md):
 *  cinema    · golden-hour mesh shader on ink, type-as-hero
 *  editorial · warm paper, dawn radial, mixed-weight ink display type
 * Copy, CTAs, tracking, MiniSimulator and trust badges are identical to the
 * legacy hero — presentation only.
 */

function CtaGroup({ tone }: { tone: "dark" | "light" }) {
  const { t } = useLanguage();
  const { audience } = useAudience();
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <a
        href={audience === "partner" ? "#contact" : "#pre-qualification"}
        onClick={() => track("hero_cta", { type: "primary", audience })}
        className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-2xl shadow-accent-700/30 hover:shadow-accent-600/40 hover:-translate-y-0.5"
      >
        {heroAud.ctaPrimary}
        <svg
          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>
      <a
        href="#process"
        className={`inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full transition-all duration-300 ${
          tone === "dark"
            ? "text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06]"
            : "text-brand-900 border border-brand-900/20 hover:border-brand-900/45 hover:bg-brand-900/[0.04]"
        }`}
      >
        {heroAud.ctaSecondary}
      </a>
    </div>
  );
}

/* Trust footnotes — €0, 10+ banks, BdP, ANICA. Editorial chips, not floating badges. */
function TrustStrip({ tone }: { tone: "dark" | "light" }) {
  const { locale } = useLanguage();
  const isPt = locale === "pt";
  const line = tone === "dark" ? "border-white/12" : "border-brand-900/10";
  const label = tone === "dark" ? "text-white/40" : "text-brand-500/70";
  const value = tone === "dark" ? "text-white/85" : "text-brand-900";

  return (
    <FadeIn delay={0.75}>
      <div className={`mt-12 lg:mt-14 pt-6 border-t ${line} flex flex-wrap items-center gap-x-8 gap-y-4`}>
        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-extrabold tracking-tight text-accent-700 tabular-nums">
            10+
          </span>
          <span className={`text-xs leading-snug max-w-[180px] ${label}`}>
            {isPt
              ? "bancos parceiros a competir pelas melhores condições"
              : "partner banks competing for your best rates"}
          </span>
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-extrabold tracking-tight text-accent-700 tabular-nums">
            €0
          </span>
          <span className={`text-xs leading-snug max-w-[140px] ${label}`}>
            {isPt ? "Serviço gratuito — sem custo para o cliente" : "Free service — no cost to the client"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold ${label}`}>
            {isPt ? "Registado" : "Registered"}
          </span>
          <span className={`text-xs font-semibold ${value}`}>
            Banco de Portugal · n.º 0007470
          </span>
        </div>

        <a
          href="https://anica.org.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5"
        >
          <span className="inline-flex items-center justify-center bg-white rounded-lg px-2 py-1.5 shadow-sm">
            <img
              src="/anica-logo.png"
              alt="ANICA — Associação Nacional de Intermediários de Crédito Autorizados"
              className="h-6 w-auto"
            />
          </span>
          <span className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-accent-700">
              {isPt ? "Membro Certificado" : "Certified Member"}
            </span>
            <span className={`text-xs font-medium ${label} group-hover:underline`}>2025</span>
          </span>
        </a>
      </div>
    </FadeIn>
  );
}

function ScrollCue({ tone }: { tone: "dark" | "light" }) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden lg:flex"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className={`flex flex-col items-center gap-2 ${tone === "dark" ? "text-white/40" : "text-brand-500/60"}`}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <ArrowDown size={15} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;
  const isClient = audience === "client";

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const tone: "dark" | "light" = direction === "cinema" ? "dark" : "light";

  return (
    <section
      ref={ref}
      className={`relative min-h-[100svh] flex flex-col justify-center overflow-hidden pb-16 lg:pb-20 ${
        direction === "editorial" ? "bg-paper" : "bg-ink"
      }`}
    >
      {/* ── Backdrop ── */}
      {direction === "cinema" ? (
        <>
          <MeshHero palette="dark" opacity={0.5} />
          {/* ink veil — keeps the mesh deep, not neon */}
          <div aria-hidden className="absolute inset-0 bg-ink/35" />
          {/* radial scrim for copy legibility */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(125% 95% at 42% 46%, transparent 34%, rgba(16,11,6,0.72) 100%)",
            }}
          />
          {/* melt into the next ink chapter */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40"
            style={{
              background: "linear-gradient(to bottom, transparent, #1D1D1B)",
            }}
          />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-dawn-radial" />
          {/* faint ray ornament, sun-cast from the top-right */}
          <RayBurst
            aria-hidden
            className="absolute -top-6 right-[4%] text-bronze/25 hidden lg:block rotate-180"
            width={300}
            height={200}
          />
        </>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 lg:pt-28"
      >
        <div
          className={`grid gap-12 lg:gap-16 items-center ${
            isClient ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-[1.5fr_0.5fr]"
          }`}
        >
          {/* ── Left: type ── */}
          <div className="max-w-2xl">
            <FadeIn delay={0} onMount>
              <div
                className={`inline-flex items-center gap-2.5 mb-8 text-[11px] font-semibold uppercase tracking-[0.3em] ${
                  tone === "dark" ? "text-accent-400" : "text-bronze"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-400"
                  style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
                />
                {t.hero.eyebrow}
              </div>
            </FadeIn>

            <h1
              className={`mb-7 tracking-tight ${
                tone === "dark" ? "text-white" : "text-brand-900"
              }`}
              style={{
                fontSize: "clamp(2.6rem, 6.6vw, 5.9rem)",
                lineHeight: 0.99,
              }}
            >
              <RevealLine index={0} onMount className={direction === "editorial" ? "font-light" : "font-bold"}>
                {heroAud.headlineStart}
              </RevealLine>
              <RevealLine
                index={1}
                onMount
                className={direction === "editorial" ? "font-extrabold" : "font-bold"}
              >
                <span className="text-accent-700">{heroAud.headlineHighlight}</span>
              </RevealLine>
            </h1>

            <FadeIn delay={0.45} onMount>
              <p
                className={`text-lg lg:text-xl leading-relaxed max-w-xl mb-10 ${
                  tone === "dark" ? "text-white/65" : "text-brand-500"
                }`}
              >
                {heroAud.subheading}
              </p>
            </FadeIn>

            <FadeIn delay={0.6} onMount>
              <CtaGroup tone={tone} />
            </FadeIn>

            <div className={isClient ? "hidden lg:block" : ""}>
              <TrustStrip tone={tone} />
            </div>
          </div>

          {/* ── Right: instrument (client) / negative space (partner) ── */}
          {isClient ? (
            <div className="w-full max-w-md lg:justify-self-end">
              <MiniSimulator />
              <div className="lg:hidden">
                <TrustStrip tone={tone} />
              </div>
            </div>
          ) : (
            <div aria-hidden className="hidden lg:flex items-end justify-end pb-6">
              <RayBurst
                width={220}
                height={147}
                className={tone === "dark" ? "text-accent-700/40" : "text-bronze/30"}
              />
            </div>
          )}
        </div>
      </motion.div>

      <ScrollCue tone={tone} />
    </section>
  );
}
