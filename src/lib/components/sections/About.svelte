<script lang="ts">
	import { IconCode, IconRocket, IconSettings, IconServer, IconEdit, IconBrain, IconSearch } from '$lib/components/icons';
	import { reveal } from '$lib/actions/reveal';
	import tbankLogo from '$lib/assets/tbank.webp';
	import nornikelLogo from '$lib/assets/nornikel.webp';
	import sberLogo from '$lib/assets/sber.webp';
	import academy1 from '$lib/assets/1.webp';
	import academy2 from '$lib/assets/2.webp';
	import academy3 from '$lib/assets/3.webp';
	import academy4 from '$lib/assets/4.webp';
	import academy5 from '$lib/assets/5.webp';
	import academy6 from '$lib/assets/6.webp';

	const benefits = [
		{ icon: IconSearch, label: 'Фокус на бизнес-результат и прибыль' },
		{ icon: IconRocket, label: 'Вовлечение в рост и развитие продукта' },
		{ icon: IconSettings, label: 'Простые и масштабируемые решения' }
	] as const;

	const competencies = [
		{ icon: IconCode, label: 'Продукт и технологии' },
		{ icon: IconBrain, label: 'Автоматизация и AI' },
		{ icon: IconServer, label: 'Инфраструктура и DevOps' },
		{ icon: IconEdit, label: 'UX/UI' }
	] as const;

	const accordionText = 'Мы принимаем решения, исходя из пользы для бизнеса и целей';
	let openedAboutCardId = $state<string | null>(null);

	function toggleAboutCard(cardId: string) {
		openedAboutCardId = openedAboutCardId === cardId ? null : cardId;
	}

	const processSteps = [
		'Цель продукта',
		'Анализ процессов',
		'Архитектура и стек',
		'MVP и развитие',
		'Аудит решений'
	] as const;

	const experienceLogos = [
		{ src: tbankLogo, alt: 'Т-Банк' },
		{ src: nornikelLogo, alt: 'Норникель' },
		{ src: sberLogo, alt: 'Сбер' }
	] as const;
	const academicLogos = [
		{ src: academy1, alt: 'Академическая база 1' },
		{ src: academy2, alt: 'Академическая база 2' },
		{ src: academy3, alt: 'Академическая база 3' },
		{ src: academy4, alt: 'Академическая база 4' },
		{ src: academy5, alt: 'Академическая база 5' },
		{ src: academy6, alt: 'Академическая база 6' }
	] as const;

	type ResultCard = {
		title: string;
		chipRows: string[][];
		layout?: string;
	};

	const results: ResultCard[] = [
		{
			title: '50+ реализованных продуктов и систем:',
			chipRows: [['WEB', 'Mobile'], ['Внутренние платформы'], ['Telegram Mini App', 'Telegram Bot']],
			layout: 'lg:row-span-2'
		},
		{
			title: 'В2В и В2С проекты',
			chipRows: [['Платформы', 'Медиа', 'Классифайды']]
		},
		{
			title: 'Полный цикл разработки',
			chipRows: [['с 0 до MVP', 'Продакшен', 'MVP+']]
		},
		{
			title: 'Highload и real-time решения',
			chipRows: [['Инфраструктура для высокой активности']]
		},
		{
			title: '100K+ MAU в наших игровых и контентных продуктах',
			chipRows: []
		}
	];
</script>

<section
	id="about"
	data-snap
	class="scroll-mt-16 bg-[var(--color-section-alt)] py-16 md:py-24"
	aria-labelledby="about-heading"
