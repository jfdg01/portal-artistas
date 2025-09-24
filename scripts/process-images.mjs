#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Fixed resolutions and quality
const RESOLUTIONS = [1440, 320];
const QUALITY = 70;

// Supported input extensions
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png']);

function ensureDir(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

async function processOneImage(filePath, outputDir) {
	const ext = path.extname(filePath).toLowerCase();
	const base = path.basename(filePath, ext);

	// Generate images for each resolution
	for (const resolution of RESOLUTIONS) {
		const outputPath = path.join(outputDir, `${base}-${resolution}px.webp`);
		await sharp(filePath)
			.resize({ width: resolution, withoutEnlargement: true })
			.webp({ quality: QUALITY })
			.toFile(outputPath);
	}
}

function* walk(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const res = path.resolve(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walk(res);
		} else if (entry.isFile()) {
			yield res;
		}
	}
}

async function main() {
	const sourceDir = process.argv[2];
	if (!sourceDir) {
		console.error('Usage: node scripts/process-images.mjs <sourceDir>');
		process.exit(1);
	}

	if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
		console.error(`Source directory not found: ${sourceDir}`);
		process.exit(1);
	}

	// Create processed subfolder inside the source directory
	const outputDir = path.join(sourceDir, 'processed');
	ensureDir(outputDir);

	const files = Array.from(walk(sourceDir)).filter((f) =>
		INPUT_EXTS.has(path.extname(f).toLowerCase())
	);
	if (files.length === 0) {
		console.warn('No input images found. Supported: .jpg, .jpeg, .png, .webp, .tiff');
		return;
	}

	console.log(`Processing ${files.length} images from: ${sourceDir}`);
	console.log(`Output directory: ${outputDir}`);

	for (const file of files) {
		try {
			await processOneImage(file, outputDir);
			console.log(`✔ Processed: ${path.basename(file)}`);
		} catch (err) {
			console.error(`✖ Failed: ${file}\n${err.stack || err}`);
		}
	}

	console.log('Done! Processed images saved to:', outputDir);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
