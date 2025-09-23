<!--
@component ArtworkGrid
@description Grid layout component for displaying artworks in a responsive grid
@example
  <ArtworkGrid artworks={filteredArtworks} on:artworkClick={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import ArtworkCard from './ArtworkCard.svelte';
	import { t } from 'svelte-i18n';

	/**
	 * @prop {Artwork[]} artworks - Array of artworks to display
	 * @prop {function} [onartworkClick] - Click handler for artwork selection
	 */
	let {
		artworks,
		onartworkClick
	}: {
		artworks: Artwork[];
		onartworkClick?: (artwork: Artwork) => void;
	} = $props();

	/**
	 * @event artworkClick - Fired when an artwork is clicked
	 */

	function handleArtworkClick(artwork: Artwork) {
		if (onartworkClick) {
			onartworkClick(artwork);
		}
	}
</script>

{#if artworks.length === 0}
	<!-- Empty State -->
	<div class="text-center py-12">
		<div class="mx-auto h-24 w-24 text-gray-400 mb-4">
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				></path>
			</svg>
		</div>
		<h3 class="text-lg font-medium text-gray-900 mb-2">{$t('noArtworksTitle')}</h3>
		<p class="text-gray-500">{$t('noArtworksHint')}</p>
	</div>
{:else}
	<!-- Grid Layout -->
	<div
		class="artwork-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
	>
		{#each artworks as artwork (artwork.id)}
			<ArtworkCard {artwork} onclick={handleArtworkClick} />
		{/each}
	</div>

	<!-- Results Count -->
	<div class="mt-8 text-center">
		<p class="text-sm text-gray-500">
			{$t('showingCount', { values: { count: artworks.length } })}
		</p>
	</div>
{/if}
