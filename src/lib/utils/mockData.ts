/**
 * Mock data for the Gallery application
 * Provides sample artwork data for development and testing
 */

import type { Artwork } from '$lib/types/artwork';

// Helpers to build srcset strings based on existing processed assets
function buildImageSrcSet(base: string): string {
	// base like '/images/notional'
	return [768, 1280, 1920, 2560].map((w) => `/images/${base}-${w}w.webp ${w}w`).join(', ');
}

function buildThumbSrcSet(base: string): string {
	return [320, 640].map((w) => `/images/thumbnails/${base}-${w}w.webp ${w}w`).join(', ');
}

// Default sizes mapping our breakpoints from app.css
const defaultCardSizes =
	'(min-width: 1440px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 425px) 50vw, 100vw';

export const mockArtworks: Artwork[] = [
	{
		id: '1',
		title: 'Notional',
		description: 'Oil on canvas exploring color fields and structure.',
		price: 450,
		currency: 'EUR',
		imageUrl: '/images/notional-1280w.webp',
		imageSrcSet: buildImageSrcSet('notional'),
		thumbnailUrl: '/images/thumbnails/notional-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('notional'),
		sizes: defaultCardSizes,
		artist: 'María García',
		year: 2023,
		dimensions: { width: 60, height: 40, unit: 'cm' },
		category: 'Landscape',
		isAvailable: true,
		createdAt: new Date('2023-01-15'),
		updatedAt: new Date('2023-01-15')
	},
	{
		id: '2',
		title: 'Belong',
		description: 'Abstract composition reflecting place and identity.',
		price: 320,
		currency: 'EUR',
		imageUrl: '/images/belong-1280w.webp',
		imageSrcSet: buildImageSrcSet('belong'),
		thumbnailUrl: '/images/thumbnails/belong-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('belong'),
		sizes: defaultCardSizes,
		artist: 'James Chen',
		year: 2023,
		dimensions: { width: 50, height: 70, unit: 'cm' },
		category: 'Abstract',
		isAvailable: true,
		createdAt: new Date('2023-02-20'),
		updatedAt: new Date('2023-02-20')
	},
	{
		id: '3',
		title: 'Lilith',
		description: 'Figurative work with strong contrasts and symbolism.',
		price: 680,
		currency: 'EUR',
		imageUrl: '/images/lilith-1280w.webp',
		imageSrcSet: buildImageSrcSet('lilith'),
		thumbnailUrl: '/images/thumbnails/lilith-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('lilith'),
		sizes: defaultCardSizes,
		artist: 'Elena Rodriguez',
		year: 2022,
		dimensions: { width: 40, height: 50, unit: 'cm' },
		category: 'Portrait',
		isAvailable: false,
		createdAt: new Date('2022-11-10'),
		updatedAt: new Date('2022-11-10')
	},
	{
		id: '4',
		title: 'The Joke',
		description: 'Playful gesture and color, layered textures.',
		price: 520,
		currency: 'EUR',
		imageUrl: '/images/the-joke-1280w.webp',
		imageSrcSet: buildImageSrcSet('the-joke'),
		thumbnailUrl: '/images/thumbnails/the-joke-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('the-joke'),
		sizes: defaultCardSizes,
		artist: 'David Thompson',
		year: 2023,
		dimensions: { width: 80, height: 60, unit: 'cm' },
		category: 'Seascape',
		isAvailable: true,
		createdAt: new Date('2023-03-05'),
		updatedAt: new Date('2023-03-05')
	},
	{
		id: '5',
		title: 'Negra (detalle)',
		description: 'Detailed close-up with expressive brushwork.',
		price: 280,
		currency: 'EUR',
		imageUrl: '/images/negra-detalle-1280w.webp',
		imageSrcSet: buildImageSrcSet('negra-detalle'),
		thumbnailUrl: '/images/thumbnails/negra-detalle-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('negra-detalle'),
		sizes: defaultCardSizes,
		artist: 'Sophie Martin',
		year: 2023,
		dimensions: { width: 45, height: 45, unit: 'cm' },
		category: 'Abstract',
		isAvailable: true,
		createdAt: new Date('2023-04-12'),
		updatedAt: new Date('2023-04-12')
	},
	{
		id: '6',
		title: 'Grafito',
		description: 'Graphite study with tonal range and edges.',
		price: 380,
		currency: 'EUR',
		imageUrl: '/images/grafito-1280w.webp',
		imageSrcSet: buildImageSrcSet('grafito'),
		thumbnailUrl: '/images/thumbnails/grafito-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('grafito'),
		sizes: defaultCardSizes,
		artist: 'Anna Kowalski',
		year: 2022,
		dimensions: { width: 70, height: 50, unit: 'cm' },
		category: 'Landscape',
		isAvailable: true,
		createdAt: new Date('2022-12-08'),
		updatedAt: new Date('2022-12-08')
	},
	{
		id: '7',
		title: 'Estudio retrato',
		description: 'Portrait study highlighting planes and light.',
		price: 250,
		currency: 'EUR',
		imageUrl: '/images/estudio-retrato-1280w.webp',
		imageSrcSet: buildImageSrcSet('estudio-retrato'),
		thumbnailUrl: '/images/thumbnails/estudio-retrato-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('estudio-retrato'),
		sizes: defaultCardSizes,
		artist: 'Isabella Rossi',
		year: 2023,
		dimensions: { width: 35, height: 45, unit: 'cm' },
		category: 'Still Life',
		isAvailable: true,
		createdAt: new Date('2023-05-18'),
		updatedAt: new Date('2023-05-18')
	},
	{
		id: '8',
		title: 'Detalle estudio 3',
		description: 'Studio detail focusing on texture and color.',
		price: 420,
		currency: 'EUR',
		imageUrl: '/images/detalle-estudio-3-1280w.webp',
		imageSrcSet: buildImageSrcSet('detalle-estudio-3'),
		thumbnailUrl: '/images/thumbnails/detalle-estudio-3-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('detalle-estudio-3'),
		sizes: defaultCardSizes,
		artist: 'Michael Park',
		year: 2023,
		dimensions: { width: 60, height: 40, unit: 'cm' },
		category: 'Urban',
		isAvailable: true,
		createdAt: new Date('2023-06-22'),
		updatedAt: new Date('2023-06-22')
	},
	{
		id: '9',
		title: 'Apunte paisaje 5',
		description: 'Landscape sketch with gestural strokes.',
		price: 350,
		currency: 'EUR',
		imageUrl: '/images/apunte-paisaje-5-1280w.webp',
		imageSrcSet: buildImageSrcSet('apunte-paisaje-5'),
		thumbnailUrl: '/images/thumbnails/apunte-paisaje-5-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('apunte-paisaje-5'),
		sizes: defaultCardSizes,
		artist: 'Carlos Mendez',
		year: 2022,
		dimensions: { width: 55, height: 75, unit: 'cm' },
		category: 'Figurative',
		isAvailable: false,
		createdAt: new Date('2022-10-15'),
		updatedAt: new Date('2022-10-15')
	},
	{
		id: '10',
		title: 'Celebes Sea (detalle 1)',
		description: 'Detail study with marine palette.',
		price: 480,
		currency: 'EUR',
		imageUrl: '/images/celebes-sea-detalle-1-1280w.webp',
		imageSrcSet: buildImageSrcSet('celebes-sea-detalle-1'),
		thumbnailUrl: '/images/thumbnails/celebes-sea-detalle-1-320w.webp',
		thumbnailSrcSet: buildThumbSrcSet('celebes-sea-detalle-1'),
		sizes: defaultCardSizes,
		artist: 'Sarah Ahmed',
		year: 2023,
		dimensions: { width: 65, height: 45, unit: 'cm' },
		category: 'Surreal',
		isAvailable: true,
		createdAt: new Date('2023-07-30'),
		updatedAt: new Date('2023-07-30')
	}
];

// Helper function to get a random artwork
export function getRandomArtwork(): Artwork {
	const randomIndex = Math.floor(Math.random() * mockArtworks.length);
	return mockArtworks[randomIndex];
}

// Helper function to get artworks by category
export function getArtworksByCategory(category: string): Artwork[] {
	return mockArtworks.filter((artwork) => artwork.category === category);
}

// Helper function to get available categories
export function getAvailableCategories(): string[] {
	const categories = new Set(mockArtworks.map((artwork) => artwork.category));
	return Array.from(categories).sort();
}
