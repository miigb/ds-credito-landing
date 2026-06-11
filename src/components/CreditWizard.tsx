"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Loader2, AlertCircle, ArrowLeft, ArrowRight, Send } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcons";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { Slider } from "@/components/ui/slider";

/*
 * CreditWizard — the conversion centerpiece, re-skinned for Amanhecer 2026.
 * Same 7 steps, qualification logic, endpoints, analytics and copy as the
 * legacy wizard — presentation only. One question per view, rising-sun arc
 * progress, golden-ticket success artifact. Branches on prototype direction:
 *   cinema    · ink canvas, dawn-radial whisper, tonal white/[0.04] surface
 *   editorial · paper canvas, white card with a soft ember halo behind it
 */

function parseNumber(s: string): number {
  return Number(s.replace(/[^\d]/g, "")) || 0;
}

function formatEuro(n: number): string {
  return n.toLocaleString("pt-PT", { maximumFractionDigits: 0 });
}

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
const TOTAL_STEPS = 7;

type Answers = {
  q1: string;
  q1Pass: boolean | null;
  q2: string;
  q2Pass: boolean | null;
  q3: string;
  q3Pass: boolean | null;
  q4: string;
  q4Pass: boolean | null;
  operationType: string;
  financingValue: string;
  propertyChoice: string;
  sellProperty: string;
  proponents: string;
  income: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schedule: string;
};

