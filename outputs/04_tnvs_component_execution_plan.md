# Component Execution Plan: TNVS Trader Portal

This execution plan translates the TNVS Visual Redesign specifications (`03_tnvs_visual_redesign_direction.md`) into direct, component-level frontend engineering tasks. It specifies file paths, classes, and interactions for developers to modify the portal.

---

## 1. Header & Navigation Changes (`SiteHeader.tsx`)

* **Current Issue**: Mobile navigation menu uses heavy, basic borders and lacks smooth transition micro-animations. Active states on links look static.
* **Redesign Goal**: Create a modern backdrop navigation panel with elegant hover states and sliding underlines.
* **Exact UI Changes**:
  * Apply `backdrop-blur-md bg-white/80 dark:bg-slate-900/80` to the header wrapper.
  * Implement dynamic navigation links with active underlines (`border-b-2 border-primary` on active routes).
* **Responsive Behavior**: Ensure mobile slide-out panel opens smoothly using a transform slide transition: `translate-x-0` (open) vs `translate-x-full` (closed).

---

## 2. Navigation Tab & Scroll Filter Improvements

* **Current Issue**: Category lists on pages like `wings.tsx` and `services.tsx` wrap onto multiple vertical rows on small viewports, pushing primary content down.
* **Redesign Goal**: Implement a touch-friendly single-row horizontal swipe menu.
* **Exact UI Changes**:
  * Apply the `.scroll-x` utility class to the category container:
    ```html
    <div className="flex gap-3 overflow-x-auto scrollbar-none scroll-x pb-2">
    ```
  * Ensure child category chips use `flex-shrink-0` to prevent them from squishing.
  * Add a subtle right fading mask gradient (`after:absolute after:right-0 after:h-full after:w-8 after:bg-gradient-to-l after:from-background after:pointer-events-none`).
* **Interaction**: Allow swipe scrolling on trackpads and mobile touch screens.

---

## 3. Onboarding & Registration Form Improvements (`membership.tsx`)

* **Current Issue**: The multi-step registration form consists of long screens. If users exit or encounter a validation warning, all input field values are cleared.
* **Redesign Goal**: Implement a step-by-step layout structure with secure field local-storage caching.
* **Exact UI Changes**:
  * Refactor step containers to mount conditionally inside the timeline component.
  * Apply `grid grid-cols-1 md:grid-cols-2 gap-5` to grouping blocks (Personal Info, Shop details).
* **Data Integration**:
  * Initialize a React state listener that writes data changes to `localStorage` on field blur (`onBlur`).
  * On component mount, check for existing cached drafts to pre-populate inputs.

---

## 4. Voter ID Card Sizing & Printing Task (`VoterIdCard.tsx`)

* **Current Issue**: The standard CR80 credential card clips on mobile screens under `360px` width.
* **Redesign Goal**: Guarantee that the full credential card, secure QR validation code, and signatures are legible on all smartphones.
* **Exact UI Changes**:
  * Wrap the `VoterIdCard` layout in a container with the `.card-scale-wrapper` and `.responsive-card-scale` utility classes:
    ```html
    <div className="card-scale-wrapper">
      <div className="responsive-card-scale origin-center flex-shrink-0">
        <!-- CR80 Card SVG or Layout here -->
      </div>
    </div>
    ```
  * Adjust scale values dynamically inside `styles.css`:
    ```css
    @media (max-width: 400px) { .responsive-card-scale { transform: scale(0.85); } }
    @media (max-width: 350px) { .responsive-card-scale { transform: scale(0.74); } }
    ```
* **Print Styling**: Add dedicated `@media print` rules to hide general page headers/footers, isolating only the card container for secure download/printing.

---

## 5. Dashboard Card Changes (`dashboard.tsx`)

* **Current Issue**: Widget cards display numerical stats over busy background grids, causing readability issues.
* **Redesign Goal**: Present data clearly with clean layout backgrounds and solid typography.
* **Exact UI Changes**:
  * Replace watermark grid background elements with a flat, clean background: `bg-card border border-border/80`.
  * Style numerical stat values with primary navy text: `text-3xl sm:text-4xl font-display font-semibold text-primary`.
  * Ensure status badges use high-contrast text combinations: `.status-pill.status-success` (`oklch(0.96 0.03 155)` with deep green text).

---

## 6. Table & Log Data Improvements (`dashboard.tsx`)

* **Current Issue**: Transaction and registration histories overflow horizontally on mobile screens without a scrollbar, causing severe layout breaking.
* **Redesign Goal**: Allow users to scroll through tabular logs cleanly.
* **Exact UI Changes**:
  * Wrap table elements in a scrollable block:
    ```html
    <div className="w-full overflow-x-auto -webkit-overflow-scrolling-touch rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border">
    ```
  * Pad cells cleanly (`px-4 py-3`) and use `whitespace-nowrap` to prevent data from wrapping awkwardly.

---

## 7. Button System Improvements

* **Current Issue**: Interactive targets feel static and button styles differ across forms.
* **Redesign Goal**: Enforce a unified, highly polished button set.
* **Exact UI Changes**:
  * Standardize primary actions using `.btn-primary`:
    * Deep-navy color (`oklch(0.30 0.14 255)`), touch height (`min-h-[48px]`), and smooth transitions (`transition-all duration-200`).
  * Implement secondary action buttons using `.btn-secondary` (white background, clean outline, hover transition).
  * Ensure disabled buttons use opacity (`opacity-55`) and set the cursor state to `cursor-not-allowed`.

---

## 8. Mobile Interaction Improvements

* **Action Items**:
  * Ensure all form labels, buttons, and filter chips provide tactile feedback (`active:scale-[0.98]`).
  * Enforce touch targets with a minimum size of `44px` (`touch-target`) for primary mobile actions.

---

## 9. Component Priority Order

To ensure a structured, incremental deployment, implement components in this priority order:

1. **Global CSS Foundations** (`styles.css` token constants, button systems, card wrapper utilities).
2. **Global Navigation Framework** (`SiteHeader.tsx` active links, backdrop blur, mobile drawer).
3. **Core Mobile Scaling Fix** (`VoterIdCard.tsx` scale-wrapper task).
4. **Interactive Scroll Spacing** (`HorizontalSteps.tsx` scroll boundaries).
5. **Form Onboarding Refactor** (`membership.tsx` caching steps).
6. **Dashboard Stats & Tables** (`dashboard.tsx` widget cleanups).
