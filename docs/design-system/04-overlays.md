# 04 · Overlays, backgrounds & surface treatments

Everything that sits between the canvas and the content. All values verbatim.

## 1. Dawn radials — the brand's signature ambience

A matte ember sun rising from *below the fold*. Light and dark twins:

```css
/* light surfaces */
.bg-dawn-radial {
  background-image: radial-gradient(120% 90% at 50% 112%,
    rgba(243,146,0,0.40) 0%,
    rgba(243,146,0,0.16) 38%,
    rgba(243,146,0,0.05) 58%,
    transparent 72%);
}
/* ink surfaces */
.bg-dawn-radial-dark {
  background-image: radial-gradient(120% 95% at 50% 115%,
    rgba(243,146,0,0.26) 0%,
    rgba(201,138,46,0.10) 42%,
    transparent 70%);
}
```

Usage: `absolute inset-0` + opacity 0.5–0.8 depending on how quiet the
section is. This is ambience, not a sun illustration (rule 02 §2 still
holds — no rays, no disc).

## 2. Horizon gradient — hero/footer finale

```css
.bg-hero-gradient {
  background: linear-gradient(160deg,
    var(--color-brand-900) 0%,
    oklch(0.2 0.02 60) 45%,
    oklch(0.3 0.06 55) 75%,
    var(--color-accent-800) 100%);
}
```

The page "dawns": opens dark, ends on this warm horizon at the footer.

Warm-ink stage for crossfading content (never through #000):

```css
background: linear-gradient(160deg, #1D1D1B 0%, #211a12 55%, #2e2114 100%);
```

## 3. Video scrim — legibility over moving footage

```css
/* radial scrim: center stays bright, edges anchor the type */
background: radial-gradient(95% 75% at 50% 52%,
  rgba(16,11,6,0.32) 0%, rgba(16,11,6,0.64) 100%);
```

Note the warm near-black `rgb(16,11,6)` — never neutral black.

Pair with **text-shadow legibility** (preferred over darkening the whole
video):

```css
.hero-video-legibility, .hero-video-legibility * {
  text-shadow: 0 1px 18px rgba(16,11,6,0.5), 0 0 2px rgba(16,11,6,0.3);
}
```

## 4. Bottom blur mask — the "frosted fold"

Bottom-only backdrop blur on video heroes (no dark gradient band):

```css
.mask-fade-bottom {
  mask-image: linear-gradient(to top, black 0%, transparent 45%);
}
@media (max-width: 767px) {
  .mask-fade-bottom { mask-image: linear-gradient(to top, black 0%, transparent 62%); }
}
```

Apply to an `absolute inset-0 backdrop-blur-xl` layer over the video.

## 5. Section melt — chapter transitions

A short gradient that melts a full-bleed hero into the next ink section:

```css
/* bottom of hero, h-24, pointer-events-none */
background: linear-gradient(to bottom, transparent, rgba(29,29,27,0.92));
```

## 6. Warm glass (chrome only)

```css
.glass-warm      { background: rgba(250,247,242,0.82); backdrop-filter: blur(20px); }
.glass-warm-dark { background: rgba(29,29,27,0.72);   backdrop-filter: blur(20px); }
/* tonal glass pill/slab over video: bg-white/[0.06–0.08] + ring-1
   ring-white/15 + backdrop-blur-xl — complete ring, never gradient stroke */
```

Glass is for floating chrome (nav, sticky bars) — never default card
material.

## 7. Ember orbs — soft section glow

Blurred ember circles, one or two per section maximum:

```html
class="absolute -top-24 right-[-12%] w-[480px] h-[480px] rounded-full
       bg-accent-400/15 blur-[110px] pointer-events-none"
<!-- dark sections: bg-accent-700/[0.07] / bg-accent-400/[0.05],
     blur-[90–110px] -->
```

Optionally drift with scroll (`useTransform(scrollYProgress, [0,1], [0,-70])`).

## 8. Film grain

```css
.grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}
```

Global fixed overlay, very low opacity (~3–5%), `pointer-events-none`,
toggleable. Adds film texture to the cinema direction.

## 9. Warm photo grade

```css
.img-warm { filter: sepia(0.22) saturate(1.08) contrast(1.02) brightness(1.01); }
```

Applied to every photograph (or its frame, so it composes with grayscale
hover filters). Golden hour, never cold stock.

## 10. Dot matrix texture (quiet dark sections)

```css
background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0);
background-size: 40px 40px;  /* at opacity-[0.02] */
```

## 11. Layering order (bottom → top)

1. Canvas (ink / paper / video / shader)
2. Ambience (dawn radial, horizon gradient, ember orbs, dot matrix)
3. Scrim or blur mask (video only)
4. Grain (global)
5. Content (with `.hero-video-legibility` when over footage)
6. Chrome (nav, sticky bar — glass)
