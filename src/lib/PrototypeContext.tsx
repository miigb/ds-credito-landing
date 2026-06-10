"use client";

/*
 * PROTOTYPE ONLY — review-time switches for the Amanhecer 2026 redesign.
 * Removal for production: delete this file + src/components/proto/ and the
 * <PrototypeProvider>/<ControlPanel> lines in layout.tsx, then hardcode the
 * approved direction/logoVariant where `usePrototype()` is consumed.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Direction = "cinema" | "editorial";
export type LogoVariant = "oficial" | "sol-mont" | "monoline" | "assinatura";
export type HeroStyle = "shader" | "video" | "video2";

interface PrototypeState {
  direction: Direction;
  logoVariant: LogoVariant;
  heroStyle: HeroStyle;
  grain: boolean;
  setDirection: (d: Direction) => void;
  setLogoVariant: (v: LogoVariant) => void;
  setHeroStyle: (h: HeroStyle) => void;
  setGrain: (g: boolean) => void;
}

const STORAGE_KEY = "proto-amanhecer-2026";

const PrototypeContext = createContext<PrototypeState>({
  direction: "cinema",
  logoVariant: "oficial",
  heroStyle: "video2",
  grain: true,
  setDirection: () => {},
  setLogoVariant: () => {},
  setHeroStyle: () => {},
  setGrain: () => {},
});

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<Direction>("cinema");
  const [logoVariant, setLogoVariant] = useState<LogoVariant>("oficial");
  const [heroStyle, setHeroStyle] = useState<HeroStyle>("video2");
  const [grain, setGrain] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.direction === "cinema" || saved.direction === "editorial")
        setDirection(saved.direction);
      if (["oficial", "sol-mont", "monoline", "assinatura"].includes(saved.logoVariant))
        setLogoVariant(saved.logoVariant);
      if (["shader", "video", "video2"].includes(saved.heroStyle))
        setHeroStyle(saved.heroStyle);
      if (typeof saved.grain === "boolean") setGrain(saved.grain);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ direction, logoVariant, heroStyle, grain })
      );
    } catch {}
  }, [direction, logoVariant, heroStyle, grain]);

  return (
    <PrototypeContext.Provider
      value={{
        direction,
        logoVariant,
        heroStyle,
        grain,
        setDirection,
        setLogoVariant,
        setHeroStyle,
        setGrain,
      }}
    >
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  return useContext(PrototypeContext);
}
