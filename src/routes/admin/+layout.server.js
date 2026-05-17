import { redirect } from '@sveltejs/kit';

const ADMIN_EMAIL = 'angelde9919@gmail.com';

export const load = async ({ locals: { supabase }, platform }) => {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL || ADMIN_EMAIL;

	if (session.user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	return { session };
};
