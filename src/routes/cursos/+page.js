import { supabase } from '$lib/supabase.js';

export async function load({ url, parent }) {
	const { session } = await parent();

	const page = parseInt(url.searchParams.get('page') || '1');
	const perPage = 12;
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	const [{ data: cursos, count }] = await Promise.all([
		supabase
			.from('cursos')
			.select('*', { count: 'exact' })
			.eq('aprobado', true)
			.order('created_at', { ascending: false })
			.range(from, to)
	]);

	return {
		cursos: cursos ?? [],
		pagination: {
			page,
			perPage,
			total: count ?? 0,
			totalPages: Math.ceil((count ?? 0) / perPage)
		},
		session
	};
}
