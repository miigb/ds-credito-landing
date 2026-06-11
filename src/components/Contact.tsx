"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Send, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import { RevealLine, FadeIn } from "@/components/fx/RevealText";
import { BrandIcon } from "@/components/brand/BrandIcons";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { siteConfig } from "@/lib/siteConfig";

// Get your free access key at https://web3forms.com
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

/*
 * Contact — the night-before-dawn chapter. Ink canvas in both directions:
 * oversized editorial type + big-type contact list left, form on a tonal
 * surface right. All form behavior (Web3Forms POST, /api/lead, /api/auto-reply,
 * tracking, consent) is identical to the legacy component — presentation only.
 * The Google Maps iframe is replaced by a static address link (CSP stays slim).
 */

const fieldCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/25 text-base focus:outline-none focus:border-accent-700/50 focus:ring-1 focus:ring-accent-700/30 transition-all";

const labelCls =
  "block text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45 mb-2";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40]);
  const { locale, t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const contactHeader = audience === "partner" ? t.contact.b2b : t.contact.b2c;

  const mapsHref = `https://maps.google.com/?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`;

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
    <section
      id="contact"
      ref={ref}
      className={`relative py-20 md:py-24 lg:py-28 overflow-hidden bg-ink ${
        direction === "editorial" ? "border-t border-gold-300/20" : ""
      }`}
    >
      {/* ── Ambient backdrop — quiet ember glow before the footer sunrise ── */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0">
        {direction === "cinema" ? (
          <>
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-1/3 left-[15%] w-[480px] h-[480px] rounded-full bg-accent-700/[0.07] blur-[110px]" />
            <div className="absolute bottom-[12%] right-[18%] w-[380px] h-[380px] rounded-full bg-accent-400/[0.05] blur-[90px]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-dawn-radial-dark opacity-60" />
        )}
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ── Left: oversized type + editorial contact list ── */}
          <div>
            <FadeIn>
              <div className="inline-flex items-center gap-2.5 mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-400">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent-400"
                  style={{ boxShadow: "0 0 14px var(--color-accent-400)" }}
                />
                {contactHeader.eyebrow}
              </div>
            </FadeIn>

            <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-7 text-balance">
              <RevealLine>{contactHeader.headline}</RevealLine>
            </h2>

            <FadeIn delay={0.2}>
              <p className="text-white/55 text-lg leading-relaxed mb-14 max-w-lg">
                {contactHeader.subheading}
              </p>
            </FadeIn>

            {/* Static address block — editorial type list, links out to Google Maps */}
            <FadeIn delay={0.3}>
              <address className="not-italic">
                <div className="border-t border-white/10">
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-6 border-b border-white/10"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-2">
                      {t.contact.location}
                    </p>
                    <p className="flex items-baseline gap-2.5 text-xl lg:text-2xl font-semibold tracking-tight text-white/85 transition-all duration-300 group-hover:text-accent-400 group-hover:[text-shadow:0_0_28px_rgba(255,177,0,0.35)]">
                      {t.contact.locationValue}
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 self-center text-white/30 transition-all duration-300 group-hover:text-accent-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </p>
                  </a>

                  <div className="py-6 border-b border-white/10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-2">
                      {t.contact.email}
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-xl lg:text-2xl font-semibold tracking-tight text-white/85 break-all transition-all duration-300 hover:text-accent-400 hover:[text-shadow:0_0_28px_rgba(255,177,0,0.35)]"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div className="py-6 border-b border-white/10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mb-2">
                      {t.contact.phone}
                    </p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="text-xl lg:text-2xl font-semibold tracking-tight tabular-nums text-white/85 transition-all duration-300 hover:text-accent-400 hover:[text-shadow:0_0_28px_rgba(255,177,0,0.35)]"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </address>
            </FadeIn>
          </div>

          {/* ── Right: form on tonal surface ── */}
          <motion.div
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduced ? 0 : 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative overflow-hidden bg-white/[0.05] border border-white/10 rounded-3xl p-10 text-center"
              >
                <div aria-hidden className="absolute inset-0 bg-dawn-radial-dark opacity-50" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-accent-700/15 flex items-center justify-center mx-auto mb-6">
                    <BrandIcon name="dawn" size={34} className="text-accent-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-white/55">{t.contact.successMessage}</p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 lg:p-10 space-y-5"
              >
                <input type="hidden" name="botcheck" className="hidden" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelCls}>
                      {t.contact.formName}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoCapitalize="words"
                      autoComplete="name"
                      enterKeyHint="next"
                      placeholder={t.contact.formNamePlaceholder}
                      className={fieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelCls}>
                      {t.contact.formEmail}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      enterKeyHint="next"
                      placeholder={t.contact.formEmailPlaceholder}
                      className={fieldCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className={labelCls}>
                      {t.contact.formPhone}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      placeholder={t.contact.formPhonePlaceholder}
                      className={fieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-role" className={labelCls}>
                      {audience === "partner" ? t.contact.formRole : t.contact.formGoal}
                    </label>
                    <select
                      id="contact-role"
                      name="role"
                      className={`select-dark ${fieldCls} text-white/60`}
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
                  <label htmlFor="contact-message" className={labelCls}>
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    enterKeyHint="send"
                    placeholder={
                      audience === "partner"
                        ? t.contact.formMessagePlaceholder
                        : t.contact.formMessagePlaceholderB2c
                    }
                    className={`${fieldCls} resize-none`}
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>
                      {t.contact.formError ||
                        "Something went wrong. Please try again or email us directly."}
                    </span>
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
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent-700 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-accent-600/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
