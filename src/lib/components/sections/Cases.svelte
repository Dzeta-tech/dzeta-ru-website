<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import patoshiSvg from '$lib/assets/patoshi.svg?raw';
	import patoshi1Svg from '$lib/assets/patoshi1.svg?raw';
	import patoshi2Svg from '$lib/assets/patoshi2.svg?raw';
	import patoshi3Svg from '$lib/assets/patoshi3.svg?raw';
	import izzySvg from '$lib/assets/izzy.svg?raw';
	import izzy1Svg from '$lib/assets/izzy1.svg?raw';
	import izzy2Svg from '$lib/assets/izzy2.svg?raw';
	import izzy3Svg from '$lib/assets/izzy3.svg?raw';
	import rpsSvg from '$lib/assets/rps.svg?raw';
	import rps1Svg from '$lib/assets/rps1.svg?raw';
	import rps2Svg from '$lib/assets/rps2.svg?raw';
	import rps3Svg from '$lib/assets/rps3.svg?raw';
	import lisSvg from '$lib/assets/lis.svg?raw';
	import lis1Svg from '$lib/assets/lis1.svg?raw';
	import lis2Svg from '$lib/assets/lis2.svg?raw';
	import lis3Svg from '$lib/assets/lis3.svg?raw';
	import bricktradeSvg from '$lib/assets/bricktrade.svg?raw';
	import bricktrade1Svg from '$lib/assets/bricktrade1.svg?raw';
	import bricktrade2Svg from '$lib/assets/bricktrade2.svg?raw';
	import bricktrade3Svg from '$lib/assets/bricktrade3.svg?raw';
	import c01Svg from '$lib/assets/01.svg?raw';
	import c02Svg from '$lib/assets/02.svg?raw';
	import c03Svg from '$lib/assets/03.svg?raw';
	import c04Svg from '$lib/assets/04.svg?raw';
	import c05Svg from '$lib/assets/05.svg?raw';
	import c06Svg from '$lib/assets/06.svg?raw';
	import c07Svg from '$lib/assets/07.svg?raw';
	import c08Svg from '$lib/assets/08.svg?raw';
	import c09Svg from '$lib/assets/09.svg?raw';
	import c10Svg from '$lib/assets/10.svg?raw';
	import c11Svg from '$lib/assets/11.svg?raw';

	interface CaseItem {
		id: string;
		name: string;
		subtitle: string;
		description: string;
		link?: string;
		images: string[];
	}

	const cases: CaseItem[] = [
		{
			id: 'patoshi',
			name: 'PATOSHI',
			subtitle: 'Telegram Mini App',
			description:
				'Игровой продукт в формате Telegram Mini App с real-time механиками и элементами блокчейна.',
			link: '#',
			images: [patoshiSvg, patoshi1Svg, patoshi2Svg, patoshi3Svg]
		},
		{
			id: 'izzy',
			name: 'Izzy Booking',
			subtitle: 'Сервис бронирования мест для отдыха',
			description:
				'Монетизация платформы для бронирования мест отдыха, создание алгоритмов подбора и системы оплаты.',
			link: '#',
			images: [izzySvg, izzy1Svg, izzy2Svg, izzy3Svg]
		},
		{
			id: 'rps',
			name: 'Rock, Paper, Scissors',
			subtitle: 'Telegram Mini App',
			description:
				'Игровой продукт в формате Telegram Mini App с элементами монетизации и экономики токена.',
			link: '#',
			images: [rpsSvg, rps1Svg, rps2Svg, rps3Svg]
		},
		{
			id: 'lis',
			name: 'ЛИС',
			subtitle: 'Бизнес CRM',
			description:
				'Комплексная CRM-система, призванная упростить и автоматизировать бизнес-процессы.',
			link: '#',
			images: [lisSvg, lis1Svg, lis2Svg, lis3Svg]
		},
		{
			id: 'bricktrade',
			name: 'БРИКТРЕЙД',
			subtitle: 'Цифровая платформа и система управления продажами',
			description:
				'Цифровизация для компаний, работающих в нише B2B и B2C продаж, товаров на основе метаданных, улучшение процессов.',
			link: '#',
			images: [bricktradeSvg, bricktrade1Svg, bricktrade2Svg, bricktrade3Svg]
		},
		{
			id: 'coinstruct',
			name: 'Coinstruct.tech',
			subtitle: 'Web3 компания, специализирующаяся на токеномике и симуляциях',
			description:
				'DSO платформа для выпуска нового криптовалютного продукта, симуляция и экономика токена.',
			link: '#',
			images: [c01Svg, c02Svg, c03Svg, c04Svg, c05Svg, c06Svg, c07Svg, c08Svg, c09Svg, c10Svg, c11Svg]
		}
	];

	let carouselRefs: Array<HTMLDivElement | null> = [];
	let canScrollLeft = $state(Array(cases.length).fill(false));
	let canScrollRight = $state(Array(cases.length).fill(false));
	let slidesSkeletonReady = $state(false);

	function setScrollState(index: number, left: boolean, right: boolean) {
		const leftState = [...canScrollLeft];
		const rightState = [...canScrollRight];
		leftState[index] = left;
		rightState[index] = right;
		canScrollLeft = leftState;
		canScrollRight = rightState;
	}

	function updateCarouselState(index: number) {
		const carousel = carouselRefs[index];
		if (!carousel) return;

		const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
		const hasOverflow = maxScrollLeft > 1;
		const current = carousel.scrollLeft;
		const edgeThreshold = 4;

		setScrollState(
			index,
			hasOverflow && current > edgeThreshold,
			hasOverflow && current < maxScrollLeft - edgeThreshold
		);
	}

	function registerCarousel(node: HTMLDivElement, index: number) {
		carouselRefs[index] = node;
		const handleScroll = () => updateCarouselState(index);
		node.addEventListener('scroll', handleScroll, { passive: true });
		requestAnimationFrame(() => updateCarouselState(index));

		return {
			destroy() {
				node.removeEventListener('scroll', handleScroll);
				carouselRefs[index] = null;
			}
		};
	}

	function scrollToAdjacentSlide(index: number, direction: 'prev' | 'next') {
		const carousel = carouselRefs[index];
		if (!carousel) return;

		const slides = Array.from(carousel.querySelectorAll<HTMLElement>('.case-carousel__slide'));
		if (!slides.length) return;

		const currentLeft = carousel.scrollLeft;
		let targetLeft = currentLeft;

		if (direction === 'next') {
			const nextSlide = slides.find((slide) => slide.offsetLeft > currentLeft + 4);
			targetLeft = (nextSlide ?? slides[slides.length - 1]).offsetLeft;
		} else {
			const reversed = [...slides].reverse();
			const prevSlide = reversed.find((slide) => slide.offsetLeft < currentLeft - 4);
			targetLeft = (prevSlide ?? slides[0]).offsetLeft;
		}

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		carousel.scrollTo({
			left: targetLeft,
			behavior: prefersReducedMotion ? 'auto' : 'smooth'
		});
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		const updateAll = () => {
			for (let i = 0; i < cases.length; i += 1) {
				updateCarouselState(i);
			}
		};

		const handleResize = () => updateAll();
		window.addEventListener('resize', handleResize, { passive: true });
		requestAnimationFrame(updateAll);
		const delayedInit = window.setTimeout(updateAll, 220);
		const skeletonTimer = window.setTimeout(() => {
			slidesSkeletonReady = true;
		}, 120);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.clearTimeout(delayedInit);
			window.clearTimeout(skeletonTimer);
		};
	});
