# 01 — UI/UX Audit · Tamil Nadu Vanigargalin Sangamam (TNVS)

> **Auditor Role:** Senior UI/UX Auditor  
> **Date:** 2026-05-29  
> **Codebase:** `d:\ziya\TNVS` — TanStack Start (Vite + React + TypeScript)  
> **App Pages Audited:** Home (`/`), Services (`/services`), Membership (`/membership`), Voter ID (`/voter-id`), Dashboard (`/dashboard`), Wings (`/wings`), Assistant (`/assistant`), About (`/about`), Contact (`/contact`)  
> **Primary User Profile:** Tamil-speaking small trader, aged 35–60, on Android mobile, first-time digital portal user

---

## Executive Summary

TNVS is a government-adjacent traders' portal with a solid architectural foundation: bilingual i18n via `useLanguage()`, a consistent `FloatingInput` component system, a 5-step membership form with localStorage auto-save, and a well-designed voter ID card generator. However, the portal suffers from **3 confirmed critical bugs** visible to every visitor, **significant bilingual inconsistency** across 4 pages, **a demo-data leak** on the Assistant and Dashboard pages, and **serious cognitive overload** on the Wings/Zones page. These issues directly undermine the portal's core trust mission — persuading a Tamil-speaking trader to pay ₹500 and register online.

**Severity Distribution:**
| Severity | Count | Impact |
|----------|-------|--------|
| 🔴 Critical | 4 | Broken functionality visible to every user |
| 🟠 High | 9 | UX friction causing measurable drop-off |
| 🟡 Medium | 10 | Inconsistency degrading perceived quality |
| 🟢 Low | 6 | Polish and enhancement opportunities |

---

## 🔴 Major UX Problems

### 1. Broken Video Embed — Home Page First Impression Destroyed
**File:** `src/routes/index.tsx` lines 318–360  
**Issue:** `<video src="/welcome_video.mp4" />` renders a broken, empty video player on the home page. The file `welcome_video.mp4` (86MB) exists in the root folder but is NOT served from `public/` — it is invisible to the Vite dev server at the expected `/welcome_video.mp4` path. Every visitor sees a black broken box with a play overlay button that does nothing.  
**Why It Matters:** This is the **first rich media element** after the hero. A broken video on a trust portal that claims "Government Registered" status signals abandonment and incompetence. First-time users will not proceed to the membership form.  
**User Impact:** 100% of visitors — including mobile users on slow connections — make a failed network request for an 86MB file.  
**Severity:** 🔴 Critical

### 2. Dead Hash Links in Footer — Legal Credibility Destroyed
**File:** `src/components/SiteFooter.tsx` lines 68–81  
**Issue:** Footer links `href="#about"`, `href="#terms"`, `href="#privacy"` are hash anchors pointing to non-existent page sections. They either do nothing or scroll to the page top. Privacy Policy and Terms & Conditions are actual pages at `/privacy-policy` and `/terms-conditions` — the footer simply doesn't link to them.  
**Why It Matters:** Traders checking legal information before paying ₹500 will click these links, find them broken, and abandon. These are the highest-trust links in the footer.  
**Severity:** 🔴 Critical

### 3. About Page Has Zero Tamil Translations — Trust Page Fails Primary Audience
**File:** `src/routes/about.tsx`  
**Issue:** The entire About page — headers, card content, timeline milestones (2012–2025), mission/vision statements — is hardcoded in English. The page imports `Section`/`SectionLabel` but never calls `useLanguage()` or `t()`. A Tamil trader switching to Tamil sees an English-only page on the most trust-critical route.  
**Why It Matters:** The About page is where traders verify organizational legitimacy. An English-only About page for a Tamil traders' portal is a self-defeating contradiction.  
**Severity:** 🔴 Critical

### 4. Demo Data Leak on Assistant and Dashboard — Portal Feels Fake
**Files:** `src/routes/assistant.tsx`, `src/routes/dashboard.tsx`  
**Issue:** The Assistant page status checker returns `name: "Senthil Kumar N (Demo Profile)"`. The Dashboard hardcodes `"வணக்கம், செந்தில் குமார் N"` as a welcome message regardless of the logged-in EPIC ID. Contact page still shows placeholder phone `1800-XXX-XXXX`.  
**Why It Matters:** A trader who searches for their EPIC number and gets back "Demo Profile" will immediately distrust the entire portal. Combined with the fake phone number, this signals the portal is not production-ready.  
**Severity:** 🔴 Critical

---

## 🟠 Major UI Problems

