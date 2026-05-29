# TNVS Component Execution Plan

---

# Header Changes

## SiteHeader Component

### Current Issue
- Language toggle not prominent
- Navigation labels generic ("Divisions" instead of "Wings")
- No breadcrumbs for inner pages
- Mobile hamburger menu not intuitive for older users

### Redesign Goal
Make header more discoverable, clear, and bilingual-friendly with consistent navigation labels.

### Exact UI Changes

#### Desktop Header (64px height)
- **Logo:** Left-aligned, 40px height, TNVS branding
- **Navigation:** Horizontal list with renamed labels:
  - "Divisions" → "Wings" (பிரிவுகள்)
  - "Assistant" → "Support" (உதவி மையம்)
  - "Member" → "Membership" (உறுப்பினர் சேர்க்கை)
- **Active State:** Blue underline (2px), blue text color
- **Language Toggle:** Right-aligned, flag icon + current language text, prominent
- **CTA Button:** "Join Now" / "Login" - primary blue (#1e3a8a), 8px border radius, 14px semibold

#### Mobile Header (56px height)
- **Logo:** Centered, 32px height
- **Language Toggle:** Top-right, 44x44px touch target
- **Menu Button:** Top-left, 44x44px touch target (for "More" items only)
- **Remove:** Hamburger menu for primary navigation

### Interaction Improvements
- Language toggle shows current state with visual feedback
- Nav items have smooth hover transition (200ms)
- Active state clearly visible on current page
- Mobile menu items have 48x48px touch targets

### Responsive Behavior
- Desktop (>1024px): Full horizontal navigation
- Tablet (768-1024px): Horizontal with condensed labels
- Mobile (<768px): Simplified header, bottom navigation for primary items

### Spacing and Layout Changes
- Nav items: 16px horizontal spacing
- Logo to nav: 24px spacing
- Right section items: 16px spacing
- Consistent 64px height across desktop

---

# Sidebar Changes

## Membership Page Sidebar

### Current Issue
- 3 separate cards (Step Navigator, Helper, Fee Summary) create visual clutter
- Helper card separate from form context
- Fee summary appears in multiple places

### Redesign Goal
Combine into single cohesive card with step navigator + fee at bottom.

### Exact UI Changes

#### Combined Sidebar Card
- **Single card** with white background, 12px border radius, subtle shadow
- **Section 1 - Step Navigator:**
  - Title: "Registration Steps" (uppercase, 12px, gray)
  - 4 steps displayed as list items
  - Each step: Icon circle (7x7) + label + Tamil label
  - Active step: Blue background (#eff6ff), blue border
  - Completed steps: Green checkmark, 70% opacity
  - Inactive steps: 40% opacity
  - Chevron right icon on active step
- **Section 2 - Fee Summary (at bottom):**
  - Border-top separator
  - "Annual Fee" label (uppercase, 12px, emerald)
  - "₹ 500" price (20px, bold, emerald)
  - "UPI / Netbanking / Card" description (12px, emerald)

### Interaction Improvements
- Steps are clickable for navigation
- Hover state on step items (light blue background)
- Active step clearly distinguished
- Smooth transitions (200ms)

### Responsive Behavior
- Desktop (>768px): Sticky sidebar, 256px width
- Mobile (<768px): Remove sidebar, use mobile step progress bar at top

### Spacing and Layout Changes
- Card padding: 20px
- Step items: 10px vertical spacing
- Step to fee section: 20px top margin
- Fee section: 16px top padding

---

# Navigation Improvements

## Breadcrumb Component

### Current Issue
No breadcrumbs, users don't know where they are in site hierarchy.

### Redesign Goal
Add breadcrumb navigation for clear location context and easy back navigation.

### Exact UI Changes

#### Breadcrumb Design
- **Location:** Below header, above page content
- **Format:** Home > Section > Subsection
- **Separator:** ">" with gray color
- **Current Page:** Bold, not clickable
- **Previous Pages:** Clickable, blue on hover
- **Mobile:** Truncate to 3 levels max with "..." if needed

### Interaction Improvements
- Clickable breadcrumbs navigate to respective pages
- Hover state: Blue color, underline
- Smooth transition (150ms)

### Responsive Behavior
- Desktop: Full breadcrumb trail
- Mobile: Truncate to 3 levels, show "Home > ... > Current"

### Spacing and Layout Changes
- Breadcrumb height: 32px
- Vertical spacing: 8px above content
- Horizontal spacing: 8px between items

---

## Bottom Navigation (Mobile)

### Current Issue
Hamburger menu not intuitive for older users, primary navigation hidden.

### Redesign Goal
Replace with always-visible bottom navigation bar for key sections.

### Exact UI Changes

#### Bottom Navigation Bar
- **Position:** Fixed bottom, 60px height
- **Background:** White, top border
- **Items:** 5 key sections
  - Home (icon: Home)
  - Membership (icon: User)
  - Voter Search (icon: Search)
  - Dashboard (icon: Layout)
  - More (icon: MoreHorizontal)
- **Icon Size:** 24px
- **Label:** 11px, below icon, Tamil + English
- **Active State:** Blue icon + text, subtle background
- **Badge:** Red dot for notifications (3px radius)

### Interaction Improvements
- Entire item is tappable (48x48px min)
- Active state clearly visible
- Smooth transition (200ms)
- Ripple effect on tap

### Responsive Behavior
- Mobile (<768px): Always visible
- Tablet (768px+): Hide, use desktop navigation

### Spacing and Layout Changes
- Item width: 20% (5 items evenly distributed)
- Icon to label: 4px spacing
- Safe area: 16px bottom padding for iPhone

---

# Dashboard Card Changes

## Dashboard Stats Card

### Current Issue
All stats have equal visual weight, no context, difficult to identify importance.

### Redesign Goal
Create clear hierarchy with context and visual prominence for key stats.

### Exact UI Changes

#### Stats Card Design
- **Layout:** 3-column grid (desktop), 1-column (mobile)
- **Card Structure:**
  - Icon (32x32) in colored circle
  - Label (14px, medium gray)
  - Value (24px, bold, dark gray)
  - Context/Trend (12px, green for positive, red for negative)
- **Border Radius:** 12px
- **Padding:** 20px
- **Background:** White
- **Border:** 1px solid light gray
- **Shadow:** Subtle (0 1px 3px rgba(0,0,0,0.1))

### Interaction Improvements
- Hover: Light blue background, subtle lift
- Clickable cards: Cursor pointer, navigate to detail view
- Smooth transition (200ms)

### Responsive Behavior
- Desktop (>1024px): 3-column grid
- Tablet (768-1024px): 2-column grid
- Mobile (<768px): 1-column stack

### Spacing and Layout Changes
- Card spacing: 16px (desktop), 12px (mobile)
- Card padding: 20px (desktop), 16px (mobile)
- Icon to text: 12px spacing

---

## Dashboard Activity Card

### Current Issue
Activities list has no visual hierarchy, timestamps not prominent.

### Redesign Goal
Create clean, scannable activity list with clear timestamps.

### Exact UI Changes

#### Activity Card Design
- **Layout:** List of activities
- **Activity Item:**
  - Icon (20x20) with colored background circle
  - Activity text (14px, dark gray)
  - Timestamp (12px, medium gray)
  - Optional: Badge for status
- **Spacing:** 16px between activities
- **Collapsible:** Default collapsed, click to expand
- **Count Badge:** Show number of activities when collapsed

### Interaction Improvements
- Click to collapse/expand
- Hover state on individual activities
- Smooth expand/collapse animation (300ms)

### Responsive Behavior
- Desktop: Full list visible
- Mobile: Collapsed by default, show top 3

### Spacing and Layout Changes
- Activity item padding: 12px
- Activity spacing: 8px
- Card padding: 20px

---

# Table Improvements

## Member List Table

### Current Issue
Tables don't adapt to mobile, dense spacing, no hover states.

### Redesign Goal
Create responsive tables with card view on mobile and clear hierarchy.

### Exact UI Changes

#### Desktop Table
- **Row Height:** 48px
- **Header Background:** Light gray (#f9fafb)
- **Header Text:** 14px semibold, dark gray
- **Body Text:** 14px regular, dark gray
- **Border:** 1px solid light gray between rows
- **Hover Row:** Light blue background (#eff6ff)
- **Border Radius:** 8px
- **Padding:** 12px horizontal, 8px vertical

#### Mobile Card View
- **Each row as card:**
  - Border radius: 8px
  - Padding: 16px
  - Label-value pairs
  - Full-width action button
- **Card spacing:** 12px vertical

### Interaction Improvements
- Row hover: Light blue background
- Clickable rows: Cursor pointer
- Sortable headers: Arrow icon
- Pagination: Clear prev/next buttons

### Responsive Behavior
- Desktop (>768px): Table view
- Mobile (<768px): Card view

### Spacing and Layout Changes
- Table padding: 16px
- Row spacing: 0 (borders separate)
- Card spacing: 12px (mobile)

---

# Form Improvements

## Membership Form

### Current Issue
5-step process, no real-time validation, overwhelming document upload.

### Redesign Goal
Reduce to 3 steps, add real-time validation, simplify document upload.

### Exact UI Changes

#### Step 1: Personal & Contact
- **Fields:** Name, Mobile, Email, District
- **Layout:** 2-column grid (desktop), 1-column (mobile)
- **Validation:** Real-time on blur
- **Error display:** Below field, Tamil + English
- **Success indicator:** Green checkmark icon

#### Step 2: Business Details
- **Fields:** Shop name, Type, Wing, Address, Years
- **Layout:** 2-column grid, address spans 2 columns
- **Wing selector:** Grouped by category with optgroups
- **Validation:** Real-time on blur

#### Step 3: Documents & Review
- **Document Upload:**
  - Show one upload area at a time
  - Progress indicator: "Upload 1 of 4"
  - File preview after upload
  - Clear requirements (5MB max, JPG/PNG/PDF)
- **Review Section:**
  - Collapsible sections for Personal, Business, Documents
  - Edit buttons to go back to steps
  - PIN setup at bottom
- **Submit Button:** Large, prominent, "Pay ₹500 & Submit"

### Interaction Improvements
- Real-time validation with inline errors
- Checkmark icon for valid fields
- Disable "Continue" until all fields valid
- Smooth step transitions (300ms)
- Auto-save draft every 30 seconds

### Responsive Behavior
- Desktop: 2-column grid, sidebar visible
- Mobile: 1-column stack, mobile step bar, no sidebar

### Spacing and Layout Changes
- Field spacing: 16px vertical
- Section spacing: 24px vertical
- Card padding: 24px (desktop), 16px (mobile)

---

## Input Field Component

### Current Issue
Inconsistent heights, no focus states, small on mobile.

### Redesign Goal
Standardize input fields with clear focus states and mobile-friendly sizing.

### Exact UI Changes

#### Standard Input
- **Height:** 48px (mobile), 44px (desktop)
- **Border Radius:** 8px
- **Padding:** 12px vertical, 16px horizontal
- **Border:** 1px solid light gray
- **Focus Border:** 2px solid blue (#3b82f6)
- **Error Border:** 2px solid red (#ef4444)
- **Success Border:** 2px solid green (#10b981)
- **Background:** White
- **Placeholder:** Medium gray (#9ca3af)

#### Label
- **Position:** Above input
- **Size:** 14px semibold
- **Color:** Dark gray (#1f2937)
- **Spacing:** 8px below label

#### Helper Text
- **Position:** Below input
- **Size:** 13px regular
- **Color:** Medium gray (#6b7280)
- **Spacing:** 4px above text

#### Validation States
- **Valid:** Green checkmark in right side
- **Invalid:** Red error message below, red border
- **Error Message:** 13px, red, Tamil + English

### Interaction Improvements
- Focus state with blue border
- Error state with red border + message
- Success state with green checkmark
- Smooth border transition (200ms)

### Responsive Behavior
- Mobile: 48px height (prevents zoom on iOS)
- Desktop: 44px height
- Label always above input (mobile and desktop)

### Spacing and Layout Changes
- Input to next field: 16px vertical
- Label to input: 8px vertical
- Input to helper text: 4px vertical

---

## File Upload Component

### Current Issue
All upload areas shown simultaneously, no progress indication, unclear requirements.

### Redesign Goal
Show one upload at a time with clear progress and requirements.

### Exact UI Changes

#### Upload Area Design
- **Layout:** Single upload area visible at a time
- **Progress Indicator:** "Upload 1 of 4" at top
- **Upload Box:**
  - Dashed border (2px, light gray)
  - Border radius: 12px
  - Padding: 32px
  - Centered content
  - Icon: Cloud upload (48px, blue)
  - Text: "Drag & drop or click to upload"
  - Subtext: "JPG, PNG, PDF up to 5MB"
- **After Upload:**
  - File preview (thumbnail for images)
  - File name
  - File size
  - Delete button (red, icon)
  - Green checkmark

### Interaction Improvements
- Drag-and-drop with visual feedback
- Click to open file picker
- Progress bar during upload
- Success animation after upload
- Delete button to replace file

### Responsive Behavior
- Desktop: 400px width upload area
- Mobile: Full width upload area
- Touch-friendly tap targets (44x44px min)

### Spacing and Layout Changes
- Upload area padding: 32px
- Progress indicator spacing: 16px
- File preview spacing: 16px

---

# Button System Improvements

## Primary Button

### Current Issue
Inconsistent sizes, small touch targets, unclear hierarchy.

### Redesign Goal
Standardize button system with clear hierarchy and mobile-friendly sizing.

### Exact UI Changes

#### Primary Button Design
- **Background:** Deep blue (#1e3a8a)
- **Text:** White, 14px semibold
- **Border Radius:** 8px
- **Padding:** 12px 24px (desktop), 12px 32px (mobile)
- **Height:** 44px (desktop), 48px (mobile)
- **Hover:** Lighter blue (#2563eb)
- **Active:** Darker blue (#1e40af)
- **Shadow:** Subtle (0 2px 4px rgba(0,0,0,0.1))
- **Touch Target:** Minimum 44x44px
- **Disabled:** Gray background (#9ca3af), no interaction

#### Secondary Button
- **Background:** White
- **Text:** Deep blue (#1e3a8a), 14px semibold
- **Border:** 2px solid light gray
- **Hover:** Light blue background (#eff6ff)
- **Other specs:** Same as primary

#### Tertiary Button (Text)
- **Background:** Transparent
- **Text:** Light blue (#3b82f6), 14px medium
- **Border:** None
- **Hover:** Underline
- **Padding:** 8px 16px

### Interaction Improvements
- Hover state with color change
- Active state with darker color
- Disabled state with gray + no cursor
- Smooth transition (200ms)
- Ripple effect on mobile (optional)

### Responsive Behavior
- Mobile: 48px height, full width for primary CTAs
- Desktop: 44px height, auto width
- Minimum touch target: 44x44px

### Spacing and Layout Changes
- Button to next element: 16px horizontal
- Button group: 8px spacing between buttons
- Form button: Full width on mobile

---

# Modal Improvements

## Modal Component

### Current Issue
Inconsistent sizing, no mobile optimization, unclear close action.

### Redesign Goal
Standardize modal with mobile optimization and clear close action.

### Exact UI Changes

#### Modal Design
- **Background:** White
- **Border Radius:** 12px
- **Padding:** 24px
- **Max Width:** 500px (desktop), 90% (mobile)
- **Shadow:** Deep shadow (0 10px 25px rgba(0,0,0,0.15))
- **Overlay:** Dark semi-transparent (rgba(0,0,0,0.5))
- **Close Button:** Top-right, 32x32px, icon only

#### Modal Header
- **Title:** 20px semibold, dark gray
- **Spacing:** 16px to content

#### Modal Footer
- **Buttons:** Right-aligned
- **Spacing:** 16px to content
- **Primary button:** Rightmost
- **Secondary button:** Left of primary

### Interaction Improvements
- Click overlay to close
- ESC key to close
- Smooth open/close animation (300ms)
- Focus trap inside modal

### Responsive Behavior
- Desktop: Centered, max 500px width
- Mobile: Full width, bottom sheet style
- Safe area: 16px bottom padding

### Spacing and Layout Changes
- Modal padding: 24px
- Header to content: 16px
- Content to footer: 24px
- Button spacing: 8px

---

# Empty State Improvements

## Empty State Component

### Current Issue
Generic empty states, no clear CTAs, no Tamil translations.

### Redesign Goal
Create contextual empty states with clear CTAs and bilingual support.

### Exact UI Changes

#### Empty State Design
- **Layout:** Centered content
- **Icon:** 64x64px, light gray
- **Title:** 18px semibold, dark gray
- **Description:** 14px regular, medium gray
- **CTA Button:** Primary blue
- **Spacing:** 16px between elements
- **Tamil:** Title and description in both languages

#### Context-Specific Empty States
- **No Members:** "No members found" + "Search again or add new member"
- **No Activities:** "No recent activities" + "Start exploring the portal"
- **No Notifications:** "No notifications" + "You're all caught up!"
- **No Documents:** "No documents uploaded" + "Upload your documents"

### Interaction Improvements
- CTA button is prominent
- Hover state on CTA
- Smooth animation on load (300ms)

### Responsive Behavior
- Desktop: Centered, 400px max width
- Mobile: Centered, 90% width

### Spacing and Layout Changes
- Icon to title: 16px
- Title to description: 8px
- Description to CTA: 24px

---

# Error State Improvements

## Error State Component

### Current Issue
Technical error messages, no Tamil translations, unclear recovery actions.

### Redesign Goal
Create user-friendly error states with clear recovery actions and bilingual support.

### Exact UI Changes

#### Error State Design
- **Layout:** Centered or inline
- **Icon:** 48x48px, red
- **Title:** 18px semibold, dark gray
- **Description:** 14px regular, medium gray
- **Action Button:** Primary blue or secondary
- **Spacing:** 16px between elements
- **Tamil:** Title and description in both languages

#### Context-Specific Error States
- **Form Error:** "Please check your input" + "Fix the errors marked in red"
- **Network Error:** "Connection failed" + "Check your internet and try again"
- **Upload Error:** "Upload failed" + "Try again or choose a different file"
- **Not Found:** "Page not found" + "Go back to home"

### Interaction Improvements
- Action button is prominent
- Retry button for recoverable errors
- Smooth animation on load (300ms)

### Responsive Behavior
- Desktop: Centered, 400px max width
- Mobile: Centered, 90% width

### Spacing and Layout Changes
- Icon to title: 16px
- Title to description: 8px
- Description to action: 24px

---

# Bilingual Component Improvements

## Language Toggle Component

### Current Issue
Not prominent, unclear current state, inconsistent placement.

### Redesign Goal
Make language toggle prominent with clear current state and consistent placement.

### Exact UI Changes

#### Language Toggle Design
- **Location:** Header, right side (always visible)
- **Size:** 44x44px touch target
- **Icon:** Flag icon (India flag)
- **Text:** Current language ("EN" or "TA")
- **Background:** Light gray on hover
- **Border Radius:** 8px
- **Active State:** Blue background, white text

### Interaction Improvements
- Click to toggle language
- Smooth transition (200ms)
- Visual feedback on hover
- Store preference in localStorage

### Responsive Behavior
- Desktop: Icon + text
- Mobile: Icon only (to save space)

### Spacing and Layout Changes
- Toggle spacing: 16px from other elements
- Icon padding: 8px
- Text padding: 8px

---

## Bilingual Text Component

### Current Issue
Mixed Tamil and English simultaneously, inconsistent formatting.

### Redesign Goal
Display one language at a time based on user preference.

### Exact UI Changes

#### Bilingual Text Design
- **Default:** Show user's selected language only
- **Toggle Option:** Show both languages with separator
- **Formatting:** Consistent font sizes for both languages
- **Tamil Font:** Noto Sans Tamil
- **English Font:** Inter or Roboto
- **Equal Weight:** Both languages have same visual weight

### Interaction Improvements
- Language toggle updates all text instantly
- Smooth transition when switching (200ms)
- No layout shift when switching

### Responsive Behavior
- Mobile: Same font sizes as desktop (readability)
- Desktop: Same font sizes as mobile (consistency)

### Spacing and Layout Changes
- Tamil line height: 1.7 (increased for readability)
- English line height: 1.6
- Consistent spacing for both languages

---

# Responsive Design Tasks

## Mobile-First Breakpoints

### Breakpoint System
- **Mobile:** < 768px (default)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile-Specific Tasks
1. Convert all tables to card view below 768px
2. Increase touch targets to minimum 44x44px
3. Add bottom navigation for primary sections
4. Simplify header to logo + language toggle + menu
5. Stack all multi-column layouts to single column
6. Increase base font size to 15px for readability
7. Add safe area padding for iPhone notch (16px top/bottom)

### Tablet-Specific Tasks
1. Use 2-column grids for forms
2. Show partial horizontal navigation
3. Medium-sized cards (2 per row)
4. Standard touch targets (44x44px)

### Desktop-Specific Tasks
1. Full horizontal navigation
2. Multi-column layouts (2-4 columns)
3. Hover states for all interactive elements
4. Sidebar for multi-step forms
5. Larger cards (3-4 per row)

---

# Mobile Interaction Improvements

## Touch Targets

### Minimum Sizes
- **Buttons:** 44x44px minimum
- **Links:** 44x44px minimum (with padding)
- **Form Inputs:** 48px height minimum
- **Icons:** 44x44px touch area
- **Nav Items:** 48x48px minimum
- **Card Actions:** 44x44px minimum

### Spacing Between Targets
- **Vertical:** Minimum 16px between interactive elements
- **Horizontal:** Minimum 16px between items
- **Padding:** Minimum 16px for tappable areas

---

## Swipe Gestures

### Swipe Navigation
- **Dashboard:** Swipe between tabs (if implemented)
- **Forms:** No swipe (prevents accidental navigation)
- **Cards:** No swipe (prevents accidental actions)

### Pull to Refresh
- **Dashboard:** Pull to refresh data
- **Lists:** Pull to refresh list
- **Forms:** No pull to refresh

---

## Keyboard Support

### Input Type Hints
- **Mobile Number:** `inputMode="numeric"` + `type="tel"`
- **Email:** `type="email"` + `inputMode="email"`
- **Numbers:** `inputMode="numeric"`
- **Search:** `inputMode="search"`

### Auto-Capitalize
- **Name fields:** `autoCapitalize="words"`
- **Email:** `autoCapitalize="none"`
- **Password:** `autoCapitalize="none"`

### Auto-Correct
- **Name fields:** `autoCorrect="off"`
- **Email:** `autoCorrect="off"`
- **Unique IDs:** `autoCorrect="off"`

---

# Frontend Handoff Notes

## Design Tokens

### Colors
```css
--primary: #1e3a8a;
--primary-light: #3b82f6;
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--neutral-dark: #1f2937;
--neutral-medium: #6b7280;
--neutral-light: #e5e7eb;
--neutral-bg: #ffffff;
--neutral-surface: #f9fafb;
```

### Spacing
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Typography
```css
--font-en: 'Inter', sans-serif;
--font-ta: 'Noto Sans Tamil', sans-serif;
--text-h1: 32px;
--text-h2: 24px;
--text-h3: 18px;
--text-body: 16px;
--text-small: 14px;
--text-caption: 12px;
```

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;
```

---

## Component Props Reference

### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Input Component
```typescript
interface InputProps {
  label?: string;
  labelTa?: string;
  placeholder?: string;
  placeholderTa?: string;
  helperText?: string;
  helperTextTa?: string;
  error?: string;
  errorTa?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'number';
  disabled?: boolean;
}
```

### Card Component
```typescript
interface CardProps {
  title?: string;
  titleTa?: string;
  description?: string;
  descriptionTa?: string;
  children: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}
```

---

## Accessibility Requirements

### ARIA Labels
- All interactive elements must have `aria-label` or `aria-labelledby`
- Icons must have `aria-label` describing their function
- Language toggle must indicate current language

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Focus states must be visible
- ESC key closes modals

### Screen Reader Support
- Tamil content must have `lang="ta"` attribute
- English content must have `lang="en"` attribute
- Images must have `alt` text in both languages
- Live regions for dynamic content updates

---

## Performance Considerations

### Image Optimization
- Use WebP format where possible
- Lazy load images below fold
- Responsive images with srcset
- Compress images to max 500KB

### Font Loading
- Use font-display: swap for web fonts
- Preload critical fonts
- Subset fonts for Tamil (reduce size)

### Code Splitting
- Lazy load route components
- Split vendor chunks
- Tree-shake unused code

---

# Component Priority Order

## Phase 1 (Critical - Week 1)
1. **Input Field Component** - Foundation for all forms
2. **Button Component** - Foundation for all interactions
3. **Language Toggle** - Critical for bilingual support
4. **Bottom Navigation (Mobile)** - Critical for mobile UX

## Phase 2 (High - Week 2)
5. **Membership Form** - Critical user journey
6. **Header Component** - Navigation foundation
7. **Dashboard Stats Card** - Key dashboard component
8. **Table Component** - Data display foundation

## Phase 3 (Medium - Week 3)
9. **Modal Component** - Overlay interactions
10. **Empty State Component** - Edge case handling
11. **Error State Component** - Error handling
12. **Breadcrumb Component** - Navigation context

## Phase 4 (Low - Week 4)
13. **File Upload Component** - Specific to membership
14. **Bilingual Text Component** - Text display
15. **Activity Card Component** - Dashboard feature
16. **Notification Component** - Dashboard feature

---

**Component Plan Completed:** May 29, 2026
**Architect:** Senior Frontend Architect + Product Designer
**Next Step:** Proceed to Stage 5 - Final UX Review
