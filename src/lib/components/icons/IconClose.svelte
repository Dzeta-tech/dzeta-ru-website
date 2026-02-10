<script lang="ts">
	interface Props {
		class?: string;
		size?: number;
	}
	let { class: className = '', size = 24 }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
>
	<path d="M18 6L6 18" />
	<path d="M6 6l12 12" />
</svg>
