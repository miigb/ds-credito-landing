"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2 } from "lucide-react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formsubmit.co/ajax/ibrantinabrito@dsicredito.pt", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently handle — form will remain visible for retry
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-brand-900" />
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-700/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/6 blur-[80px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-accent-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {t.contact.eyebrow}
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              {t.contact.headline}
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              {t.contact.subheading}
            </p>

            <address className="space-y-6 not-italic">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={18} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                    {t.contact.location}
                  </p>
                  <p className="text-white/80 text-sm">
                    {t.contact.locationValue}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail size={18} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                    {t.contact.email}
                  </p>
                  <a href="mailto:ibrantinabrito@dsicredito.pt" className="text-white/80 text-sm hover:text-white transition-colors">
                    ibrantinabrito@dsicredito.pt
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Phone size={18} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                    {t.contact.phone}
                  </p>
                  <a href="tel:+351265117174" className="text-white/80 text-sm hover:text-white transition-colors">+351 265 117 174</a>
                </div>
              </div>
            </address>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent-700/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-accent-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {t.contact.successTitle}
                </h3>
                <p className="text-white/50">
                  {t.contact.successMessage}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 space-y-5"
              >
                {/* Formsubmit.co config */}
                <input type="hidden" name="_subject" value="New contact from DS Crédito website" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t.contact.formNamePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.contact.formEmailPlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formPhone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.contact.formPhonePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formRole}
                    </label>
                    <select
                      name="role"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/60 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all appearance-none"
                    >
                      <option value="">{t.contact.formRoleSelect}</option>
                      <option value="agent">{t.contact.formRoleAgent}</option>
                      <option value="relocation">{t.contact.formRoleRelocation}</option>
                      <option value="developer">{t.contact.formRoleDeveloper}</option>
                      <option value="buyer">{t.contact.formRoleBuyer}</option>
                      <option value="other">{t.contact.formRoleOther}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.contact.formMessagePlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all resize-none"
                  />
                </div>

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
                  {sending ? (t.contact.formSending || "Sending...") : t.contact.formSubmit}
                </button>

                <p className="text-white/25 text-xs text-center">
                  {t.contact.formDisclaimer}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
