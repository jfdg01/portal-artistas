<!--
@component LanguageSelector
@description Language selection dropdown component with all supported languages
@example
  <LanguageSelector />
-->

<script lang="ts">
	import { Languages } from 'lucide-svelte';
	import { locale, t } from 'svelte-i18n';

	// Define all supported languages with their display names and flags
	const languages = [
		{ code: 'es', name: 'Español', flag: '🇪🇸' },
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
		{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
		{ code: 'ru', name: 'Русский', flag: '🇷🇺' },
		{ code: 'pt', name: 'Português', flag: '🇵🇹' },
		{ code: 'cn', name: '中文', flag: '🇨🇳' },
		{ code: 'jp', name: '日本語', flag: '🇯🇵' },
		{ code: 'kr', name: '한국어', flag: '🇰🇷' },
		{ code: 'indian', name: 'हिन्दी', flag: '🇮🇳' },
		{ code: 'hebrew', name: 'עברית', flag: '🇮🇱' }
	] as const;

	type LanguageCode = (typeof languages)[number]['code'];

	let showLangMenu = $state(false);

	function toggleLangMenu() {
		showLangMenu = !showLangMenu;
	}

	function closeLangMenu() {
		showLangMenu = false;
	}

	function switchLang(code: LanguageCode) {
		locale.set(code);
		try {
			localStorage.setItem('lang', code);
		} catch (e) {
			console.error('Failed to set language in localStorage:', e);
		}
		closeLangMenu();
	}

	// Get current language info
	const currentLang = $derived(languages.find((lang) => lang.code === $locale) || languages[0]);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && showLangMenu) {
			closeLangMenu();
		}
	}}
/>

<div class="relative">
	<button
		onclick={toggleLangMenu}
		aria-haspopup="menu"
		aria-expanded={showLangMenu}
		aria-label={$t('selectLanguage')}
		class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px] text-gray-700"
	>
		<Languages class="size-5" />
	</button>

	{#if showLangMenu}
		<div
			class="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white/95 backdrop-blur-md shadow-lg z-50 max-h-80 overflow-y-auto"
			role="menu"
			tabindex="-1"
			onmouseleave={closeLangMenu}
		>
			<div class="p-2">
				<div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
					{$t('selectLanguage')}
				</div>

				{#each languages as lang (lang.code)}
					<button
						onclick={() => switchLang(lang.code)}
						class="w-full flex items-center gap-3 px-2 py-2 text-sm hover:bg-gray-50 text-left rounded {currentLang.code ===
						lang.code
							? 'bg-blue-50 text-blue-700'
							: ''}"
						role="menuitem"
					>
						<span class="text-base">{lang.flag}</span>
						<span class="flex-1">{lang.name}</span>
						{#if currentLang.code === lang.code}
							<span class="text-blue-600 text-xs">✓</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
