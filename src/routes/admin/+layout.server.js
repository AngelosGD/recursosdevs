import { ADMIN_EMAIL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

const AD_EMAIL = ADMIN_EMAIL;

export const load = async ({ locals: { supabase } }) => {
	if (!AD_EMAIL) {
		console.error('ADMIN_EMAIL no está configurado en el servidor');
		throw redirect(303, '/login');
	}

	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user) {
		throw redirect(303, '/login');
	}

	if (user.email !== AD_EMAIL) {
		throw redirect(303, '/');
	}

	const { data: { session } } = await supabase.auth.getSession();

	return { session };
};
