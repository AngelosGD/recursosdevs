import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
	auth: {
		flowType: 'pkce',
		persistSession: true,
		autoRefreshToken: true
	},
	cookies: {
		get(key) {
			if (!isBrowser()) return undefined;
			const value = document.cookie
				.split('; ')
				.find(row => row.startsWith(key + '='));
			return value ? value.split('=')[1] : undefined;
		},
		set(key, value, options) {
			if (!isBrowser()) return;
			document.cookie = `${key}=${value}; path=${options?.path ?? '/'}; max-age=${options?.maxAge ?? 60 * 60 * 24 * 7}; sameSite=${options?.sameSite ?? 'lax'}; ${options?.secure ? 'secure;' : ''}`;
		},
		remove(key, options) {
			if (!isBrowser()) return;
			document.cookie = `${key}=; path=${options?.path ?? '/'}; max-age=0; sameSite=${options?.sameSite ?? 'lax'}; ${options?.secure ? 'secure;' : ''}`;
		}
	}
});