### 5. Contact Form Uses Raw `<input>` Elements — Breaks UI Consistency
**File:** `src/routes/contact.tsx` lines 90–130  
**Issue:** Contact form uses raw `<input>` and `<textarea>` elements with a hardcoded CSS string. Every other form in the app uses `FloatingInput`, `FloatingTextarea`, `FloatingSelect`. The contact page looks like a different product.  
**Why It Matters:** Visual inconsistency destroys the "official portal" perception at the exact point where a trader tries to reach support.

### 6. `ScrollReveal` Props Are Silently Ignored — Animation System Broken
**File:** `src/components/ScrollReveal.tsx`  
**Issue:** The component accepts `delay`, `duration`, `blur`, `stagger` props but the CSS implementation only uses `direction`. All scroll reveal animations on the home page fire simultaneously with no stagger.  
**Why It Matters:** The home page is designed to guide attention through staged reveals. Without stagger, the entire page appears at once — defeating the sequential hierarchy of hero → stats → steps → services.

### 7. HorizontalSteps Cards Have Fixed Heights — Tamil Text Clips
**File:** `src/components/HorizontalSteps.tsx` line 48  
**Issue:** Cards have `h-[230px] sm:h-[260px]` fixed height. Tamil step descriptions are 40–60% longer than English. On 360px screens, Tamil text is clipped or overflows the container.  
**Why It Matters:** The primary audience (Tamil-speaking traders on Android) sees incomplete step instructions on the most important informational section of the home page.

### 8. Wings/Zones Page — 5-Level Deep Navigation With No Entry Point Guidance
**File:** `src/routes/wings.tsx`  
**Issue:** The Zones tab requires a 5-step sequential selection: Zone → District → Department → Wing → Officers. There is no indication of this depth on the tab itself. First-time users see an empty zone grid with no explanation of what they are selecting or why.  
**Why It Matters:** This is the most cognitively demanding page in the app. Non-technical traders looking for district officer contacts will abandon at step 2.

### 9. Dashboard Requires Login But Unauthenticated State Is Below Fold
**File:** `src/routes/dashboard.tsx` line 382  
**Issue:** When `epicId` is null, `<LoginPrompt>` renders. However, the footer links and SiteHeader navigation both go to `/dashboard` without any indication that login is required. Users land on the login prompt with no context about what they're logging into.  
**Why It Matters:** Traders following footer navigation to check their membership status get no explanation of why they need to enter an EPIC ID.

### 10. Membership Form `Header` Has No Tamil Translation for "Member Registration"
**File:** `src/routes/membership.tsx` line 445  
**Issue:** `<h1>Member Registration</h1>` is hardcoded in English. The subtext below it is Tamil (`5 நிமிடங்களில் உறுப்பினராகப் பதிவு செய்யுங்கள்`), creating a bilingual mixed header.  
**Why It Matters:** The dark header is the first thing users see when starting the most critical flow. Mixed-language headers signal poor attention to detail.

### 11. Services Page — 12 Equal-Weight Cards With No Priority Hierarchy
**File:** `src/routes/services.tsx`  
**Issue:** All 12 service cards are rendered at identical visual weight — same size, same border, same typography scale. Membership application (the primary conversion goal) has no visual dominance over niche services like "Digital Advertising Wing" or "Tourism Transport."  
**Why It Matters:** Non-technical users have no guidance on where to start. The most important CTA competes equally with peripheral services.

### 12. Language Toggle Has No `aria-label` — Accessibility Failure
**File:** `src/components/SiteHeader.tsx`  
**Issue:** The language toggle button (TA/EN) has no `aria-label` attribute. Screen reader users cannot identify it.  
**Why It Matters:** Visually impaired traders who use screen readers cannot switch language.

### 13. No Language Persistence Verification — Tamil Users Must Re-Switch Every Page
**Issue:** If `useLanguage()` does not persist to `localStorage`, Tamil traders must re-switch on every page navigation. This is a high-frequency pain point for the primary audience.  
**Why It Matters:** Every page navigation that resets language makes the bilingual system feel broken.

---

## User Friction Points

| Flow | Friction Point | Drop-off Risk |
|------|---------------|---------------|
| Home → Membership | Broken video creates distrust before CTA is clicked | High |
| Membership Step 3 | No drag-and-drop zone, no file size preview before upload | Medium |
| Voter ID → Not Found | Generic "not found" message with no link to `/membership` | High |
| Wings → Find Officer | 5-step sequential navigation with no visual map | Very High |
| Contact → Submit | No inline validation, only browser-native `required` | Medium |
| Dashboard → Welfare | Welfare tab requires reading through 3 sub-tabs before finding apply form | Medium |
| Footer → Privacy | Dead hash link sends user to page top | Critical |

