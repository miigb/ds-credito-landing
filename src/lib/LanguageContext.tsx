"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: translations.pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    // Check localStorage first (user preference)
    const saved = localStorage.getItem("ds-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "pt")) {
      setLocaleState(saved);
      return;
    }

    // Only switch to English if browser is explicitly English-only
    // (Portuguese speakers often have PT as primary with EN fallback)
    const browserLang = navigator.language || "";
    if (browserLang.startsWith("en")) {
      setLocaleState("en");
      localStorage.setItem("ds-locale", "en");
    }
    // Otherwise stay with PT (default)
  }, []);

  // Sync <html lang> with current locale for SEO and accessibility
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("ds-locale", newLocale);
  };

  const t = translations[locale];

  // Render immediately (don't block on detection)
  // The page shows in default language, then switches if needed
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
