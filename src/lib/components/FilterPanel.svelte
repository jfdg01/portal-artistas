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

<div>
	<label for="min-price">{$t('minPrice')}</label>
	<input id="min-price" type="number" min="0" value={minPriceView} oninput={onMinPriceInput} />
</div>

<div>
	<label for="max-price">{$t('maxPrice')}</label>
	<input id="max-price" type="number" min="0" value={maxPriceView} oninput={onMaxPriceInput} />
</div>

<div>
	<label for="category">{$t('category')}</label>
	<select id="category" onchange={onCategoryChange}>
		<option value="">{$t('all')}</option>
		{#each categoriesView as c (c)}
			<option value={c} selected={categoryView === c}>{c}</option>
		{/each}
	</select>
</div>

<div>
	<label>
		<input type="checkbox" checked={availableOnlyView} onchange={onAvailableToggle} />
		{$t('availableOnly')}
	</label>
</div>
