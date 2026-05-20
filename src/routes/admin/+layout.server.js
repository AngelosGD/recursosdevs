import { redirect } from '@sveltejs/kit';

const ADMIN_EMAIL_FALLBACK = 'angelde9919@gmail.com';

export const load = async ({ locals: { getUser }, platform, cookies }) => {
	const user = await getUser();

	if (!user) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK;

	if (user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	cookies.set('is_admin', 'true', {
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
		sameSite: 'lax',
		secure: true,
		httpOnly: false
	});

	return { session: { user } };
};
