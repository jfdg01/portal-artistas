<!--
@component OnlineClassesPage
@description Online classes page with coming soon message and contact information
@example
  <OnlineClassesPage />
-->

<script lang="ts">
	import { t } from 'svelte-i18n';
	import { ArrowRight, Mail, Phone, Instagram } from 'lucide-svelte';
	import GalleryHeader from '$lib/components/GalleryHeader.svelte';
</script>

<svelte:head>
	<title>{$t('onlineClassesPage')} - Carmen Cárdenas Pacheco</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
	<GalleryHeader />

	<main class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
		<!-- Page Header -->
		<div class="text-center mb-8 sm:mb-12 lg:mb-16">
			<h1
				class="text-3xl sm:text-4xl lg:text-5xl font-bold montserrat-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4"
			>
				{$t('onlineClassesPage')}
			</h1>
		</div>

		<!-- Main Coming Soon Content -->
		<div class="text-center mb-8 sm:mb-12 lg:mb-16">
			<!-- Icon and Title -->
			<div class="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-6 sm:mb-8">
				<span class="text-white font-bold text-3xl sm:text-4xl lg:text-5xl montserrat-bold">
					🎨
				</span>
			</div>
			<h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold montserrat-bold text-gray-900 mb-6 sm:mb-8">
				{$t('comingSoon')}
			</h2>
			<p class="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 leading-relaxed max-w-[70ch] mx-auto mb-8 sm:mb-12">
				{$t('onlineClassesInterest')}
			</p>

			<!-- Contact Button -->
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a
				href="/contact"
				data-sveltekit-preload-data="hover"
				class="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-xl min-h-[44px] min-w-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 montserrat-semibold"
			>
				{$t('contactForPreRegistration')}
				<ArrowRight class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
			</a>
		</div>

		<!-- Contact Information Box -->
		<div class="max-w-2xl mx-auto">
			<div
				class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-6 sm:p-8"
			>
				<h2 class="text-xl font-semibold montserrat-semibold text-gray-900 mb-6 text-center">
					{$t('contactInfo')}
				</h2>

				<div class="space-y-6">
					<!-- Email -->
					<div class="flex items-start gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
						>
							<Mail class="w-6 h-6 text-white" />
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="text-sm font-medium text-gray-700 montserrat-medium">
								{$t('emailLabel')}
							</h3>
							<a
								href="mailto:cardenaspachecocarmenalejandra@gmail.com"
								class="text-gray-900 font-medium break-all hover:text-blue-600 transition-colors duration-200"
							>
								{$t('emailAddress')}
							</a>
						</div>
					</div>

					<!-- Phone -->
					<div class="flex items-start gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
						>
							<Phone class="w-6 h-6 text-white" />
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="text-sm font-medium text-gray-700 montserrat-medium">
								{$t('phoneNumberLabel')}
							</h3>
							<a
								href="https://wa.me/34628672368"
								target="_blank"
								rel="noopener noreferrer"
								class="text-gray-900 font-medium break-all hover:text-green-600 transition-colors duration-200"
							>
								{$t('phoneNumber')}
							</a>
						</div>
					</div>

					<!-- Instagram -->
					<div class="flex items-start gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
						>
							<Instagram class="w-6 h-6 text-white" />
						</div>
						<div class="min-w-0 flex-1">
							<h3 class="text-sm font-medium text-gray-700 montserrat-medium">Instagram</h3>
							<a
								href="https://instagram.com/cardenas.pacheco"
								target="_blank"
								rel="noopener noreferrer"
								class="text-gray-900 font-medium break-all hover:text-pink-600 transition-colors duration-200"
							>
								{$t('instagram')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
