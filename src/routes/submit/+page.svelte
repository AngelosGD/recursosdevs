<script>
	import { supabase } from '$lib/supabase.js';

	let { data } = $props();
	let session = data.session;

	let tipoSeleccion = $state('recurso');

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

	let tituloC = $state('');
	let descripcionC = $state('');
	let urlC = $state('');
	let instructorC = $state('');
	let precioC = $state('Gratis');
	let nivelC = $state('Principiante');
	let categoriasC = $state('');
	let imagenC = $state('');

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
			aprobado: false,
			user_id: session?.user?.id,
			autor_nombre: session?.user?.email?.split('@')[0] || 'Anónimo'
		});

		cargando = false;

		if (error) {
			console.error(error);
			return;
		}

		enviado = true;
	}

	async function enviarCurso() {
		const e = validarCurso();
		if (Object.keys(e).length > 0) {
			errores = e;
			return;
		}
		cargando = true;

		const { error } = await supabase.from('cursos').insert({
			titulo: tituloC,
			descripcion: descripcionC,
			url: urlC,
			instructor: instructorC,
			precio: precioC,
			nivel: nivelC,
			categorias: categoriasC.split(',').map((c) => c.trim()),
			imagen: imagenC,
			aprobado: false,
			user_id: session?.user?.id,
			autor_nombre: session?.user?.email?.split('@')[0] || 'Anónimo'
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

	function validarCurso() {
		const e = {};
		if (!tituloC.trim()) e.tituloC = 'El nombre es obligatorio';
		if (!descripcionC.trim()) e.descripcionC = 'La descripción es obligatoria';
		if (!urlC.trim()) e.urlC = 'La URL es obligatoria';
		else if (!urlC.startsWith('http')) e.urlC = 'La URL debe empezar con http';
		if (!categoriasC.trim()) e.categoriasC = 'Agrega al menos una categoría';
		return e;
	}
</script>

{#if enviado}
	<div class="text-center py-20">
		<p class="text-4xl mb-4">🎉</p>
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
			¡Gracias por tu sugerencia!
		</h2>
		<p class="text-gray-500 dark:text-gray-400">La revisaremos y la publicaremos pronto.</p>
		<a href="/" class="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
			>Volver al inicio</a
		>
	</div>
{:else}
	<div class="max-w-xl mx-auto px-4">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
			Sugerir recurso / curso
		</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">Lo revisaremos antes de publicarlo.</p>

		<!-- Selector de tipo -->
		<div class="flex gap-3 mb-8">
			<button
				onclick={() => (tipoSeleccion = 'recurso')}
				class="flex-1 py-3 px-4 rounded-xl font-medium transition-colors {tipoSeleccion ===
				'recurso'
					? 'bg-blue-600 text-white dark:bg-blue-500'
					: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
			>
				📚 Recurso
			</button>
			<button
				onclick={() => (tipoSeleccion = 'curso')}
				class="flex-1 py-3 px-4 rounded-xl font-medium transition-colors {tipoSeleccion === 'curso'
					? 'bg-purple-600 text-white dark:bg-purple-500'
					: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
			>
				🎓 Curso
			</button>
		</div>

		{#if tipoSeleccion === 'recurso'}
			<div class="flex flex-col gap-4 sm:gap-5">
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Nombre del recurso</label
					>
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
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Descripción</label
					>
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
						>URL de imagen (opcional)</label
					>
					<input
						bind:value={image_url}
						type="url"
						placeholder="https://ejemplo.com/imagen.jpg"
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
					/>
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
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Tipo</label
						>
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
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Nivel</label
						>
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
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Idioma</label
						>
						<select
							bind:value={idioma}
							class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
						>
							<option>Español</option>
							<option>Inglés</option>
							<option>Variado</option>
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
		{:else}
			<div class="flex flex-col gap-4 sm:gap-5">
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Nombre del curso</label
					>
					<input
						bind:value={tituloC}
						type="text"
						placeholder="Ej: React - The Complete Guide"
						class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.tituloC
							? 'border-red-400 focus:border-red-400'
							: 'border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500'}"
					/>
					{#if errores.tituloC}
						<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.tituloC}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Instructor</label
					>
					<input
						bind:value={instructorC}
						type="text"
						placeholder="Nombre del instructor o plataforma"
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Descripción</label
					>
					<textarea
						bind:value={descripcionC}
						rows="3"
						placeholder="¿De qué trata el curso y por qué lo recomiendas?"
						class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.descripcionC
							? 'border-red-400 focus:border-red-400'
							: 'border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500'}"
					></textarea>
					{#if errores.descripcionC}
						<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.descripcionC}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>URL del curso</label
					>
					<input
						bind:value={urlC}
						type="url"
						placeholder="https://..."
						class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.urlC
							? 'border-red-400 focus:border-red-400'
							: 'border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500'}"
					/>
					{#if errores.urlC}
						<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.urlC}</p>
					{/if}
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>URL de imagen (opcional)</label
					>
					<input
						bind:value={imagenC}
						type="url"
						placeholder="https://ejemplo.com/imagen.jpg"
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>Categorías (separadas por coma)</label
					>
					<input
						bind:value={categoriasC}
						type="text"
						placeholder="Frontend, React, JavaScript"
						class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.categoriasC
							? 'border-red-400 focus:border-red-400'
							: 'border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500'}"
					/>
					{#if errores.categoriasC}
						<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.categoriasC}</p>
					{/if}
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Precio</label
						>
						<select
							bind:value={precioC}
							class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white"
						>
							<option>Gratis</option>
							<option>De pago</option>
							<option>Freemium</option>
						</select>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>Nivel</label
						>
						<select
							bind:value={nivelC}
							class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white"
						>
							<option>Principiante</option>
							<option>Intermedio</option>
							<option>Avanzado</option>
							<option>Variado</option>
						</select>
					</div>
				</div>

				<button
					onclick={enviarCurso}
					disabled={cargando}
					class="w-full bg-purple-600 dark:bg-purple-500 text-white py-3 rounded-xl font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50"
				>
					{cargando ? 'Enviando...' : 'Enviar curso'}
				</button>
			</div>
		{/if}
	</div>
{/if}
