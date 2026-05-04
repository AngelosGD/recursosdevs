<script>
	import { supabase } from '$lib/supabase.js';
	import ThemeToggle from './ThemeToggle.svelte';

	let { session } = $props();
	let menuAbierto = $state(false);

	async function logout() {
		await supabase.auth.signOut();
		window.location.reload();
	}

	function cerrarMenu() {
		menuAbierto = false;
	}
</script>

<nav class="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
	<a href="/" class="font-bold text-xl sm:text-2xl text-blue-600 dark:text-blue-400">devRekursos</a>

	<button
		onclick={() => (menuAbierto = !menuAbierto)}
		class="lg:hidden p-2 text-gray-600 dark:text-gray-300"
		aria-label="Menú"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			{#if menuAbierto}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			{/if}
		</svg>
	</button>

	<div class="hidden lg:flex items-center gap-4 xl:gap-6 text-gray-600 dark:text-gray-300">
		<a href="/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base xl:text-lg">Recursos</a>
		<a href="/contacto" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base xl:text-lg">Contacto</a>
		<ThemeToggle />
		{#if session}
			<a href="/admin" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
				Admin
			</a>
			<span class="text-sm text-gray-500 dark:text-gray-400 hidden xl:inline">{session.user.email}</span>
			<button onclick={logout} class="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
				Cerrar sesión
			</button>
		{:else}
			<a href="/login" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-base xl:text-lg">Entrar</a>
		{/if}
		<a
			href="/submit"
			class="bg-blue-600 text-white px-3 py-2 xl:px-4 rounded-full text-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
		>
			Sugerir
		</a>
	</div>
</nav>

{#if menuAbierto}
	<div class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 flex flex-col gap-4">
		<a href="/" onclick={cerrarMenu} class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">Recursos</a>
		<a href="/contacto" onclick={cerrarMenu} class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">Contacto</a>
		<div class="flex items-center gap-4 py-2">
			<span class="text-sm text-gray-500 dark:text-gray-400">Tema:</span>
			<ThemeToggle />
		</div>
		{#if session}
			<a href="/admin" onclick={cerrarMenu} class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-2">
				Panel Admin
			</a>
			<span class="text-sm text-gray-500 dark:text-gray-400 py-2">{session.user.email}</span>
			<button onclick={logout} class="text-sm text-red-500 hover:text-red-600 py-2 text-left">
				Cerrar sesión
			</button>
		{:else}
			<a href="/login" onclick={cerrarMenu} class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2">Entrar</a>
		{/if}
		<a
			href="/submit"
			onclick={cerrarMenu}
			class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm text-center hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
		>
			Sugerir recurso
		</a>
	</div>
{/if}
