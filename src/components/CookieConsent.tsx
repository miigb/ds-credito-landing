"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const STORAGE_KEY = "ds-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
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
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-brand-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-sm leading-relaxed">
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
                className="px-4 py-2 text-xs font-medium text-white/70 border border-white/20 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                {t.privacy.cookieNecessary}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 text-xs font-semibold text-white bg-accent-700 rounded-lg hover:bg-accent-600 transition-colors whitespace-nowrap"
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
