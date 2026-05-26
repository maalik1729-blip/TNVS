# TNVS Visual Redesign Direction

This blueprint details the visual redesign direction for the Tamil Nadu Vanigargalin Sangamam (TNVS) Trader Portal, ensuring a highly polished, professional, and trustworthy presentation based on modern design systems (referencing high-fidelity standards like Stripe and Linear).

---

## Visual Design Philosophy

The redesign centers around three core pillars: **Heritage, Institutional Trust, and Modernity**.

```
    [ Heritage ] ──────────> Warm Parchment / Cream Backgrounds
  [ Institutional ] ───────> Deep Royal Navy Borders & Type
    [ Modernity ] ─────────> Micro-Animations, 3D Cards, Fluid Type
```

1. **Light Parchment (`bg-[#fdfbf7]`)**: Replaces standard gray/white backgrounds with an authentic, warm, and highly professional parchment tone that respects traditional trading certificates.
2. **Deep Royal Navy (`primary`)**: Serves as the primary brand color for structural borders, headings, and critical focus states, building immense credibility.
3. **Gold Highlights (`gold`)**: Saffron gold is used exclusively as a premium accent color (for active status indicators, section label lines, and card corner gradients), never as dense body text.

---

## Typography Recommendations

To support bilingual readability, we enforce clear font-family rules in `styles.css`:
* **Latin Typography**: Font-family is set to `Inter` (sans-serif) for body text and `Fraunces` (serif) for major display headings.
* **Tamil Typography**: Font-family is locked to `'Noto Sans Tamil', 'Noto Serif Tamil', sans-serif` to ensure elegant and highly legible rendering of native characters.
* **Line Heights for Tamil**: Increased Tamil text blocks to `line-height: 1.5` or `1.6` (from default `1.2` or `1.3`) to prevent complex upper/lower vowels from overlapping.

```css
/* Core Typography Rules */
h1, h2, h3 {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

:lang(ta), .font-tamil {
  font-family: 'Noto Sans Tamil', 'Noto Serif Tamil', sans-serif;
  line-height: 1.5 !important;
}
```

---

## Layout System

* **Double Border Elimination**: Standardize section layouts in `index.tsx` so borders are top-only (`border-t border-border/50`). No section should have adjacent bottom and top borders.
* **Compact Viewport Sizing**: Enforce a safe maximum outer height for scroll-driven animations (`lg:h-[125vh]` in `HorizontalSteps.tsx`) to completely prevent empty white space at the bottom once the component unsticks.

---

## Color Hierarchy

| Color Token | Value (OKLCH) | Usage |
| :--- | :--- | :--- |
| `background` | `oklch(0.985 0.012 85)` | Page base background (Warm cream/parchment) |
| `primary` | `oklch(0.30 0.14 255)` | Deep Royal Navy (Headings, primary buttons, borders) |
| `secondary` | `oklch(0.95 0.02 245)` | Muted gray-blue (Inactive tabs, backgrounds) |
| `gold` | `oklch(0.78 0.12 85)` | Saffron Gold (Decorative badges, labels, accents) |
| `border` | `oklch(0.88 0.015 90)` | Clean thin grid border dividers |

---

## Card Component Redesign

### 1. Stacked Services Deck (`src/components/StackedServices.tsx`)
- Implement distinct soft drop shadows (`box-shadow: var(--shadow-md)`) on every card to clearly demarcate card layers.
- Apply a high-performance CSS transition scaling effect on scroll to make each deck entry slide cleanly under the subsequent card.
- Add an interactive 3D fanning translate hover transition to each service card:
```css
.card-interactive:hover {
  transform: translateY(-8px) translateX(8px);
  box-shadow: 0 12px 32px -8px oklch(0.30 0.14 255 / 0.18);
  border-color: oklch(from var(--color-primary) l c h / 0.30);
}
```

---

## Form Redesign

- **Floating Labels**: Keep inputs looking clean and structured using labels that scale down (`scale-75`) and float upward upon text detection or input focus.
- **Input Borders**: Enforce a rounded corner index `var(--radius-input)` (10px) with solid border styling.
- **Focus Rings**: Replace basic browser focus styles with a high-contrast deep navy shadow ring:
```css
.input-base:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
}
```

---

## Button System

Three core variants are strictly enforced:
1. **Primary Button (`.btn-primary`)**: Deep navy background with subtle arrow micro-animations (e.g., arrow shifts right on hover). Minimum height `48px`.
2. **Secondary Button (`.btn-secondary`)**: Clean white background with a thin slate border and dark navy text. Focus outline custom shadow.
3. **Danger Button (`.btn-danger`)**: Light red background with dark red text for warnings and deletions.

---

## Mobile-first Design Adjustments

* **Voter Card Wrapper Scaling**: The visual credential layout `VoterIdCard.tsx` must scale gracefully using a scale transform container so it never overlaps or exceeds the viewport width on narrow screen sizes:
```css
.responsive-card-scale {
  transform-origin: center center;
  transition: transform 0.2s ease-in-out;
}
@media (max-width: 400px) {
  .responsive-card-scale { transform: scale(0.85); }
}
@media (max-width: 350px) {
  .responsive-card-scale { transform: scale(0.74); }
}
```
* **Swipe Indicators**: Add a faint, fading gold horizontal gradient at the right margins of chip containers to indicate horizontal swiping.
