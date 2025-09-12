# Gallery App - Sprint 1 Documentation

## Overview

Frontend-only gallery application for displaying and browsing artwork. This sprint focuses on the core gallery functionality without payment processing or user authentication.

## User Stories

### As a Visitor (Gallery Browser)

- **US001**: I want to browse a gallery of artwork so that I can discover pieces I like
- **US002**: I want to view detailed information about an artwork so that I can learn more about it
- **US003**: I want to see artwork prices so that I can understand the cost
- **US004**: I want to filter or search artwork so that I can find specific pieces
- **US005**: I want to see artwork in different views (grid/list) so that I can browse efficiently

### As an Artist (Content Manager)

- **US006**: I want to upload artwork images so that I can showcase my work
- **US007**: I want to add artwork details (title, price, description) so that visitors can learn about my pieces
- **US008**: I want to mark artwork as sold so that visitors know it's no longer available
- **US009**: I want to organize artwork by categories so that visitors can browse by type

## Data Models

### Artwork

```typescript
interface Artwork {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string; // 'EUR', 'USD', etc.
	imageUrl: string;
	thumbnailUrl: string;
	artist: string;
	year: number;
	dimensions: {
		width: number;
		height: number;
		unit: string; // 'cm', 'in'
	};
	category: string;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}
```

### Gallery State (Modern Svelte 5 Classes Paradigm)

```typescript
// Using the modern Svelte 5 classes paradigm with runes
interface GalleryState {
	artworks: Artwork[];
	selectedArtwork: Artwork | null;
	viewMode: 'grid' | 'list';
	filter: {
		category?: string;
		priceRange?: [number, number];
		availableOnly?: boolean;
	};
	searchQuery: string;
}

// Class-based state management with runes
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>([]);
	selectedArtwork = $state<Artwork | null>(null);
	viewMode = $state<'grid' | 'list'>('grid');
	searchQuery = $state<string>('');
	filter = $state({
		category: '',
		priceRange: [0, 10000] as [number, number],
		availableOnly: false
	});

	// Derived state using $derived rune
	filteredArtworks = $derived(() => {
		return this.artworks.filter((artwork) => {
			// Search filter
			if (this.searchQuery) {
				const query = this.searchQuery.toLowerCase();
				if (
					!artwork.title.toLowerCase().includes(query) &&
					!artwork.artist.toLowerCase().includes(query) &&
					!artwork.description.toLowerCase().includes(query)
				) {
					return false;
				}
			}

			// Category filter
			if (this.filter.category && artwork.category !== this.filter.category) {
				return false;
			}

			// Price range filter
			if (artwork.price < this.filter.priceRange[0] || artwork.price > this.filter.priceRange[1]) {
				return false;
			}

			// Availability filter
			if (this.filter.availableOnly && !artwork.isAvailable) {
				return false;
			}

			return true;
		});
	});

	// Actions
	setArtworks(artworks: Artwork[]) {
		this.artworks = artworks;
	}

	selectArtwork(artwork: Artwork | null) {
		this.selectedArtwork = artwork;
	}

	setViewMode(mode: 'grid' | 'list') {
		this.viewMode = mode;
	}

	setSearchQuery(query: string) {
		this.searchQuery = query;
	}

	updateFilters(filters: Partial<typeof this.filter>) {
		this.filter = { ...this.filter, ...filters };
	}
}
```

## Component Structure

### Main Components

- **GalleryApp**: Root component managing global state
- **GalleryHeader**: Search, filters, and view mode toggle
- **ArtworkGrid**: Grid layout for artwork display
- **ArtworkList**: List layout for artwork display
- **ArtworkCard**: Individual artwork display component
- **ArtworkModal**: Detailed view of selected artwork
- **FilterPanel**: Category and price filtering

### Layout Structure

```
GalleryApp
├── GalleryHeader
│   ├── SearchBar
│   ├── FilterToggle
│   └── ViewModeToggle
├── FilterPanel (collapsible)
│   ├── CategoryFilter
│   ├── PriceRangeFilter
│   └── AvailabilityFilter
└── ArtworkDisplay
    ├── ArtworkGrid (or ArtworkList)
    │   └── ArtworkCard[]
    └── ArtworkModal
```

