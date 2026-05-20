<script>
	import { supabase } from '$lib/supabase.js';

	let { videoId, session } = $props();

	let guardando = $state(false);
	let guardado = $state(false);

	async function toggleGuardar() {
		if (!session) {
			window.location.href = '/login';
			return;
		}

		guardando = true;

		if (guardado) {
			await supabase
				.from('videos_favoritos')
				.delete()
				.eq('video_id', videoId)
				.eq('user_id', session.user.id);
			guardado = false;
		} else {
			await supabase
				.from('videos_favoritos')
				.insert({ video_id: videoId, user_id: session.user.id });
			guardado = true;
		}

		guardando = false;
	}

	$effect(() => {
		if (session?.user?.id) {
			supabase
				.from('videos_favoritos')
				.select('id')
				.eq('video_id', videoId)
				.eq('user_id', session.user.id)
				.maybeSingle()
				.then(({ data }) => {
					guardado = !!data;
				});
		}
	});
</script>

<button
	onclick={(e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleGuardar();
	}}
	disabled={guardando}
	class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors {guardado
		? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
		: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}"
	title={guardado ? 'Quitar de guardados' : 'Guardar video'}
>
	{#if guardando}
		<span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
		></span>
	{:else}
		<svg
			class="w-4 h-4"
			fill={guardado ? 'currentColor' : 'none'}
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
			></path>
		</svg>
	{/if}
	<span>{guardado ? 'Guardado' : 'Guardar'}</span>
</button>