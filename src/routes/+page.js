import { supabase } from '$lib/supabase.js';

export async function load({ url, parent }) {
	const { session } = await parent();

	const page = parseInt(url.searchParams.get('page') || '1');
	const perPage = 12;
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	// ESTO VA EN LÍNEA 11 (reemplaza desde "const [{ data: recursos, count }, { data: recientes }]")
	const [
		{ data: recursos, count },
		{ data: recientes },
		{ count: countCursos },
		{ count: countVideos }
	] = await Promise.all([
		supabase
			.from('recursos')
			.select('*', { count: 'exact' })
			.eq('aprobado', true)
			.order('created_at', { ascending: false })
			.range(from, to),
		supabase
			.from('recursos')
			.select('*')
			.eq('aprobado', true)
			.order('created_at', { ascending: false })
			.limit(3),
		supabase.from('cursos').select('*', { count: 'exact', head: true }).eq('aprobado', true),
		supabase.from('videos').select('*', { count: 'exact', head: true }).eq('aprobado', true)
	]);

	return {
		recursos: recursos ?? [],
		recientes: recientes ?? [],
		countCursos: countCursos ?? 0,
		countVideos: countVideos ?? 0,
		pagination: {
			page,
			perPage,
			total: count ?? 0,
			totalPages: Math.ceil((count ?? 0) / perPage)
		},
		session
	};
}
