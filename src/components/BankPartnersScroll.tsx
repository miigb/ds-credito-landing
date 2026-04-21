"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

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

function Logo({ bank }: { bank: Bank }) {
  return (
    <div
      className="flex-shrink-0 px-6 sm:px-8 flex items-center justify-center"
      title={bank.name}
      aria-label={bank.name}
    >
      <img
        src={bank.logo}
        alt={`${bank.name} logo`}
        className="h-8 sm:h-9 md:h-10 w-auto object-contain opacity-50 brightness-[2] transition-opacity duration-300 select-none"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export default function BankPartnersScroll() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-14 bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-10"
        >
          {locale === "pt"
            ? "Parceiros Institucionais de Confiança"
            : "Trusted Banking Partners"}
        </motion.p>

        {/* Bounded marquee — width limited by max-w, fades anchored to this container */}
        <div className="relative mx-auto w-full max-w-3xl overflow-hidden">
          {/* Row 1 — scrolls left */}
          <div className="flex items-center whitespace-nowrap animate-marquee-left will-change-transform">
            {repeated(ROW_1, 4).map((bank, i) => (
              <Logo key={`r1-${i}`} bank={bank} />
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="flex items-center whitespace-nowrap mt-6 animate-marquee-right will-change-transform">
            {repeated(ROW_2, 4).map((bank, i) => (
              <Logo key={`r2-${i}`} bank={bank} />
            ))}
          </div>

          {/* Fade overlays — anchored to the bounded container, not the viewport */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-brand-900 via-brand-900/85 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-brand-900 via-brand-900/85 to-transparent" />
        </div>
      </div>
    </section>
  );
}
