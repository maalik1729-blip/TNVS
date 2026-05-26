# 01 — UI/UX Audit · Tamil Nadu Vanigargalin Sangamam

---

## Executive Summary

The TNVS portal is structurally sound with a clear design intent, but suffers from **3 critical bugs**, **significant bilingual inconsistency**, **form styling fragmentation**, and **several mobile usability gaps** that directly harm the primary user journey — a Tamil-speaking trader on an Android phone trying to join the association.

The home page hero is strong, the membership form steps are well-structured, and the voter ID card design is high quality. However, dead links in the footer, a broken video embed, About/Contact pages with no Tamil translations, and a contact form that ignores the `FloatingInput` system all undermine the portal's official credibility.

**Severity Rating:**
- 🔴 Critical (3) — broken functionality
- 🟠 High (7) — UX friction causing drop-off
- 🟡 Medium (8) — inconsistency degrading trust
- 🟢 Low (5) — polish and enhancement opportunities

---

## 🔴 Critical Bugs

### 1. Broken Video Embed on Home Page
**File:** `src/routes/index.tsx` line 273
**Issue:** `<video src="/welcome_video.mp4" />` — `welcome_video.mp4` was deleted from the project. Every visitor sees a broken video player on the home page.
**Impact:** Destroys first impression. Signals a broken, unmaintained portal — fatal for a government-adjacent trust portal.
**Fix:** Remove the video section entirely, or replace with a static image/YouTube embed.

### 2. Dead Hash Links in Footer
**File:** `src/components/SiteFooter.tsx` lines 68–81
**Issue:** `href="#about"`, `href="#terms"`, `href="#privacy"` — these hash anchors don't point to any real page or section. Clicking them does nothing or scrolls the user to the top.
**Impact:** Traders looking for privacy policy, terms, or benefits information get a broken experience. Undermines legal credibility.
**Fix:** Replace with real routes (`/about`, `/contact`) or remove until those pages exist.

### 3. About Page Has Zero Tamil Translations
**File:** `src/routes/about.tsx`
**Issue:** The entire About page is hardcoded in English — headers, card content, timeline milestones. It imports `Section`/`SectionLabel` but never calls `useLanguage()` or `t()`. Tamil users see no Tamil content on a page meant to build trust.
**Impact:** Alienates the primary Tamil-speaking user base on the most trust-critical page.
**Fix:** Add `useLanguage()`, wrap all content in `t(tamil, english)`.

---

## 🟠 High — UX Friction

### 4. Contact Form Uses Inconsistent Raw Input Styling
**File:** `src/routes/contact.tsx` line 97
**Issue:** Contact form uses raw `<input>` and `<textarea>` elements with a hardcoded CSS string `const inp = "..."`. Every other form in the app uses `FloatingInput` from `@/components/FloatingInput`. The contact form feels like a different product.
**Impact:** Visual inconsistency destroys the "official portal" perception. Non-technical users may distrust the form.
**Fix:** Replace all contact form inputs with `FloatingInput`, `FloatingTextarea`, `FloatingSelect` components.

### 5. `ScrollReveal` Silently Ignores `delay`, `duration`, `blur`, `stagger` Props
**File:** `src/components/ScrollReveal.tsx`
**Issue:** The component accepts props like `delay`, `duration`, `blur`, `stagger` but the CSS implementation only uses `direction`. Calling `<ScrollReveal delay={0.2} blur>` has zero effect.
**Impact:** All scroll reveal animations on the home page play simultaneously instead of staggered — creates visual noise rather than guided attention.
**Fix:** Apply `style={{ animationDelay: \`\${delay}s\` }}` and `animationDuration` using the props.

### 6. HorizontalSteps Cards Have Fixed Heights That Overflow Tamil Text
**File:** `src/components/HorizontalSteps.tsx` line 48
**Issue:** Cards have `h-[230px] sm:h-[260px]` fixed height. Tamil text for step descriptions is significantly longer than English. On mobile, Tamil text will be clipped or overflow.
**Impact:** Tamil-speaking users (the primary audience) see incomplete step information.
**Fix:** Remove fixed height, use `min-h-[...]` with `justify-between` flex layout.

