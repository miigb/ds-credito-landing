"use client";

/*
 * PROTOTYPE ONLY — floating review panel for the Amanhecer 2026 redesign.
 * Lets the reviewer flip design direction, logo variant, grain, audience and
 * language live. Remove for production: delete src/components/proto/ +
 * src/lib/PrototypeContext.tsx and their mounts in layout.tsx.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrototype, type Direction, type LogoVariant } from "@/lib/PrototypeContext";
import { useAudience } from "@/lib/AudienceContext";
import { useLanguage } from "@/lib/LanguageContext";
import { MonolineSun } from "@/components/brand/Logo";

const DIRECTIONS: { id: Direction; label: string; hint: string }[] = [
  { id: "cinema", label: "Cinema", hint: "Golden-hour escuro" },
  { id: "editorial", label: "Editorial", hint: "Papel quente claro" },
];

const LOGOS: { id: LogoVariant; label: string; hint: string }[] = [
  { id: "oficial", label: "Oficial", hint: "Lockup Particula (sol gradiente)" },
  { id: "sol-mont", label: "Sol + Mont", hint: "Sol oficial + wordmark Montserrat" },
  { id: "monoline", label: "Monoline", hint: "Sol redesenhado em traço" },
  { id: "assinatura", label: "Assinatura", hint: "Brown Sugar + sol ember" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400 mb-1.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
        active
          ? "bg-accent-700 text-white"
          : "bg-white/[0.06] text-brand-300 hover:bg-white/[0.12] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function ControlPanel() {
  const [open, setOpen] = useState(false);
  const {
    direction,
    setDirection,
    logoVariant,
    setLogoVariant,
    heroStyle,
    setHeroStyle,
    grain,
    setGrain,
  } = usePrototype();
  const { audience, setAudience } = useAudience();
  const { locale, setLocale } = useLanguage();

  return (
    <div className="fixed bottom-4 left-4 z-[100] hidden md:block print:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="mb-2 w-[270px] rounded-2xl bg-brand-900/95 backdrop-blur-md p-4 space-y-3.5 shadow-2xl shadow-black/40 border border-dashed border-accent-700/40"
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-400">
                Protótipo · Amanhecer
              </p>
              <span className="text-[9px] text-brand-400 uppercase tracking-widest">
                remover em prod
              </span>
            </div>

            <Row label="Direção de design">
              {DIRECTIONS.map((d) => (
                <Chip
                  key={d.id}
                  active={direction === d.id}
                  onClick={() => setDirection(d.id)}
                  title={d.hint}
                >
                  {d.label}
                </Chip>
              ))}
            </Row>

            <Row label="Logótipo">
              {LOGOS.map((l) => (
                <Chip
                  key={l.id}
                  active={logoVariant === l.id}
                  onClick={() => setLogoVariant(l.id)}
                  title={l.hint}
                >
                  {l.label}
                </Chip>
              ))}
            </Row>

            <Row label="Hero · Cinema">
              <Chip
                active={heroStyle === "video"}
                onClick={() => setHeroStyle("video")}
                title="Vídeo ambiente + blur inferior + liquid glass"
              >
                Vídeo
              </Chip>
              <Chip
                active={heroStyle === "shader"}
                onClick={() => setHeroStyle("shader")}
                title="Shader mesh golden-hour"
              >
                Shader
              </Chip>
            </Row>

            <Row label="Textura">
              <Chip active={grain} onClick={() => setGrain(true)}>
                Grão on
              </Chip>
              <Chip active={!grain} onClick={() => setGrain(false)}>
                Grão off
              </Chip>
            </Row>

            <Row label="Vista">
              <Chip active={audience === "client"} onClick={() => setAudience("client")}>
                Cliente
              </Chip>
              <Chip active={audience === "partner"} onClick={() => setAudience("partner")}>
                Parceiro
              </Chip>
              <Chip active={locale === "pt"} onClick={() => setLocale("pt")}>
                PT
              </Chip>
              <Chip active={locale === "en"} onClick={() => setLocale("en")}>
                EN
              </Chip>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        title="Painel de protótipo"
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-900/90 backdrop-blur-md text-accent-400 shadow-xl shadow-black/30 border border-dashed border-accent-700/40 hover:text-accent-300 transition-colors"
      >
        <MonolineSun size={18} strokeWidth={2.6} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          {open ? "Fechar" : "Opções"}
        </span>
      </button>
    </div>
  );
}
