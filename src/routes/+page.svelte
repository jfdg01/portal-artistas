<!--
@component GalleryPage
@description Main gallery page displaying artworks
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import type { Artwork } from '$lib/types/artwork';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
	import ArtworkGrid from '$lib/components/ArtworkGrid.svelte';
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

<div class=" min-h-screen">
	<!-- Header -->
	<GalleryHeader />

	<!-- Main Content -->
	<main
		class="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-screen-lg xl:max-w-[1200px] 2xl:max-w-[1400px] py-6 md:py-8"
	>
		<!-- Gallery Content -->
		<div class="w-full">
			<ArtworkGrid artworks={galleryState.filteredArtworks} onartworkClick={handleArtworkClick} />
		</div>
	</main>

	<!-- Modal -->
	<ArtworkModal artwork={galleryState.selectedArtwork} onclose={handleCloseModal} />
</div>
