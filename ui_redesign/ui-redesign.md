# /ui-redesign — TNVS Frontend Redesign Pipeline (v2 · May 2026)

> Type /ui-redesign in Windsurf Cascade to run all 5 stages.
> Frontend only. No backend files touched. No package.json changes.
> Agent reads GEMINI.md and project-rules.md before Stage 1.
> Agent reads each stage output before proceeding to the next.

// turbo

---

## Pre-flight

Before Stage 1, read ui_redesign/GEMINI.md fully.
Note the "Already Fixed" and "Remaining Issues" sections —
do NOT audit or re-fix the already-fixed items.

Then open and read these src/ files:
- src/styles.css                       (check @theme tokens, existing CSS)
- src/routes/services.tsx              (framer-motion modal, modal max-h)
- src/routes/assistant.tsx             (framer-motion usage)
- src/components/WordSwapper.tsx       (framer-motion full import)
- src/routes/index.tsx                 (stats text-[10px], hero emblem size)
- src/routes/membership.tsx            (form steps, localStorage check)
- src/routes/contact.tsx               (info cards Tamil check)
- src/routes/voter-id.tsx              (empty state, not-a-member path)

Confirm in chat:
- Which framer-motion imports remain (file + import line)
- Whether src/styles.css has a @theme block already
- Whether membership.tsx has localStorage auto-save logic

---

## Stage 1 — UI Audit (Remaining Issues Only)

**Read:** src/routes/services.tsx, src/routes/assistant.tsx,
         src/components/WordSwapper.tsx, src/routes/index.tsx,
         src/routes/membership.tsx, src/routes/contact.tsx,
         src/routes/voter-id.tsx, src/styles.css
**Write:** outputs/01_ui_audit.md

> DO NOT audit items listed as "Already Fixed" in GEMINI.md.
> Focus only on the 8 remaining issues.

### Framer Motion audit
Open services.tsx, assistant.tsx, WordSwapper.tsx.
For each: list the exact import line and every usage of
motion.*, AnimatePresence, useAnimation, variants.
Tag each usage: "can replace with CSS" or "must keep (interactive)".

### Modal mobile audit (services.tsx)
Find every modal overlay div in services.tsx.
Check whether it has max-h-[...] and overflow-y-auto.
If missing: [HIGH] — list the modal's className string.
Check whether body scroll is locked when modal is open
(look for overflow-hidden on body or a scroll lock hook).

### Stats font size audit (index.tsx)
Search for text-[10px] in index.tsx and across src/.
List every occurrence with file + line.
Tag as [MEDIUM] — below 12px minimum.

### Hero emblem size audit (index.tsx)
Find the hero <img> for templeLogo.
Check max-w-* classes at each breakpoint (no prefix, sm:, md:, lg:).
If max-w at mobile (no prefix) is larger than max-w-[180px]: [MEDIUM].

