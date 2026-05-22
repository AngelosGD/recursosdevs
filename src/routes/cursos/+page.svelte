<script>
	import CardCurso from '$lib/components/cardCurso.svelte';

	let { data } = $props();
	let todosLosCursos = $derived(data.cursos);
	let session = $derived(data.session);

	let paginaActual = $state(1);
	const porPagina = 12;

	let categoriaActiva = $state('Todos');
	let busqueda = $state('');
	let nivelActivo = $state('Todos');
	let precioActivo = $state('Todos');

	let todasCategorias = $derived([
		'Todos',
		...new Set(todosLosCursos.flatMap((c) => c.categorias))
	]);
	const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado', 'Variado'];
	const precios = ['Todos', 'Gratis', 'De pago', 'Freemium'];

	let cursosFiltrados = $derived(
		(() => {
			let lista = todosLosCursos;

			if (categoriaActiva !== 'Todos') {
				lista = lista.filter((c) => c.categorias.includes(categoriaActiva));
			}

			if (nivelActivo !== 'Todos') {
				lista = lista.filter((c) => c.nivel === nivelActivo);
			}

			if (precioActivo !== 'Todos') {
				lista = lista.filter((c) => c.precio === precioActivo);
			}

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

	let totalPaginas = $derived(Math.ceil(cursosFiltrados.length / porPagina));

	let cursosPagina = $derived(
		cursosFiltrados.slice((paginaActual - 1) * porPagina, paginaActual * porPagina)
	);

	let paginas = $derived(Array.from({ length: totalPaginas }, (_, i) => i + 1));

	function irPagina(nuevaPagina) {
		paginaActual = Math.max(1, Math.min(nuevaPagina, totalPaginas));
	}

	function limpiarFiltros() {
		categoriaActiva = 'Todos';
		nivelActivo = 'Todos';
		precioActivo = 'Todos';
		busqueda = '';
		paginaActual = 1;
	}

	let sidebarAbierta = $state(false);
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

<!-- Buscador -->
<div class="px-4 mb-6">
	<input
		bind:value={busqueda}
		placeholder="Buscar curso por nombre, instructor..."
		class="w-full max-w-md mx-auto block border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
	/>
</div>

<!-- Toggle sidebar mobile -->
<div class="px-4 mb-4">
	<button
		onclick={() => (sidebarAbierta = !sidebarAbierta)}
		class="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300"
	>
		<span>Filtros</span>
		<svg
			class="w-5 h-5 transition-transform {sidebarAbierta ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
</div>

<!-- Filtros sidebar -->
<div class="flex flex-col lg:flex-row gap-6 px-4 mb-8">
	<aside class="w-full lg:w-64 shrink-0 space-y-6 {sidebarAbierta ? 'block' : 'hidden lg:block'}">
		<!-- Categorías -->
		<div>
			<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categoría</h3>
			<div class="flex flex-wrap lg:flex-col gap-2">
				{#each todasCategorias as cat (cat)}
					<button
						onclick={() => (categoriaActiva = cat)}
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {categoriaActiva ===
						cat
							? 'bg-blue-600 text-white dark:bg-blue-500'
							: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		<!-- Nivel -->
		<div>
			<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Nivel</h3>
			<div class="flex flex-wrap lg:flex-col gap-2">
				{#each niveles as nivel (nivel)}
					<button
						onclick={() => (nivelActivo = nivel)}
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {nivelActivo ===
						nivel
							? 'bg-blue-600 text-white dark:bg-blue-500'
							: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{nivel}
					</button>
				{/each}
			</div>
		</div>

		<!-- Precio -->
		<div>
			<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Precio</h3>
			<div class="flex flex-wrap lg:flex-col gap-2">
				{#each precios as precio (precio)}
					<button
						onclick={() => (precioActivo = precio)}
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {precioActivo ===
						precio
							? 'bg-blue-600 text-white dark:bg-blue-500'
							: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{precio}
					</button>
				{/each}
			</div>
		</div>

		<button
			onclick={limpiarFiltros}
			class="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
		>
			Limpiar filtros
		</button>
	</aside>

	<div class="flex-1">
		<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
			{cursosFiltrados.length} cursos encontrados
		</p>
		{#if cursosFiltrados.length === 0}
			<div class="text-center py-16 px-4">
				<p class="text-5xl mb-4">📚</p>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
					No hay cursos todavía
				</h2>
				<p class="text-gray-500 dark:text-gray-400">Pronto añadiremos los mejores cursos para ti</p>
			</div>
		{:else}
			<!-- Grid cursos -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{#each cursosPagina as curso (curso.id)}
					<CardCurso {...curso} {session} />
				{/each}
			</div>

			<!-- Paginación -->
			{#if totalPaginas > 1}
				<div class="flex items-center justify-center gap-2 mt-12 mb-20 px-4">
					{#if paginaActual > 1}
						<button
							onclick={() => irPagina(paginaActual - 1)}
							class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							← Anterior
						</button>
					{/if}

					<div class="flex gap-1">
						{#each paginas as pageNum (pageNum)}
							<button
								onclick={() => irPagina(pageNum)}
								class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors {pageNum ===
								paginaActual
									? 'bg-blue-600 text-white'
									: 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
							>
								{pageNum}
							</button>
						{/each}
					</div>

					{#if paginaActual < totalPaginas}
						<button
							onclick={() => irPagina(paginaActual + 1)}
							class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							Siguiente →
						</button>
					{/if}
				</div>
			{/if}
		{/if}
	</div>
</div>
