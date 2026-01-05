# Responsive Design Implementation Guide

## Overview

Website Gajah Puteh Art Therapy telah dioptimasi untuk tampilan responsive di berbagai ukuran layar, dari mobile (320px) hingga desktop (1920px+).

---

## Breakpoints

### Tailwind CSS Default Breakpoints

```css
/* Mobile First Approach */
sm:  640px   /* Small devices (phones landscape, tablets portrait) */
md:  768px   /* Medium devices (tablets) */
lg:  1024px  /* Large devices (desktops) */
xl:  1280px  /* Extra large devices (large desktops) */
2xl: 1536px  /* 2X Extra large devices (larger desktops) */
```

### Usage Pattern

```tsx
// Mobile: base styles (no prefix)
// Tablet: sm: prefix
// Desktop: lg: prefix
<div className="p-4 sm:p-6 lg:p-8">
  {/* Padding scales up on larger screens */}
</div>
```

---

## Responsive Patterns Implemented

### 1. **Layout Containers**

```tsx
// Adaptive padding
className = "p-4 sm:p-6 lg:p-8";

// Mobile: 16px (p-4)
// Tablet: 24px (sm:p-6)
// Desktop: 32px (lg:p-8)
```

### 2. **Grid Systems**

```tsx
// Single column on mobile, multiple on larger screens
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";

// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
```

### 3. **Flexbox Layouts**

```tsx
// Stack on mobile, row on desktop
className = "flex flex-col sm:flex-row items-start gap-3";

// Mobile: Vertical stack
// Tablet+: Horizontal row
```

### 4. **Typography**

```tsx
// Responsive text sizes
className="text-sm sm:text-base lg:text-lg"
className="text-xl sm:text-2xl lg:text-3xl"

// Headings scale proportionally
<Heading3 className="text-xl sm:text-2xl lg:text-3xl">
```

### 5. **Spacing**

```tsx
// Responsive margins and gaps
className = "mb-4 sm:mb-6 lg:mb-8";
className = "gap-2 sm:gap-3 lg:gap-4";
className = "space-y-4 sm:space-y-6";
```

### 6. **Buttons & Actions**

```tsx
// Full width on mobile, auto on desktop
className = "w-full sm:w-auto px-4 py-2";

// Mobile: Button spans full width
// Tablet+: Button shrinks to content
```

### 7. **Visibility Controls**

```tsx
// Hide on mobile, show on desktop
className = "hidden sm:block";
className = "hidden sm:inline";

// Show on mobile, hide on desktop
className = "block sm:hidden";
className = "sm:hidden";
```

---

## Page-by-Page Implementation

### ✅ **Assessment List Page** (`/counselor/therapy/[id]/assessments/page.tsx`)

**Status**: Completed

#### Changes Made:

1. **Container Padding**

   ```tsx
   - className="p-6 lg:p-8"
   + className="p-4 sm:p-6 lg:p-8"
   ```

2. **Header**

   ```tsx
   - <Heading3 className="text-neutral-02 mb-2">
   + <Heading3 className="text-neutral-02 mb-2 text-xl sm:text-2xl lg:text-3xl">

   // Completion text stacks on mobile
   + <span className="block sm:inline text-sm mt-1 sm:mt-0">
   ```

3. **Assessment Cards**

   ```tsx
   // Header layout
   - className="flex items-start justify-between mb-4"
   + className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3"

   // Buttons full width on mobile
   + className="w-full sm:w-auto shrink-0 px-4 py-2..."
   ```

4. **Preview Content**

   ```tsx
   // Labels and values stack on mobile
   - className="flex items-start gap-3 text-sm"
   + className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3 text-sm"

   - className="min-w-[140px]"
   + className="min-w-full sm:min-w-[140px]"
   ```

5. **Padding Adjustments**
   ```tsx
   // Remove left padding on mobile
   - className="pl-8"
   + className="pl-0 sm:pl-8"
   ```

---

### ✅ **Therapy Detail Page** (`/counselor/therapy/[id]/page.tsx`)

**Status**: Completed

#### Changes Made:

