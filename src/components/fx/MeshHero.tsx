"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

/*
 * Golden-hour mesh-gradient canvas — the cinematic hero backdrop.
 * Palettes validated on-brand in the credit-pitch deck ("deeper, de-yellowed").
 * CSS gradient fallback paints first (LCP-safe); shader fades in on top.
 * Reduced motion → static (speed 0).
 */

const PALETTES = {
  dark: ["#1D1D1B", "#2c2012", "#8a6116", "#D9820E", "#C98A2E"],
  light: ["#FAF7F2", "#F2E3C0", "#E8B85A", "#E07E10", "#C98A2E"],
} as const;

const FALLBACK = {
  dark: "linear-gradient(160deg, #1D1D1B 0%, #2a1f12 55%, #4a3210 100%)",
  light: "linear-gradient(160deg, #FAF7F2 0%, #F2E3C0 55%, #E8B85A 100%)",
} as const;

interface MeshHeroProps {
  palette?: keyof typeof PALETTES;
  /** Veil opacity of the shader layer (lower = deeper, less neon). */
  opacity?: number;
  className?: string;
}

export default function MeshHero({
  palette = "dark",
  opacity = 0.62,
  className = "",
}: MeshHeroProps) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: FALLBACK[palette] }}
    >
      {mounted && (
        <MeshGradient
          colors={[...PALETTES[palette]]}
          speed={reduced ? 0 : 0.28}
          distortion={0.9}
          swirl={0.18}
          style={{ width: "100%", height: "100%", opacity }}
        />
      )}
    </div>
  );
}
