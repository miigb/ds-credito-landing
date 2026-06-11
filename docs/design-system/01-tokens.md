# 01 · Tokens

Single source of truth. Copy values verbatim — do not re-derive by eye.

## Color

### Brand ramp — warm neutral (ink → warm paper)

Neutrals are tinted toward the brand hue (~80° warm) at chroma 0.004–0.008 —
perceptible warmth, subconscious cohesion. **Never pure #000 or #fff.**

```css
--color-brand-900: #1D1D1B;              /* Ink — the "black" */
--color-brand-800: oklch(20% 0.004 80);
--color-brand-700: oklch(30% 0.004 80);
--color-brand-600: oklch(40% 0.004 80);
--color-brand-500: #575756;              /* secondary text on paper */
--color-brand-400: oklch(65% 0.005 80);
--color-brand-300: #C6C6C6;
--color-brand-200: oklch(90% 0.008 80);
--color-brand-100: oklch(95% 0.008 80);
--color-brand-50:  #FAF7F2;              /* Warm Paper — the "white" */
```

### Accent ramp — ember / amber gold

```css
--color-accent-900: oklch(30% 0.07 50);
--color-accent-800: oklch(42% 0.10 50);
--color-accent-700: #F39200;             /* EMBER GOLD — the primary accent */
--color-accent-600: oklch(64% 0.15 60);  /* hover state of ember */
--color-accent-500: oklch(73% 0.175 65);
--color-accent-400: oklch(82% 0.175 75); /* AMBER — bright highlight on ink */
--color-accent-300: oklch(88% 0.17 85);
--color-accent-200: oklch(93% 0.15 92);
--color-accent-100: oklch(96% 0.09 95);
--color-accent-50:  oklch(98% 0.04 95);
```

### Gold ramp — sun / bronze depth

```css
--color-gold-300: #A07214;  /* Bronze — premium depth, light-surface labels */
--color-gold-400: #FFEF26;  /* SUN GOLD — logo sun-mark ONLY. Never in UI. */
--color-gold-500: #F39200;  /* ember alias */
```

### Semantic aliases

```css
--color-ink:         var(--color-brand-900);
--color-paper:       var(--color-brand-50);
--color-ember:       var(--color-accent-700);
--color-bronze:      var(--color-gold-300);
--color-bronze-deep: #8A6311;  /* AA-passing bronze for small caps on paper (5.1:1) */
--color-alabaster:   #F2ECE3;  /* alternate light surface (editorial cards canvas) */
```

### Role assignments (which color does what)

| Role | On ink (dark) | On paper (light) |
|---|---|---|
| Display headline | `white` | `brand-900` |
| Body copy | `white/65` | `brand-600` |
| Secondary copy | `white/60` | `brand-500` |
| Caps label / metadata | `white/55–60` | `bronze-deep` |
| Eyebrow (display caps) | `accent-400` | `bronze-deep` |
| Hero numerals / stat heroes | `accent-700` | `brand-900` (or `accent-700` large) |
| Primary action | `accent-700` bg, hover `accent-600` | same |
| Links / hover accents | `accent-400` | `accent-700` |
| Hairlines | `white/10` | `brand-900/10` or `bronze/40` |

## Typography

- **UI font:** Montserrat (variable), system-ui fallback. ALL interface text.
- **Logo font:** Brown Sugar — **logo wordmark only**, never UI.
- Antialiasing: `-webkit-font-smoothing: antialiased`.

### Scale (marketing surfaces — fluid)

