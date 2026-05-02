import { ADMIN_EMAIL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const AD_EMAIL = ADMIN_EMAIL; // ← pon tu email aquí

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	if (session.user.email !== AD_EMAIL) {
		throw redirect(303, '/');
	}

	return { session };
};
