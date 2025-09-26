import type { RequestHandler } from '@sveltejs/kit';
import { artworkData } from '$lib/data/artworkData';

// Base URL - update this to your actual domain
const baseUrl = 'https://cardenaspacheco.es';

export const GET: RequestHandler = async () => {
	// Static routes
	const staticRoutes = [
		{
			url: '',
			changefreq: 'weekly',
			priority: '1.0',
			lastmod: new Date().toISOString().split('T')[0]
		},
		{
			url: '/contact',
			changefreq: 'monthly',
			priority: '0.8',
			lastmod: new Date().toISOString().split('T')[0]
		},
		{
			url: '/clases-online',
			changefreq: 'monthly',
			priority: '0.7',
			lastmod: new Date().toISOString().split('T')[0]
		}
	];

	// Generate artwork routes
	const artworkRoutes = artworkData.map((artwork) => ({
		url: `/artwork/${artwork.id}`,
		changefreq: 'monthly',
		priority: '0.6',
		lastmod: new Date().toISOString().split('T')[0]
	}));

	// Combine all routes
	const allRoutes = [...staticRoutes, ...artworkRoutes];

	// Generate XML sitemap
	function generateSitemap(routes: typeof allRoutes) {
		const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
		const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
		const urlsetClose = '</urlset>';

		const urlEntries = routes
			.map((route) => {
				const fullUrl = `${baseUrl}${route.url}`;
				return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
			})
			.join('\n');

		return xmlHeader + urlsetOpen + urlEntries + '\n' + urlsetClose;
	}

	const sitemapXml = generateSitemap(allRoutes);

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
		}
	});
};
