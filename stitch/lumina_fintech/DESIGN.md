# Design System Specification: The Ethereal Authority

## 1. Overview & Creative North Star

### Creative North Star: "The Ethereal Authority"
This design system rejects the "boxed-in" nature of traditional fintech templates. Instead, it embraces an editorial aesthetic that balances the unwavering trust of institutional finance with the fluid, light-filled movements of modern technology. We achieve this through **Organic Asymmetry** and **Tonal Depth**.

The goal is to create a digital experience that feels like a premium physical space—heavy, high-quality materials (the deep navies) contrasted with light-refracting glass elements (the magenta and blurred surfaces). We move away from 12-column rigid grids, preferring intentional white space and overlapping elements that guide the eye through hierarchy rather than borders.

---

## 2. Colors

The palette is anchored by deep, authoritative navies and electrified by a signature magenta. To maintain a high-end feel, color is used as a functional tool for layering rather than just decoration.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be defined exclusively through:
- **Background Color Shifts:** Placing a `surface-container-low` section against a `surface` background.
- **Tonal Transitions:** Using subtle gradients to suggest the end of one content area and the beginning of another.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of materials. 
1. **Base Layer:** `surface` (#fcf8ff).
2. **Structural Depth:** Use `surface-container-low` (#f5f2ff) for large structural blocks.
3. **Elevated Content:** Use `surface-container-lowest` (#ffffff) for the highest-priority cards to make them appear "closer" to the user.
4. **Interactive Elements:** Use `surface-container-high` (#e8e5ff) to indicate recessed or nested areas.

### The "Glass & Gradient" Rule
To escape the "standard" feel, use **Glassmorphism** for floating elements (headers, navigation bars, or modal overlays).
- **Token Application:** Combine `surface` colors at 70% opacity with a `backdrop-blur` of 20px.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#000012) to `primary-container` (#1a1a31) for hero sections to add "soul" and professional depth.

---

## 3. Typography

**Primary Typeface:** Inter
Inter is a workhorse that becomes editorial when used at extreme scales.

- **Display (Display-LG/MD):** Used for "Big Bold Truths." Use `primary-container` color. Set with tighter letter-spacing (-0.02em) to create a sense of density and importance.
- **Headlines (Headline-LG/MD):** The narrative voice. These should have generous leading to feel "breathable."
- **Title (Title-LG/SM):** Used for navigation and section headers. 
- **Body (Body-LG/MD):** The data layer. Use `on-surface-variant` (#47464d) for long-form reading to reduce eye strain and increase the "premium" feel.
- **Labels (Label-MD/SM):** Strictly for metadata or micro-copy. Always in Uppercase with +0.05em tracking for a "technical" look.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines or heavy shadows.

### The Layering Principle
Depth is achieved by stacking the `surface-container` tiers. 
- *Example:* A card using `surface-container-lowest` (#ffffff) sitting on a section of `surface-container-low` (#f5f2ff) creates a soft, natural lift.

### Ambient Shadows
Shadows are only permitted for "Floating" elements (Modals, Hovered Cards).
- **Specification:** Shadows must be ultra-diffused. Use `blur: 40px`, `spread: -10px`.
- **Shadow Color:** Do not use black. Use a 6%–8% opacity version of `primary-container` (#1a1a31) to mimic natural light refraction within the brand's blue-tinged world.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use the **Ghost Border**: 
- Token: `outline-variant` (#c8c5cd) at **15% opacity**. 
- **Forbidden:** 100% opaque borders of any kind.

---

## 5. Components

### Buttons
- **Primary:** Background `secondary` (#a62b7a), Text `on-secondary` (#ffffff). Shape: `full` roundedness (Pill). Use a subtle 2px glow shadow of the same color on hover.
- **Secondary:** Background `primary-container` (#1a1a31), Text `on-primary`. Shape: `full`.
- **Tertiary:** Text-only with an underline that only appears on hover. Use `primary-fixed-dim` for the text color.

### Cards & Lists
- **Rule:** Divider lines are strictly forbidden. 
- **Separation:** Use `spacing-8` (2rem) of vertical white space or shift the background from `surface-container-lowest` to `surface-container-low`.
- **Corners:** Use `xl` (1.5rem) roundedness for large cards to soften the professional edge.

### Input Fields
- **Style:** Background `surface-container-low`. Border: `none` at rest, `Ghost Border` on focus.
- **Label:** Use `Label-MD` sitting above the field, never inside as placeholder text. This maintains "Trustworthy" accessibility.

### Signature Component: The "Luminous Badge"
For status or categories (e.g., "Active," "Verified"), use a pill-shaped `chip` with a 10% opacity background of the state color (e.g., `secondary` for magenta) and 100% opacity text. This creates a "glow" effect without being loud.

---

## 6. Do's and Don'ts

### Do
- **Embrace Asymmetry:** Offset images and text blocks by one or two spacing units to create an editorial layout.
- **Use "Breathing Room":** If you think a section needs more space, use the next level up in the Spacing Scale (e.g., move from `16` to `20`).
- **Color-Logic:** Use `secondary` (#a62b7a) only for actions you want the user to take *now*. Use `primary` for everything they need to *know*.

### Don't
- **Don't use Dividers:** Never use a line to separate content. If the content is different, the background color or the whitespace should tell the story.
- **Don't use Pure Black:** Always use `primary` (#000012) or `on-background` (#191930) for text. Pure black (#000000) breaks the ethereal blue-toned atmosphere.
- **Don't Over-Animate:** Transitions should be "Snappy but Soft." Use 300ms durations with a `cubic-bezier(0.4, 0, 0.2, 1)` easing.