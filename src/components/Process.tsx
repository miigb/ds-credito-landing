"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t.process.step1Title,
      description: t.process.step1Desc,
      detail: t.process.step1Detail,
    },
    {
      number: "02",
      title: t.process.step2Title,
      description: t.process.step2Desc,
      detail: t.process.step2Detail,
    },
    {
      number: "03",
      title: t.process.step3Title,
      description: t.process.step3Desc,
      detail: t.process.step3Detail,
    },
    {
      number: "04",
      title: t.process.step4Title,
      description: t.process.step4Desc,
      detail: t.process.step4Detail,
    },
    {
      number: "05",
      title: t.process.step5Title,
      description: t.process.step5Desc,
      detail: t.process.step5Detail,
    },
  ];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-28 bg-brand-50 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {t.process.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {t.process.headline}
          </h2>
          <p className="text-lg text-brand-500 max-w-2xl mx-auto">
            {t.process.subheading}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-[27px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-brand-200">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent-700 to-accent-400 origin-top"
            />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                custom={0}
                className={`relative flex items-start gap-8 lg:gap-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="absolute left-[19px] lg:left-1/2 lg:-translate-x-1/2 z-10">
                  <div className="w-[18px] h-[18px] rounded-full bg-white border-[3px] border-accent-700 shadow-lg shadow-accent-700/20" />
                </div>

                <div
                  className={`ml-16 lg:ml-0 lg:w-[calc(50%-40px)] ${
                    i % 2 === 0 ? "lg:pr-0" : "lg:pl-0"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-7 border border-brand-100 shadow-sm hover:shadow-lg transition-shadow duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-bold text-accent-700 bg-accent-50 px-3 py-1.5 rounded-lg">
                        {t.process.step} {step.number}
                      </span>
                      <h3 className="text-xl font-bold text-brand-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-brand-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <p className="text-sm text-brand-400 italic">
                      {step.detail}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
