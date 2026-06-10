"use client";

import * as React from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

/*
 * Animated "dawn" reveal of the RayBurst motif (geometry mirrors <RayBurst> in
 * BrandIcons.tsx, viewBox 120×80). The horizon arc draws first, then the rays
 * break outward from the centre in a staggered sunrise sweep — the site's single
 * signature brand moment (footer finale). Honours prefers-reduced-motion.
 * Triggers when scrolled into view (once).
 */

const ARC = "M24 60 A36 36 0 0 1 96 60";

const RAYS: ReadonlyArray<readonly [number, number, number, number]> = [
  [60, 24, 60, 8], // 0 · centre
  [48, 26, 44, 11], // 1 · inner
  [72, 26, 76, 11], // 2 · inner
  [38, 33, 28, 20], // 3 · mid
  [82, 33, 92, 20], // 4 · mid
  [31, 43, 17, 34], // 5 · outer
  [89, 43, 103, 34], // 6 · outer
  [27, 54, 11, 50], // 7 · horizon
  [93, 54, 109, 50], // 8 · horizon
];

interface RayBurstRevealProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export function RayBurstReveal({
  width = 120,
  height = 80,
  strokeWidth = 1.4,
  ...props
}: RayBurstRevealProps) {
  const reduced = useReducedMotion();

  const hidden = reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 };
  const shown = { pathLength: 1, opacity: 1 };
  const viewport = { once: true, amount: 0.6 };
  const draw = (delay: number): Transition =>
    reduced
      ? { duration: 0 }
      : {
          pathLength: { delay, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
          opacity: { delay, duration: 0.25 },
        };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <motion.path d={ARC} initial={hidden} whileInView={shown} viewport={viewport} transition={draw(0)} />
      {RAYS.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          initial={hidden}
          whileInView={shown}
          viewport={viewport}
          transition={draw(0.2 + Math.ceil(i / 2) * 0.09)}
        />
      ))}
    </svg>
  );
}
