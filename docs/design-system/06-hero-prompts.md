# 06 · Hero treatments — transferable build prompts

Five production-validated hero treatments. Each prompt is self-contained:
paste it into any build context (web app, marketing display panel, web
presentation, kiosk loop), fill the `[PARAMETERS]`, and keep the GOTCHAS.

## Asset registry — the footage in current use

These are the actual videos behind the prototype's hero treatments. They are
the house defaults for the `[VIDEO_URL]` / `[HLS_M3U8_URL]` parameters —
**licensing is being worked out; confirm rights before any new production
use**, then reuse freely across projects.

**Master archive (since the Shader hero was approved, Jun 2026):**
`~/Development/LetraPerfeicoada/Style Guide 2026/hero-videos/` — all three
files + README. They were removed from git tracking (back under the
`public/hero/*.mp4` gitignore) so the production merge ships no video weight;
the parked video heroes fall back to the warm-ink gradient unless the files
are restored locally from the archive.

| Asset | Local file (ds-credito-landing repo, branch `redesign/amanhecer-2026`) | Specs | Used by | Original source |
|---|---|---|---|---|
| **Sunrise monoliths** — sun rising between dark stone slabs, clouds | `public/hero/hero-ambient.mp4` | 1928×1072 · ~14s · 9.4MB | Ambient Film (Vídeo 1) · Brand Deck scene 3 "Bancos" | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4` (temporary CDN link — may rot) |
| **Orb & hand** — glass sphere with warm light streak over an open hand | `public/hero/hero-ambient-2.mp4` | 3828×2164 · ~8s · 5.8MB | Equilibrium (Vídeo 2) · Brand Deck scene 5 "Convite" | `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4` (temporary CDN link — may rot) |
| **Film stream** — cinematic warm footage, adaptive bitrate | `public/hero/hero-film.mp4` (archive of the top HLS rendition, stream-copied, decode-verified) | 1620×1080 · ~10s · 1.4MB | Broadcast (Vídeo 3) · Brand Deck scene 1 "Abertura" — both still STREAM from Mux at runtime; the local file is the preservation master | `https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8` (Mux playback ID `NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM`) |

Notes:
- The two MP4s are committed on the prototype branch (commit `b8d62d2`) so
  Vercel previews render them; the repo's `.gitignore` rule
  `public/hero/*.mp4` otherwise excludes them — re-add with `git add -f` if
  they ever drop out.
- For production: once licensing clears, either keep self-hosting the MP4s
  (move them out of git into proper media hosting/CDN) and re-host the HLS
  asset under the company's own Mux account, or download the Mux source and
  self-host it too.
- CSP reminder for the HLS asset: `https://*.mux.com` wildcard in
  `connect-src` + `media-src` (plus `blob:` in `media-src`).

Shared vocabulary referenced by every prompt — pull from this system:
tokens (01), button recipes (03 §1), overlays (04), motion grammar (05).

**Universal rules for all five:**
- Background media is ambience: muted, looping, `playsInline`, no controls.
- Copy legibility via text-shadow (`.hero-video-legibility`) and/or the warm
  radial scrim — never a flat black overlay.
- Reduced motion → static warm-ink gradient
  (`linear-gradient(160deg, #1D1D1B 0%, #211a12 55%, #2e2114 100%)`) with
  content fully visible.
- A CSS gradient fallback paints first (LCP-safe); media fades in over it.
- Crossfades pass through warm ink `#1D1D1B`, never `#000`/`#fff`.

---

## 1 · "Ambient Film" — full-viewport video + frosted fold

**When:** emotional storytelling opener; one strong message over cinematic
footage. Works as-is on lobby/display panels.

### PROMPT

> Build a full-viewport cinematic hero section.
>
> **Background video:** `[VIDEO_URL]` (self-hosted MP4, ~5–10MB, warm
> golden-hour footage). Render `absolute inset-0 w-full h-full object-cover`,
> autoplay muted loop playsInline `preload="metadata"`. Below it, paint the
> warm-ink gradient fallback `linear-gradient(160deg, #1D1D1B, #211a12 55%,
> #2e2114)` so the first frame is never blank. If
> `prefers-reduced-motion: reduce`, do not mount the video at all.
>
> **Frosted fold (signature):** instead of a dark gradient band, lay an
> `absolute inset-0 backdrop-blur-xl` layer masked to the bottom only:
> `mask-image: linear-gradient(to top, black 0%, transparent 45%)` (62% on
> mobile). The footage stays bright; the fold frosts.
>
> **Content** (left-aligned, max-w ~2xl, vertically centered, generous
> top padding for the chrome): eyebrow in caps `tracking-[0.3em]` amber
> `#FFB100`-class with a glowing 1.5px dot · display headline
> `clamp(2.6rem, 6.6vw, 5.9rem)` line-height ~1.0, white, with the key
> phrase in ember `#F39200` · one-paragraph subcopy `white/65` · CTA pair:
> solid ember `rounded-full` primary + tonal-glass `rounded-2xl` secondary
> (`bg-white/[0.05] ring-1 ring-white/15`) · a slim trust/metadata row.
> Wrap all copy in a class applying
> `text-shadow: 0 1px 18px rgba(16,11,6,0.5), 0 0 2px rgba(16,11,6,0.3)`.
>
> **Entrances:** CSS `blurFadeUp` keyframes (opacity 0 → 1, blur 20px → 0,
> translateY 40px → 0, 1s ease-out, `forwards`), staggered by inline
> `animation-delay`: metadata 300ms, headline 100ms, subcopy 500ms, CTAs
> 700ms, side panel 800ms. Reduced motion: animation none, opacity 1.
>
> **Optional right column:** an interactive instrument (calculator/widget)
> in a `rounded-3xl` glass card — or leave negative space.
>
> Brand constraints: never pure black; ember `#F39200` only on the primary
> action and headline highlight; complete uniform rings on bordered pills.

**Display-panel adaptation:** strip CTAs and interactivity; double type
sizes; loop the entrance stagger every `[LOOP_SECONDS]` with a 600ms fade
through warm ink.

**GOTCHAS:** host the MP4 yourself (CDN links rot; gitignore large media and
document the re-download). `backdrop-filter` masking needs `-webkit-` twins.

---

## 2 · "Equilibrium" — minimal tonal-glass over slow footage

**When:** confident, quiet luxury; the footage is the message. Best when
paired with a floating tonal-glass nav.

### PROMPT

> Build a full-screen minimal hero over slow ambient video `[VIDEO_URL]`
> (single mesmerizing subject — an orb, slow landscape). Same video/fallback
> /reduced-motion rules as treatment 1, plus a radial scrim
> `radial-gradient(95% 75% at 50% 52%, rgba(16,11,6,0.32), rgba(16,11,6,0.64))`.
>
> **No entrance animations.** Content is simply present — stillness is the
> statement.
>
> **Composition:** content sits in the lower-left third: display headline
> (two lines, second line ember), short subcopy `white/65` max-w-md, CTA
> pair — primary = **white pill** (`bg-white text-[#1D1D1B] rounded-full`),
> secondary = tonal glass `rounded-2xl bg-white/[0.05] ring-1 ring-white/15`.
> Lower-right (desktop): an interactive instrument card or negative space.
> A whisper-size trust row sits under the CTAs at `text-[11px] white/45`.
>
> **Navigation pairing:** while the hero is unscrolled, the nav becomes a
> floating tonal-glass pill: links container `rounded-2xl bg-white/[0.06]
> ring-1 ring-white/15 backdrop-blur-xl px-2 py-2`; toggle and language
> pills take the same fill+ring. On scroll (>40px) it reverts to the
> standard warm-glass bar (`rgba(29,29,27,0.72)` + blur 20px + border-b
> white/10). NEVER use gradient hairline borders that fade along one side —
> every pill shows a complete uniform ring.
>
> **Scroll cue:** tiny caps "DESCER/SCROLL" + arrow, y-bobbing 8px on a
> 2.4s ease-in-out loop.

**Presentation adaptation:** this is a title-slide grammar — footage + two
lines + presenter name in the trust row position.

**GOTCHAS:** the original "liquid glass" gradient-stroke pill was reviewed
as a *broken/incomplete shape* over moving footage and standardized away —
use the tonal fill + complete ring above.

---

## 3 · "Broadcast" — adaptive HLS stream + glass header slab

**When:** premium "always-on" feel with adaptive streaming (Mux or any HLS
origin); centered composition like a streaming-service splash.

### PROMPT

> Build a full-screen hero streaming HLS `[HLS_M3U8_URL]` as its background.
>
> **Playback:** use hls.js via MSE whenever `Hls.isSupported()` — even if
> the browser claims native HLS (some Chromium builds claim support but
> fail); reserve native `<video src>` for Safari/iOS. Construct with
> `enableWorker: false` if your CSP lacks `blob:` in script-src; call
> `video.play()` on `MANIFEST_PARSED`. Expose a `playing` prop that
> play/pauses externally (needed when embedded in decks). Muted loop
> playsInline, object-cover, warm-ink fallback underneath, no mount under
> reduced motion.
>
> **Chrome:** floating glassmorphic header slab — `h-16 rounded-2xl
> bg-white/[0.08] backdrop-blur-xl ring-1 ring-white/15 shadow-lg
> shadow-black/10` inside a `pt-3` wrapper; reverts to the standard bar on
> scroll.
>
> **Composition (centered):** radial scrim (treatment 2) + centered column
> max-w-4xl: glowing-dot eyebrow → display headline with ember key-phrase →
> subcopy → CTA pair (ember pill primary + tonal-glass `rounded-2xl`
> secondary) → trust metadata row. Everything wears the legibility
> text-shadow. Optional: instrument card anchored lower-right on desktop.
>
> **CSP (if applicable):** the stream origin redirects to edge subdomains —
> allow the *wildcard* (e.g. `https://*.mux.com`) in both `connect-src` and
> `media-src`, plus `blob:` in `media-src` for MSE object URLs.

**Display-panel adaptation:** ideal for unattended screens — adaptive
bitrate handles venue bandwidth; remove chrome + CTAs, keep scrim +
headline.

**GOTCHAS:** the exact-host CSP entry (`stream.mux.com`) breaks silently —
video error code 4 / blocked segment requests — because the manifest 302s
to `*.edgemv.mux.com`. Wildcard the vendor domain.

---

## 4 · "Brand Deck" — 5-scene auto-advancing slide hero

**When:** the hero must tell the whole story (opener → proof → offer →
trust → invitation). This is also the shell for web presentations and
event-loop panels.

### PROMPT

> Build a presentation-style 5-slide deck as a full-viewport hero
> (`min-h-[100svh]`, overflow-hidden), on a warm-ink stage
> `linear-gradient(160deg, #1D1D1B, #211a12 55%, #2e2114)` so crossfades
> never pass through black or white.
>
> **Shell mechanics:** all slides stay mounted, absolutely stacked.
> Active slide: `opacity 1, zIndex 10, pointerEvents auto`; inactive:
> `opacity 0, zIndex 0, pointerEvents none`; crossfade 350ms easeInOut.
> Videos play only while their slide is active (pause otherwise).
>
> **The five scenes — each a DISTINCT composition, not one layout with
> swapped backgrounds:**
> 1. **Abertura** — film hero: streaming/ambient video + scrim, centered
>    eyebrow + display headline (ember highlight) + subcopy + CTA pair.
> 2. **Prova** — numbers wall on ink + dawn radial: left-set eyebrow +
>    headline, then a 2×2/1×4 stat rank of ember display numerals
>    (`clamp(2.6rem, 6vw, 4.6rem)`) with caps labels, closed by a growth
>    pill (`rounded-full bg-accent-700/15`).
> 3. **Oferta** — single-statement scene over footage: one giant ember
>    figure (`clamp(4.5rem, 13vw, 11rem)`) + one sentence + primary CTA.
> 4. **Confiança** — warm-paper certificate card on the ink stage
>    (component recipe 03 §7 "certificate card"): caps eyebrow, display
>    figure + caption row (`items-center`), full-width hairline, then a
>    2-column registry row with matched label rhythm. Keeps the dark
>    chrome legible because the stage stays ink.
> 5. **Convite** — interactive instrument (calculator/form) or final CTA
>    over the most intimate footage.
>
> **Navigation:** keyboard `→ ↓ Space` next / `← ↑` prev with
> preventDefault, active only while ≥55% in view and no form field is
> focused. Centered bottom dots: active ember pill `w-6 h-2`, idle
> `bg-white/40 w-2 h-2`.
>
> **Auto-advance (carousel):** every 7s. Back off 14s after manual nav.
> Skip while: tab hidden, deck <55% in view, focus inside a form field, or
> reduced motion. **Park-on-engagement:** any pointerdown/keydown inside
> the slide-5 instrument arms a flag that suspends rotation on that slide
> (covers post-submit states with no focus); leaving the slide re-arms.
>
> **Exit:** melt the deck into the page with a bottom `h-24` gradient to
> `rgba(29,29,27,0.92)`.

**Presentation adaptation:** scenes = slides; keyboard nav is already
presentation-grade; disable auto-advance (presenter-driven) or set it to
`[SECONDS]` for kiosk loops. **Panel adaptation:** remove dots/keyboard,
keep auto-advance, double type.

**GOTCHAS:** the deck must look *different per scene* — a deck that reuses
one hero layout with different videos was rejected in review as "looks the
same". Keep every slide's media mounted or you pay a re-buffer on each
rotation.

---

## 5 · "Golden-hour Shader" — animated mesh gradient

**When:** no licensed footage available, or a lighter-weight ambient hero;
also the most stylable (works on light backgrounds).

### PROMPT

> Build a full-viewport hero over an animated mesh-gradient canvas
> (`@paper-design/shaders-react` MeshGradient or equivalent).
>
> **Palettes (validated "deeper, de-yellowed" golden hour):**
> dark `["#1D1D1B", "#2c2012", "#8a6116", "#D9820E", "#C98A2E"]` ·
> light `["#FAF7F2", "#F2E3C0", "#E8B85A", "#E07E10", "#C98A2E"]`.
> **Parameters:** `speed 0.28, distortion 0.9, swirl 0.18`, shader layer
> opacity `0.62` (the veil keeps it matte, not neon).
>
> **Fallbacks:** paint a CSS gradient first and always
> (dark `linear-gradient(160deg, #1D1D1B, #2a1f12 55%, #4a3210)`;
> light `linear-gradient(160deg, #FAF7F2, #F2E3C0 55%, #E8B85A)`) — the
> shader is dynamically imported (no SSR) and fades in on top. Reduced
> motion: `speed 0` (static frame).
>
> **Content:** type-as-hero — eyebrow + display headline
> (`clamp(2.6rem, 6.6vw, 5.9rem)`, key phrase in ember) + subcopy + CTA
> pair + trust strip, left-set with an optional instrument card right.
> Subtle scroll parallax on the content (`y 0→40px`, opacity 1→0.6 over the
> hero's scroll range).

**Presentation adaptation:** perfect section-divider/background slides —
render one static frame (speed 0) per slide for zero distraction.

**GOTCHAS:** keep shader opacity ≤0.7 and chroma low — full-strength mesh
gradients drift into the banned neon territory. Always dynamic-import; the
shader must never block LCP.
