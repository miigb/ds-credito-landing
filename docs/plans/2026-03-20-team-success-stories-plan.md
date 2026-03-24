# Team Page + Homepage Preview — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/equipa` page with 6-person team grid + success stories bento, and a compact 3-person TeamPreview on the homepage.

**Architecture:** Data-driven approach — `teamData.ts` holds all member info, components consume it. New `/equipa` route reuses global layout (Navbar + Footer). Homepage gets a TeamPreview section between WhyUs and Contact.

**Tech Stack:** Next.js 14 App Router, React, Tailwind CSS, framer-motion, lucide-react, existing animation variants from `src/lib/animations.ts`.

---

### Task 1: Create team data source

**Files:**
- Create: `src/lib/teamData.ts`

**Step 1: Create the data file**

```ts
// src/lib/teamData.ts
export interface TeamMember {
  id: string;
  name: string;
  role: { pt: string; en: string };
  bio: { pt: string; en: string };
  photo: string;
  featured: boolean;
  linkedin?: string;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "paulo-brito",
    name: "Paulo Brito",
    role: {
      pt: "Founder / Agente de Intermediação",
      en: "Founder / Credit Intermediation Agent",
    },
    bio: {
      pt: "Mais de 20 anos de experiência em intermediação de crédito e solicitadoria. Fundador da Letraperfeiçoada e responsável pela estratégia e operações da DS Crédito Setúbal Vitória.",
      en: "Over 20 years of experience in credit intermediation and legal advisory. Founder of Letraperfeiçoada and head of strategy and operations at DS Crédito Setúbal Vitória.",
    },
    photo: "/team/paulo-brito.jpg",
    featured: true,
    order: 1,
  },
  {
    id: "patricia",
    name: "Patrícia",
    role: {
      pt: "Senior Agent / Sales Lead",
      en: "Senior Agent / Sales Lead",
    },
    bio: {
      pt: "Especialista em crédito habitação com foco em angariação e acompanhamento de clientes particulares. Responsável pela equipa comercial.",
      en: "Specialist in mortgage credit focused on client acquisition and support. Leads the commercial team.",
    },
    photo: "/team/patricia.jpg",
    featured: true,
    order: 2,
  },
  {
    id: "armanda-amorim",
    name: "Armanda Amorim",
    role: {
      pt: "Senior Agent / Partnership Program Lead",
      en: "Senior Agent / Partnership Program Lead",
    },
    bio: {
      pt: "Gestão do programa de parcerias com imobiliárias, mediadores e promotores. Responsável pela expansão da rede de parceiros B2B.",
      en: "Manages the partnership program with real estate agencies, brokers, and promoters. Drives B2B partner network expansion.",
    },
    photo: "/team/armanda-amorim.jpg",
    featured: true,
    order: 3,
  },
  {
    id: "agent-4",
    name: "A anunciar",
    role: {
      pt: "Credit Intermediation Agent",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 4,
  },
  {
    id: "agent-5",
    name: "A anunciar",
    role: {
      pt: "Credit Intermediation Agent",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 5,
  },
  {
    id: "agent-6",
    name: "A anunciar",
    role: {
      pt: "Credit Intermediation Agent",
      en: "Credit Intermediation Agent",
    },
    bio: {
      pt: "Em breve.",
      en: "Coming soon.",
    },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 6,
  },
];
```

**Step 2: Commit**

```bash
git add src/lib/teamData.ts
git commit -m "feat: add team member data source"
```

---

### Task 2: Add translation keys

**Files:**
- Modify: `src/lib/translations.ts`

**Step 1: Add team and success stories keys to both `en` and `pt` sections**

Add to `en`:
```ts
// Team
team: {
  eyebrow: "Our Team",
  headline: "The specialists behind your financing",
  headlineHighlight: "specialists",
  subheading: "A dedicated team of credit intermediation professionals committed to finding the best conditions for every client.",
  cta: "Meet the full team",
  bioLabel: "About",
},
// Success Stories
success: {
  eyebrow: "Results",
  headline: "Measured impact",
  headlineHighlight: "impact",
  subheading: "We don't just facilitate — we deliver measurable results for our clients and partners.",
  stat1Value: "98%",
  stat1Label: "Approval rate",
  stat2Value: "€2.4M+",
  stat2Label: "Financed in 2024",
  testimonial1Quote: "The process was incredibly smooth. They handled everything from documentation to bank negotiation — we just had to sign.",
  testimonial1Name: "Ana & Miguel S.",
  testimonial1Role: "First-time buyers, Setúbal",
  testimonial1Metric: "Approved in 12 days",
  testimonial2Quote: "Since partnering with DS Crédito, our conversion rate on financed deals has increased significantly. They close what we bring.",
  testimonial2Name: "Ricardo M.",
  testimonial2Role: "Real Estate Agency, Lisbon",
  testimonial3Quote: "As a non-resident, I expected complexity. They made it seamless — remote documentation, clear communication, and a great rate.",
  testimonial3Name: "James W.",
  testimonial3Role: "International buyer, UK",
  testimonial3Metric: "4.2x faster than expected",
  ctaHeadline: "Ready to get started?",
  ctaSubheading: "Talk to our team and find the best conditions for your financing.",
  ctaButton: "Contact us",
},
```

