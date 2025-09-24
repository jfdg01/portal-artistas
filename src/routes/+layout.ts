import { waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

export async function load({ url }) {
	// Determine the locale from URL params, localStorage, or default to 'es'
	let locale = 'es'; // Default locale

	if (browser) {
		// In browser, check URL params and localStorage
		const fromUrl = url.searchParams.get('lang');
		const fromStorage = localStorage.getItem('lang');
		const fallback = (navigator.language || 'es').slice(0, 2);
		locale = (fromUrl || fromStorage || fallback) as 'en' | 'es' | 'fr' | 'de';
	} else {
		// During SSR, use URL params or default
		locale = (url.searchParams.get('lang') || 'es') as 'en' | 'es' | 'fr' | 'de';
	}

	// Wait for the locale to be loaded before proceeding
	await waitLocale(locale);

	return {
		locale
	};
}
