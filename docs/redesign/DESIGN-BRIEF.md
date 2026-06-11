# Amanhecer 2026 — Landing Page Reinvention · Design Brief & Build Spec

Branch: `redesign/amanhecer-2026` (worktree `.claude/worktrees/redesign-amanhecer`). Main is untouched.

**Mission:** re-invent meuintermediario.com on the Amanhecer 2026 brand. Same copy, same
functionality, award-grade visual craft. Two complete design directions + logo variations,
all switchable live via a prototype control panel (removed before production).

---

## 0. Hard constraints (NEVER violate)

1. **Copy is immutable.** Every user-visible string comes from `t` (`useLanguage()`) exactly as
   the old component used it, or stays as the same hardcoded `isPt` ternary. No paraphrasing.
2. **Functionality is immutable.** Form endpoints (Web3Forms POST + `/api/lead` + `/api/auto-reply`),
   wizard qualification logic (q1–q4 fail paths), MiniSimulator math + sessionStorage handoff,
   `track()` analytics events (same names + payloads), section `id`s (`about`, `services`,
   `process`, `why-us`, `team`, `pre-qualification`, `contact`), audience/language context
   behavior, smooth-scroll targets, CookieConsent localStorage key.
3. **Footer regulatory paragraph verbatim** — BdP registo n.º 0007470, the 3 authorized services
   (i)-(iii), "Serviços de Consultoria: SIM" (não bold), credit types, 10 mutuantes, Livro de
   Reclamações + bportugal.pt links, ANICA badge. Copy it character-for-character from the old Footer.
4. **Brand rules:** Brown Sugar = logo wordmark only. Sun Gold `#FFEF26` = logo sun-mark only —
   UI bright highlight is Amber `accent-400`. No gradient text. Never `#000` (use `#1D1D1B`).
   Never reintroduce "DS Crédito". Montserrat for 100% of UI text.
5. **Every animation honours `prefers-reduced-motion`** (final state rendered instantly).
   Entrance reveals use `whileInView` + `viewport={{ once: true }}`.
6. **`"use client"`** on every component using hooks/framer-motion.

## 1. Design tokens (already in `globals.css` — use ONLY these)

Canonical Amanhecer `@theme` (validated in ds-leads-crm): `brand-900 #1D1D1B` (ink) →
`brand-50 #FAF7F2` (paper); `accent-700 #F39200` (Ember — PRIMARY); `accent-400 ≈ #FFB100`
(Amber highlight); `gold-300 #A07214` (Bronze); aliases `ember/bronze/paper/ink`.
Utilities provided: `.bg-hero-gradient` (warm ink→ember 160deg), `.bg-dawn-radial`
(sun rising from the fold), `.bg-section-gradient` (paper), `.grain` (film grain overlay),
`.glass-warm` (sticky chrome only), `.text-balance`.

**Color discipline:** ember is *light*, not paint — glows, thin rules, big display numbers,
CTAs only. Body text: `text-brand-500` on paper / `text-brand-50/60` on ink. Ember on paper
only for ≥ text-2xl (contrast). Bronze for chips/captions on paper.

## 2. Typography

- Montserrat via `next/font/google` → `--font-sans` (weights 300–900, variable).
- Brown Sugar via `next/font/local` → `--font-logo` (`public/fonts/Brown-Sugar-Regular.woff2`) — Logo component only.
- Scale: hero `clamp(2.75rem, 7.5vw, 7rem)` w-700/800 tracking-tight leading-[0.98];
  section h2 `text-4xl lg:text-6xl` w-700 tracking-tight; eyebrow `text-xs lg:text-sm` w-600
  `tracking-[0.3em]` uppercase (amber on ink, bronze on paper); body `text-base/lg`;
  display numbers w-800 `tabular-nums` tracking-tight.
- The luxury-magazine contrast (massive display ↔ tiny wide-tracked labels) is the identity lens.
- Headline reveals: `<RevealText>` (line-mask rise) — never per-letter confetti.

## 3. The two directions (live-switchable)

`usePrototype()` → `{ direction }`: `"cinema" | "editorial"`. Components branch on it for
canvas/tone; inner layout + logic stay shared. Think of them as two art directions of one film.

