<script>
	import RecursoCard from '$lib/components/cardResource.svelte';
	import CardCurso from '$lib/components/cardCurso.svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let recursosFavoritos = $derived(data.recursosFavoritos);
	let cursosFavoritos = $derived(data.cursosFavoritos);
	let videosFavoritos = $derived(data.videosFavoritos);
	let session = $derived(data.session);

	let vistaActiva = $state('recursos');

	function getYouTubeId(url) {
		if (!url) return null;
		const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
		return match ? match[1] : null;
	}
</script>

<svelte:head>
	<title>Mis Favoritos - devRekursos</title>
</svelte:head>

<section class="mb-8">
	<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mis Favoritos</h1>
	<p class="text-gray-500 dark:text-gray-400">Guarda tus recursos, cursos y videos favoritos</p>
</section>

<!-- Tabs -->
<div class="flex gap-2 mb-8">
	<button
		onclick={() => (vistaActiva = 'recursos')}
		class="px-4 py-2 rounded-xl text-sm font-medium transition-colors {vistaActiva === 'recursos'
			? 'bg-blue-600 text-white dark:bg-blue-500'
			: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
	>
		📚 Recursos ({recursosFavoritos.length})
	</button>
	<button
		onclick={() => (vistaActiva = 'cursos')}
		class="px-4 py-2 rounded-xl text-sm font-medium transition-colors {vistaActiva === 'cursos'
			? 'bg-purple-600 text-white dark:bg-purple-500'
			: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
	>
		🎓 Cursos ({cursosFavoritos.length})
	</button>
	<button
		onclick={() => (vistaActiva = 'videos')}
		class="px-4 py-2 rounded-xl text-sm font-medium transition-colors {vistaActiva === 'videos'
			? 'bg-red-600 text-white dark:bg-red-500'
			: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
	>
		🎬 Videos ({videosFavoritos.length})
	</button>
</div>

<!-- Contenido -->
{#if vistaActiva === 'recursos'}
	{#if recursosFavoritos.length === 0}
		<div class="text-center py-16">
			<p class="text-5xl mb-4">📚</p>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
				No tienes recursos favoritos
			</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-6">
				Guarda recursos haciendo clic en el botón de guardar en cada tarjeta
			</p>
			<a href="/" class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
				Explorar recursos →
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
			{#each recursosFavoritos as fav (fav.recursos.id)}
				<RecursoCard {...fav.recursos} {session} />
			{/each}
		</div>
	{/if}
{:else if vistaActiva === 'cursos'}
	{#if cursosFavoritos.length === 0}
		<div class="text-center py-16">
			<p class="text-5xl mb-4">🎓</p>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
				No tienes cursos favoritos
			</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-6">
				Guarda cursos haciendo clic en el botón de guardar en cada tarjeta
			</p>
			<a href="/cursos" class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
				Explorar cursos →
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
			{#each cursosFavoritos as fav (fav.cursos.id)}
				<CardCurso {...fav.cursos} {session} />
			{/each}
		</div>
	{/if}
{:else}
	{#if videosFavoritos.length === 0}
		<div class="text-center py-16">
			<p class="text-5xl mb-4">🎬</p>
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
				No tienes videos favoritos
			</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-6">
				Guarda videos haciendo clic en el botón de guardar en cada tarjeta
			</p>
			<a href="/videos" class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
				Explorar videos →
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
			{#each videosFavoritos as fav (fav.videos.id)}
				{@const youtubeId = getYouTubeId(fav.videos.url)}
				<a
					href={fav.videos.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
				>
					<div class="relative aspect-video bg-gray-900">
						{#if youtubeId}
							<img
								src="https://img.youtube.com/vi/{youtubeId}/hqdefault.jpg"
								alt={fav.videos.titulo}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
								<div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
									<svg class="w-6 h-6 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						{:else if fav.videos.thumbnail}
							<img
								src={fav.videos.thumbnail}
								alt={fav.videos.titulo}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						{:else}
							<div class="w-full h-full flex items-center justify-center">
								<svg class="w-16 h-16 text-gray-600 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
								</svg>
							</div>
						{/if}
						{#if fav.videos.duracion}
							<span class="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">{fav.videos.duracion}</span>
						{/if}
					</div>
					<div class="p-4">
						<div class="flex items-center gap-2 mb-2 flex-wrap">
							{#each fav.videos.categorias?.slice(0, 3) as cat (cat)}
								<span class="text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">{cat}</span>
							{/each}
							{#if fav.videos.nivel}
								<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full ml-auto">{fav.videos.nivel}</span>
							{/if}
						</div>
						<h3 class="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{fav.videos.titulo}</h3>
						{#if fav.videos.canal}
							<p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{fav.videos.canal}</p>
						{/if}
						<p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{fav.videos.descripcion}</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
{/if}