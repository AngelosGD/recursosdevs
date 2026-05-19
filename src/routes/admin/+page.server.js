import { redirect } from '@sveltejs/kit';

const ADMIN_EMAIL_FALLBACK = 'angelde9919@gmail.com';

export async function load({ locals, platform }) {
	const { supabase } = locals;
	
	if (!supabase) {
		throw redirect(303, '/login');
	}

	const { data: { user }, error: authError } = await supabase.auth.getUser();

	if (authError || !user) {
		throw redirect(303, '/login');
	}

	const adminEmail = platform?.env?.ADMIN_EMAIL || ADMIN_EMAIL_FALLBACK;
	
	if (user.email !== adminEmail) {
		throw redirect(303, '/');
	}

	const [recursosRes, cursosRes, mensajesRes, videosRes] = await Promise.all([
		supabase.from('recursos').select('*'),
		supabase.from('cursos').select('*'),
		supabase.from('contacto').select('*').order('created_at', { ascending: false }),
		supabase.from('videos').select('*')
	]);

	const todos = recursosRes.data ?? [];
	const pendientes = todos.filter((r) => !r.aprobado);

	const cursosTodos = cursosRes.data ?? [];
	const cursosPendientes = cursosTodos.filter((c) => !c.aprobado);

	const videosTodos = videosRes.data ?? [];
	const videosPendientes = videosTodos.filter((v) => !v.aprobado);

	return {
		pendientes,
		todos,
		mensajes: mensajesRes.data ?? [],
		cursosTodos,
		cursosPendientes,
		videosTodos,
		videosPendientes,
		session: { user }
	};
}
