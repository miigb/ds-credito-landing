"use client";

import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import SectionCTA from "@/components/ui/section-cta";

/*
 * Process — the scroll-telling centerpiece (see docs/redesign/DESIGN-BRIEF.md).
 * Desktop: a cinematic chapter scroll — sticky photo + giant numeral on the
 * left, the five step chapters scrolling on the right; the photo crossfades
 * as each chapter takes the center of the viewport. A thin ember rail tracks
 * section progress. Mobile: a vertical timeline with the same ember line.
 * Copy, section id, photos and CTA are identical to the legacy component.
 */

const EASE = [0.25, 0.4, 0.25, 1] as const;

const STEP_PHOTOS = [
  "/process/step-01.jpg",
  "/process/step-02.jpg",
  "/process/step-03.jpg",
  "/process/step-04.jpg",
  "/process/step-05.jpg",
];

type Step = {
  number: string;
  title: string;
  description: string;
  detail: string;
};

/* ── Right-column chapter block (desktop) — drives the shared activeStep ── */
function ChapterBlock({
  step,
  index,
  active,
  dark,
  stepLabel,
  onActive,
}: {
  step: Step;
  index: number;
  active: boolean;
  dark: boolean;
  stepLabel: string;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Activates when the block crosses the center band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-center py-10 ${
        index === 0 ? "lg:min-h-[52vh]" : "lg:min-h-[58vh]"
      }`}
    >
      <motion.div
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
      >
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.3em] mb-4 ${
            dark ? "text-accent-400" : "text-bronze"
          }`}
        >
          {stepLabel} {step.number}
        </p>
        <h3
          className={`text-2xl lg:text-3xl font-bold tracking-tight mb-4 ${
            dark ? "text-white" : "text-brand-900"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`leading-relaxed mb-5 max-w-md ${
            dark ? "text-white/65" : "text-brand-600"
          }`}
        >
          {step.description}
        </p>
        <p
          className={`text-sm italic pl-4 max-w-md border-l-2 ${
            dark
              ? "text-white/40 border-accent-700/40"
              : "text-brand-400 border-gold-300/50"
          }`}
        >
          {step.detail}
        </p>
      </motion.div>
    </div>
  );
}

/* ── Sticky photo + giant numeral (desktop left column) ── */
function StickyPanel({
  steps,
  activeStep,
  dark,
  stepLabel,
}: {
  steps: Step[];
  activeStep: number;
  dark: boolean;
  stepLabel: string;
}) {
  const reduced = useReducedMotion();
  const fade = { duration: reduced ? 0 : 0.6, ease: EASE };

  return (
    <div className="sticky top-24 h-[70vh] flex flex-col">
      {/* Photo frame — editorial gets a white mat, cinema sits raw on ink */}
      <div className="relative flex-1 min-h-0">
        <div
          className={`h-full rounded-2xl ${
            dark
              ? "overflow-hidden ring-1 ring-white/10"
              : "p-2 bg-white shadow-[0_18px_50px_rgba(29,29,27,0.10)]"
          }`}
        >
          <div
            className={`relative h-full overflow-hidden ${
              dark ? "" : "rounded-xl"
            }`}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={activeStep}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={fade}
              >
                <img
                  src={STEP_PHOTOS[activeStep]}
                  alt=""
                  className="w-full h-full object-cover img-warm"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Giant overlapping numeral — ember outlined on ink, low-opacity ember on paper */}
        <div
          aria-hidden
          className="absolute -bottom-9 -left-2 lg:-left-5 z-10 grid pointer-events-none"
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={activeStep}
              className={`[grid-area:1/1] font-extrabold tabular-nums leading-none tracking-tight select-none ${
                dark ? "" : "text-accent-700/30"
              }`}
              style={{
                fontSize: "clamp(6rem, 8vw, 9rem)",
                ...(dark
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "2px var(--color-accent-700)",
                    }
                  : {}),
              }}
              initial={{ opacity: 0, y: reduced ? 0 : 26 }}
              animate={{ opacity: dark ? 0.8 : 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -18 }}
              transition={fade}
            >
              {steps[activeStep].number}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Caption + progress ticks */}
      <div className="mt-6 flex items-center justify-between pl-40">
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${
            dark ? "text-accent-400" : "text-bronze"
          }`}
        >
          {stepLabel} {steps[activeStep].number}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <span
              key={s.number}
              className={`h-[2px] w-7 rounded-full transition-colors duration-500 ${
                i <= activeStep
                  ? "bg-accent-700"
                  : dark
                  ? "bg-white/15"
                  : "bg-brand-900/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile timeline step — numeral over photo, copy below ── */
function MobileStep({
  step,
  index,
  dark,
  stepLabel,
}: {
  step: Step;
  index: number;
  dark: boolean;
  stepLabel: string;
}) {
  return (
    <FadeIn delay={0.05} className="relative">
      {/* Ghost numeral overlapping the photo's top edge */}
      <span
        aria-hidden
        className={`absolute -top-1 -left-1 z-10 text-7xl font-extrabold tabular-nums leading-none tracking-tight select-none ${
          dark ? "text-accent-700/50" : "text-accent-700/30"
        }`}
      >
        {step.number}
      </span>

      <div
        className={`mt-9 rounded-2xl ${
          dark
            ? "overflow-hidden ring-1 ring-white/10"
            : "p-2 bg-white shadow-[0_14px_40px_rgba(29,29,27,0.10)]"
        }`}
      >
        <div
          className={`aspect-[4/3] overflow-hidden ${dark ? "" : "rounded-xl"}`}
        >
          <img
            src={STEP_PHOTOS[index]}
            alt=""
            className="w-full h-full object-cover img-warm"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-6">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.3em] mb-3 ${
            dark ? "text-accent-400" : "text-bronze"
          }`}
        >
          {stepLabel} {step.number}
        </p>
        <h3
          className={`text-xl font-bold tracking-tight mb-3 ${
            dark ? "text-white" : "text-brand-900"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`leading-relaxed mb-4 ${
            dark ? "text-white/65" : "text-brand-600"
          }`}
        >
          {step.description}
        </p>
        <p
          className={`text-sm italic pl-4 border-l-2 ${
            dark
              ? "text-white/40 border-accent-700/40"
              : "text-brand-400 border-gold-300/50"
          }`}
        >
          {step.detail}
        </p>
      </div>
    </FadeIn>
  );
}

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const dark = direction === "cinema";

  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const procAud = audience === "partner" ? t.process.b2b : t.process.b2c;
  const procSteps =
    audience === "partner" ? t.process.b2bSteps : t.process.b2cSteps;

  const steps: Step[] = [
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

  const railTrack = dark ? "bg-white/10" : "bg-brand-900/10";

  return (
    <section
      id="process"
      className={`relative py-28 lg:py-36 overflow-hidden ${
        dark ? "bg-ink" : "bg-paper"
      }`}
    >
      {/* hairline frame */}
      <div
        aria-hidden
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          dark ? "via-white/10" : "via-brand-900/10"
        }`}
      />

      {/* preload all chapter photos so the sticky crossfade never flashes */}
      <div aria-hidden className="hidden">
        {STEP_PHOTOS.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <FadeIn>
            <p
              className={`text-[11px] lg:text-sm font-semibold uppercase tracking-[0.3em] mb-5 ${
                dark ? "text-accent-400" : "text-bronze"
              }`}
            >
              {procAud.eyebrow}
            </p>
          </FadeIn>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight mb-6 ${
              dark ? "text-white" : "text-brand-900"
            }`}
          >
            <RevealLine>{procAud.headline}</RevealLine>
          </h2>
          <FadeIn delay={0.2}>
            <p
              className={`text-lg max-w-2xl ${
                dark ? "text-white/60" : "text-brand-500"
              }`}
            >
              {procAud.subheading}
            </p>
          </FadeIn>
        </div>

        {/* ── Chapters ── */}
        <div id="process-steps" ref={railRef} className="relative">
          {/* Ember progress rail — far left, fills with section scroll */}
          <div
            aria-hidden
            className={`absolute left-[5px] lg:left-0 top-1 bottom-1 w-[2px] rounded-full ${railTrack}`}
          >
            {reduced ? (
              <div className="w-full h-full rounded-full bg-gradient-to-b from-accent-700 to-accent-400" />
            ) : (
              <motion.div
                style={{ height: railFill }}
                className="w-full rounded-full bg-gradient-to-b from-accent-700 to-accent-400 origin-top"
              />
            )}
          </div>

          {/* Desktop: sticky photo left · scrolling chapters right */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pl-16">
            <div>
              <StickyPanel
                steps={steps}
                activeStep={activeStep}
                dark={dark}
                stepLabel={t.process.step}
              />
            </div>
            <div>
              {steps.map((step, i) => (
                <ChapterBlock
                  key={step.number}
                  step={step}
                  index={i}
                  active={i === activeStep}
                  dark={dark}
                  stepLabel={t.process.step}
                  onActive={setActiveStep}
                />
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden pl-9 space-y-20">
            {steps.map((step, i) => (
              <MobileStep
                key={step.number}
                step={step}
                index={i}
                dark={dark}
                stepLabel={t.process.step}
              />
            ))}
          </div>
        </div>

        <SectionCTA
          label={
            audience === "partner" ? t.process.ctaLabelB2b : t.process.ctaLabelB2c
          }
          href={audience === "partner" ? "#contact" : "#pre-qualification"}
          source="process"
        />
      </div>
    </section>
  );
}
