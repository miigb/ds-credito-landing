import * as React from 'react'

/**
 * Letraperfeiçoada brand iconography — recreated from MANUAL DE NORMAS p.12.
 *
 * Line-art on a 32-unit grid, 1.4 stroke, round caps/joins, single colour via
 * `currentColor`, with the sun-ray motif woven through. Designed for feature
 * use (empty states, section accents, hero moments) rather than dense inline
 * UI — set `size` ≥ 32 for best legibility.
 */

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

function Svg({ size = 32, children, ...props }: BrandIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

const dot = { fill: 'currentColor', stroke: 'none' } as const

/* ── 01 · DAWN — half sun rising with rays over a horizon ───────────────── */
export function DawnIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <line x1="4" y1="22" x2="28" y2="22" />
      <path d="M11 22 A5 5 0 0 1 21 22" />
      <line x1="16" y1="13.5" x2="16" y2="10" />
      <line x1="19.4" y1="14.6" x2="21" y2="11.4" />
      <line x1="12.6" y1="14.6" x2="11" y2="11.4" />
      <line x1="22.2" y1="16.7" x2="24.9" y2="14.6" />
      <line x1="9.8" y1="16.7" x2="7.1" y2="14.6" />
      <line x1="23.5" y1="19.3" x2="26.8" y2="18.2" />
      <line x1="8.5" y1="19.3" x2="5.2" y2="18.2" />
    </Svg>
  )
}

/* ── 02 · POSSIBILITY — full radial sunburst around a core ──────────────── */
export function PossibilityIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="16" r="3.4" />
      <line x1="16" y1="9.5" x2="16" y2="5" />
      <line x1="16" y1="22.5" x2="16" y2="27" />
      <line x1="9.5" y1="16" x2="5" y2="16" />
      <line x1="22.5" y1="16" x2="27" y2="16" />
      <line x1="11.4" y1="11.4" x2="8.2" y2="8.2" />
      <line x1="20.6" y1="11.4" x2="23.8" y2="8.2" />
      <line x1="11.4" y1="20.6" x2="8.2" y2="23.8" />
      <line x1="20.6" y1="20.6" x2="23.8" y2="23.8" />
      <line x1="13.3" y1="10.1" x2="11.6" y2="6.1" />
      <line x1="18.7" y1="10.1" x2="20.4" y2="6.1" />
      <line x1="13.3" y1="21.9" x2="11.6" y2="25.9" />
      <line x1="18.7" y1="21.9" x2="20.4" y2="25.9" />
    </Svg>
  )
}

/* ── 03 · GROWTH — sun over horizon water-lines ─────────────────────────── */
export function GrowthIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M10 17 A6 6 0 0 1 22 17" />
      <line x1="16" y1="8.5" x2="16" y2="6" />
      <line x1="21.3" y1="10.4" x2="23" y2="8.7" />
      <line x1="10.7" y1="10.4" x2="9" y2="8.7" />
      <line x1="6" y1="20" x2="26" y2="20" />
      <line x1="8.5" y1="23.5" x2="23.5" y2="23.5" />
      <line x1="11" y1="27" x2="21" y2="27" />
    </Svg>
  )
}

/* ── 04 · PROTECTION — shield with an inner ray burst ───────────────────── */
export function ProtectionIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M16 4 L26 8 V15 C26 22 21.5 25.6 16 28 C10.5 25.6 6 22 6 15 V8 Z" />
      <line x1="16" y1="16.5" x2="16" y2="12.5" />
      <line x1="13" y1="17.2" x2="11.4" y2="14" />
      <line x1="19" y1="17.2" x2="20.6" y2="14" />
      <line x1="10.8" y1="18.6" x2="8.6" y2="16.6" />
      <line x1="21.2" y1="18.6" x2="23.4" y2="16.6" />
    </Svg>
  )
}

/* ── 05 · PROGRESS — ascending bars + trend arrow ───────────────────────── */
export function ProgressIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <line x1="5" y1="27" x2="27" y2="27" />
      <rect x="6.5" y="19" width="3.6" height="8" />
      <rect x="14.2" y="15" width="3.6" height="12" />
      <rect x="21.9" y="10" width="3.6" height="17" />
      <polyline points="6,13 13,9.5 20,11 27,5" />
      <polyline points="22.5,5 27,5 27,9.5" />
    </Svg>
  )
}

/* ── 06 · INVESTMENT — dollar in a circle ───────────────────────────────── */
export function InvestmentIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="16" r="10.5" />
      <line x1="16" y1="8.5" x2="16" y2="23.5" />
      <path d="M19.6 12.2 C19.6 10.4 18 9.8 16 9.8 C13.7 9.8 12.4 10.9 12.4 12.4 C12.4 14.1 14 14.7 16 15.3 C18 15.9 19.6 16.6 19.6 18.3 C19.6 19.9 18.1 21 16 21 C13.8 21 12.3 20.2 12.3 18.3" />
    </Svg>
  )
}

