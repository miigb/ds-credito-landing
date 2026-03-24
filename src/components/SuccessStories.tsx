"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function SuccessStories() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0f1e]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-700/8 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Row 1 Left: Intro + Stats */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <span className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {t.success.eyebrow}
            </span>
            <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-tight mb-5">
              {t.success.headline}{" "}
              <span className="text-accent-400">{t.success.headlineHighlight}</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              {t.success.subheading}
            </p>
            <div className="flex items-center gap-8 mt-8">
              <div>
                <p className="text-3xl font-bold text-white">{t.success.stat1Value}</p>
                <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">
                  {t.success.stat1Label}
                </p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">{t.success.stat2Value}</p>
                <p className="text-xs uppercase tracking-widest text-white/50 font-bold mt-1">
                  {t.success.stat2Label}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 1 Right: Large testimonial */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-7 bg-white/5 border border-white/10 rounded-xl p-10 relative"
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
              <div className="w-12 h-12 rounded-full bg-accent-700/30 text-white font-bold flex items-center justify-center">
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
              <span className="inline-flex px-3 py-1 rounded-full bg-accent-700/15 text-accent-400 text-xs font-bold tracking-wider uppercase">
                {t.success.testimonial1Metric}
              </span>
            </div>
          </motion.div>

          {/* Row 2 Left: Dark testimonial */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-4 bg-brand-900 border border-white/5 rounded-xl p-8"
          >
            <p className="text-lg italic text-white/70 leading-relaxed">
              &ldquo;{t.success.testimonial2Quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-accent-700/30 text-white font-bold flex items-center justify-center text-sm">
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
          </motion.div>

          {/* Row 2 Right: Metric + testimonial */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-8 bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/3 text-center md:text-left">
              <p className="text-4xl font-bold text-accent-400">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
