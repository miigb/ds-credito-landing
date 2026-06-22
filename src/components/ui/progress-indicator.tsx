"use client";

import { motion } from "framer-motion";

/**
 * Animated step indicator — dots with a pill overlay that grows to cover completed steps.
 * Adapted from 21st.dev/anurag-mishra22 for DS Crédito (accent colors, N-step support).
 *
 * Geometry:
 *   dot size: w-2 h-2 (8px)
 *   gap: gap-4 (16px)  → center-to-center: 24px
 *   pill overshoot: 8px on each side of the active range
 */
interface ProgressIndicatorProps {
  step: number; // 1-indexed current step
  totalSteps: number;
}

const DOT_SIZE = 8; // px
const GAP = 16; // px
const OVERSHOOT = 8; // px on each side of the pill

export default function ProgressIndicator({
  step,
  totalSteps,
}: ProgressIndicatorProps) {
  const clamped = Math.max(0, Math.min(step, totalSteps));
  // Pill covers from (-OVERSHOOT) to (center of dot `clamped` + DOT_SIZE/2 + OVERSHOOT)
  // Width: OVERSHOOT + ((clamped - 1) * (DOT_SIZE + GAP) + DOT_SIZE) + OVERSHOOT
  const pillWidth =
    clamped === 0 ? 0 : 2 * OVERSHOOT + DOT_SIZE + (clamped - 1) * (DOT_SIZE + GAP);

  return (
    <div className="flex items-center gap-4 relative py-2" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const active = idx + 1 <= clamped;
        return (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full relative z-10 transition-colors ${
              active ? "bg-white" : "bg-brand-300"
            }`}
          />
        );
      })}

      <motion.div
        initial={false}
        animate={{ width: pillWidth }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 22,
          mass: 0.8,
        }}
        className="absolute -left-2 top-1/2 -translate-y-1/2 h-3 bg-accent-700 rounded-full shadow-md shadow-accent-700/20"
      />
    </div>
  );
}
