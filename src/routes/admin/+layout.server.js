import { ADMIN_EMAIL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const AD_EMAIL = ADMIN_EMAIL;

export const load = async ({ locals: { supabase } }) => {
	const { data: { session }, error } = await supabase.auth.getSession();

	if (error) {
		console.error('Admin - Error getting session:', error.message);
	}

	if (!session) {
		console.log('Admin - No session, redirecting to login');
		throw redirect(303, '/login');
	}

	if (session.user.email !== AD_EMAIL) {
		console.log('Admin - Email mismatch:', session.user.email, '!=', AD_EMAIL);
		throw redirect(303, '/');
	}

	return { session };
};
