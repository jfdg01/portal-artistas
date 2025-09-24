#!/usr/bin/env node

import { readdirSync, writeFileSync } from 'fs';

/**
 * Script to generate artwork data based on actual image files
 * Scans the static/images directory and creates artwork entries
 */

const IMAGES_DIR = '/home/gara/Proyects/test/static/images';
const OUTPUT_FILE = '/home/gara/Proyects/test/src/lib/data/artworkData.ts';

// Read all image files
const imageFiles = readdirSync(IMAGES_DIR).filter((file) => file.endsWith('.webp'));

// Group images by base name
const imageGroups = new Map();

imageFiles.forEach((file) => {
	// Extract base name and resolution
	const match = file.match(/^(.+)-(\d+)px\.webp$/);
	if (!match) return;

	const [, baseName, resolution] = match;

	if (!imageGroups.has(baseName)) {
		imageGroups.set(baseName, {
			baseName,
			variants: new Map()
		});
	}

	const group = imageGroups.get(baseName);
	group.variants.set(resolution, file);
});

// Generate artwork data
const artworks = [];

imageGroups.forEach((group, baseName) => {
	// Extract title from base name
	const title = baseName
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	// Determine if this has zoom variants
	const hasZoomVariants = baseName.includes('-zoom-');

	// Create image variants
	const images = [];

	if (hasZoomVariants) {
		// This is a zoom variant, find the main image
		const mainBaseName = baseName.replace(/-zoom-\d+$/, '');
		const mainGroup = imageGroups.get(mainBaseName);

		if (mainGroup) {
			// Add main image
			const main320 = mainGroup.variants.get('320');
			const main1440 = mainGroup.variants.get('1440');

			if (main320 && main1440) {
				images.push({
					name: 'main',
					thumbnailUrl: `/images/${main320}`,
					fullUrl: `/images/${main1440}`
				});
			}

			// Add zoom variants
			const zoomVariants =
				Array.from(mainGroup.variants.keys()).filter((res) => res === '320' || res === '1440')
					.length > 2; // More than just main 320 and 1440

			if (zoomVariants) {
				// Find all zoom variants for this main image
				const zoomFiles = imageFiles.filter(
					(file) => file.startsWith(mainBaseName + '-zoom-') && file.endsWith('.webp')
				);

				const zoomGroups = new Map();
				zoomFiles.forEach((file) => {
					const zoomMatch = file.match(/^(.+-zoom-\d+)-(\d+)px\.webp$/);
					if (zoomMatch) {
						const [, zoomBase, resolution] = zoomMatch;
						if (!zoomGroups.has(zoomBase)) {
							zoomGroups.set(zoomBase, new Map());
						}
						zoomGroups.get(zoomBase).set(resolution, file);
					}
				});

				zoomGroups.forEach((variants, zoomBase) => {
					const zoom320 = variants.get('320');
					const zoom1440 = variants.get('1440');

					if (zoom320 && zoom1440) {
						const zoomNumber = zoomBase.match(/-zoom-(\d+)$/)[1];
						images.push({
							name: `zoom-${zoomNumber}`,
							thumbnailUrl: `/images/${zoom320}`,
							fullUrl: `/images/${zoom1440}`
						});
					}
				});
			}
		}
	} else {
		// This is a main image
		const main320 = group.variants.get('320');
		const main1440 = group.variants.get('1440');

		if (main320 && main1440) {
			images.push({
				name: 'main',
				thumbnailUrl: `/images/${main320}`,
				fullUrl: `/images/${main1440}`
			});
		}

		// Check for zoom variants
		const zoomFiles = imageFiles.filter(
			(file) => file.startsWith(baseName + '-zoom-') && file.endsWith('.webp')
		);

		if (zoomFiles.length > 0) {
			const zoomGroups = new Map();
			zoomFiles.forEach((file) => {
				const zoomMatch = file.match(/^(.+-zoom-\d+)-(\d+)px\.webp$/);
				if (zoomMatch) {
					const [, zoomBase, resolution] = zoomMatch;
					if (!zoomGroups.has(zoomBase)) {
						zoomGroups.set(zoomBase, new Map());
					}
					zoomGroups.get(zoomBase).set(resolution, file);
				}
			});

			zoomGroups.forEach((variants, zoomBase) => {
				const zoom320 = variants.get('320');
				const zoom1440 = variants.get('1440');

				if (zoom320 && zoom1440) {
					const zoomNumber = zoomBase.match(/-zoom-(\d+)$/)[1];
					images.push({
						name: `zoom-${zoomNumber}`,
						thumbnailUrl: `/images/${zoom320}`,
						fullUrl: `/images/${zoom1440}`
					});
				}
			});
		}
	}

	// Only create artwork if it's a main image (not a zoom variant)
	if (!hasZoomVariants && images.length > 0) {
		const artwork = {
			id: baseName,
			title,
			images,
			category: 'Artwork', // Default category
			isAvailable: true,
			createdAt: new Date(),
			updatedAt: new Date()
		};

		artworks.push(artwork);
	}
});

// Sort artworks by title
artworks.sort((a, b) => a.title.localeCompare(b.title));

// Generate TypeScript file with proper Date objects
const artworksWithDates = artworks.map((artwork) => ({
	...artwork,
	createdAt: `new Date('${artwork.createdAt.toISOString()}')`,
	updatedAt: `new Date('${artwork.updatedAt.toISOString()}')`
}));

const tsContent = `/**
 * Artwork data generated from actual image files
 * Generated on ${new Date().toISOString()}
 */

import type { Artwork } from '$lib/types/artwork';

export const artworkData: Artwork[] = [
${artworksWithDates
	.map(
		(artwork) => `  {
    id: '${artwork.id}',
    title: '${artwork.title}',
    images: ${JSON.stringify(artwork.images, null, 6)},
    category: '${artwork.category}',
    isAvailable: ${artwork.isAvailable},
    createdAt: ${artwork.createdAt},
    updatedAt: ${artwork.updatedAt}
  }`
	)
	.join(',\n')}
];

// Helper functions
export function getArtworkById(id: string): Artwork | undefined {
  return artworkData.find(artwork => artwork.id === id);
}

export function getArtworksByCategory(category: string): Artwork[] {
  return artworkData.filter(artwork => artwork.category === category);
}

export function getAvailableCategories(): string[] {
  const categories = new Set(artworkData.map(artwork => artwork.category));
  return Array.from(categories).sort();
}

export function getRandomArtwork(): Artwork {
  const randomIndex = Math.floor(Math.random() * artworkData.length);
  return artworkData[randomIndex];
}
`;

// Ensure the data directory exists
import { mkdirSync } from 'fs';
import { dirname } from 'path';

mkdirSync(dirname(OUTPUT_FILE), { recursive: true });

// Write the file
writeFileSync(OUTPUT_FILE, tsContent);

console.log(`Generated artwork data for ${artworks.length} artworks`);
console.log(`Output written to: ${OUTPUT_FILE}`);
