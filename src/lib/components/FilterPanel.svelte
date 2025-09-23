<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { t } from 'svelte-i18n';

	const galleryState = getGalleryState();

	const minPriceView = $derived(galleryState.filter.priceRange?.[0] ?? 0);
	const maxPriceView = $derived(galleryState.filter.priceRange?.[1] ?? 10000);
	const categoryView = $derived(galleryState.filter.category ?? '');
	const categoriesView = $derived(galleryState.availableCategories ?? []);
	const availableOnlyView = $derived(galleryState.filter.availableOnly ?? false);

	function onMinPriceInput(event: Event) {
		const value = parseInt((event.target as HTMLInputElement).value);
		const nextMin = Number.isFinite(value) ? value : 0;
		const [, curMax] = galleryState.filter.priceRange ?? [0, 10000];
		const clampedMax = Math.max(nextMin, curMax);
		if (nextMin !== minPriceView || clampedMax !== curMax) {
			galleryState.updateFilters({ priceRange: [nextMin, clampedMax] });
		}
	}

	function onMaxPriceInput(event: Event) {
		const value = parseInt((event.target as HTMLInputElement).value);
		const nextMax = Number.isFinite(value) ? value : 0;
		const [curMin] = galleryState.filter.priceRange ?? [0, 10000];
		const clampedMin = Math.min(curMin, nextMax);
		if (clampedMin !== curMin || nextMax !== maxPriceView) {
			galleryState.updateFilters({ priceRange: [clampedMin, nextMax] });
		}
	}

	function onCategoryChange(event: Event) {
		const next = (event.target as HTMLSelectElement).value;
		if ((categoryView || '') !== (next || '')) {
			galleryState.updateFilters({ category: next || '' });
		}
	}

	function onAvailableToggle(event: Event) {
		const next = (event.target as HTMLInputElement).checked;
		if (next !== availableOnlyView) {
			galleryState.updateFilters({ availableOnly: next });
		}
	}
</script>

<div class="flex flex-wrap items-end gap-3 md:gap-4">
	<div class="w-full xs:w-auto md:w-44">
		<label for="min-price" class="block text-xs font-medium text-gray-700 mb-1"
			>{$t('minPrice')}</label
		>
		<input
			id="min-price"
			type="number"
			min="0"
			value={minPriceView}
			oninput={onMinPriceInput}
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
		/>
	</div>

	<div class="w-full xs:w-auto md:w-44">
		<label for="max-price" class="block text-xs font-medium text-gray-700 mb-1"
			>{$t('maxPrice')}</label
		>
		<input
			id="max-price"
			type="number"
			min="0"
			value={maxPriceView}
			oninput={onMaxPriceInput}
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
		/>
	</div>

	<div class="w-full md:w-56">
		<label for="category" class="block text-xs font-medium text-gray-700 mb-1"
			>{$t('category')}</label
		>
		<select
			id="category"
			onchange={onCategoryChange}
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white"
		>
			<option value="">{$t('all')}</option>
			{#each categoriesView as c (c)}
				<option value={c} selected={categoryView === c}>{c}</option>
			{/each}
		</select>
	</div>

	<div class="h-9 flex items-center">
		<label class="inline-flex items-center gap-2 text-sm text-gray-700">
			<input
				type="checkbox"
				checked={availableOnlyView}
				onchange={onAvailableToggle}
				class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
			/>
			<span>{$t('availableOnly')}</span>
		</label>
	</div>
</div>
