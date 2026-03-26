"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/animations";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { siteConfig } from "@/lib/siteConfig";

// Get your free access key at https://web3forms.com
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const { locale, t } = useLanguage();
  const isPt = locale === "pt";
  const { audience } = useAudience();
  const contactHeader = audience === "partner" ? t.contact.b2b : t.contact.b2c;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    const name = formData.get("name") || "Sem nome";
    const role = formData.get("role") || "";
    const tag = audience === "partner" ? "B2B" : "B2C";
    formData.append("subject", `[${tag}] Novo contacto: ${name}${role ? ` — ${role}` : ""}`);
    formData.append("from_name", "DS Crédito Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        track("contact_form_submitted", { role: String(formData.get("role") || "") });
        // Fire-and-forget Notion backup + auto-reply
        const leadData = {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          role: formData.get("role"),
          message: formData.get("message"),
          source: "B2B Contact",
        };
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        }).catch(() => {});
        fetch("/api/auto-reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            locale,
            formType: "b2b",
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
              {contactHeader.eyebrow}
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              {contactHeader.headline}
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              {contactHeader.subheading}
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
                  <a href={`mailto:${siteConfig.email}`} className="text-white/80 text-sm hover:text-white transition-colors">
                    {siteConfig.email}
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
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-white/80 text-sm hover:text-white transition-colors">{siteConfig.phone}</a>
                </div>
              </div>
            </address>

            {/* Mini map — minimal light style, click opens Google Maps */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-2xl overflow-hidden border border-white/10 h-48 lg:h-56 relative group cursor-pointer"
            >
              {/* Gradient overlay for dark theme blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/20 to-brand-900/40 group-hover:from-brand-900/30 group-hover:via-transparent group-hover:to-brand-900/10 transition-all duration-700 z-10 pointer-events-none" />
              {/* Custom pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-20 pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-accent-700 border-2 border-white shadow-lg shadow-accent-700/40 flex items-center justify-center">
                    <MapPin size={12} className="text-white" />
                  </div>
                  <div className="w-px h-2.5 bg-accent-700/60" />
                  <div className="w-2 h-1 rounded-full bg-black/20 blur-[1px]" />
                </div>
              </div>
              {/* Google Maps embed with extreme desaturation for minimal monochrome look */}
              <iframe
                title={`${siteConfig.address.addressLocality} office location`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3116.8!2d-8.8882!3d38.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1943a7a1b8c8c1%3A0x0!2sAv.+Bento+Gon%C3%A7alves+2%2C+Set%C3%BAbal!5e0!3m2!1spt-PT!2spt"
                className="w-full h-full border-0 grayscale brightness-[0.25] contrast-[1.5] group-hover:brightness-[0.45] transition-all duration-700 pointer-events-none group-hover:pointer-events-auto"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
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
                <input type="hidden" name="botcheck" className="hidden" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder={t.contact.formNamePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formEmail}
                    </label>
                    <input
                      id="contact-email"
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
                    <label htmlFor="contact-phone" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {t.contact.formPhone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder={t.contact.formPhonePlaceholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-role" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                      {audience === "partner" ? t.contact.formRole : t.contact.formGoal}
                    </label>
                    <select
                      id="contact-role"
                      name="role"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white/60 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all appearance-none"
                    >
                      {audience === "partner" ? (
                        <>
                          <option value="">{t.contact.formRoleSelect}</option>
                          <option value="agent">{t.contact.formRoleAgent}</option>
                          <option value="relocation">{t.contact.formRoleRelocation}</option>
                          <option value="developer">{t.contact.formRoleDeveloper}</option>
                          <option value="buyer">{t.contact.formRoleBuyer}</option>
                          <option value="other">{t.contact.formRoleOther}</option>
                        </>
                      ) : (
                        <>
                          <option value="">{t.contact.formGoalSelect}</option>
                          <option value="buy">{t.contact.formGoalBuy}</option>
                          <option value="transfer">{t.contact.formGoalTransfer}</option>
                          <option value="personal">{t.contact.formGoalPersonal}</option>
                          <option value="consolidate">{t.contact.formGoalConsolidate}</option>
                          <option value="simulate">{t.contact.formGoalSimulate}</option>
                          <option value="other">{t.contact.formGoalOther}</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-white/50 text-xs uppercase tracking-wider mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder={audience === "partner" ? t.contact.formMessagePlaceholder : t.contact.formMessagePlaceholderB2c}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/30 transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{t.contact.formError || "Something went wrong. Please try again or email us directly."}</span>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 accent-accent-700 shrink-0"
                  />
                  <span className="text-white/50 text-sm">
                    {t.privacy.consentLabel}{" "}
                    <a
                      href="/privacidade"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-400 hover:text-accent-300 underline underline-offset-2 transition-colors"
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
