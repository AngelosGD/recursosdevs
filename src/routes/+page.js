import { supabase } from '$lib/supabase.js';

export async function load() {
	const { data, error } = await supabase.from('recursos').select('*').eq('aprobado', true);

	if (error) {
		console.error(error);
		return { recursos: [] };
	}

	return { recursos: data };
}
