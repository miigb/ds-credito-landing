"use client";

import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

type Variant = "primary" | "link";

interface SectionCTAProps {
  label: string;
  href: string; // "#pre-qualification" | "#contact"
  source: string; // analytics source id, e.g. "services", "process"
  variant?: Variant;
}

export default function SectionCTA({
  label,
  href,
  source,
  variant = "primary",
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
          className="inline-flex items-center gap-1.5 text-accent-700 text-sm font-semibold hover:text-accent-800 underline-offset-4 hover:underline transition-colors"
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
        className="group inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-2xl bg-accent-700 text-white hover:bg-accent-600 transition-all duration-300 shadow-xl shadow-accent-700/25 hover:shadow-accent-600/30 hover:-translate-y-0.5"
      >
        {label}
        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
