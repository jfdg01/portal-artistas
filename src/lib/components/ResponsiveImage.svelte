<script lang="ts">
	import { assets } from '$app/paths';

	export let alt: string;
	export let src: string;
	export let srcset: string | undefined = undefined;
	export let sizes: string;
	export let className = '';
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let decoding: 'auto' | 'sync' | 'async' = 'async';
	export let loading: 'eager' | 'lazy' = 'lazy';
	export let fetchpriority: 'high' | 'low' | 'auto' = 'auto';

	function withAssets(path: string): string {
		return path && path.startsWith('/') ? `${assets}${path}` : path;
	}

	function withAssetsSrcSet(set?: string): string {
		if (!set) return '';
		return set
			.split(',')
			.map((part) => {
				const [url, d] = part.trim().split(/\s+/);
				const u = withAssets(url);
				return d ? `${u} ${d}` : u;
			})
			.join(', ');
	}

	function onError(e: Event) {
		// No-op: caller can provide a different src/srcset if needed
		// Here we simply drop srcset to force browser to use src
		const el = e.currentTarget as HTMLImageElement;
		el.onerror = null;
		el.srcset = '';
	}
</script>

<img
	src={withAssets(src)}
	srcset={withAssetsSrcSet(srcset)}
	{sizes}
	{alt}
	class={className}
	{width}
	{height}
	{decoding}
	{loading}
	{fetchpriority}
	on:error={onError}
/>
