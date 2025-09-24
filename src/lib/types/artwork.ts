/**
 * TypeScript interfaces for the Gallery application
 */

export interface Artwork {
	id: string;
	title: string;
	description?: string;
	price?: number;
	currency?: string; // 'EUR', 'USD', etc.
	imageUrl: string;
	thumbnailUrl: string;
	year?: number;
	dimensions?: {
		width: number;
		height: number;
		unit: string; // 'cm', 'in'
	};
	category: string;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface GalleryState {
	artworks: Artwork[];
	selectedArtwork: Artwork | null;
}
