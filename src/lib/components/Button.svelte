<script lang="ts">
	interface Props {
		variant?: 'default' | 'outline' | 'disabled';
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		disabled?: boolean;
		class?: string;
		/** Slot: label text */
		children?: import('svelte').Snippet;
		/** Slot: icon before label */
		iconLeft?: import('svelte').Snippet;
		/** Slot: icon after label */
		iconRight?: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		type = 'button',
		href,
		disabled = false,
		class: className = '',
		children,
		iconLeft,
		iconRight
	}: Props = $props();

	const isDisabled = $derived(variant === 'disabled' || disabled);
	const isLink = $derived(typeof href === 'string' && href.length > 0);

	const baseClasses =
		'inline-flex items-center justify-center gap-2 rounded-full py-[10px] px-[15px] font-sans font-normal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background-secondary)]';

	const variantClasses: Record<NonNullable<Props['variant']>, string> = {
		default:
			'bg-[var(--color-button-bg)] text-[var(--color-button-text)] hover:opacity-90 focus-visible:ring-[var(--color-button-bg)]',
		outline:
			'bg-[var(--color-button-bg)] text-[var(--color-button-text)] border-2 border-[var(--color-button-border)] hover:bg-[var(--color-button-border)] hover:text-[var(--color-paragraph-1)] focus-visible:ring-[var(--color-button-border)]',
		disabled:
			'bg-[var(--color-button-bg-disabled)] text-[var(--color-button-text)] cursor-not-allowed opacity-90'
	};

	const classes = $derived(`${baseClasses} ${variantClasses[variant]} ${className}`.trim());
	const textClasses = 'text-style-p2';
</script>

{#if isLink && !isDisabled}
	<a {href} class={classes}>
		{#if iconLeft}
			<span class="inline-flex shrink-0 [&_svg]:size-5" aria-hidden="true">
				{@render iconLeft()}
			</span>
		{/if}
		{#if children}
			<span class={textClasses}>{@render children()}</span>
		{/if}
		{#if iconRight}
			<span class="inline-flex shrink-0 [&_svg]:size-5" aria-hidden="true">
				{@render iconRight()}
			</span>
		{/if}
	</a>
{:else}
	<button
		{type}
		class={classes}
		disabled={isDisabled}
		aria-disabled={isDisabled}
	>
		{#if iconLeft}
			<span class="inline-flex shrink-0 [&_svg]:size-5" aria-hidden="true">
				{@render iconLeft()}
			</span>
		{/if}
		{#if children}
			<span class={textClasses}>{@render children()}</span>
		{/if}
		{#if iconRight}
			<span class="inline-flex shrink-0 [&_svg]:size-5" aria-hidden="true">
				{@render iconRight()}
			</span>
		{/if}
	</button>
{/if}
