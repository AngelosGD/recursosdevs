<script>
	import { fade } from 'svelte/transition';
	import ResourceActions from './resourceActions.svelte';
	import ReportResource from './reportResource.svelte';

	let {
		titulo,
		descripcion,
		categorias,
		url,
		tipo,
		nivel,
		image_url,
		idioma,
		autor_nombre,
		id,
		session
	} = $props();

	let imgError = $state(false);

	const nivelColor = {
		Principiante: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
		Medio: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
		Avanzado: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
		Variado: 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
	};

	const tipoColor = {
		Gratis: 'text-green-600 dark:text-green-400',
		'De pago': 'text-gray-400',
		Pagina: 'text-purple-600 dark:text-purple-400',
		Descargable: 'text-blue-500 dark:text-blue-400'
	};

	function handleClick(e) {
		if (e.target.closest('button') || e.target.closest('.no-link')) {
			e.preventDefault();
		}
	}
</script>

<div
	class="group border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
>
	<a
		href={url}
		target="_blank"
		class="block group-hover:scale-[1.02] transition-transform duration-300"
	>
		<div class="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
			{#if image_url && !imgError}
				<img
					src={image_url}
					alt={titulo}
					class="w-full h-full object-cover"
					onerror={() => (imgError = true)}
				/>
			{:else}
				<div
					class="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500"
				>
					<svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
			<p class="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{descripcion}</p>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<span class="text-xs font-medium {tipoColor[tipo] ?? 'text-gray-400'}">{tipo}</span>
					<span class="text-gray-300 dark:text-gray-600">·</span>
					<span
						class="text-xs font-medium px-2 py-0.5 rounded-full {nivelColor[nivel] ??
							'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600'}">{nivel}</span
					>
				</div>
				<span
					class="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform"
					>Visitar recurso →</span
				>
			</div>

			{#if autor_nombre}
				<div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
					<p class="text-xs text-gray-400 dark:text-gray-500">
						Sugerido por <span class="text-blue-500 dark:text-blue-400 font-medium"
							>{autor_nombre}</span
						>
					</p>
				</div>
			{/if}
		</div>
	</a>

	<div class="flex items-center gap-2 px-5 pb-5 pt-0">
		<ResourceActions recursoId={id} {session} />
		<ReportResource recursoId={id} recursoTitulo={titulo} />
	</div>
</div>
