# LETRAPERFEIÇOADA — Brand 2026 ("Sunrise / Amanhecer")

Distilled from `Style Guide 2026/MANUAL DE NORMAS.pdf` (13pp, agency: Particula Digital).
This is the source of truth for the 2026 rebrand on branch `feature/rebrand-2026-sunrise`.

## 1. The shift (what changes)

The brand moves from the old **"Midnight Curator"** identity (cosmic deep-purple `#0F172A`
base + magenta/pink `#A30F4F` accent, Inter only) to **"Sunrise / Amanhecer"**: a warm,
human, optimistic identity built around a **rising-sun mark with radiating rays**.

Narrative: credit intermediation as **a new dawn** for the client's financial life — the
moment things turn around. Warm, hopeful, premium-but-accessible. NOT cold/fintech.

## 2. Logo

- **Mark:** half-sun on a horizon line, radiating rays at **7.5° increments** (0°–90°),
  radial gold→ember gradient. Provided as a single complex SVG path.
- **Wordmark:** `LETRAPERFEIÇOADA` in **BrownSugar Regular** — an elegant, high-contrast
  display serif (titles only).
- **Tagline:** `INTERMEDIÁRIOS DE CRÉDITO` in **Montserrat Bold**, uppercase,
  wide letter-spacing.
- **Construction (golden ratio):** wordmark width : sun height = **2.618 : 1**;
  total height (rays→baseline) = **1.618 H**; clear space = height of the sun mark;
  corner radius R = 0.5X; 12-col grid, 32px gutter, 56px margin, 8px baseline.
- **Lockups:** principal (sun over wordmark), horizontal (sun left), icon only, 1-color.

## 3. Color palette — "5 cores para utilizar"

| Name | HEX | RGB | Role |
|------|-----|-----|------|
| **Sun Gold** | `#FFEF26` | 255 239 38 | Brightest highlight — ray tips, energy, accents |
| **Ember Gold** | `#F39200` | 243 146 0 | **Primary brand color** — sun core, CTAs, key UI |
| **Dark Grey** | `#575756` | 87 87 86 | Body text, neutral foreground |
| **Light Grey** | `#C6C6C6` | 198 198 198 | Muted/secondary, borders |
| **Bronze** | `#A07214` | 160 114 20 | Deep premium accent, gradient depth |
| Pure Black | `#1D1D1B` | 29 29 27 | 1-color version / deep backgrounds (never `#000`) |
| White | `#FFFFFF` | 255 255 255 | Light base |

Sun gradient (from `icon-sol.svg`): `#FFEF26 → #FDC800 → #F18F34` (radial).

Backgrounds are **WHITE or near-BLACK** (`#1D1D1B`), not purple. The signature is the
warm gold *glow* (see office signage reference — backlit sun on white wall).

## 4. Typography

- **Display / titles only:** **BrownSugar Regular** — locked as the display face,
  to be **self-hosted via `next/font/local`**. ⚠️ The font file did NOT ship with the
  Style Guide 2026 assets and is a commercial face (Måns Grebäck "Brown Sugar" —
  commercial use requires a paid license). **Pending: user supplies a licensed
  `.woff2`/`.otf`/`.ttf`.** Until it lands, use **`Fraunces`** (Google) as the
  documented dev fallback so design work is not blocked; swap when the file arrives.
- **Everything else:** `Montserrat` (Google Fonts) — Bold for labels/tagline (uppercase,
  `tracking-[0.2em]+`), Regular/Medium for body.
- Identity lens preserved: massive display headline vs tiny wide-tracked uppercase labels.

## 5. System principles (from manual)

1. **Clarity** — every element communicates with purpose.
2. **Consistency** — one system, many expressions, always aligned.
3. **Accessibility** — designed for all, every investor included.
4. **Elevation** — premium in detail, simple in application.
5. **Endurance** — built to last, adaptable to every future.

Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 px. 8px baseline grid.

## 6. Iconography

Line-icon family on the sun/ray motif: dawn, possibility, growth, protection, progress,
investment, support (sun-in-hand), guidance (compass star), community, trust (handshake),
credit (document), solidity (columns), renewal (circular arrows), focus (target),
clarity (sunburst), reach (pin). Plus a **ray-pattern library** (6 sunburst variants) and
a stroke library (hairline→thick, dotted, double, terminated, arrow) — all in gold.

## 7. Photography / mood

"Tons de imagem quentes e humanizar a comunicação" — **warm golden-hour tones**, real
people, contemplative/hopeful. Reference: person at a window in warm backlight holding a
mug. No cold stock fintech imagery.

## 8. Asset map (`public/brand-2026/`)

- `svg/logo-principal.svg`, `svg/logo-horizontal-light.svg`, `svg/logo-horizontal-dark.svg`,
  `svg/icon-sol.svg`, `svg/var-light-1..4.svg`, `svg/var-dark-1..4.svg`
- `png/*@4x.png` — retina raster fallbacks
- `reference/MANUAL-DE-NORMAS.pdf` — full 13-page norms manual
- `reference/office-signage.jpeg` — backlit logo in context (glow reference)

## 9. Codebase migration delta

Current tokens live in `src/app/globals.css` `@theme`:
- `--color-brand-*` (slate `#0F172A`…) → remap to warm neutral (near-black `#1D1D1B`,
  greys `#575756` / `#C6C6C6`, warm off-white).
- `--color-accent-*` (magenta `#A30F4F`…) → **gold/ember/bronze** ramp around
  `#F39200` (primary), `#FFEF26` (highlight), `#A07214` (bronze depth).
- `.text-gradient` / `.bg-hero-gradient` → re-tint to sun gradient
  (`#FFEF26 → #F39200 → #A07214`), drop the purple stops.
- Add a display font (`Fraunces`/BrownSugar) alongside Inter→Montserrat for body.
- Glass/glow effects keep their structure but tint glows **warm gold**, not magenta.
