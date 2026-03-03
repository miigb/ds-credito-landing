"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Shield, Globe, Banknote } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const badges = [
    { icon: Shield, label: t.hero.badgeIndependent },
    { icon: Globe, label: t.hero.badgeInternational },
    { icon: Banknote, label: t.hero.badgeNoCost },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-hero-gradient"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-700/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/8 blur-[100px]" />
        <svg
          className="absolute top-20 right-10 lg:right-20 w-32 h-32 lg:w-64 lg:h-64 opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="95" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="5" x2="100" y2="195" stroke="white" strokeWidth="0.5" />
          <line x1="5" y1="100" x2="195" y2="100" stroke="white" strokeWidth="0.5" />
          <path d="M100 10 L106 90 L100 80 L94 90 Z" fill="white" />
        </svg>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-28 pb-20"
      >
        <div className="max-w-3xl">
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

          {/* Headline — no initial hidden to avoid delaying LCP */}
          <motion.h1
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            {t.hero.headlineStart}
            <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 bg-clip-text text-transparent">
              {t.hero.headlineHighlight}
            </span>
          </motion.h1>

          {/* Subheading — no initial hidden to avoid delaying LCP */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
          >
            {t.hero.subheading}
          </motion.p>

          {/* CTA group */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-2xl shadow-accent-700/30 hover:shadow-accent-600/40 hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl glass text-white hover:bg-white/15 transition-all duration-300"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-4"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass text-white/70 text-sm"
              >
                <Icon size={16} className="text-accent-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
