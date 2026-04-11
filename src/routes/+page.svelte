<script>
	import RecursoCard from '$lib/components/cardResource.svelte';

	let { data } = $props();
	let recursos = data.recursos;

	let categoriaActiva = $state('Todos');

	const todasCategorias = ['Todos', ...new Set(recursos.flatMap((r) => r.categorias))];

	let recursosFiltrados = $derived(
		categoriaActiva === 'Todos'
			? recursos
			: recursos.filter((r) => r.categorias.includes(categoriaActiva))
	);
</script>

<section class="text-center py-14">
	<h1 class="text-5xl font-bold text-gray-900 mb-4">
		Recursos para <span class="text-blue-600">toda LATAM</span>
	</h1>
	<p class="text-gray-500 text-lg max-w-xl mx-auto">
		En esta pagina encontraras recursos sobre todo lo necesario para aprender programacion o
		utilizar herramientas tendencia actuales
	</p>
</section>

<div class="flex flex-wrap gap-2 mb-8">
	{#each todasCategorias as cat (cat)}
		<button
			onclick={() => (categoriaActiva = cat)}
			class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                {categoriaActiva === cat
				? 'bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
		>
			{cat}
		</button>
	{/each}
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each recursosFiltrados as recurso (recurso.id)}
		<RecursoCard {...recurso} />
	{/each}
</div>
