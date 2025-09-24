/**
 * Gallery state management using modern Svelte 5 classes paradigm
 * This file implements the state management for the gallery application
 * using classes with runes and context API for global state sharing.
 */

import { getContext, setContext } from 'svelte';
import type { Artwork } from '$lib/types/artwork';

const GALLERY_KEY = Symbol('gallery_state');

/**
 * Gallery state management class using modern Svelte 5 classes paradigm
 * Encapsulates all gallery-related state and methods using runes
 */
export class GalleryStateClass {
	// Reactive properties using $state rune
	artworks = $state<Artwork[]>([]);
	selectedArtwork = $state<Artwork | null>(null);

	// Getter methods for computed values
	get filteredArtworks() {
		return this.artworks;
	}

	// Actions
	setArtworks(artworks: Artwork[]) {
		this.artworks = artworks;
	}

	selectArtwork(artwork: Artwork | null) {
		this.selectedArtwork = artwork;
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
