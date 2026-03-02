"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="relative bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-700 flex items-center justify-center font-bold text-sm text-white">
              DS
            </div>
            <div>
              <span className="text-white text-sm font-semibold">
                DS Crédito
              </span>
              <span className="text-white/40 text-xs block">
                Setúbal Vitória
              </span>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation" className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Legal */}
          <div className="text-white/25 text-xs text-center md:text-right">
            <p>{t.footer.legal1}</p>
            <p>{t.footer.legal2}</p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} {t.footer.rights}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
