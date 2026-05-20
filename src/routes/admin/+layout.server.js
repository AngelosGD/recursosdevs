import { redirect } from '@sveltejs/kit';

const ADMIN_EMAIL_FALLBACK = 'angelde9919@gmail.com';

export const load = async ({ locals: { supabase }, platform }) => {
	const { data: { user }, error: authError } = await supabase.auth.getUser();

	if (authError || !user) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK;

	if (user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { session: { ...session, user } };
};
