<script>
	import Footer from '$lib/components/Footer.svelte';

	const cambios = [
		{
			fecha: '2026-05-17',
			titulo: 'Filtros avanzados y nueva sección de Videos',
			imagen: 'https://i.imgur.com/filtros-videos.png',
			descripcion: 'Nueva barra lateral con filtros por categoría, nivel e idioma para recursos y cursos. Además, nueva sección de videos con thumbnails de YouTube.',
			porQue: 'Los usuarios necesitaban una forma más eficiente de encontrar recursos específicos y explorar contenido en video.',
			detalles: [
				'Barra lateral con filtros en desktop y móvil',
				'Filtros por nivel (Principiante, Intermedio, Avanzado)',
				'Filtros por idioma (Español, Inglés, Variado)',
				'Filtros por precio en cursos (Gratis, De pago, Freemium)',
				'Nueva página /videos con thumbnails de YouTube',
				'Formulario /submit ahora incluye opción Video',
				'Panel admin gestionable para videos'
			]
		},
		{
			fecha: '2026-05-17',
			titulo: 'Mejoras de seguridad y sanitización',
			imagen: 'https://i.imgur.com/seguridad.png',
			descripcion: 'Implementado sistema de sanitización para todos los inputs y mejora en la protección de rutas del admin.',
			porQue: 'Para prevenir inyección de código malicioso y proteger el acceso al panel de administración.',
			detalles: [
				'Nuevo módulo src/lib/sanitizer.js',
				'Sanitización de títulos, descripciones, URLs y categorías',
				'Validación de URLs (http/https)',
				'Protección de ruta /admin con variable de entorno',
				'Favicon personalizado con logo "dr"'
			]
		},
		{
			fecha: '2026-05-06',
			titulo: 'Confirmación de email y mejoras de autenticación',
			imagen: 'https://i.imgur.com/confirmar-email.png',
			descripcion:
				'Al registrar una cuenta, se envia un link de confirmación por email. Ahora redirige a una página que confirma la activación.',
			porQue:
				'Necesitábamos un flujo completo de registro con verificación de email.',
			detalles: [
				'Nueva página /auth/confirmar para procesar confirmación',
				'Página /cuenta-activada con mensaje de éxito',
				'Admin oculto para usuarios no autorizados'
			]
		},
		{
			fecha: '2026-05-05',
			titulo: 'Paginación corregida',
			imagen: 'https://i.imgur.com/paginacion-corregida.png',
			descripcion: 'La paginación de recursos ahora funciona correctamente al cambiar de página.',
			porQue: 'La navegación entre páginas no estaba recargando los datos correctamente.',
			detalles: [
				'Cambiado de enlaces <a> a botones con función goto',
				'Mantiene el focus después de cambiar de página',
				'Los datos se cargan correctamente en cada página'
			]
		},
		{
			fecha: '2026-05-04',
			titulo: 'Sistema de favoritos y reportes',
			imagen: 'https://i.imgur.com/favoritos-reportes.png',
			descripcion:
				'Los usuarios pueden guardar recursos que les gusten en una lista de favoritos, y reportar recursos que tengan problemas.',
			porQue:
				'Para mejorar la experiencia de usuario y mantener la calidad de los recursos publicados.',
			detalles: [
				'Botón "Guardar" en cada card de recurso',
				'Nueva página /favoritos para ver recursos guardados',
				'Botón "Reportar" que abre formulario detallado',
				'Tabla "favoritos" y "reportes" en base de datos'
			]
		},
		{
			fecha: '2026-05-04',
			titulo: 'Sección de Cursos',
			imagen: 'https://i.imgur.com/seccion-cursos.png',
			descripcion: 'Nueva sección dedicada a cursos de programación recomendados por la comunidad.',
			porQue:
				'Los recursos eran insufficient para aprender de forma completa, los cursos complementan el aprendizaje.',
			detalles: [
				'Nueva página /cursos con filtros y búsqueda',
				'Formulario unificado para sugerir recursos/cursos',
				'Sección de cursos en el panel de admin',
				'Tabla "cursos" y "cursos_favoritos" en BD'
			]
		},
		{
			fecha: '2026-05-04',
			titulo: 'Paginación de recursos',
			imagen: 'https://i.imgur.com/paginacion-recursos.png',
			descripcion: 'Los recursos ahora se muestran en páginas de 12 en 12 con navegación.',
			porQue: 'Cuando hay muchos recursos, la página se vuelve lenta y difícil de navegar.',
			detalles: [
				'12 recursos por página',
				'Botones anterior/siguiente',
				'Números de página',
				'Contador total de recursos'
			]
		},
		{
			fecha: '2026-05-04',
			titulo: 'Autor del recurso visible',
			imagen: 'https://i.imgur.com/autor-recurso.png',
			descripcion:
				'Al sugerir un recurso se guarda quién lo envió, y se muestra en la card y en el admin.',
			porQue:
				'Para dar crédito a la comunidad y que el admin pueda contactar al creador si tiene dudas.',
			detalles: [
				'Se guarda user_id y autor_nombre al sugerir',
				'Muestra "Sugerido por [nombre]" en cada card',
				'El admin puede ver quién envió cada recurso'
			]
		},
		{
			fecha: '2026-05-04',
			titulo: 'Mejoras en el Panel de Admin',
			imagen: 'https://i.imgur.com/admin-mejorado.png',
			descripcion:
				'El admin ahora tiene tabs separados para gestionar recursos y cursos, con formularios para agregar directamente.',
			porQue:
				'El admin necesitaba una forma de agregar cursos directamente sin depender de sugerencias.',
			detalles: [
				'Tabs para cambiar entre Recursos y Cursos',
				'Formulario para agregar cursos directamente',
				'Stats separados para cada sección',
				'Lista de cursos con aprobar/rechazar'
			]
		}
	];
