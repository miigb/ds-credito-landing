"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock } from "lucide-react";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { MonolineSun } from "@/components/brand/Logo";

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-PT", { maximumFractionDigits: 0 });
}

function calculateMonthly(
  propertyValue: number,
  downPaymentPct: number,
  years: number,
  annualRate: number
): number {
  const loanAmount = propertyValue * (1 - downPaymentPct / 100);
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;
  if (monthlyRate === 0) return loanAmount / totalPayments;
  return (
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

/*
 * Quick-estimate instrument in the hero (B2C). Same math, copy, tracking and
 * sessionStorage handoff as the legacy component — re-skinned per direction.
 */
export default function MiniSimulator() {
  const { locale } = useLanguage();
  const { setAudience } = useAudience();
  const { direction } = usePrototype();
  const isPt = locale === "pt";
  const dark = direction === "cinema";

  const [propertyValue, setPropertyValue] = useState(200000);
  const [downPayment, setDownPayment] = useState(20);
  const [submitted, setSubmitted] = useState(false);

  const years = 30;
  const rate = 3.2; // indicative average Euribor + spread (kept for analytics)
  const monthly = calculateMonthly(propertyValue, downPayment, years, rate);

  const handleSimulate = () => {
    setSubmitted(true);
    track("mini_simulator_used", {
      propertyValue,
      downPayment,
      monthly: Math.round(monthly),
    });
  };

  const handleContinue = () => {
    track("mini_simulator_continue", {
      propertyValue,
      downPayment,
      monthly: Math.round(monthly),
    });
    try {
      sessionStorage.setItem("sim_property_value", String(propertyValue));
      sessionStorage.setItem("sim_down_payment", String(downPayment));
      sessionStorage.setItem("sim_monthly", String(Math.round(monthly)));
    } catch {}
    setAudience("client");
    setTimeout(() => {
      document.getElementById("pre-qualification")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const card = dark
    ? "bg-white/[0.05] backdrop-blur-sm shadow-2xl shadow-black/20"
    : "bg-white shadow-[0_12px_50px_rgba(29,29,27,0.08)]";
  const label = dark ? "text-white/50" : "text-brand-500";
  const value = dark ? "text-white" : "text-brand-900";
  const minmax = dark ? "text-white/30" : "text-brand-300";
  const trackBg = dark ? "bg-white/10" : "bg-brand-100";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={`mt-8 lg:mt-0 p-6 lg:p-7 rounded-3xl ${card}`}
    >
      <div className="flex items-center justify-between mb-5">
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${
            dark ? "text-accent-400" : "text-bronze"
          }`}
        >
          {isPt ? "Simulação Rápida" : "Quick Estimate"}
        </span>
        <MonolineSun size={22} strokeWidth={2.2} className="text-accent-700" />
      </div>

      {!submitted ? (
        <div className="space-y-5">
          {/* Property Value */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className={`text-xs ${label}`}>
                {isPt ? "Valor do imóvel" : "Property value"}
              </label>
              <span className={`text-base font-bold tabular-nums tracking-tight ${value}`}>
                €{formatCurrency(propertyValue)}
              </span>
            </div>
            <input
              type="range"
              min={80000}
              max={800000}
              step={10000}
              value={propertyValue}
              onInput={(e) => setPropertyValue(Number((e.target as HTMLInputElement).value))}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              style={{ touchAction: "pan-y" }}
              className={`w-full h-1 rounded-full appearance-none cursor-pointer ${trackBg}`}
            />
            <div className={`flex justify-between text-[10px] mt-1 ${minmax}`}>
              <span>€80k</span>
              <span>€800k</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className={`text-xs ${label}`}>
                {isPt ? "Entrada" : "Down payment"}
              </label>
              <span className={`text-base font-bold tabular-nums tracking-tight ${value}`}>
                {downPayment}%{" "}
                <span className={`font-medium text-xs ${label}`}>
                  (€{formatCurrency((propertyValue * downPayment) / 100)})
                </span>
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPayment}
              onInput={(e) => setDownPayment(Number((e.target as HTMLInputElement).value))}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              style={{ touchAction: "pan-y" }}
              className={`w-full h-1 rounded-full appearance-none cursor-pointer ${trackBg}`}
            />
            <div className={`flex justify-between text-[10px] mt-1 ${minmax}`}>
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>

          <button
            onClick={handleSimulate}
            className="w-full py-3.5 text-sm font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent-700/25 hover:shadow-accent-600/35 hover:-translate-y-0.5"
          >
            {isPt ? "Ver prestação estimada" : "See estimated payment"}
          </button>
        </div>
      ) : (
        /* ── Dawn ticket — result state ── */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div
            className={`relative rounded-2xl px-5 py-6 text-center overflow-hidden ${
              dark ? "bg-ink/60" : "bg-paper"
            }`}
          >
            <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-70" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-semibold uppercase tracking-wider mb-3">
                <Check size={11} strokeWidth={3} />
                {isPt ? "Perfil viável" : "Viable profile"}
              </div>
              <p className={`text-lg font-bold leading-snug tracking-tight ${value}`}>
                {isPt ? "Várias soluções disponíveis" : "Several solutions available"}
              </p>
              <div
                className={`mt-3 inline-flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-full ${
                  dark ? "text-white/60 bg-white/[0.05]" : "text-brand-500 bg-white"
                }`}
              >
                <Lock size={11} className="opacity-60" />
                {isPt
                  ? "Simulação exata — disponível após contacto"
                  : "Exact simulation — available after contact"}
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="group w-full py-3.5 text-sm font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent-700/25 flex items-center justify-center gap-2"
          >
            {isPt ? "Continuar — falar connosco" : "Continue — talk to us"}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setSubmitted(false)}
            className={`w-full py-1.5 text-xs transition-colors ${
              dark ? "text-white/40 hover:text-white/60" : "text-brand-400 hover:text-brand-500"
            }`}
          >
            {isPt ? "Alterar valores" : "Change values"}
          </button>

          <p className={`text-[9px] text-center leading-tight ${dark ? "text-white/25" : "text-brand-300"}`}>
            {isPt
              ? "Valores meramente indicativos. Sujeito a análise bancária."
              : "Indicative values only. Subject to bank analysis."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
