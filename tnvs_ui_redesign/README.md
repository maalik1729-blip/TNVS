# TNVS UI Redesign — Antigravity Workflow

This directory contains the custom frontend redesign pipeline, automated commands, project rules, and stage outputs for the **Tamil Nadu Vanigargalin Sangamam (TNVS) Trader Portal**.

---

## Workspace Setup

1. Place this `tnvs_ui_redesign/` folder directly in the root of the TNVS project:
   ```
   TNVS/
   ├── tnvs_ui_redesign/    ← drop here
   ├── src/
   ├── outputs/             ← stage output docs go here
   ├── package.json
   └── ...
   ```

2. Open the project root folder as a Workspace in your agent developer chat.

---

## How to Run the Pipeline

You can run individual stages in order to audit, strategize, implement, and review the UI/UX changes:

```
/ui-audit          ← Reads src/ files, writes outputs/01_tnvs_ui_audit.md
/ux-strategy       ← Evaluates user friction, writes outputs/02_tnvs_ux_improvement_strategy.md
/visual-tokens     ← Updates styles.css colors, writes outputs/03_tnvs_visual_redesign_direction.md
/component-fixes   ← Applies React/CSS updates, writes outputs/04_tnvs_component_execution_plan.md
/ux-review         ← Performs final responsive checks, writes outputs/05_tnvs_final_ux_review.md
```

---

## What Gets Changed

| Stage | Output Document | Core Frontend Changes |
| :--- | :--- | :--- |
| **Stage 1 — Audit** | `outputs/01_tnvs_ui_audit.md` | None (inspects routes and spacing). |
| **Stage 2 — Strategy** | `outputs/02_tnvs_ux_improvement_strategy.md` | None (formulates navigation and flow structures). |
| **Stage 3 — Tokens** | `outputs/03_tnvs_visual_redesign_direction.md` | `src/styles.css` (adds custom HSL/OKLCH color tokens, Noto Tamil script sizes). |
| **Stage 4 — Fixes** | `outputs/04_tnvs_component_execution_plan.md` | `SiteHeader.tsx` (primary CTA, active outlines), `VoterIdCard.tsx` (aspect-ratio scaling), `HorizontalSteps.tsx` (sticky track bounds, custom offsets). |
| **Stage 5 — Review** | `outputs/05_tnvs_final_ux_review.md` | None (validates touch sizes and viewport fits). |

---

## Build Verification

After completing Stage 4 or 5, always execute in the terminal:
```bash
npm run build
```
Ensure the build completes successfully with **zero compilation warnings or typescript errors** before staging and pushing changes.

---

## Redesign Directory Structure

```
TNVS/
├── tnvs_ui_redesign/
│   ├── GEMINI.md               ← Agent identity & brand constraints
│   ├── README.md               ← Setup & execution guide
│   ├── project-rules.md        ← Code quality and scope enforcement rules
│   ├── stages.md               ← Individual command references
│   └── ui-redesign.md          ← Comprehensive 5-stage pipeline instructions
└── outputs/                    ← Stage output files
    ├── 01_tnvs_ui_audit.md
    ├── 02_tnvs_ux_improvement_strategy.md
    ├── 03_tnvs_visual_redesign_direction.md
    ├── 04_tnvs_component_execution_plan.md
    └── 05_tnvs_final_ux_review.md
```
