# 04 — Component Execution Plan · TNVS

---

## Priority Order

**P0 — Critical bugs (implement first):**
1. Remove broken video from `index.tsx`
2. Fix dead footer links in `SiteFooter.tsx`
3. Add `useLanguage()` + Tamil translations to `about.tsx`

**P1 — High impact consistency:**
4. Replace contact form inputs with `FloatingInput` in `contact.tsx`
5. Fix `ScrollReveal.tsx` to apply `delay` prop
6. Fix `HorizontalSteps.tsx` fixed card height → `min-h`
7. Fix mixed-language SectionLabel strings

**P2 — Bilingual + trust:**
8. Add `lang="ta"` attributes on Tamil text blocks
9. Persist language to `localStorage` in `useLanguage.tsx`
10. Remove "Demo Profile" placeholder from `assistant.tsx`
11. Add sticky mobile CTA to `index.tsx`

**P3 — Enhancement:**
12. Add "Start Application" CTA after HorizontalSteps
13. Add footer CTA line before copyright
14. Improve About page timeline with subtle animation

---

## 1. `src/routes/index.tsx` — Home Page

### Remove Broken Video Section
**Current issue:** Lines 252–278 render a `<video src="/welcome_video.mp4">` for a deleted file.
**Change:** Delete the entire `{/* WELCOME VIDEO SECTION */}` block (lines 252–278).
**Replace with:** A two-column testimonial quote block — two large pull-quotes with member photo, name, district.

### Add CTA After HorizontalSteps
**Current issue:** After the 4 steps, users have no prompt to act.
**Change:** After `<HorizontalSteps />` (line 281), add:
```tsx
<div className="flex justify-center py-8 border-b border-border">
  <Link to="/membership" className="btn-primary text-base px-8">
    {t("இப்போதே விண்ணப்பிக்கவும்", "Start My Application")}
    <ArrowRight className="w-4 h-4" />
  </Link>
</div>
```

### Add Sticky Mobile CTA
**Change:** Add a fixed bottom bar visible only on mobile (`sm:hidden`) at the bottom of the `Home` component return:
```tsx
<div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-primary/95 backdrop-blur border-t border-primary/20 px-4 py-3 flex items-center gap-3">
  <Link to="/membership" className="flex-1 btn-primary text-sm py-2.5 justify-center">
    {t("இணைவு — ₹500/ஆண்டு", "Join — ₹500/year")}
  </Link>
</div>
```
Also add `pb-20 sm:pb-0` to the `<div>` wrapping the page to prevent content hiding behind the sticky bar.

### Fix Mixed SectionLabel
**Change:** Replace all hardcoded bilingual SectionLabel strings with `t()` calls:
```tsx
// Before:
<SectionLabel>About · எங்களைப் பற்றி</SectionLabel>
// After:
<SectionLabel>{t("எங்களைப் பற்றி", "About")}</SectionLabel>
```

---

## 2. `src/components/SiteFooter.tsx` — Footer

### Fix Dead Hash Links
**Current issue:** `href="#about"`, `href="#terms"`, `href="#privacy"` go nowhere.
**Change:**
```tsx
// Before:
<a href="#about">Member Benefits</a>
<a href="#terms">Rules & Guidelines</a>
<a href="#privacy">Privacy Policy</a>
// After:
<Link to="/about">{t("சங்கத்தின் பற்றி", "About Us")}</Link>
<Link to="/contact">{t("விதிமுறைகள்", "Rules & Guidelines")}</Link>
<Link to="/contact">{t("தனியுரிமைக் கொள்கை", "Privacy Policy")}</Link>
```

### Add Footer CTA Line
**Change:** Above the copyright bar, add:
```tsx
<div className="border-t border-slate-800/60 py-4 px-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
  <span className="text-xs text-slate-400">{t("இன்றே இணையுங்கள்", "Ready to join?")}</span>
  <Link to="/membership" className="text-xs text-gold font-semibold hover:underline flex items-center gap-1">
    {t("உறுப்பினர் சேர்க்கை →", "Apply for Membership →")}
  </Link>
</div>
```

