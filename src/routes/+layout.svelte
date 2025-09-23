<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setGalleryState } from '$lib/GalleryState.svelte';
	import { mockArtworks } from '$lib/utils/mockData';
	import '$lib/i18n';
	import { locale } from 'svelte-i18n';

	let { children } = $props();

	// Set up global gallery state
	const galleryState = setGalleryState();

	// Load mock data
	galleryState.setArtworks(mockArtworks);

	// One-time language initialization (URL > localStorage > navigator)
	$effect.pre(() => {
		try {
			const url = new URL(location.href);
			const fromUrl = url.searchParams.get('lang');
			const fromStorage = localStorage.getItem('lang');
			const fallback = (navigator.language || 'en').slice(0, 2);
			const lang = (fromUrl || fromStorage || fallback) as 'en' | 'es' | 'fr' | 'de';
			locale.set(lang);
			localStorage.setItem('lang', lang);
		} catch {
			// no-op in non-browser contexts
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
	{@render children?.()}
</div>
