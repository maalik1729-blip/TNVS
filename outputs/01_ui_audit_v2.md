# 01 — TNVS Frontend UI Audit (v2 · May 2026)

> Pre-flight confirmed: read services.tsx, assistant.tsx, WordSwapper.tsx,
> index.tsx, membership.tsx, contact.tsx, voter-id.tsx, styles.css

---

## Executive Summary

| Severity | Count |
|----------|-------|
| HIGH     | 4     |
| MEDIUM   | 5     |
| DONE (skip) | 2  |

Total actionable items: **9 fixes** across 8 files.

---

## Framer Motion Usage Map

| File | Import Line | Usages | Can Replace With CSS? |
|------|-------------|--------|-----------------------|
| `src/routes/services.tsx` | line 9 | `motion.div` (modal overlay + panel) `AnimatePresence` | Yes — CSS opacity transition |
| `src/routes/assistant.tsx` | line 7 | `motion.div` (panel transitions) `AnimatePresence` | Yes — CSS transition-all |
| `src/components/WordSwapper.tsx` | line 2 | `motion.span` (word flip) `AnimatePresence` | Partial — LazyMotion preferred (spring physics) |
| `src/routes/voter-id.tsx` | line 3 | `motion.div` `AnimatePresence` | Yes — CSS fade |
| `src/routes/membership.tsx` | line 3 | `motion.div` `AnimatePresence` | Yes — CSS slide-up |
| `src/routes/wings.tsx` | line 8 | `motion.div` `AnimatePresence` | Yes — CSS fade |
| `src/routes/dashboard.tsx` | line 10 | `motion.div` `AnimatePresence` | Yes — CSS fade |

**Pipeline scope (GEMINI.md):** services.tsx, assistant.tsx, WordSwapper.tsx  
**Additional findings (outside pipeline scope):** voter-id.tsx, membership.tsx, wings.tsx, dashboard.tsx

Severity: **HIGH** for all 3 in-scope files.

---

## Modal Mobile Audit (services.tsx)

**PASS — already fixed.**
- Modal wrapper: `max-h-[calc(100dvh-32px)]` ✓
- Modal body: `overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[70vh]` ✓
- Body scroll lock: **MISSING** — `document.body` not referenced anywhere in services.tsx.
  When modal is open, background page remains scrollable on Android.

Severity: **MEDIUM** (scroll lock missing only).

---

## Font Size Audit — text-[10px]

| File | Line | Context | Action |
|------|------|---------|--------|
| `src/routes/index.tsx` | 244 | Stats label (e.g. "மாவட்டங்கள்") | → `text-xs` |
| `src/routes/wings.tsx` | 509, 528, 767, 817, 871, 927 | Zone/district/wing count badges | → `text-xs` |
| `src/routes/dashboard.tsx` | 171, 600, 629, 658, 701 | Offer badge, loan pills | → `text-xs` |
| `src/components/TestimonialCarousel.tsx` | 128 | Member location label | → `text-xs` |
| `src/components/StackedServices.tsx` | 155 | Service badge | → `text-xs` |
| `src/components/HorizontalSteps.tsx` | 58 | "Step N" badge | → `text-xs` |
| `src/components/FloatingInput.tsx` | 75 | Floated label text | **Keep** — intentional design |

**Pipeline scope:** `index.tsx` only.  
Severity: **MEDIUM** — Tamil text at 10px is unreadable for target audience (40–60 age group).

---

## Hero Emblem Size Audit (index.tsx)

Current at base (mobile): `max-w-[260px]`  
At 360px viewport width: emblem takes 72% of screen width — too dominant.  
Target: `max-w-[180px]` at base (50% of 360px viewport).  
sm: `max-w-[320px]` — unchanged.  

Severity: **MEDIUM**

---

## Tamil Accessibility Audit (lang="ta")

Files with `lang="ta"` present: **3** (`about.tsx`, `contact.tsx`, `__root.tsx`)  
Files with Tamil text blocks missing `lang="ta"`:  
- `src/routes/index.tsx` — FAQ answers rendered via `t()`, no lang attribute
- `src/routes/services.tsx` — service card Tamil descriptions, no lang attribute  
- `src/routes/assistant.tsx` — FAQ answer paragraphs, no lang attribute
- `src/components/HorizontalSteps.tsx` — Tamil step text, no lang attribute

Pattern rule: any element rendering `t(tamil, english)` needs `lang={language === "ta" ? "ta" : "en"}`.

Severity: **MEDIUM** (screen reader / browser font selection broken for Tamil users)

---

## Membership Form localStorage Audit

**PASS — already implemented.**
- Key `tnvs_form_data`: saves full form object on every change ✓
- Key `tnvs_form_step`: saves current step ✓
- On mount: restores both from localStorage ✓
- On step 5 success: clears both keys ✓
- Manual clear: `clearDraft()` function with confirm dialog ✓

**This item is DONE. Skip in Stage 4.**

---

## Contact Info Cards Tamil Audit

All 4 cards in `src/routes/contact.tsx` use hardcoded English-only strings:
```
{ t: "Head Office", d: "TN Vanigargalin Sangamam,\nNo. 24, North Mada Street..." }
{ t: "Helpline",    d: "1800-XXX-XXXX (Toll-free)..." }
{ t: "Email",       d: "info@tnvs.gov.in..." }
{ t: "Office Hours",d: "Monday – Saturday..." }
```
Labels (`t:`) and details (`d:`) do **not** go through `t()`.  
Tamil-speaking users see English-only contact info.

Severity: **MEDIUM**

---

## Voter-ID Empty State Audit

When search returns 0 results (`searchResults.length > 0` is the only conditional),
there is **no fallback state rendered**. The search results area simply stays empty.  
No "not a member?" message. No link to `/membership`.  
User has no recovery path — dead-end UX.

Severity: **HIGH**

---

## Prioritized Fix List

| # | Severity | File | Issue | Fix |
|---|----------|------|-------|-----|
| 1 | HIGH | `services.tsx` | framer-motion import | Remove, replace with CSS transitions |
| 2 | HIGH | `assistant.tsx` | framer-motion import | Remove, replace with CSS transitions |
| 3 | HIGH | `WordSwapper.tsx` | framer-motion full import | Migrate to LazyMotion + domAnimation |
| 4 | HIGH | `voter-id.tsx` | no empty-state + no membership link | Add "Not a member?" block |
| 5 | MEDIUM | `services.tsx` | no body scroll lock on modal open | Add useEffect scroll lock |
| 6 | MEDIUM | `index.tsx` | `text-[10px]` stats label | → `text-xs` |
| 7 | MEDIUM | `index.tsx` | hero emblem `max-w-[260px]` mobile | → `max-w-[180px]` |
| 8 | MEDIUM | Multiple | missing `lang="ta"` attributes | Add pattern across FAQ/service text |
| 9 | MEDIUM | `contact.tsx` | info cards English-only | Add Tamil via `t()` |
| — | DONE | `membership.tsx` | localStorage auto-save | Already complete |
| — | DONE | `services.tsx` | modal max-h | Already complete |
