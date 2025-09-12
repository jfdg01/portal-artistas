<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { setGalleryState } from '$lib/GalleryState.svelte';
	import { mockArtworks } from '$lib/utils/mockData';

	let { children } = $props();

	// Set up global gallery state
	const galleryState = setGalleryState();

	// Load mock data
	galleryState.setArtworks(mockArtworks);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
