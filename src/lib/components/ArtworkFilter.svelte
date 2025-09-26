<!--
@component ArtworkFilter
@description Robust filter component for artwork categories with tag-based filtering
@example
  <ArtworkFilter />
-->

<script lang="ts">
	import { X, Filter, RotateCcw } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import { getGalleryState } from '$lib/GalleryState.svelte';

	// Get gallery state
	const galleryState = getGalleryState();

	// Filter state
	let showMobileFilter = $state(false);

	function toggleMobileFilter() {
		showMobileFilter = !showMobileFilter;
	}

	function closeMobileFilter() {
		showMobileFilter = false;
	}

	function selectCategory(category: string) {
		galleryState.setCategoryFilter(category);
		// Don't auto-close on mobile - let user manually close the panel
	}

	function clearFilters() {
		galleryState.clearFilters();
		// Don't auto-close on mobile - let user manually close the panel
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showMobileFilter) {
			closeMobileFilter();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="w-full">
	<!-- Desktop Filter - Mobile First -->
	<div class="hidden md:block">
		<div
			class="bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm p-4 lg:p-6"
		>
			<!-- Filter Header -->
			<div class="flex items-center justify-between mb-4 lg:mb-6">
				<div class="flex items-center gap-2 lg:gap-3">
					<Filter class="size-5 text-blue-600" />
					<h3 class="text-lg font-semibold text-gray-900 montserrat-semibold">
						{$t('filterByCategory')}
					</h3>
				</div>
				{#if galleryState.selectedCategory}
					<button
						onclick={clearFilters}
						class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
						aria-label={$t('clearFilters')}
					>
						<RotateCcw class="size-4" />
						<span class="hidden lg:inline">{$t('clear')}</span>
					</button>
				{/if}
			</div>

			<!-- Category Tags -->
			<div class="flex flex-wrap gap-2 lg:gap-3">
				<!-- All Categories Tag -->
				<button
					onclick={() => selectCategory('')}
					class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 {!galleryState.selectedCategory
						? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
						: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'}"
					aria-label={$t('showAllCategories')}
				>
					<span>{$t('allCategories')}</span>
				</button>

				<!-- Category Tags -->
				{#each galleryState.availableCategories as category (category)}
					<button
						onclick={() => selectCategory(category)}
						class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 {galleryState.selectedCategory ===
						category
							? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'}"
						aria-label={$t('filterBy', { values: { category: $t(`categories.${category}`) } })}
					>
						<span>{$t(`categories.${category}`)}</span>
					</button>
				{/each}
			</div>

			<!-- Results Count -->
			<div class="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200">
				<p class="text-sm text-gray-600">
					<span class="font-medium text-gray-900">{galleryState.filteredArtworks.length}</span>
					{$t('artworksFound')}
					{#if galleryState.selectedCategory}
						<span class="text-blue-600"
							>{$t('in')} {$t(`categories.${galleryState.selectedCategory}`)}</span
						>
					{/if}
				</p>
			</div>
		</div>
	</div>

	<!-- Mobile Filter Toggle -->
	<div class="md:hidden">
		<button
			onclick={toggleMobileFilter}
			class="w-full flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
			aria-expanded={showMobileFilter}
			aria-label={$t('openFilterMenu')}
		>
			<div class="flex items-center gap-3">
				<Filter class="size-5 text-blue-600" />
				<div class="text-left">
					<div class="text-sm font-medium text-gray-900">
						{$t('filterByCategory')}
					</div>
					<div class="text-xs text-gray-500">
						{#if galleryState.selectedCategory}
							{$t('selected')}: {$t(`categories.${galleryState.selectedCategory}`)}
						{:else}
							{$t('allCategoriesLabel')}
						{/if}
					</div>
				</div>
			</div>
			<div class="flex items-center gap-2">
				{#if galleryState.selectedCategory}
					<div
						onclick={(e) => {
							e.stopPropagation();
							clearFilters();
						}}
						class="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200 cursor-pointer"
						role="button"
						tabindex="0"
						aria-label={$t('clearFilters')}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								e.stopPropagation();
								clearFilters();
							}
						}}
					>
						<X class="size-4" />
					</div>
				{/if}
				<div class="text-gray-400">
					<svg
						class="size-4 transform transition-transform duration-200 {showMobileFilter
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</div>
			</div>
		</button>

		<!-- Mobile Filter Panel -->
		{#if showMobileFilter}
			<div
				class="mt-3 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-lg p-4"
			>
				<!-- Mobile Filter Header -->
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-base font-semibold text-gray-900 montserrat-semibold">
						{$t('filterByCategory')}
					</h3>
					<button
						onclick={closeMobileFilter}
						class="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
						aria-label={$t('closeFilterMenu')}
					>
						<X class="size-5" />
					</button>
				</div>

				<!-- Mobile Category Tags -->
				<div class="space-y-2">
					<!-- All Categories - Mobile -->
					<button
						onclick={() => selectCategory('')}
						class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 {!galleryState.selectedCategory
							? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
						aria-label={$t('showAllCategories')}
					>
						<span>{$t('allCategories')}</span>
					</button>

					<!-- Category Options - Mobile -->
					{#each galleryState.availableCategories as category (category)}
						<button
							onclick={() => selectCategory(category)}
							class="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 {galleryState.selectedCategory ===
							category
								? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md'
								: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
							aria-label={$t('filterBy', { values: { category: $t(`categories.${category}`) } })}
						>
							<span>{$t(`categories.${category}`)}</span>
						</button>
					{/each}
				</div>

				<!-- Mobile Results Count -->
				<div class="mt-4 pt-4 border-t border-gray-200">
					<p class="text-sm text-gray-600 text-center">
						<span class="font-medium text-gray-900">{galleryState.filteredArtworks.length}</span>
						{$t('artworksFound')}
						{#if galleryState.selectedCategory}
							<span class="text-blue-600"
								>{$t('in')} {$t(`categories.${galleryState.selectedCategory}`)}</span
							>
						{/if}
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>
