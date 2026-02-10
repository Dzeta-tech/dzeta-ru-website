<script lang="ts">
	import { Button } from '$lib/components';

	const posts = Array.from({ length: 5 }, (_, i) => ({
		slug: `mock-${i + 1}`,
		imageOverlay: 'Update on Withdrawals',
		title: 'Name of topic',
		description:
			'Комплексная автоматизация взаимодействия через Telegram-ботов для крупного медиа',
		date: '00.00.2026',
		href: '#'
	}));
</script>

<section
	id="blog"
	class="scroll-mt-16 bg-[var(--color-header-bg)] py-16 md:py-24"
	aria-labelledby="blog-heading"
>
	<div class="sm:px-6 lg:px-8">
		<h2 id="blog-heading" class="text-style-h2 mb-[40px] text-[var(--color-paragraph-1)]">
			Блог
		</h2>
		<p class="text-style-h3 mb-[40px] text-[var(--color-paragraph-1)]">
			Инсайты о web3-разработке, токеномике и создании успешных крипто-проектов.
		</p>
	</div>

	<div
		class="blog-scroll flex gap-6 overflow-x-auto px-4 pb-2 pt-2 md:gap-8 md:px-6"
		role="region"
		aria-label="Список постов блога"
	>
		{#each posts as post}
			<article
				class="blog-card flex-shrink-0 rounded-[36px] bg-[var(--color-background-secondary)] p-5"
				style="width: min(92vw, 520px);"
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
</style>
