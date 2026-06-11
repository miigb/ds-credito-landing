# 03 · Component recipes

Exact class strings, validated in production. `dark` = on ink/video,
`light` = on paper/alabaster. Adapt naming, keep the numbers.

## 1. Buttons

### Primary — solid ember pill

```html
class="group inline-flex items-center justify-center px-6 sm:px-8 py-3.5
       text-base font-semibold rounded-full bg-accent-700 text-white
       hover:bg-accent-600 transition-all duration-300
       shadow-2xl shadow-accent-700/30 hover:shadow-accent-600/40
       hover:-translate-y-0.5"
```

Smaller contexts (forms, cards): `px-8 py-3 shadow-xl shadow-accent-700/25`.
Optional trailing arrow: `w-4 h-4 ml-2 transition-transform
group-hover:translate-x-1`.

### Secondary / ghost — form-pill (complete shape)

```html
<!-- dark -->
class="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 text-base
       font-semibold rounded-2xl text-white bg-white/[0.05] ring-1
       ring-white/15 hover:bg-white/[0.08] hover:ring-white/25 transition-all"
<!-- light -->
class="… rounded-2xl text-brand-900 bg-brand-900/[0.04] ring-1
       ring-brand-900/10 hover:bg-brand-900/[0.06] hover:ring-brand-900/20"
```

### Chrome CTA — compact navbar pill

```html
class="inline-flex items-center whitespace-nowrap px-4.5 py-2 text-[13px]
       font-semibold rounded-full bg-accent-700 text-white hover:bg-accent-600
       transition-all duration-300 shadow-md shadow-accent-700/20"
```

`whitespace-nowrap` is mandatory — a wrapped CTA reads broken.

### Option row — selectable list item (the "form pill")

```html
class="group w-full text-left rounded-2xl px-5 py-4 sm:px-6 sm:py-5
       text-sm sm:text-base font-medium transition-all duration-200
       flex items-center gap-4"
<!-- + state -->
selected:      dark → "bg-accent-400/10 text-white ring-2 ring-accent-400"
               light → "bg-accent-50 text-brand-900 ring-2 ring-accent-400"
idle (dark):   "bg-white/[0.06] text-white/85 ring-1 ring-white/20
                hover:bg-white/[0.09] hover:ring-white/30 hover:-translate-y-0.5"
idle (light):  "bg-paper text-brand-900 ring-1 ring-brand-900/10
                hover:ring-accent-400/70 hover:-translate-y-0.5
                hover:shadow-[0_10px_30px_rgba(29,29,27,0.07)]"
NB: on large slabs (full-width rows), rings below white/20 on ink visually
dissolve at the sides and the row reads as clipped — /20 is the floor.
```

Leading letter chip: `w-8 h-8 rounded-full border text-xs font-bold`
(selected → `bg-accent-400 text-brand-900`).

Touch floor: any tap target on mobile ≥44px computed height
(`px-4 py-3` inside a `p-1` pill shell).

## 2. Segmented toggle (audience / mode switch)

```html
<!-- shell -->
class="flex items-center rounded-full p-0.5 text-xs
       {dark: bg-white/10 | light: bg-brand-900/[0.06]}"
<!-- option -->
class="px-3 py-1.5 rounded-full transition-all duration-300"
active → "bg-accent-700 text-white font-semibold shadow-sm"
idle   → {dark: "text-white/60 hover:text-white/85"
          light: "text-brand-500 hover:text-brand-700"}
<!-- mobile: shell p-1 gap-1, options px-4 py-3 (44px floor) -->
```

## 3. Quiet membership badge (the "ANICA pill")

One recipe everywhere it appears:

```html
<!-- dark -->
<a class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full
          bg-white/5 border border-white/10 hover:bg-white/10
          hover:border-white/20 transition-all duration-300">
  <img src="[logo]" class="h-6 w-auto brightness-0 invert opacity-60" />
  <span class="text-[10px] uppercase tracking-[0.2em] font-semibold
               text-white/50">Membro [ORG]</span>
</a>
<!-- light: bg-brand-900/[0.04] border-brand-900/10, img opacity-80
     (no invert), text-brand-600 -->
```