| Step | Classes / value | Use |
|---|---|---|
| Display XL | `clamp(2.6rem, 6.6vw, 5.9rem)`, line-height 0.99–1.02 | hero headline |
| Display | `text-4xl lg:text-6xl`, tracking-tight | section h2 |
| Title | `text-2xl lg:text-3xl` (deck h3: `text-3xl xl:text-4xl`) | sub-section, deck chapter |
| Card title | `text-lg`–`text-2xl`, font-semibold | cards |
| Body | `text-base`–`text-lg`, leading-relaxed | paragraphs |
| Small | `text-sm` | supporting / detail |
| Label | `text-[10px]`–`text-[11px]`, font-semibold, uppercase | caps labels |
| Stat numeral | `clamp(2.5rem, 3.6vw, 3.75rem)`, font-extrabold, tabular-nums, whitespace-nowrap | stat ranks |

Weights: light(300) / medium(500) / semibold(600) / bold(700) / extrabold(800).
Display headlines pair weights for contrast (e.g. `font-light` start +
`font-extrabold` highlight on editorial surfaces).

### Caps-tracking grammar — exactly two working tiers + one display tier

| Tier | Tracking | Where |
|---|---|---|
| Dense UI caps | `tracking-[0.12em]` | nav links, toolbar items |
| Metadata labels | `tracking-[0.15em]` | 9–11px labels: stat labels, form labels, role captions, "Membro" |
| Display eyebrows | `tracking-[0.3em]` | section eyebrows only ("OS NOSSOS SERVIÇOS") |

Anything between these values is a bug.

## Spacing & rhythm

- **Section vertical padding (standard):** `py-20 md:py-24 lg:py-28`.
  No section deviates without a reason (a pinned scroll section may).
- **Section header → body gap:** `mb-10 lg:mb-14` (with subheading) or
  `mb-8 lg:mb-10` (headline only).
- **Inside headers:** eyebrow `mb-5–6` → headline `mb-5–6` → subheading.
- **Grid gaps:** cards `gap-5 lg:gap-6`; stat ranks `gap-x-8 lg:gap-x-10
  gap-y-10`; two-column splits `gap-12 lg:gap-16`.
- **Header composition rule:** on wide containers (`max-w-7xl`), section
  headers use the two-column pattern — headline left (`1.4fr`), supporting
  copy right (`1fr`), `items-end` — never a lone `max-w-2xl` blob with half
  the viewport idle. See 03 §5.

## Radii grammar

| Radius | Use |
|---|---|
| `rounded-full` | chrome pills (nav CTA, audience toggle, language pill), solid ember primary buttons, dots, sliders thumbs |
| `rounded-2xl` | secondary/ghost CTAs, option rows, nav glass containers, mid cards |
| `rounded-xl` | form inputs and selects |
| `rounded-3xl` | large cards (service cards, simulator card, ink sub-panels) |
| `rounded-[2rem]` | hero "certificate" cards / oversized feature surfaces |

**Law:** a bordered pill must read as a *complete* shape — uniform ring +
tonal fill. Gradient hairline borders that fade on one side are banned (they
read as broken shapes over imagery). See 02 §7.

## Shadows & glows

```css
/* card resting / hover (light surfaces — warm ink shadows, never grey-blue) */
shadow-[0_10px_40px_rgba(29,29,27,0.05)]
hover:shadow-[0_24px_60px_rgba(29,29,27,0.11)]

/* floating photo frame */
shadow-[0_18px_50px_rgba(29,29,27,0.10)]

/* hero certificate card over ink */
shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]

/* ember CTA glow */
shadow-lg shadow-accent-700/25       /* resting */
hover:shadow-accent-600/40           /* hover */

/* icon-well hover glow */
group-hover:shadow-[0_0_32px_rgba(243,146,0,0.28)]

/* logo halo (see 05 §6) */
filter: drop-shadow(0 0 8px rgba(243, 146, 0, 0.25));
```

## Selection & micro-defaults

```css
::selection { background: var(--color-accent-100); color: var(--color-accent-900); }
button, a, [role="button"] { -webkit-tap-highlight-color: transparent; }
input[type="range"] { touch-action: pan-y; }
/* ember slider thumb: 16px circle, accent-700, 2px white border,
   box-shadow 0 2px 6px rgba(29,29,27,0.3) */
```
