#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

/**
 * Script to generate artwork data from source images
 * This script scans the source images directory and creates artwork objects
 * for each image, then processes them into the required format
 */

const SOURCE_IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images');
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'lib', 'data');

// Supported image extensions
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function generateTitleFromId(id) {
	return id
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// Random descriptions for testing
const DESCRIPTIONS = [
	'A captivating piece that explores the interplay of light and shadow, creating depth and emotion through masterful brushwork.',
	'This artwork represents a unique perspective on contemporary themes, blending traditional techniques with modern sensibilities.',
	'A stunning composition that captures the essence of its subject through bold colors and dynamic movement.',
	'This piece demonstrates exceptional skill in composition and color theory, creating a visually striking experience.',
	'An evocative work that invites contemplation and reflection through its subtle nuances and artistic expression.',
	"This artwork showcases the artist's mastery of technique while conveying deep emotional resonance.",
	'A beautiful piece that harmonizes form and content, creating a lasting impression on the viewer.',
	'This work demonstrates innovative approaches to traditional artistic concepts, resulting in a fresh perspective.',
	'An engaging composition that balances technical excellence with creative vision and artistic integrity.',
	'This piece captures a moment in time with remarkable sensitivity and artistic insight.'
];

// Random categories for variety
const CATEGORIES = [
	'Painting',
	'Drawing',
	'Mixed Media',
	'Digital Art',
	'Photography',
	'Collage',
	'Portrait',
	'Landscape',
	'Abstract',
	'Contemporary'
];

// Random price ranges (in EUR)
const PRICE_RANGES = [
	{ min: 150, max: 300 },
	{ min: 300, max: 600 },
	{ min: 600, max: 1200 },
	{ min: 1200, max: 2500 },
	{ min: 2500, max: 5000 }
];

// Random dimension ranges (in cm)
const DIMENSION_RANGES = [
	{ width: { min: 20, max: 40 }, height: { min: 25, max: 50 } },
	{ width: { min: 30, max: 60 }, height: { min: 40, max: 80 } },
	{ width: { min: 50, max: 100 }, height: { min: 60, max: 120 } },
	{ width: { min: 40, max: 80 }, height: { min: 30, max: 60 } }
];

function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getRandomDescription() {
	return getRandomElement(DESCRIPTIONS);
}

function getRandomCategory() {
	return getRandomElement(CATEGORIES);
}

function getRandomPrice() {
	const range = getRandomElement(PRICE_RANGES);
	return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

function getRandomYear() {
	return Math.floor(Math.random() * (2024 - 2015 + 1)) + 2015;
}

function getRandomDimensions() {
	const range = getRandomElement(DIMENSION_RANGES);
	const width =
		Math.floor(Math.random() * (range.width.max - range.width.min + 1)) + range.width.min;
	const height =
		Math.floor(Math.random() * (range.height.max - range.height.min + 1)) + range.height.min;
	return {
		width,
		height,
		unit: 'cm'
	};
}

function extractArtworkId(filename) {
	// Remove file extension
	const baseName = path.basename(filename, path.extname(filename));

	// Remove zoom suffixes if present
	return baseName.replace(/-zoom-\d+$/, '');
}

function extractVariantName(filename) {
	const baseName = path.basename(filename, path.extname(filename));

	// Check if it's a zoom variant
	const zoomMatch = baseName.match(/-zoom-(\d+)$/);
	if (zoomMatch) {
		return `zoom-${zoomMatch[1]}`;
	}

	return 'main';
}

function groupImagesByArtwork(files) {
	const groups = new Map();

	for (const file of files) {
		const artworkId = extractArtworkId(file);
		const variantName = extractVariantName(file);

		if (!groups.has(artworkId)) {
			groups.set(artworkId, new Map());
		}

		groups.get(artworkId).set(variantName, file);
	}

	return groups;
}

function createArtworkFromImages(artworkId, variants) {
	const images = [];
	const title = generateTitleFromId(artworkId);

	// Sort variants by name (main first, then zoom-1, zoom-2, etc.)
	const sortedVariants = Array.from(variants.entries()).sort((a, b) => {
		if (a[0] === 'main') return -1;
		if (b[0] === 'main') return 1;
		return a[0].localeCompare(b[0]);
	});

	for (const [variantName, filename] of sortedVariants) {
		// For the artworkImporter system, we use the original image paths
		// Vite will handle the optimization and multiple formats
		images.push({
			name: variantName,
			thumbnailUrl: `/src/lib/assets/images/${filename}`,
			fullUrl: `/src/lib/assets/images/${filename}`
		});
	}

	if (images.length === 0) {
		console.warn(`⚠️  No images found for artwork: ${artworkId}`);
		return null;
	}

	// Generate random metadata for testing
	const description = getRandomDescription();
	const category = getRandomCategory();
	const price = getRandomPrice();
	const year = getRandomYear();
	const dimensions = getRandomDimensions();

	return {
		id: artworkId,
		title,
		description,
		price,
		currency: 'EUR',
		images,
		year,
		dimensions,
		category,
		isAvailable: true
	};
}

function generateArtworkData() {
	console.log('🔍 Scanning source images...');

	if (!fs.existsSync(SOURCE_IMAGES_DIR)) {
		console.error(`❌ Source images directory not found: ${SOURCE_IMAGES_DIR}`);
		console.log('💡 Make sure you have images in src/lib/assets/images/');
		process.exit(1);
	}

	const files = fs.readdirSync(SOURCE_IMAGES_DIR).filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return SUPPORTED_EXTENSIONS.has(ext);
	});

	if (files.length === 0) {
		console.error('❌ No supported image files found in source directory');
		process.exit(1);
	}

	console.log(`📁 Found ${files.length} image files`);

	const imageGroups = groupImagesByArtwork(files);
	const artworks = [];

	console.log('🎨 Generating artwork data...');

	for (const [artworkId, variants] of imageGroups) {
		const artwork = createArtworkFromImages(artworkId, variants);
		if (artwork) {
			artworks.push(artwork);
			console.log(`✅ Generated: ${artwork.title} (${artwork.images.length} variants)`);
		}
	}

	return artworks;
}

