"use client";

import { usePrototype, type LogoVariant } from "@/lib/PrototypeContext";

/*
 * Letraperfeiçoada logo system — renders the prototype-selected variant.
 *
 * Variants (pick & choose in the prototype control panel):
 *  - oficial     · Particula Digital horizontal lockup (gradient sun), real SVG asset
 *  - sol-mont    · official gradient sun icon + Montserrat-set wordmark (modern minimal)
 *  - monoline    · redesigned stroke-only sun (currentColor) + Montserrat wordmark
 *  - assinatura  · Brown Sugar live wordmark (licensed logo face) + flat ember sun
 *
 * `tone` = the surface the logo sits on ("dark" = ink/cinema, "light" = paper).
 */

interface LogoProps {
  /** Override the prototype-selected variant (e.g. footer always stacked oficial). */
  variant?: LogoVariant;
  tone?: "dark" | "light";
  /** Pixel height of the mark. */
  height?: number;
  /** Show the INTERMEDIÁRIOS DE CRÉDITO tagline under text wordmarks. */
  tagline?: boolean;
  className?: string;
}

/* Monoline half-sun — redesigned mark on the RayBurst geometry (7 rays, round caps). */
export function MonolineSun({
  size = 28,
  strokeWidth = 2,
  className = "",
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.62}
      viewBox="0 0 48 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* half-disc on the horizon */}
      <path d="M11 28 A13 13 0 0 1 37 28" />
      <line x1="6" y1="28" x2="42" y2="28" />
      {/* rays — centre then symmetric pairs */}
      <line x1="24" y1="11" x2="24" y2="4" />
      <line x1="16.5" y1="13" x2="13" y2="7" />
      <line x1="31.5" y1="13" x2="35" y2="7" />
      <line x1="11" y1="18.5" x2="5" y2="14.5" />
      <line x1="37" y1="18.5" x2="43" y2="14.5" />
    </svg>
  );
}

/* Flat ember half-sun — filled mark for the assinatura variant. */
function FlatSun({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.58}
      viewBox="0 0 44 26"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 24 A13 13 0 0 1 35 24 Z" fill="#F39200" />
      <g stroke="#F39200" strokeWidth="2.4" strokeLinecap="round">
        <line x1="22" y1="8" x2="22" y2="2" />
        <line x1="13.5" y1="10.5" x2="10" y2="5.5" />
        <line x1="30.5" y1="10.5" x2="34" y2="5.5" />
        <line x1="8" y1="16.5" x2="2.5" y2="13" />
        <line x1="36" y1="16.5" x2="41.5" y2="13" />
      </g>
    </svg>
  );
}

/* Montserrat wordmark shared by sol-mont / monoline variants. */
function MontWordmark({
  tone,
  tagline,
  scale = 1,
}: {
  tone: "dark" | "light";
  tagline: boolean;
  scale?: number;
}) {
  const ink = tone === "dark" ? "text-white" : "text-brand-900";
  const sub = tone === "dark" ? "text-brand-300" : "text-brand-500";
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`${ink} uppercase tracking-[0.16em] whitespace-nowrap`}
        style={{ fontSize: 15 * scale }}
      >
        <span className="font-extrabold">Letra</span>
        <span className="font-light">perfeiçoada</span>
      </span>
      {tagline && (
        <span
          className={`${sub} uppercase tracking-[0.3em] font-semibold whitespace-nowrap mt-1`}
          style={{ fontSize: 7.5 * scale }}
        >
          Intermediários de Crédito
        </span>
      )}
    </span>
  );
}

export default function Logo({
  variant,
  tone = "dark",
  height = 34,
  tagline = true,
  className = "",
}: LogoProps) {
  const { logoVariant } = usePrototype();
  const v = variant ?? logoVariant;
  const scale = height / 34;

  if (v === "oficial") {
    /* Horizontal lockup recomposed from the flat-ember stacked asset
       (var-dark-4 / var-light-4): sun left, lettering as-is to the right. */
    return (
      <img
        src={
          tone === "dark"
            ? "/brand-2026/svg/logo-horizontal-white.svg"
            : "/brand-2026/svg/logo-horizontal-ink.svg"
        }
        alt="Letraperfeiçoada — Intermediários de Crédito"
        style={{ height }}
        className={`w-auto ${className}`}
      />
    );
  }

  if (v === "sol-mont") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <img
          src="/brand-2026/svg/icon-sol.svg"
          alt=""
          aria-hidden
          style={{ height: height * 0.62 }}
          className="w-auto"
        />
        <MontWordmark tone={tone} tagline={tagline} scale={scale} />
        <span className="sr-only">Letraperfeiçoada — Intermediários de Crédito</span>
      </span>
    );
  }

  if (v === "monoline") {
    return (
      <span className={`inline-flex items-center gap-3 ${className}`}>
        <MonolineSun
          size={height * 0.92}
          className={tone === "dark" ? "text-accent-700" : "text-accent-700"}
        />
        <MontWordmark tone={tone} tagline={tagline} scale={scale} />
        <span className="sr-only">Letraperfeiçoada — Intermediários de Crédito</span>
      </span>
    );
  }

  /* assinatura — Brown Sugar live wordmark (the licensed logo face) */
  return (
    <span className={`inline-flex items-end gap-2.5 ${className}`}>
      <FlatSun size={height * 0.66} className="mb-[0.3em]" />
      <span className="flex flex-col leading-none">
        <span
          className={tone === "dark" ? "text-white" : "text-brand-900"}
          style={{ fontFamily: "var(--font-logo)", fontSize: 22 * scale, lineHeight: 1 }}
        >
          Letraperfeiçoada
        </span>
        {tagline && (
          <span
            className={`${
              tone === "dark" ? "text-brand-300" : "text-brand-500"
            } uppercase tracking-[0.3em] font-semibold mt-1`}
            style={{ fontSize: 7 * scale }}
          >
            Intermediários de Crédito
          </span>
        )}
      </span>
    </span>
  );
}

/* Stacked lockup for footer / hero moments — flat-ember official asset. */
export function LogoStacked({
  tone = "dark",
  height = 110,
  className = "",
}: {
  tone?: "dark" | "light";
  height?: number;
  className?: string;
}) {
  return (
    <img
      src={tone === "dark" ? "/brand-2026/svg/var-dark-4.svg" : "/brand-2026/svg/var-light-4.svg"}
      alt="Letraperfeiçoada — Intermediários de Crédito"
      style={{ height }}
      className={`w-auto ${className}`}
    />
  );
}
