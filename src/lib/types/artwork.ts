/**
 * TypeScript interfaces for the Gallery application
 */

import type { Picture } from 'vite-imagetools';

export type { Picture };

export interface ImageVariant {
	name: string; // e.g., "main", "zoom-1", "zoom-2"
	picture: Picture; // Enhanced image URL from @sveltejs/enhanced-img
}

export interface Artwork {
	id: string;
	title: string;
	description?: string;
	price?: number;
	currency?: string; // 'EUR', 'USD', etc.
	images: ImageVariant[]; // All available image variants
	year?: number;
	dimensions?: {
		width: number;
		height: number;
		unit: string; // 'cm', 'in'
	};
	category: string;
	isAvailable: boolean;
}

export interface GalleryState {
	artworks: Artwork[];
	selectedArtwork: Artwork | null;
}
