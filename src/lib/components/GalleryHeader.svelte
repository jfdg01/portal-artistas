<!--
@component GalleryHeader
@description Responsive header component with navigation and language selection
@example
  <GalleryHeader />
-->

<script lang="ts">
	import { Mail, Home, Menu, ArrowUp, GraduationCap } from 'lucide-svelte';
	import { t } from 'svelte-i18n';
	import LanguageSelector from './LanguageSelector.svelte';
	import { goto } from '$app/navigation';

	let showMobileMenu = $state(false);
	let showScrollToTop = $state(false);

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	function closeMobileMenu() {
		showMobileMenu = false;
	}

	function goToHome() {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/');
		closeMobileMenu();
	}

	function goToContact() {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/contact');
		closeMobileMenu();
	}

	function goToOnlineClasses() {
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		goto('/clases-online');
		closeMobileMenu();
	}

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showMobileMenu) {
			closeMobileMenu();
		}
	}

	// Scroll to top functionality
	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	// Handle scroll events to show/hide scroll to top button
	function handleScroll() {
		showScrollToTop = window.scrollY > 700;
	}
</script>

<svelte:window onkeydown={handleKeydown} onscroll={handleScroll} />

<header
	class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
>
	<div
		class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
	>
		<!-- Main Header Content - Mobile First -->
		<div class="flex items-center justify-between gap-3 py-3 md:gap-4 md:py-4 lg:gap-6 lg:py-6">
			<!-- Logo/Title - Mobile First -->
			<div class="shrink-0">
				<button
					onclick={goToHome}
					class="text-lg xs:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1"
					aria-label="Go to home page"
				>
					Carmen Cárdenas Pacheco
				</button>
			</div>

			<!-- Desktop Navigation and Controls -->
			<div class="hidden md:flex items-center gap-3 lg:gap-4">
				<!-- Navigation Buttons - Desktop -->
				<div class="flex items-center gap-1 lg:gap-2">
					<button
						onclick={goToHome}
						class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"
						aria-label="View artworks"
					>
						<Home class="size-4" />
						<span class="hidden lg:inline">{$t('artworks')}</span>
					</button>
					<button
						onclick={goToOnlineClasses}
						class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"
						aria-label="Online classes"
					>
						<GraduationCap class="size-4" />
						<span class="hidden lg:inline">{$t('onlineClassesPage')}</span>
					</button>
					<button
						onclick={goToContact}
						class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] min-w-[44px]"
						aria-label="Contact information"
					>
						<Mail class="size-4" />
						<span class="hidden lg:inline">{$t('contact')}</span>
					</button>
				</div>

				<!-- Language Selector - Desktop -->
				<LanguageSelector />
			</div>

			<!-- Mobile Controls -->
			<div class="flex md:hidden items-center gap-2">
				<!-- Language Selector - Mobile -->
				<LanguageSelector />
				
				<!-- Mobile Menu Button -->
				<button
					onclick={toggleMobileMenu}
					aria-haspopup="menu"
					aria-expanded={showMobileMenu}
					aria-label="Open navigation menu"
					class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white/80 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px] text-gray-700"
				>
					<Menu class="size-5" />
				</button>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		{#if showMobileMenu}
			<div class="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
				<div class="py-4 space-y-2">
					<!-- Navigation Links - Mobile -->
					<button
						onclick={goToHome}
						class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-gray-700"
						role="menuitem"
						aria-label="View artworks"
					>
						<Home class="size-5" />
						<span class="font-medium">{$t('artworks')}</span>
					</button>
					<button
						onclick={goToOnlineClasses}
						class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-gray-700"
						role="menuitem"
						aria-label="Online classes"
					>
						<GraduationCap class="size-5" />
						<span class="font-medium">{$t('onlineClassesPage')}</span>
					</button>
					<button
						onclick={goToContact}
						class="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 text-gray-700"
						role="menuitem"
						aria-label="Contact information"
					>
						<Mail class="size-5" />
						<span class="font-medium">{$t('contact')}</span>
					</button>
				</div>
			</div>
		{/if}
	</div>
</header>

<!-- Scroll to Top Button -->
<button
	onclick={scrollToTop}
	aria-label="Scroll to top"
	class="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-3 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[48px] min-w-[48px] flex items-center justify-center group {showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}"
>
	<ArrowUp class="size-5 group-hover:scale-110 transition-transform duration-300" />
</button>
