# Portal Artistas - Design System

## 🎨 Design Philosophy

Modern, accessible, and consistent design with **glass morphism**, **gradient accents**, and **smooth animations**. Built for artistic excellence with a mobile-first approach.

## 🎯 Core Principles

- **Mobile-First**: Start with mobile design, enhance for larger screens
- **Glass Morphism**: Semi-transparent backgrounds with backdrop blur
- **Gradient Accents**: Blue to indigo gradients for primary actions
- **Smooth Animations**: 200-300ms transitions with hover effects
- **Touch-Friendly**: 44px minimum touch targets for mobile
- **Accessibility**: High contrast and clear visual hierarchy

---

## 🎨 Color Palette

### Primary Colors

```css
/* Blue Gradient (Primary Brand) */
bg-gradient-to-r from-blue-600 to-indigo-600
bg-gradient-to-r from-blue-500 to-indigo-500
bg-gradient-to-r from-blue-700 to-indigo-700

/* Text Gradients */
bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent
```

### Semantic Colors

```css
/* Success, Warning, Error, Info */
text-green-600, bg-green-50, border-green-200
text-yellow-600, bg-yellow-50, border-yellow-200
text-red-600, bg-red-50, border-red-200
text-blue-600, bg-blue-50, border-blue-200
```

### Neutral Colors

```css
/* Backgrounds & Text */
bg-white/80 (glass morphism)
bg-gray-50, bg-gray-100, bg-gray-200
text-gray-900 (primary), text-gray-700 (secondary), text-gray-600 (tertiary)
```

---

## 📝 Typography

### Font Weights (Montserrat)

```css
.montserrat-thin {
	font-weight: 100;
}
.montserrat-light {
	font-weight: 300;
}
.montserrat-regular {
	font-weight: 400;
}
.montserrat-medium {
	font-weight: 500;
}
.montserrat-semibold {
	font-weight: 600;
}
.montserrat-bold {
	font-weight: 700;
}
.montserrat-black {
	font-weight: 900;
}
```

### Text Hierarchy (Mobile-First)

```css
/* Headings - Mobile First */
text-2xl font-bold montserrat-bold (H1 - Mobile)
md:text-3xl lg:text-4xl (H1 - Tablet/Desktop)

text-xl font-bold montserrat-bold (H2 - Mobile)
md:text-2xl lg:text-3xl (H2 - Tablet/Desktop)

text-lg font-bold montserrat-bold (H3 - Mobile)
md:text-xl lg:text-2xl (H3 - Tablet/Desktop)

text-base font-semibold montserrat-semibold (H4 - Mobile)
md:text-lg lg:text-xl (H4 - Tablet/Desktop)

/* Body Text - Mobile First */
text-sm font-medium montserrat-medium (Small - Mobile)
text-base font-medium montserrat-medium (Standard - Mobile)
md:text-base lg:text-lg (Large - Tablet/Desktop)
```

---

## 👤 Profile Page Hierarchy Standard

### Page Structure & Layout (Mobile-First)

```css
/* Main Container - Mobile First */
min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50
px-4 py-6 (Mobile: 320px+)
md:px-6 md:py-8 (Tablet: 768px+)
lg:px-8 lg:py-12 (Desktop: 1024px+)

/* Content Wrapper - Mobile First */
mx-auto max-w-full (Mobile: full width)
md:max-w-4xl (Tablet: focused content)
lg:max-w-7xl (Desktop: full-width content)
```

### Header Section (Mobile-First)

```css
/* Page Title - Mobile First */
text-xl font-bold montserrat-bold (Mobile: 320px+)
md:text-2xl lg:text-3xl (Tablet/Desktop: 768px+)
bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent

/* Page Subtitle - Mobile First */
text-xs font-medium text-gray-600 (Mobile: 320px+)
md:text-sm lg:text-base (Tablet/Desktop: 768px+)

/* Back Button - Mobile First */
inline-flex items-center px-3 py-2 text-xs font-medium text-blue-600 (Mobile: 320px+)
md:px-4 md:py-2 md:text-sm (Tablet: 768px+)
hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200
min-h-[44px] min-w-[44px] (Touch-friendly)
```

### Section Headers (Mobile-First)

