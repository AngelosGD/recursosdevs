import { supabase } from '$lib/supabase.js';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, url }) {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/login');
	}

	const { data: favoritos } = await supabase
		.from('favoritos')
		.select('*, recursos(*)')
		.eq('user_id', session.user.id)
		.order('created_at', { ascending: false });

	return {
		favoritos: favoritos ?? [],
		session
	};
}
