<!--
@component GalleryHeader
@description Header component with search bar, filter toggle, and view mode controls
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { getGalleryState } from '$lib/GalleryState.svelte';
	import { Funnel, Grid3x3, List, X, Languages } from 'lucide-svelte';
	import FilterPanel from './FilterPanel.svelte';
	import { locale, t } from 'svelte-i18n';

	// Get shared gallery state
	const galleryState = getGalleryState();

	let showFilters = $state(false);

	function toggleFilters() {
		const next = !showFilters;
		console.log('[GalleryHeader] toggleFilters', { from: showFilters, to: next });
		showFilters = next;
	}

	function setViewMode(mode: 'grid' | 'list') {
		galleryState.setViewMode(mode);
	}

	let showLangMenu = $state(false);

	function toggleLangMenu() {
		showLangMenu = !showLangMenu;
	}

	function closeLangMenu() {
		showLangMenu = false;
	}

	function switchLang(code: 'en' | 'es' | 'fr' | 'de') {
		locale.set(code);
		try {
			localStorage.setItem('lang', code);
		} catch (e) {
			console.error('Failed to set language in localStorage:', e);
		}
		closeLangMenu();
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && showFilters) {
			toggleFilters();
		}
	}}
/>

<header
	class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
>
	<div
		class="mx-auto px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-screen-lg xl:max-w-[1200px] 2xl:max-w-[1400px]"
	>
		<!-- Main Header Content -->
		<div
			class="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4"
		>
			<!-- Logo/Title -->
			<div class="shrink-0">
				<h1
					class="text-xl xs:text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
				>
					{$t('galleryTitle')}
				</h1>
			</div>

			<!-- Controls -->
			<div class="flex items-center gap-2 md:gap-3">
				<!-- Language Menu -->
				<div class="relative">
					<button
						onclick={toggleLangMenu}
						aria-haspopup="menu"
						aria-expanded={showLangMenu}
						aria-label={$t('selectLanguage')}
						class="inline-flex size-9 items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<Languages class="size-5" />
					</button>

					{#if showLangMenu}
						<div
							class="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white/95 backdrop-blur-md shadow-lg z-50"
							role="menu"
							tabindex="-1"
							onmouseleave={closeLangMenu}
						>
							<button
								onclick={() => switchLang('es')}
								class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
								role="menuitem"
							>
								<span class="text-base">🇪🇸</span>
								<span>Español</span>
							</button>
							<button
								onclick={() => switchLang('en')}
								class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
								role="menuitem"
							>
								<span class="text-base">🇬🇧</span>
								<span>English</span>
							</button>
							<button
								onclick={() => switchLang('fr')}
								class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
								role="menuitem"
							>
								<span class="text-base">🇫🇷</span>
								<span>Français</span>
							</button>
							<button
								onclick={() => switchLang('de')}
								class="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 text-left"
								role="menuitem"
							>
								<span class="text-base">🇩🇪</span>
								<span>Deutsch</span>
							</button>
						</div>
					{/if}
				</div>

				<!-- Filter Toggle -->
				<button
					onclick={toggleFilters}
					class="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
				>
					<Funnel class="size-4" />
					<span>{$t('filters')}</span>
				</button>

				<!-- View Mode Toggle -->
				<div class="flex items-center gap-1.5 md:gap-2">
					<button
						onclick={() => setViewMode('grid')}
						aria-label={$t('gridView')}
						class="inline-flex size-9 items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
					>
						<Grid3x3 class="size-5" />
					</button>
					<button
						onclick={() => setViewMode('list')}
						aria-label={$t('listView')}
						class="inline-flex size-9 items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
					class="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
					onclick={toggleFilters}
					role="presentation"
				>
					<div
						class="ml-auto h-full w-80 bg-white/90 backdrop-blur-md p-4 shadow-xl"
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
									class="inline-flex size-9 items-center justify-center rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
					class="hidden md:block md:sticky md:top-0 md:z-10 md:mt-2 md:rounded-xl md:border md:border-gray-200/50 md:bg-white/80 md:backdrop-blur-xl md:p-4"
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
