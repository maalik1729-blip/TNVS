# TNVS — UI/UX Redesign Prompts (5-Stage System)

**Project:** Tamil Nadu Vanigargalin Sangamam (TNVS)  
**Stack:** React · TanStack Router · TailwindCSS · Framer Motion  
**Target Users:** Tamil Nadu traders — often mobile-first, bilingual (Tamil/English), non-technical  
**Key Pages:** Home · Services · Wings/Divisions · Membership (5-step form) · Voter ID Card · Dashboard · Assistant/Support · About · Contact

---

# PROMPT 1 — UI AUDIT

## Purpose

This stage identifies:
- UI weaknesses specific to a bilingual (Tamil/English) civic/government-style portal
- UX friction in the 5-step membership application flow
- Usability problems for non-technical traders and mobile users
- Layout inconsistencies across pages
- Cognitive overload in the Wings/Divisions zone directory
- Accessibility issues for an older, Tamil-speaking demographic
- Mobile responsiveness gaps on the membership form and voter ID card generator

The purpose is to create a detailed understanding of:
- What confuses first-time traders trying to join
- What makes the membership form feel slow or broken
- What reduces trust in an official government-affiliated portal
- What creates friction in the Tamil/English language switching experience
- What makes navigation unclear on small screens

---

## Goal

Generate a complete UI/UX audit document that:
- Identifies major interface issues across all 9 pages
- Prioritizes usability problems by severity
- Explains user pain points specific to Tamil Nadu trader demographics
- Documents visual hierarchy issues on the Home and Services pages
- Analyzes friction in the 5-step membership form
- Reviews the voter ID card generator usability
- Assesses bilingual UX quality (Tamil label rendering, font legibility)
- Creates a reference point for the redesign stages that follow

**Output File:** `outputs/01_ui_audit.md`

---

## Prompt

You are a senior UI/UX auditor specializing in bilingual civic portals and government service applications.

You are auditing the **Tamil Nadu Vanigargalin Sangamam (TNVS)** web portal — Tamil Nadu's official traders association platform.

**Key Pages to Audit:**
1. **Home (`/`)** — Hero section, stats counters, how-to-join steps, stacked services grid, testimonials carousel, FAQ accordion
2. **Services (`/services`)** — Service catalog with modal overlays for renewal, welfare, support, loan
3. **Wings/Divisions (`/wings`)** — Searchable directory of 50+ wings with zone breakdown table (234 constituencies)
4. **Membership (`/membership`)** — 5-step form: Personal → Business → Documents → Review → Certificate
5. **Voter ID / Card (`/voter-id`)** — Membership card lookup and generator with photo upload
6. **Dashboard (`/dashboard`)** — Member area: EPIC ID, certificate, activity feed, renewal, welfare claims
7. **Assistant/Support (`/assistant`)** — Status checker, FAQ accordion, welfare scheme guide
8. **About (`/about`)** — Mission, vision, history
9. **Contact (`/contact`)** — Head office info, helpline, district contact form

**User Personas to evaluate against:**
- A 50-year-old Tamil-speaking shopkeeper in Madurai applying for membership on a budget Android phone
- A young trader in Chennai using the portal for the first time on desktop
- A member checking their renewal status on mobile during a busy market day
- A district coordinator searching for wings information

**Audit Goals:**
- Identify UI problems
- Identify UX friction in each major flow
- Identify cognitive overload (especially in Wings directory and membership form)
- Identify layout inconsistencies across pages
- Identify spacing and rhythm issues
- Identify typography hierarchy problems (especially Tamil font rendering)
- Identify usability concerns in the 5-step form flow
- Identify trust issues that undermine the official government-portal feel
- Identify accessibility gaps (contrast, font size, tap targets for older users)
- Identify mobile responsiveness problems on the membership form and voter ID card

**Instructions:**
1. Be highly critical
2. Think from the perspective of a first-time Tamil-speaking trader on mobile
3. Evaluate bilingual quality — are Tamil labels readable, well-sized, properly spaced?
4. Assess the 5-step membership form for drop-off risk at each step
5. Evaluate whether the portal communicates official authority and trustworthiness
6. Assess the voter ID card generator for clarity and ease of use
7. Prioritize findings by severity: Critical → High → Medium → Low

**Output Requirements:**
Generate `outputs/01_ui_audit.md` with this structure:

```
# Executive Summary
# Major UX Problems
# Major UI Problems
# Membership Form Friction Analysis (Step-by-Step)
# Wings/Divisions Usability Problems
# Voter ID Card Generator Issues
# Dashboard Usability Problems
# Bilingual UX Quality (Tamil/English)
# Visual Hierarchy Problems
# Typography Problems
# Accessibility Problems
# Mobile Responsiveness Problems
# Cognitive Load Analysis
# Trust & Clarity Issues
# Recommended Priority Fixes
```

---

================================================================================

---

# PROMPT 2 — UX IMPROVEMENT STRATEGY

## Purpose

This stage converts identified problems into:
- Practical UX improvements for a Tamil Nadu civic portal
- Reduced friction in the 5-step membership application flow
- Better bilingual interaction patterns
- Clearer navigation for non-technical mobile users
- Simplified workflows for membership, renewal, and welfare claims

---

## Goal

Create a UX strategy document that:
- Reduces drop-off in the membership form
- Simplifies the Wings/Divisions discovery flow
- Improves bilingual toggle UX
- Reduces cognitive load in the voter ID card generator
- Improves mobile navigation clarity
- Strengthens trust signals throughout the portal
- Improves the new-member onboarding journey from landing to certificate

**Output File:** `outputs/02_ux_improvement_strategy.md`

---

## Prompt

Read: `outputs/01_ui_audit.md`

You are a senior product designer specializing in civic service portals and multilingual government applications.

Based on the audit findings, create a complete UX improvement strategy for the TNVS portal.

**Project Context:**
- Traders must complete a 5-step membership form (Personal → Business → Documents → Review → Certificate)
- The portal serves traders across 38 Tamil Nadu districts across 50+ wings/divisions
- Users switch between Tamil and English throughout their session
- Most users access on mobile (Android, mid-range devices)
- The voter ID card generator is a key feature — members print/share their membership card
- The dashboard is a post-login member area with activity feed, renewal, and welfare access

**Your Goals:**
- Reduce friction at each of the 5 membership form steps
- Simplify the Wings/Divisions directory for quick lookup
- Improve the Tamil/English toggle discoverability and persistence
- Improve the voter ID card flow (search → preview → download)
- Improve mobile navigation — the current nav has 5 items with Tamil labels
- Improve the dashboard for a member who visits once per month
- Strengthen onboarding: what does a first-time visitor do first?
- Reduce cognitive load in the 234-constituency zone breakdown table

**For every recommendation:**
- Explain WHY this change matters
- Explain the trader/user impact
- Explain the business/trust impact

**Instructions:**
- Do not redesign visually yet
- Focus only on UX logic, flow, and interaction improvements
- Prioritize usability over aesthetics
- Consider Tamil language UX best practices

**Output Requirements:**
Generate `outputs/02_ux_improvement_strategy.md` with this structure:

```
# UX Strategy Overview
# Membership Form Flow Improvements (Step-by-Step)
# Wings/Divisions Discovery Improvements
# Voter ID Card Flow Improvements
# Dashboard Improvements
# Navigation Improvements
# Bilingual UX Improvements
# Onboarding & First-Visit Flow
# CTA Improvements
# Trust Signal Improvements
# Mobile UX Improvements
# Accessibility Enhancements
# Recommended UX Priorities
```

---

================================================================================

---

# PROMPT 3 — VISUAL REDESIGN DIRECTION

## Purpose

This stage creates:
- A modern visual system that communicates official authority and trustworthiness
- Improved typography for bilingual Tamil/English content
- Cleaner layouts for the membership form and Wings directory
- Stronger visual hierarchy for the Home page
- A consistent component system across 9 pages

---

## Goal

Generate a visual redesign blueprint that:
- Establishes a design language fitting for a state-level traders association
- Modernizes the interface while preserving cultural identity
- Improves Tamil font rendering and sizing
- Reduces visual clutter in the Wings/Divisions page
- Creates a scalable card and form component system
- Improves the membership certificate/voter ID card visual quality

**Output File:** `outputs/03_visual_redesign_direction.md`

---

## Prompt

Read: `outputs/02_ux_improvement_strategy.md`

You are a senior product UI designer specializing in civic portals and multilingual government-adjacent applications.

Create a premium visual redesign direction for the TNVS portal.

**Design Reference Quality:**
- Official yet modern — between India Stack / DigiLocker clarity and Linear/Stripe visual quality
- Trustworthy, authoritative, not bureaucratic
- Bilingual-ready: Tamil script must be as visually prominent as English

