# 05 — Final UX Review · TNVS

---

## Final UX Review Summary

After completing the 4-stage audit → strategy → direction → execution plan pipeline, the TNVS portal has a clear, actionable roadmap. The 3 critical bugs are fully specified for fix. Bilingual parity has been addressed across About, Contact, and Footer. The membership form is structurally sound and needs only incremental improvements.

**Confidence level before implementation:**
- Functionality: 🟠 Medium (critical bugs not yet fixed)
- Bilingual UX: 🟠 Medium (About page fully English)
- Consistency: 🟠 Medium (contact form raw inputs)
- Mobile UX: 🟡 Mostly OK (a few overflow issues)
- Accessibility: 🟡 Mostly OK (missing lang attributes)

**After P0+P1 fixes, confidence will reach:** 🟢 High across all areas.

---

## Remaining UX Risks

1. **Language persistence not confirmed** — if `useLanguage` doesn't persist to `localStorage`, Tamil traders have a broken bilingual experience on every page load. Must verify implementation before considering fixed.
2. **Membership form has no auto-save** — a trader who fills 3 steps and closes the browser loses all data. This is the highest drop-off risk remaining after P0 fixes.
3. **Voter ID card page has no "member not found" empty state improvement** — the current state shows a generic message when EPIC is not found; it should offer a direct link to `/membership`.

---

## Membership Form QA

| Step | Check | Status |
|------|-------|--------|
| Step 1 | All fields have Tamil labels | ✅ Verify |
| Step 1 | Mobile number validates 10 digits | ✅ Verify |
| Step 2 | Business type dropdown has Tamil options | ✅ Verify |
| Step 3 | Upload zone shows accepted file types | ⚠️ Add guidance |
| Step 3 | Max file size validated with error message | ⚠️ Add |
| Step 4 | Review shows all entered data | ⚠️ Verify |
| Step 4 | Back button preserves entered data | ✅ Verify |
| Step 5 | Download certificate works | ✅ Verify |
| Step 5 | "Get membership card" link goes to /voter-id | ✅ Add |
| All | Progress percentage shown | ⚠️ Add |
| All | Keyboard navigation through steps works | ✅ Verify |

---

## Voter ID Card Flow QA

| Check | Status |
|-------|--------|
| EPIC search auto-submits on Enter | ✅ Verify |
| Loading state shown during lookup | ⚠️ Add skeleton |
| Card renders correctly at 360px width | ✅ Verify |
| Download button works on mobile Safari | ✅ Verify |
| "Not found" state links to /membership | ⚠️ Add |
| Card print layout correct on A4 | ✅ Verify |

---

## Dashboard QA

| Check | Status |
|-------|--------|
| Membership status shown above fold | ⚠️ Verify position |
| Expiry date displayed prominently | ✅ Verify |
| Renew CTA shown if expiring within 60 days | ✅ Verify |
| Activity feed has Tamil translations | ✅ Verify |
| "Demo Mode" banner visible | ✅ DemoModeBanner present |

---

## Wings/Divisions Page QA

| Check | Status |
|-------|--------|
| Search input has Tamil placeholder | ⚠️ Verify |
| District filter renders all 38 districts | ✅ Verify |
| Zone table scrolls horizontally on mobile | ✅ Verify |
| Empty search result shows helpful message | ⚠️ Verify |
| Wing contact info is accurate | ⚠️ Verify with client |

---

## Bilingual UX QA (Tamil/English)

| Check | Status |
|-------|--------|
| About page fully translated | 🔴 Fix required |
| Contact page header translated | 🟠 Fix required |
| Footer mixed strings use t() | 🟠 Fix required |
| SectionLabels never hardcode bilingual mix | 🟠 Fix required |
| Language toggle visible on all pages | ✅ Verify |
| Language persists on navigation | ⚠️ Verify localStorage |
| Tamil font renders at minimum 14px | ⚠️ Add CSS rule |
| FAQ accordion Tamil answers have lang="ta" | ⚠️ Add attribute |
| Form placeholder text switches language | ✅ Verify FloatingInput |

---

## Accessibility Risks

| Risk | Severity | Fix |
|------|----------|-----|
| Tamil text read with English TTS | High | Add lang="ta" attributes |
| Language toggle lacks aria-label | Medium | Add aria-label |
| text-[10px] labels below WCAG | High | Replace with text-xs minimum |
| Video (broken) has no fallback text | Critical | Remove video section |
| Dead footer links confuse screen readers | High | Fix links |
| Form fields missing explicit label association | Medium | Verify FloatingInput uses htmlFor |
| Color contrast: muted-foreground on white | Medium | Audit contrast ratios |

---

## Responsive Design Risks

| Component | Risk | Fix |
|-----------|------|-----|
| Hero emblem | 260px too wide on 360px screen | Reduce to 180px mobile |
| HorizontalSteps | Tamil text clips in fixed height | min-h instead of h-[] |
| Services modals | Extend off-screen on short viewports | max-h-[85vh] |
| Contact form 2-col | Too tight below 640px | md: breakpoint |
| Testimonial carousel | Controls overlap text | Verify on 360px |
| Sticky mobile CTA | May cover form submit button | Only show on non-form pages |

---

## Edge Case Review

