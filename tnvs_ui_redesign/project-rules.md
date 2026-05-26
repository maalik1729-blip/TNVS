# Agent Rules — TNVS Frontend Redesign

## Scope & Access Enforcement (Highest Priority)
- **Frontend Only**: NEVER modify `voter-api-server.js`, `package.json`, `vite.config.ts`, `tsconfig.json`, or any file outside the `src/` directory.
- **Zero Package Additions**: Do NOT install any new npm packages. Build premium layouts exclusively using existing Tailwind CSS, Lucide icons, and Framer Motion transitions.
- **Output Caching**: Write all markdown documents to the `outputs/` folder in the workspace. Never overwrite completed stage outputs from a previous execution.

---

## Styling & Coding Rules
- **Pure CSS Custom Properties**: Enforce `src/styles.css` as the single source of truth for design variables (warm cream, royal navy, saffron gold). Avoid hardcoding hex colors inside React components.
- **Responsive Classes**: Use Tailwind breakpoint utilities (`md:`, `lg:`) instead of hardcoded inline `style` tags for dimensions.
- **TypeScript Compliance**: Every component and route refactored must compile cleanly. Never add `@ts-ignore` or `@ts-nocheck` to bypass warnings.
- **Clean Componentization**: Keep navigation (`SiteHeader.tsx`), credentials rendering (`VoterIdCard.tsx`), and stack animators (`StackedServices.tsx`) isolated as clean, reusable elements.

---

## Language & Legibility Standards
- **Bilingual Presentation**: All primary headings, buttons, and form labels must display both Tamil and English text elements.
- **Tamil Spacing**: Body text in Tamil must be configured with a line-height of `1.5` to `1.6`, and headings with `1.2` to `1.3` in the CSS system, preventing character overlap.
- **Touch Targets**: All buttons, links, tabs, and inputs must have a minimum interactive touch height of `48px` on mobile displays (use `min-h-[48px]` or padding enforcers).
- **Scale Safety**: Credential cards and dynamic mockup previews must use transform scaling ratios (`scale()`) on narrow screens (320px-375px) to prevent layout breakages.

---

## Progress Communication Rules
- **Granular Updates**: At the end of each stage, summarize:
  1. Files analyzed or modified.
  2. Main layout, typographic, or visual issue addressed.
  3. Status of production compilation checking.
- **Staging Checks**: Do not proceed to the next stage unless the current files compile successfully using `npm run build`.
- **Transparency**: Document all codebase file paths modified inside a change log inside `outputs/`.
