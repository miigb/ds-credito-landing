"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";

const TubesCursor = dynamic(() => import("./TubesCursor"), { ssr: false });
import MiniSimulator from "./MiniSimulator";
import { track } from "@vercel/analytics";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { locale, t } = useLanguage();
  const { audience } = useAudience();
  const isPt = locale === "pt";
  const heroAud = audience === "partner" ? t.hero.b2b : t.hero.b2c;

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const [tubesEnabled, setTubesEnabled] = useState(false);


  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-hero-gradient"
      />

      {/* Tubes cursor effect — above gradient, below content, desktop only */}
      {tubesEnabled && (
        <div className="absolute inset-0 z-[5] hidden lg:block">
          <TubesCursor />
        </div>
      )}

      {/* Tubes effect toggle */}
      <button
        onClick={() => setTubesEnabled(!tubesEnabled)}
        title="Toggle tubes effect"
        className="fixed bottom-4 right-4 z-50 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-900/80 backdrop-blur-md border border-white/10 text-white/50 text-xs hover:text-white/80 transition-colors"
      >
        <span className={`w-2 h-2 rounded-full ${tubesEnabled ? "bg-accent-400" : "bg-white/20"}`} />
        FX
      </button>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-4"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text content */}
          <div className="max-w-xl">
            <motion.div style={{ opacity }}>
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-white/80 text-xs font-medium tracking-wide uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              {t.hero.eyebrow}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              {heroAud.headlineStart}
              <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 bg-clip-text text-transparent">
                {heroAud.headlineHighlight}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
            >
              {heroAud.subheading}
            </motion.p>

            {/* CTA group */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a
                href={audience === "partner" ? "#contact" : "#pre-qualification"}
                onClick={() => track("hero_cta", { type: "primary", audience })}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-2xl shadow-accent-700/30 hover:shadow-accent-600/40 hover:-translate-y-0.5"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href={audience === "partner" ? "#process" : "#process"}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl glass text-white hover:bg-white/15 transition-all duration-300"
              >
                {heroAud.ctaSecondary}
              </a>
            </motion.div>

            {/* Bank counter — trust signal above fold */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="inline-flex items-center gap-3 mt-4 px-4 py-2.5 rounded-xl glass"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg font-bold text-accent-400"
              >
                10+
              </motion.span>
              <span className="text-xs text-white/50">
                {isPt
                  ? "bancos parceiros a competir pelas melhores condições"
                  : "partner banks competing for your best rates"}
              </span>
            </motion.div>

            </motion.div>

          </div>

          {/* Right column — images */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="hidden lg:block relative"
          >
            {/* Main image — villa */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <img
                src="/vila.png"
                alt="Modern luxury villa at dusk"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Secondary image — penthouse overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-8 -left-12 w-[55%] rounded-xl overflow-hidden shadow-2xl shadow-black/40 border-4 border-brand-900"
            >
              <div className="aspect-[4/3]">
                <img
                  src="/penthouse.png"
                  alt="Luxury penthouse with city skyline view"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
            {/* Floating trust badge — glassmorphism with micro-interactions */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="absolute top-6 -left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-brand-900/20 max-w-[210px] border border-brand-100/50 cursor-default"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-700 to-accent-500 flex items-center justify-center shrink-0"
                >
                  <span className="text-white text-sm font-bold">€0</span>
                </motion.div>
                <div>
                  <p className="text-xs font-bold text-brand-900 leading-tight">
                    {isPt ? "Serviço gratuito" : "Free service"}
                  </p>
                  <p className="text-[10px] text-brand-500 leading-tight mt-0.5">
                    {isPt ? "Sem custo para o cliente" : "No cost to the client"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Banco de Portugal registration badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="absolute top-6 right-6 bg-brand-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 cursor-default"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
                <div>
                  <p className="text-[9px] text-white/60 uppercase tracking-wider font-medium">
                    {isPt ? "Registado" : "Registered"}
                  </p>
                  <p className="text-[10px] text-white/90 font-semibold">
                    Banco de Portugal
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ANICA membership — prominent badge */}
            <motion.a
              href="https://anica.org.pt"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2, duration: 0.7, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.06, y: -3 }}
              className="absolute bottom-12 right-6 z-10"
            >
              <div className="relative">
                {/* Glow effect behind the badge */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 rounded-2xl bg-white/20 blur-lg"
                />
                <div className="relative bg-white rounded-xl px-4 py-3 shadow-2xl shadow-black/30 border border-brand-100/80">
                  <div className="flex items-center gap-3">
                    <img
                      src="/anica-logo.png"
                      alt="ANICA — Associação Nacional de Intermediários de Crédito Autorizados"
                      className="h-10 w-auto"
                    />
                    <div className="border-l border-brand-200 pl-3">
                      <p className="text-[9px] text-accent-700 font-bold uppercase tracking-widest">
                        {isPt ? "Membro Certificado" : "Certified Member"}
                      </p>
                      <p className="text-[10px] text-brand-500 font-medium mt-0.5">
                        2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">
            {t.hero.scroll}
          </span>
          <ArrowDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>

    </section>
  );
}