1. **Container & Header**

   ```tsx
   - className="p-6 lg:p-8"
   + className="p-4 sm:p-6 lg:p-8"

   - <Heading3 className="text-neutral-02">
   + <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
   ```

2. **Assessment Progress Grid**

   ```tsx
   // 2 columns on mobile, 4 on desktop
   - className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
   + className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"

   // Responsive card padding
   - className="p-4 rounded-lg"
   + className="p-3 sm:p-4 rounded-lg"
   ```

3. **Session Overview**

   ```tsx
   // Stack on mobile, side-by-side on tablet
   - className="grid grid-cols-1 md:grid-cols-2 gap-6"
   + className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
   ```

4. **Assessment Details Cards**

   ```tsx
   // Flexible header layout
   - className="flex items-center justify-between mb-4"
   + className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3"

   // Full width buttons on mobile
   + className="w-full sm:w-auto text-center"
   ```

5. **Quick Actions Sidebar**

   ```tsx
   // Responsive text sizes
   - className="text-sm"
   + className="text-xs sm:text-sm"

   // View only mode icons
   - className="w-12 h-12"
   + className="w-10 h-10 sm:w-12 sm:h-12"
   ```

6. **Data Grids**
   ```tsx
   // Stack on mobile, grid on tablet+
   - className="grid grid-cols-2 gap-4"
   + className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
   ```

---

### ✅ **Counselor Dashboard** (`/counselor/dashboard/page.tsx`)

**Status**: Completed

#### Changes Made:

1. **Container & Header**

   ```tsx
   - className="p-6 lg:p-8"
   + className="p-4 sm:p-6 lg:p-8"

   - <Heading3 className="text-neutral-02">
   + <Heading3 className="text-neutral-02 text-xl sm:text-2xl lg:text-3xl">
   ```

2. **Stats Cards Grid**

   ```tsx
   // 1 column mobile, 2 tablet, 3 desktop
   - className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
   + className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
   ```

3. **User Guide Section**

   ```tsx
   // Gradient background responsive
   - className="bg-jade-light/20 to-topaz-light ... p-6 lg:p-8"
   + className="bg-gradient-to-r from-jade-light to-topaz-light ... p-4 sm:p-6 lg:p-8"

   // Icon container
   - className="w-12 h-12"
   + className="w-10 h-10 sm:w-12 sm:h-12"
   ```

4. **Step Cards**

   ```tsx
   // Responsive padding and gaps
   - className="bg-white rounded-lg p-5 ... gap-4"
   + className="bg-white rounded-lg p-4 sm:p-5 ... gap-3 sm:gap-4"

   // Number badges
   - className="w-8 h-8 ... text-sm"
   + className="w-7 h-7 sm:w-8 sm:h-8 ... text-xs sm:text-sm"
   ```

5. **Recent Activities**

   ```tsx
   // Flexible header
   - className="flex items-center justify-between mb-6"
   + className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3"

   // Activity cards
   - className="flex items-center gap-4"
   + className="flex items-start sm:items-center gap-3 sm:gap-4"

   // Responsive badges
   - className="px-3 py-1 text-xs"
   + className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs"
   ```

---

## Common Responsive Patterns

### Pattern 1: Adaptive Container

```tsx
<div className="p-4 sm:p-6 lg:p-8">{/* Content */}</div>
```

**Effect**: Padding increases as screen size grows

### Pattern 2: Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Cards */}
</div>
```

**Effect**:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large Desktop: 4 columns

### Pattern 3: Stack to Row

```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Effect**: Vertical on mobile, horizontal on tablet+

### Pattern 4: Conditional Display

```tsx
{
  /* Desktop view */
}
<div className="hidden lg:block">
  <DesktopComponent />
</div>;

{
  /* Mobile view */
}
<div className="lg:hidden">
  <MobileComponent />
</div>;
```

**Effect**: Different components for different screen sizes

### Pattern 5: Responsive Text

```tsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
  Title
</h1>
<p className="text-sm sm:text-base">
  Body text
</p>
```

**Effect**: Text scales with screen size

### Pattern 6: Full Width Buttons on Mobile

```tsx
<button className="w-full sm:w-auto px-4 py-2">Action</button>
```