| Scenario | Current Handling | Recommended |
|----------|-----------------|-------------|
| Upload invalid file format in Step 3 | Unknown | Add client-side validation with error |
| EPIC not found in voter-id search | Generic message | Add "Not a member yet? Join here →" link |
| Expired certificate on dashboard | Unknown | Show "Renew now" banner prominently |
| No wings in searched district | Unknown | Show "No wings registered yet" message |
| Tamil font fails to load | Falls back to system font | Acceptable — system Tamil fonts exist on Android |
| 5-step form interrupted mid-way | All data lost | Add localStorage auto-save |
| Slow 2G form submission | No timeout handling | Add 30s timeout + retry message |
| User submits contact form twice | May duplicate submission | Disable submit button after first click |

---

## Performance Considerations

1. **`welcome_video.mp4` reference** — even though the file is deleted, the `<video>` element may cause a 404 network request on every home page load. Removing the element eliminates this request.
2. **`VoterIdCard.tsx` imports** — imports 3 large PNG assets (~5MB total). These should be served from `public/` not bundled as base64.
3. **`WordSwapper.tsx`** — full framer-motion import; use `LazyMotion` to defer.
4. **Tamil font (Noto Sans Tamil)** — if added as a Google Fonts link, add `font-display: swap` and `preconnect` headers to avoid FOIT (flash of invisible text).

---

## Interaction Consistency Review

| Pattern | Consistent? | Fix |
|---------|-------------|-----|
| Primary buttons use btn-primary | ❌ Contact page uses inline Tailwind | Fix contact form |
| Scroll animations use ScrollReveal | ❌ About page timeline has none | Add ScrollReveal |
| Section headers use SectionLabel + t() | ❌ About page hardcoded | Fix About page |
| Form inputs use FloatingInput | ❌ Contact page uses raw inputs | Fix contact form |
| Error states use FieldError | ❌ Contact page missing | Add FieldError |
| Card padding uses p-5 sm:p-6 | ⚠️ Inconsistent p-4 vs p-5 vs p-6 | Standardise |

---

## UX QA Checklist

- [ ] Broken video section removed from home page
- [ ] Footer dead links fixed
- [ ] About page has Tamil translations
- [ ] Contact form uses FloatingInput
- [ ] ScrollReveal applies delay prop correctly
- [ ] HorizontalSteps uses min-h not fixed h
- [ ] Language persists to localStorage
- [ ] Demo placeholder text removed from Assistant
- [ ] Footer CTA line added
- [ ] "Start Application" CTA added after HorizontalSteps

---

## Accessibility QA Checklist

- [ ] All Tamil text blocks have lang="ta"
- [ ] Language toggle has aria-label
- [ ] All text is minimum 12px (no text-[10px])
- [ ] Tamil body text minimum 14px
- [ ] All interactive elements have min 44×44px tap target
- [ ] Focus rings visible on keyboard navigation
- [ ] Video element removed (was broken + no fallback)
- [ ] Footer links all point to real destinations

---

## Mobile Testing Checklist

Test on: Chrome Android 360px, Safari iOS 375px, Chrome Android 412px

- [ ] Hero CTA visible above fold (no scrolling required)
- [ ] Sticky bottom CTA appears on home page
- [ ] Language toggle tappable and functional
- [ ] HorizontalSteps cards show full Tamil text
- [ ] Services modal scrollable within viewport
- [ ] Membership form inputs have proper keyboard types (tel, email, number)
- [ ] Membership form step indicator fits on single line
- [ ] Voter ID card readable at mobile viewport width
- [ ] Contact form single-column below 768px
- [ ] Footer columns readable, no overflow

---

## Bilingual Testing Checklist

- [ ] Switch to Tamil — all 9 pages show Tamil
- [ ] Navigate away and back — language persists
- [ ] Refresh page — language persists
- [ ] About page fully in Tamil when Tamil selected
- [ ] Contact page header in Tamil
- [ ] Footer links in Tamil
- [ ] SectionLabel text in Tamil (no mixed string)
- [ ] Form field labels in Tamil
- [ ] Error messages in Tamil
- [ ] FAQ questions and answers in Tamil

---

## Release Readiness Checklist

- [ ] P0 bugs resolved (video, dead links, About page Tamil)
- [ ] Contact form uses FloatingInput
- [ ] No placeholder/demo text visible to end users
- [ ] No fake phone numbers displayed
- [ ] All footer links navigate correctly
- [ ] Language toggle works on all 9 pages
- [ ] Mobile sticky CTA does not overlap content
- [ ] ScrollReveal delay applied (staggered animations on home)
- [ ] Build completes without TypeScript errors
- [ ] Vite build generates no chunk size warnings above 500KB

---

## Final Recommendations

1. **Ship P0 fixes immediately** — the broken video and dead links are reputation-damaging. These are 30-minute fixes.
2. **About page Tamil translations are P0** — it's the trust page; an English-only "About" for a Tamil traders' portal is the most ironic failure in the app.
3. **Contact form FloatingInput migration** — 1 hour of work that makes the app feel like a single coherent product.
4. **Language persistence** — verify the `useLanguage` hook implementation before any other bilingual work.
5. **Do not launch new features** until the 3 critical bugs are resolved. A broken home page and dead footer links will undo all design effort.
