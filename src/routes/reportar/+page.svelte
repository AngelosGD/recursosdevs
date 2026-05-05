<script>
	import { supabase } from '$lib/supabase.js';
	import { page } from '$app/state';

	let recursoId = page.url.searchParams.get('recurso');
	let recursoTitulo = page.url.searchParams.get('titulo') || '';

	let tipoReporte = $state('');
	let tituloReporte = $state('');
	let descripcion = $state('');
	let fechaDescubrimiento = $state('');
	let evidenciaImg = $state('');
	let enviado = $state(false);
	let cargando = $state(false);

	const tiposReporte = [
		'Recurso desactualizado',
		'Contenido inapropiado',
		'Enlace roto/no funciona',
		'Información incorrecta',
		'Duplicado',
		'No recomendable',
		'Otro'
	];

	async function enviarReporte() {
		if (!tipoReporte || !tituloReporte) return;
		cargando = true;

		const { error } = await supabase.from('reportes').insert({
			recurso_id: parseInt(recursoId),
			tipo: tipoReporte,
			titulo: tituloReporte,
			descripcion,
			fecha_descubrimiento: fechaDescubrimiento || null,
			evidencia_img: evidenciaImg || null
		});

		cargando = false;
		if (!error) enviado = true;
	}
</script>

<svelte:head>
	<title>Reportar problema - devRekursos</title>
</svelte:head>

<div class="max-w-2xl mx-auto px-4 py-8">
	{#if enviado}
		<div class="text-center py-16">
			<p class="text-5xl mb-4">✅</p>
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reporte enviado</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-6">
				Gracias por tu reporte. Lo revisaremos pronto.
			</p>
			<a href="/" class="text-blue-600 dark:text-blue-400 hover:underline">Volver al inicio</a>
		</div>
	{:else}
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
			Reportar problema
		</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-6">
			Reportando: <span class="font-medium text-blue-500">{recursoTitulo}</span>
		</p>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				enviarReporte();
			}}
			class="space-y-5"
		>
			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>Tipo de reporte *</label
				>
				<select
					bind:value={tipoReporte}
					required
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:border-red-400"
				>
					<option value="">Selecciona tipo de problema</option>
					{#each tiposReporte as t}
						<option value={t}>{t}</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>Título del reporte *</label
				>
				<input
					bind:value={tituloReporte}
					required
					placeholder="Ej: Enlace roto en la sección de tutorials"
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-red-400"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>Descripción detallada</label
				>
				<textarea
					bind:value={descripcion}
					rows="4"
					placeholder="Explica el problema con detalle..."
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-red-400"
				></textarea>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>¿Cuándo descubriste el problema?</label
				>
				<input
					bind:value={fechaDescubrimiento}
					type="date"
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:border-red-400"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
					>Evidencia (URL de imagen) - Opcional</label
				>
				<input
					bind:value={evidenciaImg}
					type="url"
					placeholder="https://ejemplo.com/evidencia.jpg"
					class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-red-400"
				/>
				<p class="text-xs text-gray-500 mt-1">Sube una imagen a un servicio y pega la URL aquí</p>
			</div>

			<button
				type="submit"
				disabled={cargando || !tipoReporte || !tituloReporte}
				class="w-full bg-red-500 dark:bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-600 dark:hover:bg-red-700 transition-colors disabled:opacity-50"
			>
				{cargando ? 'Enviando...' : 'Enviar reporte'}
			</button>
		</form>
	{/if}
</div>
