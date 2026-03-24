"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  PiggyBank,
  MapPin,
  Wallet,
  CheckCircle,
  AlertTriangle,
  RotateCcw,

} from "lucide-react";
import { track } from "@vercel/analytics";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { siteConfig } from "@/lib/siteConfig";

interface Question {
  id: string;
  icon: typeof Briefcase;
  titleKey: string;
  descKey: string;
  options: { key: string; pass: boolean; letter: string }[];
}

export default function PreQualification({
  onQualified,
}: {
  onQualified: () => void;
}) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<"pass" | "fail" | null>(null);
  const [direction, setDirection] = useState(1);
  const { t } = useLanguage();

  const questions: Question[] = [
    {
      id: "employment",
      icon: Briefcase,
      titleKey: "q1Title",
      descKey: "q1Desc",
      options: [
        { key: "q1a", pass: true, letter: "A" },
        { key: "q1b", pass: true, letter: "B" },
        { key: "q1c", pass: true, letter: "C" },
        { key: "q1d", pass: false, letter: "D" },
      ],
    },
    {
      id: "capital",
      icon: PiggyBank,
      titleKey: "q2Title",
      descKey: "q2Desc",
      options: [
        { key: "q2a", pass: true, letter: "A" },
        { key: "q2b", pass: true, letter: "B" },
        { key: "q2c", pass: false, letter: "C" },
      ],
    },
    {
      id: "residency",
      icon: MapPin,
      titleKey: "q3Title",
      descKey: "q3Desc",
      options: [
        { key: "q3a", pass: true, letter: "A" },
        { key: "q3b", pass: true, letter: "B" },
        { key: "q3c", pass: false, letter: "C" },
        { key: "q3d", pass: false, letter: "D" },
      ],
    },
    {
      id: "debt",
      icon: Wallet,
      titleKey: "q4Title",
      descKey: "q4Desc",
      options: [
        { key: "q4a", pass: true, letter: "A" },
        { key: "q4b", pass: true, letter: "B" },
        { key: "q4c", pass: false, letter: "C" },
      ],
    },
  ];

  const total = questions.length;
  const progress = result
    ? 100
    : Math.round(((step + 1) / total) * 100);

  const handleAnswer = useCallback(
    (pass: boolean, letter: string) => {
      track("quiz_answer", { question: step + 1, answer: letter, pass });
      if (!pass) {
        setDirection(1);
        setResult("fail");
        track("quiz_completed", { result: "fail", failed_at: step + 1 });
        return;
      }
      if (step < total - 1) {
        setDirection(1);
        setStep((s) => s + 1);
      } else {
        setResult("pass");
        track("quiz_completed", { result: "pass" });
      }
    },
    [step, total]
  );

  const handleReset = useCallback(() => {
    setDirection(-1);
    setResult(null);
    setStep(0);
  }, []);

  const pq = t.preQualification;
  const currentQ = questions[step];
  const Icon = currentQ.icon;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section id="pre-qualification" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-brand-50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {pq.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {pq.headline}
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-brand-500 mb-2">
              <span>
                {result
                  ? pq.eyebrow
                  : pq.questionOf
                      .replace("{current}", String(step + 1))
                      .replace("{total}", String(total))}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-brand-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent-700"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            {step > 0 && !result && (
              <button
                onClick={handleReset}
                className="mt-2 text-xs text-brand-500 hover:text-accent-700 transition-colors flex items-center gap-1"
              >
                <RotateCcw size={12} />
                {pq.reset}
              </button>
            )}
          </div>

          {/* Cards */}
          <div className="relative min-h-[380px]">
            <AnimatePresence mode="wait" custom={direction}>
              {result === null && (
                <motion.div
                  key={currentQ.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  className="bg-white rounded-2xl shadow-lg border border-brand-100 p-8 lg:p-10"
                >
                  <Icon
                    size={40}
                    className="text-accent-700 mb-4"
                  />
                  <h3 className="text-2xl font-bold text-brand-900 mb-3">
                    {pq[currentQ.titleKey as keyof typeof pq] as string}
                  </h3>
                  <p className="text-brand-500 mb-8">
                    {pq[currentQ.descKey as keyof typeof pq] as string}
                  </p>
                  <div className="space-y-3">
                    {currentQ.options.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => handleAnswer(opt.pass, opt.letter)}
                        className="w-full text-left border border-brand-200 rounded-xl px-5 py-4 text-sm font-medium text-brand-900 hover:border-accent-700 hover:bg-accent-50 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <span className="w-7 h-7 rounded-full border-2 border-brand-300 flex items-center justify-center text-xs font-bold text-brand-400 group-hover:border-accent-700 group-hover:text-accent-700 group-hover:bg-accent-50 transition-colors">
                          {opt.letter}
                        </span>
                        {pq[opt.key as keyof typeof pq] as string}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {result === "pass" && (
                <motion.div
                  key="pass"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg border border-brand-100 p-8 lg:p-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-3">
                    {pq.passTitle}
                  </h3>
                  <p className="text-brand-500 mb-8 max-w-md mx-auto">
                    {pq.passDesc}
                  </p>
                  <button
                    onClick={onQualified}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-700 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25"
                  >
                    {pq.passCta}
                  </button>
                  <button
                    onClick={handleReset}
                    className="block mx-auto mt-4 text-accent-700 text-sm font-medium hover:underline"
                  >
                    {pq.passRestart}
                  </button>
                </motion.div>
              )}

              {result === "fail" && (
                <motion.div
                  key="fail"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg border border-brand-100 p-8 lg:p-10 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} className="text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-3">
                    {pq.failTitle}
                  </h3>
                  <p className="text-brand-500 mb-4 max-w-md mx-auto">
                    {pq.failDesc}
                  </p>
                  <p className="text-sm text-brand-500 mb-8 max-w-md mx-auto">
                    {pq.failDetail}
                  </p>
                  <button
                    onClick={onQualified}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-700 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25"
                  >
                    {pq.failCta}
                  </button>
                  <button
                    onClick={handleReset}
                    className="block mx-auto mt-4 text-accent-700 text-sm font-medium hover:underline"
                  >
                    {pq.failRestart}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
