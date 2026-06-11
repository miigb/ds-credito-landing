"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
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
 * Desktop: the whole section PINS to the viewport and the five step chapters
 * advance in place as you scroll — a scroll-driven deck. A tall outer track
 * provides the scroll budget; a sticky h-screen stage holds the photo + giant
 * numeral on the left and the active chapter copy on the right, both crossfading
 * per step. A thin ember rail tracks scroll progress. Mobile (and reduced
 * motion): a vertical timeline. Copy, section id, photos and CTA are identical
 * to the legacy component.
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
            decoding="async"
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

/* ── Desktop pinned deck — sticky stage, scroll drives the active step ── */
function PinnedDeck({
  steps,
  dark,
  stepLabel,
}: {
  steps: Step[];
  dark: boolean;
  stepLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Pinned travel: progress 0→1 spans the whole track minus one viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActiveStep(idx);
  });
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const active = steps[activeStep];

  return (
    <div
      ref={trackRef}
      className="hidden lg:block relative lg:-mt-[12vh]"
      style={{ height: `${steps.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-12 xl:gap-x-20 items-center">
            {/* Ember scroll-progress rail */}
            <div
              aria-hidden
              className={`relative h-[60vh] w-[2px] rounded-full ${
                dark ? "bg-white/10" : "bg-brand-900/10"
              }`}
            >
              <motion.div
                style={{ height: railFill }}
                className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-accent-700 to-accent-400 origin-top"
              />
            </div>

            {/* Photo + giant numeral (crossfade per step) */}
            <div className="relative h-[60vh]">
              <div
                className={`h-full rounded-2xl ${
                  dark
                    ? "overflow-hidden ring-1 ring-white/10"
                    : "p-2 bg-white shadow-[0_18px_50px_rgba(29,29,27,0.10)]"
                }`}
              >
                <div
                  className={`relative h-full overflow-hidden ${dark ? "" : "rounded-xl"}`}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={activeStep}
                      src={STEP_PHOTOS[activeStep]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover img-warm"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Giant overlapping numeral */}
              <div
                aria-hidden
                className="absolute -bottom-9 -left-2 z-10 grid pointer-events-none"
              >
                <AnimatePresence initial={false}>
                  <motion.span
                    key={activeStep}
                    className={`[grid-area:1/1] font-extrabold tabular-nums leading-none tracking-tight select-none ${
                      dark ? "text-accent-700" : "text-accent-700/30"
                    }`}
                    style={{ fontSize: "clamp(6rem, 8vw, 9rem)" }}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: dark ? 0.9 : 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {active.number}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Active chapter copy (crossfade per step) */}
            <div className="relative min-h-[44vh] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.3em] mb-4 ${
                      dark ? "text-accent-400" : "text-bronze"
                    }`}
                  >
                    {stepLabel} {active.number}
                  </p>
                  <h3
                    className={`text-3xl xl:text-4xl font-bold tracking-tight mb-5 ${
                      dark ? "text-white" : "text-brand-900"
                    }`}
                  >
                    {active.title}
                  </h3>
                  <p
                    className={`text-lg leading-relaxed mb-6 max-w-md ${
                      dark ? "text-white/65" : "text-brand-600"
                    }`}
                  >
                    {active.description}
                  </p>
                  <p
                    className={`text-sm italic pl-4 max-w-md border-l-2 ${
                      dark
                        ? "text-white/40 border-accent-700/40"
                        : "text-brand-400 border-gold-300/50"
                    }`}
                  >
                    {active.detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Step ticks */}
              <div className="mt-10 flex gap-2" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.number}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === activeStep ? "w-10" : "w-6"
                    } ${
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
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const dark = direction === "cinema";

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

  return (
    <section
      id="process"
      className={`relative py-20 md:py-24 lg:py-28 ${dark ? "bg-ink" : "bg-paper"}`}
    >
      {/* hairline frame */}
      <div
        aria-hidden
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          dark ? "via-white/10" : "via-brand-900/10"
        }`}
      />

      {/* preload all chapter photos so the deck crossfade never flashes */}
      <div aria-hidden className="hidden">
        {STEP_PHOTOS.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
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
      </div>

      {/* Desktop: pinned scroll-deck (skipped under reduced motion) */}
      {!reduced && (
        <PinnedDeck steps={steps} dark={dark} stepLabel={t.process.step} />
      )}

      {/* Mobile timeline — also the desktop fallback under reduced motion */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`${reduced ? "" : "lg:hidden"} pl-9 space-y-16 ${
            reduced ? "lg:max-w-2xl lg:mx-auto" : ""
          }`}
        >
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
