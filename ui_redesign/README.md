# TNVS UI Redesign — Windsurf/Cascade Workflow (v2 · May 2026)

Frontend-only redesign pipeline for Tamil Nadu Vanigargalin Sangamam portal.
No backend changes. No package.json changes.

---

## This folder is already in the right place

```
TNVS/
├── ui_redesign/        ← you are here
├── src/
├── outputs/            ← pipeline writes docs here
├── package.json
└── ...
```

Open the TNVS folder in Windsurf and run commands in Cascade chat.

---

## How to Run

Full pipeline (all 5 stages, no interruptions):
```
/ui-redesign
```

Individual stages (run in order):
```
/ui-audit          ← reads src/ code, writes outputs/01_ui_audit.md
/ux-strategy       ← reads audit, writes outputs/02_ux_strategy.md
/visual-tokens     ← writes outputs/03_visual_tokens.md + updates src/styles.css
/component-fixes   ← modifies actual src/ files, writes outputs/04_change_plan.md
/ux-review         ← verifies all changes, opens browser at 360px
```

---

## What Gets Changed

| Stage | Output docs | Actual src/ changes |
|-------|-------------|---------------------|
| 1 — Audit | outputs/01_ui_audit.md | None |
| 2 — Strategy | outputs/02_ux_strategy.md | None |
| 3 — Tokens | outputs/03_visual_tokens.md | src/styles.css (token block added) |
| 4 — Fixes | outputs/04_change_plan.md | src/routes/services.tsx (modal max-h, framer removed) |
| | | src/routes/assistant.tsx (framer removed) |
| | | src/components/WordSwapper.tsx (framer → LazyMotion) |
| | | src/routes/index.tsx (stats text-[10px] → text-xs, hero emblem size) |
| | | src/routes/membership.tsx (localStorage auto-save) |
| | | src/routes/contact.tsx (info cards Tamil translations) |
| | | src/routes/voter-id.tsx ("not a member?" empty state) |
| | | src/styles.css (lang="ta" typography rule) |
| 5 — Review | outputs/05_final_review.md | None (verification only) |
| All stages | outputs/change_log.md | Running log of every file touched |

---

## What Does NOT Get Changed

- voter-api-server.js
- package.json
- vite.config.ts
- tsconfig.json
- eslint.config.js
- Any file outside src/
- outputs/ files from a previous run (append _v2 suffix if re-running)

---

## Current Fixed State (already done — skip in pipeline)

These were fixed before this pipeline — do NOT re-fix:
- Section.tsx — framer-motion replaced with IntersectionObserver
- ScrollReveal.tsx — delay/duration props now applied
- HorizontalSteps.tsx — fixed height → min-height
- SiteFooter.tsx — dead links fixed, CTA added
- about.tsx — full Tamil translations added
- contact.tsx — FloatingInput migration done
- index.tsx — broken video removed, mobile CTA added
- assistant.tsx — demo placeholder text fixed

---

## After the Pipeline

Run in terminal to confirm no TypeScript errors:
```
npm run build
```

If build passes → share outputs/05_final_review.md for sign-off.
If build fails → paste the error into Cascade:
"Fix TypeScript errors from the build: [paste error]"

---

## Project Structure After Pipeline Runs

```
TNVS/
├── ui_redesign/              ← this folder (don't delete)
│   ├── GEMINI.md             ← agent identity + current project state
│   ├── README.md             ← this file
│   ├── project-rules.md      ← agent rules (scope, quality, communication)
│   ├── stages.md             ← individual /slash-command definitions
│   └── ui-redesign.md        ← full 5-stage pipeline instructions
├── outputs/                  ← agent writes all docs here
│   ├── 01_ui_audit.md
│   ├── 02_ux_strategy.md
│   ├── 03_visual_tokens.md
│   ├── 04_change_plan.md
│   ├── 05_final_review.md
│   └── change_log.md
└── src/                      ← agent modifies only these
    ├── styles.css
    ├── routes/
    │   ├── services.tsx
    │   ├── assistant.tsx
    │   ├── index.tsx
    │   ├── membership.tsx
    │   ├── contact.tsx
    │   └── voter-id.tsx
    └── components/
        └── WordSwapper.tsx
```
