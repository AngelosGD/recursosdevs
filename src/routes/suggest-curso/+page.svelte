<script>
	import { supabase } from '$lib/supabase.js';

	let { data } = $props();
	let session = data.session;

	let titulo = $state('');
	let descripcion = $state('');
	let url = $state('');
	let instructor = $state('');
	let precio = $state('Gratis');
	let nivel = $state('Principiante');
	let categorias = $state('');
	let imagen = $state('');
	let enviado = $state(false);
	let cargando = $state(false);
	let errores = $state({});

	async function enviarCurso() {
		errores = validar();
		if (Object.keys(errores).length > 0) return;
		cargando = true;

		const { error } = await supabase.from('cursos').insert({
			titulo,
			descripcion,
			url,
			instructor,
			precio,
			nivel,
			categorias: categorias.split(',').map((c) => c.trim()),
			imagen,
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
</script>

<svelte:head>
	<title>Suggest Curso - devRekursos</title>
</svelte:head>

{#if enviado}
	<div class="text-center py-20">
		<p class="text-4xl mb-4">🎉</p>
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
			¡Gracias por tu sugerencia!
		</h2>
		<p class="text-gray-500 dark:text-gray-400">Lo revisaremos y lo publicaremos pronto.</p>
		<a href="/cursos" class="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
			>Volver a Cursos</a
		>
	</div>
{:else}
	<div class="max-w-xl mx-auto px-4">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Sugerir Curso</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
			¿Conoces un buen curso? Compártelo con la comunidad.
		</p>

		<div class="flex flex-col gap-4 sm:gap-5">
			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>Nombre del curso</label
				>
				<input
					bind:value={titulo}
					type="text"
					placeholder="Ej: React - The Complete Guide"
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
					>Instructor</label
				>
				<input
					bind:value={instructor}
					type="text"
					placeholder="Nombre del instructor o plataforma"
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>Descripción</label
				>
				<textarea
					bind:value={descripcion}
					rows="3"
					placeholder="¿De qué trata el curso y por qué lo recomiendas?"
					class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 {errores.descripcion
						? 'border-red-400 focus:border-red-400'
						: 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'}"
				></textarea>
				{#if errores.descripcion}
					<p class="text-red-500 dark:text-red-400 text-xs mt-1">{errores.descripcion}</p>
				{/if}
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
					>URL del curso</label
				>
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
					bind:value={imagen}
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
					placeholder="Frontend, React, JavaScript"
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
						>Precio</label
					>
					<select
						bind:value={precio}
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
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
						bind:value={nivel}
						class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
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
				class="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
			>
				{cargando ? 'Enviando...' : 'Enviar sugerencia'}
			</button>
		</div>
	</div>
{/if}
