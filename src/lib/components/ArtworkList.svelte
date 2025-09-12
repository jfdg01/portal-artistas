<!--
@component ArtworkList
@description List layout component for displaying artworks in a vertical list format
@example
  <ArtworkList artworks={filteredArtworks} on:artworkClick={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { Eye, Euro } from 'lucide-svelte';

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

	function handleKeydown(event: KeyboardEvent, artwork: Artwork) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleArtworkClick(artwork);
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
		<h3 class="text-lg font-medium text-gray-900 mb-2">No artworks found</h3>
		<p class="text-gray-500">Try adjusting your search or filter criteria.</p>
	</div>
{:else}
	<!-- List Layout -->
	<div class="space-y-4">
		{#each artworks as artwork (artwork.id)}
			<div
				class="artwork-list-item bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] p-4"
				onclick={() => handleArtworkClick(artwork)}
				onkeydown={(e) => handleKeydown(e, artwork)}
				tabindex="0"
				role="button"
				aria-label="View details for {artwork.title} by {artwork.artist}"
			>
				<div class="flex items-center space-x-4">
					<!-- Thumbnail -->
					<div class="flex-shrink-0 relative">
						<img
							src={artwork.thumbnailUrl}
							alt="{artwork.title} by {artwork.artist}"
							class="w-20 h-20 object-cover rounded-lg"
							loading="lazy"
						/>
						{#if !artwork.isAvailable}
							<div
								class="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-semibold"
							>
								Sold
							</div>
						{/if}
					</div>

					<!-- Content -->
					<div class="flex-1 min-w-0">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3 class="text-lg font-semibold text-gray-900 truncate">
									{artwork.title}
								</h3>
								<p class="text-sm text-gray-600">
									by {artwork.artist}
								</p>
								<p class="text-sm text-gray-500 mt-1 line-clamp-2">
									{artwork.description}
								</p>
							</div>

							<!-- Price and Actions -->
							<div class="flex items-center space-x-4 ml-4">
								<div class="text-right">
									<div class="flex items-center gap-1 text-lg font-bold text-gray-900">
										<Euro class="w-4 h-4" />
										<span>{artwork.price}</span>
										<span class="text-sm text-gray-500">{artwork.currency}</span>
									</div>
									<p class="text-xs text-gray-500">
										{artwork.dimensions.width} × {artwork.dimensions.height}
										{artwork.dimensions.unit}
									</p>
								</div>

								<button
									class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
									aria-label="View details"
								>
									<Eye class="w-5 h-5" />
								</button>
							</div>
						</div>

						<!-- Category and Year -->
						<div class="flex items-center space-x-2 mt-2">
							<span
								class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
							>
								{artwork.category}
							</span>
							<span class="text-xs text-gray-500">
								{artwork.year}
							</span>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Results Count -->
	<div class="mt-8 text-center">
		<p class="text-sm text-gray-500">
			Showing {artworks.length}
			{artworks.length === 1 ? 'artwork' : 'artworks'}
		</p>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