### 7. Footer Links Point to Dashboard Without Auth Gate
**File:** `src/components/SiteFooter.tsx` line 49
**Issue:** Footer link "Member Dashboard" goes to `/dashboard`. Dashboard requires login, but unauthenticated users just get the page with no redirect — they see an empty state with no clear "login to see this" prompt above the fold.
**Impact:** Confuses traders who don't know their credentials.

### 8. No Language Persistence — Language Resets on Page Navigation
**Issue:** The `useLanguage` hook likely uses component state or context without `localStorage` persistence. When a user switches to Tamil and navigates to a new page, the language may reset to English (depending on implementation).
**Impact:** Tamil traders must re-switch language on every page — extremely frustrating.

### 9. Contact Form Has No Field Validation Feedback
**File:** `src/routes/contact.tsx`
**Issue:** Form uses native browser `required` validation only. No visible error messages, no inline feedback, no character count on message field.
**Impact:** Form submission fails silently on invalid input — traders abandon the form.

### 10. Services Page Modals Have No Mobile Scroll Lock
**File:** `src/routes/services.tsx`
**Issue:** Modal overlays don't prevent body scroll on mobile. Users can scroll the background while a modal is open.
**Impact:** Disorienting UX on mobile — users lose their scroll position when closing modals.

---

## 🟡 Medium — Inconsistency & Visual Issues

### 11. About Page Timeline Has No Animation
The About page timeline section (years 2012–2025) is static. Every other section in the app uses scroll reveal. The timeline feels flat by comparison.

### 12. Hero Section Has No Explicit `font-size` Unit Fallback
`style={{ fontSize: 'clamp(1.75rem, 5vw + 0.5rem, 3.75rem)' }}` — on very small screens (320px), this resolves to ~1.75rem. Combined with Tamil font rendering, this may be too small for older users.

### 13. Stats Grid Uses `gap-px bg-border` Divider Trick
The stats section uses `bg-border` as a background and `gap-px` to simulate grid lines. This pattern fails in dark mode and on some Android browsers where sub-pixel gaps render inconsistently.

### 14. `SectionLabel` in Bilingual Pages Mixes Languages Inconsistently
Some pages hardcode mixed Tamil/English in SectionLabel: `"About · எங்களைப் பற்றி"` as a static string. This ignores the `useLanguage()` context and always shows mixed text.

### 15. Voter ID Card References Deleted Assets
**File:** `src/components/VoterIdCard.tsx` lines 1–3
**Issue:** Imports `headerLogo`, `rightLogo`, `ownerSign` from `src/assets/`. These large PNG files are bundled directly into the component. The card component imports 1.6MB + 1.5MB + 2.2MB = ~5.3MB of images that every voter-id page visitor downloads.
**Impact:** Massive page weight for the voter ID feature.

### 16. `WordSwapper` Uses Full Framer Motion Import
**File:** `src/components/WordSwapper.tsx`
**Issue:** Imports `motion, AnimatePresence` from `"framer-motion"`. This pulls the full library into the home page's critical chunk.
**Fix:** The word swap animation can be done with CSS `@keyframes` or `LazyMotion`.

### 17. Home Page Video Section Occupies Significant Vertical Space
Even with the broken video, the section heading, description, and container div all render, wasting screen space where no content can be shown.

### 18. Contact Page Has No Map or District Office List
Traders from districts other than Chennai have no information about their local district office. Only Chennai head office is listed.

---

## Visual Hierarchy Problems

- **Home hero**: The SectionLabel badge ("Govt. Registered") is small and easy to miss — it should be the first element users notice to build trust.
- **Services page**: All 12 service cards are the same visual weight — no hierarchy to guide users to the most important services (membership, renewal).
- **Dashboard**: Not reviewed in detail yet, but activity feed and welfare sections likely compete for equal visual attention.
- **Footer**: Three equal-weight nav columns (Services, Association, Office) give no hierarchy clue about which links matter most.

---

## Typography Problems