```css
/* Primary Section Title - Mobile First */
text-lg font-semibold montserrat-semibold text-gray-900 (Mobile: 320px+)
md:text-xl lg:text-2xl (Tablet/Desktop: 768px+)

/* Secondary Section Title - Mobile First */
text-base font-semibold montserrat-semibold text-gray-900 (Mobile: 320px+)
md:text-lg lg:text-xl (Tablet/Desktop: 768px+)

/* Section Subtitle - Mobile First */
text-xs font-medium text-gray-600 (Mobile: 320px+)
md:text-sm lg:text-base (Tablet/Desktop: 768px+)
```

### Card Components (Mobile-First)

```css
/* Main Card - Mobile First */
bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 (Mobile: 320px+)
md:rounded-2xl (Tablet: 768px+)
p-4 (Mobile: 320px+)
md:p-6 lg:p-8 (Tablet/Desktop: 768px+)
transition-all duration-300 hover:shadow-2xl

/* Card Header - Mobile First */
mb-4 flex items-center justify-between (Mobile: 320px+)
md:mb-6 (Tablet: 768px+)

/* Card Title - Mobile First */
text-base font-semibold montserrat-semibold text-gray-900 (Mobile: 320px+)
md:text-lg lg:text-xl (Tablet/Desktop: 768px+)
```

### Information Display

```css
/* Field Labels */
text-sm font-medium text-gray-700 (primary labels)
text-sm font-medium text-gray-500 (secondary labels)

/* Field Values */
text-gray-900 (primary values)
text-gray-600 (secondary values)

/* Status Badges */
inline-flex rounded-full px-2 py-1 text-xs font-semibold
bg-green-100 text-green-800 (success)
bg-red-100 text-red-800 (error)
bg-yellow-100 text-yellow-800 (warning)
bg-blue-100 text-blue-800 (info)
```

### Action Buttons (Mobile-First)

```css
/* Primary Action - Mobile First */
px-4 py-3 text-sm font-semibold rounded-lg (Mobile: 320px+)
md:px-6 md:py-3 md:text-base (Tablet: 768px+)
bg-gradient-to-r from-blue-600 to-indigo-600 text-white
hover:from-blue-700 hover:to-indigo-700
transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
min-h-[44px] min-w-[44px] (Touch-friendly)

/* Secondary Action - Mobile First */
px-4 py-3 text-sm font-medium rounded-lg (Mobile: 320px+)
md:px-6 md:py-3 md:text-base (Tablet: 768px+)
bg-gray-100 hover:bg-gray-200 text-gray-700
transition-all duration-200 hover:shadow-md
min-h-[44px] min-w-[44px] (Touch-friendly)

/* Danger Action - Mobile First */
px-4 py-3 text-sm font-semibold rounded-lg (Mobile: 320px+)
md:px-6 md:py-3 md:text-base (Tablet: 768px+)
bg-gradient-to-r from-red-600 to-red-700 text-white
hover:from-red-700 hover:to-red-800
transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
min-h-[44px] min-w-[44px] (Touch-friendly)
```

### Form Elements (Mobile-First)

```css
/* Input Fields - Mobile First */
w-full bg-white border border-gray-200 rounded-lg px-3 py-3 text-base (Mobile: 320px+)
md:px-4 md:py-3 (Tablet: 768px+)
focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200
min-h-[44px] (Touch-friendly)

/* Labels - Mobile First */
text-xs font-medium text-gray-700 mb-1 (Mobile: 320px+)
md:text-sm md:mb-2 (Tablet: 768px+)

/* Error States - Mobile First */
border-red-300 focus:ring-red-500 focus:border-red-500 text-red-600
text-xs (Mobile: 320px+)
md:text-sm (Tablet: 768px+)
```

### Loading States

```css
/* Loading Spinner */
mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600

/* Loading Text */
text-lg font-medium text-gray-600

/* Loading Container */
py-12 text-center
```

### Empty States

```css
/* Empty State Container */
rounded-xl border border-gray-200 bg-gray-50 p-8 text-center

/* Empty State Icon */
text-6xl mb-4

/* Empty State Title */
text-lg font-medium text-gray-900 mb-2

/* Empty State Description */
text-gray-600 mb-4
```

