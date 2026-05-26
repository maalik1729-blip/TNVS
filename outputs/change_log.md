# TNVS Change Log

---

## Pipeline v2 — May 2026

| Stage | File | What Changed | Lines |
|-------|------|-------------|-------|
| S1 | `outputs/01_ui_audit_v2.md` | Created — 9-issue audit of remaining problems | new |
| S2 | `outputs/02_ux_strategy_v2.md` | Created — strategy for all 9 fixes | new |
| S3 | `outputs/03_visual_tokens_v2.md` | Created — token audit + CSS additions spec | new |
| S3 | `src/styles.css` | Appended `[lang="ta"]` rule + word-enter/exit keyframes | 724–741 |
| S4 | `src/components/WordSwapper.tsx` | Framer full import → LazyMotion + domAnimation + m | 1–3, 59, 67–107 |
| S4 | `src/routes/services.tsx` | Removed framer-motion; body scroll lock; CSS modal animation | 9, 114–122, 286–302 |
| S4 | `src/routes/assistant.tsx` | Removed framer-motion; CSS animate-fade-in replacements | 7, 166–174, 228–234 |
| S4 | `src/routes/index.tsx` | Stats text-[10px]→text-xs; emblem max-w-[260px]→180px; lang on FAQs | 222, 244, 327–332 |
| S4 | `src/routes/contact.tsx` | Added language; Tamil fields in info cards; t() + lang attr | 20, 53–66 |
| S4 | `src/routes/voter-id.tsx` | hasSearched state; setHasSearched; "Not a member?" empty state | 32–38, 188–189, 468–480 |
| S5 | `outputs/05_final_review_v2.md` | Created — verification results + mobile check | new |

---

## Pipeline v1 — (previous session)

See `outputs/01_ui_audit.md` through `outputs/05_final_ux_review.md` for v1 records.

Key changes in v1:
- `src/routes/index.tsx` — sticky CTA pb-16 padding
- `src/components/SiteFooter.tsx` — dead links fixed, footer CTA added
- `src/routes/about.tsx` — full Tamil translations + ScrollReveal
- `src/routes/contact.tsx` — FloatingInput components, useLanguage, controlled state
- `src/components/ScrollReveal.tsx` — delay/duration/staggerDelay inline styles
- `src/components/HorizontalSteps.tsx` — h-[] → min-h-[]
- `src/routes/assistant.tsx` — demo placeholder label fix
- `src/components/Section.tsx` — framer-motion → IntersectionObserver + CSS
- `src/styles.css` — section-reveal/visible CSS
- `vite.config.ts` — manual chunk splitting, optimizeDeps
- `src/router.tsx` — defaultPreload: intent, staleTime: 30s
- `src/components/TestimonialCarousel.tsx` — loading=lazy
- `src/components/StackedServices.tsx` — loading=lazy + decoding=async
- `package.json` — removed unused @radix-ui + dead deps
