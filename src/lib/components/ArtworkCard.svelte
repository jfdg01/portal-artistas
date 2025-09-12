<!--
@component ArtworkCard
@description Displays an individual artwork with image, title, artist, and price
@example
  <ArtworkCard {artwork} on:click={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { Eye, Euro } from 'lucide-svelte';

	/**
	 * @prop {Artwork} artwork - The artwork object to display
	 * @prop {boolean} [showPrice=true] - Whether to show the price
	 * @prop {string} [size='medium'] - Size variant: 'small' | 'medium' | 'large'
	 * @prop {function} [onclick] - Click handler function
	 */
	let {
		artwork,
		showPrice = true,
		size = 'medium',
		onclick
	}: {
		artwork: Artwork;
		showPrice?: boolean;
		size?: 'small' | 'medium' | 'large';
		onclick?: (artwork: Artwork) => void;
	} = $props();

	/**
	 * @event click - Fired when the artwork card is clicked
	 */

	// Size-based styling
	const sizeClasses = {
		small: 'p-2',
		medium: 'p-4',
		large: 'p-6'
	};

	const imageSizeClasses = {
		small: 'h-32',
		medium: 'h-48',
		large: 'h-64'
	};

	function handleClick() {
		if (onclick) {
			onclick(artwork);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	class="artwork-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 {sizeClasses[
		size
	]}"
	onclick={handleClick}
	onkeydown={handleKeydown}
	tabindex="0"
	role="button"
	aria-label="View details for {artwork.title} by {artwork.artist}"
>
	<!-- Image Container -->
	<div class="relative mb-3 overflow-hidden rounded-lg">
		<img
			src={artwork.thumbnailUrl}
			alt="{artwork.title} by {artwork.artist}"
			class="w-full {imageSizeClasses[
				size
			]} object-cover transition-transform duration-300 hover:scale-110"
			loading="lazy"
		/>

		<!-- Overlay on hover -->
		<div
			class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
		>
			<Eye class="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
		</div>

		<!-- Availability Badge -->
		{#if !artwork.isAvailable}
			<div
				class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
			>
				Sold
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="space-y-2">
		<!-- Title -->
		<h3 class="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
			{artwork.title}
		</h3>

		<!-- Artist -->
		<p class="text-gray-600 text-sm">
			by {artwork.artist}
		</p>

		<!-- Category -->
		<span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
			{artwork.category}
		</span>

		<!-- Price -->
		{#if showPrice}
			<div class="flex items-center gap-1 text-lg font-bold text-gray-900">
				<Euro class="w-4 h-4" />
				<span>{artwork.price}</span>
				<span class="text-sm text-gray-500">{artwork.currency}</span>
			</div>
		{/if}

		<!-- Dimensions -->
		<p class="text-xs text-gray-500">
			{artwork.dimensions.width} × {artwork.dimensions.height}
			{artwork.dimensions.unit}
		</p>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
