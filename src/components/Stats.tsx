"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { siteConfig } from "@/lib/siteConfig";
import SectionCTA from "@/components/ui/section-cta";

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
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

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
  }, [inView, value, hasAnimated]);

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { id: "years", value: siteConfig.stats.yearsExperience, suffix: "+", label: t.stats.years },
    { id: "stores", value: siteConfig.stats.stores, suffix: "", label: t.stats.stores },
    { id: "team", value: siteConfig.stats.teamMembers, suffix: "+", label: t.stats.team },
    { id: "deeds", value: siteConfig.stats.deedsValueMillions, suffix: "M+", prefix: "€", label: t.stats.deeds },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-brand-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            {t.stats.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight"
          >
            {t.stats.headline}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              custom={i}
              className="relative group"
            >
              <div className="relative bg-white rounded-2xl p-8 border border-brand-100 shadow-sm hover:shadow-lg hover:border-accent-200 transition-all duration-500 hover:-translate-y-1">
                <div className="text-3xl lg:text-4xl font-bold text-brand-900 mb-2 tabular-nums">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    inView={inView}
                  />
                </div>
                <p className="text-sm text-brand-500 leading-relaxed">
                  {stat.label}
                </p>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-accent-700 to-accent-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-50 border border-accent-100">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-700 text-white text-xs font-bold" aria-label={`${siteConfig.stats.growthPercent}% growth`}>
              {siteConfig.stats.growthPercent}%
            </span>
            <span className="text-sm font-medium text-brand-700">
              {t.stats.growth}
            </span>
          </div>

          {/* ANICA membership badge */}
          <a
            href="https://anica.org.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-brand-200 hover:border-accent-200 hover:shadow-md transition-all duration-300 group"
          >
            <img
              src="/anica-logo.png"
              alt="ANICA - Associação Nacional de Intermediários de Crédito Autorizados"
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-brand-500 uppercase tracking-wider">Membro</span>
              <span className="text-xs font-bold text-brand-800 group-hover:text-accent-700 transition-colors">ANICA</span>
            </div>
          </a>
        </motion.div>

        <SectionCTA label={t.stats.ctaLabel} href="#contact" source="stats" />
      </div>
    </section>
  );
}
