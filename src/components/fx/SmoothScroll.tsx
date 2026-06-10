"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/*
 * Lenis smooth scroll, desktop wheel only (touch stays native).
 * Disabled entirely under prefers-reduced-motion.
 *
 * LenisBridge routes the app's existing `scrollIntoView({ behavior: "smooth" })`
 * calls (SectionCTA, StickyBar, MiniSimulator → wizard, Navbar) through Lenis —
 * native smooth scrolling and Lenis would otherwise fight over scroll position.
 * Call sites stay untouched.
 */

function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    (window as unknown as { lenis?: typeof lenis }).lenis = lenis;

    const original = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (
      this: Element,
      options?: boolean | ScrollIntoViewOptions
    ) {
      if (
        typeof options === "object" &&
        options?.behavior === "smooth" &&
        this instanceof HTMLElement
      ) {
        lenis.scrollTo(this, { offset: -72 });
        return;
      }
      original.call(this, options as ScrollIntoViewOptions);
    };

    return () => {
      Element.prototype.scrollIntoView = original;
      delete (window as unknown as { lenis?: unknown }).lenis;
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.115, anchors: true }}>
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}
