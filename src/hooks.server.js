import { createServerClient } from '@supabase/ssr';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const handle = sequence(async ({ event, resolve }) => {
	const isProduction = event.request.url.includes('workers.dev') || event.request.url.includes('pages.dev') || event.request.hostname !== 'localhost';

	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, {
						...options,
						path: '/',
						sameSite: 'lax',
						secure: isProduction,
						httpOnly: false,
						partitioned: isProduction,
						maxAge: options?.maxAge ?? 60 * 60 * 24 * 7
					});
				});
			}
		}
	});

	event.locals.getSession = async () => {
		const {
			data: { session },
			error
		} = await event.locals.supabase.auth.getSession();
		if (error) {
			console.error('Error getting session:', error);
		}
		return session;
	};

	event.locals.getUser = async () => {
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) {
			console.error('Error getting user:', error);
		}
		return user;
	};

	event.locals.isAdmin = () => {
		return event.cookies.get('is_admin') === 'true';
	};

	event.locals.setAdminCookie = (value) => {
		const secure = event.request.url.startsWith('https://');
		event.cookies.set('is_admin', value ? 'true' : 'false', {
			path: '/',
			sameSite: 'lax',
			secure,
			maxAge: 60 * 60 * 24 * 7
		});
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
});
