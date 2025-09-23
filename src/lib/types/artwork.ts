/**
 * TypeScript interfaces for the Gallery application
 */

export interface Artwork {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string; // 'EUR', 'USD', etc.
	imageUrl: string;
	thumbnailUrl: string;
	/** Optional responsive sources for main image */
	imageSrcSet?: string;
	/** Optional responsive sources for thumbnail */
	thumbnailSrcSet?: string;
	/** Optional sizes attribute shared by components */
	sizes?: string;
	artist: string;
	year: number;
	dimensions: {
		width: number;
		height: number;
		unit: string; // 'cm', 'in'
	};
	category: string;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface GalleryFilter {
	category?: string;
	priceRange?: [number, number];
	availableOnly?: boolean;
}

export interface GalleryState {
	artworks: Artwork[];
	selectedArtwork: Artwork | null;
	viewMode: 'grid' | 'list';
	filter: GalleryFilter;
	searchQuery: string;
}