function generateTypeScriptFile(artworks) {
	const timestamp = new Date().toISOString();

	// Convert artworks to TypeScript format
	const artworksTs = artworks
		.map((artwork) => {
			return `	{
		id: "${artwork.id}",
		title: "${artwork.title}",
		description: "${artwork.description}",
		price: ${artwork.price},
		currency: "${artwork.currency}",
		images: ${JSON.stringify(artwork.images, null, '\t\t')},
		year: ${artwork.year},
		dimensions: {
			width: ${artwork.dimensions.width},
			height: ${artwork.dimensions.height},
			unit: "${artwork.dimensions.unit}"
		},
		category: "${artwork.category}",
		isAvailable: ${artwork.isAvailable}
	}`;
		})
		.join(',\n');

	const content = `// Auto-generated artwork data - ${timestamp}
// This file is automatically generated from images in src/lib/assets/images/
// To regenerate, run: npm run generate:artwork-data

import type { Artwork } from '$lib/types/artwork';

export const artworkData: Artwork[] = [
${artworksTs}
];

// Helper functions
export function getArtworkById(id: string): Artwork | undefined {
	return artworkData.find((artwork) => artwork.id === id);
}

export function getArtworksByCategory(category: string): Artwork[] {
	return artworkData.filter((artwork) => artwork.category === category);
}

export function getAvailableCategories(): string[] {
	const categories = new Set(artworkData.map((artwork) => artwork.category));
	return Array.from(categories).sort();
}

export function getRandomArtwork(): Artwork {
	const randomIndex = Math.floor(Math.random() * artworkData.length);
	return artworkData[randomIndex];
}
`;

	return content;
}

function main() {
	console.log('🚀 Starting artwork data generation...');

	try {
		const artworks = generateArtworkData();

		if (artworks.length === 0) {
			console.error('❌ No artwork data generated');
			process.exit(1);
		}

		console.log(`\n📊 Summary:`);
		console.log(`   - Total artworks: ${artworks.length}`);
		console.log(
			`   - Total image variants: ${artworks.reduce((sum, a) => sum + a.images.length, 0)}`
		);

		const content = generateTypeScriptFile(artworks);
		const outputPath = path.join(OUTPUT_DIR, 'artworkData.ts');

		fs.writeFileSync(outputPath, content, 'utf8');

		console.log(`\n✅ Artwork data generated successfully!`);
		console.log(`📄 Output file: ${outputPath}`);
		console.log(`\n💡 The generated data includes:`);
		console.log(`   - Random descriptions for each artwork`);
		console.log(`   - Random prices, years, and dimensions`);
		console.log(`   - Random categories for variety`);
		console.log(`   - Image paths compatible with artworkImporter.ts`);
	} catch (error) {
		console.error('❌ Error generating artwork data:', error.message);
		process.exit(1);
	}
}

main();
