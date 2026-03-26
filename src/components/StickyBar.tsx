"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";
import { useAudience } from "@/lib/AudienceContext";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  const { audience } = useAudience();

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-16 lg:top-20 left-0 right-0 z-40 bg-brand-900/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 lg:h-12 flex items-center justify-between gap-3">
            <p className="text-xs lg:text-sm text-white/60 line-clamp-1">
              {barContent.text}
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-1 lg:px-5 lg:py-1.5 text-xs lg:text-sm font-semibold rounded-lg bg-accent-700 text-white hover:bg-accent-600 transition-all duration-200 shadow-md shadow-accent-700/20 whitespace-nowrap shrink-0"
            >
              {barContent.cta}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
