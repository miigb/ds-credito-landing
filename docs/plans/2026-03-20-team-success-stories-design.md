# Team Page + Homepage Preview — Design Document

## Summary

Add a dedicated `/equipa` page with a full 6-person team grid and placeholder success stories in an asymmetric bento layout. A compact 3-person preview section on the main homepage links to the full page. All styling follows the DS landing page dark editorial design system.

## Architecture

### New Files
- `src/lib/teamData.ts` — team member data (names, roles, photos, bios, featured flag)
- `src/components/TeamPreview.tsx` — homepage compact preview (3 featured members)
- `src/components/TeamGrid.tsx` — full 6-person grid for /equipa
- `src/components/SuccessStories.tsx` — bento grid with testimonials + metrics
- `src/app/equipa/page.tsx` — dedicated team page route

### Modified Files
- `src/app/page.tsx` — insert TeamPreview between WhyUs and Contact/PreQualification
- `src/components/Navbar.tsx` — add "Equipa"/"Team" nav link
- `src/lib/translations.ts` — add team + success stories translation keys

## Data Structure

```ts
// src/lib/teamData.ts
export interface TeamMember {
  id: string;
  name: string;
  role: { pt: string; en: string };
  bio: { pt: string; en: string };
  photo: string; // path in /public/team/
  featured: boolean; // true = shows on homepage preview
  linkedin?: string;
  order: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "paulo-brito",
    name: "Paulo Brito",
    role: { pt: "Founder / Agente de Intermediação", en: "Founder / Credit Intermediation Agent" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/paulo-brito.jpg",
    featured: true,
    order: 1,
  },
  {
    id: "patricia",
    name: "Patrícia",
    role: { pt: "Senior Agent / Sales Lead", en: "Senior Agent / Sales Lead" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/patricia.jpg",
    featured: true,
    order: 2,
  },
  {
    id: "armanda-amorim",
    name: "Armanda Amorim",
    role: { pt: "Senior Agent / Partnership Program Lead", en: "Senior Agent / Partnership Program Lead" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/armanda-amorim.jpg",
    featured: true,
    order: 3,
  },
  {
    id: "agent-4",
    name: "TBD",
    role: { pt: "Credit Intermediation Agent", en: "Credit Intermediation Agent" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 4,
  },
  {
    id: "agent-5",
    name: "TBD",
    role: { pt: "Credit Intermediation Agent", en: "Credit Intermediation Agent" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 5,
  },
  {
    id: "agent-6",
    name: "TBD",
    role: { pt: "Credit Intermediation Agent", en: "Credit Intermediation Agent" },
    bio: { pt: "Placeholder", en: "Placeholder" },
    photo: "/team/placeholder.jpg",
    featured: false,
    order: 6,
  },
];
```

## Component Designs

### TeamPreview (homepage)
- Position: after WhyUs, before Contact/PreQualification
- Dark bg (brand-900) with subtle accent glow orb
- Eyebrow → headline → 3 cards row → CTA button to /equipa
- Cards: circular photo (grayscale→color hover), name, role
- Bilingual via useLanguage()

### TeamGrid (/equipa page)
- 3x2 grid desktop, 2x3 tablet, 1-column mobile
- Larger cards: 96px round photo, name, title, short bio, LinkedIn icon
- bg-white/5 with hover:bg-white/10, no borders
- Grayscale→color hover on photos
- framer-motion fadeUp stagger animation

### SuccessStories (/equipa page)
- Asymmetric bento grid (12-col):
  - Left 5/12: headline + 2 vault stats
  - Right 7/12: large testimonial card with quote, initials avatar, metric badge
  - Bottom: 2 cards (4/12 dark testimonial + 8/12 metric-focused)
- All placeholder content, structured for easy replacement
- Glass effects on stat cards, accent glow backgrounds

### /equipa page layout
1. Hero section (dark gradient, eyebrow + headline)
2. TeamGrid
3. SuccessStories
4. CTA section linking to /#contact

## Styling Rules (design system compliance)
- No 1px borders for sectioning — tonal shifts only
- Cards: bg-white/5 border-white/10 rounded-xl
- Photos: grayscale group-hover:grayscale-0
- Eyebrows: text-accent-400 tracking-widest uppercase
- Headlines: text-white font-bold tracking-tight, accent word in text-accent-400
- Body: text-white/60
- Buttons: bg-accent-700 rounded-2xl shadow-accent-700/30
- Animations: framer-motion fadeUp, staggerChildren 0.1s, whileInView once

## Navigation
- Add "Equipa" (PT) / "Team" (EN) to Navbar between "Why Us" and "Contact"
- Links to /equipa (not anchor scroll)