## Features to Implement

### Core Gallery Features

1. **Artwork Display**
   - Grid and list view modes
   - Responsive design for mobile/desktop
   - Lazy loading for performance
   - Image optimization

2. **Search & Filtering**
   - Text search by title, artist, description
   - Category filtering
   - Price range filtering
   - Availability filtering (available/sold)

3. **Artwork Details**
   - Modal or dedicated page for detailed view
   - High-resolution image display
   - Complete artwork information
   - Contact information for inquiries

4. **Navigation**
   - Smooth scrolling
   - URL state management
   - Back/forward browser support

### Mock Data Structure

```typescript
const mockArtworks: Artwork[] = [
	{
		id: '1',
		title: 'Sunset Over Mountains',
		description: 'A beautiful landscape painting capturing the golden hour...',
		price: 450,
		currency: 'EUR',
		imageUrl: '/images/sunset-mountains.jpg',
		thumbnailUrl: '/images/thumbnails/sunset-mountains.jpg',
		artist: 'María García',
		year: 2023,
		dimensions: { width: 60, height: 40, unit: 'cm' },
		category: 'Landscape',
		isAvailable: true,
		createdAt: new Date('2023-01-15'),
		updatedAt: new Date('2023-01-15')
	}
	// ... more mock data
];
```

## Technical Requirements

### Frontend Stack

- **Framework**: SvelteKit 5 (already configured)
- **Styling**: Tailwind CSS 4 (already configured)
- **Language**: TypeScript (already configured)
- **State Management**: Modern Svelte 5 classes paradigm with runes + context API
- **UI Components**: @headlessui/svelte (accessible components)
- **Icons**: lucide-svelte (consistent icon set)
- **Image Handling**: SvelteKit built-in optimization + lazy loading
- **Routing**: SvelteKit routing for artwork details
- **Animations**: Svelte transitions (built-in)
- **Documentation**: JSDoc comments with @component annotations

### Performance Considerations

- Image lazy loading
- Virtual scrolling for large galleries
- Debounced search
- Optimized bundle size
- Progressive image loading

### Accessibility

- Keyboard navigation
- Screen reader support
- Alt text for all images
- Focus management
- Color contrast compliance

## Responsive Breakpoints

- **Mobile**: < 768px (2 columns grid, stacked layout)
- **Tablet**: 768px - 1024px (3 columns grid)
- **Desktop**: > 1024px (4+ columns grid)

## Key Interactions

1. **Search**: Real-time filtering as user types
2. **Filter Toggle**: Show/hide filter panel
3. **View Mode**: Switch between grid and list views
4. **Artwork Click**: Open detail modal
5. **Modal Close**: Click outside, ESC key, or close button
6. **Filter Changes**: Immediate gallery update
7. **Sort**: Dropdown with options (price, date, title)

## Implementation Plan

### Phase 1: Setup & Dependencies

```bash
# Install recommended dependencies
npm install @headlessui/svelte lucide-svelte svelte-local-storage-store

# Optional: For better TypeScript support
npm install -D @types/node
```

### Phase 2: Core Components

1. **Data Layer (Modern Classes Paradigm)**
   - Create `src/lib/GalleryState.svelte.ts` - Gallery state class with context functions
   - Create `src/lib/types/artwork.ts` - TypeScript interfaces
   - Create `src/lib/utils/mockData.ts` - Mock artwork data

2. **UI Components (Svelte 5 Syntax)**
   - `src/lib/components/GalleryHeader.svelte` - Search, filters, view toggle
   - `src/lib/components/ArtworkCard.svelte` - Individual artwork display
   - `src/lib/components/ArtworkGrid.svelte` - Grid layout
   - `src/lib/components/ArtworkList.svelte` - List layout
   - `src/lib/components/ArtworkModal.svelte` - Detail modal
   - `src/lib/components/FilterPanel.svelte` - Filter controls

