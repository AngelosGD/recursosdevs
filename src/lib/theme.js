import { writable } from 'svelte/store';

function createThemeStore() {
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
	const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
	const initial = stored ? stored === 'dark' : prefersDark;

	const { subscribe, set, update } = writable(initial);

	return {
		subscribe,
		toggle: () => {
			update((isDark) => {
				const newValue = !isDark;
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('theme', newValue ? 'dark' : 'light');
				}
				if (typeof document !== 'undefined') {
					document.documentElement.classList.toggle('dark', newValue);
				}
				return newValue;
			});
		},
		init: () => {
			if (typeof document !== 'undefined') {
				const stored = localStorage.getItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const isDark = stored ? stored === 'dark' : prefersDark;
				document.documentElement.classList.toggle('dark', isDark);
				set(isDark);
			}
		}
	};
}

export const theme = createThemeStore();