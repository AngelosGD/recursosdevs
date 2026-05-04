<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Términos de Servicio - devRekursos</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
	<header class="border-b border-gray-200 dark:border-gray-800 py-6 px-4 sm:px-8">
		<div class="max-w-4xl mx-auto">
			<a href="/" class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">devRekursos</a>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-12 sm:py-16">
		<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Términos de Servicio</h1>

		<div class="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">1. Aceptación de términos</h2>
				<p>
					Al acceder y utilizar devRekursos, aceptas cumplir con estos términos de servicio. Si no estás de acuerdo con alguna parte de estos términos, no deberías usar nuestro servicio.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">2. Uso del servicio</h2>
				<p class="mb-4">Puedes utilizar devRekursos para:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Explorar y descubrir recursos de programación</li>
					<li>Sugerir nuevos recursos para la comunidad</li>
					<li>Contactarnos para consultas o sugerencias</li>
				</ul>
				<p class="mt-4">
					Te comprometes a no utilizar el servicio para fines ilegales, spam, o cualquier actividad que pueda dañar el sitio o a otros usuarios.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">3. Contenido del usuario</h2>
				<p>
					Al sugerir recursos, garantizas que tienes los derechos necesarios para compartir dicho contenido. No nos responsabilizamos por recursos sugeridos por usuarios que violen derechos de terceros.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">4. Moderación</h2>
				<p>
					Todos los recursos sugeridos pasan por un proceso de revisión antes de ser publicados. Nos reservamos el derecho de rechazar o eliminar cualquier contenido que incumpla nuestras políticas.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Limitación de responsabilidad</h2>
				<p>
					devRekursos se proporciona "tal cual". No garantizamos que el sitio esté siempre disponible o que los recursos listados sean precisos, completos o actualizados.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Cambios en los términos</h2>
				<p>
					Podemos modificar estos términos en cualquier momento. El uso continuado del servicio después de cambios constituye aceptación de los nuevos términos.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Contacto</h2>
				<p>
					Si tienes preguntas sobre estos términos, puedes contactarnos en <a href="/contacto" class="text-blue-600 dark:text-blue-400 hover:underline">nuestra página de contacto</a>.
				</p>
			</section>
		</div>

		<p class="text-sm text-gray-500 dark:text-gray-400 mt-12">
			Última actualización: Mayo 2026
		</p>
	</main>

	<Footer />
</div>