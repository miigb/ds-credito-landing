"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function CreditForm({ visible }: { visible: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [sellProperty, setSellProperty] = useState("nao");
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const cf = t.creditForm;

  // Scroll into view when made visible (after DOM paint)
  useEffect(() => {
    if (visible && sectionRef.current) {
      track("credit_form_opened");
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "Novo pedido de crédito — meuintermediario.com");
    formData.append("from_name", "DS Crédito — Pedido de Crédito");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        track("credit_form_submitted", { operation_type: String(formData.get("operation_type") || "") });
        // Fire-and-forget Notion backup
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${formData.get("first_name")} ${formData.get("last_name")}`,
            email: formData.get("email"),
            phone: formData.get("phone"),
            source: "B2C Credit Request",
            operation_type: formData.get("operation_type"),
            help_type: formData.get("help_type"),
            financing_value: formData.get("financing_value"),
            property_choice: formData.get("property_choice"),
            sell_property: formData.get("sell_property"),
            proponents: formData.get("proponents"),
            income: formData.get("income"),
            preferred_schedule: formData.get("preferred_schedule"),
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
      id="credit-form"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/30 to-white" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-700 text-sm font-semibold tracking-widest uppercase mb-4">
            {cf.eyebrow}
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-brand-900 tracking-tight mb-5">
            {cf.headline}
          </h2>
          <p className="text-lg text-brand-500 max-w-2xl mx-auto">
            {cf.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl border border-brand-100 p-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-900 mb-3">
                {cf.successTitle}
              </h3>
              <p className="text-brand-500">{cf.successMessage}</p>
            </motion.div>
          ) : (
            <div className="relative bg-white rounded-2xl shadow-xl border border-brand-100 p-6 md:p-10">
              {/* Free badge */}
              <div className="absolute -top-4 right-4 md:right-8 bg-accent-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                <span className="text-xl font-extrabold leading-none">
                  {cf.freeBadge}
                </span>
                <span className="leading-tight text-xs uppercase tracking-wide whitespace-pre-line">
                  {cf.freeBadgeLabel}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 pt-4">
                <input type="hidden" name="botcheck" className="hidden" />
                <input type="hidden" name="form_type" value="credit_request" />

                {/* Group 1 — Operation Type */}
                <div>
                  <h3 className="text-lg font-bold text-brand-900 text-center mb-6">
                    {cf.group1Title}
                  </h3>
                  <div>
                    <label
                      htmlFor="cf-operation"
                      className="block text-sm font-medium text-brand-600 mb-1"
                    >
                      {cf.operationType}
                    </label>
                    <select
                      id="cf-operation"
                      name="operation_type"
                      required
                      className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none"
                    >
                      <option value="">{cf.operationPlaceholder}</option>
                      <option value="aquisicao">{cf.optAquisicao}</option>
                      <option value="transferencia">{cf.optTransferencia}</option>
                      <option value="pessoal">{cf.optPessoal}</option>
                      <option value="consolidacao">{cf.optConsolidacao}</option>
                    </select>
                  </div>
                </div>

                <hr className="border-brand-100" />

                {/* Group 2 — Case Info */}
                <div>
                  <h3 className="text-lg font-bold text-brand-900 text-center mb-6">
                    {cf.group2Title}
                  </h3>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cf-help"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.helpLabel}
                        </label>
                        <select
                          id="cf-help"
                          name="help_type"
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none"
                        >
                          <option value="">{cf.helpPlaceholder}</option>
                          <option value="simular">{cf.optSimular}</option>
                          <option value="imovel-escolhido">
                            {cf.optImovelEscolhido}
                          </option>
                          <option value="transferir">{cf.optTransferir}</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="cf-financing"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.financingValue}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cf-financing"
                            name="financing_value"
                            placeholder={cf.financingPlaceholder}
                            className="w-full border border-brand-200 rounded-xl px-4 py-3.5 pr-10 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 font-medium">
                            &euro;
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cf-property"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.propertyChoice}
                        </label>
                        <select
                          id="cf-property"
                          name="property_choice"
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none"
                        >
                          <option value="escolhido">{cf.propertyChosen}</option>
                          <option value="procura">{cf.propertySearching}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-600 mb-1">
                          {cf.sellCurrent}
                        </label>
                        <div className="flex items-center gap-6 h-[50px]">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sell_property"
                              value="sim"
                              checked={sellProperty === "sim"}
                              onChange={() => setSellProperty("sim")}
                              className="w-5 h-5 accent-accent-700"
                            />
                            <span className="text-brand-900 font-medium">
                              {cf.yes}
                            </span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="sell_property"
                              value="nao"
                              checked={sellProperty === "nao"}
                              onChange={() => setSellProperty("nao")}
                              className="w-5 h-5 accent-accent-700"
                            />
                            <span className="text-brand-900 font-medium">
                              {cf.no}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cf-proponents"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.proponents}
                        </label>
                        <select
                          id="cf-proponents"
                          name="proponents"
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="cf-income"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.income}{" "}
                          <span className="text-xs text-brand-400 font-normal">
                            ({cf.incomeHint})
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cf-income"
                            name="income"
                            placeholder={cf.incomePlaceholder}
                            className="w-full border border-brand-200 rounded-xl px-4 py-3.5 pr-10 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 font-medium">
                            &euro;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-brand-100" />

                {/* Group 3 — Contact Details */}
                <div>
                  <h3 className="text-lg font-bold text-brand-900 text-center mb-6">
                    {cf.group3Title}
                  </h3>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cf-firstname"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.firstName}
                        </label>
                        <input
                          type="text"
                          id="cf-firstname"
                          name="first_name"
                          required
                          placeholder={cf.firstNamePlaceholder}
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cf-lastname"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.lastName}
                        </label>
                        <input
                          type="text"
                          id="cf-lastname"
                          name="last_name"
                          required
                          placeholder={cf.lastNamePlaceholder}
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cf-email"
                        className="block text-sm font-medium text-brand-600 mb-1"
                      >
                        {cf.email}
                      </label>
                      <input
                        type="email"
                        id="cf-email"
                        name="email"
                        required
                        placeholder={cf.emailPlaceholder}
                        className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none text-brand-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cf-phone"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.phone}
                        </label>
                        <div className="flex border border-brand-200 rounded-xl overflow-hidden focus-within:border-accent-700 focus-within:ring-1 focus-within:ring-accent-700/30">
                          <span className="flex items-center gap-1.5 bg-brand-50 px-3 text-sm text-brand-600 border-r border-brand-200 shrink-0">
                            <span className="text-base leading-none">
                              {"\u{1F1F5}\u{1F1F9}"}
                            </span>
                            <span className="font-medium">+351</span>
                          </span>
                          <input
                            type="tel"
                            id="cf-phone"
                            name="phone"
                            placeholder={cf.phonePlaceholder}
                            className="w-full px-4 py-3.5 outline-none text-brand-900"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="cf-schedule"
                          className="block text-sm font-medium text-brand-600 mb-1"
                        >
                          {cf.schedule}
                        </label>
                        <select
                          id="cf-schedule"
                          name="preferred_schedule"
                          className="w-full border border-brand-200 rounded-xl px-4 py-3.5 focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30 outline-none bg-white text-brand-900 appearance-none"
                        >
                          <option value="qualquer">{cf.scheduleAny}</option>
                          <option value="manha">{cf.scheduleMorning}</option>
                          <option value="tarde">{cf.scheduleAfternoon}</option>
                          <option value="final">{cf.scheduleEvening}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{cf.errorMessage}</span>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 accent-accent-700 shrink-0"
                  />
                  <span className="text-brand-500 text-sm">
                    {t.privacy.consentLabel}{" "}
                    <a
                      href="/privacidade"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-700 hover:text-accent-600 underline underline-offset-2 transition-colors"
                    >
                      {t.privacy.consentLink}
                    </a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent-700 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-accent-600/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {sending ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {sending ? cf.sending : cf.submit}
                </button>

                <p className="text-brand-400 text-xs text-center">
                  {cf.disclaimer}
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
