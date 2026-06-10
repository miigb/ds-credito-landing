"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Rising-sun arc progress — Amanhecer 2026.
 * An ember arc (RayBurst geometry: M24 60 A36 36 0 0 1 96 60) fills its
 * pathLength proportionally to step/totalSteps over a faint horizon line,
 * with a tabular-nums step counter beneath. Reduced motion: static fill.
 */
interface ProgressIndicatorProps {
  step: number; // 1-indexed current step
  totalSteps: number;
  /** Ink-canvas tint (cinema direction). */
  dark?: boolean;
}

const ARC = "M24 60 A36 36 0 0 1 96 60";

export default function ProgressIndicator({
  step,
  totalSteps,
  dark = false,
}: ProgressIndicatorProps) {
  const reduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(step, totalSteps));
  const progress = totalSteps > 0 ? clamped / totalSteps : 0;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="flex flex-col items-center gap-1"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
    >
      <svg width={110} height={49} viewBox="8 16 104 46" fill="none" aria-hidden="true">
        {/* horizon */}
        <line
          x1="12"
          y1="60"
          x2="108"
          y2="60"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          className={dark ? "text-white/12" : "text-brand-200"}
        />
        {/* arc track */}
        <path
          d={ARC}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className={dark ? "text-white/15" : "text-brand-200"}
        />
        {/* ember fill */}
        <motion.path
          d={ARC}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="text-accent-700"
          initial={false}
          animate={{ pathLength: progress }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
          }
        />
      </svg>
      <span
        className={`text-[11px] font-semibold tabular-nums tracking-[0.18em] ${
          dark ? "text-white/45" : "text-brand-400"
        }`}
      >
        {pad(clamped)} / {pad(totalSteps)}
      </span>
    </div>
  );
}
