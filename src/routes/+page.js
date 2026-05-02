import { supabase } from '$lib/supabase.js';

export async function load() {
	const { data: recursos } = await supabase.from('recursos').select('*').eq('aprobado', true);

	const { data: recientes } = await supabase
		.from('recursos')
		.select('*')
		.eq('aprobado', true)
		.order('created_at', { ascending: false })
		.limit(3);

	return {
		recursos: recursos ?? [],
		recientes: recientes ?? []
	};
}
