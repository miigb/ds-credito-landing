"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
 * Editorial line-mask reveal: each line rises from behind an overflow mask.
 * The signature headline move — never per-letter confetti.
 *
 * Usage: wrap each visual line in its own <RevealLine index={i}>.
 */

interface RevealLineProps {
  children: ReactNode;
  /** Stagger index — delay = base + index * 0.11 */
  index?: number;
  base?: number;
  className?: string;
  /** Animate on mount (hero) instead of on scroll into view. */
  onMount?: boolean;
}

export function RevealLine({
  children,
  index = 0,
  base = 0.1,
  className = "",
  onMount = false,
}: RevealLineProps) {
  const reduced = useReducedMotion();
  // The trigger lives on the OUTER mask span — it never moves, so its
  // IntersectionObserver fires reliably. The inner span (translated out of the
  // mask) only consumes the propagated variant, never observes itself.
  const variants = {
    hidden: { y: reduced ? "0%" : "112%" },
    shown: { y: "0%" },
  };
  const transition = {
    duration: reduced ? 0 : 0.85,
    delay: reduced ? 0 : base + index * 0.11,
    ease: [0.22, 0.61, 0.21, 0.99] as const,
  };

  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      {...(onMount
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: { once: true, amount: 0.4 } })}
    >
      <motion.span
        className="block will-change-transform"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/* Soft blur-in for subheadings / supporting copy. */
export function FadeIn({
  children,
  delay = 0,
  className = "",
  onMount = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  onMount?: boolean;
}) {
  const reduced = useReducedMotion();
  const target = { opacity: 1, y: 0, filter: "blur(0px)" };
  const initial = reduced ? target : { opacity: 0, y: 18, filter: "blur(6px)" };

  return (
    <motion.div
      className={className}
      initial={initial}
      {...(onMount
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, amount: 0.4 } })}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
