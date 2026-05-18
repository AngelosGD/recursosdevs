<script>
	import RecursoCard from '$lib/components/cardResource.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let recursos = $derived(data.recursos);
	let recientes = $derived(data.recientes);
	let pagination = $derived(data.pagination);
	let session = $derived(data.session);

	let categoriaActiva = $state('Todos');
	let busqueda = $state('');
	let nivelActivo = $state('Todos');
	let idiomaActivo = $state('Todos');

	const todasCategorias = $derived(['Todos', ...new Set(recursos.flatMap((r) => r.categorias))]);
	const niveles = ['Todos', 'Principiante', 'Intermedio', 'Avanzado', 'Variado'];
	const idiomas = ['Todos', 'Español', 'Inglés', 'Variado'];

	let recursosFiltrados = $derived(
		(() => {
			let lista = recursos;

			if (categoriaActiva !== 'Todos') {
				lista = lista.filter((r) => r.categorias.includes(categoriaActiva));
			}

			if (nivelActivo !== 'Todos') {
				lista = lista.filter((r) => r.nivel === nivelActivo);
			}

			if (idiomaActivo !== 'Todos') {
				lista = lista.filter((r) => r.idioma === idiomaActivo);
			}

			if (busqueda.trim()) {
				lista = lista.filter(
					(r) =>
						r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
						r.descripcion.toLowerCase().includes(busqueda.toLowerCase())
				);
			}

			return lista;
		})()
	);

	let carruselActivo = $state(0);

	function irPagina(nuevaPagina) {
		goto(`?page=${nuevaPagina}`, { keepFocus: true });
	}

	function limpiarFiltros() {
		categoriaActiva = 'Todos';
		nivelActivo = 'Todos';
		idiomaActivo = 'Todos';
		busqueda = '';
	}

	let sidebarAbierta = $state(false);
</script>

<!-- Hero -->
<section class="text-center py-8 sm:py-14 px-4">
	<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
		Recursos para <span class="text-blue-600 dark:text-blue-400">todo Programador</span>
	</h1>
	<p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8">
		En esta pagina encontraras recursos sobre todo lo necesario para aprender programacion o
		utilizar herramientas tendencia actuales
	</p>
</section>

<section class="mb-8 sm:mb-14 px-4">
	<div class="bg-blue-600 rounded-2xl p-4 sm:p-8 text-white relative overflow-hidden">
		<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
		<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>

		<div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center relative z-10">
			<div class="w-full sm:w-48 shrink-0 text-center sm:text-left">
				<p class="text-xs uppercase tracking-widest text-blue-200 mb-2">Recién agregados</p>
				<h2 class="text-xl sm:text-2xl font-bold leading-tight mb-3">Salidos del horno 🔥</h2>
				<p class="text-blue-200 text-sm leading-relaxed hidden sm:block">
					No te pierdas los recursos más recientes agregados por otros programadores
				</p>
			</div>

			<div class="flex-1 w-full">
				{#each recientes as r, i (r.id)}
					{#if i === carruselActivo}
						<div
							class="bg-white rounded-2xl p-4 sm:p-5 text-gray-900 shadow-xl flex flex-col sm:flex-row gap-4"
						>
							{#if r.image_url}
								<div class="sm:w-32 sm:shrink-0">
									<img
										src={r.image_url}
										alt={r.titulo}
										class="w-full h-32 sm:h-full sm:min-h-[140px] object-cover rounded-xl"
									/>
								</div>
							{/if}
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-3 flex-wrap">
									{#each r.categorias as cat (cat)}
										<span
											class="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-full font-medium"
											>{cat}</span
										>
									{/each}
									<span
										class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full ml-auto"
										>{r.nivel}</span
									>
								</div>
								<h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-900 mb-1">
									{r.titulo}
								</h3>
								<p class="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
									{r.descripcion}
								</p>
								<a
									href={r.url}
									target="_blank"
									class="group inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-4 sm:px-5 py-2 rounded-xl transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95"
								>
									Ver recurso
									<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
								</a>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="flex items-center justify-center gap-3 mt-4 sm:mt-6 relative z-10">
			{#each recientes as _, idx (_.id)}
				<button
					onclick={() => (carruselActivo = idx)}
					class="transition-all duration-300 rounded-full
                {carruselActivo === idx
						? 'w-6 h-2 bg-white'
						: 'w-2 h-2 bg-white/30 hover:bg-white/60'}"
				>
				</button>
			{/each}
		</div>
	</div>
</section>

<div class="px-4">
	<input
		bind:value={busqueda}
		placeholder="Buscar recurso..."
		class="w-full max-w-md mx-auto block border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 mb-5 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
	/>
</div>

<!-- Toggle sidebar mobile -->
<div class="px-4 mb-4">
	<button
		onclick={() => (sidebarAbierta = !sidebarAbierta)}
		class="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300"
	>
		<span>Filtros</span>
		<svg class="w-5 h-5 transition-transform {sidebarAbierta ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
</div>

<!-- Filtros desktop sidebar + mobile -->
<div class="flex flex-col lg:flex-row gap-6 px-4 mb-8">
	<!-- Sidebar -->
	<aside class="w-full lg:w-64 shrink-0 space-y-6 {sidebarAbierta ? 'block' : 'hidden lg:block'}">
		<!-- Categorías -->
		<div>
			<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categoría</h3>
			<div class="flex flex-wrap lg:flex-col gap-2">
				{#each todasCategorias as cat (cat)}
					<button
						onclick={() => (categoriaActiva = cat)}
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {categoriaActiva === cat
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
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {nivelActivo === nivel
							? 'bg-blue-600 text-white dark:bg-blue-500'
							: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{nivel}
					</button>
				{/each}
			</div>
		</div>

		<!-- Idioma -->
		<div>
			<h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Idioma</h3>
			<div class="flex flex-wrap lg:flex-col gap-2">
				{#each idiomas as idioma (idioma)}
					<button
						onclick={() => (idiomaActivo = idioma)}
						class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors text-left {idiomaActivo === idioma
							? 'bg-blue-600 text-white dark:bg-blue-500'
							: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
					>
						{idioma}
					</button>
				{/each}
			</div>
		</div>

		<!-- Limpiar filtros -->
		<button
			onclick={limpiarFiltros}
			class="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
		>
			Limpiar filtros
		</button>
	</aside>

	<!-- Resultados -->
	<div class="flex-1">
		<p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{recursosFiltrados.length} recursos encontrados</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{#each recursosFiltrados as recurso (recurso.id)}
				<RecursoCard {...recurso} {session} />
			{/each}
		</div>
	</div>
</div>

<!-- Paginación -->
{#if pagination.totalPages > 1}
	<div class="flex items-center justify-center gap-2 mt-12 mb-20 px-4">
		{#if pagination.page > 1}
			<button
				onclick={() => irPagina(pagination.page - 1)}
				class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				← Anterior
			</button>
		{/if}

		<div class="flex gap-1">
			{#each Array(pagination.totalPages) as _, i}
				{@const pageNum = i + 1}
				<button
					onclick={() => irPagina(pageNum)}
					class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors {pageNum ===
					pagination.page
						? 'bg-blue-600 text-white'
						: 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}"
				>
					{pageNum}
				</button>
			{/each}
		</div>

		{#if pagination.page < pagination.totalPages}
			<button
				onclick={() => irPagina(pagination.page + 1)}
				class="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				Siguiente →
			</button>
		{/if}
	</div>
{/if}
