import { supabase } from '$lib/supabase.js';

export async function load() {
	const { data: pendientes } = await supabase.from('recursos').select('*').eq('aprobado', false);

	const { data: todos } = await supabase.from('recursos').select('*');

	return {
		pendientes: pendientes ?? [],
		todos: todos ?? []
	};
}
