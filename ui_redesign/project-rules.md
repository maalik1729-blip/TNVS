# Agent Rules — TNVS Frontend Redesign (v2 · May 2026)

## Scope Enforcement (Highest Priority)
- NEVER modify: voter-api-server.js, package.json, vite.config.ts,
  tsconfig.json, eslint.config.js, or any file outside src/
- NEVER add new npm packages — work only with what is installed
- NEVER modify the outputs/ folder contents from a previous stage run
  (append _v2 suffix if re-running a stage)
- ALL code changes are inside src/ only

## Code Rules
- TypeScript only — no .js files inside src/
- Tailwind classes only for styling — no inline style={} objects
  EXCEPT: animationDelay/animationDuration on scroll reveal elements
  (Tailwind v4 cannot express these dynamically)
- Tailwind v4 uses CSS @theme blocks in src/styles.css — NOT tailwind.config.js
  Add tokens as: @theme { --color-navy: ...; } NOT in a config file
- Do NOT use src/components/ui/ shadcn components other than accordion
  (all other Radix primitives were removed — use Lucide + custom components)
- Forms: use FloatingInput, FloatingTextarea, FloatingSelect from
  src/components/FloatingInput.tsx — do NOT use react-hook-form (removed)
- Framer Motion: REDUCE, never add new imports
  Allowed remaining: services.tsx, assistant.tsx, WordSwapper.tsx
  Stage 4 target: remove from all three using LazyMotion or CSS
- Language: all bilingual strings must use the t(tamil, english) function
  from useLanguage() hook — never hardcode bilingual mixed strings

## Quality Rules
- Every change must be TypeScript-valid — no @ts-ignore additions
- All 38 TN districts must remain in membership.tsx — never reduce
- Bilingual label pattern: Tamil first, English second
  Correct: t("சென்னை", "Chennai")
  Wrong: "Chennai (சென்னை)" or "சென்னை / Chennai" as a static string
- Touch targets: all interactive elements must have min-h-11 (44px)
- Tamil body text minimum: text-sm (14px) — never text-xs for Tamil content
- Stats labels: minimum text-xs (12px) — never text-[10px]
- Card heights: never fixed h-[] — always min-h-[] to allow Tamil text growth
- Modal bodies: must have max-h-[85vh] overflow-y-auto on mobile

## Communication Rules
- After each stage: post exactly 3 lines in chat
  Line 1: "Read: [file list]"
  Line 2: "Written: [file list]"
  Line 3: "Top finding: [one sentence]"
- If a required outputs/ file from a previous stage is missing:
  HALT immediately. Tell the user exactly which command to run first.
- If a src/ file does not exist where expected:
  List what files DO exist in that directory before proceeding.
- Never silently skip a fix from Stage 4.
- Never re-fix something listed in the "Already Fixed" section of GEMINI.md.

## Output Rules
- outputs/ folder: markdown files only, no code files
- src/ changes: real working TypeScript/TSX — must pass `npx tsc --noEmit`
- Document every src/ file modified in outputs/change_log.md
  Format: [stage] | [file path] | [what changed] | [lines affected]
- After Stage 4 completes, run `npx tsc --noEmit` and report result
