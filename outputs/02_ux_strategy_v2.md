# 02 — UX Strategy (v2 · May 2026)

---

## Strategy Overview

9 targeted fixes across 8 files. No architectural changes needed.
All fixes are additive or substitutive — no component restructuring required.
Framer Motion removal is the highest-effort item; all others are surgical edits.

---

## Framer Motion Replacement Plan

### services.tsx — Modal open/close animation
Current: `motion.div` with `scale: 0.95→1, opacity: 0→1` via `AnimatePresence`.  
Replace with:
- Backdrop: `transition-opacity duration-200` + conditional `opacity-0`/`opacity-100` classes
- Modal panel: `transition-all duration-200` + conditional `scale-95 opacity-0`/`scale-100 opacity-100`
- `AnimatePresence` removed — use conditional rendering directly (`modal && (...)`)
- CSS classes already available: `animate-fade-in` (styles.css line 502)

### assistant.tsx — Panel/step transitions
Current: `motion.div` with `x: ±20, opacity` slide animations between FAQ panels.  
Replace with:
- Wrap panel content in `<div className="animate-fade-in">` (re-mounts on key change)
- Or: use `key` prop on a plain `<div>` — React unmount/remount triggers CSS animation
- `AnimatePresence` removed entirely

### WordSwapper.tsx — Word flip animation
Current: `motion.span` with spring `y: 20→0→-20, opacity` via `AnimatePresence`.  
**Decision: LazyMotion + domAnimation** (not pure CSS).  
Reasoning:
- The spring physics (`stiffness: 260, damping: 20`) are the premium feel of the hero section
- Replicating spring with CSS `cubic-bezier` is imprecise
- LazyMotion loads only the ~10KB domAnimation feature set vs ~35KB full framer bundle
- The word rotates every 2.8s — not a scroll/mount animation, so performance risk is minimal

Migration:
```tsx
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
// Wrap outer return in <LazyMotion features={domAnimation}>
// Replace motion.span → m.span (identical API)
```

---

## Services Modal Scroll Lock

**Spec:** Add `useEffect` that locks body scroll when any modal is open.

```tsx
useEffect(() => {
  if (modal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => { document.body.style.overflow = ""; };
}, [modal]);
```

Place after existing `modal` state declaration. No library needed.

---

## Membership Form Auto-Save

**Already implemented** — `tnvs_form_data` + `tnvs_form_step` keys with full
read-on-mount and clear-on-success logic. Skip this fix entirely.

---

## Tamil Accessibility Plan

**Rule to apply across codebase:**
```tsx
// When element renders t(tamil, english):
<p lang={language === "ta" ? "ta" : "en"}>
  {t("தமிழ் உரை", "English text")}
</p>
```

**Requires** `const { language, t } = useLanguage()` — already imported in all target files.

**Files + elements to update:**
- `index.tsx`: FAQ `<AccordionContent>` answer paragraphs (2 per item)
- `services.tsx`: service card `<p>` description elements in the grid
- `assistant.tsx`: FAQ answer `<p>` elements inside accordion panels
- `components/HorizontalSteps.tsx`: step description `<p>` elements

---

## Stats / Typography Fix

`text-[10px]` → `text-xs` (12px).  
`text-xs` is the documented minimum in `styles.css` (`--text-caption: 0.75rem`).  
**Pipeline scope:** `index.tsx` line 244 only. Other files (wings, dashboard) are bonus.

---

## Hero Emblem Size Fix

`max-w-[260px]` → `max-w-[180px]` at base breakpoint only.  
At 360px viewport: 180px = 50% width — appropriate for hero balance.  
`sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]` — all unchanged.

---

## Voter-ID Empty State UX

**When:** search has been submitted and `searchResults.length === 0` (and not `isSearching`).  
**What to show:** a friendly "no results" message + link to `/membership`.

Add a tracked `hasSearched` boolean state (set to `true` on handleSearch call).  
Render below the search results area:
```tsx
{hasSearched && !isSearching && searchResults.length === 0 && (
  <div className="mt-4 p-4 rounded-xl bg-secondary/60 border border-border text-center">
    <p className="text-sm text-muted-foreground font-tamil"
       lang={language === "ta" ? "ta" : "en"}>
      {t("பதிவு எண் கண்டுபிடிக்கவில்லை.", "No membership record found.")}
    </p>
    <p className="mt-2 text-sm font-tamil" lang={language === "ta" ? "ta" : "en"}>
      {t("இன்னும் உறுப்பினர் இல்லையா?", "Not a member yet?")}
      {" "}
      <Link to="/membership"
            className="text-primary font-semibold hover:underline">
        {t("இப்போதே இணையுங்கள் →", "Join now →")}
      </Link>
    </p>
  </div>
)}
```

---

## Contact Info Cards Tamil Plan

Extend the inline array in `contact.tsx` with Tamil fields `ta` and `td`:

```tsx
{[
  {
    i: MapPin,
    t: "Head Office", ta: "தலைமை அலுவலகம்",
    d: "TN Vanigargalin Sangamam,\nNo. 24, North Mada Street,\nMylapore, Chennai — 600 004",
    td: "தமிழ்நாடு வணிகர்களின் சங்கமம்,\nஎண். 24, வடக்கு மடா தெரு,\nமயிலாப்பூர், சென்னை — 600 004"
  },
  {
    i: Phone,
    t: "Helpline", ta: "உதவி எண்",
    d: "1800-XXX-XXXX (Toll-free)\n+91 91944 20044",
    td: "1800-XXX-XXXX (கட்டணமற்றது)\n+91 91944 20044"
  },
  {
    i: Mail,
    t: "Email", ta: "மின்னஞ்சல்",
    d: "info@tnvs.gov.in\nsupport@tnvs.gov.in",
    td: "info@tnvs.gov.in\nsupport@tnvs.gov.in"
  },
  {
    i: Clock,
    t: "Office Hours", ta: "அலுவலக நேரம்",
    d: "Monday – Saturday\n10:00 AM – 6:00 PM",
    td: "திங்கள் – சனி\nகாலை 10:00 – மாலை 6:00"
  },
].map((c) => (
  <div key={c.t} ...>
    <div className="font-display font-semibold">{t(c.ta, c.t)}</div>
    <div ... lang={language === "ta" ? "ta" : "en"}>{t(c.td, c.d)}</div>
  </div>
))}
```

---

## Recommended Implementation Order

1. styles.css — CSS additions (word-enter/exit, lang rule) — no risk
2. WordSwapper.tsx — LazyMotion migration (isolated component)
3. services.tsx — framer removal + scroll lock (highest-traffic page)
4. assistant.tsx — framer removal
5. index.tsx — text-[10px] + hero emblem (surgical, 2 lines)
6. contact.tsx — info cards Tamil (additive)
7. voter-id.tsx — hasSearched state + empty state block (additive)
8. lang="ta" — index.tsx FAQs + services.tsx descriptions (low risk, additive)
