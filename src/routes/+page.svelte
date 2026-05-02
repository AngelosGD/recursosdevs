<script>
	import RecursoCard from '$lib/components/cardResource.svelte';
	import { supabase } from '$lib/supabase.js';

	let { data } = $props();
	let recursos = data.recursos;
	let recientes = data.recientes;

	let categoriaActiva = $state('Todos');
	let busqueda = $state('');

	let nombre = $state('');
	let email = $state('');
	let mensaje = $state('');
	let enviado = $state(false);
	let cargando = $state(false);

	const todasCategorias = ['Todos', ...new Set(recursos.flatMap((r) => r.categorias))];

	let recursosFiltrados = $derived(
		(() => {
			let lista =
				categoriaActiva === 'Todos'
					? recursos
					: recursos.filter((r) => r.categorias.includes(categoriaActiva));

			if (busqueda.trim()) {
				lista = lista.filter(
					(r) =>
						r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
						r.descripcion.toLowerCase().includes(busqueda.toLowerCase())
				);
			}

			return lista;
		})()
	);

	async function enviarContacto() {
		cargando = true;
		const { error } = await supabase.from('contacto').insert({ nombre, email, mensaje });
		cargando = false;
		if (!error) enviado = true;
	}

	let carruselActivo = $state(0);

	function siguiente() {
		carruselActivo = (carruselActivo + 1) % recientes.length;
	}

	function anterior() {
		carruselActivo = (carruselActivo - 1 + recientes.length) % recientes.length;
	}
</script>

<!-- Hero -->
<section class="text-center py-14">
	<h1 class="text-5xl font-bold text-gray-900 mb-4">
		Recursos para <span class="text-blue-600">todo Programador</span>
	</h1>
	<p class="text-gray-500 text-lg max-w-xl mx-auto mb-8">
		En esta pagina encontraras recursos sobre todo lo necesario para aprender programacion o
		utilizar herramientas tendencia actuales
	</p>
</section>

<section class="mb-14">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden"
		ontouchstart={onTouchStart}
		ontouchend={onTouchEnd}
	>
		<!-- Círculos decorativos de fondo -->
		<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
		<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>

		<div class="flex gap-8 items-center relative z-10">
			<!-- Texto izquierda -->
			<div class="w-48 shrink-0">
				<p class="text-xs uppercase tracking-widest text-blue-200 mb-2">Recién agregados</p>
				<h2 class="text-2xl font-bold leading-tight mb-3">Salidos del horno 🔥</h2>
				<p class="text-blue-200 text-sm leading-relaxed">
					No te pierdas los recursos más recientes agregados por otros programadores
				</p>
			</div>

			<!-- Tarjeta derecha -->
			<div class="flex-1">
				{#each recientes as r, i (r.id)}
					{#if i === carruselActivo}
						<div class="bg-white rounded-2xl p-5 text-gray-900 shadow-xl">
							<div class="flex items-center gap-2 mb-3 flex-wrap">
								{#each r.categorias as cat (cat)}
									<span
										class="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-medium"
										>{cat}</span
									>
								{/each}
								<span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full ml-auto"
									>{r.nivel}</span
								>
							</div>
							<h3 class="text-lg font-bold text-gray-900 mb-1">{r.titulo}</h3>
							<p class="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{r.descripcion}</p>
							<a
								href={r.url}
								target="_blank"
								class="group inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95"
							>
								Ver recurso
								<span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="flex items-center justify-center gap-3 mt-6 relative z-10">
			{#each recientes as _, idx (_.id)}
				<button
					onclick={() => (carruselActivo = idx)}
					class="transition-all duration-300 rounded-full
                {carruselActivo === idx
						? 'w-6 h-2 bg-white'
						: 'w-2 h-2 bg-white/30 hover:bg-white/60'}"
				>
				</button>
			{/each}
		</div>
	</div>
</section>

<input
	bind:value={busqueda}
	placeholder="Buscar recurso..."
	class="w-full max-w-md mx-auto block border border-gray-200 rounded-xl px-4 mb-5 py-2.5 text-sm focus:outline-none focus:border-blue-400"
/>
<!-- Filtros -->
<div class="flex flex-wrap gap-2 mb-8">
	{#each todasCategorias as cat (cat)}
		<button
			onclick={() => (categoriaActiva = cat)}
			class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors
				{categoriaActiva === cat
				? 'bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
		>
			{cat}
		</button>
	{/each}
</div>

<!-- Grid recursos -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
	{#each recursosFiltrados as recurso (recurso.id)}
		<RecursoCard {...recurso} />
	{/each}
</div>

<!-- Contacto -->
<section class="max-w-lg mx-auto mb-20">
	<h2 class="text-2xl font-bold text-gray-900 mb-2">¿Encontraste un fallo?</h2>
	<p class="text-gray-500 mb-8">Cuéntanos y lo resolvemos.</p>

	{#if enviado}
		<div class="text-center py-10 border border-gray-200 rounded-2xl">
			<p class="text-4xl mb-3">📬</p>
			<p class="font-semibold text-gray-900">Mensaje enviado, gracias.</p>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-2 gap-4">
				<input
					bind:value={nombre}
					placeholder="Tu nombre"
					class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
				/>
				<input
					bind:value={email}
					type="email"
					placeholder="tu@email.com"
					class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
				/>
			</div>
			<textarea
				bind:value={mensaje}
				rows="4"
				placeholder="Cuéntanos qué pasó..."
				class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
			></textarea>
			<button
				onclick={enviarContacto}
				disabled={cargando}
				class="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
			>
				{cargando ? 'Enviando...' : 'Enviar mensaje'}
			</button>
		</div>
	{/if}
</section>
