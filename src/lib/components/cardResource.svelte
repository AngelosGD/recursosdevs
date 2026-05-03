<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let { titulo, descripcion, categorias, url, tipo, nivel, image_url, idioma } = $props();

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
</script>

<a
	href={url}
	target="_blank"
	class="block border border-gray-200 dark:border-gray-700 rounded-b-xl overflow-hidden hover:-translate-y-1 transition-all duration-200 bg-white dark:bg-gray-800"
	transition:fade={{ duration: 300 }}
>
	<div class="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700">
		<img src={image_url} alt={titulo} class="w-full h-full object-cover" />
	</div>

	<div class="p-5">
		<div class="flex flex-wrap gap-1 mb-3">
			{#each categorias as cat, i (cat)}
				<span class="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">{cat}</span>
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
			<span class="text-sm text-blue-600 dark:text-blue-400 font-medium">Visitar recurso →</span>
		</div>
	</div>
</a>
