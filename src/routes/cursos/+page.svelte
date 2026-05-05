<script>
	import CardCurso from '$lib/components/cardCurso.svelte';
	import { page } from '$app/state';

	let { data } = $props();
	let cursos = data.cursos;
	let session = data.session;
	let pagination = data.pagination;

	let categoriaActiva = $state('Todos');
	let busqueda = $state('');

	const todasCategorias = ['Todos', ...new Set(cursos.flatMap((c) => c.categorias))];

	let cursosFiltrados = $derived(
		(() => {
			let lista =
				categoriaActiva === 'Todos'
					? cursos
					: cursos.filter((c) => c.categorias.includes(categoriaActiva));

			if (busqueda.trim()) {
				lista = lista.filter(
					(c) =>
						c.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
						c.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
						(c.instructor && c.instructor.toLowerCase().includes(busqueda.toLowerCase()))
				);
			}

			return lista;
		})()
	);
</script>

<svelte:head>
	<title>Cursos - devRekursos</title>
</svelte:head>

<!-- Hero -->
<section class="text-center py-8 sm:py-14 px-4">
	<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
		Cursos de <span class="text-blue-600 dark:text-blue-400">Programación</span>
	</h1>
	<p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8">
		Aprende con los mejores cursos recomendados por la comunidad de desarrolladores
	</p>
</section>

<!-- Filtros -->
<div class="px-4">
	<div class="flex flex-wrap gap-2 mb-6">
		{#each todasCategorias as cat (cat)}
			<button
				onclick={() => (categoriaActiva = cat)}
				class="px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors
					{categoriaActiva === cat
					? 'bg-blue-600 text-white dark:bg-blue-500'
					: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
			>
				{cat}
			</button>
		{/each}
	</div>
</div>

<!-- Buscador -->
<div class="px-4 mb-6">
	<input
		bind:value={busqueda}
		placeholder="Buscar curso por nombre, instructor..."
		class="w-full max-w-md mx-auto block border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
	/>
</div>

{#if cursosFiltrados.length === 0}
	<div class="text-center py-16 px-4">
		<p class="text-5xl mb-4">📚</p>
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay cursos todavía</h2>
		<p class="text-gray-500 dark:text-gray-400">Pronto añadiremos los mejores cursos para ti</p>
	</div>
{:else}
	<!-- Grid cursos -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
		{#each cursosFiltrados as curso (curso.id)}
			<CardCurso {...curso} {session} />
		{/each}
	</div>

	<!-- Paginación -->
	{#if pagination.totalPages > 1}
		<div class="flex items-center justify-center gap-2 mt-12 mb-20 px-4">
			{#if pagination.page > 1}
				<a
					href="/cursos?page={pagination.page - 1}"
					class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					← Anterior
				</a>
			{/if}

			<div class="flex gap-1">
				{#each Array(pagination.totalPages) as _, i}
					{@const pageNum = i + 1}
					<a
						href="/cursos?page={pageNum}"
						class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors {pageNum ===
						pagination.page
							? 'bg-blue-600 text-white'
							: 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
					>
						{pageNum}
					</a>
				{/each}
			</div>

			{#if pagination.page < pagination.totalPages}
				<a
					href="/cursos?page={pagination.page + 1}"
					class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					Siguiente →
				</a>
			{/if}
		</div>
	{/if}
{/if}