</script>

<section
	id="cases"
	data-snap
	class="scroll-mt-16 px-[30px] bg-[var(--color-background-primary)] py-16 md:py-24"
	aria-labelledby="cases-heading"
>
	<div>
		<h2
			id="cases-heading"
			class="text-style-h2 mb-[40px] text-[var(--color-paragraph-1)]"
			use:reveal={{ delay: 0 }}
		>
			Кейсы
		</h2>
	</div>

	{#each cases as item, i}
		<article
			class="mb-16 last:mb-0 md:mb-24"
			aria-labelledby="case-{item.id}-title"
			use:reveal={{ delay: 80 + i * 60 }}
		>
			<!-- Карусель: горизонтальный скролл изображений -->
			<div class="case-carousel-wrap mb-[20px]">
				<div
					class="case-carousel flex gap-4 overflow-x-auto pb-2 md:gap-6"
					role="region"
					aria-label="Изображения проекта {item.name}"
					data-native-scroll
					use:registerCarousel={i}
				>
					{#each item.images as svg}
						<div
							class="case-carousel__slide flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--color-paragraph-1)]"
							style="width: min(85vw, 520px); height: min(50vw, 320px);"
						>
							<div
								class="case-carousel__skeleton"
								class:loaded={slidesSkeletonReady}
								aria-hidden="true"
							></div>
							<div class="case-carousel__svg h-full w-full" aria-hidden="true">
								{@html svg}
							</div>
						</div>
					{/each}
				</div>

				{#if canScrollLeft[i] || canScrollRight[i]}
					<div class="case-carousel-nav md:hidden">
						{#if canScrollLeft[i]}
							<button
								type="button"
								class="case-carousel-arrow"
								aria-label="Прокрутить изображения влево"
								onclick={() => scrollToAdjacentSlide(i, 'prev')}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path d="M14.5 5L7.5 12L14.5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						{/if}
						{#if canScrollRight[i]}
							<button
								type="button"
								class="case-carousel-arrow ml-auto"
								aria-label="Прокрутить изображения вправо"
								onclick={() => scrollToAdjacentSlide(i, 'next')}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
									<path d="M9.5 5L16.5 12L9.5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</button>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Ниже: заголовок и описание -->
			<div
				class="case-footer flex flex-col gap-[16px] rounded-2xl md:flex-row md:justify-between"
			>
				<p class="text-style-p2 text-[var(--color-paragraph-2)]">Кейс</p>
				<div class="flex-1 flex-col ">
					<h3 id="case-{item.id}-title" class="text-style-h4 text-[var(--color-paragraph-1)]">
						{item.name}
					</h3>
					<p class="text-style-p2 mt-1 text-[var(--color-paragraph-2)]">{item.subtitle}</p>
				</div>
				<div class="md:max-w-sm">
					<p class="text-style-p1 text-[var(--color-paragraph-1)]">{item.description}</p>
					{#if item.link}
						<a
							href={item.link}
							class="text-style-p2 mt-3 inline-block text-[var(--color-paragraph-2)] transition-colors hover:text-[var(--color-paragraph-1)]"
						>
							Откройте →
						</a>
					{/if}
				</div>
			</div>
		</article>
	{/each}
</section>

<style>
	.case-carousel {
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.case-carousel::-webkit-scrollbar {
		display: none;
	}
	.case-carousel__slide {
		position: relative;
	}

	.case-carousel__skeleton {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			rgba(255, 255, 255, 0.08) 40%,
			rgba(255, 255, 255, 0.12) 50%,
			rgba(255, 255, 255, 0.08) 60%
		);
		background-size: 200% 100%;
		animation: case-skeleton-shine 1.2s ease-in-out infinite;
		opacity: 1;
		transition: opacity 0.25s ease;
		pointer-events: none;
	}

	.case-carousel__skeleton.loaded {
		opacity: 0;
		animation: none;
	}

	@keyframes case-skeleton-shine {
		to {
			background-position: 200% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.case-carousel__skeleton {
			animation: none;
		}
	}

	.case-carousel__svg :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.case-carousel-wrap {
		position: relative;
	}

	.case-carousel-nav {
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

	.case-carousel-arrow {
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
