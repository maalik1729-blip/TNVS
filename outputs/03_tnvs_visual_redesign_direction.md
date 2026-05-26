# Visual Redesign Direction: TNVS Trader Portal

This document establishes the premium visual design direction and styling guidelines for the Tamil Nadu Vanigargalin Sangamam (TNVS) Trader Portal. It sets up guidelines for typography, layout systems, color contrast rules, form visual states, and responsive styling patterns based on a premium, Stripe-like aesthetic tailored to a formal institutional portal.

---

## 1. Visual Design Philosophy

The redesign centers around **institutional trust, modern clean lines, and premium micro-details**. The visual system leverages:
* **The "Parchment & Ink" Aesthetic**: Combining rich, warm parchment light surfaces with crisp, deep-indigo ink text tones to create a classic, authoritative feel.
* **Modern Minimalist Accents**: Incorporating soft saffron gold highlights and crisp, clean card layouts to elevate the interface.
* **Spacious visual breathing room**: Using standard spacing rules to eliminate visual noise.

---

## 2. Typography Recommendations

To ensure maximum readability for both Tamil and English scripts:

* **English Font Stack**: Use **Inter** for crisp, highly legible body text and **Fraunces** for elegant, trust-inspiring headers.
* **Tamil Font Stack**: Use **Noto Serif Tamil** for headers and **Noto Sans Tamil** for functional interfaces, labels, and forms.
* **Line-heights (Critical Adjustments)**:
  * Latin Headings: `1.1` to `1.2`.
  * Tamil Headings: Minimum `1.25` to `1.3` to prevent loops from clipping.
  * Body Text: `1.6` for optimal legibility.

---

## 3. Layout & Spacing System

* **Double Border Prevention**:
  * Set a strict divider convention: adjacent page sections must use either a single top border (`border-t border-border/50`) or single bottom border (`border-b`), never both.
* **Standard Grid Gaps**:
  * 2-column layouts: Use `gap-6` (`24px`).
  * 3-column layouts: Use `gap-8` (`32px`) to ensure ample breathing room.
  * Form layouts: Use `space-y-5` to separate input fields cleanly.

---

## 4. Color Hierarchy & Accent Rules

We leverage a refined HSL/OKLCH color system to support high readability and unified styling:

* **Primary Backgrounds**: Warm light cream/parchment (`bg-[#fdfbf7]` / `oklch(0.985 0.012 85)`).
* **Primary Text (Ink)**: Rich, dark slate-indigo (`oklch(0.14 0.020 252)`).
* **Brand Highlights**: Clean saffron gold (`oklch(0.78 0.12 85)`). Used only for borders, active state highlights, and icon rings.
* **Dark Mode Adaptability**:
  * Avoid pure black (`#000`). Use a deep, saturated navy-charcoal background (`bg-slate-900` or `oklch(0.20 0.025 252)`) with warm, off-white card backgrounds to preserve the parchment identity.

---

## 5. Navigation Redesign (`SiteHeader.tsx`)

* **Active Path Indicators**:
  * Replace the static underline indicator with a sleek, pill-shaped active state wrapper: `.bg-primary/5 text-primary` with a high-contrast accent dot.
* **Mobile Slide-Out Drawer**:
  * Clean up drawer visual borders. Implement a soft backdrop blur (`backdrop-blur-md bg-white/95`) with smooth fade-in animations on menu items.

---

## 6. Dashboard Redesign (`dashboard.tsx`)

* **Stat Cards Simplification**:
  * Remove background noise and decorative grids.
  * Place values in a solid container: a large, crisp font size (`text-3xl`) in Deep Navy, paired with a small, high-contrast label.
* **Activity Grid**:
  * Group items into clean timeline events using dot indicator badges (`.status-pill` variants).

---

## 7. Card Component Redesign

### A. The Stacking Deck (`StackedServices.tsx`)
* **Visual States**:
  * Resting: Cards stack dynamically with visible, overlapping borders and a subtle, dark-mode border highlight.
  * Hover: Card scales up smoothly (`scale-[1.02]`), shifts position (`translateY(-8px) translateX(8px)`), and displays a premium golden accent glow.

### B. Wings Category Panels (`wings.tsx`)
* **Design**: Use a clean, grid-based card layout.
* **Tamil labels**: Align categories clearly with primary bold text, separating sub-wing details with secondary light lines.

---

## 8. Form Redesign (`FloatingInput.tsx`)

* **Input Fields**:
  * A warm white background (`#ffffff`), rounded corners (`rounded-[10px]`), and a soft slate border.
* **Focus States**:
  * Focus triggers a crisp primary navy outline: `border-primary` with a soft primary box-shadow shadow (`box-shadow: 0 0 0 3px rgba(30, 41, 59, 0.1)`).
* **Validation Indicators**:
  * Error inputs must display a clear red outline (`border-destructive`) and a descriptive sub-text indicator.

---

## 9. Button System

Enforce three premium, highly consistent button styles:

1. **Button Primary (`.btn-primary`)**:
   * Solid deep-navy background.
   * Hover: Darkens slightly and displays a subtle shadow glow. On hover, the arrow icon slides `4px` to the right.
2. **Button Secondary (`.btn-secondary`)**:
   * Clean white/parchment background with a thin border.
   * Hover: A light gray background highlight (`bg-slate-100/50`) with an updated border color.
3. **Button Ghost (`.btn-ghost`)**:
   * No background. Clean, bordered primary text.
   * Hover: Shifts to a light primary background highlight (`bg-primary/5`).

---

## 10. Mobile-first Design Adjustments

* **Voter Card Display**:
  * Implement the `.card-scale-wrapper` with a scale transition. This automatically down-scales the credential card graphics (`VoterIdCard.tsx`) on small mobile screens (under `360px` width) so it is fully visible and printable.

---

## 11. UI Consistency Rules

* **Border Radius**:
  * Form inputs: `rounded-[10px]` (`--radius-input`).
  * Content cards: `rounded-[12px]` (`--radius-card`).
  * Overlay modals: `rounded-[16px]` (`--radius-modal`).
* **Active States**:
  * All interactive clicks must provide tactile feedback (`scale(0.97)` on click) and transition within `150ms` to feel highly responsive.
