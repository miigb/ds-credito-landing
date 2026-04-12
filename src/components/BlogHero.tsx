"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const FILTER_TABS = [
  { label: "Todos", value: "all" },
  { label: "Cr\u00e9dito Habita\u00e7\u00e3o", value: "cr\u00e9dito habita\u00e7\u00e3o" },
  { label: "Mercado", value: "mercado imobili\u00e1rio" },
  { label: "Euribor", value: "euribor" },
  { label: "Regula\u00e7\u00e3o", value: "regula\u00e7\u00e3o" },
  { label: "Literacia Financeira", value: "literacia financeira" },
];

interface BlogHeroProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export default function BlogHero({ activeTag, onTagChange }: BlogHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative bg-brand-900 overflow-hidden pt-32 pb-16">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-accent-400"
          >
            {t.blog.eyebrow}
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            {t.blog.headline}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-2xl text-lg text-white/60"
          >
            {t.blog.subheading}
          </motion.p>

          {/* Filter tabs */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => onTagChange(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeTag === tab.value
                    ? "bg-accent-700 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