### Tamil accessibility audit
Search src/routes/*.tsx and src/components/*.tsx for:
- lang="ta" attribute on any element
Count how many Tamil text blocks exist without lang="ta".
If fewer than 5 have lang="ta": [MEDIUM].

### Membership form localStorage audit
Open src/routes/membership.tsx.
Search for localStorage.setItem or sessionStorage.
If not found: form has no auto-save. Tag as [HIGH].

### Contact info cards Tamil audit (contact.tsx)
Open src/routes/contact.tsx.
Check the info cards array (Head Office, Helpline, Email, Hours).
Do the label and detail strings go through t()? If not: [MEDIUM].

### Voter-id empty state audit
Open src/routes/voter-id.tsx.
Find the empty/not-found state rendered when search returns no result.
Does it offer a link to /membership? If not: [MEDIUM].

### Required Output Structure

```
# 01 — TNVS UI Audit (v2)

## Executive Summary
[Total remaining issues by severity]

## Framer Motion Usage Map
[File | Import line | Usage count | Can replace with CSS?]

## Modal Mobile Audit
[services.tsx modal findings — max-h present? scroll lock?]

## Font Size Audit
[Every text-[10px] occurrence — file + line]

## Hero Emblem Size Audit
[Current max-w values at each breakpoint]

## Tamil Accessibility Audit
[Count of lang="ta" present vs missing]

## Membership Form Auto-Save Audit
[localStorage present or missing]

## Contact Info Cards Tamil Audit
[t() used or hardcoded English]

## Voter-ID Empty State Audit
[Link to /membership present or missing]

## Prioritized Fix List
[CRITICAL → HIGH → MEDIUM · each: file, line range, what to change]
```

---

## Stage 2 — UX Strategy (Frontend Logic Only)

**Read:** outputs/01_ui_audit.md
**Write:** outputs/02_ux_strategy.md

> Focus only on the issues found in Stage 1. Do not redesign
> components that are already working correctly.

### Framer Motion replacement strategy
For each remaining framer-motion usage in services.tsx and assistant.tsx:
- Classify: entrance animation, exit animation, or interactive state
- For entrance/exit: specify the CSS @keyframes replacement
  (animate-fade-in and animate-slide-up already exist in styles.css)
- For interactive (modal open/close, step progress): specify whether
  to use CSS transition or LazyMotion with domAnimation feature set

For WordSwapper.tsx specifically:
- The word-flip animation is an exit/enter pair — can use CSS
  @keyframes with alternating visibility + translateY
- OR use LazyMotion + domAnimation (smaller bundle than full framer)
- Recommend one approach with reasoning

### Services modal mobile strategy
The modals in services.tsx use a custom overlay approach.
Specify the exact className changes needed:
- Modal wrapper: add max-h-[85vh] overflow-y-auto
- Body scroll lock: add useEffect that toggles document.body.style.overflow
  on modal open/close (no external library — one useEffect)

### Membership form auto-save strategy
The 5-step form in membership.tsx uses local React state.
Specify: which step's data to save, which localStorage key to use,
when to read on mount (step 1 render), when to clear (step 5 success).
Use a single useEffect per field group — no external library.

### Tamil accessibility strategy
Specify: where lang="ta" should be added.
Rule: every element that conditionally renders Tamil text via t()
should add lang={language === "ta" ? "ta" : "en"} as an attribute.
For static Tamil-only text blocks: lang="ta" directly.

### Required Output Structure

```
# 02 — UX Strategy (v2)

## Strategy Overview

## Framer Motion Replacement Plan
[File by file — CSS class or LazyMotion approach]

## Services Modal Mobile Fix
[Exact className and useEffect spec]

## Membership Form Auto-Save Spec
[localStorage key, which fields, when to read/write/clear]

## Tamil Accessibility Plan
[Where lang="ta" goes — pattern to apply]

## Stats / Typography Fix
[text-[10px] → text-xs justification + any other size changes]

## Voter-ID Empty State UX
[What the "not a member?" state should show and link to]

## Recommended Implementation Order
[Priority order for Stage 4 fixes]
```

---

## Stage 3 — Design Tokens + Visual Direction

**Read:** outputs/02_ux_strategy.md + outputs/01_ui_audit.md
**Write:** outputs/03_visual_tokens.md
**Also write:** src/styles.css (append @theme block — do not overwrite)

### What to produce

**Part A — Verify existing tokens**
Open src/styles.css. List all CSS custom properties already defined
(--color-*, --font-*, --radius-*, etc.).
Identify which brand tokens are MISSING vs what GEMINI.md requires.

**Part B — Missing token additions**
Only add tokens that are genuinely missing. Do not duplicate.

Required if missing:
```css
@theme {
  --color-navy: oklch(0.22 0.08 255);
  --color-gold: oklch(0.72 0.12 85);
  --color-navy-light: oklch(0.30 0.08 255);
  --color-gold-light: oklch(0.88 0.08 85);
  --font-tamil: 'Noto Sans Tamil', 'Latha', system-ui, sans-serif;
  --radius-card: 1rem;
  --radius-modal: 1.25rem;
  --z-nav: 50;
  --z-modal: 100;
  --z-sticky-cta: 40;
}
```

Also add to the non-@theme CSS section if missing:
```css
[lang="ta"], .font-tamil {
  font-family: var(--font-tamil);
  line-height: 1.8;
  font-size: max(0.875rem, 1em);
}
```

**Part C — CSS replacements for Framer Motion**
Based on Stage 2 plan, specify exact CSS @keyframes or transition
classes to replace each removed Framer Motion usage.

For WordSwapper word-flip (if CSS approach chosen):
```css
@keyframes word-enter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes word-exit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}
.word-enter { animation: word-enter 0.25s ease forwards; }
.word-exit  { animation: word-exit 0.2s ease forwards; }
```

For modal fade-in/out (services.tsx, assistant.tsx):
Use existing animate-fade-in class from styles.css — confirm it exists.
For modal backdrop: CSS opacity transition via Tailwind transition classes.

### Required Output Structure

```
# 03 — Design Tokens + Visual Direction (v2)

## Existing Token Audit
[What is already in src/styles.css]

## Tokens to Add
[Only what is missing — copy-paste ready @theme block]

## CSS Typography Rule for Tamil
[lang="ta" rule — copy-paste ready]

## CSS Framer Motion Replacements
[Exact @keyframes or class names for each removed animation]

## src/styles.css Change Summary
[What lines to append, what (if anything) to remove]
```

---

## Stage 4 — Component Fixes (Actual Code Changes)

**Read:** outputs/03_visual_tokens.md + outputs/02_ux_strategy.md
**Write:** outputs/04_change_plan.md + outputs/change_log.md
**Also modify:** actual src/ files

> Never skip a fix. Never re-fix items from the "Already Fixed"
> list in GEMINI.md. After all changes: run npx tsc --noEmit.

// turbo

**Fix 1 — Design tokens in src/styles.css**
Append the missing @theme token block from Stage 3.
Append the [lang="ta"] typography rule.
Append the word-enter / word-exit @keyframes if WordSwapper uses CSS.
Do NOT overwrite any existing CSS.

**Fix 2 — Remove Framer Motion from services.tsx**
Open src/routes/services.tsx.
Remove: import { motion, AnimatePresence } from "framer-motion"
Replace every motion.* element with a plain HTML equivalent +
  CSS transition classes (Tailwind: transition-all duration-200).
Replace AnimatePresence modal open/close with:
  conditional rendering + opacity-0/opacity-100 + transition-opacity classes.
Add scroll lock useEffect (body overflow hidden on open, restore on close).
Add max-h-[85vh] overflow-y-auto to the modal inner content div.

**Fix 3 — Remove Framer Motion from assistant.tsx**
Open src/routes/assistant.tsx.
Remove: import { motion, AnimatePresence } from "framer-motion"
Replace animated step/panel transitions with CSS transition classes.

**Fix 4 — Migrate WordSwapper to CSS or LazyMotion**
Open src/components/WordSwapper.tsx.
If CSS approach: replace motion.span with a <span> that swaps
  CSS classes word-enter/word-exit on index change using a
  two-phase state (exit → enter) in a useEffect.
If LazyMotion approach: replace full framer import with:
  import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
  Wrap in <LazyMotion features={domAnimation}> and use <m.span>.

**Fix 5 — Fix stats labels font size in index.tsx**
Open src/routes/index.tsx.
Find: text-[10px]
Replace with: text-xs
(text-xs = 12px, which is the minimum. Apply to all occurrences.)

**Fix 6 — Fix hero emblem size on mobile in index.tsx**
Find the <img> for templeLogo in the hero section.
Change max-w-[260px] (the mobile/base breakpoint value) to max-w-[180px].
Keep sm: and larger breakpoints unchanged.

**Fix 7 — Membership form localStorage auto-save**
Open src/routes/membership.tsx.
Add a STORAGE_KEY constant: const STORAGE_KEY = "tnvs_membership_draft"
On step change (useEffect watching the form state fields):
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
On component mount (initial useEffect):
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) restore formData from JSON.parse(saved)
On step 5 (success/submit complete):
  localStorage.removeItem(STORAGE_KEY)

**Fix 8 — Add lang="ta" to Tamil text blocks**
Pattern to apply across services.tsx, assistant.tsx, index.tsx:
  Any <p>, <span>, <div> that renders t(tamil, english) should add:
  lang={language === "ta" ? "ta" : "en"}
  Requires: const { language, t } = useLanguage() already imported.
Apply to at minimum:
  - FAQ answer paragraphs in index.tsx and assistant.tsx
  - Service card description paragraphs in services.tsx
  - Step description text in membership.tsx

**Fix 9 — Contact info cards Tamil translations**
Open src/routes/contact.tsx.
The info cards array has: { i: MapPin, t: "Head Office", d: "..." }
Extend each entry to include a Tamil label and Tamil detail:
  { i: MapPin, t: "Head Office", ta: "தலைமை அலுவலகம்", d: "...", td: "..." }
Render labels and details through t(ta, t) and t(td, d).

**Fix 10 — Voter-ID "not a member?" empty state**
Open src/routes/voter-id.tsx.
Find the not-found / empty state block.
After the "no results" message, add:
```tsx
<p className="mt-3 text-sm text-muted-foreground font-tamil">
  {t("இன்னும் உறுப்பினர் இல்லையா?", "Not a member yet?")}
  {" "}
  <Link to="/membership" className="text-primary font-semibold hover:underline">
    {t("இப்போதே இணையுங்கள் →", "Join now →")}
  </Link>
</p>
```

### Required Output Structure

```
# 04 — Change Plan (v2)

## Files Modified
[File path | What changed | Lines affected]

## Fix 1: Design Tokens (styles.css)
## Fix 2: services.tsx — Framer Motion removed
## Fix 3: assistant.tsx — Framer Motion removed
## Fix 4: WordSwapper.tsx — Framer Motion migrated
## Fix 5: index.tsx — stats text-[10px] → text-xs
## Fix 6: index.tsx — hero emblem mobile size
## Fix 7: membership.tsx — localStorage auto-save
## Fix 8: lang="ta" attributes added
## Fix 9: contact.tsx — info cards Tamil
## Fix 10: voter-id.tsx — not-a-member empty state

## TypeScript Check Result
[Output of: npx tsc --noEmit]

## Verification Steps
[How to confirm each fix in the browser at 360px]
```

---

## Stage 5 — Final Review + Mobile Check

**Read:** outputs/04_change_plan.md
**Write:** outputs/05_final_review.md

### Code verification (open each modified file)

1. src/styles.css — does the @theme block exist? Does [lang="ta"] rule exist?
2. src/routes/services.tsx — search for "framer-motion". Should NOT be found.
3. src/routes/assistant.tsx — search for "framer-motion". Should NOT be found.
4. src/components/WordSwapper.tsx — is full framer import removed?
   If LazyMotion used: confirm LazyMotion wrapper is present.
5. src/routes/index.tsx — search for text-[10px]. Should NOT be found.
   Confirm hero img has max-w-[180px] at base breakpoint.
6. src/routes/membership.tsx — search for STORAGE_KEY. Should be found.
7. src/routes/contact.tsx — confirm info cards use t() for label and detail.
8. src/routes/voter-id.tsx — confirm Link to="/membership" in empty state.
9. Run grep across src/ for remaining framer-motion imports.
   Expected remaining: 0 files. If any found: list them.

### Mobile simulation check (360px viewport)
Open browser preview at localhost:8080.
Resize to 360px width. Check each route:

**/ (Home page)**
- Stats labels readable (not 10px)? Pass/Fail
- Hero emblem not overflowing viewport? Pass/Fail
- Sticky bottom CTA visible and not overlapping content? Pass/Fail
- "Start My Application" CTA visible after HorizontalSteps? Pass/Fail

