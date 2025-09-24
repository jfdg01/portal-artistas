/**
 * TypeScript interfaces for the Gallery application
 */

export interface ImageVariant {
	name: string; // e.g., "main", "zoom-1", "zoom-2"
	thumbnailUrl: string; // 320px version
	fullUrl: string; // 1440px version
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
