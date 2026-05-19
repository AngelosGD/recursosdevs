<script>
	import { supabase } from '$lib/supabase.js';
	import ThemeToggle from './ThemeToggle.svelte';

	const ADMIN_EMAIL_FALLBACK = 'angelde9919@gmail.com';
	let { session } = $props();
	let menuAbierto = $state(false);
	let adminEmail = $derived(typeof import.meta.env.ADMIN_EMAIL !== 'undefined' ? import.meta.env.ADMIN_EMAIL : ADMIN_EMAIL_FALLBACK);
	let isAdmin = $derived(session?.user?.email === adminEmail);

	async function logout() {
		await supabase.auth.signOut();
		window.location.reload();
	}

	function cerrarMenu() {
		menuAbierto = false;
	}
</script>

<nav
	class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-300"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
				<svg class="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
				<span class="hidden sm:inline">devRekursos</span>
			</a>

			<div class="hidden lg:flex items-center gap-1">
				<a href="/" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">Recursos</a>
				<a href="/videos" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">Videos</a>
				<a href="/cursos" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">Cursos</a>
				{#if session}
					<a href="/favoritos" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">Favoritos</a>
				{/if}
			</div>

			<div class="hidden lg:flex items-center gap-3">
				<a href="/contacto" class="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all">Contacto</a>
				<ThemeToggle />
				{#if session}
					{#if isAdmin}
						<a href="/admin" class="px-3 py-2 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">Admin</a>
					{/if}
					<div class="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
						<span class="text-xs text-gray-500 dark:text-gray-400 max-w-[120px] truncate">{session.user.email}</span>
						<button onclick={logout} class="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all" title="Cerrar sesión">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</button>
					</div>
				{:else}
					<a href="/login" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all">Entrar</a>
				{/if}
				<a href="/submit" class="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all hover:scale-105">Sugerir</a>
			</div>

			<button onclick={() => (menuAbierto = !menuAbierto)} class="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="Menú">
				{#if menuAbierto}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if menuAbierto}
		<div class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
			<div class="px-4 py-4 space-y-2">
				<a href="/" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Recursos</a>
				<a href="/videos" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Videos</a>
				<a href="/cursos" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Cursos</a>
				<a href="/contacto" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Contacto</a>
				{#if session}
					<a href="/favoritos" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Favoritos</a>
					{#if isAdmin}
						<a href="/admin" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">Panel Admin</a>
					{/if}
					<div class="pt-2 border-t border-gray-200 dark:border-gray-700">
						<span class="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{session.user.email}</span>
						<button onclick={logout} class="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">Cerrar sesión</button>
					</div>
				{:else}
					<a href="/login" onclick={cerrarMenu} class="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Entrar</a>
				{/if}
				<a href="/submit" onclick={cerrarMenu} class="block px-4 py-3 text-center rounded-xl text-base font-medium bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">Sugerir recurso</a>
			</div>
			<div class="px-4 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
				<span class="text-sm text-gray-500 dark:text-gray-400">Tema</span>
				<ThemeToggle />
			</div>
		</div>
	{/if}
</nav>
