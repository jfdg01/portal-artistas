import type { Artwork } from '$lib/types/artwork';
import { artworkData } from '$lib/data/enhancedArtworkData';

/**
 * Gets artwork data from the generated enhanced imports
 * This uses properly imported Picture objects that work with Svelte's enhanced:img component
 */
export function getArtworkData(): Artwork[] {
	return artworkData;
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use getArtworkData() instead
 */
export function generateArtworkData(): Artwork[] {
	return getArtworkData();
}
