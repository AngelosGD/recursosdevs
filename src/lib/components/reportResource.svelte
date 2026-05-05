<script>
	let { recursoId, recursoTitulo } = $props();

	function reportar() {
		window.location.href = `/reportar?recurso=${recursoId}&titulo=${encodeURIComponent(recursoTitulo || '')}`;
	}
</script>

<button
	onclick={reportar}
	class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
	title="Reportar problema"
>
	<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
		></path>
	</svg>
	<span>Reportar</span>
</button>
