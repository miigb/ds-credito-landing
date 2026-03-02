"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileSearch,
  BarChart3,
  FileText,
  Handshake,
  ShieldCheck,
  Landmark,
  Lock,
  Compass,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const { t } = useLanguage();

  const services = [
    { icon: FileSearch, title: t.services.preCheck, description: t.services.preCheckDesc },
    { icon: BarChart3, title: t.services.compare, description: t.services.compareDesc },
    { icon: FileText, title: t.services.docs, description: t.services.docsDesc },
    { icon: Handshake, title: t.services.negotiation, description: t.services.negotiationDesc },
    { icon: ShieldCheck, title: t.services.approval, description: t.services.approvalDesc },
    { icon: Lock, title: t.services.transparency, description: t.services.transparencyDesc },
  ];

  const situations = [
    { icon: Landmark, label: t.services.situationHome },
    { icon: BarChart3, label: t.services.situationInvestment },
    { icon: Compass, label: t.services.situationRelocation },
    { icon: FileText, label: t.services.situationCredit },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-accent-50 blur-[80px] opacity-60"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            {t.services.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5"
          >
            {t.services.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-brand-500 leading-relaxed"
          >
            {t.services.subheading}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              custom={i}
              className="group relative bg-white rounded-2xl p-7 border border-brand-100 hover:border-accent-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-700 transition-colors duration-300">
                <s.icon
                  size={22}
                  className="text-accent-700 group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-brand-900 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-brand-500 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-brand-900 rounded-3xl p-10 lg:p-14 overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent-700/10 blur-[80px]" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
                {t.services.intlEyebrow}
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t.services.intlHeadline}
              </h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t.services.intlDesc}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent-400 text-sm font-semibold hover:text-accent-300 transition-colors"
              >
                {t.services.intlCta}
                <svg
                  className="w-4 h-4"
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              {situations.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Icon size={20} className="text-accent-400 shrink-0" />
                  <span className="text-sm text-white/80">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
