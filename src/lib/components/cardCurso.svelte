<script>
	import { fade } from 'svelte/transition';
	import CursoActions from './cursoActions.svelte';

	let { titulo, descripcion, categorias, url, precio, instructor, nivel, imagen, session, id } =
		$props();

	const nivelColor = {
		Principiante: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		Medio: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
		Avanzado: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
		Variado: 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
	};

	const precioColor =
		precio === 'Gratis' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400';
</script>

<div
	class="group border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
>
	<a href={url} target="_blank" class="block group-hover:scale-[1.02] transition-transform duration-300">
		<div class="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
			{#if imagen}
				<img src={imagen} alt={titulo} class="w-full h-full object-cover" />
			{:else}
				<div
					class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"
				>
					<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						></path>
					</svg>
				</div>
			{/if}
		</div>

		<div class="p-5">
			<div class="flex flex-wrap gap-1 mb-3">
				{#each categorias as cat, i (cat)}
					<span class="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">{cat}</span
					>
					{#if i < categorias.length - 1}
						<span class="text-xs text-gray-300 dark:text-gray-600">·</span>
					{/if}
				{/each}
			</div>

			<h2 class="font-bold text-gray-900 dark:text-white text-lg mb-1">{titulo}</h2>

			{#if instructor}
				<p class="text-sm text-purple-500 dark:text-purple-400 mb-2">Por {instructor}</p>
			{/if}

			<p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
				{descripcion}
			</p>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span class="text-xs font-medium {precioColor}">{precio}</span>
					<span class="text-gray-300 dark:text-gray-600">·</span>
					<span
						class="text-xs font-medium px-2 py-0.5 rounded-full {nivelColor[nivel] ??
							'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600'}">{nivel}</span
					>
				</div>
				<span class="text-sm text-purple-600 dark:text-purple-400 font-medium group-hover:translate-x-1 transition-transform">Ver curso →</span>
			</div>
		</div>
	</a>

	<div class="flex items-center gap-2 px-5 pb-5 pt-0">
		<CursoActions cursoId={id} {session} />
	</div>
</div>
