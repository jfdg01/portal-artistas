#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurable output directories inside the SvelteKit static dir
const projectRoot = path.resolve(__dirname, '..');
const staticDir = path.join(projectRoot, 'static');
const outputMainDir = path.join(staticDir, 'images');
const outputThumbDir = path.join(outputMainDir, 'thumbnails');

// Default sizes
const THUMB_WIDTHS = [320, 640];
const MAIN_WIDTHS = [768, 1280, 1920, 2560];

// Supported input extensions
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff']);

function ensureDir(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(basename) {
	return basename
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

async function processOneImage(filePath, { quality = 78 }) {
	const ext = path.extname(filePath).toLowerCase();
	const base = path.basename(filePath, ext);
	const slug = slugify(base);

	const image = sharp(filePath, { failOn: 'none' });
	const metadata = await image.metadata();

	// Generate thumbnails
	for (const w of THUMB_WIDTHS) {
		const out = path.join(outputThumbDir, `${slug}-${w}w.webp`);
		await sharp(filePath)
			.resize({ width: w, withoutEnlargement: true, fit: 'cover' })
			.webp({ quality })
			.toFile(out);
	}

	// Generate main responsive sizes
	for (const w of MAIN_WIDTHS) {
		if (metadata.width && w > metadata.width) continue; // avoid upscaling
		const out = path.join(outputMainDir, `${slug}-${w}w.webp`);
		await sharp(filePath)
			.resize({ width: w, withoutEnlargement: true })
			.webp({ quality })
			.toFile(out);
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
	const qualityArg = process.argv[3];
	if (!sourceDir) {
		console.error('Usage: node scripts/process-images.mjs <sourceDir> [quality 1-100]');
		process.exit(1);
	}
	const quality = qualityArg ? Math.max(1, Math.min(100, parseInt(qualityArg, 10))) : 78;

	if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
		console.error(`Source directory not found: ${sourceDir}`);
		process.exit(1);
	}

	ensureDir(outputMainDir);
	ensureDir(outputThumbDir);

	const files = Array.from(walk(sourceDir)).filter((f) =>
		INPUT_EXTS.has(path.extname(f).toLowerCase())
	);
	if (files.length === 0) {
		console.warn('No input images found. Supported: .jpg, .jpeg, .png, .webp, .tiff');
		return;
	}

	console.log(`Processing ${files.length} images from: ${sourceDir}`);
	for (const file of files) {
		try {
			await processOneImage(file, { quality });
			console.log(`✔ Processed: ${file}`);
		} catch (err) {
			console.error(`✖ Failed: ${file}\n${err.stack || err}`);
		}
	}

	console.log('Done. Outputs:');
	console.log(` - Thumbnails: ${outputThumbDir}`);
	console.log(` - Main images: ${outputMainDir}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
