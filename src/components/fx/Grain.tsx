"use client";

import { usePrototype } from "@/lib/PrototypeContext";

/* Global film-grain overlay — unifies gradients + paper warmth. */
export default function Grain() {
  const { grain } = usePrototype();
  if (!grain) return null;
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.035] mix-blend-overlay"
    />
  );
}
