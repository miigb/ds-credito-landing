"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MeshHero from "@/components/fx/MeshHero";
import HlsVideo from "@/components/fx/HlsVideo";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { RayBurst } from "@/components/brand/BrandIcons";
import MiniSimulator from "./MiniSimulator";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";

/*
 * Hero — three art directions of the same content (see docs/redesign/DESIGN-BRIEF.md):
 *  cinema + video  · ambient video, bottom backdrop-blur mask (no dark gradient),
 *                    liquid-glass pills, staggered blur-fade-up entrances
 *  cinema + shader · golden-hour mesh shader on ink, type-as-hero
 *  editorial       · warm paper, dawn radial, mixed-weight ink display type
 * Copy, CTAs, tracking, MiniSimulator and trust badges are identical to the
 * legacy hero — presentation only.
 *
 * Video source (self-hosted, gitignored): public/hero/hero-ambient.mp4 ←
 * https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4
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

/* ──────────────────────────────────────────────────────────────────────────
 * Video treatment — cinematic streaming hero
 * ────────────────────────────────────────────────────────────────────────── */

/* Same trust content as TrustStrip, recomposed as a slim metadata row. */
function VideoTrustRow() {
  const { locale } = useLanguage();
  const isPt = locale === "pt";

  return (
    <div
      className="animate-blur-fade-up flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 md:mb-8 text-xs sm:text-sm text-white/75"
      style={{ animationDelay: "300ms" }}
    >
      <span className="flex items-baseline gap-2">
        <span className="font-semibold text-white tabular-nums">10+</span>
        <span>
          {isPt
            ? "bancos parceiros a competir pelas melhores condições"
            : "partner banks competing for your best rates"}
        </span>
      </span>
      <span className="flex items-baseline gap-2">
        <span className="font-semibold text-white tabular-nums">€0</span>
        <span>
          {isPt ? "Serviço gratuito — sem custo para o cliente" : "Free service — no cost to the client"}
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-accent-400" />
        <span className="font-medium text-white/90">
          {isPt ? "Registado" : "Registered"} · Banco de Portugal n.º 0007470
        </span>
      </span>
      <a
        href="https://anica.org.pt"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2"
      >
        <span className="inline-flex items-center justify-center bg-white rounded-md px-1.5 py-1">
          <img
            src="/anica-logo.png"
            alt="ANICA — Associação Nacional de Intermediários de Crédito Autorizados"
            className="h-4 w-auto"
          />
        </span>
        <span className="group-hover:underline">
          {isPt ? "Membro Certificado" : "Certified Member"} 2025
        </span>
      </a>
    </div>
  );
}

