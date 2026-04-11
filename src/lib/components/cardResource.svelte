<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let { titulo, descripcion, categorias, url, tipo, nivel, image_url, idioma } = $props();

	const nivelColor = {
		Principiante: 'bg-green-100 text-green-700',
		Medio: 'bg-yellow-100 text-yellow-700',
		Avanzado: 'bg-red-100 text-red-700',
		Variado: 'bg-gray-300 text-gray-700'
	};

	const tipoColor = {
		Gratis: 'text-green-600',
		'De pago': 'text-gray-400',
		Pagina: 'text-purple-600',
		Descargable: 'text-blue-500'
	};
</script>

<a
	href={url}
	target="_blank"
	class="block border border-gray-200 rounded-b-xl overflow-hidden hover:-translate-y-1 transition-all duration-200,"
	transition:fade={{ duration: 300 }}
>
	<div class="h-40 overflow-hidden bg-gray-100">
		<img src={image_url} alt={titulo} class="w-full h-full object-cover" />
	</div>

	<div class="p-5">
		<div class="flex flex-wrap gap-1 mb-3">
			{#each categorias as cat, i (cat)}
				<span class="text-xs text-gray-400 uppercase tracking-wide">{cat}</span>
				{#if i < categorias.length - 1}
					<span class="text-xs text-gray-300">·</span>
				{/if}
			{/each}
		</div>

		<h2 class="font-bold text-gray-900 text-lg mb-1">{titulo}</h2>
		<p class="text-sm text-gray-500 mb-4 leading-relaxed">{descripcion}</p>

		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="text-xs font-medium {tipoColor[tipo] ?? 'text-gray-400'}">{tipo}</span>
				<span class="text-gray-300">·</span>
				<span
					class="text-xs font-medium px-2 py-0.5 rounded-full {nivelColor[nivel] ??
						'bg-gray-100 text-gray-600'}">{nivel}</span
				>
			</div>
			<span class="text-sm text-blue-600 font-medium">Visitar recurso →</span>
		</div>
	</div>
</a>
