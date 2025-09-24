<!--
@component ArtworkModal
@description Modal component for displaying detailed artwork information
@example
  <ArtworkModal artwork={selectedArtwork} on:close={handleClose} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { X, Euro, Calendar, Ruler, Tag, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	/**
	 * @prop {Artwork | null} artwork - The artwork to display in the modal
	 * @prop {function} [onclose] - Close handler function
	 */
	let {
		artwork,
		onclose
	}: {
		artwork: Artwork | null;
		onclose?: () => void;
	} = $props();

	/**
	 * @event close - Fired when the modal should be closed
	 */

	// Current image index for cycling through variants
	let currentImageIndex = $state(0);

	// Computed values
	let currentImage = $derived(artwork?.images?.[currentImageIndex] || null);
	let hasMultipleImages = $derived(artwork && artwork.images ? artwork.images.length > 1 : false);

	function handleClose() {
		if (onclose) {
			onclose();
		}
		// Reset image index when closing
		currentImageIndex = 0;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		} else if (event.key === 'ArrowLeft' && hasMultipleImages) {
			event.preventDefault();
			previousImage();
		} else if (event.key === 'ArrowRight' && hasMultipleImages) {
			event.preventDefault();
			nextImage();
		}
	}

	function nextImage() {
		if (artwork && artwork.images && hasMultipleImages) {
			currentImageIndex = (currentImageIndex + 1) % artwork.images.length;
		}
	}

	function previousImage() {
		if (artwork && artwork.images && hasMultipleImages) {
			currentImageIndex =
				currentImageIndex === 0 ? artwork.images.length - 1 : currentImageIndex - 1;
		}
	}

	// Reset image index when artwork changes
	$effect(() => {
		if (artwork) {
			currentImageIndex = 0;
		}
	});

	// Helper function to create range for navigation dots
	function range(length: number): number[] {
		return Array.from({ length }, (_, i) => i);
	}

	// Focus management
	$effect(() => {
		if (artwork) {
			// Focus the modal when it opens
			const modal = document.querySelector('[data-modal]') as HTMLElement;
			if (modal) {
				modal.focus();
			}
		}
	});
</script>

{#if artwork}
	<!-- Modal Overlay -->
	<div
		class="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
	>
		<!-- Modal Content -->
		<div
			class="modal-overlay bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
			data-modal
			tabindex="-1"
			transition:fly={{ y: 50, duration: 300 }}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between p-4 md:p-6 border-b border-gray-200/60">
				<h2
					id="modal-title"
					class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
				>
					{artwork.title}
				</h2>
				<button
					onclick={handleClose}
					class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
					aria-label={$t('closeModal')}
				>
					<X class="w-6 h-6" />
				</button>
			</div>

			<!-- Modal Body -->
			<div class="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					<!-- Image Section -->
					<div class="space-y-4">
						<div class="relative">
							{#if currentImage && currentImage.fullUrl && typeof currentImage.fullUrl === 'string'}
								<img
									src={currentImage.fullUrl}
									alt={$t('artworkAlt', { values: { title: artwork.title } })}
									class="w-full h-auto rounded-lg shadow-md"
									fetchpriority="high"
								/>
							{:else}
								<div class="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
									<p class="text-gray-500">
										{#if !currentImage}
											No current image
										{:else if !currentImage.fullUrl}
											No fullUrl property
										{:else if typeof currentImage.fullUrl !== 'string'}
											Invalid fullUrl type: {typeof currentImage.fullUrl}
										{:else}
											No image available
										{/if}
									</p>
								</div>
							{/if}

							<!-- Navigation Controls -->
							{#if hasMultipleImages}
								<button
									onclick={previousImage}
									class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
									aria-label="Previous image"
								>
									<ChevronLeft class="w-6 h-6" />
								</button>

								<button
									onclick={nextImage}
									class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
									aria-label="Next image"
								>
									<ChevronRight class="w-6 h-6" />
								</button>
							{/if}

							{#if !artwork.isAvailable}
								<div
									class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
								>
									{$t('sold')}
								</div>
							{/if}
						</div>

						<!-- Image Navigation Dots -->
						{#if hasMultipleImages && artwork.images}
							<div class="flex justify-center space-x-2">
								{#each range(artwork.images.length) as index (index)}
									<button
										onclick={() => (currentImageIndex = index)}
										class="w-3 h-3 rounded-full transition-all duration-200 {currentImageIndex ===
										index
											? 'bg-blue-600'
											: 'bg-gray-300 hover:bg-gray-400'}"
										aria-label="View image {index + 1}"
									></button>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Details Section -->
					<div class="space-y-5 md:space-y-6">
						<!-- Price -->
						{#if artwork.price && artwork.currency}
							<div class="flex items-center gap-3">
								<Euro class="w-5 h-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">{$t('priceLabel')}</p>
									<p class="text-2xl font-bold text-gray-900">
										{artwork.price}
										{artwork.currency}
									</p>
								</div>
							</div>
						{/if}

						<!-- Dimensions -->
						{#if artwork.dimensions}
							<div class="flex items-center gap-3">
								<Ruler class="w-5 h-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">{$t('dimensionsLabel')}</p>
									<p class="text-lg font-semibold text-gray-900">
										{artwork.dimensions.width} × {artwork.dimensions.height}
										{artwork.dimensions.unit}
									</p>
								</div>
							</div>
						{/if}

						<!-- Year -->
						{#if artwork.year}
							<div class="flex items-center gap-3">
								<Calendar class="w-5 h-5 text-gray-400" />
								<div>
									<p class="text-sm text-gray-500">{$t('yearLabel')}</p>
									<p class="text-lg font-semibold text-gray-900">{artwork.year}</p>
								</div>
							</div>
						{/if}

						<!-- Category -->
						<div class="flex items-center space-x-3">
							<Tag class="w-5 h-5 text-gray-400" />
							<div>
								<p class="text-sm text-gray-500">{$t('categoryLabel')}</p>
								<span
									class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
								>
									{artwork.category}
								</span>
							</div>
						</div>

						<!-- Description -->
						{#if artwork.description}
							<div>
								<p class="text-sm text-gray-500 mb-2">{$t('descriptionLabel')}</p>
								<p class="text-gray-700 leading-relaxed">{artwork.description}</p>
							</div>
						{/if}

						<!-- Contact Information -->
						{#if artwork.isAvailable}
							<div class="bg-green-50 border border-green-200 rounded-xl p-4">
								<h3 class="text-lg font-semibold text-green-800 mb-2">
									{$t('interestedHeading')}
								</h3>
								<p class="text-green-700 text-sm mb-3">
									{$t('availableInfo')}
								</p>
								<button
									class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
								>
									{$t('contactArtist')}
								</button>
							</div>
						{:else}
							<div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 class="text-lg font-semibold text-gray-800 mb-2">{$t('soldHeading')}</h3>
								<p class="text-gray-600 text-sm">
									{$t('soldInfo')}
								</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