3. **Pages**
   - Update `src/routes/+layout.svelte` - Set gallery context
   - Update `src/routes/+page.svelte` - Main gallery page
   - Create `src/routes/artwork/[id]/+page.svelte` - Individual artwork page

### Phase 3: Features Implementation

1. **Search & Filtering**
   - Debounced search with Tailwind CSS transitions
   - Category filtering with checkboxes
   - Price range slider
   - Availability toggle

2. **Responsive Design**
   - Mobile-first Tailwind CSS classes
   - Responsive grid with CSS Grid
   - Touch-friendly interactions

3. **Performance**
   - Image lazy loading with `loading="lazy"`
   - Virtual scrolling for large datasets
   - Debounced search input

### Technology-Specific Implementation Notes

#### Tailwind CSS Classes

```css
/* Grid Layout */
.artwork-grid {
	@apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6;
}

/* Card Styling */
.artwork-card {
	@apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300;
}

/* Modal */
.modal-overlay {
	@apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4;
}
```

#### Modern Svelte 5 Classes Paradigm Benefits

- **Separation of Concerns**: Logic is cleanly separated from UI components
- **Improved Code Organization**: State and methods are encapsulated within classes
- **Enhanced Reusability**: State logic can be easily reused across components
- **Seamless State Sharing**: Context API provides efficient state sharing
- **Better TypeScript Support**: Classes provide better type inference and IntelliSense
- **Cleaner Component Code**: Components focus on UI, not state management logic

#### Svelte 5 Best Practices

- **Runes**: Use `$state`, `$derived`, `$effect` instead of traditional stores
- **Props**: Use `$props()` for component prop destructuring
- **Context API**: Use `setContext`/`getContext` for global state sharing
- **Classes**: Encapsulate state logic in classes with `.svelte.ts` files
- **Documentation**: JSDoc comments with @component annotations
- **TypeScript**: Strict typing with runes and props

#### SvelteKit Features

- **Runes**: Reactive state management with $state/$derived
- **Transitions**: Smooth modal animations
- **Routing**: SEO-friendly URLs for artwork
- **SSR**: Server-side rendering for better performance

#### @headlessui/svelte Components

- **Dialog**: Accessible modal implementation
- **Listbox**: Dropdown for sorting/filtering
- **Switch**: Toggle components

## Svelte 5 Component Documentation Standards

### Component Documentation Template

```svelte
<!--
@component ArtworkCard
@description Displays an individual artwork with image, title, artist, and price
@example
  <ArtworkCard {artwork} on:click={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';

	/**
	 * @prop {Artwork} artwork - The artwork object to display
	 * @prop {boolean} [showPrice=true] - Whether to show the price
	 * @prop {string} [size='medium'] - Size variant: 'small' | 'medium' | 'large'
	 */
	let {
		artwork,
		showPrice = true,
		size = 'medium'
	}: {
		artwork: Artwork;
		showPrice?: boolean;
		size?: 'small' | 'medium' | 'large';
	} = $props();

	/**
	 * @event click - Fired when the artwork card is clicked
	 */
	let { onclick }: { onclick: (artwork: Artwork) => void } = $props();
</script>
```

### Modern State Management with Classes and Context

#### 1. Gallery State Class with Context Functions

