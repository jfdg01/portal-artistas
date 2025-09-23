<!--
@component GalleryHeader
@description Header component with search bar, filter toggle, and view mode controls
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Search, Funnel, Grid3x3, List, X } from 'lucide-svelte';
	import FilterPanel from './FilterPanel.svelte';
	import { locale, t } from 'svelte-i18n';

	// Get shared gallery state
	const galleryState = getGalleryState();

	let searchInput = $state('');
	let showFilters = $state(false);

	// Debounced search
	$effect(() => {
		const timeout = setTimeout(() => {
			galleryState.setSearchQuery(searchInput);
		}, 300);

		return () => clearTimeout(timeout);
	});

	function clearSearch() {
		searchInput = '';
		galleryState.setSearchQuery('');
	}

	function toggleFilters() {
		const next = !showFilters;
		console.log('[GalleryHeader] toggleFilters', { from: showFilters, to: next });
		showFilters = next;
	}

	function setViewMode(mode: 'grid' | 'list') {
		galleryState.setViewMode(mode);
	}

	function switchLang(code: 'en' | 'es') {
		locale.set(code);
		try {
			localStorage.setItem('lang', code);
		} catch (e) {
			console.error('Failed to set language in localStorage:', e);
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && showFilters) {
			toggleFilters();
		}
	}}
/>

<header class="sticky top-0 z-20 bg-white border-b">
	<div
		class="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-screen-lg xl:max-w-[1200px] 2xl:max-w-[1400px]"
	>
		<!-- Main Header Content -->
		<div
			class="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4"
		>
			<!-- Logo/Title -->
			<div class="shrink-0">
				<h1 class="text-xl xs:text-2xl md:text-3xl font-semibold tracking-tight">
					{$t('galleryTitle')}
				</h1>
			</div>

			<!-- Search Bar -->
			<div class="w-full md:max-w-md">
				<div class="relative">
					<div
						class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
					>
						<Search class="size-5" />
					</div>
					<input
						bind:value={searchInput}
						type="text"
						placeholder={$t('searchPlaceholder')}
						class="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-base placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
					/>
					{#if searchInput}
						<div class="absolute inset-y-0 right-0 flex items-center pr-1.5">
							<button
								onclick={clearSearch}
								aria-label={$t('clearSearch')}
								class="inline-flex size-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
							>
								<X class="size-4" />
							</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- Controls -->
			<div class="flex items-center gap-2 md:gap-3">
				<!-- Language Switcher -->
				<div class="flex items-center gap-1.5 md:gap-2">
					<button
						onclick={() => switchLang('en')}
						aria-label={$t('switchToEnglish')}
						class="inline-flex size-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<span class="text-lg">🇬🇧</span>
					</button>
					<button
						onclick={() => switchLang('es')}
						aria-label={$t('switchToSpanish')}
						class="inline-flex size-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<span class="text-lg">🇪🇸</span>
					</button>
				</div>

				<!-- Filter Toggle -->
				<button
					onclick={toggleFilters}
					class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
				>
					<Funnel class="size-4" />
					<span>{$t('filters')}</span>
				</button>

				<!-- View Mode Toggle -->
				<div class="flex items-center gap-1.5 md:gap-2">
					<button
						onclick={() => setViewMode('grid')}
						aria-label={$t('gridView')}
						class="inline-flex size-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<Grid3x3 class="size-5" />
					</button>
					<button
						onclick={() => setViewMode('list')}
						aria-label={$t('listView')}
						class="inline-flex size-9 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<List class="size-5" />
					</button>
				</div>
			</div>
		</div>

		<!-- Filter Panel (Collapsible) -->
		{#if showFilters}
			<div class="md:relative">
				<!-- Mobile overlay -->
				<div
					class="md:hidden fixed inset-0 z-30 bg-black/40"
					onclick={toggleFilters}
					role="presentation"
				>
					<div
						class="ml-auto h-full w-80 bg-white p-4 shadow-xl"
						onclick={(e) => e.stopPropagation()}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.stopPropagation();
							}
						}}
						role="dialog"
						aria-modal="true"
						tabindex="-1"
						aria-label={$t('filters')}
					>
						<div class="mb-3 flex items-center justify-between">
							<h3 class="text-lg font-semibold">{$t('filters')}</h3>
							<div class="flex items-center gap-2">
								<button
									onclick={() => galleryState.clearFilters()}
									class="text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
								>
									{$t('clearAllFilters')}
								</button>
								<button
									onclick={toggleFilters}
									aria-label={$t('clearSearch')}
									class="inline-flex size-9 items-center justify-center rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
								>
									<X class="size-5" />
								</button>
							</div>
						</div>
						<div class="overflow-y-auto max-h-[calc(100dvh-6rem)]">
							<FilterPanel />
						</div>
					</div>
				</div>

				<!-- Desktop docked panel -->
				<div
					class="hidden md:block md:sticky md:top-0 md:z-10 md:mt-2 md:rounded-md md:border md:bg-white md:p-4"
				>
					<div class="mb-3 flex items-center justify-between">
						<h3 class="text-base font-semibold">{$t('filters')}</h3>
						<button
							onclick={() => galleryState.clearFilters()}
							class="text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
						>
							{$t('clearAllFilters')}
						</button>
					</div>
					<div class="max-h-[70vh] overflow-auto">
						<FilterPanel />
					</div>
				</div>
			</div>
		{/if}
	</div>
</header>