**Project Context:**
- Primary color: saffron/gold — reflects Tamil Nadu cultural identity
- The membership certificate / voter ID card is a tangible printed artefact — its design matters deeply
- The home page uses a `WordSwapper` headline animation and animated stat counters
- The Wings page renders a table of 234 zones — this needs to be scannable on mobile
- The membership form uses `FloatingInput` (label floats on focus) — this pattern should be consistent

**Your Goals:**
- Define a typography system that works for both Tamil and English — font pairing, sizes, line heights
- Improve visual hierarchy: what should users see first on each key page
- Design a color hierarchy that distinguishes primary actions, trust signals, and information
- Clean up spacing — define a consistent spacing scale
- Modernize the navigation — current nav feels header-heavy
- Redesign the voter ID card layout for print quality
- Improve form visual design — inputs, labels, error states, step progress
- Define card component patterns — service cards, activity cards, stat cards

**Instructions:**
- Explain design reasoning for every decision
- Explain what should be removed or simplified
- Explain what should become visually dominant
- Consider how designs render on a 360px wide Android phone

**Output Requirements:**
Generate `outputs/03_visual_redesign_direction.md` with this structure:

```
# Visual Design Philosophy
# Typography System (Tamil + English)
# Color Hierarchy & Palette
# Spacing Scale
# Layout System
# Navigation Redesign
# Home Page Redesign
# Membership Form Redesign
# Wings/Divisions Page Redesign
# Voter ID Card Visual Redesign
# Dashboard Redesign
# Card Component System
# Form Component System
# Button System
# Mobile-first Design Rules
# UI Consistency Rules
# Visual Simplification Opportunities
```

---

================================================================================

---

# PROMPT 4 — COMPONENT EXECUTION PLAN

## Purpose

This stage converts visual redesign direction into:
- Implementation-ready tasks for a React + TailwindCSS + TanStack Router project
- Component-level change specifications for each of the 9 pages
- Responsive behavior definitions for 360px → 1280px
- Interaction specifications for framer-motion animations
- Developer-ready frontend execution plan

---

## Goal

Create a component execution document that:
- Explains exact Tailwind class changes per component
- Defines responsive breakpoint behavior per component
- Specifies framer-motion animation improvements
- Organises implementation tasks in priority order
- Provides developer handoff clarity for each page

**Output File:** `outputs/04_component_execution_plan.md`

---

## Prompt

Read: `outputs/03_visual_redesign_direction.md`

You are a senior frontend architect working with this stack:
- **React 19** with TypeScript
- **TailwindCSS v4**
- **TanStack Router** (file-based routing)
- **Framer Motion v12** (used in 6 route files)
- **Lucide React** (icons)
- **Sonner** (toast notifications)
- **Embla Carousel** (testimonials carousel)

**Existing Components to specify changes for:**
- `SiteHeader.tsx` — smart hide-on-scroll nav with Tamil/English toggle
- `SiteFooter.tsx` — contact info and nav links
- `Section.tsx` + `SectionLabel.tsx` — page section wrapper (now uses CSS IntersectionObserver, not Framer Motion)
- `ScrollReveal.tsx` — CSS-only scroll reveal
- `AnimatedCounter.tsx` — stats counter using IntersectionObserver
- `WordSwapper.tsx` — hero headline word animation
- `HorizontalSteps.tsx` — how-to-join step indicator
- `TestimonialCarousel.tsx` — Embla-based testimonial slider
- `StackedServices.tsx` — service grid with image cards + MockupCard
- `ActivityCard.tsx` — dashboard activity item
- `StatusPill.tsx` — status badge (active/pending/expired)
- `EmptyState.tsx` — empty data state
- `FloatingInput.tsx` — floating-label input + textarea + select
- `FieldError.tsx` — form field error display
- `LoginPrompt.tsx` — unauthenticated user prompt
- `DemoModeBanner.tsx` — demo mode indicator
- `VoterIdCard.tsx` — membership card renderer (front + back)
- `Skeleton.tsx` — loading skeleton
- `MockupCard.tsx` — service card mockup visual
- `ui/accordion.tsx` — FAQ accordion
- `ui/button.tsx` — primary/secondary/ghost button variants
- `ui/carousel.tsx` — testimonial carousel wrapper

**For every component:**
- State the current issue
- State the redesign goal
- Specify exact class/structure changes
- Specify responsive behaviour (mobile → desktop)
- Specify animation improvements if applicable
- Specify accessibility improvements

