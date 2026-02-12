<script lang="ts">
	import { Button } from '$lib/components';
	import { reveal } from '$lib/actions/reveal';
	import logoSvg from '$lib/assets/logo.svg?raw';

	const tags = ['WEB', 'Mobile', 'Telegram', 'AI', 'Highload'] as const;
</script>

<section
	data-snap
	class="hero-section bg-[var(--color-background-primary)] px-4 pt-4 sm:px-6 lg:px-8"
	aria-label="Главный экран"
>
	<div class="mx-auto w-full max-w-7xl pb-20">
		<div class="hero-final-logo" use:reveal={{ delay: 40 }}>
			{@html logoSvg}
		</div>
		<h1 class="hero-final-title" use:reveal={{ delay: 120 }}>
			Создаём цифровые продукты, которые приносят бизнес-результат
		</h1>
		<div class="hero-tags" use:reveal={{ delay: 200 }}>
			{#each tags as tag, i}
				<span class="text-style-h3 text-[var(--color-paragraph-1)]">{tag}</span>
				{#if i < tags.length - 1}
					<span class="hero-dot" aria-hidden="true"></span>
				{/if}
			{/each}
		</div>
		<div class="hero-buttons" use:reveal={{ delay: 280 }}>
			<Button href="#contact">Обсудить проект</Button>
			<Button href="#cases">Посмотреть кейсы</Button>
		</div>
	</div>
</section>

<style>
	.hero-section {
		min-height: 90vh;
	}

	@media (max-width: 767px) {
		.hero-section {
			min-height: 0;
		}
	}

	.hero-final-logo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 6px 0 20px;
	}

	.hero-final-logo :global(svg) {
		display: block;
		width: clamp(180px, 24vw, 290px);
		height: auto;
	}
	.hero-final-title {
		margin: 0 0 20px;
		font-family: Helvetica, Arial, 'Helvetica Neue', sans-serif;
		font-size: clamp(2rem, 4.5vw, 4rem);
		line-height: 1.1;
		letter-spacing: -0.05em;
		color: var(--color-paragraph-1);
	}

	.hero-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1rem;
		align-items: center;
		margin-bottom: 18px;
	}
	.hero-dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--color-paragraph-2);
	}
	.hero-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
</style>
