# TNVS Component Execution Plan

This document details the step-by-step developer tasks, file paths, exact styling rules, and layout changes required to execute the visual and structural redesign of the TNVS Trader Portal.

---

## Component Modifications & Developer Tasks

### 1. Site Header & Layout Navigation
* **File to modify**: `src/components/SiteHeader.tsx`
* **Current Issue**: The header action buttons are cluttered and compete for visual attention. Active states lack a premium visual accent.
* **Redesign Goal**: Isolate the **"Apply for Membership"** button as the single primary call-to-action.
* **Exact UI Changes**:
  - Convert "Apply for Membership" to `className="btn-primary"`.
  - Convert "Portal Login" and "Verify Voter ID" links to `className="btn-ghost"` or inline header actions.
  - Implement a thin gold underline indicator for active page routes:
    ```tsx
    isActive ? "border-b-2 border-gold text-primary font-bold" : "text-muted-foreground hover:text-primary"
    ```
* **Responsive Behavior**: The mobile hamburger menu drawer must transition dynamically from the right, with links forced to a minimum tap height of `48px` to ensure easy mobile usage.

### 2. Scroll-driven Onboarding Steps
* **File to modify**: `src/components/HorizontalSteps.tsx`
* **Current Issue**: Dead empty scroll height gap once sticky animation completes.
* **Redesign Goal**: Perfect the sticky phase transitions and shrink scroll track heights.
* **Exact UI Changes**:
  - Update `useScroll` hook with `offset: ["start 0.2", "end 0.8"]`.
  - Set the parent wrapper height to `lg:h-[125vh]`.
  - Set the sticky child height to `lg:h-[60vh]` with `lg:top-[20vh]`.
  - Change outer container border layout from `border-y` to `border-t border-border/50` to avoid double border line visual bugs.

### 3. Scroll-linked Services Stacking Deck
* **File to modify**: `src/components/StackedServices.tsx`
* **Current Issue**: Cards stack uniformly without high contrast shadows, making it difficult to distinguish stack layers on scroll.
* **Redesign Goal**: Enhance the depth and layers of cards on scroll.
* **Exact UI Changes**:
  - Add `box-shadow: var(--shadow-md)` and `border: 1px solid var(--color-border)` to each card element.
  - Apply `transform: scale(calc(1 - var(--scroll-index) * 0.05))` dynamically via DOM update to create premium depth scaling.
  - Implement 3D pop-out translates (`translateY(-8px) translateX(8px)`) on card hover states.

### 4. Membership Form Wizard & File Attachments
* **File to modify**: `src/routes/membership.tsx`
* **Current Issue**: Overwhelming fields block and complex document capture flows.
* **Redesign Goal**: Reduce input dense layout cognitive fatigue and improve file capture.
* **Exact UI Changes**:
  - Group fields visually using rounded cards (`card-base`) and clean section labels.
  - Form validation: Implement inline `.input-error` validation checks triggered via `onBlur` for fields like EPIC ID and Phone Number.
  - File Capture UI: Restructure Step 3 file upload buttons with dynamic icons (e.g., camera icon, upload folder icon) and a clear toggle selector allowing users to switch between device cameras and standard files.
  - Local Storage caching: Hook form states directly to `localStorage` on every next step event.

### 5. Voter Credential Card & Scaling
* **File to modify**: `src/components/VoterIdCard.tsx`
* **Current Issue**: Aspect-ratio overflows on small viewports, bleeding off screen margins.
* **Redesign Goal**: Make credentials scale perfectly on any screen size.
* **Exact UI Changes**:
  - Wrap the inner visual credential template inside a scaling div:
    ```tsx
    <div className="card-scale-wrapper">
      <div className="responsive-card-scale">
        {/* Render Voter Card SVG / HTML details */}
      </div>
    </div>
    ```
  - Standardize scale multipliers in `styles.css` using screen breakpoints.

### 6. Interactive Search Dashboard
* **File to modify**: `src/routes/dashboard.tsx`
* **Current Issue**: Metric boxes clutter the dashboard space, and card verification status is not prioritized.
* **Redesign Goal**: Deliver a clean, professional portal status interface.
* **Exact UI Changes**:
  - Visual hierarchy: Place a premium status banner at the top showing the trader's registration progress ("Registration Active ✔", "Documents Verified", "Membership Valid until 2027").
  - Spacing: Use `gap-6` grids with `px-safe` safe horizontal padding.

---

## Component Priority Order

To ensure developer efficiency and stable styling dependencies, components should be refactored in the following order:

```
[ Step 1: Global CSS Layout System ] ──> [ Step 2: SiteHeader Navigation ]
                                                  │
                                                  ▼
[ Step 4: Form & Voter ID Scaling ]  <── [ Step 3: Horizontal & Scroll Decks ]
                                                  │
                                                  ▼
[ Step 5: Dashboard & AI Assistant ] ──> [ Step 6: Full Integration QA ]
```

1. **Core Styles (`src/styles.css`)**: Verify custom color classes, font clamp utilities, and button definitions.
2. **Site Header (`src/components/SiteHeader.tsx`)**: Establish nav rules, mobile drawers, and single CTA priority.
3. **Scroll Systems (`HorizontalSteps.tsx` & `StackedServices.tsx`)**: Remove visual gaps and enable card depth shadows.
4. **Voter Card scaling (`VoterIdCard.tsx`)**: Stop mobile horizontal overflow bugs.
5. **Membership registration (`membership.tsx`)**: Implement save-state caching, step groupings, and toggling file inputs.
6. **Dashboard (`dashboard.tsx` & `assistant.tsx`)**: Clean up widgets grids and conversational styles.
