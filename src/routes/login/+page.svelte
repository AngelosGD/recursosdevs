<script>
	import { supabase } from '$lib/supabase.js';

	let email = $state('');
	let password = $state('');
	let passwordConfirm = $state('');
	let modo = $state('login');
	let cargando = $state(false);
	let error = $state('');
	let success = $state('');
	let showPassword = $state(false);
	let showPasswordConfirm = $state(false);
	let emailError = $state('');
	let passwordError = $state('');

	// Validación de email
	function validateEmail(e) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		emailError = email && !emailRegex.test(email) ? 'Email inválido' : '';
	}

	// Validación de contraseña
	function validatePassword() {
		passwordError = '';
		if (email) {
			if (password.length < 6) {
				passwordError = 'La contraseña debe tener al menos 6 caracteres';
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		validateEmail();
		validatePassword();

		if (emailError || passwordError) return;
		if (!email || !password) {
			error = 'Por favor completa todos los campos';
			return;
		}

		if (modo === 'register' && password !== passwordConfirm) {
			error = 'Las contraseñas no coinciden';
			return;
		}

		cargando = true;
		error = '';
		success = '';

		if (modo === 'login') {
			const { error: err } = await supabase.auth.signInWithPassword({ email, password });
			if (err) {
				error =
					err.message === 'Invalid login credentials'
						? 'Email o contraseña incorrectos'
						: err.message;
			} else {
				window.location.reload();
			}
		} else {
			const { error: err } = await supabase.auth.signUp({ email, password });
			if (err) {
				error = err.message;
			} else {
				success = 'Cuenta creada con éxito. Revisa tu correo para confirmarla.';
				email = '';
				password = '';
				passwordConfirm = '';
			}
		}

		cargando = false;
	}

	function toggleMode() {
		modo = modo === 'login' ? 'register' : 'login';
		error = '';
		success = '';
		emailError = '';
		passwordError = '';
		email = '';
		password = '';
		passwordConfirm = '';
	}
</script>

<div
	class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 p-4 transition-colors duration-300"
>
	<div
		class="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
	></div>
	<div
		class="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-200 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
	></div>
	<div
		class="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-pink-200 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
	></div>

	<div class="relative w-full max-w-md px-4 sm:px-0">
		<div class="text-center mb-6 sm:mb-10">
			<a href="/" class="inline-block">
				<h1
					class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
				>
					devrecursos.lat
				</h1>
			</a>
			<p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2 sm:mt-3 font-medium">
				{#if modo === 'login'}
					Bienvenido de vuelta
				{:else}
					Únete a nuestra comunidad
				{/if}
			</p>
		</div>

		<div
			class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/50 dark:border-gray-700/50"
		>
			{#if error}
				<div
					class="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg animate-in fade-in"
				>
					<p class="text-red-700 dark:text-red-400 text-sm font-medium flex items-center gap-2">
						<span class="text-lg">⚠️</span>
						{error}
					</p>
				</div>
			{/if}

			{#if success}
				<div
					class="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 rounded-lg animate-in fade-in"
				>
					<p class="text-green-700 dark:text-green-400 text-sm font-medium flex items-center gap-2">
						<span class="text-lg">✓</span>
						{success}
					</p>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-5">
				<div>
					<label
						for="email"
						class="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</label
					>
					<div class="relative">
						<input
							id="email"
							bind:value={email}
							onchange={validateEmail}
							onblur={validateEmail}
							type="email"
							placeholder="ejemplo@correo.com"
							class="w-full px-4 py-3 rounded-xl border-2 transition-all {emailError
								? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20'
								: 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-300 dark:hover:border-gray-500'} bg-opacity-50 dark:bg-gray-700/50 focus:outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
						/>
						{#if emailError}
							<p class="mt-1 text-red-500 dark:text-red-400 text-xs font-medium">× {emailError}</p>
						{/if}
					</div>
				</div>

				<div>
					<label
						for="password"
						class="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
						>Contraseña</label
					>
					<div class="relative">
						<input
							id="password"
							bind:value={password}
							onchange={validatePassword}
							onblur={validatePassword}
							type={showPassword ? 'text' : 'password'}
							placeholder="Mínimo 6 caracteres"
							class="w-full px-4 py-3 rounded-xl border-2 transition-all {passwordError
								? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20'
								: 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 hover:border-gray-300 dark:hover:border-gray-500'} bg-opacity-50 dark:bg-gray-700/50 focus:outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
						>
							{showPassword ? '👁️' : '👁️‍🗨️'}
						</button>
						{#if passwordError}
							<p class="mt-1 text-red-500 dark:text-red-400 text-xs font-medium">
								× {passwordError}
							</p>
						{/if}
					</div>
				</div>

				{#if modo === 'register'}
					<div>
						<label
							for="passwordConfirm"
							class="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
						>
							Confirmar Contraseña
						</label>
						<div class="relative">
							<input
								id="passwordConfirm"
								bind:value={passwordConfirm}
								type={showPasswordConfirm ? 'text' : 'password'}
								placeholder="Repite tu contraseña"
								class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-opacity-50 dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
							/>
							<button
								type="button"
								onclick={() => (showPasswordConfirm = !showPasswordConfirm)}
								class="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg"
							>
								{showPasswordConfirm ? '👁️' : '👁️‍🗨️'}
							</button>
						</div>
					</div>
				{/if}

				{#if modo === 'login'}
					<div class="flex justify-end">
						<a
							href="/recuperar"
							class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>
				{/if}

				<button
					type="submit"
					disabled={cargando || emailError || passwordError}
					class="w-full mt-7 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
				>
					{#if cargando}
						<div
							class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
						></div>
						<span>{modo === 'login' ? 'Iniciando...' : 'Creando cuenta...'}</span>
					{:else}
						{modo === 'login' ? '🚀 Iniciar sesión' : '✨ Crear cuenta'}
					{/if}
				</button>
			</form>

			<div class="mt-7 pt-7 border-t border-gray-200 dark:border-gray-700 text-center">
				<p class="text-gray-600 dark:text-gray-400 text-sm">
					{#if modo === 'login'}
						¿No tienes cuenta?
						<button
							type="button"
							onclick={toggleMode}
							class="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors ml-1"
						>
							Regístrate aquí →
						</button>
					{:else}
						¿Ya tienes cuenta?
						<button
							type="button"
							onclick={toggleMode}
							class="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors ml-1"
						>
							Inicia sesión aquí →
						</button>
					{/if}
				</p>
			</div>
		</div>

		<p class="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 sm:mt-8">
			Al continuar, aceptas nuestros
			<a href="/terminos" class="text-blue-600 dark:text-blue-400 hover:underline"
				>Términos de Servicio</a
			>
			y
			<a href="/privacidad" class="text-blue-600 dark:text-blue-400 hover:underline"
				>Política de Privacidad</a
			>
		</p>
	</div>
</div>

<style>
	@keyframes blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	:global(.animate-blob) {
		animation: blob 7s infinite;
	}

	:global(.animation-delay-2000) {
		animation-delay: 2s;
	}

	:global(.animation-delay-4000) {
		animation-delay: 4s;
	}
</style>
