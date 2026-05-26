# Master UI Redesign Pipeline — TNVS Trader Portal

This document guides the AI developer agent through the comprehensive, 5-stage frontend redesign of the **Tamil Nadu Vanigargalin Sangamam (TNVS) Trader Portal**.

---

## Pre-flight Code Review

Before executing Stage 1, the developer agent must read and analyze these core files:
- `src/styles.css`
- `src/routes/index.tsx`
- `src/routes/membership.tsx`
- `src/routes/voter-id.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/VoterIdCard.tsx`
- `src/components/HorizontalSteps.tsx`
- `src/components/StackedServices.tsx`

---

## Stage 1 — Visual & Code Audit

* **Audits spacing layout gaps**: Inspects `HorizontalSteps.tsx` and `StackedServices.tsx` for layout gaps on high-DPI displays.
* **Audits typographic scaling**: Inspects `styles.css` for overlapping Tamil vowel/glyph glyphs.
* **Audits accessibility & touch targets**: Inspects dropdowns, buttons, and links for focus outlines and `48px` minimum touch heights.
* **Audits mobile overflows**: Inspects fixed aspect constraints inside `VoterIdCard.tsx`.
* **Output**: Write findings to `outputs/01_tnvs_ui_audit.md`.

---

## Stage 2 — UX Strategy & Flow Planning

* **Audits form persistent caching**: Plans `localStorage` form state retention inside `membership.tsx`.
* **Audits navigation hierarchies**: Streamlines CTA button prioritization inside `SiteHeader.tsx`.
* **Audits search indicator feedback**: Plans skeleton loaders and status indicators for `voter-id.tsx` search.
* **Output**: Write strategy to `outputs/02_tnvs_ux_improvement_strategy.md`.

---

## Stage 3 — Design Variables & Visual Blueprints

* **Refactors styling variables**: Defines deep navy primary colors, cream surface parchment layers, and gold active underlines in `styles.css`.
* **Refactors typography**: Implements fluid heading scaling clamps and Tamil line heights (`line-height: 1.55`).
* **Output**: Write visual specs to `outputs/03_tnvs_visual_redesign_direction.md`.

---

## Stage 4 — Frontend Code Implementation

* **Execution Task 1 — Global Styles**: Add Custom variables to `styles.css`.
* **Execution Task 2 — Nav Header**: Refactor CTA hierarchies, active lines, and drawers in `SiteHeader.tsx`.
* **Execution Task 3 — Scroll deck gaps**: Set up sticky bounds `lg:h-[60vh]`, `lg:top-[20vh]`, and offsets `["start 0.2", "end 0.8"]` in `HorizontalSteps.tsx` to stop white space gaps.
* **Execution Task 4 — ID Card scaling**: Wrap voter card front and back SVG inside `card-scale-wrapper` containers in `VoterIdCard.tsx` to prevent mobile overflows.
* **Output**: Write developer changelogs to `outputs/04_tnvs_component_execution_plan.md`.

---

## Stage 5 — Review & QA Verification

* **Verifies responsive fits**: Tests the visual credential layout at a `320px` SE mobile resolution to guarantee zero horizontal scrollbar bleed-over.
* **Verifies compilation**: Runs `npm run build` to confirm zero build errors or typescript warnings.
* **Output**: Write final QA checks to `outputs/05_tnvs_final_ux_review.md`.
