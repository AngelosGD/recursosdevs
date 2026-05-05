<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Política de Privacidad - devRekursos</title>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
	<header class="border-b border-gray-200 dark:border-gray-800 py-6 px-4 sm:px-8">
		<div class="max-w-4xl mx-auto">
			<a href="/" class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400"
				>devRekursos</a
			>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-12 sm:py-16">
		<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
			Política de Privacidad
		</h1>

		<div class="prose dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-300">
			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					1. Información que recopilamos
				</h2>
				<p class="mb-4">Recopilamos la siguiente información:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>
						<strong>Cuenta:</strong> Email y contraseña (almacenados de forma segura en Supabase)
					</li>
					<li><strong>Formulario de contacto:</strong> Nombre, email y mensaje que envías</li>
					<li>
						<strong>Sugerencias de recursos:</strong> Título, descripción, URL, categorías y metadatos
					</li>
				</ul>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					2. Cómo usamos tu información
				</h2>
				<p class="mb-4">Utilizamos tu información para:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Gestionar tu cuenta de usuario</li>
					<li>Procesar y revisar las sugerencias de recursos</li>
					<li>Responder a tus mensajes de contacto</li>
					<li>Mejorar nuestros servicios</li>
				</ul>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					3. Almacenamiento y seguridad
				</h2>
				<p>
					Tu información se almacena en Supabase, una plataforma de bases de datos segura.
					Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra
					acceso no autorizado.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					4. Compartir información
				</h2>
				<p>
					No vendemos ni compartilhemos tu información personal con terceros, excepto cuando sea
					necesario para提供服务 (prestar el servicio) o requerido por ley.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookies</h2>
				<p>
					Utilizamos cookies esenciales para el funcionamiento del sitio (gestión de sesión,
					preferencias de tema). No utilizamos cookies de seguimiento publicitario.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">6. Tus derechos</h2>
				<p class="mb-4">Tienes derecho a:</p>
				<ul class="list-disc pl-6 space-y-2">
					<li>Acceder a tus datos personales</li>
					<li>Rectificar datos incorrectos</li>
					<li>Solicitar la eliminación de tu cuenta</li>
					<li>Exportar tus datos</li>
				</ul>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">7. Menores de edad</h2>
				<p>
					Nuestro servicio no está dirigido a menores de 13 años. No recopilamos intencionalmente
					información de niños.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
					8. Cambios en la política
				</h2>
				<p>
					Podemos actualizar esta política periódicamente. Notificaremos cambios significativos
					mediante un aviso en el sitio.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">9. Contacto</h2>
				<p>
					Para ejercer tus derechos o consultas sobre esta política, contáctanos en <a
						href="/contacto"
						class="text-blue-600 dark:text-blue-400 hover:underline">nuestra página de contacto</a
					>.
				</p>
			</section>
		</div>

		<p class="text-sm text-gray-500 dark:text-gray-400 mt-12">Última actualización: Mayo 2026</p>
	</main>

	<Footer />
</div>
