# 03 — Design Tokens + Visual Direction (v2 · May 2026)

---

## Existing Token Audit

`src/styles.css` already contains a comprehensive token system:

**Present and correct:**
- `--color-primary` (deep navy) → `oklch(0.30 0.14 255)` ✓
- `--color-gold` → `oklch(0.78 0.12 85)` ✓
- `--color-navy` / `--color-navy-light` / `--color-gold-light` ✓
- `--font-tamil` → `'Noto Serif Tamil', 'Noto Sans Tamil', serif` ✓
- `--font-display` / `--font-body` ✓
- `--radius-card` (0.75rem) / `--radius-modal` (1rem) / `--radius-input` ✓
- `--shadow-xs` → `--shadow-lg` shadow scale ✓
- `--color-surface-info` / `--color-border-info` ✓
- `animate-fade-in` / `animate-slide-up` CSS classes ✓
- `section-reveal` / `section-visible` CSS classes ✓

**Missing (to add):**
1. `[lang="ta"]` typography rule — ensures correct font + line-height for Tamil screen readers and rendering
2. `@keyframes word-enter` / `word-exit` — needed if WordSwapper is migrated to pure CSS (not needed if using LazyMotion approach)
3. `--z-nav`, `--z-modal`, `--z-sticky-cta` z-index tokens — currently hardcoded as Tailwind `z-40`, `z-50`, `z-[100]`

---

## Tokens to Add

All additions are **appended** to the end of `src/styles.css`. Nothing is overwritten.

### 1. Tamil typography rule

```css
/* === TAMIL TYPOGRAPHY === */
[lang="ta"], .font-tamil {
  font-family: var(--font-tamil);
  line-height: 1.8;
  word-break: break-word;
}
```

Note: `font-size: max(0.875rem, 1em)` intentionally omitted — Tamil fonts render
at correct optical size with the existing scale. Adding a min-size would conflict
with small badge text that uses `.font-tamil` only for the font family.

### 2. WordSwapper CSS keyframes (added for future fallback, not used if LazyMotion)

```css
/* === WORD SWAPPER ANIMATION (CSS fallback) === */
@keyframes word-enter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes word-exit {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}
.word-enter { animation: word-enter 0.25s ease forwards; }
.word-exit  { animation: word-exit 0.2s ease forwards; }
```

### 3. Z-index tokens (in :root block, not added in this pass — Tailwind classes sufficient)

Deferred — `z-40`/`z-50` Tailwind classes work correctly. Adding CSS vars would
require refactoring all usages. Scope creep risk. Skip.

---

## CSS Framer Motion Replacements

### services.tsx modal
```
Old: motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }}
New: <div className="transition-all duration-200 data-[open=false]:scale-95 data-[open=false]:opacity-0">
  OR: conditional mount + animate-fade-in class on mount
```
Use `animate-fade-in` (already in styles.css) on the modal panel div.
Backdrop: `transition-opacity duration-200 opacity-0` → `opacity-100` via conditional className.

### assistant.tsx panels
```
Old: motion.div with x slide variants
New: <div key={activePanel} className="animate-fade-in">
```
React key change on panel swap triggers unmount/remount → CSS animation fires.

---

## src/styles.css Change Summary

**Append to end of file:**
- `[lang="ta"]` rule block (~5 lines)
- `word-enter` / `word-exit` keyframes + classes (~10 lines)

**Nothing removed.** All existing CSS is preserved.
