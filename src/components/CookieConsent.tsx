"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const STORAGE_KEY = "ds-cookie-consent";

/*
 * Cookie consent — same key + accept/necessary logic as the legacy banner.
 * Re-skinned: ink card, paper text, ember accept pill, ghost necessary pill.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  };

  const necessary = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 28 }
          }
          className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
        >
          <div className="max-w-4xl mx-auto bg-brand-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-brand-50/70 text-sm leading-relaxed">
                {t.privacy.cookieDesc}{" "}
                <Link
                  href="/privacidade"
                  className="text-accent-400 hover:text-accent-300 underline underline-offset-2 transition-colors"
                >
                  {t.privacy.cookiePolicy}
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={necessary}
                className="px-5 py-3 text-xs font-medium text-brand-50/70 border border-white/15 rounded-full hover:bg-white/5 hover:text-brand-50 transition-colors whitespace-nowrap"
              >
                {t.privacy.cookieNecessary}
              </button>
              <button
                onClick={accept}
                className="px-5 py-3 text-xs font-semibold text-white bg-accent-700 rounded-full hover:bg-accent-600 transition-colors shadow-lg shadow-accent-700/25 whitespace-nowrap"
              >
                {t.privacy.cookieAccept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
