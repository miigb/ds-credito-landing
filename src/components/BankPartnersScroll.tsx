"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { usePrototype } from "@/lib/PrototypeContext";
import { FadeIn } from "@/components/fx/RevealText";

/*
 * BankPartnersScroll — dual opposing marquees of the 10 partner banks.
 * Two art directions of the same band (see docs/redesign/DESIGN-BRIEF.md §6):
 *  cinema    · ink band, logos knocked out to soft white light
 *  editorial · warm paper band, grayscale logos warming to color on hover
 * Copy (hardcoded isPt ternary), logos and marquee mechanics are identical
 * to the legacy component — presentation only.
 */

type Bank = { name: string; logo: string };

// Split banks into two rows so each row has its own rhythm.
const ROW_1: Bank[] = [
  { name: "CGD", logo: "/banks/cgd.png" },
  { name: "Santander", logo: "/banks/santander.png" },
  { name: "Novo Banco", logo: "/banks/novobanco.png" },
  { name: "BPI", logo: "/banks/bpi.png" },
  { name: "Bankinter", logo: "/banks/bankinter.png" },
];

const ROW_2: Bank[] = [
  { name: "Banco CTT", logo: "/banks/bancoctt.png" },
  { name: "ABANCA", logo: "/banks/abanca.png" },
  { name: "UCI", logo: "/banks/uci.png" },
  { name: "Unicre", logo: "/banks/unicre.png" },
  { name: "BNI Europa", logo: "/banks/bni.png" },
];

// Repeat enough times so the translateX(-50%) loop is seamless on wide screens.
const repeated = (items: Bank[], times = 4): Bank[] =>
  Array.from({ length: times }).flatMap(() => items);

function BankLogo({ bank, dark }: { bank: Bank; dark: boolean }) {
  return (
    <div
      className="flex-shrink-0 px-6 sm:px-8 flex items-center justify-center"
      title={bank.name}
      aria-label={bank.name}
    >
      <img
        src={bank.logo}
        alt={`${bank.name} logo`}
        className={`h-8 sm:h-9 md:h-10 w-auto object-contain select-none transition-all duration-500 ${
          dark
            ? "brightness-0 invert opacity-60 hover:opacity-100"
            : "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
        }`}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export default function BankPartnersScroll() {
  const { locale } = useLanguage();
  const { direction } = usePrototype();
  const dark = direction === "cinema";

  return (
    <section
      className={`relative py-14 lg:py-16 ${
        dark
          ? "bg-ink border-t border-white/[0.06]"
          : "bg-paper border-t border-brand-900/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p
            className={`text-center text-[10px] lg:text-[11px] uppercase tracking-[0.3em] font-semibold mb-10 ${
              dark ? "text-accent-400/80" : "text-bronze"
            }`}
          >
            {locale === "pt"
              ? "Parceiros Institucionais de Confiança"
              : "Trusted Banking Partners"}
          </p>
        </FadeIn>

        {/* Bounded marquee — width limited by max-w, fades anchored to this container */}
        <div className="relative mx-auto w-full max-w-3xl overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div className="flex items-center whitespace-nowrap animate-marquee-left will-change-transform">
            {repeated(ROW_1, 4).map((bank, i) => (
              <BankLogo key={`r1-${i}`} bank={bank} dark={dark} />
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="flex items-center whitespace-nowrap mt-6 animate-marquee-right will-change-transform">
            {repeated(ROW_2, 4).map((bank, i) => (
              <BankLogo key={`r2-${i}`} bank={bank} dark={dark} />
            ))}
          </div>

          {/* Fade overlays — anchored to the bounded container, matching the canvas */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r to-transparent ${
              dark
                ? "from-brand-900 via-brand-900/85"
                : "from-brand-50 via-brand-50/85"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l to-transparent ${
              dark
                ? "from-brand-900 via-brand-900/85"
                : "from-brand-50 via-brand-50/85"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
