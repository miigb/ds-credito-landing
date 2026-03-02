"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

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

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

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
    { value: 22, suffix: "+", label: t.stats.years },
    { value: 170, suffix: "", label: t.stats.stores },
    { value: 1400, suffix: "+", label: t.stats.team },
    { value: 545, suffix: "M+", prefix: "€", label: t.stats.deeds },
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
          viewport={{ once: true, margin: "-80px" }}
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
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
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
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-50 border border-accent-100">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-700 text-white text-xs font-bold">
              54%
            </span>
            <span className="text-sm font-medium text-brand-700">
              {t.stats.growth}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