function VideoHero() {
  const { t } = useLanguage();
  const { audience } = useAudience();
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;
  const isClient = audience === "client";
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* ── Backdrop: ambient video over a warm-ink fallback ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1D1D1B 0%, #2a1f12 55%, #4a3210 100%)" }}
      >
        {!reduced && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero/hero-ambient.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>

      {/* Bottom blur overlay — blur only, no dark gradient */}
      <div
        aria-hidden
        className="mask-fade-bottom pointer-events-none absolute inset-0 z-[1] backdrop-blur-xl"
      />

      {/* slim top scrim so navbar chrome stays legible over bright sky */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[2] h-36"
        style={{ background: "linear-gradient(to bottom, rgba(29,29,27,0.5), transparent)" }}
      />

      {/* melt into the next ink chapter */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(29,29,27,0.9))" }}
      />

      {/* ── Content — bottom-anchored ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-14 md:pb-20">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          {/* Left */}
          <div className="hero-video-legibility flex-1 max-w-3xl">
            <div
              className="animate-blur-fade-up inline-flex items-center gap-2.5 mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-400"
              style={{ animationDelay: "200ms" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-400"
                style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
              />
              {t.hero.eyebrow}
            </div>

            <VideoTrustRow />

            <h1
              className="animate-blur-fade-up text-white font-normal mb-4 md:mb-6"
              style={{
                animationDelay: "400ms",
                fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
              }}
            >
              {heroAud.headlineStart}
              <span className="block">{heroAud.headlineHighlight}</span>
            </h1>

            <p
              className="animate-blur-fade-up text-base sm:text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-8 md:mb-10"
              style={{ animationDelay: "500ms" }}
            >
              {heroAud.subheading}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href={audience === "partner" ? "#contact" : "#pre-qualification"}
                onClick={() => track("hero_cta", { type: "primary", audience })}
                className="animate-blur-fade-up group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-base font-medium rounded-full bg-white text-ink hover:bg-brand-100 transition-colors duration-300"
                style={{ animationDelay: "600ms" }}
              >
                {heroAud.ctaPrimary}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                className="animate-blur-fade-up liquid-glass inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 text-base font-medium rounded-full text-white hover:bg-white/[0.06] transition-colors duration-300"
                style={{ animationDelay: "700ms" }}
              >
                {heroAud.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right — the instrument (B2C) */}
          {isClient && (
            <div
              className="animate-blur-fade-up w-full max-w-md md:w-[380px] shrink-0"
              style={{ animationDelay: "800ms" }}
            >
              <MiniSimulator />
            </div>
          )}
        </div>
      </div>

      <ScrollCue tone="dark" />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Video treatment 2 — minimal liquid-glass ("Equilibrium" grammar)
 * Raw ambient video (no blur mask), bottom-left content, no entrance
 * animations — the video itself provides the motion. Pairs with the
 * liquid-glass nav pill variant in Navbar.tsx.
 * ────────────────────────────────────────────────────────────────────────── */

function VideoHero2() {
  const { t } = useLanguage();
  const { locale } = useLanguage();
  const { audience } = useAudience();
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;
  const isClient = audience === "client";
  const isPt = locale === "pt";
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* ── Backdrop: ambient video over a warm-ink fallback ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1D1D1B 0%, #2a1f12 55%, #4a3210 100%)" }}
      >
        {!reduced && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero/hero-ambient-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </div>

      {/* slim top scrim so navbar chrome stays legible */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-[2] h-32"
        style={{ background: "linear-gradient(to bottom, rgba(29,29,27,0.45), transparent)" }}
      />

      {/* melt into the next ink chapter */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-28"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(29,29,27,0.92))" }}
      />

      {/* ── Content — bottom-left, no entrance animations ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-32 pb-10 sm:pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Left */}
          <div className="hero-video-legibility max-w-2xl">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4">
              {heroAud.headlineStart}
              <span className="block">{heroAud.headlineHighlight}</span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-7 max-w-md">
              {heroAud.subheading}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={audience === "partner" ? "#contact" : "#pre-qualification"}
                onClick={() => track("hero_cta", { type: "primary", audience })}
                className="bg-white text-ink text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                {heroAud.ctaPrimary}
              </a>
              <a
                href="#process"
                className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors"
              >
                {heroAud.ctaSecondary}
              </a>
            </div>

            {/* quiet trust footnote — same content, whisper volume */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-white/45">
              <span>
                {isPt ? "Registado" : "Registered"} · Banco de Portugal n.º 0007470
              </span>
              <span>
                <span className="text-white/70 font-medium">€0</span>{" "}
                {isPt ? "Serviço gratuito — sem custo para o cliente" : "Free service — no cost to the client"}
              </span>
              <span>
                <span className="text-white/70 font-medium">10+</span>{" "}
                {isPt
                  ? "bancos parceiros a competir pelas melhores condições"
                  : "partner banks competing for your best rates"}
              </span>
              <a
                href="https://anica.org.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 underline underline-offset-2 transition-colors"
              >
                ANICA · {isPt ? "Membro Certificado" : "Certified Member"} 2025
              </a>
            </div>
          </div>

          {/* Right — the instrument (B2C) */}
          {isClient && (
            <div className="w-full max-w-md md:w-[380px] shrink-0">
              <MiniSimulator />
            </div>
          )}
        </div>
      </div>

      <ScrollCue tone="dark" />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Video treatment 3 — HLS stream + glassmorphic chrome, centered composition
 * Mux adaptive stream (hls.js where not native), floating glass header
 * (see Navbar.tsx glassBar), gentle centered fade-in entrances.
 * ────────────────────────────────────────────────────────────────────────── */

const HLS_SRC = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";

function VideoHero3() {
  const { t, locale } = useLanguage();
  const { audience } = useAudience();
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;
  const isClient = audience === "client";
  const isPt = locale === "pt";
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* ── Backdrop: HLS ambient stream over a warm-ink fallback ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #1D1D1B 0%, #2a1f12 55%, #4a3210 100%)" }}
      >
        {!reduced && (
          <HlsVideo src={HLS_SRC} className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>

      {/* centered vignette for copy legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(95% 75% at 50% 52%, rgba(16,11,6,0.30) 0%, rgba(16,11,6,0.62) 100%)",
        }}
      />

      {/* melt into the next ink chapter */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-28"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(29,29,27,0.92))" }}
      />

      {/* ── Content — centered ── */}
      <div className="hero-video-legibility relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 w-full pt-32 pb-12 lg:pb-24">
        <FadeIn delay={0.1} onMount>
          <div className="inline-flex items-center gap-2.5 mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-400">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-400"
              style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
            />
            {t.hero.eyebrow}
          </div>
        </FadeIn>

        <FadeIn delay={0.25} onMount>
          <h1
            className="text-white font-semibold tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.8vw, 5.2rem)", lineHeight: 1.02 }}
          >
            {heroAud.headlineStart}
            <span className="block text-accent-400">{heroAud.headlineHighlight}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} onMount>
          <p className="text-white/65 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-9">
            {heroAud.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={0.55} onMount>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={audience === "partner" ? "#contact" : "#pre-qualification"}
              onClick={() => track("hero_cta", { type: "primary", audience })}
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-2xl shadow-accent-700/30 hover:-translate-y-0.5"
            >
              {heroAud.ctaPrimary}
              <svg
                className="w-4 h-4"
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
              className="liquid-glass inline-flex items-center px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-medium rounded-full text-white hover:bg-white/5 transition-colors"
            >
              {heroAud.ctaSecondary}
            </a>
          </div>
        </FadeIn>

        {/* quiet trust footnote — same content, centered */}
        <FadeIn delay={0.7} onMount>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] text-white/45">
            <span>
              {isPt ? "Registado" : "Registered"} · Banco de Portugal n.º 0007470
            </span>
            <span>
              <span className="text-white/70 font-medium">€0</span>{" "}
              {isPt ? "Serviço gratuito — sem custo para o cliente" : "Free service — no cost to the client"}
            </span>
            <span>
              <span className="text-white/70 font-medium">10+</span>{" "}
              {isPt
                ? "bancos parceiros a competir pelas melhores condições"
                : "partner banks competing for your best rates"}
            </span>
            <a
              href="https://anica.org.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 underline underline-offset-2 transition-colors"
            >
              ANICA · {isPt ? "Membro Certificado" : "Certified Member"} 2025
            </a>
          </div>
        </FadeIn>
      </div>

      {/* ── The instrument (B2C): docked bottom-right on lg, in-flow below on mobile ── */}
      {isClient && (
        <div className="relative z-10 w-full max-w-md mx-auto px-6 pb-12 lg:p-0 lg:absolute lg:right-8 lg:bottom-8 lg:w-[350px] lg:max-w-none lg:mx-0">
          <MiniSimulator />
        </div>
      )}

      <ScrollCue tone="dark" />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Shader / editorial treatments
 * ────────────────────────────────────────────────────────────────────────── */

function ClassicHero() {
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

export default function Hero() {
  const { direction, heroStyle } = usePrototype();

  if (direction === "cinema" && heroStyle === "video") {
    return <VideoHero />;
  }
  if (direction === "cinema" && heroStyle === "video2") {
    return <VideoHero2 />;
  }
  if (direction === "cinema" && heroStyle === "video3") {
    return <VideoHero3 />;
  }
  return <ClassicHero />;
}
