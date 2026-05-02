<script>
	import { supabase } from '$lib/supabase.js';
	import { SvelteURL } from 'svelte/reactivity';

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

	let recursosMostrados = $derived(() => {
		const lista = vista === 'pendientes' ? pendientes : todos;
		if (!busqueda) return lista;
		return lista.filter((r) => r.titulo.toLowerCase().includes(busqueda.toLowerCase()));
	});

	async function aprobar(id) {
		await supabase.from('recursos').update({ aprobado: true }).eq('id', id);
		const r = pendientes.find((r) => r.id === id);
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
	<h1 class="text-3xl font-bold text-gray-900">Panel admin</h1>
	<button
		onclick={() => (agregando = !agregando)}
		class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors"
	>
		{agregando ? 'Cancelar' : '+ Agregar recurso'}
	</button>
</div>

<!-- Stats -->
<div class="grid grid-cols-3 gap-4 mb-8">
	<div class="border border-gray-200 rounded-2xl p-5">
		<p class="text-sm text-gray-400 mb-1">Recursos totales</p>
		<p class="text-4xl font-bold text-gray-900">{todos.length}</p>
	</div>
	<div class="border border-yellow-200 bg-yellow-50 rounded-2xl p-5">
		<p class="text-sm text-yellow-600 mb-1">Pendientes</p>
		<p class="text-4xl font-bold text-yellow-600">{pendientes.length}</p>
	</div>
	<div class="border border-green-200 bg-green-50 rounded-2xl p-5">
		<p class="text-sm text-green-600 mb-1">Aprobados</p>
		<p class="text-4xl font-bold text-green-600">{todos.filter((r) => r.aprobado).length}</p>
	</div>
</div>

<!-- Formulario agregar -->
{#if agregando}
	<div class="border border-blue-200 bg-blue-50 rounded-2xl p-6 mb-8 flex flex-col gap-4">
		<h2 class="font-bold text-gray-900">Agregar recurso</h2>
		<div class="grid grid-cols-2 gap-4">
			<input
				bind:value={titulo}
				placeholder="Título"
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={url}
				placeholder="URL"
				type="url"
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={image_url}
				placeholder="URL imagen"
				type="url"
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
			/>
			<input
				bind:value={categorias}
				placeholder="Categorías separadas por coma"
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
			/>
		</div>
		<textarea
			bind:value={descripcion}
			placeholder="Descripción"
			rows="2"
			class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400"
		></textarea>
		<div class="grid grid-cols-3 gap-4">
			<select
				bind:value={tipo}
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
			>
				<option>Pagina</option><option>Gratis</option><option>De pago</option>
				<option>Herramienta</option><option>Descargable</option>
			</select>
			<select
				bind:value={nivel}
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
			>
				<option>Principiante</option><option>Intermedio</option>
				<option>Avanzado</option><option>Variado</option>
			</select>
			<select
				bind:value={idioma}
				class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
			>
				<option>Español</option><option>Inglés</option>
			</select>
		</div>
		<button
			onclick={agregarRecurso}
			disabled={cargando}
			class="bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
		>
			{cargando ? 'Guardando...' : 'Guardar recurso'}
		</button>
	</div>
{/if}

<!-- Filtros y búsqueda -->
<div class="flex items-center gap-4 mb-6">
	<div class="flex gap-2">
		<button
			onclick={() => (vista = 'pendientes')}
			class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
				{vista === 'pendientes' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
		>
			Pendientes ({pendientes.length})
		</button>
		<button
			onclick={() => (vista = 'todos')}
			class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
				{vista === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
		>
			Todos ({todos.length})
		</button>
	</div>
	<input
		bind:value={busqueda}
		placeholder="Buscar recurso..."
		class="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
	/>
</div>

<!-- Lista -->
{#if recursosMostrados().length === 0}
	<p class="text-gray-400 text-sm">No hay recursos.</p>
{:else}
	<div class="flex flex-col gap-3">
		{#each recursosMostrados() as recurso (recurso.id)}
			<div class="border border-gray-200 rounded-2xl p-5 flex items-start justify-between gap-4">
				<div>
					<div class="flex items-center gap-2 mb-1">
						<span class="font-bold text-gray-900">{recurso.titulo}</span>
						<span class="text-xs text-gray-400">{recurso.tipo} · {recurso.nivel}</span>
						{#if recurso.aprobado}
							<span class="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full"
								>Aprobado</span
							>
						{:else}
							<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full"
								>Pendiente</span
							>
						{/if}
					</div>
					<p class="text-sm text-gray-500 mb-1">{recurso.descripcion}</p>
					<a href={recurso.url} target="_blank" class="text-xs text-blue-500 hover:underline"
						>{recurso.url}</a
					>
				</div>
				{#if !recurso.aprobado}
					<div class="flex gap-2 shrink-0">
						<button
							onclick={() => aprobar(recurso.id)}
							class="bg-green-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition-colors"
						>
							Aprobar
						</button>
						<button
							onclick={() => rechazar(recurso.id)}
							class="bg-red-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition-colors"
						>
							Rechazar
						</button>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	SvelteURL
{/if}
<!-- Mensajes de contacto -->
<div class="mt-10">
	<div class="flex items-center justify-between mb-4">
		<h2 class="text-lg font-bold text-gray-900">
			Mensajes de contacto
			<span class="text-sm font-normal text-gray-400">({mensajes.length})</span>
		</h2>
		<div class="flex gap-2">
			<button
				onclick={() => (vistasMensajes = 'pendientes')}
				class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
					{vistasMensajes === 'pendientes'
					? 'bg-blue-600 text-white'
					: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
			>
				Pendientes ({mensajes.filter((m) => !m.leido).length})
			</button>
			<button
				onclick={() => (vistasMensajes = 'leidos')}
				class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
					{vistasMensajes === 'leidos'
					? 'bg-blue-600 text-white'
					: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
			>
				Leídos ({mensajes.filter((m) => m.leido).length})
			</button>
		</div>
	</div>

	{#if mensajes.filter((m) => (vistasMensajes === 'pendientes' ? !m.leido : m.leido)).length === 0}
		<p class="text-gray-400 text-sm">No hay mensajes.</p>
	{:else}
		<div class="flex flex-col gap-3">
			{#each mensajes.filter( (m) => (vistasMensajes === 'pendientes' ? !m.leido : m.leido) ) as m (m.id)}
				<div class="border border-gray-200 rounded-2xl p-5">
					<div class="flex items-start justify-between gap-4">
						<div>
							<div class="flex items-center gap-2 mb-1">
								<span class="font-medium text-gray-900">{m.nombre}</span>
								<span class="text-xs text-gray-400"
									>{new Date(m.created_at).toLocaleDateString()}</span
								>
							</div>
							<p class="text-xs text-blue-500 mb-2">{m.email}</p>
							<p class="text-sm text-gray-600">{m.mensaje}</p>
						</div>
						<div class="flex gap-2 shrink-0">
							{#if !m.leido}
								<button
									onclick={() => marcarLeido(m.id)}
									class="bg-green-100 text-green-600 px-3 py-1.5 rounded-xl text-xs hover:bg-green-200 transition-colors"
								>
									Marcar leído
								</button>
							{/if}
							<button
								onclick={() => eliminarMensaje(m.id)}
								class="bg-red-100 text-red-500 px-3 py-1.5 rounded-xl text-xs hover:bg-red-200 transition-colors"
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