**/services (Services page)**
- Open a modal — does it fit within 360px viewport height? Pass/Fail
- Can you scroll inside the modal? Pass/Fail
- Background scroll locked while modal open? Pass/Fail

**/membership (Membership form)**
- Step 1 renders cleanly at 360px? Pass/Fail
- Inputs have floating labels and correct keyboard types? Pass/Fail
- Refresh page — does saved form data restore? Pass/Fail

**/voter-id (Voter ID card)**
- Search for a non-existent EPIC — is "Not a member?" link shown? Pass/Fail

**/assistant (Support page)**
- Panel transitions work without framer-motion errors? Pass/Fail

### Required Output Structure

```
# 05 — Final Review (v2)

## Code Verification Results
[Pass/Fail for each file check above]

## Remaining Framer Motion Imports
[Any files still importing framer-motion — justified or not]

## Mobile 360px Results
[Pass/Fail table per page per check]

## Outstanding Issues
[Any fix not completed in Stage 4 — reason + recommended next step]

## TypeScript Build Status
[Result of npm run build or npx tsc --noEmit]

## Release Readiness
[Ready / Not ready — one line verdict with specific conditions]
```

---

## Post-Pipeline

After Stage 5 completes, post this summary in chat:

```
TNVS Frontend Redesign v2 — Pipeline Complete

Modified files: [list from outputs/change_log.md]
Framer Motion removed from: [file list]
localStorage auto-save: [added / skipped — reason]
lang="ta" attributes: [added to N elements]
Mobile 360px: [pass / N issues found]
TypeScript: [clean / N errors]

Next: run `npm run build` to confirm no TypeScript errors.
Then: share outputs/05_final_review.md for sign-off.
```
