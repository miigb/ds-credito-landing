"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { useLanguage } from "@/lib/LanguageContext";

const banks = [
  { name: "CGD", logo: "/banks/cgd.png", size: "w-9 h-9" },
  { name: "Santander", logo: "/banks/santander.png", size: "w-9 h-9" },
  { name: "Novo Banco", logo: "/banks/novobanco.png", size: "w-9 h-9" },
  { name: "BPI", logo: "/banks/bpi.png", size: "w-9 h-9" },
  { name: "Bankinter", logo: "/banks/bankinter.png", size: "w-9 h-9" },
  { name: "Banco CTT", logo: "/banks/bancoctt.png", size: "w-9 h-9" },
  { name: "ABANCA", logo: "/banks/abanca.png", size: "w-9 h-9" },
  { name: "UCI", logo: "/banks/uci.png", size: "w-9 h-9" },
  { name: "Unicre", logo: "/banks/unicre.png", size: "w-7 h-7" },
  { name: "BNI Europa", logo: "/banks/bni.png", size: "w-9 h-9" },
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
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
            {banks.map((bank) => (
              <div
                key={bank.logo}
                className="group flex items-center gap-3 whitespace-nowrap cursor-default transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  width={36}
                  height={36}
                  className={`${bank.size} object-contain opacity-40 brightness-200 transition-all duration-300 group-hover:opacity-80 group-hover:brightness-[2.5] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]`}
                  loading="lazy"
                />
                <span className="text-xs md:text-sm font-semibold text-white/35 tracking-wide transition-all duration-300 group-hover:text-white/80">
                  {bank.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
