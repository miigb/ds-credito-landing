"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  TrendingUp,
  Clock,
  FileCheck,
  MessageCircle,
  UserCheck,
  Scale,
  Eye,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const x2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const { t } = useLanguage();

  const businessBenefits = [
    { icon: TrendingUp, text: t.whyUs.biz1 },
    { icon: Clock, text: t.whyUs.biz2 },
    { icon: FileCheck, text: t.whyUs.biz3 },
    { icon: MessageCircle, text: t.whyUs.biz4 },
    { icon: UserCheck, text: t.whyUs.biz5 },
  ];

  const clientBenefits = [
    { icon: Scale, text: t.whyUs.cli1 },
    { icon: Eye, text: t.whyUs.cli2 },
    { icon: HeartHandshake, text: t.whyUs.cli3 },
    { icon: MapPin, text: t.whyUs.cli4 },
    { icon: Users, text: t.whyUs.cli5 },
  ];

  return (
    <section id="why-us" ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/50 to-white" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {t.whyUs.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {t.whyUs.headline}
          </h2>
          <p className="text-lg text-brand-500 max-w-2xl mx-auto">
            {t.whyUs.subheading}
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-8">
          <motion.div
            style={{ x: x1 }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-brand-100 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-900 text-white text-xs font-semibold uppercase tracking-wider mb-6">
                {t.whyUs.forBusiness}
              </div>
              <div className="space-y-5">
                {businessBenefits.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 group-hover:bg-accent-50 transition-colors duration-300">
                      <b.icon
                        size={18}
                        className="text-brand-600 group-hover:text-accent-700 transition-colors duration-300"
                      />
                    </div>
                    <p className="text-brand-700 leading-relaxed pt-1.5">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ x: x2 }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="bg-gradient-to-br from-accent-700 to-accent-800 rounded-3xl p-8 lg:p-10 shadow-xl shadow-accent-700/15">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-6">
                {t.whyUs.forClients}
              </div>
              <div className="space-y-5">
                {clientBenefits.map((b) => (
                  <div
                    key={b.text}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                      <b.icon size={18} className="text-accent-200" />
                    </div>
                    <p className="text-white/85 leading-relaxed pt-1.5">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
