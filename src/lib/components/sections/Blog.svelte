<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components';
	import { reveal } from '$lib/actions/reveal';

	const posts = Array.from({ length: 5 }, (_, i) => ({
		slug: `mock-${i + 1}`,
		imageOverlay: 'Update on Withdrawals',
		title: 'Name of topic',
		description:
			'Комплексная автоматизация взаимодействия через Telegram-ботов для крупного медиа',
		date: '00.00.2026',
		href: '#'
	}));

	let carouselRef = $state<HTMLDivElement | null>(null);
	let canScrollLeft = $state(false);
	let canScrollRight = $state(false);

	function updateCarouselState() {
		if (!carouselRef) return;

		const maxScrollLeft = carouselRef.scrollWidth - carouselRef.clientWidth;
		const hasOverflow = maxScrollLeft > 1;
		const edgeThreshold = 4;
		const current = carouselRef.scrollLeft;

		canScrollLeft = hasOverflow && current > edgeThreshold;
		canScrollRight = hasOverflow && current < maxScrollLeft - edgeThreshold;
	}

	function registerCarousel(node: HTMLDivElement) {
		carouselRef = node;
		const handleScroll = () => updateCarouselState();
		node.addEventListener('scroll', handleScroll, { passive: true });
		requestAnimationFrame(updateCarouselState);

		return {
			destroy() {
				node.removeEventListener('scroll', handleScroll);
				carouselRef = null;
			}
		};
	}

	function scrollToAdjacentSlide(direction: 'prev' | 'next') {
		if (!carouselRef) return;

		const cards = Array.from(carouselRef.querySelectorAll<HTMLElement>('.blog-card'));
		if (!cards.length) return;

		const currentLeft = carouselRef.scrollLeft;
		let targetLeft = currentLeft;

		if (direction === 'next') {
			const next = cards.find((card) => card.offsetLeft > currentLeft + 4);
			targetLeft = (next ?? cards[cards.length - 1]).offsetLeft;
		} else {
			const prev = [...cards].reverse().find((card) => card.offsetLeft < currentLeft - 4);
			targetLeft = (prev ?? cards[0]).offsetLeft;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		carouselRef.scrollTo({
			left: targetLeft,
			behavior: prefersReducedMotion ? 'auto' : 'smooth'
		});
	}

	onMount(() => {
		const handleResize = () => updateCarouselState();
		window.addEventListener('resize', handleResize, { passive: true });
		requestAnimationFrame(updateCarouselState);
		const delayedInit = window.setTimeout(updateCarouselState, 220);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.clearTimeout(delayedInit);
		};
	});
</script>

<section
	id="blog"
	class="scroll-mt-16 bg-[var(--color-header-bg)] py-16 md:py-24"
	aria-labelledby="blog-heading"
>
	<div class="px-4 sm:px-6 lg:px-8">
		<h2
			id="blog-heading"
			class="text-style-h2 mb-[40px] text-[var(--color-paragraph-1)]"
			use:reveal={{ delay: 0 }}
		>
			Блог
		</h2>
		<p class="text-style-h3 mb-[40px] text-[var(--color-paragraph-1)]" use:reveal={{ delay: 80 }}>
			Инсайты о web3-разработке, токеномике и создании успешных крипто-проектов.
		</p>
	</div>

	<div class="blog-carousel-wrap">
		<div
			class="blog-scroll flex gap-6 overflow-x-auto px-4 pb-2 pt-2 md:gap-8 md:px-6"
			role="region"
			aria-label="Список постов блога"
			data-native-scroll
			use:registerCarousel
		>
			{#each posts as post, i}
				<article
					class="blog-card flex-shrink-0 rounded-[36px] bg-[var(--color-background-secondary)] p-5"
					style="width: min(92vw, 520px);"
					use:reveal={{ delay: 120 + i * 60 }}
				>
					<div class="block">
						<!-- Изображение с оверлеем -->
						<div
							class="blog-card__image relative flex h-[310px] items-end overflow-hidden rounded-[28px] bg-[var(--color-paragraph-1)]"
							aria-hidden="true"
						>
							<!-- Плейсхолдер: тёмный фон с простым паттерном -->
							<div
								class="absolute inset-0 opacity-90"
								style="background: radial-gradient(circle at 30% 30%, #2a2a2a, #0a0a0a);"
							></div>
							<div
								class="absolute inset-0 opacity-25"
								style="background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 16px);"
							></div>
							<p
								class="relative z-10 max-w-[300px] px-7 pb-4 font-sans text-[52px] font-semibold leading-[0.9] tracking-[-0.03em] text-[var(--color-background-secondary)]"
							>
								{post.imageOverlay}
							</p>
						</div>
						<!-- Тело карточки -->
						<div class="flex flex-col gap-3 pt-4">
							<h3 class="text-style-h2 font-normal leading-[0.9] tracking-[-0.04em] text-[var(--color-paragraph-1)]">
								{post.title}
							</h3>
							<p class="text-style-p2 line-clamp-2 text-[var(--color-paragraph-2)]">
								{post.description}
							</p>
							<div class="mt-auto flex items-end justify-between gap-4 pt-1">
								<Button href={post.href} class="text-style-p2">
									Читать далее
								</Button>
								<time
									datetime="2026-01-01"
									class="text-style-p1 text-[var(--color-paragraph-2)]"
								>
									{post.date}
								</time>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>

		{#if canScrollLeft || canScrollRight}
			<div class="blog-carousel-nav md:hidden">
				{#if canScrollLeft}
					<button
						type="button"
						class="blog-carousel-arrow"
						aria-label="Прокрутить посты влево"
						onclick={() => scrollToAdjacentSlide('prev')}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
							<path d="M14.5 5L7.5 12L14.5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				{/if}
				{#if canScrollRight}
					<button
						type="button"
						class="blog-carousel-arrow ml-auto"
						aria-label="Прокрутить посты вправо"
						onclick={() => scrollToAdjacentSlide('next')}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
							<path d="M9.5 5L16.5 12L9.5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.blog-scroll {
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.blog-scroll::-webkit-scrollbar {
		display: none;
	}

	.blog-carousel-wrap {
		position: relative;
	}

	.blog-carousel-nav {
		position: absolute;
		top: calc(50% - 8px);
		left: 0;
		right: 0;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		padding: 0 0.5rem;
		pointer-events: none;
	}

	.blog-carousel-arrow {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.24);
		background: rgba(0, 0, 0, 0.55);
		color: #fff;
		backdrop-filter: blur(4px);
	}
</style>
