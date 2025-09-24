<!--
@component ArtworkCard
@description Displays an individual artwork with image, title, artist, and price
@example
  <ArtworkCard {artwork} on:click={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { Eye, Euro } from 'lucide-svelte';
	import { t } from 'svelte-i18n';

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

	// Size-based styling for content padding
	const sizeClasses = {
		small: 'p-3 xs:p-3 md:p-4',
		medium: 'p-4 xs:p-4 md:p-5',
		large: 'p-5 xs:p-5 md:p-6'
	};

	// Use aspect ratios; height will follow container
	const imageSizeClasses = {
		small: 'aspect-[3/4]',
		medium: 'aspect-[3/4]',
		large: 'aspect-[3/4]'
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
	class="artwork-card group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50
    hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
	onclick={handleClick}
	onkeydown={handleKeydown}
	tabindex="0"
	role="button"
	aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
>
	<!-- Image Container - fills entire card -->
	<div class="relative overflow-hidden rounded-t-2xl">
		<img
			src={artwork.thumbnailUrl}
			alt={$t('artworkAlt', { values: { title: artwork.title } })}
			class="w-full {imageSizeClasses[
				size
			]} object-cover transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
		/>

		<!-- Overlay on hover -->
		<div
			class="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center"
		>
			<Eye
				class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			/>
		</div>

		<!-- Availability Badge -->
		{#if !artwork.isAvailable}
			<div
				class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
			>
				{$t('sold')}
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="space-y-2 {sizeClasses[size]}">
		<!-- Title -->
		<h3
			class="font-semibold text-gray-900 text-base xs:text-[17px] md:text-lg leading-tight line-clamp-2"
		>
			{artwork.title}
		</h3>

		<!-- Category -->
		<span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
			{artwork.category}
		</span>

		<!-- Price -->
		{#if showPrice && artwork.price && artwork.currency}
			<div class="flex items-center gap-1 text-lg font-bold text-gray-900">
				<Euro class="w-4 h-4" />
				<span>{artwork.price}</span>
				<span class="text-sm text-gray-500">{artwork.currency}</span>
			</div>
		{/if}

		<!-- Dimensions -->
		{#if artwork.dimensions}
			<p class="text-xs text-gray-500">
				{artwork.dimensions.width} × {artwork.dimensions.height}
				{artwork.dimensions.unit}
			</p>
		{/if}
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
