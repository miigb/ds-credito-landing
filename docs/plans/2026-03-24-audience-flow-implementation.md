# Audience Flow Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the landing page B2C-first with a persistent nav toggle that swaps content for B2B partners — no structural changes, only copy/content swaps in key sections.

**Architecture:** Extend existing AudienceContext to default to "client". Add a pill toggle in Navbar (PT only). Key sections (Hero, Services, Process, StickyBar) read audience from context and render matching translation keys. PreQual fail is softened — everyone proceeds to CreditForm.

**Tech Stack:** Next.js 15, React context, framer-motion AnimatePresence, Tailwind CSS, existing translations.ts pattern

**Design doc:** `docs/plans/2026-03-24-audience-flow-redesign.md`

---

### Task 1: Create feature branch

**Step 1: Branch from main**

```bash
git checkout main
git pull origin main
git checkout -b feature/audience-flow-redesign
```

**Step 2: Commit**

No commit needed — empty branch.

---

### Task 2: Update AudienceContext — default to "client"

**Files:**
- Modify: `src/lib/AudienceContext.tsx`

**Step 1: Change default audience from null to "client"**

In `src/lib/AudienceContext.tsx`, change the initial state from `null` to `"client"`:

```tsx
const [audience, setAudience] = useState<Audience>("client");
```

Also update the type to remove null — audience is always set:

```tsx
export type Audience = "partner" | "client";
```

Update the context type:

```tsx
interface AudienceContextType {
  audience: Audience;
  setAudience: (a: Audience) => void;
}
```

Add sessionStorage persistence — read on mount, write on change:

```tsx
useEffect(() => {
  const stored = sessionStorage.getItem("audience") as Audience | null;
  if (stored === "partner" || stored === "client") {
    setAudience(stored);
  }
}, []);

useEffect(() => {
  sessionStorage.setItem("audience", audience);
}, [audience]);
```

**Step 2: Fix any TypeScript errors from null removal**

Search for `audience === null` or `!audience` checks in components and remove them. The audience is now always "client" or "partner".

**Step 3: Commit**

```bash
git add src/lib/AudienceContext.tsx
git commit -m "refactor: default audience to client, add sessionStorage persistence"
```

---

### Task 3: Add audience-specific translation keys

**Files:**
- Modify: `src/lib/translations.ts`

**Step 1: Add B2C/B2B hero keys for PT**

In the `pt` section, replace flat hero keys with audience-nested keys:

```typescript
hero: {
  eyebrow: "Letraperfeiçoada",
  // B2C (default)
  b2c: {
    headlineStart: "O seu crédito, ",
    headlineHighlight: "simplificado.",
    subheading: "Comparamos ofertas de múltiplos bancos, tratamos de toda a documentação e acompanhamos o processo do início à escritura — sem custo para si.",
    ctaPrimary: "Simular Crédito",
    ctaSecondary: "Como Funciona",
  },
  // B2B
  b2b: {
    headlineStart: "O crédito dos seus clientes, ",
    headlineHighlight: "resolvido.",
    subheading: "Tratamos de todo o processo de financiamento dos seus clientes — comparação bancária, documentação e acompanhamento até à escritura. Mais negócios fechados, menos burocracia para a sua equipa.",
    ctaPrimary: "Tornar-se Parceiro",
    ctaSecondary: "Como Funciona a Parceria",
  },
  // Shared keys
  scroll: "Descer",
},
```

**Step 2: Add B2C/B2B services keys for PT**

```typescript
services: {
  b2c: {
    eyebrow: "OS NOSSOS SERVIÇOS",
    headline: "Como simplificamos o seu crédito",
    subheading: "Do primeiro contacto à escritura, tratamos de tudo para que se foque no que importa — encontrar a sua casa.",
  },
  b2b: {
    eyebrow: "O QUE FAZEMOS PELOS SEUS CLIENTES",
    headline: "Tratamos do crédito para que feche mais negócios",
    subheading: "Acompanhamento completo do financiamento dos seus clientes — comparação de ofertas, gestão documental e negociação bancária. Sem custo direto para o comprador.",
  },
  // Service card titles/descriptions stay shared (they describe the actual service)
  // ... existing card keys ...
},
```

**Step 3: Add B2C/B2B process keys for PT**

