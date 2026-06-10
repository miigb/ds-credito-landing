"use client";

import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

/*
 * Site-wide section CTA — Amanhecer 2026 re-skin.
 * Same API + track("section_cta") + smooth-scroll behavior as the legacy
 * component. Primary = ember rounded-full pill with glow-on-hover; the
 * optional `tone` prop adapts the quiet "link" variant to ink vs paper
 * canvases (defaults to "light" so existing call sites keep working).
 */

type Variant = "primary" | "link";
type Tone = "dark" | "light";

interface SectionCTAProps {
  label: string;
  href: string; // "#pre-qualification" | "#contact"
  source: string; // analytics source id, e.g. "services", "process"
  variant?: Variant;
  tone?: Tone;
}

export default function SectionCTA({
  label,
  href,
  source,
  variant = "primary",
  tone = "light",
}: SectionCTAProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track("section_cta", { source, href });
    const id = href.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (variant === "link") {
    return (
      <div className="mt-10 text-center">
        <a
          href={href}
          onClick={handleClick}
          className={`group inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline transition-colors ${
            tone === "dark"
              ? "text-accent-400 hover:text-accent-300"
              : "text-bronze hover:text-brand-900"
          }`}
        >
          {label}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-12 flex justify-center">
      <a
        href={href}
        onClick={handleClick}
        className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-2xl hover:shadow-accent-600/40 hover:-translate-y-0.5"
      >
        {label}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
