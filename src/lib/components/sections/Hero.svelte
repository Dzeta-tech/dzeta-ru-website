<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components';
	import { reveal } from '$lib/actions/reveal';
	import logoSvg from '$lib/assets/logo.svg?raw';

	const tags = ['WEB', 'Mobile', 'Telegram', 'AI', 'Highload'] as const;
	let step = $state(1);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			step = 4;
			return;
		}

		const t1 = window.setTimeout(() => (step = 2), 650);
		const t2 = window.setTimeout(() => (step = 3), 1900);
		const t3 = window.setTimeout(() => (step = 4), 3200);

		return () => {
			window.clearTimeout(t1);
			window.clearTimeout(t2);
			window.clearTimeout(t3);
		};
	});
</script>

<section
	class="bg-[var(--color-background-primary)] px-4 pt-4 sm:px-6 lg:px-8"
	aria-label="Главный экран"
>
	<div class="mx-auto w-full max-w-7xl pb-20 relative">
		{#if step === 1}
			<div class="hero-empty" aria-hidden="true"></div>
		{/if}

		{#if step >= 2}
			<div class="hero-skeleton" class:is-final={step === 4}>
				<div class="sk-row sk-row-1" class:draw={step >= 2}>
					<span class="line top"></span>
					<span class="line bottom"></span>
				</div>

				<div class="sk-row sk-row-2 py-5 md:py-7" class:draw={step >= 2}>
					<span class="line top"></span>
					<span class="line bottom"></span>
					<h1 class="hero-title" class:is-visible={step >= 3}>
						Создаём цифровые продукты, которые приносят бизнес-результат
					</h1>
				</div>

				<div class="sk-row sk-row-3 py-4" class:draw={step >= 2}>
					<span class="line top"></span>
					<span class="line bottom"></span>
					<div class="hero-placeholder-strip" class:is-visible={step >= 3} aria-hidden="true">
						<span class="dash"></span><span class="dot"></span><span class="dash"></span><span class="dot"></span>
						<span class="dash"></span><span class="dot"></span><span class="dash"></span><span class="dot"></span>
						<span class="dash"></span>
					</div>
				</div>

				<div class="sk-row sk-row-4 py-4" class:draw={step >= 2}>
					<span class="line top"></span>
					<span class="line bottom"></span>
					<div class="hero-placeholder-buttons" class:is-visible={step >= 3} aria-hidden="true">
						<span class="btn-ph"></span>
						<span class="btn-ph"></span>
					</div>
				</div>
			</div>
		{/if}

		<div class="hero-final" class:is-visible={step === 4}>
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
				<Button>Обсудить проект</Button>
				<Button variant="outline">Посмотреть кейсы</Button>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-empty {
		height: min(62vh, 560px);
	}

	.hero-skeleton {
		opacity: 1;
		transition: opacity 0.35s ease;
	}
	.hero-skeleton.is-final {
		opacity: 0;
		pointer-events: none;
	}

	.sk-row {
		position: relative;
		min-height: 38px;
		overflow: hidden;
	}
	.sk-row-1 {
		min-height: 134px;
	}
	.sk-row-2 {
		min-height: 140px;
	}
	.sk-row-3 {
		min-height: 30px;
	}
	.sk-row-4 {
		min-height: 38px;
	}

	.line {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--color-paragraph-2);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.65s ease;
	}
	.line.top {
		top: 0;
	}
	.line.bottom {
		bottom: 0;
	}
	.sk-row.draw .line {
		transform: scaleX(1);
	}
	.sk-row-2 .line {
		transition-delay: 0.08s;
	}
	.sk-row-3 .line {
		transition-delay: 0.14s;
	}
	.sk-row-4 .line {
		transition-delay: 0.2s;
	}

	.hero-title {
		margin: 0;
		font-family: Helvetica, Arial, 'Helvetica Neue', sans-serif;
		font-size: clamp(2rem, 4.5vw, 4rem);
		line-height: 1.1;
		letter-spacing: -0.05em;
		color: var(--color-paragraph-1);
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.35s ease,
			transform 0.35s ease;
	}
	.hero-title.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	.hero-placeholder-strip {
		display: flex;
		align-items: center;
		gap: 10px;
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.hero-placeholder-strip.is-visible {
		opacity: 1;
	}
	.dash {
		display: inline-block;
		width: 52px;
		height: 12px;
		border: 1px solid var(--color-paragraph-2);
		border-radius: 2px;
	}
	.dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: var(--color-paragraph-2);
	}

	.hero-placeholder-buttons {
		display: flex;
		gap: 16px;
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.hero-placeholder-buttons.is-visible {
		opacity: 1;
	}
	.btn-ph {
		width: 150px;
		height: 36px;
		border: 1px solid var(--color-paragraph-2);
		border-radius: 999px;
	}

	.hero-final {
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.45s ease,
			transform 0.45s ease;
		pointer-events: none;
	}
	.hero-final.is-visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
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

	@media (prefers-reduced-motion: reduce) {
		.line,
		.hero-title,
		.hero-placeholder-strip,
		.hero-placeholder-buttons,
		.hero-skeleton,
		.hero-final {
			transition: none;
		}
		.line {
			transform: scaleX(1);
		}
		.hero-title,
		.hero-placeholder-strip,
		.hero-placeholder-buttons,
		.hero-final {
			opacity: 1;
			transform: none;
		}
	}
</style>
