<!--
@component GalleryHeader
@description Header component with language selection controls
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { Languages } from 'lucide-svelte';
	import { locale, t } from 'svelte-i18n';

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
		if (e.key === 'Escape' && showLangMenu) {
			closeLangMenu();
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
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4">
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
			</div>
		</div>
	</div>
</header>
