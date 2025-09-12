<!--
@component GalleryPage
@description Main gallery page displaying artworks with search, filtering, and view modes
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import type { Artwork } from '$lib/types/artwork';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
	import ArtworkList from '$lib/components/ArtworkList.svelte';
	import ArtworkModal from '$lib/components/ArtworkModal.svelte';

	// Get shared gallery state
	const galleryState = getGalleryState();

	function handleArtworkClick(artwork: Artwork) {
		galleryState.selectArtwork(artwork);
	}

	function handleCloseModal() {
		galleryState.selectArtwork(null);
	}
</script>

<svelte:head>
	<title>Art Gallery - Discover Beautiful Artworks</title>
	<meta
		name="description"
		content="Browse our collection of beautiful artworks from talented artists around the world."
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<GalleryHeader />

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Gallery Content -->
		<div class="w-full">
			{#if galleryState.viewMode === 'grid'}
				<ArtworkGrid artworks={galleryState.filteredArtworks} onartworkClick={handleArtworkClick} />
			{:else}
				<ArtworkList artworks={galleryState.filteredArtworks} onartworkClick={handleArtworkClick} />
			{/if}
		</div>
	</main>

	<!-- Modal -->
	<ArtworkModal artwork={galleryState.selectedArtwork} onclose={handleCloseModal} />
</div>
