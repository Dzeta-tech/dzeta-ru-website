<script lang="ts">
	interface Props {
		class?: string;
		size?: number;
	}
	let { class: className = '', size = 24 }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" fill="none" class={className} aria-hidden="true">
	<path d="M4 48V40H44V48H4ZM12 32H14.8L30.4 16.45L27.55 13.6L12 29.2V32ZM8 36V27.5L30.4 5.15C30.7667 4.78333 31.1917 4.5 31.675 4.3C32.1583 4.1 32.6667 4 33.2 4C33.7333 4 34.25 4.1 34.75 4.3C35.25 4.5 35.7 4.8 36.1 5.2L38.85 8C39.25 8.36667 39.5417 8.8 39.725 9.3C39.9083 9.8 40 10.3167 40 10.85C40 11.35 39.9083 11.8417 39.725 12.325C39.5417 12.8083 39.25 13.25 38.85 13.65L16.5 36H8Z" fill="#767676"/>
</svg>