const INITIAL: Answers = {
  q1: "", q1Pass: null,
  q2: "", q2Pass: null,
  q3: "", q3Pass: null,
  q4: "", q4Pass: null,
  operationType: "",
  financingValue: "",
  propertyChoice: "escolhido",
  sellProperty: "nao",
  proponents: "1",
  income: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  schedule: "qualquer",
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const staticVariants = {
  enter: { x: 0, opacity: 1 },
  center: { x: 0, opacity: 1 },
  exit: { x: 0, opacity: 1 },
};

export default function CreditWizard() {
  const { locale, t } = useLanguage();
  const { direction } = usePrototype();
  const reduced = useReducedMotion();
  const pq = t.preQualification;
  const cf = t.creditForm;
  const isPt = locale === "pt";
  const dark = direction === "cinema";

  const [step, setStep] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Pre-fill financing value from MiniSimulator
  useEffect(() => {
    try {
      const simValue = sessionStorage.getItem("sim_property_value");
      if (simValue) {
        setAnswers((a) => ({
          ...a,
          financingValue: Number(simValue).toLocaleString("pt-PT"),
        }));
      }
    } catch {}
  }, []);

  const goNext = useCallback(() => {
    setSlideDir(1);
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  }, []);

  const goBack = useCallback(() => {
    setSlideDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const answerCard = (field: keyof Answers, value: string, pass: boolean) => {
    setAnswers((a) => ({
      ...a,
      [field]: value,
      [`${field}Pass`]: pass,
    } as Answers));
    track("wizard_answer", { step: step + 1, field, value, pass });
    goNext();
  };

  const selectOperation = (value: string) => {
    setAnswers((a) => ({ ...a, operationType: value }));
    track("wizard_answer", { step: step + 1, field: "operationType", value });
    goNext();
  };

  const update = (field: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [field]: value } as Answers));
  };

  const canContinue = (): boolean => {
    switch (step) {
      case 5:
        return true; // sliders always have a value
      case 6:
        return (
          !!answers.firstName.trim() &&
          !!answers.lastName.trim() &&
          /\S+@\S+\.\S+/.test(answers.email) &&
          !!answers.phone.trim()
        );
      default:
        return true;
    }
  };

  const isCardStep = step <= 4; // steps 0-4 auto-advance on click
  const isLastStep = step === TOTAL_STEPS - 1;

  const handleSubmit = async () => {
    setSending(true);
    setError(false);

    const qualified =
      answers.q1Pass && answers.q2Pass && answers.q3Pass && answers.q4Pass;
    const fullName = `${answers.firstName} ${answers.lastName}`.trim() || "Sem nome";
    const financingValue = parseNumber(answers.financingValue) || 200000;
    const income = parseNumber(answers.income) || 2000;
    const subjectTag = qualified ? "Qualificado" : "Revisão";
    const opLabel =
      (
        {
          aquisicao: cf.optAquisicao,
          transferencia: cf.optTransferencia,
          pessoal: cf.optPessoal,
          consolidacao: cf.optConsolidacao,
        } as Record<string, string>
      )[answers.operationType] || "";

    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", `[B2C ${subjectTag}] Pedido de crédito: ${fullName}${opLabel ? ` — ${opLabel}` : ""}`);
    fd.append("from_name", "Letraperfeiçoada — Pedido de Crédito");
    fd.append("first_name", answers.firstName);
    fd.append("last_name", answers.lastName);
    fd.append("email", answers.email);
    fd.append("phone", answers.phone);
    fd.append("operation_type", answers.operationType);
    fd.append("financing_value", String(financingValue));
    fd.append("property_choice", answers.propertyChoice);
    fd.append("sell_property", answers.sellProperty);
    fd.append("proponents", answers.proponents);
    fd.append("income", String(income));
    fd.append("preferred_schedule", answers.schedule);
    fd.append("qualified", qualified ? "sim" : "nao");
    fd.append("employment", answers.q1);
    fd.append("capital", answers.q2);
    fd.append("residency", answers.q3);
    fd.append("debt", answers.q4);
    fd.append("form_type", "credit_wizard");
    fd.append("botcheck", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        track("credit_wizard_submitted", {
          qualified: qualified ? "yes" : "no",
          operation_type: answers.operationType,
        });
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: answers.email,
            phone: answers.phone,
            source: "B2C Credit Wizard",
            operation_type: answers.operationType,
            financing_value: String(financingValue),
            property_choice: answers.propertyChoice,
            sell_property: answers.sellProperty,
            proponents: answers.proponents,
            income: String(income),
            preferred_schedule: answers.schedule,
            qualified: qualified ? "sim" : "nao",
            employment: answers.q1,
            capital: answers.q2,
            residency: answers.q3,
            debt: answers.q4,
          }),
        }).catch(() => {});
        fetch("/api/auto-reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: answers.email,
            locale,
            formType: "b2c",
          }),
        }).catch(() => {});
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pre-qualification"
      className={`relative py-28 lg:py-36 overflow-hidden ${dark ? "bg-ink" : "bg-paper"}`}
    >
      {/* ── Canvas ── */}
      {dark ? (
        <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-70" />
      ) : null}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="text-center mb-12 lg:mb-16">
          <FadeIn>
            <p
              className={`text-xs lg:text-sm font-semibold uppercase tracking-[0.3em] mb-5 ${
                dark ? "text-accent-400" : "text-bronze"
              }`}
            >
              {pq.eyebrow}
            </p>
          </FadeIn>
          <h2
            className={`text-4xl lg:text-6xl font-bold tracking-tight text-balance ${
              dark ? "text-white" : "text-brand-900"
            }`}
          >
            <RevealLine>{pq.headline}</RevealLine>
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Editorial: soft ember halo behind the white card */}
          {!dark && !submitted && (
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[105%] rounded-[4rem] bg-accent-700/10 blur-[90px]"
            />
          )}

          {submitted ? (
            <SuccessCard title={cf.successTitle} message={cf.successMessage} />
          ) : (
            <FadeIn delay={0.1}>
              <div
                className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 ${
                  dark
                    ? "bg-white/[0.04] border border-white/[0.08]"
                    : "bg-white shadow-[0_30px_90px_rgba(29,29,27,0.10)]"
                }`}
              >
                {/* Rising-sun arc progress */}
                <div className="flex justify-center mb-8 lg:mb-10">
                  <ProgressIndicator step={step + 1} totalSteps={TOTAL_STEPS} dark={dark} />
                </div>

                {/* Step stack — clip horizontal slide inside the surface */}
                <div className="relative overflow-x-clip">
                  <AnimatePresence mode="wait" custom={slideDir}>
                    <motion.div
                      key={step}
                      custom={slideDir}
                      variants={reduced ? staticVariants : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: reduced ? 0 : 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      {renderStep(step, answers, answerCard, selectOperation, update, pq, cf, dark)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer buttons */}
                <div className="mt-9 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={step === 0}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-colors disabled:opacity-0 disabled:pointer-events-none ${
                      dark
                        ? "text-white/55 hover:text-white hover:bg-white/[0.06]"
                        : "text-brand-600 hover:bg-brand-100"
                    }`}
                  >
                    <ArrowLeft size={16} />
                    {isPt ? "Voltar" : "Back"}
                  </button>

                  {!isCardStep && (
                    <button
                      type="button"
                      onClick={isLastStep ? handleSubmit : goNext}
                      disabled={!canContinue() || sending}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-700 text-white font-semibold hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-accent-600/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-accent-700/25 disabled:hover:translate-y-0"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {cf.sending}
                        </>
                      ) : isLastStep ? (
                        <>
                          <Send size={16} />
                          {cf.submit}
                        </>
                      ) : (
                        <>
                          {isPt ? "Continuar" : "Continue"}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {error && (
                  <div
                    className={`mt-4 flex items-center gap-2 text-sm rounded-xl px-4 py-3 border ${
                      dark
                        ? "text-red-400 bg-red-500/10 border-red-500/25"
                        : "text-red-600 bg-red-50 border-red-200"
                    }`}
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{cf.errorMessage}</span>
                  </div>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

// ----- Step renderer -----

/* eslint-disable @typescript-eslint/no-explicit-any */
function renderStep(
  step: number,
  a: Answers,
  answerCard: (f: keyof Answers, v: string, p: boolean) => void,
  selectOperation: (v: string) => void,
  update: (f: keyof Answers, v: string) => void,
  pq: any,
  cf: any,
  dark: boolean
) {
  const inputCls = dark
    ? "w-full border border-white/15 rounded-xl px-4 py-3.5 bg-white/[0.05] text-white placeholder-white/30 focus:border-accent-400 focus:ring-1 focus:ring-accent-400/40 outline-none text-base"
    : "w-full border border-brand-200 rounded-xl px-4 py-3.5 bg-white text-brand-900 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-base";
  const selectCls = dark
    ? "select-dark w-full border border-white/15 rounded-xl px-4 py-3.5 bg-white/[0.05] text-white [&>option]:text-brand-900 focus:border-accent-400 focus:ring-1 focus:ring-accent-400/40 outline-none appearance-none text-base"
    : "w-full border border-brand-200 rounded-xl px-4 py-3.5 bg-white text-brand-900 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none appearance-none text-base";
  const valueCls = `text-2xl sm:text-3xl font-bold tabular-nums tracking-tight ${
    dark ? "text-white" : "text-brand-900"
  }`;
  const minmaxCls = `text-xs ${dark ? "text-white/35" : "text-brand-400"}`;

  switch (step) {
    case 0:
      return (
        <CardShell icon="solidity" title={pq.q1Title} desc={pq.q1Desc} dark={dark}>
          <Choice letter="A" text={pq.q1a} onClick={() => answerCard("q1", "A", true)} selected={a.q1 === "A"} dark={dark} />
          <Choice letter="B" text={pq.q1b} onClick={() => answerCard("q1", "B", true)} selected={a.q1 === "B"} dark={dark} />
          <Choice letter="C" text={pq.q1c} onClick={() => answerCard("q1", "C", true)} selected={a.q1 === "C"} dark={dark} />
          <Choice letter="D" text={pq.q1d} onClick={() => answerCard("q1", "D", false)} selected={a.q1 === "D"} dark={dark} />
        </CardShell>
      );
    case 1:
      return (
        <CardShell icon="investment" title={pq.q2Title} desc={pq.q2Desc} dark={dark}>
          <Choice letter="A" text={pq.q2a} onClick={() => answerCard("q2", "A", true)} selected={a.q2 === "A"} dark={dark} />
          <Choice letter="B" text={pq.q2b} onClick={() => answerCard("q2", "B", true)} selected={a.q2 === "B"} dark={dark} />
          <Choice letter="C" text={pq.q2c} onClick={() => answerCard("q2", "C", false)} selected={a.q2 === "C"} dark={dark} />
        </CardShell>
      );
    case 2:
      return (
        <CardShell icon="reach" title={pq.q3Title} desc={pq.q3Desc} dark={dark}>
          <Choice letter="A" text={pq.q3a} onClick={() => answerCard("q3", "A", true)} selected={a.q3 === "A"} dark={dark} />
          <Choice letter="B" text={pq.q3b} onClick={() => answerCard("q3", "B", true)} selected={a.q3 === "B"} dark={dark} />
          <Choice letter="C" text={pq.q3c} onClick={() => answerCard("q3", "C", false)} selected={a.q3 === "C"} dark={dark} />
          <Choice letter="D" text={pq.q3d} onClick={() => answerCard("q3", "D", false)} selected={a.q3 === "D"} dark={dark} />
        </CardShell>
      );
    case 3:
      return (
        <CardShell icon="protection" title={pq.q4Title} desc={pq.q4Desc} dark={dark}>
          <Choice letter="A" text={pq.q4a} onClick={() => answerCard("q4", "A", true)} selected={a.q4 === "A"} dark={dark} />
          <Choice letter="B" text={pq.q4b} onClick={() => answerCard("q4", "B", true)} selected={a.q4 === "B"} dark={dark} />
          <Choice letter="C" text={pq.q4c} onClick={() => answerCard("q4", "C", false)} selected={a.q4 === "C"} dark={dark} />
        </CardShell>
      );
    case 4:
      return (
        <CardShell icon="credit" title={cf.group1Title} dark={dark}>
          <Choice letter="A" text={cf.optAquisicao} onClick={() => selectOperation("aquisicao")} selected={a.operationType === "aquisicao"} dark={dark} />
          <Choice letter="B" text={cf.optTransferencia} onClick={() => selectOperation("transferencia")} selected={a.operationType === "transferencia"} dark={dark} />
          <Choice letter="C" text={cf.optPessoal} onClick={() => selectOperation("pessoal")} selected={a.operationType === "pessoal"} dark={dark} />
          <Choice letter="D" text={cf.optConsolidacao} onClick={() => selectOperation("consolidacao")} selected={a.operationType === "consolidacao"} dark={dark} />
        </CardShell>
      );
    case 5:
      return (
        <CardShell icon="growth" title={cf.group2Title} dark={dark}>
          <div className="space-y-7">
            <Field label={cf.financingValue} required dark={dark}>
              <div className="flex items-baseline justify-between mb-3">
                <span className={valueCls}>
                  €{formatEuro(parseNumber(a.financingValue) || 200000)}
                </span>
                <span className={minmaxCls}>€50k – €800k</span>
              </div>
              <Slider
                min={50000}
                max={800000}
                step={10000}
                tone={dark ? "dark" : "light"}
                value={[parseNumber(a.financingValue) || 200000]}
                onValueChange={(v) => update("financingValue", String(v[0]))}
                aria-label={cf.financingValue}
              />
            </Field>

            <Field label={cf.income} hint={cf.incomeHint} required dark={dark}>
              <div className="flex items-baseline justify-between mb-3">
                <span className={valueCls}>
                  €{formatEuro(parseNumber(a.income) || 2000)}
                </span>
                <span className={minmaxCls}>€500 – €15k</span>
              </div>
              <Slider
                min={500}
                max={15000}
                step={100}
                tone={dark ? "dark" : "light"}
                value={[parseNumber(a.income) || 2000]}
                onValueChange={(v) => update("income", String(v[0]))}
                aria-label={cf.income}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.propertyChoice} dark={dark}>
                <select
                  value={a.propertyChoice}
                  onChange={(e) => update("propertyChoice", e.target.value)}
                  className={selectCls}
                >
                  <option value="escolhido">{cf.propertyChosen}</option>
                  <option value="procura">{cf.propertySearching}</option>
                </select>
              </Field>
              <Field label={cf.proponents} dark={dark}>
                <select
                  value={a.proponents}
                  onChange={(e) => update("proponents", e.target.value)}
                  className={selectCls}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </Field>
            </div>

            {a.operationType === "transferencia" && (
              <Field label={cf.sellCurrent} dark={dark}>
                <div className="flex items-center gap-6 h-[50px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sell_property"
                      value="sim"
                      checked={a.sellProperty === "sim"}
                      onChange={() => update("sellProperty", "sim")}
                      className="w-5 h-5 accent-accent-700"
                    />
                    <span className={`font-medium ${dark ? "text-white" : "text-brand-900"}`}>{cf.yes}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sell_property"
                      value="nao"
                      checked={a.sellProperty === "nao"}
                      onChange={() => update("sellProperty", "nao")}
                      className="w-5 h-5 accent-accent-700"
                    />
                    <span className={`font-medium ${dark ? "text-white" : "text-brand-900"}`}>{cf.no}</span>
                  </label>
                </div>
              </Field>
            )}
          </div>
        </CardShell>
      );
    case 6:
      return (
        <CardShell icon="support" title={cf.group3Title} dark={dark}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.firstName} required dark={dark}>
                <input
                  type="text"
                  autoCapitalize="words"
                  autoComplete="given-name"
                  placeholder={cf.firstNamePlaceholder}
                  value={a.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label={cf.lastName} required dark={dark}>
                <input
                  type="text"
                  autoCapitalize="words"
                  autoComplete="family-name"
                  placeholder={cf.lastNamePlaceholder}
                  value={a.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label={cf.email} required dark={dark}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={cf.emailPlaceholder}
                value={a.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.phone} required dark={dark}>
                <div
                  className={`flex border rounded-xl overflow-hidden ${
                    dark
                      ? "border-white/15 bg-white/[0.05] focus-within:border-accent-400 focus-within:ring-1 focus-within:ring-accent-400/40"
                      : "border-brand-200 focus-within:border-accent-700 focus-within:ring-1 focus-within:ring-accent-700/30"
                  }`}
                >
                  <span
                    className={`flex items-center gap-1.5 px-3 text-sm border-r shrink-0 ${
                      dark
                        ? "bg-white/[0.06] text-white/60 border-white/15"
                        : "bg-brand-50 text-brand-600 border-brand-200"
                    }`}
                  >
                    <span className="text-base leading-none">{"\u{1F1F5}\u{1F1F9}"}</span>
                    <span className="font-medium">+351</span>
                  </span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={cf.phonePlaceholder}
                    value={a.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={`w-full px-4 py-3.5 outline-none text-base bg-transparent ${
                      dark ? "text-white placeholder-white/30" : "text-brand-900"
                    }`}
                  />
                </div>
              </Field>
              <Field label={cf.schedule} dark={dark}>
                <select
                  value={a.schedule}
                  onChange={(e) => update("schedule", e.target.value)}
                  className={selectCls}
                >
                  <option value="qualquer">{cf.scheduleAny}</option>
                  <option value="manha">{cf.scheduleMorning}</option>
                  <option value="tarde">{cf.scheduleAfternoon}</option>
                  <option value="final">{cf.scheduleEvening}</option>
                </select>
              </Field>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input type="checkbox" required className="mt-0.5 w-5 h-5 accent-accent-700 shrink-0" />
              <span className={`text-sm ${dark ? "text-white/55" : "text-brand-500"}`}>
                {cf.disclaimer}
              </span>
            </label>
          </div>
        </CardShell>
      );
    default:
      return null;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ----- Sub-components -----

function CardShell({
  icon,
  title,
  desc,
  dark,
  children,
}: {
  icon: BrandIconName;
  title: string;
  desc?: string;
  dark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <BrandIcon name={icon} size={44} className="text-accent-700 mb-5" />
      <h3
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance ${
          desc ? "mb-3" : "mb-8"
        } ${dark ? "text-white" : "text-brand-900"}`}
      >
        {title}
      </h3>
      {desc && (
        <p className={`mb-8 leading-relaxed ${dark ? "text-white/55" : "text-brand-500"}`}>
          {desc}
        </p>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Choice({
  letter,
  text,
  onClick,
  selected,
  dark,
}: {
  letter: string;
  text: string;
  onClick: () => void;
  selected: boolean;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group w-full text-left rounded-2xl px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base font-medium transition-all duration-200 flex items-center gap-4 ${
        selected
          ? dark
            ? "bg-accent-400/10 text-white ring-2 ring-accent-400"
            : "bg-accent-50 text-brand-900 ring-2 ring-accent-400"
          : dark
            ? "bg-white/[0.04] text-white/85 ring-1 ring-white/10 hover:bg-white/[0.07] hover:ring-white/25 hover:-translate-y-0.5"
            : "bg-paper text-brand-900 ring-1 ring-brand-900/[0.06] hover:ring-accent-400/70 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(29,29,27,0.07)]"
      }`}
    >
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
          selected
            ? "bg-accent-400 text-brand-900"
            : dark
              ? "border border-white/25 text-white/50 group-hover:border-accent-400 group-hover:text-accent-400"
              : "border border-brand-300 text-brand-400 group-hover:border-accent-700 group-hover:text-bronze"
        }`}
      >
        {letter}
      </span>
      {text}
    </button>
  );
}

function Field({
  label,
  hint,
  required,
  dark,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  dark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={`block text-sm font-medium mb-1.5 ${dark ? "text-white/70" : "text-brand-600"}`}>
        {label}
        {required && (
          <span className={`ml-0.5 ${dark ? "text-accent-400" : "text-bronze"}`}>*</span>
        )}
        {hint && (
          <span className={`text-xs font-normal ml-1 ${dark ? "text-white/40" : "text-brand-400"}`}>
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ── Golden ticket — the success artifact (same copy, screenshot-worthy) ── */
function SuccessCard({ title, message }: { title: string; message: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl bg-ink border border-white/10 px-8 py-14 sm:px-14 sm:py-16 text-center"
    >
      <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/60 to-transparent"
      />
      <div className="relative">
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-4">
          {title}
        </h3>
        <p className="text-white/65 leading-relaxed max-w-md mx-auto">{message}</p>
      </div>
    </motion.div>
  );
}
