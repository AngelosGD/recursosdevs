import { supabase } from '$lib/supabase.js';

export async function load() {
	const { data: pendientes } = await supabase.from('recursos').select('*').eq('aprobado', false);

	const { data: todos } = await supabase.from('recursos').select('*');

	const { data: mensajes } = await supabase
		.from('contacto')
		.select('*')
		.order('created_at', { ascending: false });

	return {
		pendientes: pendientes ?? [],
		todos: todos ?? [],
		mensajes: mensajes ?? []
	};
}
