/**
 * Mock data for the Gallery application
 * Provides sample artwork data for development and testing
 */

import type { Artwork } from '$lib/types/artwork';

// Simple image URL helpers (currently unused but kept for future use)
// function getImageUrl(base: string): string {
// 	return `/images/${base}-1280w.webp`;
// }

// function getThumbnailUrl(base: string): string {
// 	return `/images/thumbnails/${base}-320w.webp`;
// }

export const mockArtworks: Artwork[] = [
	{
		id: '1',
		title: 'Notional',
		description: 'Oil on canvas exploring color fields and structure.',
		price: 450,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
		year: 2023,
		dimensions: { width: 65, height: 45, unit: 'cm' },
		category: 'Surreal',
		isAvailable: true,
		createdAt: new Date('2023-07-30'),
		updatedAt: new Date('2023-07-30')
	},
	{
		id: '11',
		title: 'Untitled Abstract',
		// No description
		// No price or currency
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
		// No year
		// No dimensions
		category: 'Abstract',
		isAvailable: true,
		createdAt: new Date('2023-08-15'),
		updatedAt: new Date('2023-08-15')
	},
	{
		id: '12',
		title: 'Mystery Portrait',
		description: 'A mysterious portrait with unknown origins.',
		price: 350,
		currency: 'USD',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
		year: 2020,
		// No dimensions
		category: 'Portrait',
		isAvailable: false,
		createdAt: new Date('2023-09-01'),
		updatedAt: new Date('2023-09-01')
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
