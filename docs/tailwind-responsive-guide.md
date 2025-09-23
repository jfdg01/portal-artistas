## Tailwind CSS Design Guide (Mobile‑first)

This guide defines our responsive breakpoints, Do/Don’t rules, and styling best practices for developing consistent UI in this project (Svelte + Tailwind v4).

### Breakpoints

Define these custom breakpoints via Tailwind v4 `@theme` in `src/app.css`:

```css
@theme {
	--breakpoint-xxs: 320px; /* smallest phones */
	--breakpoint-xs: 425px; /* large phones */
	--breakpoint-md: 768px; /* tablets */
	--breakpoint-lg: 1024px; /* small laptops */
	--breakpoint-xl: 1440px; /* desktops */
	--breakpoint-2xl: 2560px; /* ultra-wide */
}
```

Usage example: `xxs:p-3 xs:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12`

### Mobile‑first philosophy

- Start from smallest devices. Base styles must work at < 320px without horizontal scroll.
- Add overrides progressively at breakpoints only when content requires layout changes.
- Prioritize readable typography, accessible targets, and essential actions on `xxs`/`xs`.

### Do / Don’t

#### Do

- Use responsive utilities in ascending order: `p-3 xs:p-4 md:p-6 ...`.
- Constrain readable text width at large screens: `max-w-prose` or `max-w-[65ch]`.
- Maintain consistent horizontal padding: `px-4` (base), `md:px-6`, `lg:px-8`, `xl:px-10`, `2xl:px-12`.
- Use CSS aspect ratios for media: `aspect-[3/4]`, `object-cover`.
- Use fluid/`clamp()` for type where helpful (via arbitrary values): `text-[clamp(1rem,1.5vw,1.125rem)]`.
- Prefer semantic layout changes at `md` (reveal side panels/secondary nav), densify at `lg+`.
- Gate complex/secondary controls behind disclosures on mobile (sheets, drawers, menus).
- Use Tailwind plugins already included: forms, typography.
- Keep variants predictable: hover/focus/active; dark mode if/when added.
- Test layouts at: 320, 360, 390, 414, 425, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560.

#### Don’t

- Don’t duplicate styles at every breakpoint when a fluid value works.
- Don’t rely on hover-only interactions for core actions (touch devices).
- Don’t allow text lines to stretch beyond ~75ch on desktop.
- Don’t position UI with magic numbers; prefer layout primitives (flex/grid/gap).
- Don’t introduce new color tokens ad‑hoc; use theme tokens.
- Don’t change spacing scale arbitrarily; stick to Tailwind spacing scale.
- Don’t ship images without defined aspect ratio (avoid CLS).

### Layout patterns

- Containers: `mx-auto` with `max-w-screen-lg xl:max-w-[1200px] 2xl:max-w-[1400px]` for main content.
- Grids:
  - Cards/listing: `grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`.
  - Gaps: `gap-3 md:gap-4 xl:gap-6`.
- Navigation:
  - `xxs/xs`: simple top/bottom bar; overflow actions in menu/sheet.
  - `md+`: inline toolbar; `lg+`: optional persistent sidebar.
- Filter panels:
  - Mobile: overlay/sheet (e.g., `md:hidden`).
  - Desktop: `hidden md:block md:sticky md:top-0` for docked behavior.

### Typography

- Base body: 16px min on mobile (`text-base`), adjust with fluid clamp if needed.
- Headings use a consistent scale; avoid jumps > 1 step across breakpoints.
- Limit paragraph width: `prose` or `max-w-[65-75ch]` at `xl/2xl`.

### Spacing and sizing

- Stick to Tailwind spacing scale for paddings/margins; use `gap-*` for separation.
- Minimum touch target: 40–44px height on `xxs/xs`.
- Increase spacing stepwise: small on mobile, generous on `xl/2xl`.

### Color and theming

- Use CSS variables or Tailwind color tokens; centralize palette.
- Ensure 4.5:1 contrast for text vs background; 3:1 for large text/UI.
- Reserve accent color for primary actions; use neutrals for structure.

### Accessibility

- Always provide focus states (`focus-visible:*`), and readable labels.
- Respect reduced motion (`motion-reduce:*`) for animations.
- Avoid text in images; keep alt text informative for media.

### Images and media

- Define explicit aspect ratios on cards and media containers.
- Use `object-cover` with center focal point for cropped thumbnails.
- Constrain large media on `xl/2xl` to avoid excessive width.

### State, transitions, and layers

- Keep transitions subtle; 150–250ms is typical for UI.
- Z-index: prefer a small, documented scale (e.g., dropdown 20, modal 40, toast 50) and avoid arbitrary values.

### Example snippets

Responsive container and grid:

```html
<div
	class="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-screen-lg xl:max-w-[1200px] 2xl:max-w-[1400px]"
>
	<div
		class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 xl:gap-6"
	>
		<!-- cards -->
	</div>

	<p class="mt-6 text-base xs:text-[17px] md:text-lg xl:text-xl max-w-[70ch]">
		Responsive body text with constrained line length.
	</p>
</div>
```

Mobile overlay filter → desktop docked:

```html
<!-- Toggle visible on mobile -->
<button class="md:hidden">Filters</button>

<!-- Overlay (mobile) -->
<aside class="md:hidden fixed inset-0 bg-black/40">
	<div class="ml-auto h-full w-80 bg-white p-4">...</div>
</aside>

<!-- Docked (desktop) -->
<aside
	class="hidden md:block md:sticky md:top-0 md:h-[calc(100dvh-var(--header))] md:w-80 md:shrink-0"
>
	...
</aside>
```

### Workflow guidelines

1. Build smallest view first (320px). Ensure no horizontal scroll and all core actions are reachable.
2. Add `xs` refinements (spacing/type). Introduce two-up small elements as space allows.
3. At `md`, introduce multi-column layouts and inline toolbars/filters.
4. At `lg`, densify grids and consider persistent sidebars.
5. At `xl/2xl`, increase whitespace, cap text widths, avoid line-length bloat.
6. Validate the testing matrix and keyboard/AT accessibility at each step.

---

By following this guide, we ensure consistent, accessible, and performant responsive design across 320 → 2560px.
