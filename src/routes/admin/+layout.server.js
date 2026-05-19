import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase }, platform }) => {
	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL;

	if (!adminEmail || session.user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	return { session };
};
