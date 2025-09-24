<!--
@component ArtworkCard
@description Displays an individual artwork with image, title, and price
@example
  <ArtworkCard {artwork} on:click={handleArtworkClick} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { Eye } from 'lucide-svelte';
	import { t } from 'svelte-i18n';

	/**
	 * @prop {Artwork} artwork - The artwork object to display
	 * @prop {function} [onclick] - Click handler function
	 */
	let {
		artwork,
		onclick
	}: {
		artwork: Artwork;
		onclick?: (artwork: Artwork) => void;
	} = $props();

	/**
	 * @event click - Fired when the artwork card is clicked
	 */

	// Simple image-only approach
	let imageElement: HTMLImageElement;

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

<!-- Simplified image-only card -->
<div
	class="artwork-card group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
	onclick={handleClick}
	onkeydown={handleKeydown}
	tabindex="0"
	role="button"
	aria-label={$t('viewDetailsFor', { values: { title: artwork.title } })}
>
	<img
		bind:this={imageElement}
		src={artwork.images[0].thumbnailUrl}
		alt={$t('artworkAlt', { values: { title: artwork.title } })}
		class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
		loading="lazy"
		onload={() => {}}
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
