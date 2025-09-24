/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork, GalleryFilter } from '$lib/types/artwork';

const GALLERY_KEY = Symbol('gallery_state');

/**
 * Gallery state management class using modern Svelte 5 classes paradigm
 * Encapsulates all gallery-related state and methods using runes
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>([]);
	selectedArtwork = $state<Artwork | null>(null);
	viewMode = $state<'grid' | 'list'>('grid');
	filter = $state<GalleryFilter>({
		category: '',
		priceRange: [0, 10000] as [number, number],
		availableOnly: false
	});

	// Getter methods for computed values
	get filteredArtworks() {
		return this.artworks.filter((artwork) => {
			// Category filter
			if (this.filter.category && artwork.category !== this.filter.category) {
				return false;
			}

			// Price range filter
			if (
				artwork.price &&
				(artwork.price < this.filter.priceRange![0] || artwork.price > this.filter.priceRange![1])
			) {
				return false;
			}

			// Availability filter
			if (this.filter.availableOnly && !artwork.isAvailable) {
				return false;
			}

			return true;
		});
	}

	get availableCategories() {
		const categories = new SvelteSet(this.artworks.map((artwork) => artwork.category));
		return Array.from(categories).sort();
	}

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

	updateFilters(filters: Partial<GalleryFilter>) {
		this.filter = { ...this.filter, ...filters };
	}

	clearFilters() {
		this.filter = {
			category: '',
			priceRange: [0, 10000] as [number, number],
			availableOnly: false
		};
	}

	// Utility methods
	getArtworkById(id: string): Artwork | undefined {
		return this.artworks.find((artwork) => artwork.id === id);
	}

	getArtworksByCategory(category: string): Artwork[] {
		return this.artworks.filter((artwork) => artwork.category === category);
	}

	getAvailableArtworks(): Artwork[] {
		return this.artworks.filter((artwork) => artwork.isAvailable);
	}
}

/**
 * Set gallery state in context (call in +layout.svelte)
 * Creates a new instance of GalleryStateClass and makes it available to all child components
 */
export function setGalleryState() {
	const galleryState = new GalleryStateClass();
	setContext(GALLERY_KEY, galleryState);
	return galleryState;
}

/**
 * Get gallery state from context (call in components)
 * Retrieves the shared gallery state instance from the context
 */
export function getGalleryState() {
	return getContext<GalleryStateClass>(GALLERY_KEY);
}