**Effect**: Button spans full width on mobile, auto-width on tablet+

### Pattern 7: Responsive Spacing

```tsx
<div className="space-y-4 sm:space-y-6 lg:space-y-8">{/* Items */}</div>
```

**Effect**: Gap between items increases on larger screens

---

## Implementation Checklist

### Global Elements

- [x] **Navigation sidebar** ✅ (collapsible on mobile, overlay with backdrop)
- [x] **Top bar** ✅ (hamburger menu on mobile, responsive logo/date)
- [x] **Content layout** ✅ (responsive padding, no sidebar offset on mobile)
- [ ] Footer (stacked columns on mobile)

### Dashboard Pages

- [x] **Counselor dashboard** ✅
  - [x] Stats cards grid (1→2→3 columns)
  - [x] User guide section (gradient, responsive steps)
  - [x] Recent activity list (responsive cards)
- [x] **Parent dashboard** ✅
  - [x] Stats cards grid
  - [x] Quick actions
  - [x] User guide section (responsive steps)
  - [x] Recent therapy sessions

### Therapy Pages

- [x] **Therapy list** ✅
  - [x] Table → Cards on mobile
  - [x] Responsive header with new session button
  - [x] Hidden columns on smaller screens
- [x] **Therapy detail** ✅
  - [x] 2-column layout → single column on mobile
  - [x] Assessment cards responsive (2 cols mobile, 4 desktop)
  - [x] Quick actions sidebar responsive
  - [x] All assessment details sections
- [x] **All assessments page** ✅
  - [x] Responsive header with completion stats
  - [x] Responsive search and filter
  - [x] Assessment cards grid (1→2→3 columns)
  - [x] Responsive pagination

### Children Pages

- [x] **Children management** ✅
  - [x] Expandable parent cards
  - [x] Responsive child list items
  - [x] Mobile-friendly info display

### Assessment Pages

- [ ] Screening (DASS)
  - [ ] Create form
  - [ ] Detail view
  - [ ] Edit form
- [ ] Pretest (SDQ)
  - [ ] Create form
  - [ ] Detail view
  - [ ] Edit form
- [ ] Observation
  - [ ] Create form
  - [ ] Detail view
  - [ ] Edit form
- [ ] Posttest (SDQ)
  - [ ] Create form
  - [ ] Detail view
  - [ ] Edit form

### Profile Pages

- [x] **Profile page** ✅
  - [x] Responsive form fields
  - [x] Mobile-friendly buttons
- [ ] Child profile list
- [ ] Child profile detail

### Form Pages

- [ ] Login/Register forms
- [ ] Settings forms
- [ ] Search filters

---

## Mobile-First Best Practices

### 1. **Touch Targets**

```tsx
// Minimum 44x44px for touch targets
className = "min-h-[44px] min-w-[44px]";

// Buttons with adequate padding
className = "px-4 py-3 sm:px-6 sm:py-2";
```

### 2. **Readable Text**

```tsx
// Base text size 16px (text-base)
// Avoid smaller than 14px (text-sm) for body text
className = "text-base";

// Adequate line height
className = "leading-relaxed";
```

### 3. **Scrollable Containers**

```tsx
// Horizontal scroll for tables on mobile
<div className="overflow-x-auto">
  <table className="min-w-[600px]">{/* Table content */}</table>
</div>
```

### 4. **Modal Behavior**

```tsx
// Full screen modals on mobile
className = "fixed inset-0 sm:inset-4 lg:inset-auto lg:max-w-2xl";
```

### 5. **Image Optimization**

