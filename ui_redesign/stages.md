# Individual Stage Commands — TNVS (v2 · May 2026)

---

# /ui-redesign
// turbo
Read ui_redesign/GEMINI.md and ui_redesign/project-rules.md first.
Then run all 5 stages from ui_redesign/ui-redesign.md in sequence.
Do not skip a stage. Read each stage's output before starting the next.
Write all output docs to outputs/ and all code to src/.
After Stage 4: run `npx tsc --noEmit` and report the result.

---

# /ui-audit
// turbo
Read ui_redesign/GEMINI.md and ui_redesign/project-rules.md.
Run Stage 1 from ui_redesign/ui-redesign.md only.
Read these src/ files before writing: services.tsx, assistant.tsx,
WordSwapper.tsx, index.tsx, membership.tsx, styles.css.
Write outputs/01_ui_audit.md.
Post 3-line chat summary: files read | findings by severity | top blocker.

---

# /ux-strategy
// turbo
Read ui_redesign/GEMINI.md.
Read outputs/01_ui_audit.md — HALT if missing, tell user to run /ui-audit first.
Run Stage 2 from ui_redesign/ui-redesign.md only.
Write outputs/02_ux_strategy.md.
Post 3-line chat summary.

---

# /visual-tokens
// turbo
Read ui_redesign/GEMINI.md.
Read outputs/01_ui_audit.md and outputs/02_ux_strategy.md.
HALT if either is missing.
Run Stage 3 from ui_redesign/ui-redesign.md only.
Write outputs/03_visual_tokens.md.
Add @theme token block to src/styles.css (append, do not overwrite).
Post 3-line chat summary.

---

# /component-fixes
// turbo
Read ui_redesign/GEMINI.md and ui_redesign/project-rules.md.
Read outputs/02_ux_strategy.md and outputs/03_visual_tokens.md.
HALT if either is missing.
Run Stage 4 from ui_redesign/ui-redesign.md only.
Write outputs/04_change_plan.md and outputs/change_log.md.
Modify actual src/ files as specified. Never skip a fix.
After all changes: run `npx tsc --noEmit` and include result in 04_change_plan.md.
Post 3-line chat summary.

---

# /ux-review
// turbo
Read ui_redesign/GEMINI.md.
Read outputs/04_change_plan.md — HALT if missing, tell user to run /component-fixes first.
Run Stage 5 from ui_redesign/ui-redesign.md only.
Open browser preview and check 360px viewport on these routes:
  / (home), /services, /membership (step 1), /voter-id, /assistant
Write outputs/05_final_review.md.
Post final pipeline summary (see ui-redesign.md Post-Pipeline section).
