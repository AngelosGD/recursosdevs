<script>
	import { supabase } from '$lib/supabase.js';

	let nombre = $state('');
	let email = $state('');
	let mensaje = $state('');
	let enviado = $state(false);
	let cargando = $state(false);

	async function enviarContacto() {
		cargando = true;
		const { error } = await supabase.from('contacto').insert({ nombre, email, mensaje });
		cargando = false;
		if (!error) enviado = true;
	}
</script>

<section class="max-w-lg mx-auto py-8 sm:py-14 px-4">
	<h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Contacto</h1>
	<p class="text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
		¿Encontraste un fallo? Cuéntanos y lo resolvemos.
	</p>

	{#if enviado}
		<div
			class="text-center py-10 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800"
		>
			<p class="text-4xl mb-3">📬</p>
			<p class="font-semibold text-gray-900 dark:text-white">Mensaje enviado, gracias.</p>
			<a href="/" class="text-blue-600 dark:text-blue-400 text-sm mt-4 inline-block hover:underline"
				>Volver al inicio</a
			>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<input
					bind:value={nombre}
					placeholder="Tu nombre"
					class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
				/>
				<input
					bind:value={email}
					type="email"
					placeholder="tu@email.com"
					class="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
				/>
			</div>
			<textarea
				bind:value={mensaje}
				rows="4"
				placeholder="Cuéntanos qué pasó..."
				class="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
			></textarea>
			<button
				onclick={enviarContacto}
				disabled={cargando}
				class="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50"
			>
				{cargando ? 'Enviando...' : 'Enviar mensaje'}
			</button>
		</div>
	{/if}
</section>