```tsx
// Responsive images
<img
  className="w-full h-auto"
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w, image-1024w.jpg 1024w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

---

## Testing Requirements

### Screen Sizes to Test

- [ ] **Mobile**: 320px - 479px (iPhone SE, older phones)
- [ ] **Mobile Large**: 480px - 639px (most phones)
- [ ] **Tablet Portrait**: 640px - 767px
- [ ] **Tablet Landscape**: 768px - 1023px
- [ ] **Desktop**: 1024px - 1279px
- [ ] **Desktop Large**: 1280px - 1535px
- [ ] **Desktop XL**: 1536px+

### Devices to Test

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px)

### Browsers to Test

- [ ] Chrome/Edge (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Firefox (Desktop & Mobile)

### Test Scenarios

- [ ] Navigation works on all sizes
- [ ] Forms are usable on touch devices
- [ ] Tables scroll horizontally on mobile
- [ ] Images don't overflow
- [ ] Text remains readable
- [ ] Buttons are tappable (min 44x44px)
- [ ] Modals/dialogs work on all sizes
- [ ] Cards stack properly on mobile

---

## Common Issues & Solutions

### Issue 1: Text Overflow

```tsx
// Problem
<p className="text-sm">Very long text that overflows...</p>

// Solution
<p className="text-sm break-words overflow-wrap-anywhere">
  Very long text that overflows...
</p>
```

### Issue 2: Fixed Width Elements

```tsx
// Problem
<div className="w-[400px]">Content</div>

// Solution
<div className="w-full sm:w-[400px]">Content</div>
```

### Issue 3: Horizontal Scroll

```tsx
// Problem
<div className="flex gap-4">
  {/* Many items */}
</div>

// Solution
<div className="overflow-x-auto">
  <div className="flex gap-4 min-w-max">
    {/* Many items */}
  </div>
</div>
```

### Issue 4: Hidden Content

```tsx
// Problem
Content hidden behind fixed navbar on mobile

// Solution
<main className="pt-16 sm:pt-20">
  {/* Offset for fixed navbar */}
</main>
```

### Issue 5: Small Touch Targets

```tsx
// Problem
<button className="p-1 text-xs">×</button>

// Solution
<button className="p-3 min-h-[44px] min-w-[44px] text-sm">×</button>
```

---

## Performance Considerations

### 1. **Lazy Loading**

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

### 2. **Conditional Rendering**

```tsx
const isMobile = useMediaQuery("(max-width: 640px)");

return <>{isMobile ? <MobileView /> : <DesktopView />}</>;
```

### 3. **Image Optimization**

```tsx
import Image from "next/image";

<Image
  src="/image.jpg"
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, 50vw"
  priority={false}
/>;
```

---

## Accessibility (a11y)

### Mobile Accessibility

```tsx
// Touch target size
className="min-h-[44px] min-w-[44px]"

// Focus indicators
className="focus:outline-none focus:ring-2 focus:ring-jade"

// ARIA labels
<button aria-label="Close menu">×</button>

// Semantic HTML
<nav aria-label="Main navigation">
<main aria-label="Main content">
```

---

## Next Steps

### Priority 1 (High Impact)

1. [ ] Make therapy detail page fully responsive
2. [ ] Implement responsive sidebar navigation
3. [ ] Make dashboard pages responsive
4. [ ] Responsive forms (create/edit assessments)

### Priority 2 (Medium Impact)

5. [ ] Profile pages responsive
6. [ ] Table views → Card views on mobile
7. [ ] Modal/dialog responsiveness
8. [ ] Search and filter responsiveness

### Priority 3 (Polish)

9. [ ] Animation adjustments for mobile
10. [ ] Touch gesture support
11. [ ] Orientation change handling
12. [ ] Print stylesheet for reports

---

## Documentation

### For Developers

- Always start with mobile-first approach
- Test on actual devices, not just browser dev tools
- Use Tailwind's responsive modifiers consistently
- Document any custom breakpoints

### For Designers

- Design mobile views first
- Consider touch targets (minimum 44x44px)
- Test prototypes on real devices
- Provide designs for at least 3 breakpoints: mobile, tablet, desktop

---

## Resources

### Tools

- **Chrome DevTools**: Device mode for responsive testing
- **Firefox DevTools**: Responsive design mode
- **Responsively App**: Test multiple devices simultaneously
- **BrowserStack**: Real device testing

### Tailwind CSS Documentation

- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Breakpoints](https://tailwindcss.com/docs/screens)
- [Container Queries](https://tailwindcss.com/docs/hover-focus-and-other-states#container-queries)

---

**Last Updated**: January 5, 2026
**Status**: In Progress (Assessment List Page Completed)
**Next Target**: Therapy Detail Page