### Grid Layouts (Mobile-First)

```css
/* Information Grid - Mobile First */
grid grid-cols-1 gap-4 (Mobile: 320px+)
md:grid-cols-2 md:gap-6 (Tablet: 768px+)
lg:gap-8 (Desktop: 1024px+)

/* Card Grid - Mobile First */
grid grid-cols-1 gap-4 (Mobile: 320px+)
md:grid-cols-2 md:gap-6 (Tablet: 768px+)
lg:grid-cols-3 lg:gap-8 (Desktop: 1024px+)

/* Stats Grid - Mobile First */
grid grid-cols-2 gap-3 (Mobile: 320px+)
md:grid-cols-3 md:gap-6 (Tablet: 768px+)
lg:gap-8 (Desktop: 1024px+)
```

### Spacing System (Mobile-First)

```css
/* Section Spacing - Mobile First */
space-y-4 (Mobile: 320px+)
md:space-y-6 lg:space-y-8 (Tablet/Desktop: 768px+)

/* Header Spacing - Mobile First */
mb-4 (Mobile: 320px+)
md:mb-6 lg:mb-8 (Tablet/Desktop: 768px+)

/* Card Spacing - Mobile First */
p-4 (Mobile: 320px+)
md:p-6 lg:p-8 (Tablet/Desktop: 768px+)

/* Card Header Margin - Mobile First */
mb-3 (Mobile: 320px+)
md:mb-4 lg:mb-6 (Tablet/Desktop: 768px+)

/* Content Spacing - Mobile First */
space-y-3 (Mobile: 320px+)
md:space-y-4 lg:space-y-6 (Tablet/Desktop: 768px+)

/* Form Spacing - Mobile First */
space-y-4 (Mobile: 320px+)
md:space-y-6 (Tablet: 768px+)
gap-3 (Mobile: 320px+)
md:gap-4 lg:gap-6 (Tablet/Desktop: 768px+)
```

### Responsive Breakpoints (Mobile-First)

```css
/* Mobile First - Base styles for 320px+ */
text-sm, p-4, space-y-4, gap-4 (Mobile: 320px+)

/* Tablet - Enhanced design at 768px+ */
md:text-base, md:p-6, md:space-y-6, md:gap-6 (Tablet: 768px+)

/* Desktop - Complete view at 1024px+ */
lg:text-lg, lg:p-8, lg:space-y-8, lg:gap-8 (Desktop: 1024px+)

/* Large Desktop - Spacious layout at 1280px+ */
xl:text-xl, xl:p-12, xl:space-y-12, xl:gap-12 (Large Desktop: 1280px+)

/* Ultra-wide - Maximum spacing at 1440px+ */
2xl:text-2xl, 2xl:p-16, 2xl:space-y-16, 2xl:gap-16 (Ultra-wide: 1440px+)
```

---

## 📐 Spacing System

```css
/* Standard Scale */
p-2, m-2 (8px) - Minimal
p-4, m-4 (16px) - Standard
p-6, m-6 (24px) - Medium
p-8, m-8 (32px) - Large
p-12, m-12 (48px) - Extra large
p-16, m-16 (64px) - Section

/* Component Spacing */
space-x-4, space-y-4 (16px) - Standard
space-x-6, space-y-6 (24px) - Comfortable
space-x-8, space-y-8 (32px) - Loose
```

---

## 🧩 Component Patterns

### Cards

```css
/* Standard Card */
bg-white rounded-2xl shadow-lg hover:shadow-2xl
transition-all duration-300 transform hover:-translate-y-2
border border-gray-100 p-8

/* Glass Card */
bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg
border border-gray-200/50 p-8

/* Interactive Card */
group cursor-pointer
hover:shadow-2xl hover:-translate-y-2
transition-all duration-300
```

### Buttons

```css
/* Primary Button */
bg-gradient-to-r from-blue-600 to-indigo-600
hover:from-blue-700 hover:to-indigo-700
text-white font-semibold rounded-lg
px-6 py-3 transition-all duration-200
hover:shadow-lg transform hover:-translate-y-0.5

/* Secondary Button */
bg-gray-100 hover:bg-gray-200
text-gray-700 font-medium rounded-lg
px-4 py-2 transition-all duration-200
hover:shadow-md

/* Icon Button */
w-12 h-12 rounded-full flex items-center justify-center
bg-gradient-to-r from-blue-500 to-indigo-600
hover:scale-110 transition-transform duration-300
```