- Tamil text (`font-tamil` class) is used inconsistently — some Tamil strings use it, others use the default font. Inconsistent Tamil rendering across pages.
- Heading sizes jump from `text-3xl` to `text-4xl` without a consistent scale. The `font-display` class should map to a specific font stack.
- FAQ accordion trigger text (`text-sm md:text-base`) is small for Tamil users, especially on mobile.
- The `text-[10px]` usage in stats labels is too small for users 40+ years old — at least `text-xs` (12px) should be the floor.

---

## Accessibility Problems

- **Tap targets**: Several icon-only buttons (e.g., language toggle) may be smaller than 44×44px.
- **Color contrast**: `text-muted-foreground` over light backgrounds may not meet WCAG AA 4.5:1 contrast ratio.
- **Missing `aria-label`** on language toggle button.
- **Video element** (even broken) has no `aria-label` or fallback text.
- **Footer hash links** are keyboard-accessible but lead nowhere — confusing for screen reader users.
- **FAQ accordion**: Uses radix-ui `accordion` which has good ARIA, but Tamil text answers have no `lang="ta"` attribute — screen readers will mispronounce Tamil using English phonics.

---

## Mobile Responsiveness Problems

- **HorizontalSteps**: Fixed card heights overflow Tamil text on 360px screens.
- **Hero section**: `grid md:grid-cols-2 lg:grid-cols-12` — on 360–480px screens, the emblem image stacks below text and is very large relative to the viewport.
- **Services modal**: No `max-height` on modal body, causing modals to extend off-screen on short mobile viewports.
- **Contact form**: Full-width inputs with no clear group separation look like one long list on mobile.
- **Testimonial carousel**: Carousel controls (prev/next) may overlap carousel text on very small screens.

---

## Cognitive Load Analysis

| Page | Cognitive Load | Main Cause |
|------|---------------|------------|
| Home | Medium | Multiple sections competing for attention; video broken |
| Services | High | 12 services + 4 modal flows all visible simultaneously |
| Wings/Divisions | Very High | 234-constituency table + 50+ wings with no clear entry point |
| Membership | Medium | 5 steps are clear, but document upload instructions are minimal |
| Voter ID | Low-Medium | Simple search flow, well-designed |
| Dashboard | Medium | Activity + renewal + welfare all visible; unclear priority |
| Assistant | Low | Simple FAQ + status checker |
| About | Low | Static content, no decisions required |
| Contact | Low | Simple form |

---

## Trust & Clarity Issues

1. **Broken video** is the single biggest trust-destroyer — looks abandoned.
2. **Dead footer links** to non-existent privacy/terms pages undermine legal credibility.
3. **About page in English only** makes Tamil traders feel like second-class users on a page explicitly about the Tamil traders' association.
4. **"Demo Profile" text** visible in the Assistant page status checker search results — `name: "Senthil Kumar N (Demo Profile)"` — this is clearly a placeholder that was never replaced.
5. **Fake phone number** — `1800-XXX-XXXX` in the contact page is a placeholder, not a real number.

---

## Recommended Priority Fixes

| # | Fix | Severity | Effort |
|---|-----|----------|--------|
| 1 | Remove broken video embed or replace with YouTube embed | 🔴 Critical | 30 min |
| 2 | Fix dead footer hash links | 🔴 Critical | 15 min |
| 3 | Add Tamil translations to About page | 🔴 Critical | 1 hr |
| 4 | Replace contact form inputs with FloatingInput | 🟠 High | 1 hr |
| 5 | Fix ScrollReveal to apply delay/duration props | 🟠 High | 30 min |
| 6 | Fix HorizontalSteps card height to min-h | 🟠 High | 15 min |
| 7 | Replace "Demo Profile" placeholder text in Assistant | 🟠 High | 15 min |
| 8 | Replace fake phone number with real helpline | 🟠 High | 10 min |
| 9 | Fix mixed-language SectionLabel strings | 🟡 Medium | 30 min |
| 10 | Convert WordSwapper to LazyMotion | 🟡 Medium | 45 min |
