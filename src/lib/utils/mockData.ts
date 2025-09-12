/**
 * Mock data for the Gallery application
 * Provides sample artwork data for development and testing
 */

import type { Artwork } from '$lib/types/artwork';

export const mockArtworks: Artwork[] = [
	{
		id: '1',
		title: 'Sunset Over Mountains',
		description:
			'A beautiful landscape painting capturing the golden hour over rolling mountain ranges. The warm colors of the setting sun create a peaceful and serene atmosphere.',
		price: 450,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Urban Reflections',
		description:
			'An abstract interpretation of city life through the lens of water reflections. Bold colors and dynamic shapes capture the energy of urban environments.',
		price: 320,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Portrait of Wisdom',
		description:
			"A detailed portrait capturing the depth of human experience. The subject's eyes tell a story of a life well-lived, with every wrinkle and expression carefully rendered.",
		price: 680,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Ocean Waves',
		description:
			'A powerful seascape showing the raw energy of ocean waves crashing against rocky shores. The painting captures the movement and sound of the sea.',
		price: 520,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Geometric Harmony',
		description:
			'A modern abstract composition exploring the relationship between geometric shapes and color. The piece creates visual tension and balance through careful arrangement.',
		price: 280,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Forest Path',
		description:
			'A peaceful woodland scene showing a winding path through ancient trees. The dappled sunlight creates a magical atmosphere in this serene forest setting.',
		price: 380,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Still Life with Flowers',
		description:
			'A vibrant still life featuring a bouquet of seasonal flowers in a ceramic vase. The painting celebrates the beauty of everyday objects and natural forms.',
		price: 250,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'City Lights at Night',
		description:
			'An impressionistic view of a city at night, with glowing windows and streetlights creating patterns of light and shadow. The painting captures the energy of urban nightlife.',
		price: 420,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Dancing Figures',
		description:
			'A dynamic composition showing figures in motion, capturing the joy and energy of dance. The flowing lines and vibrant colors convey movement and emotion.',
		price: 350,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
		title: 'Desert Mirage',
		description:
			'A surreal landscape depicting the optical illusion of water in a desert. The painting explores themes of perception and the boundary between reality and illusion.',
		price: 480,
		currency: 'EUR',
		imageUrl: '/sample.png',
		thumbnailUrl: '/sample.png',
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
