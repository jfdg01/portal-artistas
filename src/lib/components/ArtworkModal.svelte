<!--
@component ArtworkModal
@description Modal component for displaying detailed artwork information
@example
  <ArtworkModal artwork={selectedArtwork} on:close={handleClose} />
-->

<script lang="ts">
	import type { Artwork } from '$lib/types/artwork';
	import { X, Euro, Calendar, Ruler, Tag } from 'lucide-svelte';
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

	function handleClose() {
		if (onclose) {
			onclose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			handleClose();
		}
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
							<img
								src={artwork.imageUrl}
								alt={$t('artworkAlt', { values: { title: artwork.title } })}
								class="w-full h-auto rounded-lg shadow-md"
								loading="lazy"
							/>
							{#if !artwork.isAvailable}
								<div
									class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
								>
									{$t('sold')}
								</div>
							{/if}
						</div>
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
