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
import { useAudience } from "@/lib/AudienceContext";
import SectionCTA from "@/components/ui/section-cta";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const { t } = useLanguage();
  const { audience } = useAudience();
  const svcAud = audience === "partner" ? t.services.b2b : t.services.b2c;
  const intlAud = audience === "partner" ? t.services.intl.b2b : t.services.intl.b2c;

  const services = [
    { id: "pre-check", icon: FileSearch, title: t.services.preCheck, description: t.services.preCheckDesc },
    { id: "compare", icon: BarChart3, title: t.services.compare, description: t.services.compareDesc },
    { id: "docs", icon: FileText, title: t.services.docs, description: t.services.docsDesc },
    { id: "negotiation", icon: Handshake, title: t.services.negotiation, description: t.services.negotiationDesc },
    { id: "approval", icon: ShieldCheck, title: t.services.approval, description: t.services.approvalDesc },
    { id: "transparency", icon: Lock, title: t.services.transparency, description: t.services.transparencyDesc },
  ];

  const situations = [
    { id: "home", icon: Landmark, label: t.services.situationHome },
    { id: "investment", icon: BarChart3, label: t.services.situationInvestment },
    { id: "relocation", icon: Compass, label: t.services.situationRelocation },
    { id: "credit", icon: FileText, label: t.services.situationCredit },
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
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-2xl mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            {svcAud.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5"
          >
            {svcAud.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-brand-500 leading-relaxed"
          >
            {svcAud.subheading}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.id}
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

        {/* International clients / situation cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-brand-900 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden"
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
                {intlAud.eyebrow}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                {intlAud.headline}
              </h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                {intlAud.desc}
              </p>
              <a
                href={intlAud.ctaHref}
                className="inline-flex items-center gap-2 text-accent-400 text-sm font-semibold hover:text-accent-300 transition-colors"
              >
                {intlAud.cta}
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

            <div className="grid grid-cols-2 gap-3">
              {situations.map(({ id, icon: Icon, label }) => (
                <div
                  key={id}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Icon size={18} className="text-accent-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-white/80 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <SectionCTA
          label={audience === "partner" ? t.services.ctaLabelB2b : t.services.ctaLabelB2c}
          href={audience === "partner" ? "#contact" : "#pre-qualification"}
          source="services"
        />
      </div>
    </section>
  );
}
