import { supabase } from '$lib/supabase.js';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, url }) {
	const { session } = await parent();

	if (!session) {
		throw redirect(303, '/login');
	}

	const [recursosRes, cursosRes, videosRes] = await Promise.all([
		supabase
			.from('favoritos')
			.select('*, recursos(*)')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false }),
		supabase
			.from('cursos_favoritos')
			.select('*, cursos(*)')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false }),
		supabase
			.from('videos_favoritos')
			.select('*, videos(*)')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false })
	]);

	return {
		recursosFavoritos: recursosRes.data ?? [],
		cursosFavoritos: cursosRes.data ?? [],
		videosFavoritos: videosRes.data ?? [],
		session
	};
}