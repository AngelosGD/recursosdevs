<script>
	import { supabase } from '$lib/supabase.js';

	let { data } = $props();

	let pendientes = $state(data.pendientes);
	let todos = $state(data.todos);
	let mensajes = $state(data.mensajes);
	let vistasMensajes = $state('pendientes');

	let vista = $state('pendientes');
	let busqueda = $state('');

	let titulo = $state('');
	let descripcion = $state('');
	let url = $state('');
	let image_url = $state('');
	let tipo = $state('Pagina');
	let nivel = $state('Principiante');
	let idioma = $state('Español');
	let categorias = $state('');
	let agregando = $state(false);
	let cargando = $state(false);

	let editandoId = $state(null);
	let editandoDatos = $state(null);

	let recursosMostrados = $derived(() => {
		const lista = vista === 'pendientes' ? pendientes : todos;
		if (!busqueda) return lista;
		return lista.filter((r) => r.titulo.toLowerCase().includes(busqueda.toLowerCase()));
	});

	async function aprobar(id) {
		await supabase.from('recursos').update({ aprobado: true }).eq('id', id);
		pendientes = pendientes.filter((r) => r.id !== id);
		todos = todos.map((r) => (r.id === id ? { ...r, aprobado: true } : r));
	}

	async function rechazar(id) {
		await supabase.from('recursos').delete().eq('id', id);
		pendientes = pendientes.filter((r) => r.id !== id);
		todos = todos.filter((r) => r.id !== id);
	}

	async function agregarRecurso() {
		cargando = true;
		const { data: nuevo, error } = await supabase
			.from('recursos')
			.insert({
				titulo,
				descripcion,
				url,
				image_url,
				tipo,
				nivel,
				idioma,
				categorias: categorias.split(',').map((c) => c.trim()),
				aprobado: true
			})
			.select()
			.single();

		cargando = false;
		if (error) {
			console.error(error);
			return;
		}

		todos = [nuevo, ...todos];
		titulo = '';
		descripcion = '';
		url = '';
		image_url = '';
		categorias = '';
		agregando = false;
	}

	function iniciarEdicion(recurso) {
		editandoId = recurso.id;
		editandoDatos = {
			titulo: recurso.titulo,
			descripcion: recurso.descripcion,
			url: recurso.url,
			image_url: recurso.image_url || '',
			tipo: recurso.tipo,
			nivel: recurso.nivel,
			idioma: recurso.idioma,
			categorias: recurso.categorias.join(', ')
		};
	}

	async function guardarEdicion() {
		if (!editandoId || !editandoDatos) return;
		cargando = true;

		const { error } = await supabase
			.from('recursos')
			.update({
				titulo: editandoDatos.titulo,
				descripcion: editandoDatos.descripcion,
				url: editandoDatos.url,
				image_url: editandoDatos.image_url,
				tipo: editandoDatos.tipo,
				nivel: editandoDatos.nivel,
				idioma: editandoDatos.idioma,
				categorias: editandoDatos.categorias.split(',').map((c) => c.trim())
			})
			.eq('id', editandoId);

		cargando = false;
		if (error) {
			console.error(error);
			return;
		}

		todos = todos.map((r) =>
			r.id === editandoId
				? {
						...r,
						titulo: editandoDatos.titulo,
						descripcion: editandoDatos.descripcion,
						url: editandoDatos.url,
						image_url: editandoDatos.image_url,
						tipo: editandoDatos.tipo,
						nivel: editandoDatos.nivel,
						idioma: editandoDatos.idioma,
						categorias: editandoDatos.categorias.split(',').map((c) => c.trim())
					}
				: r
		);

		pendientes = pendientes.map((r) =>
			r.id === editandoId
				? {
						...r,
						titulo: editandoDatos.titulo,
						descripcion: editandoDatos.descripcion,
						url: editandoDatos.url,
						image_url: editandoDatos.image_url,
						tipo: editandoDatos.tipo,
						nivel: editandoDatos.nivel,
						idioma: editandoDatos.idioma,
						categorias: editandoDatos.categorias.split(',').map((c) => c.trim())
					}
				: r
		);

		editandoId = null;
		editandoDatos = null;
	}

	function cancelarEdicion() {
		editandoId = null;
		editandoDatos = null;
	}

	async function marcarLeido(id) {
		await supabase.from('contacto').update({ leido: true }).eq('id', id);
		mensajes = mensajes.map((m) => (m.id === id ? { ...m, leido: true } : m));
	}

	async function eliminarMensaje(id) {
		await supabase.from('contacto').delete().eq('id', id);
		mensajes = mensajes.filter((m) => m.id !== id);
	}
