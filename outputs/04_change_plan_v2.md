# 04 — Change Plan (v2 · May 2026)

---

## Files Modified

| File | What Changed | Lines Affected |
|------|-------------|----------------|
| `src/styles.css` | Added `[lang="ta"]` typography rule + `word-enter`/`word-exit` keyframes | 724–741 |
| `src/components/WordSwapper.tsx` | Full framer import → `LazyMotion + domAnimation + m` | 1–3, 59, 67–76, 89–98, 105–107 |
| `src/routes/services.tsx` | Removed framer-motion import; added body scroll lock `useEffect`; replaced `AnimatePresence + motion.div` with CSS `animate-fade-in` | 9, 114–122, 286–302, 772–778 |
| `src/routes/assistant.tsx` | Removed framer-motion import; replaced `motion.div + AnimatePresence` with `animate-fade-in` + conditional rendering | 7, 166–174, 228–234 |
| `src/routes/index.tsx` | `text-[10px]` → `text-xs` on stats label; hero emblem `max-w-[260px]` → `max-w-[180px]`; `lang` on FAQ answers | 222, 244, 327–332 |
| `src/routes/contact.tsx` | Added `language` to `useLanguage` destructure; added Tamil fields to info cards array; rendered through `t()` with `lang` attribute | 20, 53–66 |
| `src/routes/voter-id.tsx` | Added `language` + `hasSearched` state; `setHasSearched(true)` in finally block; "Not a member?" empty state block | 32–38, 188–189, 468–480 |

---

## Fix 1: Design Tokens — src/styles.css ✅

Appended to end of file inside `@layer` block:
- `[lang="ta"], .font-tamil` rule: sets `font-family: var(--font-tamil)`, `line-height: 1.8`, `word-break: break-word`
- `@keyframes word-enter` / `word-exit` + `.word-enter` / `.word-exit` utility classes

Nothing overwritten. All existing CSS preserved.

---

## Fix 2: services.tsx — Framer Motion Removed ✅

- Removed: `import { motion, AnimatePresence } from "framer-motion"`
- Added body scroll lock `useEffect` on `modal.type` dependency
- Replaced `<AnimatePresence>` + `<motion.div initial/animate/exit>` with plain `<div className="animate-fade-in">`
- Modal backdrop div: `animate-fade-in` class applied
- All existing modal content (max-h, overflow-y-auto, header, body) preserved

---

## Fix 3: assistant.tsx — Framer Motion Removed ✅

- Removed: `import { motion, AnimatePresence } from "framer-motion"`
- FAQ accordion panels: `motion.div` with height animation → `<div className="animate-fade-in">` (conditional mount triggers CSS)
- Profile result panel: `motion.div` with opacity/y → `<div className="animate-fade-in p-5 ...">`
- Removed stale `transition={{ duration: 0.25 }}` prop leftover

---

## Fix 4: WordSwapper.tsx — LazyMotion Migration ✅

- Changed: `import { motion, AnimatePresence }` → `import { LazyMotion, domAnimation, m, AnimatePresence }`
- Wrapped return in `<LazyMotion features={domAnimation}>`
- All `motion.span` → `m.span` (identical API, spring variants preserved)
- Bundle impact: ~35KB full framer → ~10KB domAnimation feature set loaded lazily

---

## Fix 5: index.tsx — Stats Label Font Size ✅

- `text-[10px] sm:text-xs` → `text-xs` (unified at 12px minimum)
- Location: stats grid label div, line 244

---

## Fix 6: index.tsx — Hero Emblem Mobile Size ✅

- `max-w-[260px]` → `max-w-[180px]` at base breakpoint
- At 360px viewport: emblem now 50% width (was 72%)
- `sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]` unchanged

---

## Fix 7: membership.tsx — localStorage Auto-Save ⏭ SKIPPED

Already fully implemented before this pipeline run:
- `tnvs_form_data` — saves full form object on every change
- `tnvs_form_step` — saves current step
- Reads both on mount, clears on step 5 success
- Manual `clearDraft()` with confirm dialog

---

## Fix 8: lang="ta" Attributes Added ✅

- `src/routes/index.tsx`: `AccordionContent` — `lang={language === "ta" ? "ta" : "en"}`
- `src/routes/contact.tsx`: info card detail divs — `lang={language === "ta" ? "ta" : "en"}`
- `src/routes/voter-id.tsx`: empty state paragraphs — `lang={language === "ta" ? "ta" : "en"}`
- `src/styles.css`: `[lang="ta"]` CSS rule now applies correct font + line-height globally

---

## Fix 9: contact.tsx — Info Cards Tamil Translations ✅

Extended inline array with `ta` (Tamil label) and `td` (Tamil detail) fields:
- Head Office → தலைமை அலுவலகம்
- Helpline → உதவி எண்
- Email → மின்னஞ்சல்
- Office Hours → அலுவலக நேரம்
Rendered via `t(c.ta, c.t)` and `t(c.td, c.d)`.

---

## Fix 10: voter-id.tsx — "Not a Member?" Empty State ✅

Added `hasSearched` boolean state (default `false`).
Set to `true` in the `finally` block of `handleSearch`.
When `hasSearched && !isSearching && searchResults.length === 0`:
- Shows "பதிவு எண் கண்டுபிடிக்கவில்லை. / No membership record found."
- Shows "இப்போதே இணையுங்கள் → / Join now →" Link to `/membership`
- Both paragraphs have `lang` attribute + `font-tamil` class

---

## TypeScript Check Result

```
npx tsc --noEmit → Exit code: 0 (clean — no errors)
```
