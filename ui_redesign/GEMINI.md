# TNVS Frontend UI Redesign — Agent Identity (v2 · May 2026)

## Scope: Frontend Only
Do NOT touch: voter-api-server.js, package.json, vite.config.ts,
tsconfig.json, eslint.config.js, or any file outside src/.
Every change is inside src/ only.

---

## Tech Stack (Confirmed — current state)
- Framework: TanStack Start (React 19) + TanStack Router v1 (file-based routing)
- Styling: Tailwind CSS v4 (NO tailwind.config.js — uses CSS @theme)
- Animation: Framer Motion v12 — still imported in services.tsx, assistant.tsx,
  WordSwapper.tsx. Section.tsx and ScrollReveal.tsx already migrated to CSS.
- Icons: Lucide React v0.575
- Forms: Custom FloatingInput/FloatingTextarea/FloatingSelect (in src/components/)
  NOTE: react-hook-form and @hookform/resolvers have been REMOVED from package.json
- Carousel: embla-carousel-react
- Toast: sonner
- Radix UI: ONLY @radix-ui/react-accordion + @radix-ui/react-slot remain
- Path alias: @ → src/
- Language: useLanguage() hook (src/hooks/useLanguage.tsx) with localStorage persistence

## Confirmed Route Files (9 routes)
- src/routes/index.tsx         → Home page (hero, stats, steps, services, FAQs)
- src/routes/services.tsx      → Services + inline modals (renewal, welfare, loan, support)
- src/routes/wings.tsx         → Organizational Wings directory
- src/routes/membership.tsx    → 5-step registration form (all 38 districts present)
- src/routes/dashboard.tsx     → Member login + dashboard (demo mode)
- src/routes/voter-id.tsx      → Membership card generator
- src/routes/assistant.tsx     → Support center + FAQ + status checker
- src/routes/about.tsx         → About page (Tamil translations added)
- src/routes/contact.tsx       → Contact form (FloatingInput migration done)

## Shared Components
- src/components/SiteHeader.tsx    → Nav (shared via __root.tsx)
- src/components/SiteFooter.tsx    → Footer (shared via __root.tsx)
- src/components/Section.tsx       → Section wrapper (IntersectionObserver, NOT framer)
- src/components/ScrollReveal.tsx  → Scroll animation (CSS only, delay prop working)
- src/components/HorizontalSteps.tsx → 4-step How-It-Works
- src/components/WordSwapper.tsx   → Animated rotating word (STILL uses framer-motion)
- src/components/FloatingInput.tsx → Form inputs (FloatingInput, FloatingTextarea, FloatingSelect)
- src/components/DemoModeBanner.tsx → Demo mode indicator
- src/components/VoterIdCard.tsx   → Voter ID card renderer
- src/components/AnimatedCounter.tsx → Number counter
- src/components/TestimonialCarousel.tsx → Member testimonials
- src/components/StackedServices.tsx → Service cards grid
- src/components/MockupCard.tsx    → Service card mockup visual

## Already Fixed (do NOT re-fix)
- Section.tsx: framer-motion removed, uses IntersectionObserver + CSS
- ScrollReveal.tsx: delay/duration/stagger props now applied via inline style
- HorizontalSteps.tsx: fixed h-[] replaced with min-h-[]
- SiteFooter.tsx: dead hash links fixed, footer CTA added
- about.tsx: full Tamil translations + ScrollReveal animations added
- contact.tsx: FloatingInput migration complete, useLanguage added
- index.tsx: broken video embed removed, sticky mobile CTA added, steps CTA added
- assistant.tsx: demo placeholder name fixed
- package.json: unused deps removed (react-hook-form, Lenis, recharts, vaul, etc.)
- vite.config.ts: manual chunk splitting, CSS code split, optimizeDeps configured
- router.tsx: defaultPreload:'intent', staleTime 30s

## Remaining Issues (what this pipeline targets)
1. Framer Motion still in: services.tsx, assistant.tsx, WordSwapper.tsx
2. Services page modals have no max-height — extend off-screen on mobile
3. stats labels use text-[10px] — below minimum readable size for Tamil users
4. Hero emblem 260px on mobile — too large at 360px viewport
5. No lang="ta" attributes on Tamil text blocks (accessibility)
6. Membership form has no localStorage auto-save — drop-off risk
7. Contact info cards (Head Office, Helpline) have no Tamil translations
8. Missing "Not a member yet?" path on voter-id empty state

---

## Brand Constraints (Non-Negotiable)
- Primary: deep navy (--color-primary in styles.css)
- Accent: saffron gold (--color-gold in styles.css)
- Bilingual: Tamil / English pattern — Tamil first, English second
- Label pattern: Tamil label on top, English subtitle below (not side-by-side)
- Government trust signals must be preserved or strengthened
- Min font size for Tamil body text: 14px (text-sm)
- Min tap target: 44×44px (min-h-11 in Tailwind)

## Target Audience
- Tamil Nadu traders, 40–60 age range
- 60–70% Android mobile (₹8,000–15,000 range, 360px screens)
- 2G–4G connectivity, intermittent drops
- Tamil-primary literacy, may have low digital fluency
- WhatsApp-native mental model

## Output Folder
outputs/ at project root (already exists).
Document every src/ file modified in outputs/change_log.md.

---

## Workflow Trigger
Open TNVS project in Windsurf/Cascade and type:

  /ui-redesign

This runs all 5 stages sequentially, frontend only.
Individual stages: /ui-audit /ux-strategy /visual-tokens
                   /component-fixes /ux-review
