"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";
import { usePrototype } from "@/lib/PrototypeContext";

/*
 * StickyBar — Amanhecer 2026. Same trigger (0.85 × viewport) and audience-
 * switched copy/CTA as the legacy bar; re-skinned per direction:
 *  cinema    · slim ink bar, hairline white/10, amber accent dot
 *  editorial · white bar, warm shadow, ink text, ember dot
 */

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const { audience } = useAudience();
  const { direction } = usePrototype();
  const reduced = useReducedMotion();

  const isPartner = audience === "partner";
  const barContent = isPartner ? t.stickyBar.b2b : t.stickyBar.b2c;
  const scrollTarget = isPartner ? "contact" : "pre-qualification";

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (~100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    track("sticky_bar_cta", { audience });
    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
  };

  const dark = direction === "cinema";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: -48, opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: -48, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: "easeOut" }}
          className={`fixed top-18 lg:top-20 left-0 right-0 z-40 ${
            dark
              ? "bg-ink/95 backdrop-blur-xl border-b border-white/10"
              : "bg-white border-b border-brand-900/[0.06] shadow-[0_16px_40px_-20px_rgba(29,29,27,0.18)]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 lg:h-12 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2.5 min-w-0">
              <span
                aria-hidden
                className={`shrink-0 w-1.5 h-1.5 rounded-full ${dark ? "bg-accent-400" : "bg-accent-700"}`}
                style={dark ? { boxShadow: "0 0 12px var(--color-accent-400)" } : undefined}
              />
              <span
                className={`text-xs lg:text-sm line-clamp-1 ${dark ? "text-white/60" : "text-brand-600"}`}
              >
                {barContent.text}
              </span>
            </p>
            <button
              onClick={handleClick}
              className="px-5 py-2 lg:py-1.5 text-sm font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-200 shadow-md shadow-accent-700/25 whitespace-nowrap shrink-0"
            >
              {barContent.cta}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
