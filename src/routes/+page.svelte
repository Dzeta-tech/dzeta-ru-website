<script lang="ts">
	import { Hero, About, Blog, Contact } from '$lib/components/sections';
	import { onMount } from 'svelte';

	let CasesComponent = $state<typeof import('$lib/components/sections/Cases.svelte')['default'] | null>(null);
	onMount(async () => {
		const mod = await import('$lib/components/sections/Cases.svelte');
		CasesComponent = mod.default;
	});
</script>

<Hero />
<About />
{#if CasesComponent}
	<CasesComponent />
{/if}
<Blog />
<Contact />