Add to `pt`:
```ts
team: {
  eyebrow: "A Nossa Equipa",
  headline: "Os especialistas por trás do seu crédito",
  headlineHighlight: "especialistas",
  subheading: "Uma equipa dedicada de profissionais de intermediação de crédito, empenhada em encontrar as melhores condições para cada cliente.",
  cta: "Conhecer toda a equipa",
  bioLabel: "Sobre",
},
success: {
  eyebrow: "Resultados",
  headline: "Impacto mensurável",
  headlineHighlight: "Impacto",
  subheading: "Não nos limitamos a facilitar — entregamos resultados concretos aos nossos clientes e parceiros.",
  stat1Value: "98%",
  stat1Label: "Taxa de aprovação",
  stat2Value: "€2.4M+",
  stat2Label: "Financiados em 2024",
  testimonial1Quote: "O processo foi incrivelmente simples. Trataram de tudo, desde a documentação à negociação bancária — só tivemos de assinar.",
  testimonial1Name: "Ana & Miguel S.",
  testimonial1Role: "Primeiros compradores, Setúbal",
  testimonial1Metric: "Aprovado em 12 dias",
  testimonial2Quote: "Desde que fazemos parceria com a DS Crédito, a nossa taxa de conversão em negócios financiados aumentou significativamente.",
  testimonial2Name: "Ricardo M.",
  testimonial2Role: "Agência imobiliária, Lisboa",
  testimonial3Quote: "Como não-residente, esperava complexidade. Tornaram tudo simples — documentação remota, comunicação clara e uma excelente taxa.",
  testimonial3Name: "James W.",
  testimonial3Role: "Comprador internacional, UK",
  testimonial3Metric: "4.2x mais rápido que o esperado",
  ctaHeadline: "Pronto para começar?",
  ctaSubheading: "Fale com a nossa equipa e encontre as melhores condições para o seu financiamento.",
  ctaButton: "Contacte-nos",
},
```

Also add nav key:
```ts
// In en.nav:
team: "Team",
// In pt.nav:
team: "Equipa",
```

**Step 2: Commit**

```bash
git add src/lib/translations.ts
git commit -m "feat: add team + success stories translation keys"
```

---

### Task 3: Create TeamPreview component (homepage)

**Files:**
- Create: `src/components/TeamPreview.tsx`

**Step 1: Build the component**

Pattern: Follow WhyUs.tsx structure — `"use client"`, framer-motion fadeUp/staggerContainer, useLanguage(), dark section with brand-900 bg.

Key elements:
- Dark bg section with accent glow orb (absolute positioned `bg-accent-700/10 blur-[120px]` circle)
- Eyebrow + headline (accent-highlighted word) + subheading
- 3 cards in a row (`grid grid-cols-1 md:grid-cols-3 gap-8`)
- Each card: `bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all group`
- Round photo: `w-24 h-24 rounded-full overflow-hidden bg-brand-700 grayscale group-hover:grayscale-0 transition-all duration-500`
- Placeholder initials fallback when no photo loads
- Name in `text-white font-bold`, role in `text-accent-400 text-sm font-semibold`
- CTA button: `bg-accent-700 text-white rounded-2xl` linking to `/equipa`
- Filter `teamMembers` by `featured: true`

**Step 2: Commit**

```bash
git add src/components/TeamPreview.tsx
git commit -m "feat: add TeamPreview homepage component"
```

---

### Task 4: Create TeamGrid component (/equipa page)

**Files:**
- Create: `src/components/TeamGrid.tsx`

**Step 1: Build the component**

Pattern: Same dark styling as TeamPreview but with all 6 members.

Key elements:
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Larger cards with bio text and LinkedIn icon
- Same grayscale→color hover on photos
- staggerContainer + fadeUp animations
- Only show non-TBD members, or show TBD with "Coming soon" styling (reduced opacity)

**Step 2: Commit**

```bash
git add src/components/TeamGrid.tsx
git commit -m "feat: add TeamGrid full component for /equipa"
```

---

### Task 5: Create SuccessStories component

**Files:**
- Create: `src/components/SuccessStories.tsx`

