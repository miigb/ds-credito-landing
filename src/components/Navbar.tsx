"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { FadeIn } from "@/components/fx/RevealText";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";
import type { Locale } from "@/lib/translations";

/*
 * Navbar — Amanhecer 2026. Transparent over the hero, floating warm-glass
 * chrome after 40px. Branches on prototype direction:
 *  cinema    · glass-warm-dark bar, white type, amber affordances
 *  editorial · glass-warm bar, ink type, ember affordances
 * Links, audience pill, language dropdown, CTA and mobile behavior are
 * identical to the legacy navbar — presentation only.
 */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const { audience, setAudience } = useAudience();
  const { direction, heroStyle } = usePrototype();
  const reduced = useReducedMotion();

  const dark = direction === "cinema";
  const tone: "dark" | "light" = dark ? "dark" : "light";
  /* Video-2 hero pairs with a liquid-glass nav pill while floating over the
     video; reverts to standard chrome once scrolled into the page. */
  const glassNav = dark && heroStyle === "video2" && !scrolled && !mobileOpen;
  /* Video-3 hero pairs with a floating glassmorphic header slab. */
  const glassBar = dark && heroStyle === "video3" && !scrolled && !mobileOpen;

  const navLinks = [
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.process, href: "/#process" },
    { label: t.nav.whyUs, href: "/#why-us" },
    { label: t.nav.team, href: "/equipa" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!langMenuOpen) return;
    const close = () => setLangMenuOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [langMenuOpen]);

  // Lock body scroll when mobile menu is open (prevents iOS rubber-banding)
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
    { code: "pt", label: "Português", flag: "\u{1F1F5}\u{1F1F9}" },
  ];

  /* ── direction-aware chrome (forced on while the mobile panel is open) ── */
  const chrome =
    scrolled || mobileOpen
      ? dark
        ? "glass-warm-dark border-b border-white/10 shadow-[0_16px_48px_-20px_rgba(0,0,0,0.55)]"
        : "glass-warm border-b border-brand-900/[0.06] shadow-[0_16px_48px_-24px_rgba(29,29,27,0.18)]"
      : "bg-transparent border-b border-transparent";

  const linkTone = dark
    ? "text-white/60 hover:text-white"
    : "text-brand-500 hover:text-brand-900";
  const hoverDot = dark ? "bg-accent-400" : "bg-accent-700";

  const pillShell = dark ? "bg-white/10" : "bg-brand-900/[0.06]";
  const pillIdle = dark
    ? "text-white/60 hover:text-white/85"
    : "text-brand-500 hover:text-brand-700";
  const pillActive = "bg-accent-700 text-white font-semibold shadow-sm";

  return (
    <motion.header
      initial={reduced ? false : { y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${chrome}`}
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${glassBar ? "pt-3" : ""}`}>
        <nav
          aria-label="Main navigation"
          className={`flex items-center justify-between transition-all duration-500 ${
            glassBar
              ? "h-16 px-4 lg:px-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl ring-1 ring-white/15 shadow-lg shadow-black/10"
              : "h-18 lg:h-20"
          }`}
        >
          {/* Logo */}
          <a href="/" className="flex items-center group" translate="no">
            <Logo tone={tone} height={36} />
          </a>

          {/* Desktop nav */}
          {glassNav ? (
            <div className="hidden lg:flex items-center gap-1 liquid-glass rounded-xl px-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative group px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${linkTone}`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-[3px] rounded-full opacity-0 scale-50 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 ${hoverDot}`}
                  />
                </a>
              ))}
            </div>
          )}

          {/* Right side: Audience toggle + Lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Audience toggle (PT only) */}
            {locale === "pt" && (
              <div
                className={`flex items-center rounded-full p-0.5 text-xs ${
                  glassNav ? "liquid-glass" : pillShell
                }`}
                translate="no"
              >
                <button
                  onClick={() => setAudience("client")}
                  translate="no"
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                    audience === "client"
                      ? glassNav
                        ? "bg-white/15 text-white font-semibold"
                        : pillActive
                      : glassNav
                        ? "text-white/70 hover:text-white"
                        : pillIdle
                  }`}
                >
                  {t.audienceToggle.client}
                </button>
                <button
                  onClick={() => setAudience("partner")}
                  translate="no"
                  className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
                    audience === "partner"
                      ? glassNav
                        ? "bg-white/15 text-white font-semibold"
                        : pillActive
                      : glassNav
                        ? "text-white/70 hover:text-white"
                        : pillIdle
                  }`}
                >
                  {t.audienceToggle.partner}
                </button>
              </div>
            )}

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen(!langMenuOpen);
                }}
                aria-label="Change language"
                aria-expanded={langMenuOpen}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  glassNav
                    ? "liquid-glass text-white/80 hover:text-white"
                    : dark
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-brand-500 hover:text-brand-900 hover:bg-brand-900/[0.05]"
                }`}
              >
                <Globe size={16} />
                <span className="uppercase text-xs font-semibold">{locale}</span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: reduced ? 0 : 0.15 }}
                    className={`absolute right-0 top-full mt-3 rounded-2xl overflow-hidden min-w-[170px] ${
                      dark
                        ? "bg-ink ring-1 ring-white/10 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)]"
                        : "bg-white ring-1 ring-brand-900/[0.06] shadow-[0_24px_60px_-20px_rgba(29,29,27,0.22)]"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLocale(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          locale === lang.code
                            ? dark
                              ? "bg-white/[0.06] text-accent-400 font-semibold"
                              : "bg-accent-50 text-accent-700 font-semibold"
                            : dark
                              ? "text-white/70 hover:bg-white/[0.05]"
                              : "text-brand-600 hover:bg-brand-50"
                        }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <a
              href="/#contact"
              className={`inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                glassNav
                  ? "bg-white text-ink hover:bg-white/90"
                  : "bg-accent-700 text-white hover:bg-accent-600 shadow-lg shadow-accent-700/25 hover:-translate-y-0.5"
              }`}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile: lang + toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLocale(locale === "en" ? "pt" : "en")}
              aria-label={locale === "en" ? "Mudar para Português" : "Switch to English"}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-full transition-colors text-xs font-semibold ${
                dark ? "text-white/75 hover:bg-white/10" : "text-brand-600 hover:bg-brand-900/[0.05]"
              }`}
            >
              {locale === "en" ? "\u{1F1F5}\u{1F1F9} PT" : "\u{1F1EC}\u{1F1E7} EN"}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`min-w-11 min-h-11 flex items-center justify-center rounded-full transition-colors ${
                dark ? "text-white hover:bg-white/10" : "text-brand-900 hover:bg-brand-900/[0.05]"
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu — full-surface panel beneath the nav row */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className={`lg:hidden absolute top-full inset-x-0 h-[calc(100dvh-4.5rem)] overflow-y-auto ${
              dark ? "bg-ink" : "bg-paper"
            }`}
          >
            <div
              aria-hidden
              className={`absolute inset-0 pointer-events-none ${
                dark ? "bg-dawn-radial-dark" : "bg-dawn-radial"
              }`}
            />
            <div className="relative flex flex-col min-h-full px-6 pt-8 pb-10">
              {/* Audience toggle (PT only) */}
              {locale === "pt" && (
                <FadeIn onMount delay={0.05}>
                  <div
                    className={`inline-flex items-center self-start rounded-full p-0.5 text-xs mb-8 ${pillShell}`}
                    translate="no"
                  >
                    <button
                      onClick={() => setAudience("client")}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        audience === "client" ? pillActive : pillIdle
                      }`}
                    >
                      {t.audienceToggle.client}
                    </button>
                    <button
                      onClick={() => setAudience("partner")}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        audience === "partner" ? pillActive : pillIdle
                      }`}
                    >
                      {t.audienceToggle.partner}
                    </button>
                  </div>
                </FadeIn>
              )}

              {navLinks.map((link, i) => (
                <FadeIn key={link.href} onMount delay={0.1 + i * 0.06}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-baseline gap-4 py-3 transition-colors ${
                      dark ? "text-white hover:text-accent-400" : "text-brand-900 hover:text-accent-700"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`text-[10px] font-semibold tracking-[0.3em] tabular-nums ${
                        dark ? "text-accent-400/70" : "text-bronze"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span className="text-3xl font-bold tracking-tight">{link.label}</span>
                  </a>
                </FadeIn>
              ))}

              <FadeIn onMount delay={0.1 + navLinks.length * 0.06} className="mt-auto pt-10">
                <a
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full px-6 py-4 text-base font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-colors shadow-lg shadow-accent-700/25"
                >
                  {t.nav.cta}
                </a>
              </FadeIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
