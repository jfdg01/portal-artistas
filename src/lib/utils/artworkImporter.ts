import type { Artwork, ImageVariant } from '$lib/types/artwork';

/**
 * Dynamically imports all images from the assets/images directory
 * This uses Vite's import.meta.glob to automatically discover images
 * with enhanced image processing enabled
 */
const imageModules = import.meta.glob('/src/lib/assets/images/*.{jpg,jpeg,png,webp}', {
	eager: true,
	query: {
		enhanced: true
	}
});

/**
 * Generates artwork data from discovered images
 * Uses Vite's asset handling and Svelte's enhanced:img feature
 */
export function generateArtworkData(): Artwork[] {
	const artworks: Artwork[] = [];
	const imageGroups = groupImagesByArtwork();

	for (const [artworkId, variants] of imageGroups) {
		const images: ImageVariant[] = [];

		// Sort variants by name (main first, then zoom-1, zoom-2, etc.)
		const sortedVariants = Array.from(variants.entries()).sort((a, b) => {
			if (a[0] === 'main') return -1;
			if (b[0] === 'main') return 1;
			return a[0].localeCompare(b[0]);
		});

		for (const [variantName, imagePath] of sortedVariants) {
			// For Svelte's enhanced:img, we need to use the actual imported module
			// The imagePath is the processed URL from Vite's enhanced image system
			images.push({
				name: variantName,
				url: imagePath
			});
		}

		if (images.length > 0) {
			artworks.push({
				id: artworkId,
				title: generateTitleFromId(artworkId),
				images,
				category: 'Artwork',
				isAvailable: true
			});
		}
	}

	return artworks;
}

/**
 * Groups image files by artwork ID and variant based on filename patterns
 */
function groupImagesByArtwork(): Map<string, Map<string, string>> {
	const groups = new Map<string, Map<string, string>>();

	for (const [path, module] of Object.entries(imageModules)) {
		// Extract filename from path like '/src/lib/assets/images/acrilico-1.png'
		const filename = path.split('/').pop() || '';
		const baseName = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');

		// Extract artwork ID and variant name
		let artworkId: string;
		let variantName: string;

		if (baseName.includes('-zoom-')) {
			const zoomMatch = baseName.match(/^(.+)-zoom-(\d+)$/);
			if (zoomMatch) {
				artworkId = zoomMatch[1];
				variantName = `zoom-${zoomMatch[2]}`;
			} else {
				continue; // Skip malformed files
			}
		} else {
			artworkId = baseName;
			variantName = 'main';
		}

		if (!groups.has(artworkId)) {
			groups.set(artworkId, new Map());
		}

		// Access the default export from the enhanced image module
		groups.get(artworkId)!.set(variantName, (module as { default: string }).default);
	}

	return groups;
}

/**
 * Generates a human-readable title from an artwork ID
 */
function generateTitleFromId(id: string): string {
	return id
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Gets artwork data (synchronous since we're using import.meta.glob)
 */
export function getArtworkData(): Artwork[] {
	return generateArtworkData();
}
