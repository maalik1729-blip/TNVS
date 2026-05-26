# Individual Stage Commands

This file defines the automated pipeline stage commands to execute the TNVS redesign.

---

## Stage 1 — Audit (`/ui-audit`)
1. **Initialize**: Load context from `GEMINI.md` and check `src/routes/` and `src/components/`.
2. **Analysis**: Audit spacing layout gaps, overlapping Tamil character scripts, and missing mobile card scaling.
3. **Write**: Create `outputs/01_tnvs_ui_audit.md`.
4. **Handoff**: Report files inspected and top findings by severity.

---

## Stage 2 — Strategy (`/ux-strategy`)
1. **Initialize**: Read findings from `outputs/01_tnvs_ui_audit.md`.
2. **Analysis**: Plan workflows for forms draft-caching, mobile swipe chips, and header CTA priorities.
3. **Write**: Create `outputs/02_tnvs_ux_improvement_strategy.md`.
4. **Handoff**: Outline core simplified routes logic in your response.

---

## Stage 3 — Visual Tokens (`/visual-tokens`)
1. **Initialize**: Read strategy from `outputs/02_tnvs_ux_improvement_strategy.md`.
2. **Refactoring**: Define warm cream backgrounds, navy text colors, and Tamil-optimized type scaling custom properties.
3. **Write**: Create `outputs/03_tnvs_visual_redesign_direction.md` and append variables directly to `src/styles.css`.
4. **Handoff**: Provide the Tailwind-optimized custom property specs in the chat.

---

## Stage 4 — Code Execution (`/component-fixes`)
1. **Initialize**: Read design blueprint from `outputs/03_tnvs_visual_redesign_direction.md`.
2. **Execution**: Apply layout updates directly to `SiteHeader.tsx` (primary button), `VoterIdCard.tsx` (aspect-ratio scaling), and `HorizontalSteps.tsx` (scroll alignments).
3. **Write**: Create `outputs/04_tnvs_component_execution_plan.md` to map changes.
4. **Handoff**: Verify compilation and list modified routes.

---

## Stage 5 — Review & QA (`/ux-review`)
1. **Initialize**: Read execution changelogs from `outputs/04_tnvs_component_execution_plan.md`.
2. **QA Check**: Verify touch targets, viewport scaling, and double border checks.
3. **Write**: Create `outputs/05_tnvs_final_ux_review.md` containing WCAG checklists.
4. **Handoff**: Conclude with release readiness verdict.