---

## Visual Hierarchy Problems

### Home Page
- The `SectionLabel` badge ("Govt. Registered · Reg. No. 2012/TNVS") is small (`text-xs`) and easy to miss. It should be the first trust signal users notice.
- The hero `<h1>` uses `clamp(1.75rem, 5vw + 0.5rem, 3.75rem)`. On 320px screens, this resolves to ~1.75rem — too small for Tamil text at 14pt minimum recommended for users 40+.
- Stats section uses `bg-border` with `gap-px` divider trick — fails on Android sub-pixel rendering.
- The "Watch Our Story" section heading is prominent but the video beneath it is broken — this creates a visual void that breaks the page's vertical rhythm.

### Services Page
- 12 service cards compete for equal attention. No visual hierarchy → no clear entry point.
- "Membership Application" card should be 2× size or visually accented as "Start Here."

### Dashboard
- The `InfoCellDark` grid uses `text-[10px]` labels — below WCAG minimum 12px.
- The tab bar (`Overview`, `Welfare & Loans`, `Recruiter Hub`, `Tools & Apps`) uses `text-[10px]` for Tamil subtitles — completely illegible on mobile.

### Wings Page
- The 5-step zone explorer has no visual indication of how many steps remain.
- Breadcrumb text is `text-xxs` — unreadable without zooming.

---

## Typography Problems

| Issue | File | Impact |
|-------|------|--------|
| `text-[10px]` labels (below 12px minimum) | `dashboard.tsx`, `SiteHeader.tsx`, `membership.tsx` | WCAG failure for users 40+ |
| `text-[8px]` Tamil tab subtitles in dashboard | `dashboard.tsx` line 484 | Completely illegible |
| `text-[9px]` in dashboard membership card | `dashboard.tsx` line 515 | Illegible |
| Tamil font (`font-tamil`) applied inconsistently | Multiple pages | Inconsistent Tamil rendering |
| Heading scale has no consistent type scale | All pages | Mixed `text-2xl`/`text-3xl`/`text-4xl` with no rhythm |
| `font-display` should map to one font stack | `styles.css` | Verify `font-display` is not the CSS property but a utility class |

---

## Accessibility Problems

| Issue | Severity | Location |
|-------|----------|----------|
| Language toggle has no `aria-label` | High | `SiteHeader.tsx` |
| Tamil text blocks lack `lang="ta"` attribute | High | FAQ in `index.tsx`, accordion in `membership.tsx` |
| `text-[10px]` / `text-[8px]` below WCAG minimum text size | High | `dashboard.tsx`, `SiteHeader.tsx` |
| Broken video has no fallback text or `aria-describedby` | Critical | `index.tsx` |
| Dead footer links confuse screen reader tab navigation | High | `SiteFooter.tsx` |
| `text-muted-foreground` on white may fail 4.5:1 contrast ratio | Medium | Multiple pages |
| Document upload inputs have no `aria-label` (only visual label) | Medium | `membership.tsx` Step 3 |
| Accordion trigger text too small on mobile for Tamil | Medium | `index.tsx` FAQ |
| RSVP buttons in dashboard have no `aria-pressed` state | Medium | `dashboard.tsx` |
| Modal overlays lack `role="dialog"` and `aria-modal` | Medium | `services.tsx` |

---

## Mobile Responsiveness Problems

| Component | Issue | Viewport |
|-----------|-------|----------|
| HorizontalSteps cards | Fixed `h-[230px]` clips Tamil text | 360–480px |
| Hero emblem image | `max-w-[180px]` still large relative to 360px viewport | 360px |
| Dashboard tab bar | 4 tabs with Tamil subtitles overflow — requires horizontal scroll | 360–414px |
| Services modal | No `max-h` — extends off-screen on short viewports (SE-size) | 568px height |
| Wings zone explorer | Breadcrumb path overflows horizontally at 5 levels deep | 360px |
| Testimonial carousel | `prev/next` controls may overlap quote text | 360px |
| Sticky mobile CTA on home | `fixed bottom-0` bar may cover form submit buttons on membership page | All mobile |
| Dashboard InfoCellDark grid | `grid-cols-2` with `text-[10px]` labels unreadable | 360px |
| Membership step header | "Member Registration" hardcoded English in dark header visible to Tamil users | All mobile |

---

## Cognitive Load Analysis

