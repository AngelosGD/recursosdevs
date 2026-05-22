import { supabase } from '$lib/supabase.js';

export async function load({ parent }) {
	const { session } = await parent();

	const { data: cursos } = await supabase
		.from('cursos')
		.select('*')
		.eq('aprobado', true)
		.order('created_at', { ascending: false });

	return {
		cursos: cursos ?? [],
		session
	};
}
