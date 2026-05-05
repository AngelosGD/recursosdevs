import { supabase } from '$lib/supabase.js';

export async function load() {
	const [recursosRes, cursosRes, mensajesRes] = await Promise.all([
		supabase.from('recursos').select('*'),
		supabase.from('cursos').select('*'),
		supabase.from('contacto').select('*').order('created_at', { ascending: false })
	]);

	const todos = recursosRes.data ?? [];
	const pendientes = todos.filter((r) => !r.aprobado);

	const cursosTodos = cursosRes.data ?? [];
	const cursosPendientes = cursosTodos.filter((c) => !c.aprobado);

	return {
		pendientes,
		todos,
		mensajes: mensajesRes.data ?? [],
		cursosTodos,
		cursosPendientes
	};
}
