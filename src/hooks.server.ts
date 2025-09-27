import type { Handle } from '@sveltejs/kit';

/**
 * Server-side hooks for security headers and other global configurations
 * This serves as a fallback if Vercel headers configuration is not available
 */
export const handle: Handle = async ({ event, resolve }) => {
	// Get the response from the request
	const response = await resolve(event);

	// Add security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// Only add HSTS header for HTTPS requests
	if (event.url.protocol === 'https:') {
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);
	}

	// Add cache control for static assets (images)
	if (event.url.pathname.startsWith('/images/') && event.url.pathname.endsWith('.webp')) {
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}

	// Add cache control for HTML pages
	if (event.url.pathname === '/' || event.url.pathname.startsWith('/artwork/')) {
		response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
	}

	return response;
};