### Direction A — "Cinema" (golden-hour dark)
Narrative: the page IS a sunrise. Opens near-black, ends in light.
- Hero: full-bleed `MeshHero` (paper-shaders MeshGradient, dark palette
  `['#1D1D1B','#2c2012','#8a6116','#D9820E','#C98A2E']`, speed 0.28, opacity ~0.62, radial scrim),
  giant white type, line-mask reveal. No stock photos — type + light.
- Section rhythm: ink → ink (`brand-800` tonal lift) → **gradually warming** (deep amber-tinted
  surfaces) → paper sections (Services/Process light) → ink again (Team) → Wizard on
  `bg-dawn-radial` → Contact ink → Footer = horizon finale (`bg-hero-gradient` + sun arc).
- Surfaces: tonal cards `bg-white/[0.04]`→`white/[0.08]` hover, no glass except sticky nav.
- Mood: Mercury/Jeton restraint. Light type weights at scale on dark.

### Direction B — "Editorial" (warm paper daylight)
Narrative: a premium financial magazine printed on warm paper, lit by morning sun.
- Hero: `bg-paper` with `bg-dawn-radial` (large matte ember radial rising from the fold),
  enormous ink headline (mixed w-300/w-800 within the same line), thin bronze rules,
  sun-path diagonal accents, grain.
- Section rhythm: paper → white card sections → **one** ink chapter (WhyUs or Team) for
  contrast → Wizard on white w/ ember halo → Contact ink → same Footer finale.
- Surfaces: white cards on alabaster (`#F2ECE3`), warm shadows (6% ink, 30–50px blur),
  bronze editorial chips (`bg-[#FFF7E6] text-[#A07214]`).
- Mood: Daylight Computer × Robinhood editorial. Sun-cast, calm, tactile.

### Shared motion language
Lenis smooth scroll (root). Framer Motion only. Ease `[0.25, 0.4, 0.25, 1]`, 0.6–0.8s.
Scroll-scrub parallax via `useScroll`+`useTransform` (subtle: ≤80px). One signature moment:
the **footer sun-arc draw** (RayBurst pathLength animation) — nowhere else; micro-interactions
stay gentle and one-shot. Grain overlay global at ~3% opacity (`.grain`, pointer-events-none).

## 4. Logo system (live-switchable variants)

`usePrototype()` → `{ logoVariant }`: rendered by `<Logo variant tone size />`
(`src/components/brand/Logo.tsx`):
1. `oficial` — Particula horizontal lockup SVG (gradient sun), auto dark/light file.
2. `sol-mont` — official gradient sun icon + Montserrat wordmark `LETRA`(w-800)`PERFEIÇOADA`(w-300)
   `tracking-[0.18em]` + tagline `INTERMEDIÁRIOS DE CRÉDITO` `tracking-[0.3em]` 9px.
3. `monoline` — redesigned: stroke-only half-sun + rays (currentColor, RayBurst geometry)
   + same Montserrat wordmark. Adapts to any surface; the most "new".
4. `assinatura` — Brown Sugar live-text "Letraperfeiçoada" (lowercase, the licensed face)
   + small flat ember sun mark. The warmest, most personal take.
Footer/hero use stacked counterparts (`logo-principal.svg` / `var-dark-1.svg` for oficial).

## 5. Prototype control panel (REMOVE BEFORE PRODUCTION)

`src/components/proto/ControlPanel.tsx`, mounted once in `layout.tsx`, floating bottom-left,
collapsible. Controls: direction (Cinema/Editorial), logoVariant (4), grain on/off,
audience + language quick-switch (mirrors existing setters — for review convenience).
State in `PrototypeContext` (localStorage-persisted). Everything prototype-scoped lives under
`src/components/proto/` + `src/lib/PrototypeContext.tsx` so removal = delete 2 paths + 1 mount line.

## 6. Per-section art direction (build agents: read your section, keep ALL logic)

