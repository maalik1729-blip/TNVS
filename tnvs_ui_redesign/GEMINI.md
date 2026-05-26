# TNVS Frontend UI Redesign — Agent Identity

## Scope: Frontend Only
Do NOT touch: `voter-api-server.js`, `package.json`, `vite.config.ts`, any database logic, any server files, or any backend routes. All changes must be made strictly inside the `src/` directory.

---

## Tech Stack (Confirmed from Codebase)
- **Framework**: TanStack Start (React 19) + TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 + custom HSL design variables
- **Components**: Premium custom components (SiteHeader, SiteFooter, StackedServices, VoterIdCard, HorizontalSteps)
- **Animation**: Framer Motion (optimized for mobile performance)
- **Icons**: Lucide React
- **Forms**: Native React state + floating labeled inputs (`FloatingInput.tsx`)
- **Path alias**: `@` → `src/`

---

## Confirmed Route Files
- `src/routes/index.tsx`         → Home page with hero, welcome video, and scroll steps.
- `src/routes/services.tsx`      → Interactive services directory with tab-bar filters.
- `src/routes/wings.tsx`         → Association Organizational Wings list with swipe-chips.
- `src/routes/membership.tsx`    → 5-step premium membership registration flow.
- `src/routes/dashboard.tsx`     → Member workspace, history logs, and widgets.
- `src/routes/voter-id.tsx`      → Membership card search and verification portal.
- `src/routes/assistant.tsx`     → Support Center with interactive FAQ assistant.

---

## Brand Constraints (Non-Negotiable)
- **Primary Accent**: Deep Royal Navy (`oklch(0.30 0.14 255)`) representing official government-approved trust.
- **Secondary Accent**: Warm Light Cream/Parchment (`oklch(0.985 0.012 85)`) for document-like authenticity.
- **Highlight Accent**: Saffron Gold (`oklch(0.78 0.12 85)`) for active indicators and borders.
- **Bilingual Interface**: Seamless support for both Tamil and English text elements.
- **Government Trust**: Tri-color government-style stripes and official emblems must be integrated cleanly.

---

## Target Audience Profile
- **Primary User**: Traditional retail merchants and small-shop owners in Tamil Nadu (Age 35-65).
- **Device Profile**: 70% mobile usage, typically mid-range Android devices with varying resolutions.
- **Connectivity**: Mobile 4G with potential intermittent dropouts (requires local draft caching).
- **Literacy**: Tamil-primary literacy. Needs highly legible, clear Noto Tamil script layouts.
- **Behavioral Model**: WhatsApp-native mental model; prefers simple button actions, immediate status visual feedback, and clear touch targets.

---

## Workflow Trigger
Place this folder in the project root. Type in your AI developer chat:
* `/ui-audit`          → Run Stage 1 Audit
* `/ux-strategy`       → Run Stage 2 UX Strategy
* `/visual-tokens`     ← Run Stage 3 Visual Tokens & styles.css
* `/component-fixes`   ← Run Stage 4 Code Implementation
* `/ux-review`         ← Run Stage 5 Visual Verification
