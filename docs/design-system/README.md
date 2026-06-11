# Amanhecer 2026 — Portable Design System

The design language extracted from the Letraperfeiçoada landing-page redesign
("Amanhecer 2026" — *dawn*). Everything here is self-contained and
copy-pasteable into any other project: web apps, internal tools, marketing
display panels, slide decks / web presentations, email templates.

**The feeling in one line:** a sunrise over a calm horizon — warm, solid,
ascendant. Trust-first warmth, never fintech-neon, never corporate-cold.

## Files

| File | What it gives you |
|---|---|
| [01-tokens.md](01-tokens.md) | Color ramps, semantic aliases, typography scale, spacing rhythm, radii grammar, shadows |
| [02-rules.md](02-rules.md) | The non-negotiable laws + the verified contrast table (what passes AA on ink and on paper) |
| [03-components.md](03-components.md) | Exact recipes: buttons, badges, nav chrome, cards, section headers, stats ranks, form controls |
| [04-overlays.md](04-overlays.md) | Backgrounds & overlays: dawn radials, video scrims, warm glass, grain, masks, photo grading |
| [05-motion.md](05-motion.md) | Motion vocabulary: easing, durations, reveals, count-ups, glimmer, carousel and pinned-deck patterns |
| [06-hero-prompts.md](06-hero-prompts.md) | Five full, transferable prompts for the hero treatments (video ambient, tonal glass, HLS stream, slide deck, mesh shader) |

## How to apply this to a new project

1. **Tokens first.** Copy the `@theme` block from 01 into the project's CSS
   (Tailwind 4) or translate to your platform's token format (Figma variables,
   PPTX theme colors, CSS custom properties). Never re-derive values by eye.
2. **Read the rules (02) before designing anything.** Most of them exist
   because the obvious alternative failed in production review.
3. **Compose from recipes (03 + 04).** Components carry exact class strings —
   adapt naming, keep the numbers.
4. **Add motion last (05).** The system reads calm without animation; motion
   is seasoning, not structure.
5. **Hero prompts (06)** are written to be pasted into any build context —
   each declares its ingredients, its parameters in `[BRACKETS]`, and its
   known traps.

## Adapting per medium

- **Web app / tool** — use everything as-is; the tokens are Tailwind-4 ready.
- **Presentation / slide deck** — use the Slides-deck hero prompt (06 §4) as
  the deck shell; map type scale down one step; ink background slides with
  one warm-paper "certificate" slide as the rhythm break.
- **Marketing display panel (lobby screen, kiosk, event loop)** — any video
  hero prompt with the auto-advance carousel rules from 05; remove all
  interactive affordances; double all type sizes; loop muted.
- **Email** — flat colors only (ink, paper, ember), no glass/no overlays;
  buttons become solid ember rounded rectangles (border-radius caps at ~12px
  in most clients).

## Provenance

Extracted from the `redesign/amanhecer-2026` branch of ds-credito-landing
(Jun 2026), after a multi-lens design audit (design health 35/40). Brand
source: Manual de Normas (Particula Digital) p.7 + Style Guide 2026 assets.
Logo lockups referenced here live in `public/brand-2026/` of that repo.
