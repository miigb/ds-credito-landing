"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { useLanguage } from "@/lib/LanguageContext";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLanguage();
  const isPt = locale === "pt";

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (~100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    track("sticky_bar_cta");
    document.getElementById("pre-qualification")?.scrollIntoView({ behavior: "smooth" }) ||
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-[4.5rem] lg:top-20 left-0 right-0 z-40 bg-brand-900/90 backdrop-blur-xl border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-12 flex items-center justify-between">
            <p className="text-sm text-white/60 hidden sm:block">
              {isPt
                ? "Simulação gratuita em 24h — sem compromisso"
                : "Free simulation within 24h — no commitment"}
            </p>
            <p className="text-sm text-white/60 sm:hidden">
              {isPt ? "Simulação gratuita em 24h" : "Free simulation in 24h"}
            </p>
            <button
              onClick={handleClick}
              className="px-5 py-1.5 text-sm font-semibold rounded-lg bg-accent-700 text-white hover:bg-accent-600 transition-all duration-200 shadow-md shadow-accent-700/20"
            >
              {isPt ? "Simular Agora" : "Simulate Now"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