Third-party logos go monochrome on ink (`brightness-0 invert`) — full-color
logos in dark chrome shout.

## 4. Navigation chrome — three states

```text
state 1 · transparent (top of page):
  "bg-transparent border-b border-transparent"
state 2 · scrolled (≥40px):
  dark  → "glass-warm-dark border-b border-white/10
           shadow-[0_16px_48px_-20px_rgba(0,0,0,0.55)]"
  light → "glass-warm border-b border-brand-900/[0.06]
           shadow-[0_16px_48px_-24px_rgba(29,29,27,0.18)]"
state 3 · floating tonal-glass (over video heroes, pre-scroll):
  slab → "h-16 px-4 lg:px-6 rounded-2xl bg-white/[0.08] backdrop-blur-xl
          ring-1 ring-white/15 shadow-lg shadow-black/10"  (inside pt-3 wrap)
  pill → "rounded-2xl bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-xl
          px-2 py-2"  (links container; toggle/lang pills get the same fill+ring)
```

Glass utilities (chrome only, never card material):

```css
.glass-warm      { background: rgba(250,247,242,0.82); backdrop-filter: blur(20px); }
.glass-warm-dark { background: rgba(29,29,27,0.72);   backdrop-filter: blur(20px); }
```

Nav links: `px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]`,
idle `white/60 → white` (dark) / `brand-500 → brand-900` (light); hover marks
with a 3px accent dot under the link, not an underline.

Logo in navbar: horizontal lockup at `height={42}`, parent
`flex items-center shrink-0`, with `.logo-glimmer` (05 §6).

## 5. Section header — two-column pattern

Never strand a `max-w-2xl` header on a `max-w-7xl` container.

```html
<div class="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-12 items-end mb-10 lg:mb-14">
  <div>
    <p class="inline-flex items-center gap-3 mb-5 text-xs lg:text-sm
              font-semibold uppercase tracking-[0.3em] text-bronze-deep">
      <span aria-hidden class="h-px w-8 bg-bronze/60"></span>
      [EYEBROW]
    </p>
    <h2 class="text-4xl lg:text-6xl font-bold tracking-tight text-brand-900
               text-balance">[HEADLINE]</h2>
  </div>
  <p class="text-lg text-brand-500 leading-relaxed lg:pb-1.5">[SUBHEADING]</p>
</div>
```

Dark variant: eyebrow `text-accent-400`, h2 `text-white`, sub `text-white/60`.
Headline-only headers: `max-w-3xl mb-8 lg:mb-10`.

## 6. Stat rank (numbers wall)

```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-10">
  <div class="border-t pt-5 lg:pt-6 {dark: border-white/10 | light: border-bronze/40}">
    <div class="text-[clamp(2.5rem,3.6vw,3.75rem)] font-extrabold tabular-nums
                tracking-tight leading-none whitespace-nowrap
                {dark: text-accent-700 | light: text-brand-900}">+22</div>
    <p class="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em]
              {dark: text-white/60 | light: text-bronze-deep}">[LABEL]</p>
  </div>
  …
</div>
```

Aligned, equal columns, shared baselines. Count-up animation: 05 §4.

## 7. Cards

