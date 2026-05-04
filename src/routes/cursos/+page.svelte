<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Cursos - devRekursos</title>
</svelte:head>

<div class="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
	<div class="text-center max-w-2xl">
		<div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-xl">
			<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
			</svg>
		</div>

		<h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
			Estamos trabajando en esto
		</h1>

		<p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
			Pronto podrás encontrar los mejores cursos de programación para impulsar tu carrera profesional.
		</p>

		<div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 inline-block">
			<p class="text-gray-700 dark:text-gray-200 font-medium text-lg mb-2">
				✨ ¡Mantente atento!
			</p>
			<p class="text-gray-500 dark:text-gray-400 text-sm">
				Estamos seleccionando los cursos más valiosos para ti.
			</p>
			<div class="flex items-center justify-center gap-1 mt-4">
				<span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
				<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
				<span class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
			</div>
		</div>

		<div class="mt-10">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				Volver a Recursos
			</a>
		</div>
	</div>
</div>

<Footer />