/* ── 07 · SUPPORT — an open hand raising a small sun ────────────────────── */
export function SupportIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="10" r="2" />
      <line x1="16" y1="5.5" x2="16" y2="3.5" />
      <line x1="12.8" y1="6.8" x2="11.4" y2="5.4" />
      <line x1="19.2" y1="6.8" x2="20.6" y2="5.4" />
      <path d="M5 18 C9 25 23 25 27 18" />
      <line x1="5" y1="18" x2="5" y2="20.5" />
      <line x1="27" y1="18" x2="27" y2="20.5" />
    </Svg>
  )
}

/* ── 08 · GUIDANCE — eight-point guiding star ───────────────────────────── */
export function GuidanceIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M16 3 L18.4 13.6 L29 16 L18.4 18.4 L16 29 L13.6 18.4 L3 16 L13.6 13.6 Z" />
      <path d="M23.5 8.5 L17.6 14.4 M8.5 23.5 L14.4 17.6 M23.5 23.5 L17.6 17.6 M8.5 8.5 L14.4 14.4" opacity="0.55" />
    </Svg>
  )
}

/* ── 09 · COMMUNITY — three people beneath a small burst ────────────────── */
export function CommunityIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="14.5" r="2.4" />
      <path d="M11 25 C11 20.8 21 20.8 21 25" />
      <circle cx="8.5" cy="16" r="2" />
      <path d="M4.5 25 C4.5 21.4 9.5 21 11 22.4" />
      <circle cx="23.5" cy="16" r="2" />
      <path d="M27.5 25 C27.5 21.4 22.5 21 21 22.4" />
      <line x1="16" y1="9.5" x2="16" y2="7" />
      <line x1="13.2" y1="10.3" x2="11.9" y2="8" />
      <line x1="18.8" y1="10.3" x2="20.1" y2="8" />
    </Svg>
  )
}

/* ── 10 · TRUST — a handshake ───────────────────────────────────────────── */
export function TrustIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 13 L9 13 L14.5 17.5 C15.4 18.2 15.4 19.4 14.3 19.8 C13.6 20.1 12.9 19.9 12.3 19.4 L10 17.5" />
      <path d="M28 13 L23 13 L16.5 18.2" />
      <path d="M13 19.6 L15.6 21.6 C16.4 22.2 17.4 22 17.9 21.2" />
      <path d="M16.6 21 L18.8 22.6 C19.6 23.2 20.6 23 21 22.2" />
      <line x1="4" y1="13" x2="4" y2="19" />
      <line x1="28" y1="13" x2="28" y2="19" />
    </Svg>
  )
}

/* ── 11 · CREDIT — a document with a small sun at its foot ──────────────── */
export function CreditIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M9 4 H20 L23 7 V28 H9 Z" />
      <path d="M20 4 V7 H23" />
      <line x1="12" y1="11" x2="20" y2="11" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="17" x2="17" y2="17" />
      <path d="M13 24 A3 3 0 0 1 19 24" />
      <line x1="16" y1="20.5" x2="16" y2="19" />
      <line x1="20.2" y1="21.4" x2="21.3" y2="20.3" />
      <line x1="11.8" y1="21.4" x2="10.7" y2="20.3" />
    </Svg>
  )
}

/* ── 12 · SOLIDITY — a bank / temple façade ─────────────────────────────── */
export function SolidityIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M5 11 L16 5 L27 11 Z" />
      <line x1="5" y1="11" x2="27" y2="11" />
      <line x1="9" y1="13" x2="9" y2="24" />
      <line x1="14" y1="13" x2="14" y2="24" />
      <line x1="18" y1="13" x2="18" y2="24" />
      <line x1="23" y1="13" x2="23" y2="24" />
      <line x1="6" y1="24" x2="26" y2="24" />
      <line x1="4.5" y1="27" x2="27.5" y2="27" />
    </Svg>
  )
}

/* ── 13 · RENEWAL — circular refresh arrows around a small sun ──────────── */
export function RenewalIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M25 13 A10 10 0 0 0 8.5 9.5" />
      <polyline points="8.5,5 8.5,9.8 13,9.8" />
      <path d="M7 19 A10 10 0 0 0 23.5 22.5" />
      <polyline points="23.5,27 23.5,22.2 19,22.2" />
      <circle cx="16" cy="16" r="1.4" {...dot} />
      <line x1="16" y1="12.5" x2="16" y2="14" />
      <line x1="13" y1="13.6" x2="13.9" y2="14.9" />
      <line x1="19" y1="13.6" x2="18.1" y2="14.9" />
    </Svg>
  )
}