**Output Requirements:**
Generate `outputs/04_component_execution_plan.md` with this structure:

```
# SiteHeader Changes
# SiteFooter Changes
# Home Page Component Changes
# Membership Form Changes (Step-by-Step)
# Wings/Divisions Page Changes
# Voter ID Card Component Changes
# Dashboard Component Changes
# FloatingInput System Improvements
# Button System Improvements
# Section & Layout Improvements
# Animation Improvements (Framer Motion)
# Bilingual Typography Improvements
# Responsive Design Tasks (360px → 1280px)
# Mobile Interaction Improvements
# Accessibility Implementation Tasks
# Frontend Handoff Notes
# Component Priority Order
```

---

================================================================================

---

# PROMPT 5 — FINAL UX REVIEW

## Purpose

This stage validates the full redesign plan before implementation:
- Quality assurance across all 9 pages
- Bilingual UX validation (Tamil + English)
- Accessibility compliance review for older Tamil-speaking users
- Mobile responsiveness review for low-end Android devices
- Edge case analysis for the membership form, voter ID search, and dashboard
- Release readiness evaluation

---

## Goal

Create a final UX review document that:
- Validates usability quality across all pages and flows
- Identifies remaining gaps before developers begin implementation
- Creates QA checklists for each major user flow
- Reviews bilingual rendering quality
- Reviews mobile usability on 360px screens
- Reviews accessibility compliance for older users
- Identifies developer implementation risks in the React/Tailwind stack

**Output File:** `outputs/05_final_ux_review.md`

---

## Prompt

Read: `outputs/04_component_execution_plan.md`

You are a senior UX reviewer with expertise in bilingual civic portals, React component systems, and mobile-first design.

Perform a final review of the TNVS redesign plan.

**Critical User Flows to validate:**

1. **New member journey** — Landing → Understanding value → Clicking "Join" → Completing 5-step form → Downloading certificate
2. **Returning member journey** — Landing → Dashboard → Checking status → Downloading voter ID card
3. **Wings lookup journey** — Landing → Divisions page → Searching/filtering → Finding their wing → Viewing zone breakdown
4. **Support journey** — Landing → Assistant page → Checking membership status → Reading FAQ → Contacting office
5. **Language switch journey** — Arriving on English page → Switching to Tamil → All labels, inputs, and errors in Tamil

**Edge Cases to review:**
- Membership form: what if a user uploads an invalid photo (wrong format, too large)?
- Voter ID card: what if the EPIC number is not found in the database?
- Dashboard: what if the member's certificate has expired?
- Wings page: what if a district has no wings registered?
- Language toggle: what if Tamil font fails to load on a low-end device?
- Mobile: what if the 5-step form is interrupted by a phone call?
- Connectivity: what if form submission fails on a slow 2G connection?

**Your Goals:**
- Identify remaining UX gaps not addressed in the execution plan
- Identify accessibility risks for Tamil-speaking users aged 45+
- Identify edge cases not covered
- Identify mobile usability concerns on 360px Android devices
- Identify performance concerns (image loading, font loading, form submission)
- Identify interaction inconsistencies between Framer Motion animated and non-animated pages
- Identify developer implementation risks specific to the React/TailwindCSS stack

**Output Requirements:**
Generate `outputs/05_final_ux_review.md` with this structure:

```
# Final UX Review Summary
# Remaining UX Risks
# Membership Form QA
# Voter ID Card Flow QA
# Dashboard QA
# Wings/Divisions Page QA
# Bilingual UX QA (Tamil/English)
# Accessibility Risks (Focus: 45+ year old Tamil users)
# Responsive Design Risks (Focus: 360px Android)
# Edge Case Review
# Performance Considerations
# Interaction Consistency Review
# Developer Implementation Risks
# UX QA Checklist
# Accessibility QA Checklist
# Mobile Testing Checklist
# Bilingual Testing Checklist
# User Testing Checklist
# Release Readiness Checklist
# Final Recommendations
```

---

================================================================================

## How to Use These Prompts

1. Run **Prompt 1** first — give it access to all 9 route files and component files
2. After `outputs/01_ui_audit.md` is generated, run **Prompt 2**
3. Each prompt reads the previous stage's output — follow the order
4. All 5 output files will land in `outputs/` — recreate that folder if needed
5. After Prompt 5, use `outputs/04_component_execution_plan.md` as the direct developer handoff document
