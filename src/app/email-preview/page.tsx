"use client";

import { useState } from "react";
import {
  advogadosOutreachPT,
  EMAIL_SCHEMES,
  EMAIL_LAYOUTS,
  type EmailColorScheme,
  type EmailLayout,
} from "@/lib/emailTemplates";

const SCHEMES = Object.entries(EMAIL_SCHEMES) as [EmailColorScheme, (typeof EMAIL_SCHEMES)[EmailColorScheme]][];
const LAYOUTS = Object.entries(EMAIL_LAYOUTS) as [EmailLayout, (typeof EMAIL_LAYOUTS)[EmailLayout]][];

// Group schemes visually
const DARK_SCHEMES = SCHEMES.filter(([k]) => !k.startsWith("light-"));
const LIGHT_SCHEMES = SCHEMES.filter(([k]) => k.startsWith("light-"));

// GHL merge fields for campaign mode, placeholders for preview
const GHL_PARAMS = {
  recipientName: "{{contact.name}}",
  agentName: "[Nome do Consultor]",
  agentTitle: "Consultor Especializado em Intermediação de Crédito",
  agentEmail: "[email@exemplo.com]",
  storeName: "Letraperfeiçoada",
  bdpNumber: "0007470",
};

const PREVIEW_PARAMS = {
  recipientName: "Dr. Silva & Associados",
  agentName: "[Nome do Consultor]",
  agentTitle: "Consultor Especializado em Intermediação de Crédito",
  agentEmail: "[email@exemplo.com]",
  storeName: "Letraperfeiçoada",
  bdpNumber: "0007470",
};