</script>

<svelte:head>
	<title>Changelog - devRekursos</title>
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
		<div class="text-center mb-16">
			<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
				📝 Changelog
			</h1>
			<p class="text-gray-500 dark:text-gray-400 text-lg">
				Historial de actualizaciones y nuevas funcionalidades
			</p>
			<div
				class="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium"
			>
				<span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>
				Última actualización: 17 Mayo 2026
			</div>
		</div>

		<div class="relative">
			<!-- Línea vertical con gradiente -->
			<div
				class="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-300"
			></div>

			<div class="space-y-16">
				{#each cambios as cambio, i (cambio.fecha + cambio.titulo)}
					<div class="relative pl-12 sm:pl-20">
						<!-- Punto en la línea con número -->
						<div
							class="absolute left-2 sm:left-6 top-4 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-900 flex items-center justify-center"
						>
							<span class="text-white text-xs font-bold">{i + 1}</span>
						</div>

						<!-- Fecha arriba -->
						<div class="mb-4">
							<span
								class="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 rounded-full shadow-lg"
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									></path>
								</svg>
								{cambio.fecha}
							</span>
						</div>

						<!-- Card principal -->
						<div
							class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
						>
							<!-- Título con gradiente -->
							<h2
								class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
							>
								{cambio.titulo}
							</h2>

							<!-- Descripción -->
							<p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
								{cambio.descripcion}
							</p>

							<!-- Por qué -->
							<div
								class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-6 border-l-4 border-blue-500"
							>
								<p class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
									💡 ¿Por qué?
								</p>
								<p class="text-gray-600 dark:text-gray-300 text-sm">{cambio.porQue}</p>
							</div>

							<!-- Detalles como pills -->
							<div class="flex flex-wrap gap-2 mb-4">
								{#each cambio.detalles as detalle}
									<span
										class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium"
									>
										<svg class="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clip-rule="evenodd"
											></path>
										</svg>
										{detalle}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="text-center mt-20 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700"
		>
			<p class="text-gray-600 dark:text-gray-300 text-lg mb-2">¿Tienes ideas para el sitio?</p>
			<a
				href="/contacto"
				class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
			>
				Contáctanos →
			</a>
		</div>
	</main>

	<Footer />
</div>
