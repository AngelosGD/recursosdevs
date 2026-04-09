<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>
<Navbar/>
<main class="max-w-6xl mx-auto px-6 py-10">
	{@render children()}
</main>