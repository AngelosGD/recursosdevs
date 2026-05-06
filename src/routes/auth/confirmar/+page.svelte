<script>
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let cargando = $state(true);
	let mensaje = $state('');
	let exitoso = $state(false);

	onMount(async () => {
		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		const token = hashParams.get('confirmation_token');
		const type = hashParams.get('type');
		const email = hashParams.get('email');

		if (token) {
			const { data, error } = await supabase.auth.verifyOtp({
				token,
				type: 'email',
				email: email || undefined
			});

			if (error) {
				mensaje = error.message || 'Error al confirmar tu cuenta';
				exitoso = false;
			} else {
				mensaje = '¡Cuenta activada correctamente!';
				exitoso = true;
				setTimeout(() => goto('/cuenta-activada'), 2000);
			}
		} else {
			mensaje = 'Token de confirmación no válido';
			exitoso = false;
		}

		cargando = false;
	});
</script>

<div
	class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4 transition-colors duration-300"
>
	<div class="relative w-full max-w-md text-center">
		{#if cargando}
			<div class="flex flex-col items-center gap-4">
				<div
					class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
				></div>
				<p class="text-gray-700 dark:text-gray-300 font-medium">Confirmando tu cuenta...</p>
			</div>
		{:else}
			<div
				class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/50 dark:border-gray-700/50"
			>
				{#if exitoso}
					<div class="text-6xl mb-4">✓</div>
					<h1
						class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2"
					>
						¡Cuenta Activada!
					</h1>
					<p class="text-gray-600 dark:text-gray-300 mb-6">
						{mensaje}
					</p>
					<a
						href="/login"
						class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
					>
						Ir a iniciar sesión
					</a>
				{:else}
					<div class="text-6xl mb-4">✗</div>
					<h1
						class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2"
					>
						Error
					</h1>
					<p class="text-gray-600 dark:text-gray-300 mb-6">
						{mensaje}
					</p>
					<a
						href="/login"
						class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
					>
						Volver al login
					</a>
				{/if}
			</div>
		{/if}
	</div>
</div>