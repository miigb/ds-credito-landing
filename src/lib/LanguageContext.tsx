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
  locale: "en",
  setLocale: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    // Check localStorage first (user preference)
    const saved = localStorage.getItem("ds-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "pt")) {
      setLocaleState(saved);
      setDetected(true);
      return;
    }

    // Check browser language
    const browserLang = navigator.language || "";
    if (browserLang.startsWith("pt")) {
      setLocaleState("pt");
      localStorage.setItem("ds-locale", "pt");
      setDetected(true);
      return;
    }

    // Try IP geolocation for Portugal detection
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code === "PT") {
          setLocaleState("pt");
          localStorage.setItem("ds-locale", "pt");
        }
      })
      .catch(() => {
        // Silently fail — stay with default (en)
      })
      .finally(() => setDetected(true));
  }, []);

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