---

## 3. `src/routes/about.tsx` — About Page

### Add Full Bilingual Support
**Current issue:** No `useLanguage()`, all content English-only.
**Change:** Add `import { useLanguage } from "@/hooks/useLanguage"` and wrap every string.

**Vision/Mission/Values cards:**
```tsx
{ i: Eye,    t: "Our Vision",  ta: "எங்கள் கனவு",     d: "...",    td: "..." },
{ i: Target, t: "Our Mission", ta: "எங்கள் நோக்கம்",  d: "...",    td: "..." },
{ i: Heart,  t: "Our Values",  ta: "எங்கள் கொள்கைகள்", d: "...",   td: "..." },
```
Render as `t(b.td, b.d)` for description, `t(b.ta, b.t)` for heading.

**Timeline milestones:**
```tsx
{ y: "2012", t: "Foundation",        ta: "நிறுவப்பட்டது",         d: "...", td: "..." },
```
Render year labels and milestone titles through `t()`.

**Page hero header:**
```tsx
<SectionLabel>{t("எங்களைப் பற்றி", "About")}</SectionLabel>
<h1>{t("நூறு ஆண்டு இயக்கம், நவீன போர்ட்டல்.", "A century-old movement, a modern portal.")}</h1>
<p className="font-tamil">{t("தமிழ்நாடு வணிகர்களின் ஒற்றுமை...", "Tamil Nadu traders' unity...")}</p>
```

### Add Timeline Animation
**Change:** Wrap each timeline item in `ScrollReveal`:
```tsx
{milestones.map((m, i) => (
  <ScrollReveal key={m.y} delay={i * 0.1} direction="up">
    <div className="flex gap-4 sm:gap-6 items-start">...</div>
  </ScrollReveal>
))}
```

---

## 4. `src/routes/contact.tsx` — Contact Page

### Replace Raw Inputs with FloatingInput
**Current issue:** Raw `<input>`, `<textarea>`, `<select>` with inline CSS string.
**Add import:**
```tsx
import { FloatingInput, FloatingTextarea, FloatingSelect } from "@/components/FloatingInput";
```
**Replace form fields:**
```tsx
// Before:
<label className="flex flex-col gap-1.5">
  <span className="text-xs font-medium">Your Name</span>
  <input className={inp} required />
</label>

// After:
<FloatingInput label={t("உங்கள் பெயர்", "Your Name")} required />
```
Apply to all 5 fields: Name, Mobile, Email, Subject (FloatingSelect), Message (FloatingTextarea).

**Remove:** `const inp = "..."` at the bottom of the file.

### Add Tamil Page Header
**Add** `useLanguage()` import and wrap header text:
```tsx
<SectionLabel>{t("தொடர்பு", "Contact")}</SectionLabel>
<h1>{t("நாங்கள் உதவ தயாராக இருக்கிறோம்.", "We're here to help.")}</h1>
```

---

## 5. `src/components/ScrollReveal.tsx` — Fix Delay/Stagger Props

**Current issue:** `delay`, `duration`, `blur` props are accepted but never applied.
**Change:** Apply `animationDelay` and `animationDuration` via inline style:
```tsx
export function ScrollReveal({
  children,
  direction = "up",
  duration = 0.3,
  delay = 0,
  className = "",
  stagger = false,
}: ScrollRevealProps) {
  const animClass = direction === "scale" || direction === "fade" ? "animate-fade-in" : "animate-slide-up";
  const style = {
    animationDelay: delay ? `${delay}s` : undefined,
    animationDuration: duration ? `${duration}s` : undefined,
  };

  if (stagger && React.Children.count(children) > 1) {
    return (
      <div className={className}>
        {React.Children.map(children, (child, i) => (
          <div key={i} className={animClass} style={{ animationDelay: `${(delay || 0) + i * (staggerDelay || 0.05)}s` }}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${animClass} ${className}`} style={style}>
      {children}
    </div>
  );
}
```

---

## 6. `src/components/HorizontalSteps.tsx` — Fix Fixed Heights

**Current issue:** `h-[230px] sm:h-[260px]` clips Tamil text.
**Change:** Replace fixed height with `min-h`:
```tsx
// Before:
className="... h-[230px] sm:h-[260px] ..."
// After:
className="... min-h-[200px] sm:min-h-[220px] ..."
```
Also ensure `flex flex-col justify-between` is present so content distributes properly regardless of height.

---

## 7. `src/hooks/useLanguage.tsx` — Persist to localStorage

**Current issue:** Language state may not persist across navigation (depends on implementation).
**Change:** Add localStorage read on init and write on change:
```tsx
const [language, setLanguageState] = useState<Language>(() => {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("tnvs-lang") as Language) || "en";
  }
  return "en";
});

