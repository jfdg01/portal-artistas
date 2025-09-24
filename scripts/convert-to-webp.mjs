#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Script to convert images to WebP format with 95% quality and 4K max resolution
 * This script processes all images in the source directory and converts them to WebP
 */

const SOURCE_IMAGES_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images');
const BACKUP_DIR = path.join(process.cwd(), 'src', 'lib', 'assets', 'images', 'backup');
const MAX_DIMENSION = 4096; // 4K max resolution
const WEBP_QUALITY = 75;

// Supported input image extensions
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function ensureBackupDir() {
	if (!fs.existsSync(BACKUP_DIR)) {
		fs.mkdirSync(BACKUP_DIR, { recursive: true });
		console.log(`📁 Created backup directory: ${BACKUP_DIR}`);
	}
}

function getImageFiles() {
	if (!fs.existsSync(SOURCE_IMAGES_DIR)) {
		console.error(`❌ Source images directory not found: ${SOURCE_IMAGES_DIR}`);
		process.exit(1);
	}

	const files = fs.readdirSync(SOURCE_IMAGES_DIR).filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return SUPPORTED_EXTENSIONS.has(ext) && !file.startsWith('.');
	});

	return files;
}

function getWebPFileName(originalFileName) {
	const baseName = path.basename(originalFileName, path.extname(originalFileName));
	return `${baseName}.webp`;
}

async function processImage(fileName, forceMode = false) {
	const inputPath = path.join(SOURCE_IMAGES_DIR, fileName);
	const webpFileName = getWebPFileName(fileName);
	const outputPath = path.join(SOURCE_IMAGES_DIR, webpFileName);
	const backupPath = path.join(BACKUP_DIR, fileName);

	// Check if WebP file already exists (unless force mode is enabled)
	if (!forceMode && fs.existsSync(outputPath)) {
		console.log(`\n⏭️  Skipping: ${fileName} (WebP already exists: ${webpFileName})`);
		return null;
	}

	// If force mode and WebP exists, show that we're overwriting
	if (forceMode && fs.existsSync(outputPath)) {
		console.log(`\n🔄 Force mode: Overwriting existing WebP file: ${webpFileName}`);
	}

	try {
		// Get image metadata
		const metadata = await sharp(inputPath).metadata();
		console.log(`\n🖼️  Processing: ${fileName}`);
		console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

		// Calculate new dimensions if needed
		let newWidth = metadata.width;
		let newHeight = metadata.height;

		if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
			const aspectRatio = metadata.width / metadata.height;
			if (metadata.width > metadata.height) {
				newWidth = MAX_DIMENSION;
				newHeight = Math.round(MAX_DIMENSION / aspectRatio);
			} else {
				newHeight = MAX_DIMENSION;
				newWidth = Math.round(MAX_DIMENSION * aspectRatio);
			}
			console.log(`   Resizing to: ${newWidth}x${newHeight} (4K max)`);
		}

		// Handle WebP-to-WebP conversion with temporary file
		let tempPath = null;
		let finalOutputPath = outputPath;

		if (path.extname(fileName).toLowerCase() === '.webp') {
			// Create temporary file for WebP-to-WebP conversion
			tempPath = path.join(SOURCE_IMAGES_DIR, `temp_${webpFileName}`);
			finalOutputPath = tempPath;
		}

		// Convert to WebP
		await sharp(inputPath)
			.resize(newWidth, newHeight, {
				fit: 'inside',
				withoutEnlargement: true
			})
			.webp({ quality: WEBP_QUALITY })
			.toFile(finalOutputPath);

		// If we used a temp file, replace the original
		if (tempPath) {
			fs.renameSync(tempPath, outputPath);
		}

		// Get output file size
		const outputStats = fs.statSync(outputPath);
		const inputStats = fs.statSync(inputPath);
		const compressionRatio = (
			((inputStats.size - outputStats.size) / inputStats.size) *
			100
		).toFixed(1);

		console.log(`   ✅ Converted to: ${webpFileName}`);
		console.log(
			`   📊 Size: ${(outputStats.size / 1024 / 1024).toFixed(2)} MB (${compressionRatio}% smaller)`
		);

		// Backup original file
		fs.copyFileSync(inputPath, backupPath);
		console.log(`   💾 Backed up original to: backup/${fileName}`);

		// Remove original file
		fs.unlinkSync(inputPath);
		console.log(`   🗑️  Removed original: ${fileName}`);

		return {
			original: fileName,
			webp: webpFileName,
			originalSize: inputStats.size,
			webpSize: outputStats.size,
			compressionRatio: parseFloat(compressionRatio),
			dimensions: { width: newWidth, height: newHeight }
		};
	} catch (error) {
		console.error(`❌ Error processing ${fileName}:`, error.message);
		return null;
	}
}

