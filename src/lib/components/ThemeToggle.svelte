<script>
	import { theme } from '$lib/theme.js';

	let isDark = $state(false);

	$effect(() => {
		const unsubscribe = theme.subscribe((value) => {
			isDark = value;
		});
		return unsubscribe;
	});

	function toggle() {
		theme.toggle();
	}
</script>

<button
	onclick={toggle}
	class="relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
	style="background: {isDark
		? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
		: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'}"
	aria-label="Cambiar tema"
>
	<span
		class="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
		style="background: white; transform: translateX({isDark ? '24px' : '0'})"
	>
		{#if isDark}
			<svg class="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
				<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
			</svg>
		{:else}
			<svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
					clip-rule="evenodd"
				/>
			</svg>
		{/if}
	</span>
</button>