</script>

<div class="flex items-center justify-between mb-8">
	<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Panel admin</h1>
	<button
		onclick={() => (agregando = !agregando)}
		class="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
	>
		{agregando ? 'Cancelar' : '+ Agregar recurso'}
	</button>
</div>

<!-- Stats -->
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
	<div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 bg-white dark:bg-gray-800">
		<p class="text-sm text-gray-400 dark:text-gray-500 mb-1">Recursos totales</p>
		<p class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{todos.length}</p>
	</div>
	<div class="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 sm:p-5">
		<p class="text-sm text-yellow-600 dark:text-yellow-400 mb-1">Pendientes</p>
		<p class="text-3xl sm:text-4xl font-bold text-yellow-600 dark:text-yellow-400">{pendientes.length}</p>
	</div>
	<div class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 sm:p-5">
		<p class="text-sm text-green-600 dark:text-green-400 mb-1">Aprobados</p>
		<p class="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">{todos.filter((r) => r.aprobado).length}</p>
	</div>
</div>

<!-- Formulario agregar -->
{#if editandoId && editandoDatos}
	<div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<h2 class="font-bold text-gray-900 dark:text-white">Editar recurso</h2>
			<button
				onclick={cancelarEdicion}
				class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
			>
				✕ Cancelar
			</button>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<input
				bind:value={editandoDatos.titulo}
				placeholder="Título"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
			/>
			<input
				bind:value={editandoDatos.url}
				placeholder="URL"
				type="url"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
			/>
			<input
				bind:value={editandoDatos.image_url}
				placeholder="URL imagen"
				type="url"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
			/>
			<input
				bind:value={editandoDatos.categorias}
				placeholder="Categorías separadas por coma"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
			/>
		</div>
		<textarea
			bind:value={editandoDatos.descripcion}
			placeholder="Descripción"
			rows="2"
			class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400"
		></textarea>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<select
				bind:value={editandoDatos.tipo}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Pagina</option><option>Gratis</option><option>De pago</option>
				<option>Herramienta</option><option>Descargable</option>
			</select>
			<select
				bind:value={editandoDatos.nivel}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Principiante</option><option>Intermedio</option>
				<option>Avanzado</option><option>Variado</option>
			</select>
			<select
				bind:value={editandoDatos.idioma}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Español</option><option>Inglés</option><option>Variado</option>
			</select>
		</div>
		<button
			onclick={guardarEdicion}
			disabled={cargando}
			class="bg-purple-600 dark:bg-purple-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50"
		>
			{cargando ? 'Guardando...' : 'Guardar cambios'}
		</button>
	</div>
{:else if agregando}
	<div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col gap-4">
		<h2 class="font-bold text-gray-900 dark:text-white">Agregar recurso</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<input
				bind:value={titulo}
				placeholder="Título"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={url}
				placeholder="URL"
				type="url"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={image_url}
				placeholder="URL imagen"
				type="url"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={categorias}
				placeholder="Categorías separadas por coma"
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
			/>
		</div>
		<textarea
			bind:value={descripcion}
			placeholder="Descripción"
			rows="2"
			class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
		></textarea>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<select
				bind:value={tipo}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Pagina</option><option>Gratis</option><option>De pago</option>
				<option>Herramienta</option><option>Descargable</option>
			</select>
			<select
				bind:value={nivel}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Principiante</option><option>Intermedio</option>
				<option>Avanzado</option><option>Variado</option>
			</select>
			<select
				bind:value={idioma}
				class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-800 dark:text-white"
			>
				<option>Español</option><option>Inglés</option><option>Variado</option>
			</select>
		</div>
		<button
			onclick={agregarRecurso}
			disabled={cargando}
			class="bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
		>
			{cargando ? 'Guardando...' : 'Guardar recurso'}
		</button>
	</div>
{/if}

<!-- Filtros y búsqueda -->
<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
	<div class="flex gap-2">
		<button
			onclick={() => (vista = 'pendientes')}
			class="px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors
				{vista === 'pendientes' ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
		>
			Pendientes ({pendientes.length})
		</button>
		<button
			onclick={() => (vista = 'todos')}
			class="px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors
				{vista === 'todos' ? 'bg-blue-600 text-white dark:bg-blue-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
		>
			Todos ({todos.length})
		</button>
	</div>
	<input
		bind:value={busqueda}
		placeholder="Buscar recurso..."
		class="w-full sm:flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
	/>
</div>

<!-- Lista -->
{#if recursosMostrados().length === 0}
	<p class="text-gray-400 dark:text-gray-500 text-sm">No hay recursos.</p>
{:else}
	<div class="flex flex-col gap-3">
		{#each recursosMostrados() as recurso (recurso.id)}
			<div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex items-start justify-between gap-4 bg-white dark:bg-gray-800">
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2 mb-1 flex-wrap">
						<span class="font-bold text-gray-900 dark:text-white">{recurso.titulo}</span>
						<span class="text-xs text-gray-400 dark:text-gray-500">{recurso.tipo} · {recurso.nivel}</span>
						{#if recurso.aprobado}
							<span class="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full"
								>Aprobado</span
							>
						{:else}
							<span class="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full"
								>Pendiente</span
							>
						{/if}
					</div>
					<p class="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">{recurso.descripcion}</p>
					<a href={recurso.url} target="_blank" class="text-xs text-blue-500 dark:text-blue-400 hover:underline block truncate"
						>{recurso.url}</a
					>
				</div>
				<div class="flex flex-col gap-2 shrink-0">
					<button
						onclick={() => iniciarEdicion(recurso)}
						class="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-xl text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
					>
						Editar
					</button>
					{#if !recurso.aprobado}
						<div class="flex gap-1">
							<button
								onclick={() => aprobar(recurso.id)}
								class="bg-green-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors"
							>
								✓
							</button>
							<button
								onclick={() => rechazar(recurso.id)}
								class="bg-red-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
							>
								✕
							</button>
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}
<!-- Mensajes de contacto -->
<div class="mt-10">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-lg font-bold text-gray-900 dark:text-white">
			Mensajes de contacto
			<span class="text-sm font-normal text-gray-400 dark:text-gray-500">({mensajes.length})</span>
		</h2>
		<div class="flex gap-2">
			<button
				onclick={() => (vistasMensajes = 'pendientes')}
				class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
					{vistasMensajes === 'pendientes'
					? 'bg-blue-600 text-white dark:bg-blue-500'
					: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
			>
				Pendientes ({mensajes.filter((m) => !m.leido).length})
			</button>
			<button
				onclick={() => (vistasMensajes = 'leidos')}
				class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
					{vistasMensajes === 'leidos'
					? 'bg-blue-600 text-white dark:bg-blue-500'
					: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
			>
				Leídos ({mensajes.filter((m) => m.leido).length})
			</button>
		</div>
	</div>

	{#if mensajes.filter((m) => (vistasMensajes === 'pendientes' ? !m.leido : m.leido)).length === 0}
		<p class="text-gray-400 dark:text-gray-500 text-sm">No hay mensajes.</p>
	{:else}
		<div class="flex flex-col gap-3">
			{#each mensajes.filter( (m) => (vistasMensajes === 'pendientes' ? !m.leido : m.leido) ) as m (m.id)}
				<div class="border border-gray-200 dark:border-gray-700 rounded-2xl p-5 bg-white dark:bg-gray-800">
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="flex items-center gap-2 mb-1">
								<span class="font-medium text-gray-900 dark:text-white">{m.nombre}</span>
								<span class="text-xs text-gray-400 dark:text-gray-500"
									>{new Date(m.created_at).toLocaleDateString()}</span
								>
							</div>
							<p class="text-xs text-blue-500 dark:text-blue-400 mb-2">{m.email}</p>
							<p class="text-sm text-gray-600 dark:text-gray-300">{m.mensaje}</p>
						</div>
						<div class="flex gap-2 shrink-0">
							{#if !m.leido}
								<button
									onclick={() => marcarLeido(m.id)}
									class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-xl text-xs hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
								>
									Marcar leído
								</button>
							{/if}
							<button
								onclick={() => eliminarMensaje(m.id)}
								class="bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-3 py-1.5 rounded-xl text-xs hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
