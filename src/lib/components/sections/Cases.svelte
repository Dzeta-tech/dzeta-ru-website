<script lang="ts">
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
</script>

<section
	id="cases"
	class="scroll-mt-16 px-[30px] bg-[var(--color-background-primary)] py-16 md:py-24"
	aria-labelledby="cases-heading"
>
	<div>
		<h2 id="cases-heading" class="text-style-h2 mb-[40px] text-[var(--color-paragraph-1)]">
			Кейсы
		</h2>
	</div>

	{#each cases as item}
		<article class="mb-16 last:mb-0 md:mb-24" aria-labelledby="case-{item.id}-title">
			<!-- Карусель: горизонтальный скролл изображений -->
			<div
				class="case-carousel flex gap-4 overflow-x-auto pb-2 md:gap-6 mb-[20px]"
				role="region"
				aria-label="Изображения проекта {item.name}"
			>
				{#each item.images as svg}
					<div
						class="case-carousel__slide flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--color-paragraph-1)]"
						style="width: min(85vw, 520px); height: min(50vw, 320px);"
					>
						<div class="case-carousel__svg h-full w-full" aria-hidden="true">
							{@html svg}
						</div>
					</div>
				{/each}
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
	.case-carousel__svg :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