### Navigation

```css
/* Active State */
text-blue-600 bg-blue-50 border border-blue-200
rounded-lg px-4 py-2

/* Hover State */
text-gray-700 hover:text-blue-600 hover:bg-blue-50
rounded-lg px-4 py-2 transition-all duration-200
```

### Form Elements

```css
/* Input Fields */
bg-white border border-gray-200 rounded-lg
px-4 py-3 focus:ring-2 focus:ring-blue-500
focus:border-blue-500 transition-all duration-200

/* Labels */
text-sm font-medium text-gray-700 mb-2

/* Error States */
border-red-300 focus:ring-red-500 focus:border-red-500
text-red-600
```

---

## 🎭 Animation Guidelines

### Transitions

```css
/* Durations */
transition-all duration-150 (fast)
transition-all duration-200 (standard)
transition-all duration-300 (smooth)
transition-all duration-500 (slow)

/* Effects */
hover:scale-105 (5% scale)
hover:scale-110 (10% scale)
hover:-translate-y-1 (subtle lift)
hover:-translate-y-2 (medium lift)
hover:shadow-lg (standard shadow)
hover:shadow-2xl (extra large shadow)
```

### Loading States

```css
/* Skeleton */
animate-pulse bg-gray-200 rounded

/* Spinner */
animate-spin w-6 h-6 border-2 border-blue-600
border-t-transparent rounded-full
```

---

## 📱 Mobile-First Responsive Design

### Breakpoint Strategy (Updated)

```css
/* Mobile First - Base styles for 320px+ */
text-sm, p-4, space-y-4, gap-4 (Mobile: 320px+)

/* Tablet - Enhanced design at 768px+ */
md:text-base, md:p-6, md:space-y-6, md:gap-6 (Tablet: 768px+)

/* Desktop - Complete view at 1024px+ */
lg:text-lg, lg:p-8, lg:space-y-8, lg:gap-8 (Desktop: 1024px+)

/* Large Desktop - Spacious layout at 1280px+ */
xl:text-xl, xl:p-12, xl:space-y-12, xl:gap-12 (Large Desktop: 1280px+)

/* Ultra-wide - Maximum spacing at 1440px+ */
2xl:text-2xl, 2xl:p-16, 2xl:space-y-16, 2xl:gap-16 (Ultra-wide: 1440px+)
```

### Mobile Patterns (Updated)

```css
/* Touch-Friendly Elements - Mobile First */
min-h-[44px] min-w-[44px] (minimum touch target for all devices)
px-3 py-2 text-sm (mobile buttons: 320px+)
md:px-4 md:py-3 md:text-base (tablet buttons: 768px+)
lg:px-6 lg:py-3 lg:text-base (desktop buttons: 1024px+)

/* Mobile Navigation - Mobile First */
md:hidden (mobile menu button - hidden on tablet+)
fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl
transform translate-x-full transition-transform duration-300

/* Mobile Typography - Mobile First */
text-xs (mobile base: 320px+)
md:text-sm (tablet base: 768px+)
lg:text-base (desktop base: 1024px+)

/* Mobile Headings - Mobile First */
text-xl font-bold (mobile H1: 320px+)
md:text-2xl (tablet H1: 768px+)
lg:text-3xl (desktop H1: 1024px+)
```

### Responsive Grids (Updated)

```css
/* Card Grids - Mobile First */
grid grid-cols-1 gap-3 (mobile: 320px+)
md:grid-cols-2 md:gap-4 (tablet: 768px+)
lg:grid-cols-3 lg:gap-6 (desktop: 1024px+)
xl:grid-cols-4 xl:gap-8 (large desktop: 1280px+)
2xl:grid-cols-5 2xl:gap-8 (ultra-wide: 1440px+)

/* Layout Containers - Mobile First */
max-w-full px-4 mx-auto (mobile: 320px+)
md:max-w-2xl md:px-6 (tablet: 768px+)
lg:max-w-4xl lg:px-8 (desktop: 1024px+)
xl:max-w-7xl xl:px-12 (large desktop: 1280px+)
2xl:max-w-[1400px] 2xl:px-16 (ultra-wide: 1440px+)
```

