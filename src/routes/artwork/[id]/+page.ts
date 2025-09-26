import type { PageLoad } from './$types';
import { artworkData } from '$lib/data/artworkData';

export const load: PageLoad = async ({ params }) => {
	const artwork = artworkData.find((artwork) => artwork.id === params.id);

	if (!artwork) {
		throw new Error('Artwork not found');
	}

	return {
		artwork
	};
};
