<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';
	let { children, data } = $props();
</script>

<div class="particulas">
	{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as i}
		<span
			class="particula"
			style="
			left: {(i * 8.5) % 100}%;
			animation-duration: {8 + ((i * 1.3) % 7)}s;
			animation-delay: {(i * 0.8) % 6}s;
			font-size: {12 + ((i * 2) % 8)}px;
		"
		>
			{i % 3 === 0 ? '</>' : i % 3 === 1 ? '{  }' : '=>'}
		</span>
	{/each}
</div>

<div style="position: relative; z-index: 1;">
	<Navbar session={data.session} />

	{#if page.url.pathname === '/login'}
		{@render children()}
	{:else if page.url.pathname.startsWith('/admin')}
		<main class="max-w-6xl mx-auto px-6 py-10">
			{@render children()}
		</main>
	{:else}
		<main class="max-w-6xl mx-auto px-6 py-10">
			{@render children()}
		</main>
		<Footer />
	{/if}
</div>