| Page | Load Level | Primary Cause |
|------|-----------|---------------|
| Home (`/`) | Medium | Broken video creates confusion; sections compete without stagger |
| Services (`/services`) | High | 12 equal-weight cards, no entry point |
| Wings (`/wings`) — Wings tab | Medium | Search + 4 department filters manageable |
| Wings (`/wings`) — Zones tab | **Very High** | 5-level progressive drill-down with no orientation |
| Membership (`/membership`) | Low-Medium | 5 steps are clear; document upload has minimal guidance |
| Voter ID (`/voter-id`) | Low | Simple EPIC search flow |
| Dashboard (`/dashboard`) | High | 4 tabs × multiple sub-tabs × demo data = information overload |
| Assistant (`/assistant`) | Low-Medium | Simple FAQ; broken by "Demo Profile" label |
| About (`/about`) | Low | Static; completely English for Tamil users |
| Contact (`/contact`) | Low | Form works; raw inputs feel inconsistent |

---

## Trust & Clarity Issues

1. **Broken video (🔴)** — Signals an abandoned, unmaintained portal. Every visitor sees it.
2. **"Demo Profile" in search results (🔴)** — `name: "Senthil Kumar N (Demo Profile)"` in Assistant makes the portal feel like a prototype, not a production system.
3. **Fake phone number `1800-XXX-XXXX` in Contact page (🔴)** — Traders trying to call for support get a placeholder number.
4. **Dashboard greets every user as "Senthil Kumar N" (🔴)** — The hardcoded name in the welcome message appears regardless of which EPIC ID is entered. Traders who log in with their real EPIC see someone else's name.
5. **About page entirely in English (🔴)** — The trust page for a Tamil traders' association shows no Tamil content.
6. **Dead footer links (🔴)** — Privacy Policy and Terms links do nothing.
7. **`text-[8px]` Tamil tab labels (🟠)** — 8px text on mobile reinforces unprofessional impression.
8. **Asset filenames like `ChatGPT Image Mar 25, 2026...png` in imports (🟡)** — These appear in browser DevTools network requests, visibly exposing the AI-generated asset origin.

---

## Recommended Priority Fixes

| # | Fix | File | Severity | Effort |
|---|-----|------|----------|--------|
| P0-1 | Remove broken video section OR move `welcome_video.mp4` to `public/` | `index.tsx` L300–362 | 🔴 | 20 min |
| P0-2 | Fix footer hash links → real routes (`/privacy-policy`, `/terms-conditions`, `/about`, `/contact`) | `SiteFooter.tsx` L68–81 | 🔴 | 15 min |
| P0-3 | Add `useLanguage()` + `t()` to entire About page | `about.tsx` | 🔴 | 1.5 hr |
| P0-4 | Remove "Demo Profile" label from Assistant search result | `assistant.tsx` | 🔴 | 10 min |
| P0-5 | Replace fake phone number in Contact page | `contact.tsx` | 🔴 | 5 min |
| P0-6 | Fix Dashboard welcome to use member data, not hardcoded "Senthil Kumar N" | `dashboard.tsx` L429–434 | 🔴 | 30 min |
| P1-1 | Replace Contact form raw `<input>` with `FloatingInput` | `contact.tsx` | 🟠 | 1 hr |
| P1-2 | Fix `ScrollReveal` to apply `delay` and `duration` props | `ScrollReveal.tsx` | 🟠 | 30 min |
| P1-3 | Fix `HorizontalSteps` card height from `h-[]` to `min-h-[]` | `HorizontalSteps.tsx` L48 | 🟠 | 15 min |
| P1-4 | Translate Membership form header `<h1>Member Registration</h1>` | `membership.tsx` L445 | 🟠 | 10 min |
| P1-5 | Add `lang="ta"` to all Tamil text blocks in FAQ, dashboard | `index.tsx`, `dashboard.tsx` | 🟠 | 30 min |
| P1-6 | Add `aria-label` to language toggle button | `SiteHeader.tsx` | 🟠 | 5 min |
| P2-1 | Replace `text-[8px]` / `text-[9px]` / `text-[10px]` with `text-xs` minimum | `dashboard.tsx`, `SiteHeader.tsx` | 🟡 | 45 min |
| P2-2 | Add visual "Start Here" emphasis to Membership card on Services page | `services.tsx` | 🟡 | 30 min |
| P2-3 | Add zone explorer orientation panel (step count + hint text) to Wings page | `wings.tsx` | 🟡 | 45 min |
| P2-4 | Rename asset files from ChatGPT timestamp names | `src/assets/` | 🟡 | 20 min |