**Step 1: Build the component**

Asymmetric bento grid layout (12-col):
- Section bg: slight tonal shift from brand-900 (use `bg-brand-800` or `bg-[#0c1220]`)
- Accent glow orb background decoration

Grid structure:
```
Row 1: [Left 5/12: headline + stats] [Right 7/12: large testimonial]
Row 2: [Left 4/12: dark testimonial] [Right 8/12: metric + testimonial]
```

Left column:
- Eyebrow "RESULTADOS" + headline "Impacto mensurável" with accent highlight
- Two vault stats side by side: big number + label, with `accent-700/10 blur-[80px]` glow

Right large testimonial:
- `bg-white/5 rounded-xl p-10` card
- 5 star icons (use lucide Star with fill)
- Large italic quote text
- Initials avatar circle + name + role
- Metric badge at bottom

Dark testimonial (bottom left):
- `bg-brand-900 rounded-xl p-8` — darker card on slightly lighter section
- Small eyebrow category + quote + avatar

Metric card (bottom right):
- `bg-white/5 rounded-xl p-8` with big accent number + quote side by side

**Step 2: Commit**

```bash
git add src/components/SuccessStories.tsx
git commit -m "feat: add SuccessStories bento grid component"
```

---

### Task 6: Create /equipa page route

**Files:**
- Create: `src/app/equipa/page.tsx`

**Step 1: Build the page**

Pattern: Follow `src/app/privacidade/page.tsx` for route structure.

Page structure:
1. `Navbar` (shared)
2. Hero section — dark gradient bg (same as main Hero), eyebrow + headline + subtitle
3. `TeamGrid` component
4. `SuccessStories` component
5. CTA section — "Pronto para começar?" + button linking to `/#contact`
6. `Footer` (shared)

Wrap in `"use client"` since it uses useLanguage().

**Step 2: Commit**

```bash
git add src/app/equipa/page.tsx
git commit -m "feat: add /equipa team page route"
```

---

### Task 7: Wire TeamPreview into homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Import and insert TeamPreview**

Add `import TeamPreview from "@/components/TeamPreview";`

Insert `<TeamPreview />` after `<WhyUs />` and before the B2C/B2B conditional block:

```tsx
<WhyUs />
<TeamPreview />
{showB2C && (
  <PreQualification ... />
)}
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire TeamPreview into homepage"
```

---

### Task 8: Update Navbar with team link

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/lib/translations.ts` (already done in Task 2)

**Step 1: Add team link to navLinks array**

In `Navbar.tsx`, update the navLinks array to include team between whyUs and contact:

```ts
const navLinks = [
  { label: t.nav.about, href: "#about" },
  { label: t.nav.services, href: "#services" },
  { label: t.nav.process, href: "#process" },
  { label: t.nav.whyUs, href: "#why-us" },
  { label: t.nav.team, href: "/equipa" },
  { label: t.nav.contact, href: "#contact" },
];
```

Note: This is a page link (not anchor), so it navigates to `/equipa` instead of scrolling.

**Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Equipa/Team link to navbar"
```

---

### Task 9: Create placeholder team photos

**Files:**
- Create: `public/team/` directory
- Create placeholder images or use initials-based approach

**Step 1: Create directory and add SVG placeholder**

Create `public/team/` directory. Since real photos aren't available yet, the component should render initials (first letter of first + last name) in a colored circle as fallback. The `<img>` tag uses `onError` to hide itself and show the initials div.

No actual image files needed — the component handles missing photos gracefully.

**Step 2: Commit**

```bash
git add public/team/.gitkeep
git commit -m "feat: add team photos directory with placeholder support"
```

---

### Task 10: Also commit the Hero.tsx fix from earlier

**Files:**
- Modified: `src/components/Hero.tsx` (the "Comparamos ofertas" text change)

**Step 1: Commit the pending change**

```bash
git add src/components/Hero.tsx
git commit -m "fix: update bank partners copy to 'Comparamos ofertas de múltiplos bancos parceiros'"
```

---

### Task 11: Verify everything works

**Step 1: Run dev server and verify**

```bash
npm run dev
```

Check:
- Homepage: TeamPreview section visible between WhyUs and Contact
- TeamPreview shows 3 featured members with initials avatars
- "Conhecer toda a equipa" button links to /equipa
- /equipa page: full team grid (6 members), success stories bento, CTA
- Navbar has "Equipa"/"Team" link
- Language switching works on both pages
- Mobile responsive layout works
- No console errors

**Step 2: Run build**

```bash
npm run build
```

Ensure no TypeScript errors or build failures.

**Step 3: Commit any fixes**

```bash
git commit -m "fix: address build/lint issues"
```
