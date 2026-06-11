# 05 · Motion vocabulary

One cohesive grammar. Every pattern carries its reduced-motion behavior.

## 1. Timing & easing

| Token | Value | Use |
|---|---|---|
| Interaction | 200–300ms | hovers, toggles, focus — **every** interactive surface; nothing slower |
| Entrance | 600–850ms | reveals, fades |
| Crossfade | 350–600ms | slide/photo swaps |
| Signature ease | `cubic-bezier(0.25, 0.4, 0.25, 1)` | the house curve (entrances, crossfades) |
| Reveal ease | `cubic-bezier(0.22, 0.61, 0.21, 0.99)` | line-mask reveals |
| Count-up ease | ease-out-quart `1 - (1-t)^4` | numeral count-ups |

No bounce, no elastic. Transform + opacity only (filter allowed for the two
blur/glow patterns below).

## 2. RevealLine — line-mask headline reveal

The signature headline move. Outer span is an overflow mask; inner span
rises from `y: 112%`.

**Critical:** the in-view trigger lives on the **outer mask** (stable, always
in place); the inner span only consumes the propagated variant. If the
trigger sits on the translated inner element, it never meets its own
visibility threshold and the headline stays invisible forever.

```tsx
<motion.span className="block overflow-hidden"
  initial="hidden" whileInView="shown"
  viewport={{ once: true, amount: 0.4 }}>
  <motion.span className="block will-change-transform"
    variants={{ hidden: { y: reduced ? "0%" : "112%" }, shown: { y: "0%" } }}
    transition={{ duration: 0.85, delay: 0.1 + index * 0.11,
                  ease: [0.22, 0.61, 0.21, 0.99] }}>
    {children}
  </motion.span>
</motion.span>
```

Stagger multiple lines by `index * 0.11`. Hero variant: `animate` on mount
instead of `whileInView`.

## 3. FadeIn — soft blur entrance for supporting copy

```tsx
initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, amount: 0.4 }}
transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
```

And the CSS-only stagger entrance (video heroes):

```css
@keyframes blurFadeUp {
  from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
  to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
}
.animate-blur-fade-up { opacity: 0; animation: blurFadeUp 1s ease-out forwards; }
/* stagger with inline animation-delay: 100/300/500/700ms */
```

## 4. Count-up numerals — rAF, never setInterval

```tsx
const duration = 2000;
const startTs = performance.now();
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
let raf = 0;
const tick = (now: number) => {
  const t = Math.min((now - startTs) / duration, 1);
  setCurrent(Math.round(value * easeOutQuart(t)));
  if (t < 1) raf = requestAnimationFrame(tick);
};
raf = requestAnimationFrame(tick);
```

Guards: trigger once on in-view; 3s fallback timer that snaps to the final
value (in-app browsers with broken IntersectionObserver); reduced motion →
render final value instantly.

## 5. Hover grammar

```text
portraits:    grayscale → grayscale-0 + scale-[1.03], duration-300 ease-out
cards:        hover:-translate-y-1 (or -0.5) + shadow step, duration 300–500
ember CTAs:   hover:bg-accent-600 + shadow glow step + hover:-translate-y-0.5
links (big):  color → accent-400 + [text-shadow:0_0_28px_rgba(255,177,0,0.35)]
icon wells:   bg opacity +5 points + ember glow shadow
touch:        @media (hover: none) { *:hover { transform: none !important; } }
```

Match the site tempo — a 700ms hover next to 300ms hovers reads broken.

## 6. Logo glimmer — breathing ember halo

```css
@keyframes logoGlimmer {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(243,146,0,0.16)); }
  50%      { filter: drop-shadow(0 0 13px rgba(243,146,0,0.38)); }
}
.logo-glimmer {
  filter: drop-shadow(0 0 8px rgba(243,146,0,0.25));
  animation: logoGlimmer 5.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) { .logo-glimmer { animation: none; } }
```

Subtle, slow (5.5s), and doubles as antialiasing for fine SVG rays at small
sizes. Pair with `shape-rendering="geometricPrecision"` on the SVG.

## 7. Marquee (logo walls)

`translate3d(0→-50%)` on a duplicated track, 45s linear infinite,
`backface-visibility: hidden`, reverse twin for the second row. Reduced
motion → static.

## 8. Carousel / auto-advancing deck rules

The contract for any auto-rotating surface (hero decks, display panels):

- Advance every **7s**; crossfade 350ms `easeInOut` through the warm-ink
  stage (never through black/white).
- **Back off 14s** after any manual navigation (keys, dots).
- **Never advance** when: tab hidden (`document.hidden`), surface <55% in
  view (IntersectionObserver), focus is in a form field, or reduced motion.
- **Park on engagement:** if a slide hosts an interactive tool (calculator,
  form), any pointer/key interaction inside it arms a flag that suspends
  rotation while on that slide (covers post-submit states where nothing
  holds focus). Leaving the slide re-arms rotation.
- Keyboard: `→ ↓ Space` next · `← ↑` prev, `preventDefault`, only while
  in view and not in a field.
- Dots: ember active pill (`w-6 h-2`) vs idle dot (`w-2 h-2`).
- Inactive slides stay mounted (`opacity: 0, pointerEvents: none`) so media
  stays warm; videos play only while their slide is active.

## 9. Pinned scroll-deck (scroll-telling section)

The one signature scroll moment. Structure:

```text
outer track:   height = steps × 90vh   (the scroll budget)
sticky stage:  "sticky top-0 h-screen flex items-center overflow-hidden"
active step:   floor(scrollYProgress × steps), clamped
content:       photo/numeral/copy crossfade per step (AnimatePresence,
               0.45–0.6s house ease); ember progress rail fills 0→100%
overlap:       pull the track up into the header margin (lg:-mt-[12vh])
               to kill the dead band at pin-start
fallback:      mobile and reduced-motion get a plain vertical timeline —
               the pinned deck is desktop-only enhancement
```

Giant step numerals: solid ember (`text-accent-700`, opacity ~0.9 on ink,
`/30` on paper) — outlined/stroke numerals read broken where they cross
photo edges.

## 10. Scroll infrastructure notes

- Smooth scroll (Lenis): bridge `scrollIntoView`/anchor jumps through the
  smoother or programmatic navigation breaks.
- Sticky pinning needs no `overflow-hidden` ancestors between track and
  viewport (it silently kills `position: sticky`).
- `useMotionValueEvent(scrollYProgress)` + `setState(sameValue)` is free —
  React bails on identical values; don't throttle step changes.
- Testing gotcha: `once: true` in-view reveals can be poisoned by
  programmatic instant jumps. Verify with a hard reload + natural scroll.
