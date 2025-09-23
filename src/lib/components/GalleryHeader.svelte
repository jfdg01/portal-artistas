<!--
@component GalleryHeader
@description Header component with search bar, filter toggle, and view mode controls
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Search, Filter, Grid, List, X } from 'lucide-svelte';
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

<header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Main Header Content -->
		<div class="flex items-center justify-between h-16">
			<!-- Logo/Title -->
			<div class="flex-shrink-0">
				<h1 class="text-2xl font-bold text-gray-900">{$t('galleryTitle')}</h1>
			</div>

			<!-- Search Bar -->
			<div class="flex-1 max-w-lg mx-8">
				<div class="relative">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search class="h-5 w-5 text-gray-400" />
					</div>
					<input
						bind:value={searchInput}
						type="text"
						placeholder={$t('searchPlaceholder')}
						class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
					{#if searchInput}
						<div class="absolute inset-y-0 right-0 pr-3 flex items-center">
							<button
								onclick={clearSearch}
								class="text-gray-400 hover:text-gray-600 focus:outline-none"
								aria-label={$t('clearSearch')}
							>
								<X class="h-4 w-4" />
							</button>
						</div>
					{/if}
				</div>
			</div>

			<!-- Controls -->
			<div class="flex items-center space-x-2">
				<!-- Language Switcher -->
				<div class="flex items-center bg-gray-100 rounded-lg p-1 mr-2">
					<button
						onclick={() => switchLang('en')}
						class="px-2 py-1 text-sm rounded-md hover:bg-white flex items-center"
						aria-label={$t('switchToEnglish')}
					>
						<span class="text-xl">🇬🇧</span>
					</button>
					<button
						onclick={() => switchLang('es')}
						class="px-2 py-1 text-sm rounded-md hover:bg-white flex items-center"
						aria-label={$t('switchToSpanish')}
					>
						<span class="text-xl">🇪🇸</span>
					</button>
				</div>

				<!-- Filter Toggle -->
				<button
					onclick={toggleFilters}
					class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 {showFilters
						? 'bg-blue-50 border-blue-300 text-blue-700'
						: ''}"
				>
					<Filter class="h-4 w-4 mr-2" />
					{$t('filters')}
				</button>

				<!-- View Mode Toggle -->
				<div class="flex items-center bg-gray-100 rounded-lg p-1">
					<button
						onclick={() => setViewMode('grid')}
						class="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md transition-colors duration-200 {galleryState.viewMode ===
						'grid'
							? 'bg-white text-gray-900 shadow-sm'
							: 'text-gray-500 hover:text-gray-700'}"
						aria-label={$t('gridView')}
					>
						<Grid class="h-4 w-4" />
					</button>
					<button
						onclick={() => setViewMode('list')}
						class="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md transition-colors duration-200 {galleryState.viewMode ===
						'list'
							? 'bg-white text-gray-900 shadow-sm'
							: 'text-gray-500 hover:text-gray-700'}"
						aria-label={$t('listView')}
					>
						<List class="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>

		<!-- Filter Panel (Collapsible) -->
		{#if showFilters}
			<div class="border-t border-gray-200 py-4">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-medium text-gray-900">{$t('filters')}</h3>
					<button
						onclick={() => galleryState.clearFilters()}
						class="text-sm text-blue-600 hover:text-blue-800 font-medium"
					>
						{$t('clearAllFilters')}
					</button>
				</div>

				<!-- Filter Content -->
				<div class="max-w-md">
					<FilterPanel />
				</div>
			</div>
		{/if}
	</div>
</header>