```typescript
// src/lib/GalleryState.svelte.ts
import { getContext, setContext } from 'svelte';
import type { Artwork } from '$lib/types/artwork';

const GALLERY_KEY = Symbol('gallery_state');

/**
 * Gallery state management using modern Svelte 5 classes paradigm
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>([]);
	selectedArtwork = $state<Artwork | null>(null);
	viewMode = $state<'grid' | 'list'>('grid');
	searchQuery = $state<string>('');
	filter = $state({
		category: '',
		priceRange: [0, 10000] as [number, number],
		availableOnly: false
	});

	// Derived state using $derived rune
	filteredArtworks = $derived(() => {
		return this.artworks.filter((artwork) => {
			// Search filter
			if (this.searchQuery) {
				const query = this.searchQuery.toLowerCase();
				if (
					!artwork.title.toLowerCase().includes(query) &&
					!artwork.artist.toLowerCase().includes(query) &&
					!artwork.description.toLowerCase().includes(query)
				) {
					return false;
				}
			}

			// Category filter
			if (this.filter.category && artwork.category !== this.filter.category) {
				return false;
			}

			// Price range filter
			if (artwork.price < this.filter.priceRange[0] || artwork.price > this.filter.priceRange[1]) {
				return false;
			}

			// Availability filter
			if (this.filter.availableOnly && !artwork.isAvailable) {
				return false;
			}

			return true;
		});
	});

	// Actions
	setArtworks(artworks: Artwork[]) {
		this.artworks = artworks;
	}

	selectArtwork(artwork: Artwork | null) {
		this.selectedArtwork = artwork;
	}

	setViewMode(mode: 'grid' | 'list') {
		this.viewMode = mode;
	}

	setSearchQuery(query: string) {
		this.searchQuery = query;
	}

	updateFilters(filters: Partial<typeof this.filter>) {
		this.filter = { ...this.filter, ...filters };
	}
}

/**
 * Set gallery state in context (call in +layout.svelte)
 */
export function setGalleryState() {
	const galleryState = new GalleryStateClass();
	setContext(GALLERY_KEY, galleryState);
	return galleryState;
}

/**
 * Get gallery state from context (call in components)
 */
export function getGalleryState() {
	return getContext<GalleryStateClass>(GALLERY_KEY);
}
```

#### 2. Layout Setup (Global State)

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { setGalleryState } from '$lib/GalleryState.svelte';
	import { mockArtworks } from '$lib/utils/mockData';

	// Set up global gallery state
	const galleryState = setGalleryState();

	// Load mock data
	galleryState.setArtworks(mockArtworks);
</script>

<slot />
```

#### 3. Component Usage (Local State Access)

```svelte
<!-- src/lib/components/GalleryHeader.svelte -->
<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Search, Filter, Grid, List } from 'lucide-svelte';

	// Get shared gallery state
	const galleryState = getGalleryState();

	let searchInput = $state('');

	// Debounced search
	$effect(() => {
		const timeout = setTimeout(() => {
			galleryState.setSearchQuery(searchInput);
		}, 300);

		return () => clearTimeout(timeout);
	});
</script>

<div class="flex items-center gap-4 p-4 bg-white shadow-sm">
	<div class="relative flex-1">
		<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
		<input
			bind:value={searchInput}
			type="text"
			placeholder="Search artworks..."
			class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
		/>
	</div>

	<button
		onclick={() => galleryState.setViewMode('grid')}
		class="p-2 rounded-lg {galleryState.viewMode === 'grid'
			? 'bg-blue-500 text-white'
			: 'bg-gray-100 text-gray-600'}"
	>
		<Grid class="w-5 h-5" />
	</button>

	<button
		onclick={() => galleryState.setViewMode('list')}
		class="p-2 rounded-lg {galleryState.viewMode === 'list'
			? 'bg-blue-500 text-white'
			: 'bg-gray-100 text-gray-600'}"
	>
		<List class="w-5 h-5" />
	</button>
</div>
```

## Success Criteria

- [ ] Gallery displays artwork in both grid and list views
- [ ] Search functionality works across title, artist, and description
- [ ] Filtering by category and price range works
- [ ] Artwork details modal/page displays complete information
- [ ] Responsive design works on mobile and desktop
- [ ] Performance is smooth with 50+ artwork items
- [ ] Accessibility standards are met
- [ ] State persists across page refreshes
- [ ] Smooth animations and transitions
- [ ] **Modern Svelte 5 Classes Paradigm**: State management uses classes with runes
- [ ] **Context API**: Global state sharing through context functions
- [ ] **Separation of Concerns**: Logic cleanly separated from UI components
- [ ] **Reusable State Logic**: State classes can be reused across components
- [ ] Components use Svelte 5 runes ($state, $derived, $props, $effect)
- [ ] All components have proper JSDoc documentation
- [ ] TypeScript types are properly defined and used
- [ ] Code follows modern Svelte 5 best practices and standards
