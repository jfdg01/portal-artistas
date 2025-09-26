#!/usr/bin/env node

/**
 * Script to generate artwork data from existing artworkImages.ts
 * This script reads artworkImages.ts and creates/updates artworkData.ts
 * It preserves existing data and only adds new artworks that don't exist
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Paths
const outputPath = path.join(projectRoot, 'src', 'lib', 'data');
const imagesFilePath = path.join(outputPath, 'artworkImages.ts');
const dataFilePath = path.join(outputPath, 'artworkData.ts');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath, { recursive: true });
}

/**
 * Generate categories based on artwork ID patterns
 * Only uses: dibujo, pintura, acuarela, grabado, apunte
 */
function generateCategories(id) {
	const categories = [];

	// Check for specific patterns
	if (id.includes('apunte')) {
		categories.push('apunte');
	}
	if (id.includes('acuarela')) {
		categories.push('acuarela');
	}
	if (id.includes('acrilico') || id.includes('pintura') || id.includes('oleo')) {
		categories.push('pintura');
	}
	if (
		id.includes('grafito') ||
		id.includes('sanguina') ||
		id.includes('carbon') ||
		id.includes('lapiz')
	) {
		categories.push('dibujo');
	}
	if (id.includes('grabado') || id.includes('linoleo') || id.includes('xilografia')) {
		categories.push('grabado');
	}

	// Default to 'acuarela' if no specific category found
	if (categories.length === 0) {
		categories.push('acuarela');
	}

	return [...new Set(categories)]; // Remove duplicates
}

/**
 * Generate dimensions based on artwork type
 */
function generateDimensions() {
	// Default dimensions
	let width = 50;
	let height = 70;

	return { width, height, unit: 'cm' };
}

/**
 * Generate a title from artwork ID
 * Converts "estudio-acuarela-1" to "Estudio Acuarela 1"
 */
function generateTitle(id) {
	return id
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

/**
 * Parse existing artworkData.ts to extract existing artworks
 */
function parseExistingData() {
	if (!fs.existsSync(dataFilePath)) {
		return new Map();
	}

	try {
		const content = fs.readFileSync(dataFilePath, 'utf8');
		const artworks = new Map();

		// Extract artwork objects using regex
		const artworkRegex = /{\s*id:\s*'([^']+)',[\s\S]*?}/g;
		let match;

		while ((match = artworkRegex.exec(content)) !== null) {
			const id = match[1];
			artworks.set(id, true); // Just track that it exists
		}

		return artworks;
	} catch {
		console.warn('⚠️  Could not parse existing artworkData.ts, will create new file');
		return new Map();
	}
}

/**
 * Read artworkImages.ts to get available artwork IDs
 */
function getAvailableArtworkIds() {
	if (!fs.existsSync(imagesFilePath)) {
		console.error('❌ artworkImages.ts not found. Run "npm run generate-artwork-images" first.');
		process.exit(1);
	}

	try {
		const content = fs.readFileSync(imagesFilePath, 'utf8');
		const artworkIds = [];

		// Extract artwork IDs from the artworkImages object
		const idRegex = /'([^']+)':\s*\[/g;
		let match;

		while ((match = idRegex.exec(content)) !== null) {
			artworkIds.push(match[1]);
		}

		return artworkIds;
	} catch (error) {
		console.error('❌ Could not read artworkImages.ts:', error.message);
		process.exit(1);
	}
}

/**
 * Generate artwork data entry
 */
function generateArtworkEntry(id) {
	const categories = generateCategories(id);
	const dimensions = generateDimensions();
	const title = generateTitle(id);

	return `\t{
\t\tid: '${id}',
\t\ttitle: '${title}',
\t\tdescription: '', // TODO: Add description
\t\timages: artworkImages['${id}'],
\t\tyear: 2023, // TODO: Update year
\t\tdimensions: { width: ${dimensions.width}, height: ${dimensions.height}, unit: '${dimensions.unit}' },
\t\tcategory: [${categories.map((cat) => `'${cat}'`).join(', ')}],
\t\tisAvailable: false
\t}`;
}

/**
 * Generate or update artworkData.ts file
 */
function generateArtworkData() {
	const existingArtworks = parseExistingData();
	const availableIds = getAvailableArtworkIds();

	// Find new artworks that don't exist in the data file
	const newArtworkIds = availableIds.filter((id) => !existingArtworks.has(id));

	if (newArtworkIds.length === 0) {
		console.log(
			'✅ No new artworks to add. All artworks in artworkImages.ts already exist in artworkData.ts'
		);
		return;
	}

	console.log(`📝 Found ${newArtworkIds.length} new artworks to add:`);
	newArtworkIds.forEach((id) => console.log(`   - ${generateTitle(id)} (${id})`));

	// Generate new artwork entries
	const newEntries = newArtworkIds.map((id) => generateArtworkEntry(id));

	// Read existing content
	let existingContent = '';
	if (fs.existsSync(dataFilePath)) {
		existingContent = fs.readFileSync(dataFilePath, 'utf8');
	}

	let newContent;
	if (existingContent) {
		// Insert new entries before the closing bracket
		const insertIndex = existingContent.lastIndexOf('];');
		if (insertIndex === -1) {
			console.error('❌ Could not find insertion point in existing artworkData.ts');
			process.exit(1);
		}

		const beforeInsert = existingContent.substring(0, insertIndex);
		const afterInsert = existingContent.substring(insertIndex);

		// Add comma if there are existing entries
		const needsComma = beforeInsert.trim().endsWith('}') && !beforeInsert.trim().endsWith('[]');
		const comma = needsComma ? ',' : '';

		newContent = beforeInsert + comma + '\n' + newEntries.join(',\n') + '\n' + afterInsert;
	} else {
		// Create new file
		newContent = `/**
 * Artwork metadata
 * This file contains artwork metadata that can be manually edited
 * Images are automatically loaded from artworkImages.ts
 */

import type { Artwork } from '$lib/types/artwork';
import { artworkImages } from './artworkImages';

export const artworkData: Artwork[] = [
${newEntries.join(',\n')}
];
`;
	}

	fs.writeFileSync(dataFilePath, newContent);
	console.log('✅ Updated artworkData.ts with new artworks');
}

/**
 * Main execution
 */
function main() {
	console.log('📊 Generating artwork data from artworkImages.ts...');

	try {
		generateArtworkData();
		console.log('✨ Artwork data generation complete!');
		console.log(
			'📝 You can now edit src/lib/data/artworkData.ts to add descriptions, update years, etc.'
		);
	} catch (error) {
		console.error('❌ Error generating artwork data:', error);
		process.exit(1);
	}
}

main();
