export const load = async ({ locals: { getSession }, cookies }) => {
	const session = await getSession();

	const isAdminCookie = cookies.get('is_admin');
	const adminFromCookie = isAdminCookie === 'true';

	return { session, isAdmin: adminFromCookie };
};
