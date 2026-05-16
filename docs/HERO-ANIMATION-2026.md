# Hero Animation 2026 — "Amanhecer" (Sunrise)

Canonical spec for the cinematic hero. Built for SCREEN-RECORD-TO-VIDEO and as the
landing hero. Branch: `feature/rebrand-2026-sunrise`. Hardened against `impeccable`,
`web-presentation-polish`, and `animate` skill principles.

## Intent

One signature moment: a real sun **rises** out of darkness. The ascent IS the
explanation of the credit journey — each process step lights up as the sun crosses
its band. Darkness → dawn = the client's financial turnaround. The glow reproduces
the **physical backlit office signage** (`public/brand-2026/reference/office-signage.jpeg`)
— it is purposeful light, not decorative dark-mode glow.

## Why dark (derived, not default)

The deliverable is a cinematic video whose entire meaning is darkness→light; the mark
is a sun that needs night to rise from; the glow recreates the real backlit sign.
Theme is derived from use-case + narrative, per `impeccable` theme-selection.

## Stage

- Fixed **1920×1080**; all sizing in **vh/vw** relative to the stage (resolution-
  independent for video export). Hairlines/1px borders stay px.
- Base near-black `#1D1D1B` (never `#000`). The "night sky" is **never flat**: layer
  warm radial depth bleeding up from the horizon + dot texture ~4% opacity + subtle
  grain. Horizon line ~62% down.
- Top-left: small static sun mark. Top-right: thin UPPERCASE Montserrat
  `INTERMEDIÁRIOS DE CRÉDITO · BANCO DE PORTUGAL Nº 0007470` + faint ticking
  `REC 00:00:00`.

## Timeline (~10–12s, autoplay, deterministic, seamless loop)

| t | Beat |
|---|------|
| 0–1s | **Pre-dawn.** Near-darkness; only a faint warm bleed rising behind the horizon. |
| 1–9s | **THE RISE.** The sun disc emerges from beneath the horizon and travels UP in one unbroken vertical motion (long slow ease, never pauses). Rays extend from the disc as it climbs (7.5° increments, longer with altitude); warm bloom expands reproducing the backlit sign; sky warms subtly toward the horizon. |
| ~2–4s | **Headline** (synced to first light): giant BrownSugar headline reveals line-by-line as the glow reaches it. One clause emphasised in **solid Ember Gold** (NO gradient text). PT, 3 short editorial lines, e.g. `O seu crédito` / `merece um` / `novo amanhecer.` (refine for impact). |
| ~3–9s | **Process** (synced to altitude): the rising sun IS the progress indicator. Each of the 5 real steps lights up when the sun crosses its band — `01 Contacto Inicial → 02 Análise & Simulação → 03 Pré-Aprovação → 04 Formalização → 05 Escritura`. Row = number in Bronze + title in warm-white Montserrat + 1px hairline rule. NO side-stripe borders, not a stat-card template. |
| 9–11s | **Crest.** Sun reaches peak, fully risen and glowing; motion eases to rest (ease-out-quint); LETRAPERFEIÇOADA wordmark + tagline fade up locked-up. Final **hold** = polished still poster. Loop seamlessly back to pre-dawn. |

## Motion rules

- Animate the **arrival** (the rise), then content is **STILL** — no idle/competing
  micro-animations after the crest. Only the atmospheric sky may breathe subtly.
- Transform/opacity only; GPU; `will-change` sparingly; 60fps.
- Easing: ascent = long gentle ease (slow start, slow settle); reveals =
  `cubic-bezier(0.25,1,0.5,1)`; settle = `cubic-bezier(0.22,1,0.36,1)`.
  **Never** bounce/elastic.
- Stagger 120ms. `prefers-reduced-motion` → render the final poster frame statically.

## Type & colour (see BRAND-2026.md / .impeccable.md)

- Display = BrownSugar (self-hosted, pending licensed file). Interim fallback = a warm
  high-contrast display serif that is **NOT** Fraunces/Playfair/Cormorant/Inter —
  use `Yeseva One`, `Gilda Display`, or `Marcellus`. Body/labels = Montserrat
  (brand-mandated). Scale ≥1.3 ratio; light-on-dark +0.06 line-height.
- Palette in OKLCH; Ember Gold `#F39200` is THE single accent; Sun Gold `#FFEF26`
  + Bronze `#A07214` are its family. 60-30-10. Tint neutrals toward gold.

## Alternative directions (generate for comparison)

(a) kinetic-list version above; (b) cinematic golden-hour photo backdrop (manual's
mood frame) with the rising sun-mark over a scrim; (c) ultra-minimal type-only — a
single hairline sun rising behind one enormous BrownSugar line, no list.