async function convertImages(forceMode = false) {
	console.log('🚀 Starting image conversion to WebP...');
	console.log(`📁 Source directory: ${SOURCE_IMAGES_DIR}`);
	console.log(`💾 Backup directory: ${BACKUP_DIR}`);
	console.log(`🎯 Target quality: ${WEBP_QUALITY}%`);
	console.log(`📏 Max resolution: ${MAX_DIMENSION}x${MAX_DIMENSION}`);
	if (forceMode) {
		console.log(`🔄 Force mode: Will overwrite existing WebP files`);
	}

	// Ensure backup directory exists
	ensureBackupDir();

	// Get all image files
	const imageFiles = getImageFiles();

	if (imageFiles.length === 0) {
		console.log('ℹ️  No images found to convert');
		return;
	}

	console.log(`\n📊 Found ${imageFiles.length} images to convert:`);
	imageFiles.forEach((file) => console.log(`   - ${file}`));

	const results = [];
	let successCount = 0;
	let skippedCount = 0;
	let totalOriginalSize = 0;
	let totalWebpSize = 0;

	console.log('\n🔄 Starting conversion process...');

	for (const fileName of imageFiles) {
		const result = await processImage(fileName, forceMode);
		if (result) {
			results.push(result);
			successCount++;
			totalOriginalSize += result.originalSize;
			totalWebpSize += result.webpSize;
		} else {
			skippedCount++;
		}
	}

	// Summary
	console.log('\n📊 Conversion Summary:');
	console.log(`   ✅ Successfully converted: ${successCount}/${imageFiles.length} images`);
	console.log(`   ⏭️  Skipped (already exist): ${skippedCount}/${imageFiles.length} images`);
	console.log(`   📁 Original total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
	console.log(`   📁 WebP total size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
	console.log(
		`   💾 Space saved: ${((totalOriginalSize - totalWebpSize) / 1024 / 1024).toFixed(2)} MB`
	);
	console.log(
		`   📈 Average compression: ${(((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1)}%`
	);

	if (results.length > 0) {
		console.log('\n📋 Conversion Details:');
		results.forEach((result) => {
			console.log(
				`   ${result.original} → ${result.webp} (${result.dimensions.width}x${result.dimensions.height}, ${result.compressionRatio}% smaller)`
			);
		});
	}

	console.log('\n✅ Image conversion completed!');
	console.log(`💾 Original files backed up in: ${BACKUP_DIR}`);
	console.log('💡 You can now update your artwork data to reference .webp files');
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
	console.log(`
WebP Conversion Script

Usage: node scripts/convert-to-webp.mjs [options]

Options:
  --help, -h     Show this help message
  --dry-run      Show what would be converted without actually converting
  --force        Overwrite existing WebP files (useful for quality changes)

This script will:
- Convert all .jpg, .jpeg, and .png files to .webp format
- Use 75% quality for WebP compression
- Resize images to maximum 4K resolution (4096x4096) while maintaining aspect ratio
- Backup original files to a 'backup' subdirectory
- Remove original files after successful conversion
- Skip existing WebP files unless --force is used
- Show detailed conversion statistics

Examples:
  node scripts/convert-to-webp.mjs
  node scripts/convert-to-webp.mjs --force
  node scripts/convert-to-webp.mjs --dry-run
  node scripts/convert-to-webp.mjs --dry-run --force
  npm run convert:webp
`);
	process.exit(0);
}

if (args.includes('--dry-run')) {
	console.log('🔍 Dry run mode - showing what would be converted:');
	const imageFiles = getImageFiles();
	const forceMode = args.includes('--force');
	console.log(`Found ${imageFiles.length} images to process:`);
	if (forceMode) {
		console.log(`🔄 Force mode: Will overwrite existing WebP files`);
	}

	let wouldConvert = 0;
	let wouldSkip = 0;

	imageFiles.forEach((file) => {
		const webpFileName = getWebPFileName(file);
		const outputPath = path.join(SOURCE_IMAGES_DIR, webpFileName);

		if (!forceMode && fs.existsSync(outputPath)) {
			console.log(`   ⏭️  ${file} → ${webpFileName} (SKIP - already exists)`);
			wouldSkip++;
		} else if (forceMode && fs.existsSync(outputPath)) {
			console.log(`   🔄 ${file} → ${webpFileName} (OVERWRITE - force mode)`);
			wouldConvert++;
		} else {
			console.log(`   ✅ ${file} → ${webpFileName} (CONVERT)`);
			wouldConvert++;
		}
	});

	console.log(`\n📊 Dry run summary:`);
	console.log(`   ✅ Would convert: ${wouldConvert} images`);
	console.log(`   ⏭️  Would skip: ${wouldSkip} images`);
	process.exit(0);
}

// Run the conversion
const forceMode = args.includes('--force');
convertImages(forceMode).catch((error) => {
	console.error('❌ Conversion failed:', error.message);
	process.exit(1);
});
