<!--
@component FilterPanel
@description Filter panel with category selection, price range, and availability filters
@example
  <FilterPanel />
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Check, X } from 'lucide-svelte';

	// Get shared gallery state
	const galleryState = getGalleryState();

	let priceRange = $state([0, 10000]);
	let selectedCategory = $state('');
	let availableOnly = $state(false);

	// Initialize filters from gallery state
	$effect(() => {
		priceRange = [...galleryState.filter.priceRange!];
		selectedCategory = galleryState.filter.category || '';
		availableOnly = galleryState.filter.availableOnly || false;
	});

	// Update gallery state when filters change
	$effect(() => {
		galleryState.updateFilters({
			category: selectedCategory || undefined,
			priceRange: priceRange as [number, number],
			availableOnly: availableOnly
		});
	});

	function handlePriceRangeChange(event: Event, index: number) {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value);
		priceRange[index] = value;
		priceRange = [...priceRange]; // Trigger reactivity
	}

	function selectCategory(category: string) {
		selectedCategory = selectedCategory === category ? '' : category;
	}

	function toggleAvailableOnly() {
		availableOnly = !availableOnly;
	}

	function clearFilters() {
		selectedCategory = '';
		priceRange = [0, 10000];
		availableOnly = false;
	}
</script>

<div class="space-y-6">
	<!-- Category Filter -->
	<div>
		<h4 class="text-sm font-medium text-gray-900 mb-3">Category</h4>
		<div class="space-y-2">
			{#each galleryState.availableCategories as category (category)}
				<button
					onclick={() => selectCategory(category)}
					class="w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg border transition-colors duration-200 {selectedCategory ===
					category
						? 'bg-blue-50 border-blue-300 text-blue-700'
						: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}"
				>
					<span>{category}</span>
					{#if selectedCategory === category}
						<Check class="h-4 w-4 text-blue-600" />
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Price Range Filter -->
	<div>
		<h4 class="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
		<div class="space-y-3">
			<div class="flex items-center space-x-4">
				<div class="flex-1">
					<label for="min-price" class="block text-xs text-gray-500 mb-1">Min Price</label>
					<input
						id="min-price"
						type="number"
						min="0"
						max="10000"
						value={priceRange[0]}
						oninput={(e) => handlePriceRangeChange(e, 0)}
						class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				<div class="flex-1">
					<label for="max-price" class="block text-xs text-gray-500 mb-1">Max Price</label>
					<input
						id="max-price"
						type="number"
						min="0"
						max="10000"
						value={priceRange[1]}
						oninput={(e) => handlePriceRangeChange(e, 1)}
						class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
			</div>

			<!-- Price Range Display -->
			<div class="text-xs text-gray-500 text-center">
				€{priceRange[0]} - €{priceRange[1]}
			</div>
		</div>
	</div>

	<!-- Availability Filter -->
	<div>
		<h4 class="text-sm font-medium text-gray-900 mb-3">Availability</h4>
		<button
			onclick={toggleAvailableOnly}
			class="w-full flex items-center justify-between px-3 py-2 text-sm text-left rounded-lg border transition-colors duration-200 {availableOnly
				? 'bg-blue-50 border-blue-300 text-blue-700'
				: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}"
		>
			<span>Available only</span>
			{#if availableOnly}
				<Check class="h-4 w-4 text-blue-600" />
			{/if}
		</button>
	</div>

	<!-- Active Filters Summary -->
	{#if selectedCategory || availableOnly || priceRange[0] > 0 || priceRange[1] < 10000}
		<div class="pt-4 border-t border-gray-200">
			<div class="flex items-center justify-between mb-2">
				<h4 class="text-sm font-medium text-gray-900">Active Filters</h4>
				<button
					onclick={clearFilters}
					class="text-xs text-blue-600 hover:text-blue-800 font-medium"
				>
					Clear all
				</button>
			</div>

			<div class="flex flex-wrap gap-2">
				{#if selectedCategory}
					<span
						class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
					>
						{selectedCategory}
						<button
							onclick={() => selectCategory(selectedCategory)}
							class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
						>
							<X class="h-3 w-3" />
						</button>
					</span>
				{/if}

				{#if availableOnly}
					<span
						class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
					>
						Available only
						<button
							onclick={toggleAvailableOnly}
							class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
						>
							<X class="h-3 w-3" />
						</button>
					</span>
				{/if}

				{#if priceRange[0] > 0 || priceRange[1] < 10000}
					<span
						class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
					>
						€{priceRange[0]} - €{priceRange[1]}
						<button
							onclick={() => {
								priceRange = [0, 10000];
							}}
							class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
						>
							<X class="h-3 w-3" />
						</button>
					</span>
				{/if}
			</div>
		</div>
	{/if}
</div>
