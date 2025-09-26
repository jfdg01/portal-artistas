/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Artwork } from '$lib/types/artwork';
import { artworkData } from '$lib/data/artworkData';

const GALLERY_KEY = Symbol('gallery_state');

/**
 * Gallery state management class using modern Svelte 5 classes paradigm
 * Encapsulates all gallery-related state and methods using runes
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>(artworkData);
	selectedCategory = $state<string>('');

	// Getter methods for computed values
	get filteredArtworks() {
		if (!this.selectedCategory) {
			return this.artworks;
		}

		return this.artworks.filter((artwork) => {
			if (Array.isArray(artwork.category)) {
				return artwork.category.includes(this.selectedCategory);
			}
			return artwork.category === this.selectedCategory;
		});
	}

	get availableCategories() {
		const categories = new SvelteSet<string>();
		this.artworks.forEach((artwork) => {
			if (Array.isArray(artwork.category)) {
				artwork.category.forEach((cat) => categories.add(cat));
			} else {
				categories.add(artwork.category);
			}
		});
		return Array.from(categories).sort();
	}

	// Actions
	setArtworks(artworks: Artwork[]) {
		this.artworks = artworks;
	}

	setCategoryFilter(category: string) {
		this.selectedCategory = category;
	}

	clearFilters() {
		this.selectedCategory = '';
	}

	// Utility methods
	getArtworkById(id: string): Artwork | undefined {
		return this.artworks.find((artwork) => artwork.id === id);
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
