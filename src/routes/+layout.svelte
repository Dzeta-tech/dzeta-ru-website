<script lang="ts">
	import { Header, Footer } from '$lib/components';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Lenis from 'lenis';

	let { children } = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		lenis = new Lenis({
			duration: 0.75,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			smoothWheel: true,
			lerp: 0.12,
			prevent: (node) => {
				return node.closest('.case-carousel, .blog-scroll, [data-native-scroll]') !== null;
			}
		});

		let rafId = 0;
		const raf = (time: number) => {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		};

		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis?.destroy();
			lenis = null;
		};
	});

	afterNavigate(() => {
		lenis?.resize();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />
