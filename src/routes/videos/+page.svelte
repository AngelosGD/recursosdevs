<script>
	import { goto } from '$app/navigation';
	import VideoActions from '$lib/components/videoActions.svelte';

	let { data } = $props();
	let videos = $derived(data.videos);
	let pagination = $derived(data.pagination);
	let session = $derived(data.session);

	let categoriaActiva = $state('Todos');
	let idiomaActivo = $state('Todos');
	let busqueda = $state('');

	const todasCategorias = $derived(['Todos', ...new Set(videos.flatMap((v) => v.categorias))]);
	const todosIdiomas = $derived(['Todos', ...new Set(videos.flatMap((v) => v.idioma).filter(Boolean))]);

	let videosFiltrados = $derived(
		(() => {
			let lista =
				categoriaActiva === 'Todos'
					? videos
					: videos.filter((v) => v.categorias.includes(categoriaActiva));

			if (idiomaActivo !== 'Todos') {
				lista = lista.filter((v) => v.idioma === idiomaActivo);
			}

			if (busqueda.trim()) {
				lista = lista.filter(
					(v) =>
						v.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
						v.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
						(v.canal && v.canal.toLowerCase().includes(busqueda.toLowerCase()))
				);
			}

			return lista;
		})()
	);

	function irPagina(nuevaPagina) {
		goto(`?page=${nuevaPagina}`, { keepFocus: true });
	}

	function getYouTubeId(url) {
		if (!url) return null;
		const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
		return match ? match[1] : null;
	}
</script>

<svelte:head>
	<title>Videos - devRekursos</title>
</svelte:head>

<section class="text-center py-8 sm:py-14 px-4">
	<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
		Videos de <span class="text-blue-600 dark:text-blue-400">Programación</span>
	</h1>
	<p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-8">
		Aprende con videos sobre conceptos, tips y tricks que todo desarrollador debería conocer
	</p>
</section>

<div class="px-4 mb-6">
	<input
		bind:value={busqueda}
		placeholder="Buscar video por título, canal..."
		class="w-full max-w-md mx-auto block border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
	/>
</div>

<div class="px-4">
	<div class="flex flex-wrap gap-2 mb-4">
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

	{#if todosIdiomas.length > 1}
		<div class="flex flex-wrap gap-2 mb-8">
			{#each todosIdiomas as idioma (idioma)}
				<button
					onclick={() => (idiomaActivo = idioma)}
					class="px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors
						{idiomaActivo === idioma
						? 'bg-green-600 text-white dark:bg-green-500'
						: 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'}"
				>
					{idioma}
				</button>
			{/each}
		</div>
	{/if}
</div>

{#if videosFiltrados.length === 0}
	<div class="text-center py-16 px-4">
		<p class="text-5xl mb-4">🎬</p>
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No hay videos todavía</h2>
		<p class="text-gray-500 dark:text-gray-400">Pronto añadiremos los mejores videos para ti</p>
		<a href="/submit" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
			Sugerir un video
		</a>
	</div>
{:else}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
		{#each videosFiltrados as video (video.id)}
			{@const youtubeId = getYouTubeId(video.url)}
			<a
				href={video.url}
				target="_blank"
				rel="noopener noreferrer"
				class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
			>
				<div class="relative aspect-video bg-gray-900">
					{#if youtubeId}
						<img
							src="https://img.youtube.com/vi/{youtubeId}/hqdefault.jpg"
							alt={video.titulo}
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
						<div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
							<div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
								<svg class="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							</div>
						</div>
					{:else if video.thumbnail}
						<img
							src={video.thumbnail}
							alt={video.titulo}
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						/>
					{:else}
						<div class="w-full h-full flex items-center justify-center">
							<svg class="w-16 h-16 text-gray-600 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
						</div>
					{/if}
					{#if video.duracion}
						<span class="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">{video.duracion}</span>
					{/if}
				</div>
				<div class="p-4">
					<div class="flex items-center gap-2 mb-2 flex-wrap">
						{#each video.categorias?.slice(0, 3) as cat (cat)}
							<span class="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">{cat}</span>
						{/each}
						{#if video.idioma}
							<span class="text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">{video.idioma}</span>
						{/if}
						{#if video.nivel}
							<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full ml-auto">{video.nivel}</span>
						{/if}
					</div>
					<h3 class="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{video.titulo}</h3>
					{#if video.canal}
						<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{video.canal}</p>
					{/if}
					<p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{video.descripcion}</p>
				</div>
				<div class="flex items-center gap-2 px-4 pb-4">
					<VideoActions videoId={video.id} {session} />
				</div>
			</a>
		{/each}
	</div>

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
{/if}