/* ── 14 · FOCUS — a target with cardinal ticks ──────────────────────────── */
export function FocusIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="16" r="9.5" />
      <circle cx="16" cy="16" r="5" />
      <circle cx="16" cy="16" r="1.4" {...dot} />
      <line x1="16" y1="3.5" x2="16" y2="7" />
      <line x1="16" y1="25" x2="16" y2="28.5" />
      <line x1="3.5" y1="16" x2="7" y2="16" />
      <line x1="25" y1="16" x2="28.5" y2="16" />
    </Svg>
  )
}

/* ── 15 · CLARITY — a radiant burst from a single point ─────────────────── */
export function ClarityIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <circle cx="16" cy="16" r="1.6" {...dot} />
      <line x1="16" y1="11" x2="16" y2="4" />
      <line x1="16" y1="21" x2="16" y2="28" />
      <line x1="11" y1="16" x2="4" y2="16" />
      <line x1="21" y1="16" x2="28" y2="16" />
      <line x1="12.5" y1="12.5" x2="7.5" y2="7.5" />
      <line x1="19.5" y1="12.5" x2="24.5" y2="7.5" />
      <line x1="12.5" y1="19.5" x2="7.5" y2="24.5" />
      <line x1="19.5" y1="19.5" x2="24.5" y2="24.5" />
      <line x1="13.7" y1="11.4" x2="11.6" y2="5.6" />
      <line x1="18.3" y1="11.4" x2="20.4" y2="5.6" />
    </Svg>
  )
}

/* ── 16 · REACH — a location pin cradling a small sun ───────────────────── */
export function ReachIcon(props: BrandIconProps) {
  return (
    <Svg {...props}>
      <path d="M16 28.5 C10.5 22 7 17.5 7 13 A9 9 0 0 1 25 13 C25 17.5 21.5 22 16 28.5 Z" />
      <path d="M11.5 15 A4.5 4.5 0 0 1 20.5 15" />
      <line x1="16" y1="8.5" x2="16" y2="6.5" />
      <line x1="12.9" y1="9.6" x2="11.6" y2="8.2" />
      <line x1="19.1" y1="9.6" x2="20.4" y2="8.2" />
    </Svg>
  )
}

/* ── Ray-pattern motifs (decorative section accents) ────────────────────── */

/** Half-sun fan of rays — the primary ray motif. Defaults to a wide banner ratio. */
export function RayBurst({ width = 120, height = 80, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 80" fill="none" stroke="currentColor"
      strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M24 60 A36 36 0 0 1 96 60" />
      <line x1="60" y1="24" x2="60" y2="8" />
      <line x1="48" y1="26" x2="44" y2="11" />
      <line x1="72" y1="26" x2="76" y2="11" />
      <line x1="38" y1="33" x2="28" y2="20" />
      <line x1="82" y1="33" x2="92" y2="20" />
      <line x1="31" y1="43" x2="17" y2="34" />
      <line x1="89" y1="43" x2="103" y2="34" />
      <line x1="27" y1="54" x2="11" y2="50" />
      <line x1="93" y1="54" x2="109" y2="50" />
    </svg>
  )
}

/** Rays fanning from a corner — the corner ray motif. */
export function CornerRay({ size = 80, ...props }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke="currentColor"
      strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <line x1="10" y1="70" x2="10" y2="14" />
      <line x1="10" y1="70" x2="70" y2="70" />
      <line x1="14" y1="66" x2="34" y2="16" />
      <line x1="22" y1="68" x2="54" y2="24" />
      <line x1="34" y1="69" x2="70" y2="34" />
      <line x1="48" y1="69.5" x2="70" y2="48" />
    </svg>
  )
}

/* ── Registry ───────────────────────────────────────────────────────────── */

export const brandIcons = {
  dawn: DawnIcon,
  possibility: PossibilityIcon,
  growth: GrowthIcon,
  protection: ProtectionIcon,
  progress: ProgressIcon,
  investment: InvestmentIcon,
  support: SupportIcon,
  guidance: GuidanceIcon,
  community: CommunityIcon,
  trust: TrustIcon,
  credit: CreditIcon,
  solidity: SolidityIcon,
  renewal: RenewalIcon,
  focus: FocusIcon,
  clarity: ClarityIcon,
  reach: ReachIcon,
} as const

export type BrandIconName = keyof typeof brandIcons

/** Render a brand icon by name. */
export function BrandIcon({ name, ...props }: { name: BrandIconName } & BrandIconProps) {
  const Icon = brandIcons[name]
  return <Icon {...props} />
}