>
	<div class="px-4 sm:px-6 lg:px-8">
		<h2
			id="about-heading"
			class="text-style-h2 mb-[40px] text-[var(--color-paragraph-1)]"
			use:reveal={{ delay: 0 }}
		>
			О нас
		</h2>
		<p class="sm:text-style-p2 mb-[40px] text-[var(--color-paragraph-1)] text-style-h3" use:reveal={{ delay: 80 }}>
			ДЗЕТА.ТЕХ — технологический партнёр, который работает не как подрядчик, а как часть вашей
			команды, фокусируясь на продукте и его влиянии на бизнес-результаты.
		</p>

		<!-- Benefits -->
		<div class="mb-[40px] grid gap-4 sm:grid-cols-3">
			{#each benefits as { icon: Icon, label }, i}
				<div
					class="about-accordion-card flex flex-col gap-[20px] rounded-2xl bg-[var(--color-background-secondary)] p-5 shadow-sm"
					class:is-open={openedAboutCardId === `benefit-${i}`}
					use:reveal={{ delay: 120 + i * 70 }}
				>
					<div class="flex gap-3 w-full justify-between">
						<span class="text-[var(--color-paragraph-1)]" aria-hidden="true">
							<Icon size={48} />
						</span>
						<button
							type="button"
							class="about-accordion-toggle"
							aria-label={`Раскрыть карточку: ${label}`}
							aria-expanded={openedAboutCardId === `benefit-${i}`}
							aria-controls={`about-card-content-benefit-${i}`}
							onclick={() => toggleAboutCard(`benefit-${i}`)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#1C1B1F"/>
							</svg>
						</button>
					</div>
					<span class="text-style-h4 text-[var(--color-paragraph-1)]">{label}</span>
					<div
						id={`about-card-content-benefit-${i}`}
						class="about-accordion-content"
						aria-hidden={openedAboutCardId !== `benefit-${i}`}
					>
						<p class="text-style-p2 text-[var(--color-paragraph-2)]">
							{accordionText}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Competencies -->
		<h3 class="text-style-h4 mb-[40px] text-[var(--color-paragraph-1)] md:text-style-h3" use:reveal={{ delay: 0 }}>
			Наши компетенции
		</h3>
		<div class="mb-[40px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each competencies as { icon: Icon, label }, i}
				<div
					class="about-accordion-card flex flex-col gap-[20px] rounded-2xl bg-[var(--color-background-secondary)] p-5 shadow-sm"
					class:is-open={openedAboutCardId === `competency-${i}`}
					use:reveal={{ delay: 80 + i * 60 }}
				>
					<div class="flex items-center gap-3 w-full justify-between">
						<span class="text-[var(--color-paragraph-1)]" aria-hidden="true">
							<Icon size={48} />
						</span>
						<button
							type="button"
							class="about-accordion-toggle"
							aria-label={`Раскрыть карточку: ${label}`}
							aria-expanded={openedAboutCardId === `competency-${i}`}
							aria-controls={`about-card-content-competency-${i}`}
							onclick={() => toggleAboutCard(`competency-${i}`)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#1C1B1F"/>
							</svg>
						</button>
					</div>
					<span class="text-style-h4 text-[var(--color-paragraph-1)]">{label}</span>
					<div
						id={`about-card-content-competency-${i}`}
						class="about-accordion-content"
						aria-hidden={openedAboutCardId !== `competency-${i}`}
					>
						<p class="text-style-p2 text-[var(--color-paragraph-2)]">
							{accordionText}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- How we work -->
		<h3 class="text-style-h4 mb-[40px] text-[var(--color-paragraph-1)] md:text-style-h3" use:reveal={{ delay: 0 }}>
			Как мы работаем
		</h3>
		<div
			class="mb-[40px] flex items-stretch gap-0 overflow-x-auto pb-2"
			data-native-scroll
		>
			{#each processSteps as step, i}
				<div
					class="flex flex-[0_0_220px] flex-col gap-[10px] rounded-2xl bg-[var(--color-background-secondary)] px-5 py-4 md:flex-1"
					use:reveal={{ delay: 80 + i * 70 }}
				>
					<span class="text-style-h2 text-[var(--color-paragraph-2)]">
						{String(i + 1).padStart(2, '0')}
					</span>
					<span class="text-style-h4 text-[var(--color-paragraph-1)]">{step}</span>
				</div>
				{#if i < processSteps.length - 1}
					<div class="flex w-5 shrink-0 items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 30" fill="none" aria-hidden="true">
							<path d="M0.0322266 0C0.424984 5.59374 4.73596 10 10 10C15.264 10 19.575 5.59374 19.9678 0H20V30H19.9678C19.9871 29.725 20 29.4473 20 29.167C20 23.1839 15.5228 18.334 10 18.334C4.47715 18.334 0 23.1839 0 29.167C9.36342e-07 29.4473 0.0129178 29.725 0.0322266 30H0V0H0.0322266Z" fill="white"/>
						</svg>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Experience & team -->
		<h3 class="text-style-h4 mb-[40px] text-[var(--color-paragraph-1)] md:text-style-h3" use:reveal={{ delay: 0 }}>
			Наш опыт и команда
		</h3>
		
		<div
			class="mb-[20px] flex flex-col gap-[20px] rounded-2xl bg-[var(--color-background-secondary)] px-6 py-8 shadow-sm"
			use:reveal={{ delay: 90 }}
		>
			<p class="text-style-h4 text-[var(--color-paragraph-1)]">
				У нас есть опыт работы в крупных технологических и финансовых компаниях
			</p>
			<div class="flex items-center gap-[20px] md:gap-[40px]">
				
				{#each experienceLogos as logo}
					<div
						class="flex flex-1 min-w-0 items-center justify-center"
					>
						<img src={logo.src} alt={logo.alt} class="h-auto w-full max-w-full object-contain" loading="lazy" />
					</div>
				{/each}
			</div>
		</div>

		<div
			class="mb-[40px] flex flex-col gap-[20px] rounded-2xl bg-[var(--color-background-secondary)] px-6 py-8 shadow-sm"
			use:reveal={{ delay: 160 }}
		>
			<p class="text-style-h4 text-[var(--color-paragraph-1)]">И сильная академическая база</p>
			<div class="flex items-center gap-[20px] md:gap-[40px]">
				{#each academicLogos as logo, i}
					<div
						class={i === academicLogos.length - 1
							? 'flex min-w-0 items-center justify-center flex-1 md:flex-[4]'
							: 'flex flex-1 min-w-0 items-center justify-center'}
					>
						<img
							src={logo.src}
							alt={logo.alt}
							class={i === academicLogos.length - 1
								? 'h-auto w-full max-w-full object-contain md:aspect-[237/73]'
								: 'h-auto w-full max-w-full object-contain'}
							loading="lazy"
						/>
					</div>
				{/each}
			</div>
		</div>

		<!-- Results -->
		<h3 class="text-style-h4 mb-6 text-[var(--color-paragraph-1)] md:text-style-h3" use:reveal={{ delay: 0 }}>
			Наши результаты
		</h3>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each results as result, i}
				<div
					class={`flex flex-col gap-4 rounded-[40px] bg-[var(--color-background-secondary)] p-6 shadow-sm ${result.layout ?? ''}`}
					use:reveal={{ delay: 80 + i * 70 }}
				>
					<p class="text-style-h2 font-medium text-[var(--color-paragraph-1)]">{result.title}</p>
					{#if result.chipRows}
						<div class="flex flex-col gap-3">
							{#each result.chipRows as row}
								<div class="flex flex-wrap gap-2">
									{#each row as tag}
										<span class="rounded-full bg-[var(--color-background-primary)] p-[15px] text-style-p2 text-[#141415]">
											{tag}
										</span>
									{/each}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.about-accordion-card {
		transition:
			box-shadow 0.3s ease,
			transform 0.3s ease;
	}

	.about-accordion-card.is-open {
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
	}

	.about-accordion-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 999px;
		background: transparent;
		cursor: pointer;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease;
	}

	.about-accordion-toggle:hover {
		background: rgba(0, 0, 0, 0.04);
		border-color: rgba(0, 0, 0, 0.15);
	}

	.about-accordion-toggle svg {
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.about-accordion-card.is-open .about-accordion-toggle svg {
		transform: rotate(180deg);
	}

	.about-accordion-content {
		display: grid;
		grid-template-rows: 0fr;
		transition:
			grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			margin-top 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		margin-top: 0;
	}

	.about-accordion-content p {
		overflow: hidden;
		opacity: 0;
		transform: translateY(-4px);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.about-accordion-card.is-open .about-accordion-content {
		grid-template-rows: 1fr;
		margin-top: -0.25rem;
	}

	.about-accordion-card.is-open .about-accordion-content p {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.about-accordion-toggle svg,
		.about-accordion-content,
		.about-accordion-content p {
			transition: none;
		}
	}
</style>
