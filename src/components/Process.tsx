"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import SectionCTA from "@/components/ui/section-cta";

const STEP_PHOTOS = [
  "/process/step-01.jpg",
  "/process/step-02.jpg",
  "/process/step-03.jpg",
  "/process/step-04.jpg",
  "/process/step-05.jpg",
];

function StepPhoto({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const isEven = index % 2 === 0;
  const slideX = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? 60 : -60, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [isEven ? 3 : -3, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: slideX, opacity, scale, rotate }}
      className="hidden lg:block lg:w-[calc(50%-40px)]"
    >
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-black/10">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);
  const { t } = useLanguage();
  const { audience } = useAudience();
  const procAud = audience === "partner" ? t.process.b2b : t.process.b2c;
  const procSteps = audience === "partner" ? t.process.b2bSteps : t.process.b2cSteps;

  const steps = [
    {
      number: "01",
      title: procSteps.step1Title,
      description: procSteps.step1Desc,
      detail: procSteps.step1Detail,
    },
    {
      number: "02",
      title: procSteps.step2Title,
      description: procSteps.step2Desc,
      detail: procSteps.step2Detail,
    },
    {
      number: "03",
      title: procSteps.step3Title,
      description: procSteps.step3Desc,
      detail: procSteps.step3Detail,
    },
    {
      number: "04",
      title: procSteps.step4Title,
      description: procSteps.step4Desc,
      detail: procSteps.step4Detail,
    },
    {
      number: "05",
      title: procSteps.step5Title,
      description: procSteps.step5Desc,
      detail: procSteps.step5Detail,
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
            {procAud.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {procAud.headline}
          </h2>
          <p className="text-lg text-brand-500 max-w-2xl mx-auto">
            {procAud.subheading}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[27px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[2px] bg-brand-200">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent-700 to-accent-400 origin-top"
            />
          </div>

          <div id="process-steps" className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                custom={i}
                className={`relative flex items-start gap-8 lg:gap-0 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[19px] lg:left-1/2 lg:-translate-x-1/2 z-10">
                  <div className="w-[18px] h-[18px] rounded-full bg-white border-[3px] border-accent-700 shadow-lg shadow-accent-700/20" />
                </div>

                {/* Step card */}
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

                {/* Photo — opposite side of the card */}
                <StepPhoto src={STEP_PHOTOS[i]} index={i} />
              </motion.div>
            ))}
          </div>
        </div>

        <SectionCTA
          label={audience === "partner" ? t.process.ctaLabelB2b : t.process.ctaLabelB2c}
          href={audience === "partner" ? "#contact" : "#pre-qualification"}
          source="process"
        />
      </div>
    </section>
  );
}