function ColorSwatch({
  scheme,
  schemeKey,
  active,
  onClick,
}: {
  scheme: (typeof EMAIL_SCHEMES)[EmailColorScheme];
  schemeKey: string;
  active: boolean;
  onClick: () => void;
}) {
  const isLight = scheme.headerBg === "#ffffff" || scheme.headerBg === "#F8FAFC";
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col overflow-hidden rounded-lg border-2 transition-all ${
        active
          ? "border-gray-900 shadow-lg ring-2 ring-gray-900/20"
          : "border-transparent hover:border-gray-300 hover:shadow-md"
      }`}
      style={{ width: 72, height: 72 }}
      title={scheme.label}
    >
      {/* Header band */}
      <div
        className="flex h-5 items-center justify-center"
        style={{ background: scheme.headerBg }}
      >
        <span
          className="text-[6px] font-bold tracking-wider"
          style={{ color: scheme.headerText }}
        >
          LETRA
        </span>
      </div>
      {/* Hero band */}
      <div
        className="flex h-7 items-center justify-center"
        style={{ background: scheme.heroGradient }}
      >
        <span
          className="text-[5px] font-bold uppercase"
          style={{ color: scheme.heroText }}
        >
          Soluções
        </span>
      </div>
      {/* Body preview */}
      <div className="flex flex-1 items-center justify-center gap-1 px-1" style={{ background: "#fff" }}>
        <div className="h-2 w-2 rounded-sm" style={{ background: scheme.primary }} />
        <div className="h-1.5 flex-1 rounded-sm" style={{ background: scheme.borderColor }} />
      </div>
      {/* CTA band */}
      <div className="h-3" style={{ background: scheme.ctaGradient }}>
        <div
          className="mx-auto mt-0.5 h-1.5 w-6 rounded-sm"
          style={{ background: scheme.primary }}
        />
      </div>
      {/* Active indicator */}
      {active && (
        <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[8px] text-white">
          ✓
        </div>
      )}
    </button>
  );
}

export default function EmailPreviewPage() {
  const [activeScheme, setActiveScheme] = useState<EmailColorScheme>("default");
  const [activeLayout, setActiveLayout] = useState<EmailLayout>("full");
  const [copied, setCopied] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState<string | null>(null);

  // Preview uses sample data, copy uses GHL merge fields
  const previewSrc = advogadosOutreachPT({ ...PREVIEW_PARAMS, scheme: activeScheme, layout: activeLayout });
  const ghlHtml = advogadosOutreachPT({ ...GHL_PARAMS, scheme: activeScheme, layout: activeLayout });
  const previewHtml = previewSrc.replace(
    "https://meuintermediario.com/ds-credito-logo.png",
    "/ds-credito-logo.png"
  );

  const handleCopy = async () => {
    try {
      const blob = new Blob([ghlHtml], { type: "text/html" });
      const plainBlob = new Blob([ghlHtml], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob, "text/plain": plainBlob }),
      ]);
    } catch {
      await navigator.clipboard.writeText(ghlHtml);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentScheme = EMAIL_SCHEMES[activeScheme];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Email Builder — Advogados Outreach
            </h1>
            <p className="text-sm text-gray-500">
              {LAYOUTS.length} layouts &times; {SCHEMES.length} themes = {LAYOUTS.length * SCHEMES.length} variants
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all ${
              copied ? "bg-green-600" : "hover:opacity-90"
            }`}
            style={{ backgroundColor: copied ? undefined : currentScheme.primary }}
          >
            {copied ? "Copied!" : "Copy HTML"}
          </button>
        </div>

        <div className="flex gap-4">
          {/* Left sidebar — selectors */}
          <div className="w-[280px] shrink-0 space-y-4">
            {/* Layout selector */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Layout</p>
              <div className="space-y-1">
                {LAYOUTS.map(([key, layout]) => (
                  <button
                    key={key}
                    onClick={() => setActiveLayout(key)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-all ${
                      activeLayout === key
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-semibold">{layout.label}</span>
                    <span className="ml-1 text-[11px] opacity-60">{layout.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color scheme selector */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Dark themes</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {DARK_SCHEMES.map(([key, scheme]) => (
                  <ColorSwatch
                    key={key}
                    scheme={scheme}
                    schemeKey={key}
                    active={activeScheme === key}
                    onClick={() => setActiveScheme(key)}
                  />
                ))}
              </div>

              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Light themes</p>
              <div className="flex flex-wrap gap-2">
                {LIGHT_SCHEMES.map(([key, scheme]) => (
                  <ColorSwatch
                    key={key}
                    scheme={scheme}
                    schemeKey={key}
                    active={activeScheme === key}
                    onClick={() => setActiveScheme(key)}
                  />
                ))}
              </div>
            </div>

            {/* Current scheme info */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm font-semibold text-gray-700">{currentScheme.label}</p>
              <div className="mt-2 flex gap-1">
                {[currentScheme.headerBg, currentScheme.primary, currentScheme.primaryHover, currentScheme.iconHighlight, currentScheme.iconBg].map((c, i) => (
                  <div
                    key={i}
                    className="h-5 flex-1 rounded border border-gray-200"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* GHL info */}
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">GoHighLevel</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Copy HTML uses <code className="rounded bg-gray-100 px-1 py-0.5 text-[10px] font-mono">{"{{contact.name}}"}</code> merge field for recipient name. Import your leads list and paste into GHL email template.
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Subject lines</p>
                {[
                  "Proposta de Parceria — Soluções de Crédito para os Seus Clientes",
                  "Intermediação de Crédito — Protocolo para Advogados",
                  "Viabilidade Financeira — Como Podemos Ajudar o Seu Escritório",
                ].map((subject) => (
                  <p
                    key={subject}
                    className={`cursor-pointer rounded px-2 py-1.5 text-xs transition-all ${
                      copiedSubject === subject
                        ? "bg-green-50 text-green-700 font-medium"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      navigator.clipboard.writeText(subject);
                      setCopiedSubject(subject);
                      setTimeout(() => setCopiedSubject(null), 2000);
                    }}
                  >
                    {copiedSubject === subject ? "Copied!" : subject}
                  </p>
                ))}
                <p className="text-[10px] text-gray-400 mt-1">Click to copy</p>
              </div>
            </div>
          </div>

          {/* Right — email preview */}
          <div className="min-w-0 flex-1">
            <div
              className="overflow-hidden rounded-lg shadow-lg"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
