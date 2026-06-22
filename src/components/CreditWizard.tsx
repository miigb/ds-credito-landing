"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  PiggyBank,
  MapPin,
  Wallet,
  Building2,
  Coins,
  User,
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";
import { track } from "@vercel/analytics";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { Slider } from "@/components/ui/slider";

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

export default function CreditWizard() {
  const { locale, t } = useLanguage();
  const pq = t.preQualification;
  const cf = t.creditForm;
  const isPt = locale === "pt";

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
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
    setDirection(1);
    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
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
    <section ref={sectionRef} id="pre-qualification" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-brand-50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {pq.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {pq.headline}
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <SuccessCard
              title={cf.successTitle}
              message={cf.successMessage}
            />
          ) : (
            <>
              {/* Progress dots */}
              <div className="flex justify-center mb-8">
                <ProgressIndicator
                  step={step + 1}
                  totalSteps={TOTAL_STEPS}
                />
              </div>

              {/* Card stack — no overflow here; section already clips. */}
              <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    {renderStep(step, answers, answerCard, selectOperation, update, pq, cf)}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer buttons */}
              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-brand-600 font-semibold hover:bg-brand-100 transition-colors disabled:opacity-0 disabled:pointer-events-none"
                >
                  <ArrowLeft size={16} />
                  {isPt ? "Voltar" : "Back"}
                </button>

                {!isCardStep && (
                  <button
                    type="button"
                    onClick={isLastStep ? handleSubmit : goNext}
                    disabled={!canContinue() || sending}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent-700 text-white font-semibold hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-accent-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-accent-700/25"
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
                <div className="mt-4 flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{cf.errorMessage}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ----- Step renderer -----

function renderStep(
  step: number,
  a: Answers,
  answerCard: (f: keyof Answers, v: string, p: boolean) => void,
  selectOperation: (v: string) => void,
  update: (f: keyof Answers, v: string) => void,
  pq: any,
  cf: any
) {
  switch (step) {
    case 0:
      return (
        <CardShell icon={Briefcase} title={pq.q1Title} desc={pq.q1Desc}>
          <Choice letter="A" text={pq.q1a} onClick={() => answerCard("q1", "A", true)} selected={a.q1 === "A"} />
          <Choice letter="B" text={pq.q1b} onClick={() => answerCard("q1", "B", true)} selected={a.q1 === "B"} />
          <Choice letter="C" text={pq.q1c} onClick={() => answerCard("q1", "C", true)} selected={a.q1 === "C"} />
          <Choice letter="D" text={pq.q1d} onClick={() => answerCard("q1", "D", false)} selected={a.q1 === "D"} />
        </CardShell>
      );
    case 1:
      return (
        <CardShell icon={PiggyBank} title={pq.q2Title} desc={pq.q2Desc}>
          <Choice letter="A" text={pq.q2a} onClick={() => answerCard("q2", "A", true)} selected={a.q2 === "A"} />
          <Choice letter="B" text={pq.q2b} onClick={() => answerCard("q2", "B", true)} selected={a.q2 === "B"} />
          <Choice letter="C" text={pq.q2c} onClick={() => answerCard("q2", "C", false)} selected={a.q2 === "C"} />
        </CardShell>
      );
    case 2:
      return (
        <CardShell icon={MapPin} title={pq.q3Title} desc={pq.q3Desc}>
          <Choice letter="A" text={pq.q3a} onClick={() => answerCard("q3", "A", true)} selected={a.q3 === "A"} />
          <Choice letter="B" text={pq.q3b} onClick={() => answerCard("q3", "B", true)} selected={a.q3 === "B"} />
          <Choice letter="C" text={pq.q3c} onClick={() => answerCard("q3", "C", false)} selected={a.q3 === "C"} />
          <Choice letter="D" text={pq.q3d} onClick={() => answerCard("q3", "D", false)} selected={a.q3 === "D"} />
        </CardShell>
      );
    case 3:
      return (
        <CardShell icon={Wallet} title={pq.q4Title} desc={pq.q4Desc}>
          <Choice letter="A" text={pq.q4a} onClick={() => answerCard("q4", "A", true)} selected={a.q4 === "A"} />
          <Choice letter="B" text={pq.q4b} onClick={() => answerCard("q4", "B", true)} selected={a.q4 === "B"} />
          <Choice letter="C" text={pq.q4c} onClick={() => answerCard("q4", "C", false)} selected={a.q4 === "C"} />
        </CardShell>
      );
    case 4:
      return (
        <CardShell icon={Building2} title={cf.group1Title}>
          <Choice letter="A" text={cf.optAquisicao} onClick={() => selectOperation("aquisicao")} selected={a.operationType === "aquisicao"} />
          <Choice letter="B" text={cf.optTransferencia} onClick={() => selectOperation("transferencia")} selected={a.operationType === "transferencia"} />
          <Choice letter="C" text={cf.optPessoal} onClick={() => selectOperation("pessoal")} selected={a.operationType === "pessoal"} />
          <Choice letter="D" text={cf.optConsolidacao} onClick={() => selectOperation("consolidacao")} selected={a.operationType === "consolidacao"} />
        </CardShell>
      );
    case 5:
      return (
        <CardShell icon={Coins} title={cf.group2Title}>
          <div className="space-y-7">
            <Field label={cf.financingValue} required>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-2xl font-bold text-brand-900 tabular-nums">
                  €{formatEuro(parseNumber(a.financingValue) || 200000)}
                </span>
                <span className="text-xs text-brand-400">€50k – €800k</span>
              </div>
              <Slider
                min={50000}
                max={800000}
                step={10000}
                value={[parseNumber(a.financingValue) || 200000]}
                onValueChange={(v) => update("financingValue", String(v[0]))}
                aria-label={cf.financingValue}
              />
            </Field>

            <Field label={cf.income} hint={cf.incomeHint} required>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-2xl font-bold text-brand-900 tabular-nums">
                  €{formatEuro(parseNumber(a.income) || 2000)}
                </span>
                <span className="text-xs text-brand-400">€500 – €15k</span>
              </div>
              <Slider
                min={500}
                max={15000}
                step={100}
                value={[parseNumber(a.income) || 2000]}
                onValueChange={(v) => update("income", String(v[0]))}
                aria-label={cf.income}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.propertyChoice}>
                <select
                  value={a.propertyChoice}
                  onChange={(e) => update("propertyChoice", e.target.value)}
                  className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none text-base"
                >
                  <option value="escolhido">{cf.propertyChosen}</option>
                  <option value="procura">{cf.propertySearching}</option>
                </select>
              </Field>
              <Field label={cf.proponents}>
                <select
                  value={a.proponents}
                  onChange={(e) => update("proponents", e.target.value)}
                  className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none text-base"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </Field>
            </div>

            {a.operationType === "transferencia" && (
              <Field label={cf.sellCurrent}>
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
                    <span className="text-brand-900 font-medium">{cf.yes}</span>
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
                    <span className="text-brand-900 font-medium">{cf.no}</span>
                  </label>
                </div>
              </Field>
            )}
          </div>
        </CardShell>
      );
    case 6:
      return (
        <CardShell icon={User} title={cf.group3Title}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.firstName} required>
                <input
                  type="text"
                  autoCapitalize="words"
                  autoComplete="given-name"
                  placeholder={cf.firstNamePlaceholder}
                  value={a.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900 text-base"
                />
              </Field>
              <Field label={cf.lastName} required>
                <input
                  type="text"
                  autoCapitalize="words"
                  autoComplete="family-name"
                  placeholder={cf.lastNamePlaceholder}
                  value={a.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900 text-base"
                />
              </Field>
            </div>

            <Field label={cf.email} required>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={cf.emailPlaceholder}
                value={a.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900 text-base"
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label={cf.phone} required>
                <div className="flex border border-brand-200 rounded-xl overflow-hidden focus-within:border-accent-700 focus-within:ring-1 focus-within:ring-accent-700/30">
                  <span className="flex items-center gap-1.5 bg-brand-50 px-3 text-sm text-brand-600 border-r border-brand-200 shrink-0">
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
                    className="w-full px-4 py-3.5 outline-none text-brand-900 text-base"
                  />
                </div>
              </Field>
              <Field label={cf.schedule}>
                <select
                  value={a.schedule}
                  onChange={(e) => update("schedule", e.target.value)}
                  className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none text-base"
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
              <span className="text-brand-500 text-sm">
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

// ----- Sub-components -----

function CardShell({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-brand-100 p-8 lg:p-10">
      <Icon size={40} className="text-accent-700 mb-4" />
      <h3 className="text-2xl font-bold text-brand-900 mb-3">{title}</h3>
      {desc && <p className="text-brand-500 mb-8">{desc}</p>}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Choice({
  letter,
  text,
  onClick,
  selected,
}: {
  letter: string;
  text: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left border rounded-xl px-5 py-4 text-sm font-medium transition-all duration-200 flex items-center gap-3 group ${
        selected
          ? "border-accent-700 bg-accent-50 text-brand-900"
          : "border-brand-200 text-brand-900 hover:border-accent-700 hover:bg-accent-50"
      }`}
    >
      <span
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
          selected
            ? "border-accent-700 text-accent-700 bg-accent-50"
            : "border-brand-300 text-brand-400 group-hover:border-accent-700 group-hover:text-accent-700 group-hover:bg-accent-50"
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
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-600 mb-1">
        {label}
        {required && <span className="text-accent-700 ml-0.5">*</span>}
        {hint && (
          <span className="text-xs text-brand-400 font-normal ml-1">({hint})</span>
        )}
      </label>
      {children}
    </div>
  );
}

function SuccessCard({ title, message }: { title: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl border border-brand-100 p-10 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} className="text-green-600" />
      </div>
      <h3 className="text-2xl font-bold text-brand-900 mb-3">{title}</h3>
      <p className="text-brand-500">{message}</p>
    </motion.div>
  );
}
