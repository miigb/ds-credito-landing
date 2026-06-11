"use client";

/*
 * Design-direction context — pinned to the approved choices (Jun 2026):
 * Cinema direction · Shader hero · Oficial logo lockup · grain on.
 *
 * The other hero treatments (video/video2/video3/slides) and logo variants
 * remain implemented in the tree but PARKED — unreachable in production.
 * To review them again, re-mount <ControlPanel /> from src/components/proto/
 * in layout.tsx and restore the switchable version of this file from git
 * history (it kept the state in useState + localStorage "proto-amanhecer-2026").
 */

import { createContext, useContext, type ReactNode } from "react";

export type Direction = "cinema" | "editorial";
export type LogoVariant = "oficial" | "sol-mont" | "monoline" | "assinatura";
export type HeroStyle = "shader" | "video" | "video2" | "video3" | "slides";

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

const APPROVED: PrototypeState = {
  direction: "cinema",
  logoVariant: "oficial",
  heroStyle: "shader",
  grain: true,
  setDirection: () => {},
  setLogoVariant: () => {},
  setHeroStyle: () => {},
  setGrain: () => {},
};

const PrototypeContext = createContext<PrototypeState>(APPROVED);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  return (
    <PrototypeContext.Provider value={APPROVED}>
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  return useContext(PrototypeContext);
}