```typescript
process: {
  b2c: {
    eyebrow: "O PROCESSO",
    headline: "Como Funciona",
  },
  b2b: {
    eyebrow: "PARCERIA",
    headline: "Como Funciona a Parceria",
  },
  // Step titles/descriptions — B2C versions
  b2cSteps: {
    step1Title: "Contacto Inicial",
    step1Desc: "Contacte-nos para uma avaliação gratuita da sua capacidade de financiamento. Respondemos em 24-48 horas.",
    step1Highlight: "Saiba quanto pode financiar sem compromisso.",
    step2Title: "Análise & Simulação",
    step2Desc: "Avaliamos o seu perfil e apresentamos cenários claros com orçamento, entrada necessária e cronograma.",
    step2Highlight: "Receba propostas de múltiplos bancos sem sair de casa.",
    step3Title: "Pré-Aprovação",
    step3Desc: "Submetemos o seu pedido aos bancos parceiros e negociamos as melhores condições para o seu caso.",
    step3Highlight: "Tratamos de tudo com os bancos por si.",
    step4Title: "Formalização",
    step4Desc: "Organizamos toda a documentação necessária e coordenamos com advogados, notários e bancos.",
    step4Highlight: "Zero burocracia para si.",
    step5Title: "Escritura",
    step5Desc: "Acompanhamos até à assinatura da escritura e apoiamos nos passos pós-conclusão.",
    step5Highlight: "Estamos consigo até ao fim.",
  },
  // Step titles/descriptions — B2B versions
  b2bSteps: {
    step1Title: "Indique o Cliente",
    step1Desc: "Encaminhe-nos o seu cliente — fazemos contacto em 24-48 horas e mantemo-lo informado.",
    step1Highlight: "Processo simples de referência.",
    step2Title: "Análise & Simulação",
    step2Desc: "Avaliamos o perfil do cliente e apresentamos cenários claros com orçamento, entrada necessária e cronograma.",
    step2Highlight: "Comparamos múltiplas ofertas bancárias lado a lado para o seu cliente.",
    step3Title: "Pré-Aprovação",
    step3Desc: "Submetemos aos bancos parceiros e negociamos as melhores condições — o seu cliente não precisa de fazer nada.",
    step3Highlight: "O seu cliente recebe propostas — você foca-se na venda.",
    step4Title: "Formalização",
    step4Desc: "Gerimos toda a documentação e coordenamos com todas as partes — bancos, advogados, notários.",
    step4Highlight: "A sua equipa não perde tempo com burocracia.",
    step5Title: "Fecho do Negócio",
    step5Desc: "Acompanhamos até à escritura. O crédito fica resolvido, o negócio fecha-se.",
    step5Highlight: "Mais um negócio fechado em parceria.",
  },
},
```

**Step 4: Add B2C/B2B stickyBar keys**

```typescript
stickyBar: {
  b2c: {
    text: "Simulação gratuita em 24h — sem compromisso",
    cta: "Simular Agora",
  },
  b2b: {
    text: "Parceria sem custos — mais negócios para a sua empresa",
    cta: "Tornar-se Parceiro",
  },
},
```

**Step 5: Add audience toggle keys**

```typescript
audienceToggle: {
  client: "Particular",
  partner: "Parceiro",
},
```

**Step 6: Mirror the same structure for EN** (EN is always B2C, so b2b keys can be same as b2c or omitted — components will only read b2c for EN)

**Step 7: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add audience-specific translation keys for hero, services, process, stickyBar"
```

---

### Task 4: Add audience pill toggle to Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Add the toggle component**

Before the language switcher (desktop), add:

```tsx
{isPt && (
  <div className="flex items-center bg-white/10 rounded-full p-0.5 text-xs">
    <button
      onClick={() => setAudience("client")}
      className={`px-3 py-1 rounded-full transition-all duration-300 ${
        audience === "client"
          ? "bg-white text-brand-900 font-semibold"
          : "text-white/60 hover:text-white/80"
      }`}
    >
      {t.audienceToggle.client}
    </button>
    <button
      onClick={() => setAudience("partner")}
      className={`px-3 py-1 rounded-full transition-all duration-300 ${
        audience === "partner"
          ? "bg-white text-brand-900 font-semibold"
          : "text-white/60 hover:text-white/80"
      }`}
    >
      {t.audienceToggle.partner}
    </button>
  </div>
)}
```

**Step 2: Import useAudience in Navbar**

```tsx
import { useAudience } from "@/lib/AudienceContext";
// Inside component:
const { audience, setAudience } = useAudience();
```

**Step 3: Add toggle to mobile menu too**

Add the same pill toggle inside the mobile menu, above the nav links.

**Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add audience pill toggle to navbar (PT only)"
```

---

### Task 5: Update Hero for audience-aware content

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Read audience from context**

```tsx
const { audience } = useAudience();
const isPartner = audience === "partner";
```

**Step 2: Replace static hero text with audience-conditional**

```tsx
const heroContent = isPt
  ? (isPartner ? t.hero.b2b : t.hero.b2c)
  : t.hero.b2c; // EN always B2C
```

Use `heroContent.headlineStart`, `heroContent.headlineHighlight`, `heroContent.subheading`, `heroContent.ctaPrimary`.

**Step 3: Wrap content in AnimatePresence for crossfade**

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={audience}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* headline, subheading, CTA */}
  </motion.div>
</AnimatePresence>
```

**Step 4: Remove old audience selector buttons from hero**

Delete the "Sou Particular" / "Sou Parceiro / Empresa" button section entirely — the nav toggle replaces this.

**Step 5: Update floating card**

- B2C: "€0 — Sem custo para si"
- B2B: "10+ — Bancos parceiros"

**Step 6: Update CTA scroll targets**

- B2C CTA scrolls to `#pre-qualification`
- B2B CTA scrolls to `#contact`