```text
white card on paper:
  "rounded-3xl bg-white ring-1 ring-brand-900/[0.04]
   shadow-[0_10px_40px_rgba(29,29,27,0.05)]
   hover:shadow-[0_24px_60px_rgba(29,29,27,0.11)]
   transition-all duration-500 hover:-translate-y-1  p-7 lg:p-8"
   (featured: p-8 lg:p-10; asymmetric 12-col spans 7/5 · 5/7 · 6/6 —
    never six identical boxes)

icon well inside a card:
  "w-16 h-16 rounded-2xl bg-accent-700/15 flex items-center justify-center
   group-hover:bg-accent-700/20
   group-hover:shadow-[0_0_32px_rgba(243,146,0,0.28)]"
  card numeral: text-[10px] tracking-[0.3em] tabular-nums
  (light canvas: text-brand-400 · editorial: text-bronze)

ink sub-panel on a light section:
  "rounded-3xl bg-ink p-6 sm:p-10 lg:p-14" + inside:
  "absolute inset-0 bg-dawn-radial-dark opacity-80" +
  one blurred ember orb: "absolute -top-24 -right-24 w-80 h-80 rounded-full
   bg-accent-700/15 blur-[100px]"

certificate / hero feature card (paper on ink stage):
  "rounded-[2rem] bg-paper text-brand-900 px-8 sm:px-12 py-12 sm:py-14
   shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
  + "absolute inset-0 rounded-[2rem] bg-dawn-radial opacity-60"
  layout: caps eyebrow (bronze-deep, mb-8) → display figure row
  (flex items-center gap-x-5, figure + max-w-xs caption) →
  "mt-10 pt-8 border-t border-brand-900/10 grid sm:grid-cols-2 gap-6"
  with matching label rhythm (text-[10px] tracking-[0.15em] mb-2.5) and a
  "sm:border-l sm:border-brand-900/10 sm:pl-6" divider on column 2
```

## 8. Form controls

```text
input/textarea (dark):
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white
   placeholder-white/25 text-base focus:outline-none
   focus:border-accent-700/50 focus:ring-1 focus:ring-accent-700/30"
label (dark):
  "block text-[10px] font-semibold uppercase tracking-[0.15em]
   text-white/60 mb-2"
input (light):
  "border border-brand-200 rounded-xl px-4 py-3.5 bg-white text-brand-900
   focus:border-accent-700 focus:ring-1 focus:ring-accent-700/30"
range slider: ember 16px thumb, 2px white border, h-1 rounded-full track
select: custom data-URI chevron (warm grey #575756 / #C6C6C6 dark)
```

## 9. Contact / definition list (big-type editorial list)

```html
<div class="border-t border-white/10">
  <a class="group block py-6 border-b border-white/10">
    <p class="text-[10px] font-semibold uppercase tracking-[0.15em]
              text-white/55 mb-2">[LABEL]</p>
    <p class="text-xl lg:text-2xl font-semibold tracking-tight text-white/85
              transition-all duration-300 group-hover:text-accent-400
              group-hover:[text-shadow:0_0_28px_rgba(255,177,0,0.35)]">
      [VALUE]
    </p>
  </a>
</div>
```

## 10. Progress & wayfinding

```text
carousel dots:   active "bg-accent-700 w-6 h-2", idle "bg-white/40
                 hover:bg-white/70 w-2 h-2", all rounded-full
step ticks:      "h-[3px] rounded-full", active w-10, idle w-6,
                 done "bg-accent-700", todo "bg-white/15" / "bg-brand-900/10"
progress rail:   2px track (white/10 | brand-900/10) with
                 "bg-gradient-to-b from-accent-700 to-accent-400" fill
                 driven by scroll progress
hairline divider: "h-px bg-gradient-to-r from-transparent via-white/10
                 to-transparent" (light: via-brand-900/10 or via-bronze/35)
```

## 11. Logo usage

- **Horizontal lockup** (nav, headers): flat-ember sun left, official
  lettering right. White-letter version on ink, ink-letter on paper.
  SVGs carry `shape-rendering="geometricPrecision"`.
- **Stacked lockup** (footer finale, covers, QR centers): flat-ember
  variant — never the gradient-sun variant next to UI ember.
- **QR center logos:** always native aspect (e.g. 491×287 → 60×35 units in
  `imageSettings`), `excavate: true`. Forcing a square crops/squishes.
- **Glimmer:** `.logo-glimmer` breathing ember halo, 05 §6.
