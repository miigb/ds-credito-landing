"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";

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

export default function MiniSimulator() {
  const { locale } = useLanguage();
  const { setAudience } = useAudience();
  const isPt = locale === "pt";

  const [propertyValue, setPropertyValue] = useState(200000);
  const [downPayment, setDownPayment] = useState(20);
  const [submitted, setSubmitted] = useState(false);

  const years = 30;
  const rate = 3.2; // indicative average Euribor + spread
  const monthly = calculateMonthly(propertyValue, downPayment, years, rate);
  const loanAmount = propertyValue * (1 - downPayment / 100);

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
    // Store simulator values so the credit form can pre-fill them
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

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={4}
      className="mt-8 p-5 rounded-2xl glass border border-white/10 max-w-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calculator size={16} className="text-accent-400" />
        <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
          {isPt ? "Simulação Rápida" : "Quick Estimate"}
        </span>
      </div>

      {!submitted ? (
        <div className="space-y-4">
          {/* Property Value */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-white/50">
                {isPt ? "Valor do imóvel" : "Property value"}
              </label>
              <span className="text-sm font-semibold text-white">
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
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent-500"
            />
            <div className="flex justify-between text-[10px] text-white/30 mt-0.5">
              <span>€80k</span>
              <span>€800k</span>
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-white/50">
                {isPt ? "Entrada" : "Down payment"}
              </label>
              <span className="text-sm font-semibold text-white">
                {downPayment}% (€{formatCurrency(propertyValue * downPayment / 100)})
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
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-accent-500"
            />
            <div className="flex justify-between text-[10px] text-white/30 mt-0.5">
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>

          <button
            onClick={handleSimulate}
            className="w-full py-3 text-sm font-semibold rounded-xl bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent-700/20 hover:shadow-accent-600/30 hover:-translate-y-0.5"
          >
            {isPt ? "Ver prestação estimada" : "See estimated payment"}
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="text-center py-2">
            <p className="text-xs text-white/40 mb-1">
              {isPt ? "Prestação mensal estimada" : "Estimated monthly payment"}
            </p>
            <p className="text-3xl font-bold text-white">
              ~€{formatCurrency(Math.round(monthly))}
              <span className="text-sm font-normal text-white/40">/mês</span>
            </p>
            <p className="text-[10px] text-white/30 mt-1">
              {isPt
                ? `Financiamento de €${formatCurrency(loanAmount)} · ${years} anos · Taxa indicativa ${rate}%`
                : `Loan of €${formatCurrency(loanAmount)} · ${years} years · Indicative rate ${rate}%`}
            </p>
          </div>

          <button
            onClick={handleContinue}
            className="group w-full py-3 text-sm font-semibold rounded-xl bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent-700/20 flex items-center justify-center gap-2"
          >
            {isPt ? "Continuar — verificar viabilidade" : "Continue — check eligibility"}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setSubmitted(false)}
            className="w-full py-2 text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            {isPt ? "Alterar valores" : "Change values"}
          </button>

          <p className="text-[9px] text-white/20 text-center leading-tight">
            {isPt
              ? "Valores meramente indicativos. Sujeito a análise bancária."
              : "Indicative values only. Subject to bank analysis."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