**Step 7: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: audience-aware hero with crossfade transitions"
```

---

### Task 6: Update Services for audience-aware headers

**Files:**
- Modify: `src/components/Services.tsx`

**Step 1: Read audience, select content**

```tsx
const { audience } = useAudience();
const isPartner = audience === "partner";
const sectionContent = isPt
  ? (isPartner ? t.services.b2b : t.services.b2c)
  : t.services.b2c;
```

**Step 2: Replace static eyebrow, headline, subheading with sectionContent**

Wrap in AnimatePresence with `key={audience}` for crossfade.

**Step 3: Commit**

```bash
git add src/components/Services.tsx
git commit -m "feat: audience-aware services section headers"
```

---

### Task 7: Update Process for audience-aware content

**Files:**
- Modify: `src/components/Process.tsx`

**Step 1: Read audience, select header and steps**

```tsx
const { audience } = useAudience();
const isPartner = audience === "partner";
const processHeader = isPt
  ? (isPartner ? t.process.b2b : t.process.b2c)
  : t.process.b2c;
const steps = isPt
  ? (isPartner ? t.process.b2bSteps : t.process.b2cSteps)
  : t.process.b2cSteps;
```

**Step 2: Replace static header text and step descriptions**

Map step keys to existing step structure. Wrap header in AnimatePresence.

**Step 3: Commit**

```bash
git add src/components/Process.tsx
git commit -m "feat: audience-aware process section with B2C/B2B step copy"
```

---

### Task 8: Update StickyBar for audience-aware content

**Files:**
- Modify: `src/components/StickyBar.tsx`

**Step 1: Read audience, select content**

```tsx
const { audience } = useAudience();
const isPartner = audience === "partner";
const barContent = isPt
  ? (isPartner ? t.stickyBar.b2b : t.stickyBar.b2c)
  : t.stickyBar.b2c;
```

**Step 2: Replace text and CTA**

- Text: `barContent.text`
- CTA: `barContent.cta`
- CTA scroll target: B2C → `#pre-qualification`, B2B → `#contact`

**Step 3: Commit**

```bash
git add src/components/StickyBar.tsx
git commit -m "feat: audience-aware sticky bar"
```

---

### Task 9: Soften PreQualification fail screen

**Files:**
- Modify: `src/components/PreQualification.tsx`

**Step 1: Change fail screen copy**

Replace hard fail message with soft version:

```tsx
// Old: "Infelizmente, não cumpre os critérios" (or similar)
// New:
<h3>"A sua situação pode ter soluções."</h3>
<p>"Embora não cumpra todos os critérios padrão, cada caso é único. Preencha o formulário e a nossa equipa analisa pessoalmente as suas opções."</p>
```

**Step 2: Change fail CTA to proceed to CreditForm instead of Contact**

```tsx
// Old: onFail() → setAudience("partner") → scroll to #contact
// New:
<button onClick={onQualified}>
  "Avançar para Formulário"
</button>
```

Remove the `onFail` callback entirely — both pass and fail lead to the credit form.

**Step 3: Add a "qualified" flag to the form data**

Pass `preQualified: false` to CreditForm when the user failed, so the lead in Notion can be tagged differently.

**Step 4: Update page.tsx**

Remove the `onFail` handler that switched audience. PreQual now only calls `onQualified`.

**Step 5: Commit**

```bash
git add src/components/PreQualification.tsx src/app/page.tsx
git commit -m "feat: soften pre-qualification fail — everyone proceeds to form"
```

---

### Task 10: Update page.tsx conditional rendering

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Simplify the B2C/B2B section rendering**

```tsx
const { audience } = useAudience();
const isPartner = audience === "partner";

// Bottom funnel
{!isPartner && (
  <>
    <PreQualification onQualified={() => setQualified(true)} />
    <CreditForm visible={qualified} />
  </>
)}
{isPartner && <Contact />}
```

Remove the old `showB2C` / `showB2B` logic that depended on language — EN users now always see B2C (PreQual → CreditForm).

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: simplify page rendering — audience context drives bottom funnel"
```

---

### Task 11: Build verification and cleanup

**Step 1: Run build**

```bash
npx next build
```

Expected: Clean build, no errors.

**Step 2: Manual testing checklist**

- [ ] PT: Page loads as B2C by default
- [ ] PT: Nav toggle switches to Parceiro — hero, services, process, stickyBar all update
- [ ] PT: Toggle back to Particular — everything reverts
- [ ] PT: B2C flow: Simulator → PreQual → pass → CreditForm
- [ ] PT: B2C flow: Simulator → PreQual → fail → soft message → CreditForm
- [ ] PT: B2B flow: "Tornar-se Parceiro" → Contact form
- [ ] EN: No toggle visible, always B2C
- [ ] EN: PreQual → CreditForm flow works
- [ ] Mobile: Toggle works in mobile menu
- [ ] Refresh: Audience persists via sessionStorage

**Step 3: Commit any fixes**

**Step 4: Final commit**

```bash
git commit -m "feat: audience flow redesign complete — B2C-first with partner toggle"
```

---

### Task 12: Push and deploy

**Step 1: Push feature branch**

```bash
git push -u origin feature/audience-flow-redesign
```

**Step 2: Create PR or merge to main after review**
