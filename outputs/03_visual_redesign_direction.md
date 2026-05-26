# 03 — Visual Redesign Direction · TNVS

---

## Visual Design Philosophy

TNVS occupies a rare category: **official-yet-accessible**. It must feel like a government body (trustworthy, authoritative, permanent) while being as easy to use as a modern app (clear, fast, friendly). The visual language should evoke Tamil Nadu's cultural identity — saffron, gold, deep navy — while applying them with the restraint of a Stripe or Linear-quality interface.

**Design North Star:** *"The official app of Tamil Nadu's traders — serious enough to show at a bank, simple enough for a first-time smartphone user."*

Three visual principles:
1. **Gold signals importance** — use saffron/gold only for primary actions, trust badges, and key numbers
2. **Space communicates credibility** — generous whitespace signals an established, trusted organisation
3. **Tamil is first-class** — Tamil text must be as visually refined as English; never an afterthought

---

## Typography System (Tamil + English)

### English Display Font
- Use `font-display` for all headings — maps to a serif or semi-serif like `Playfair Display` or `DM Serif Display` — communicates heritage and authority
- Heading scale: `h1 = 3rem–3.75rem`, `h2 = 2rem–2.5rem`, `h3 = 1.25rem–1.5rem`

### English Body Font
- `font-sans` — Inter or system-ui at 15–16px base
- Line height: 1.6 for body, 1.2–1.3 for headings

### Tamil Font
- Use `Noto Sans Tamil` or `Latha` for `font-tamil` class
- **Minimum Tamil body size: 14px (text-sm)** — Tamil script is denser than Latin; 12px is illegible for users 40+
- Tamil headings: minimum 18px
- Line height for Tamil: 1.8 (Tamil script needs more vertical breathing room)
- Apply `font-feature-settings: "kern" 1` for Tamil text

### What to Remove
- `text-[10px]` usage — replace all instances with minimum `text-xs` (12px)
- Mixed-language hardcoded strings in SectionLabel — all labels must use `t()` for clean rendering

---

## Color Hierarchy