const setLanguage = (lang: Language) => {
  setLanguageState(lang);
  if (typeof window !== "undefined") {
    localStorage.setItem("tnvs-lang", lang);
  }
};
```

---

## 8. `src/routes/assistant.tsx` — Remove Demo Placeholder

**Current issue:** Status check result shows `name: "Senthil Kumar N (Demo Profile)"`.
**Change:** Replace with:
```tsx
name: t("மாதிரி சுயவிவரம் (Demo)", "Sample Profile (Demo Mode)"),
```
And add a `DemoModeBanner` above the result to clarify it's a demo.

---

## SiteHeader Changes

**Ensure language toggle is always visible:**
Read `SiteHeader.tsx` to confirm the EN/Tamil toggle position.
- If hidden on mobile: add `flex` to the toggle's container and ensure it's in the main nav bar, not only in the mobile menu.
- Minimum toggle tap target: `min-w-[44px] min-h-[44px]`.

---

## Animation Improvements (Framer Motion)

**`WordSwapper.tsx`** uses full `framer-motion`. To reduce bundle impact:
```tsx
// Replace full import:
import { motion, AnimatePresence } from "framer-motion";
// With LazyMotion (loads features async):
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
// Wrap in <LazyMotion features={domAnimation}> and use <m.span> instead of <motion.span>
```

---

## Bilingual Typography Improvements

Add to `styles.css`:
```css
.font-tamil {
  font-family: 'Noto Sans Tamil', 'Latha', sans-serif;
  line-height: 1.8;
  font-size: max(14px, 1em); /* enforce minimum 14px */
}

[lang="ta"] {
  font-family: 'Noto Sans Tamil', 'Latha', sans-serif;
  line-height: 1.8;
}
```

Add Google Fonts link to `__root.tsx` head:
```tsx
{ rel: "preconnect", href: "https://fonts.googleapis.com" },
{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&display=swap" },
```

---

## Responsive Design Tasks (360px → 1280px)

| Component | Issue | Fix |
|-----------|-------|-----|
| Hero emblem | Too large on mobile (260px) | `max-w-[180px] sm:max-w-[280px] md:max-w-[360px]` |
| Stats grid | `text-[10px]` labels illegible | `text-xs` minimum |
| HorizontalSteps | Fixed height clips Tamil | `min-h-[200px]` |
| Contact form | `sm:grid-cols-2` too early | `md:grid-cols-2` |
| Services modal | No max-height | `max-h-[85vh] overflow-y-auto` |
| Footer columns | Wraps oddly on 480–640px | Add `xs:grid-cols-2` |

---

## Frontend Handoff Notes

1. All changes are additive — no route file restructuring needed
2. `FloatingInput` already supports `label`, `required`, `type` props — use as-is
3. `useLanguage()` hook: confirm `localStorage` write is in the setter, not a `useEffect`
4. `ScrollReveal` accepts `once` prop — ensure `true` by default (only animate once on scroll in)
5. The `btn-primary` class is defined in `styles.css` — use it for all submit buttons instead of inline Tailwind chains
6. `DemoModeBanner` component exists and works — use it in assistant.tsx result state
