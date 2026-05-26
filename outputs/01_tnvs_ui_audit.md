# UI/UX Audit: TNVS Trader Portal

This audit evaluates the current Tamil Nadu Vanigargalin Sangamam (TNVS) Trader Portal interface. It details usability challenges, visual hierarchy friction points, and responsiveness issues across core route views (`index.tsx`, `membership.tsx`, `voter-id.tsx`, `dashboard.tsx`, `wings.tsx`, `services.tsx`, `assistant.tsx`) and custom components.

---

## 1. Executive Summary

The TNVS Trader Portal successfully establishes an official, government-approved brand identity using a warm light parchment surface (`oklch(0.985 0.012 85)`), deep Navy institutional typography (`oklch(0.30 0.14 255)`), and saffron gold accent details (`oklch(0.78 0.12 85)`). 

However, when evaluated from the perspective of traditional retail shop owners and non-technical traders in Tamil Nadu, the application introduces significant user friction. Key areas of concern include high cognitive load in the multi-step registration flow (`membership.tsx`), scroll-jacking layout confusion in the services stacking deck (`StackedServices.tsx`), translation-induced layout shifts, and accessibility blocks on mobile touchpoints.

---

## 2. Major UX Problems

### A. Multi-Step Onboarding Friction (`membership.tsx`)
* **Problem**: The premium membership registration is a large multi-step form. There is no automatic field pre-save or local cache state. If a user gets disconnected or makes a validation error in the final step, they lose their filled data, causing massive drop-off rates.
* **Why it matters**: Retail traders frequently apply from mobile devices with unstable connections. Having to re-enter business licenses, shop photos, and bank accounts will lead to form abandonment.

### B. Scroll-Jacking & Stacking Confusion (`StackedServices.tsx`)
* **Problem**: The fanning cards deck on the landing page uses high-performance scroll translation to stack card components. However, on standard mouse scroll-wheels, the cards fly by too rapidly, making it difficult to read individual service summaries.
* **Why it matters**: Traditional users expect linear layouts. Dynamic scroll effects without explicit visual indicators cause scroll confusion and hide key portal functions.

### C. ID Verification Disconnect (`voter-id.tsx`)
* **Problem**: The voter search uses a separate modal/panel interaction that displays validation errors in dynamic toast overlays that fade too quickly. The success state displays credential downloads without showing the verification path.
* **Why it matters**: Non-technical users need absolute clarity during official verification. Fast-fading messages confuse users about whether their registration was accepted or rejected.

---

## 3. Major UI Problems

### A. Dynamic Alignment & Border Overlaps
* **Problem**: When transitions occur between adjacent sections on the landing page (e.g., `HorizontalSteps` into `StackedServices`), double border lines appear (top border adjacent to bottom border), violating the clean, flat layout design.
* **Why it matters**: Double borders look unpolished and detract from a premium, Stripe-like institutional look.

### B. Status Indicator Contrast Issues
* **Problem**: The status pills (`StatusPill.tsx`) use highly saturated background colors in light mode. While beautiful, they cause color contrast issues with white/light text.
* **Why it matters**: Institutional portals must support clear status reading (Pending, Approved, Denied) for colorblind or low-attention users.

---

## 4. User Friction Points

### A. Tamil Script Layout Shifts
* **Problem**: Tamil characters are physically wider and taller than Latin equivalents. When toggling the language hook, headers and subheadings wrap onto extra lines, pushing primary CTA buttons out of the viewport.
* **Why it matters**: This layout shift forces the user to scroll to find the action button they were just about to tap.

### B. Focus State Contrast on Floating Inputs (`FloatingInput.tsx`)
* **Problem**: Focus indicators on custom floating label inputs are subtle. The gold highlight shadow lacks the 3:1 contrast ratio required against the cream parchment background.
* **Why it matters**: Keyboard-reliant or low-vision users cannot easily identify which text input is currently active.

---

## 5. Visual Hierarchy Problems

### A. Hero Page Dominance Competition
* **Problem**: The hero section on `index.tsx` features three competing elements: the bold bilingual headline, the prominent welcome video overlay, and a grid of stats cards. The primary "Apply for Membership" button gets lost in this visual clutter.
* **Why it matters**: First-time users are overwhelmed by competing options rather than guided through a single, clear primary onboarding funnel.

