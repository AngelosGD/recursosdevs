import { redirect } from '@sveltejs/kit';

const ADMIN_EMAIL = 'angelde9919@gmail.com';

export const load = async ({ locals: { supabase } }) => {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	if (session.user.email !== ADMIN_EMAIL) {
		throw redirect(303, '/');
	}

	return { session };
};
