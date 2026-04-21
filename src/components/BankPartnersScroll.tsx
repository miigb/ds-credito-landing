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

// Repeat the set enough times so the translateX(-50%) loop is seamless on any screen.
const repeated = (items: Bank[], times = 4): Bank[] =>
  Array.from({ length: times }).flatMap(() => items);

function LogoChip({ bank }: { bank: Bank }) {
  return (
    <div
      className="group flex-shrink-0 flex items-center gap-3 px-5 h-16 rounded-full bg-white/95 shadow-lg shadow-black/30 ring-1 ring-white/10 hover:ring-accent-400/40 transition-all duration-300"
      title={bank.name}
    >
      <img
        src={bank.logo}
        alt={`${bank.name} logo`}
        className="h-8 w-8 object-contain"
        loading="lazy"
      />
      <span className="text-sm font-semibold text-brand-900 whitespace-nowrap pr-1">
        {bank.name}
      </span>
    </div>
  );
}

export default function BankPartnersScroll() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-14 bg-brand-900 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-10">
            {locale === "pt"
              ? "Parceiros Institucionais de Confiança"
              : "Trusted Banking Partners"}
          </p>
        </motion.div>
      </div>

      {/* Carousel — full-bleed so the marquee runs edge to edge */}
      <div className="relative">
        {/* Row 1 — scrolls left */}
        <div className="flex gap-6 whitespace-nowrap animate-marquee-left will-change-transform">
          {repeated(ROW_1, 4).map((bank, i) => (
            <LogoChip key={`r1-${i}`} bank={bank} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-6 whitespace-nowrap mt-5 animate-marquee-right will-change-transform">
          {repeated(ROW_2, 4).map((bank, i) => (
            <LogoChip key={`r2-${i}`} bank={bank} />
          ))}
        </div>

        {/* Fade overlays — blend rows into the dark section background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-brand-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-brand-900 to-transparent" />
      </div>
    </section>
  );
}