- **Navbar:** transparent → `.glass-warm` after 40px. `<Logo>` replaces old img+span. Links,
  audience pill, language dropdown, CTA — same behavior; pill/CTA re-skinned ember.
  Mobile panel = ink surface, paper text, big type.
- **StickyBar:** same trigger (0.85vh); ink bar, amber accent, ember CTA pill.
- **Hero:** two treatments (§3). Both keep: eyebrow pill, audience-switched headline/sub/CTAs,
  10+ banks line, MiniSimulator (client), BdP + ANICA + €0 badges (restyled as editorial
  footnote chips, ANICA logo png kept), scroll cue, `hero_cta` tracking. Drop villa/penthouse
  photos and TubesCursor/FX button.
- **BankPartnersScroll:** keep dual marquee + logos; Cinema: ink band, logos soft-light;
  Editorial: paper band, grayscale→color hover. Edge fades match canvas.
- **Stats:** numbers are the heroes — display-XL count-ups (`tabular-nums`), thin bronze rules
  between, growth pill amber, ANICA link. Asymmetric editorial grid, not 4 equal cards.
- **Services:** 6 cards → editorial grid (varying spans ok). Replace lucide icons with
  `<BrandIcon>` line icons (credit, guidance, trust, progress, protection, clarity ↔ map
  sensibly to the 6 services). Dark intl sub-panel becomes warm-ink panel w/ amber chips.
- **VideoShowcase (B2B):** keep all video logic (hover-play, mute, fallback); frame it as a
  cinema screen — ink surround, thin ember rule, oversized eyebrow.
- **Process:** the scroll-telling centerpiece. 5 steps as sticky-stacked chapters or
  scroll-progress timeline (ember progress line, step photos warm-graded `sepia/saturate`
  CSS filter, oversized step numerals 01–05). Keep step photos `/process/step-0{1..5}.jpg`.
- **WhyUs:** two-track layout (biz vs clients) → contrasting editorial spreads
  (Cinema: two tonal panels; Editorial: white + ink panels). Checkmarks → tiny ray glyphs.
- **TeamPreview:** keep 3 members + grayscale→color hover + initials fallback; add warm
  duotone treatment, oversized section type, link to `/equipa`.
- **MiniSimulator:** minimal instrument — thin sliders w/ ember thumb, live € value
  `tabular-nums`, result state = small "dawn ticket" (ray-top edge). Same teaser logic.
- **CreditWizard:** same 7 steps/logic/validation. Re-skin: one question per view feel,
  progress = rising sun arc (fraction fills ember), option cards w/ amber selected ring,
  success = **golden ticket artifact** (ink card, ember sun arc, reference-style layout) —
  screenshot-worthy. Error states unchanged in behavior.
- **Contact:** same fields/consent/endpoints. Split editorial: oversized "Fale connosco"
  type-block left + address/phone/email as type list (no map iframe → replace with a static
  styled address block linking to Google Maps, keeps CSP slim), form right on tonal surface.
- **Footer:** the finale. Oversized contact type, hover-glow links, RayBurst sun-arc draw
  (signature moment, whileInView once), then the verbatim regulatory paragraph as a
  well-typeset editorial footnote, socials, ANICA, legal links. `bg-hero-gradient` horizon.
- **CookieConsent:** same key/logic; ink card, paper text, ember accept.
- **/equipa + [slug]:** tokens carry the re-skin; update PWA manifest colors
  (`#1D1D1B` bg / `#F39200` theme), QR logo → `/brand-2026/png/icon-sol@4x.png` if legible,
  keep all card actions.

## 7. Tech additions

`lenis` (smooth scroll, `<ReactLenis root>`), `@paper-design/shaders-react` (MeshGradient hero,
dynamic import `ssr:false`, CSS gradient fallback). Both local — **no CSP changes needed**.
No GSAP, no three.js, no Remotion at runtime. framer-motion v12 stays the only motion lib.

## 8. Quality bar (jury table stakes)

Hero text = real HTML (LCP), shader behind it never blocks paint. CLS 0 (reserve space).
WCAG AA: ember never used for body-size text on paper; ink on paper / paper on ink only.
Mobile-first: every section composed for 390px before desktop. `npm run build` must pass.
