<script>
	import { supabase } from '$lib/supabase.js';

	let { session } = $props();

	async function logout() {
		await supabase.auth.signOut();
		window.location.href = '/';
	}
</script>

<nav class="flex items-center justify-between px-8 py-4 border-b border-gray-100">
	<a href="/" class="font-bold text-2xl text-blue-600">devRekursos</a>
	<div class="flex items-center gap-6 text-gray-600">
		<a href="/" class="hover:text-blue-600 transition-colors text-lg">Recursos</a>
		{#if session}
			<span class="text-sm text-gray-500">{session.user.email}</span>
			<button onclick={logout} class="text-sm text-gray-500 hover:text-red-500 transition-colors">
				Cerrar sesión
			</button>
		{:else}
			<a href="/login" class="hover:text-blue-600 transition-colors text-lg">Entrar</a>
		{/if}
		<a
			href="/submit"
			class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors"
		>
			Sugerir recurso
		</a>
	</div>
</nav>
