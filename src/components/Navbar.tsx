"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import type { Locale } from "@/lib/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.contact, href: "#contact" },
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

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}" },
    { code: "pt", label: "Português", flag: "\u{1F1F5}\u{1F1F9}" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-brand-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                scrolled
                  ? "bg-accent-700 text-white"
                  : "bg-white/15 text-white border border-white/20"
              }`}
            >
              DS
            </div>
            <div className="hidden sm:block">
              <span
                className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-brand-900" : "text-white"
                }`}
              >
                DS Crédito
              </span>
              <span
                className={`block text-[10px] tracking-wider uppercase transition-colors duration-300 ${
                  scrolled ? "text-brand-500" : "text-white/60"
                }`}
              >
                Setúbal Vitória
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? "text-brand-600 hover:text-brand-900 hover:bg-brand-100"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLangMenuOpen(!langMenuOpen);
                }}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? "text-brand-600 hover:text-brand-900 hover:bg-brand-100"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe size={16} />
                <span className="uppercase text-xs font-semibold">
                  {locale}
                </span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-brand-100 overflow-hidden min-w-[160px]"
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
                            ? "bg-accent-50 text-accent-700 font-semibold"
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
              href="#contact"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                scrolled
                  ? "bg-accent-700 text-white hover:bg-accent-800 shadow-lg shadow-accent-700/20"
                  : "bg-white text-brand-900 hover:bg-white/90 shadow-lg shadow-black/10"
              }`}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile: lang + toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setLocale(locale === "en" ? "pt" : "en")}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-colors text-xs font-semibold ${
                scrolled
                  ? "text-brand-600 hover:bg-brand-100"
                  : "text-white/75 hover:bg-white/10"
              }`}
            >
              {locale === "en" ? "\u{1F1F5}\u{1F1F9} PT" : "\u{1F1EC}\u{1F1E7} EN"}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-brand-700 hover:bg-brand-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-brand-200"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-brand-700 hover:text-accent-700 hover:bg-accent-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center mt-3 px-5 py-3 text-sm font-semibold rounded-xl bg-accent-700 text-white"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
