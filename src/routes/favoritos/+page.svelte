<script>
	import RecursoCard from '$lib/components/cardResource.svelte';

	let { data } = $props();
	let favoritos = data.favoritos;
	let session = data.session;
</script>

<svelte:head>
	<title>Favoritos - devRekursos</title>
</svelte:head>

<section class="mb-8">
	<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mis Favoritos</h1>
	<p class="text-gray-500 dark:text-gray-400">Recursos que has guardado para ver después</p>
</section>

{#if favoritos.length === 0}
	<div class="text-center py-16">
		<p class="text-5xl mb-4">📚</p>
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
			No tienes favoritos aún
		</h2>
		<p class="text-gray-500 dark:text-gray-400 mb-6">
			Guarda recursos haciendo clic en el botón de guardar en cada tarjeta
		</p>
		<a
			href="/"
			class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
		>
			Explorar recursos →
		</a>
	</div>
{:else}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
		{#each favoritos as fav (fav.recursos.id)}
			<RecursoCard {...fav.recursos} {session} />
		{/each}
	</div>
{/if}