### B. Dashboard Stat Contrast (`dashboard.tsx`)
* **Problem**: The dashboard widgets place large numerical values directly over subtle watermark grid patterns, creating visual noise.
* **Why it matters**: Traders checking their official membership credentials or payment status need clear, high-contrast numbers that can be read instantly.

---

## 6. Typography Problems

### A. Tamil Line-Height Clamping
* **Problem**: The global `h1` and `h2` headings have a tight line-height of `1.08` and `1.12`. While this looks great for English serif fonts, it clips the top and bottom loops of Tamil characters.
* **Why it matters**: Text clipping makes Tamil words hard to read and looks unprofessional.

### B. Typographic Scale on Mobile viewports
* **Problem**: Fluid typography clamps (`clamp()`) scale down aggressively on screens below `360px`, rendering body captions at less than `12px` (`0.75rem`), which is the absolute minimum legible size.
* **Why it matters**: Older traders or those with visual impairments cannot read micro-captions on mobile screens.

---

## 7. Accessibility Problems

### A. Focus Order & Keyboard Traps
* **Problem**: Tab navigation skips the custom step indicators in `HorizontalSteps.tsx` and gets trapped inside the dynamic carousel cards in `TestimonialCarousel.tsx`.
* **Why it matters**: Complete keyboard support is mandatory for formal govt-approved portals. Users navigating without a mouse are blocked.

### B. Form Accessibility & Missing Labels
* **Problem**: Custom floating label inputs hide placeholders when inactive. If a browser autofills a form, label animations overlap autofilled text, making it unreadable.
* **Why it matters**: Screen readers cannot announce label states accurately when labels dynamically shift their absolute coordinates on input focus.

---

## 8. Mobile Responsiveness Problems

### A. Voter Card Scaling on Small Screens
* **Problem**: The standard CR80 membership card template in `VoterIdCard.tsx` is fixed at `320px` width. On low-end smartphones (`320px` screens), the card clips at the horizontal borders, cutting off the secure QR verification code.
* **Why it matters**: The digital voter ID card is the portal's core feature. If a trader cannot view or scan the card on their mobile screen, the tool is unusable in the field.

### B. Category Chips Overflow
* **Problem**: The category chip layout on `wings.tsx` wraps onto multiple vertical rows on mobile, taking up half the viewport and pushing the primary content below the fold.
* **Why it matters**: Users are forced to scroll past a wall of category buttons before seeing any actual content.

---

## 9. Cognitive Load Analysis

### A. Too Many Form Fields in a Single Step
* **Problem**: The registration step for business details demands commercial codes, GST numbers, tax references, and licenses on a single screen without progress validation.
* **Why it matters**: High density of institutional fields creates anxiety and increases the rate of input errors.

### B. AI Chat Clutter (`assistant.tsx`)
* **Problem**: The AI support bot offers too many static prompt buttons simultaneously. The chat bubble layout has busy border outlines that compete with the text.
* **Why it matters**: Users seeking simple help are overwhelmed by visual choices.

---

## 10. Trust & Clarity Issues

### A. Missing Verification Path Feedback
* **Problem**: When a trader inputs their ID in `voter-id.tsx`, the portal queries the registry database. If no record is found, it shows a generic "No Record Found" message rather than explaining the next steps (e.g., contacting support or applying for membership).
* **Why it matters**: Generic errors reduce user trust and make the platform feel broken rather than official.

---

## 11. Recommended Priority Fixes

| Severity | Target Component/Route | Issue | Proposed Action |
| :--- | :--- | :--- | :--- |
| **Critical** | `VoterIdCard.tsx` | Mobile clipping on 320px screens | Apply a CSS scale wrapper (`responsive-card-scale`) to dynamically scale down the card wrapper. |
| **Critical** | `membership.tsx` | Stepper validation & data loss | Add a local state save mechanism to prevent form data loss on step validation errors. |
| **Major** | `HorizontalSteps.tsx` | Massive empty layout scroll gap | Adjust the outer track scroll height and use custom `useScroll` target offset hooks to center the scroll range. |
| **Major** | `styles.css` | Tamil script typographic clipping | Adjust global line-height clamps specifically for Tamil script content. |
| **Minor** | `Section.tsx` / `index.tsx` | Section border overlaps | Clean up border utility states to prevent double borders between dynamic sections. |
