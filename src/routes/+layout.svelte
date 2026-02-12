<script lang="ts">
	import { Header, Footer } from '$lib/components';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import Snap from 'lenis/snap';

	let { children } = $props();
	let lenis: Lenis | null = null;
	let snap: InstanceType<typeof Snap> | null = null;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		lenis = new Lenis({
			lerp: 0.1,
			duration: 1.2,
			smoothWheel: true,
			touchMultiplier: 2,
			allowNestedScroll: true
		});

		let rafId = 0;
		const raf = (time: number) => {
			lenis?.raf(time);
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);

		const snapTimeout = window.setTimeout(() => {
			if (!lenis) return;
			const sections = document.querySelectorAll<HTMLElement>('[data-snap]');
			if (sections.length > 0) {
				snap = new Snap(lenis, {
					type: 'proximity',
					lerp: 0.1,
					duration: 1,
					debounce: 150
				});
				snap.addElements(Array.from(sections), { align: 'start' });
			}
		}, 100);

		return () => {
			window.clearTimeout(snapTimeout);
			snap?.stop();
			snap = null;
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
