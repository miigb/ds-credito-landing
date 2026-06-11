# 02 · Rules — the non-negotiables

Each rule exists because the obvious alternative failed in production review.

## 1. Ink, never black. Paper, never white.

The "black" is `#1D1D1B`, the "white" is `#FAF7F2`. Crossfades, scrims,
gradients and shadows derive from these — a transition that passes through
`#000` or `#fff` looks alien on this brand.

## 2. The sun lives only in the logo.

No standalone sun glyphs, ray bursts, corner rays, sun bullets or sun-arc
reveals anywhere in the UI. The brand sun appears exactly once per
composition — inside the actual logo lockup. (A footer that drew a sun-arc
above the logo read as a "double logo" and was removed.) Sun Gold `#FFEF26`
is reserved for the logo sun-mark and never appears in UI.

## 3. Ember is rare and earned (60-30-10).

~60% surface (ink/paper), ~30% secondary text and hairlines, ~10% ember.
Ember marks: the primary action, the hero numeral/highlight, the progress
fill, the active state. When everything is orange, nothing is. Presence
problems are solved with contrast and weight, not more ember.

## 4. Verified contrast floors (measured, not guessed)

| Combination | Ratio | Verdict |
|---|---|---|
| `white/40` on ink | ≈3.8:1 | ✗ fails AA small text |
| `white/45` on ink | ≈4.4:1 | ✗ fails |
| `white/55` on ink | ≈5.2:1 | ✓ labels floor |
| `white/60` on ink | ≈5.8:1 | ✓ |
| `bronze #A07214` on paper | ≈4.0:1 | ✗ fails for 10–11px caps |
| `bronze-deep #8A6311` on paper | ≈5.1:1 | ✓ the AA bronze |
| `ember #F39200` on paper | ≈2.2:1 | ✗ never small text on light |
| `brand-500 #575756` on paper | ≈6.7:1 | ✓ |

Rule of thumb: **ember is a display color on light surfaces** (giant
numerals, icons) — never label-size type. On ink, secondary text floors at
`white/55`.

## 5. Two-tier caps tracking

`0.12em` dense UI · `0.15em` metadata labels · `0.3em` display eyebrows.
Nothing else. (See 01 typography.)

## 6. Button grammar

- **Primary** = solid ember `rounded-full` pill. One per view section.
- **Secondary/ghost** = `rounded-2xl` + tonal fill + complete uniform ring.
- **Chrome CTA** (navbar/sticky) = compact pill, `whitespace-nowrap` —
  a CTA that wraps to two lines reads broken and oversized.
- Never make every button primary; never amplify the conversion point with
  size or louder color — calm consistency converts in trust-first contexts.

## 7. Complete shapes only

A bordered control must show its entire outline: uniform `ring-1` + tonal
background. **Banned:** gradient hairline borders that fade out along one
side ("liquid glass" stroke) — over moving imagery they read as broken,
incomplete shapes. Tonal glass recipe instead:
`bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-xl`.

## 8. Reveals must fail safe

Content is king: if a scroll-reveal never fires, the content must still be
visible. With any line-mask reveal, the IntersectionObserver trigger goes on
the **stable outer mask element**, never on the inner element that is
translated out of view (it can never meet its own visibility threshold — the
headline stays invisible forever and reads as "empty space").
Global safety net:

```css
@media (prefers-reduced-motion: reduce) {
  [style*="opacity: 0"], [style*="opacity:0"] {
    opacity: 1 !important; transform: none !important;
  }
}
```

## 9. Reduced-motion parity

Every animation has a defined reduced-motion behavior: entrances render
final-state, marquees and glimmers stop, carousels don't auto-advance,
shaders go static (speed 0), pinned scroll-decks fall back to a plain
vertical layout. Parity is part of the definition of done.

## 10. Anti-slop bans

No gradient text. No `border-left/right` accent stripes >1px. No
glassmorphism as decoration (glass = floating chrome only). No cyan/purple/
neon. No identical icon-card grids. No hero-metric template with gradient
accents. No centered-everything — left-aligned, asymmetric compositions.

## 11. Regulatory & trust elements are sacred

Registration paragraphs (e.g. Banco de Portugal) ship verbatim, legible,
never decorated, never truncated. Membership badges (ANICA) use the quiet
pill recipe (03 §3) — credibility whispers, it doesn't shout.

## 12. Photography is warm

All photos take the warm grade: `filter: sepia(0.22) saturate(1.08)
contrast(1.02) brightness(1.01)` (`.img-warm`). Golden hour, never cold
stock. Portrait hovers: grayscale → color, 300ms (see 05 §5).

## 13. Numbers are heroes — aligned and calm

Stat walls are single aligned ranks: equal columns, hairline top rules,
shared baselines, `tabular-nums`, `whitespace-nowrap`. No staggered offsets,
no per-cell vertical "rhythm" — staggering reads as misalignment, not
editorial flair.

## 14. One signature scroll moment per page

Pick one (pinned process deck, slide carousel). Everything else uses the
quiet entrance vocabulary. Motion budget is finite — spending it everywhere
buys nothing.

## 15. Assets ship lean

Images ≤200KB at display resolution, WebP siblings via `<picture>`, `loading="lazy"
decoding="async"` below the fold. A single 14MB portrait once outweighed the
entire rest of the page. Delete unreferenced assets from `public/` — they
deploy.
