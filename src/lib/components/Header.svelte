<script lang="ts">
	const navItems = [
		{ label: 'О нас', href: '/#about' },
		{ label: 'Кейсы', href: '/#cases' },
		{ label: 'Блог', href: '/#blog' },
		{ label: 'Связь', href: '/#contact' }
	] as const;

	let mobileOpen = $state(false);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	// Lock body scroll when mobile menu is open
	$effect(() => {
		if (mobileOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<header
	class="sticky top-0 z-50 border-b border-[var(--color-header-border)] bg-[var(--color-header-bg)]"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- Logo -->
		<a
			href="/"
			class="header-logo flex flex-col rounded border border-[var(--color-paragraph-1)] bg-[var(--color-background-secondary)] px-2 py-1 outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--color-paragraph-1)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-header-bg)] md:flex-row md:border-0 md:bg-transparent md:px-0 md:py-0"
			aria-label="На главную"
		>
			<span class="font-sans text-lg font-semibold tracking-tight text-[var(--color-paragraph-1)] md:text-xl">[d<span class="text-[var(--color-paragraph-2)] md:text-[var(--color-paragraph-1)]">.</span>t]</span>
			<span class="mt-0.5 h-px w-full bg-[var(--color-paragraph-1)] md:hidden" aria-hidden="true"></span>
		</a>

		<!-- Desktop / Tablet: horizontal nav -->
		<nav class="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
			{#each navItems as item}
				<a
					href={item.href}
					class="header-nav-link text-style-nav text-[var(--color-paragraph-1)]"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Mobile only: menu toggle (wrapper ensures hidden on md+) -->
		<div class="flex md:hidden">
			<button
				type="button"
				class="header-nav-link text-style-nav text-[var(--color-paragraph-1)]"
				aria-expanded={mobileOpen}
				aria-controls="mobile-menu"
				aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
				onclick={toggleMobile}
			>
				{mobileOpen ? 'Закрыть' : 'Меню'}
			</button>
		</div>
	</div>

	<!-- Mobile overlay menu -->
	<div
		id="mobile-menu"
		class="fixed inset-0 top-16 z-40 bg-[var(--color-header-bg)] transition-opacity duration-300 ease-out md:hidden"
		class:invisible={!mobileOpen}
		class:pointer-events-none={!mobileOpen}
		class:opacity-0={!mobileOpen}
		class:opacity-100={mobileOpen}
		aria-hidden={!mobileOpen}
		role="dialog"
		aria-modal="true"
		aria-label="Меню навигации"
	>
		<nav
			class="flex flex-col gap-1 px-4 py-6 transition-transform duration-300 ease-out"
			class:translate-x-0={mobileOpen}
			class:-translate-x-full={!mobileOpen}
			class:opacity-100={mobileOpen}
			class:opacity-0={!mobileOpen}
			aria-label="Мобильная навигация"
		>
			{#each navItems as item}
				<a
					href={item.href}
					class="header-nav-link w-fit py-3 text-style-nav text-[var(--color-paragraph-1)]"
					onclick={closeMobile}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	/* Hover: underline from left + scale (desktop and mobile nav links) */
	.header-nav-link {
		position: relative;
		display: inline-block;
		transition: transform 0.25s ease;
	}
	.header-nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -2px;
		width: 100%;
		height: 2px;
		background: var(--color-paragraph-1);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s ease;
	}
	.header-nav-link:hover {
		transform: scale(1.05);
	}
	.header-nav-link:hover::after {
		transform: scaleX(1);
	}

	/* Mobile overlay: slide in from left */
	#mobile-menu nav {
		will-change: transform;
	}
</style>
