"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const banks = [
  "CGD",
  "SANTANDER",
  "NOVO BANCO",
  "BPI",
  "BANKINTER",
  "BANCO CTT",
  "ABANCA",
  "UCI",
  "UNICRE",
  "BNI",
];

export default function BankPartners() {
  const { locale } = useLanguage();

  return (
    <section className="relative py-10 bg-brand-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 mb-8">
            {locale === "pt"
              ? "Parceiros Institucionais de Confiança"
              : "Trusted Banking Partners"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 md:gap-x-16 opacity-40 hover:opacity-70 transition-opacity duration-700">
            {banks.map((bank) => (
              <span
                key={bank}
                className="text-sm md:text-base font-bold text-white/60 tracking-wide whitespace-nowrap"
              >
                {bank}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