### Mobile Navigation & Overlays

```css
/* Glass Morphism Backdrop */
.bg-black/20 backdrop-blur-sm (modern backdrop)
.bg-black/30 backdrop-blur-md (enhanced backdrop)

/* Smooth Slide Animations */
transform transition-transform duration-300 ease-in-out
translate-x-0 (slide in)
translate-x-full (slide out)

/* Z-Index Hierarchy */
.navbar-base {
	z-index: 50;
}
.mobile-overlay {
	z-index: 40;
}
.mobile-menu-panel {
	z-index: 50;
}
.modal-backdrop {
	z-index: 30;
}
.modal-content {
	z-index: 40;
}
```

---

## 🎨 Layout Patterns

### Page Structure (Mobile-First)

```css
/* Main Container - Mobile First */
min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50

/* Content Wrapper - Mobile First */
mx-auto max-w-full px-4 py-8 (Mobile: 320px+)
md:max-w-2xl md:px-6 md:py-12 (Tablet: 768px+)
lg:max-w-4xl lg:px-8 lg:py-16 (Desktop: 1024px+)
xl:max-w-7xl xl:px-12 xl:py-20 (Large Desktop: 1280px+)

/* Section Spacing - Mobile First */
py-8 (Mobile: 320px+)
md:py-12 lg:py-16 (Tablet/Desktop: 768px+)
xl:py-20 2xl:py-24 (Large Desktop: 1280px+)
```

### Hero Sections (Mobile-First)

```css
/* Hero Container - Mobile First */
relative overflow-hidden py-8 (Mobile: 320px+)
md:py-12 lg:py-16 (Tablet/Desktop: 768px+)
xl:py-20 2xl:py-24 (Large Desktop: 1280px+)

/* Background Effects - Mobile First */
absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-5 (Mobile: 320px+)
md:opacity-10 (Tablet: 768px+)

/* Content Positioning - Mobile First */
relative z-10 text-center px-4 (Mobile: 320px+)
md:px-6 lg:px-8 (Tablet/Desktop: 768px+)
```

---

## 🔧 Utility Classes

### Common Combinations

```css
/* Glass morphism container */
bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg

/* Gradient text */
bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent

/* Interactive element */
cursor-pointer hover:scale-105 transition-transform duration-300

/* Status indicator */
inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
```

### Custom Utilities

```css
/* Add to your CSS file for repeated patterns */
.glass-card {
	@apply bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg;
}

.gradient-text {
	@apply bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent;
}

.interactive-card {
	@apply group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300;
}
```

---

## 🎯 Component Examples

### Feature Card

```html
<div
	class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100"
>
	<div
		class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
	>
		<!-- Icon here -->
	</div>
	<h3 class="text-xl font-semibold text-gray-900 mb-3 montserrat-semibold">Title</h3>
	<p class="text-gray-600 mb-4">Description</p>
	<div class="flex items-center text-blue-600 font-medium">
		<span>Action</span>
		<svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300">
			<!-- Arrow icon -->
		</svg>
	</div>
</div>
```

### Status Badge

```html
<span
	class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
>
	<svg class="w-4 h-4 mr-2">
		<!-- Check icon -->
	</svg>
	Active
</span>
```

---

## 🚀 Implementation Checklist

1. **✅ Use established color palette**
2. **✅ Apply consistent spacing (p-4, p-8, etc.)**
3. **✅ Use Montserrat font family with appropriate weights**
4. **✅ Include hover states and transitions**
5. **✅ Make it responsive (mobile-first)**
6. **✅ Add glass morphism effects where appropriate**
7. **✅ Use gradient accents for primary actions**
8. **✅ Ensure accessibility (contrast, focus states)**
9. **✅ Test on different screen sizes**
10. **✅ Maintain visual hierarchy**

---

## 📚 Resources

- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Color Palette Generator**: https://coolors.co
- **Font Pairing**: https://fontpair.co
- **Animation Inspiration**: https://animate.style

---

_This design system should be treated as a living document. Update it as new patterns emerge and the design evolves._
