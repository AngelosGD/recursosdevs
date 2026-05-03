<script>
	import { supabase } from '$lib/supabase.js';

	let titulo = $state('');
	let descripcion = $state('');
	let url = $state('');
	let tipo = $state('Pagina');
	let nivel = $state('Principiante');
	let idioma = $state('Español');
	let categorias = $state('');
	let enviado = $state(false);
	let cargando = $state(false);
	let image_url = $state('');
	let errores = $state({});

	async function enviarRecurso() {
		errores = validar();
		if (Object.keys(errores).length > 0) return;
		cargando = true;

		const { error } = await supabase.from('recursos').insert({
			titulo,
			descripcion,
			url,
			image_url,
			tipo,
			nivel,
			idioma,
			categorias: categorias.split(',').map((c) => c.trim()),
			aprobado: false
		});

		cargando = false;

		if (error) {
			console.error(error);
			return;
		}

		enviado = true;
	}

	function validar() {
		const e = {};
		if (!titulo.trim()) e.titulo = 'El nombre es obligatorio';
		if (!descripcion.trim()) e.descripcion = 'La descripción es obligatoria';
		if (!url.trim()) e.url = 'La URL es obligatoria';
		else if (!url.startsWith('http')) e.url = 'La URL debe empezar con http';
		if (!categorias.trim()) e.categorias = 'Agrega al menos una categoría';
		return e;
	}
</script>

{#if enviado}
	<div class="text-center py-20">
		<p class="text-4xl mb-4">🎉</p>
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Gracias por tu sugerencia!</h2>
		<p class="text-gray-500 dark:text-gray-400">La revisaremos y la publicaremos pronto.</p>
		<a href="/" class="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline">Volver al inicio</a>
	</div>
{:else}
	<div class="max-w-xl mx-auto px-4">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Sugerir recurso</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">Lo revisaremos antes de publicarlo.</p>

		<div class="flex flex-col gap-4 sm:gap-5">
			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre del recurso</label>
				<input
					bind:value={titulo}
					type="text"
					placeholder="Ej: The Odin Project"
					class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.titulo
						? 'border-red-400 focus:border-red-400'
						: 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'}"
				/>
				{#if errores.titulo}
					<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.titulo}</p>
				{/if}
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
				<textarea
					bind:value={descripcion}
					rows="3"
					placeholder="¿De qué trata y por qué lo recomiendas?"
					class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.descripcion
						? 'border-red-400 focus:border-red-400'
						: 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'}"
				></textarea>
				{#if errores.descripcion}
					<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.descripcion}</p>
				{/if}
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL</label>
				<input
					bind:value={url}
					type="url"
					placeholder="https://..."
					class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.url
						? 'border-red-400 focus:border-red-400'
						: 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'}"
				/>
				{#if errores.url}
					<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.url}</p>
				{/if}
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>Categorías (separadas por coma)</label
				>
				<input
					bind:value={categorias}
					type="text"
					placeholder="Frontend, Guias, Diseño"
					class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.categorias
						? 'border-red-400 focus:border-red-400'
						: 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'}"
				/>
				{#if errores.categorias}
					<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.categorias}</p>
				{/if}
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
					<select
						bind:value={tipo}
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
					>
						<option>Pagina</option>
						<option>Gratis</option>
						<option>De pago</option>
						<option>Herramienta</option>
						<option>Descargable</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nivel</label>
					<select
						bind:value={nivel}
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
					>
						<option>Principiante</option>
						<option>Intermedio</option>
						<option>Avanzado</option>
						<option>Variado</option>
					</select>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idioma</label>
					<select
						bind:value={idioma}
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
					>
						<option>Español</option>
						<option>Inglés</option>
					</select>
				</div>
			</div>

			<button
				onclick={enviarRecurso}
				disabled={cargando}
				class="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
			>
				{cargando ? 'Enviando...' : 'Enviar sugerencia'}
			</button>
		</div>
	</div>
{/if}
