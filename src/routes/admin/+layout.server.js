import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, platform }) => {
	const { data: { user }, error: authError } = await supabase.auth.getUser();

	if (authError || !user) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL;

	if (!adminEmail || user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { session: { ...session, user } };
};