### Primary Palette (keep)
- `primary` — deep navy (#1a2f5e range) — authority, trust
- `gold` / `saffron` — warm amber/orange — Tamil identity, importance
- `background` — off-white — clean, accessible

### Usage Rules
- **Gold = action or highlight** — use only for: primary CTA buttons, key stats, step numbers, trust badges
- **Navy = structural** — headers, footer, progress bars
- **Slate grays = content** — body text, captions, secondary info
- **Red/amber = alerts** — errors, warnings, expired status only

### What to Remove
- Random use of `text-rose-500`, `text-indigo-500`, `text-amber-500` for welfare scheme icons — standardise to primary/gold/slate
- `bg-slate-50/40` background tints used inconsistently — standardise section backgrounds to either `bg-background` or `bg-muted/40`

---

## Spacing Scale

Adopt a strict 4px grid:
- `space-y-2` = 8px
- `space-y-4` = 16px
- `space-y-6` = 24px
- `space-y-8` = 32px
- `py-12` = 48px for section padding (mobile)
- `py-16` = 64px for section padding (desktop)

Section padding is currently inconsistent — some sections use `py-10`, others `py-16`. Standardise to `py-12 md:py-16` for all `<Section>` wrappers.

---

## Layout System

- **Max content width:** `max-w-7xl` (1280px) — keep as-is
- **Horizontal padding:** `px-4 sm:px-6 lg:px-8` — add `sm:px-6 lg:px-8` to prevent edge-to-edge content on tablets
- **Grid system:** Use `grid` with `gap-6 md:gap-8` consistently; avoid mixing `gap-5` and `gap-6` in the same page

### Section Structure
Every content section should follow:
```
SectionLabel (category tag)
H2 heading (2–6 words max)
Supporting subtitle (1 line)
Content
```
Never skip the SectionLabel — it provides cognitive anchoring.

---

## Navigation Redesign

**Current problems:** Language toggle unclear, no "My Dashboard" for logged-in users, "Join" doesn't stand out.

**Redesigned nav:**
1. **Left:** Logo + org name (Tamil subtitle below)
2. **Centre:** Nav links (Home, Services, Divisions, Support)
3. **Right:** `[EN | தமிழ்]` toggle (always visible, pill-shaped) + `[Join →]` button (gold fill) + `[Dashboard]` icon (if logged in)

**Mobile menu:**
1. Language toggle at top of drawer (large, easy to tap)
2. Nav links in large tap-target rows (min 48px height)
3. "Apply for Membership" CTA button at bottom of drawer (full-width gold)

---

## Home Page Redesign

### Hero
- Keep current layout (text left, emblem right) — it works
- **Add**: A thin top bar above the nav (gov-stripe style) showing "Reg. No. 2012/TNVS · Government of Tamil Nadu" — this immediately signals authority before the user even reads the headline
- **Remove**: The broken video section entirely
- **Replace video section with**: Two large member testimonial quotes side-by-side — "Why I joined" format with photo, name, district, and business type

### Stats Bar
- Move stats **directly below the hero** (before "How It Works") — they're the strongest trust signal
- Add subtle animated number counters (already implemented in `AnimatedCounter`) — keep

### "How It Works" Section
- Add a primary "Start My Application →" button **directly after the 4 steps** — conversion opportunity currently missed

### Services Grid
- Label it "Most Used Services" not just "Our Services" — specificity converts better

### CTA Section (bottom of home)
- Keep the full-width navy CTA block — it's strong
- Add "No paperwork. No office visit. Done in 5 minutes." as a subtitle line

---

## Membership Form Redesign

- **Step indicator**: Add percentage text ("40% complete") alongside step pills
- **Step card background**: Light `bg-muted/30` tint to visually separate the form from page chrome
- **Input labels**: All inputs use FloatingInput — keep this, it's good
- **Error states**: Red border + inline error message below field (currently missing on some fields)
- **Step 4 (Review)**: Show a structured summary card — two-column table of all entered data before payment
- **Step 5 (Success)**: Three large action cards — "Download Certificate", "Get Membership Card", "Share on WhatsApp" — with icons

---

## Voter ID Card Visual Redesign

The card itself (`VoterIdCard.tsx`) is well-designed. The page UX needs improvement:
- **Above card**: Large search input with auto-submit on Enter (already exists — keep)
- **Card render area**: Add a subtle shadow and "Print / Download" sticky bar below the card
- **Empty state**: Custom illustration + "Enter your EPIC number above to generate your card" — remove the generic empty state

---

## Card Component System

Two card types used throughout:
1. **Action Card** (services, steps, wings) — `rounded-2xl`, subtle border, hover lift shadow, gold accent corner
2. **Info Card** (stats, contact info, timeline) — `rounded-xl`, `bg-muted/40` background, no border, no hover state

Rules:
- Action cards: `hover:shadow-lg hover:border-primary/20 transition-all duration-200`
- Info cards: `bg-muted/40 rounded-xl p-5` — no hover effect
- Card padding: `p-5 sm:p-6` — never `p-4` (too tight for Tamil text)

---

## Form Component System

All forms must use:
- `FloatingInput` for text/number fields
- `FloatingTextarea` for multiline
- `FloatingSelect` for dropdowns
- `FieldError` for inline error display
- Consistent submit button: `btn-primary` class, min height 44px, full-width on mobile

The contact form is the only exception currently — fix it to match.

---

## Button System

Three types in use:
1. **`btn-primary`** — navy fill, white text — for primary actions (Apply, Submit, Pay)
2. **Gold variant** — `btn-primary bg-gold text-gold-foreground` — for the main CTA on home page only
3. **Ghost/link** — `text-primary font-semibold hover:underline` — for secondary navigation actions

Remove: Raw `<button className="inline-flex items-center gap-2 bg-primary ...">` inline styles — use `btn-primary` class consistently.

---

## Mobile-first Design Rules

1. **Min tap target: 44×44px** for all buttons and interactive elements
2. **Min Tamil body text: 14px** — no `text-[10px]` or `text-xs` for Tamil content
3. **Hero emblem**: `max-w-[180px]` on mobile (currently 260px — too large)
4. **Card heights**: Never fixed `h-[...]` — always `min-h-[...]` with content-driven growth
5. **Modals**: `max-h-[85vh]` with `overflow-y-auto` inside modal body
6. **Form grid**: `sm:grid-cols-2` → `md:grid-cols-2` (single column up to 768px for complex forms)

---

## UI Consistency Rules

1. Section padding: `py-12 md:py-16` — everywhere
2. Section label: always `<SectionLabel>{t(ta, en)}</SectionLabel>` — never hardcoded bilingual
3. Cards: `rounded-2xl` for interactive, `rounded-xl` for info
4. Gaps: `gap-6 md:gap-8` — no `gap-5`
5. Heading after SectionLabel: always `mt-3`
6. Tamil font class: `font-tamil` on all Tamil string containers
7. `lang="ta"` attribute on all Tamil text elements

---

## Visual Simplification Opportunities

1. **Remove the decorative orb blobs** from the hero and HorizontalSteps — they add weight without meaning on mobile
2. **Remove `ring-4 ring-slate-100`** from the video container (being deleted anyway)
3. **Consolidate `text-slate-X` shades** — the codebase uses `text-slate-800`, `text-slate-600`, `text-slate-500`, `text-slate-400` inconsistently — pick `text-ink` (darkest), `text-muted-foreground` (medium), `text-slate-400` (lightest) and stick to those 3
4. **Remove unused `shadow-xs`** — not a standard Tailwind class; replace with `shadow-sm`
