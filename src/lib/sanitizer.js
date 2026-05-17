export function sanitizeInput(value) {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/[<>'";&]/g, '');
}

export function sanitizeTextarea(value) {
	if (typeof value !== 'string') return '';
	return value.trim().replace(/[<>'";&]/g, '');
}

export function sanitizeUrl(url) {
	if (typeof url !== 'string') return '';
	const trimmed = url.trim();
	if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
		return '';
	}
	return trimmed.replace(/[<>'";&]/g, '');
}

export function sanitizeCategories(categories) {
	if (typeof categories !== 'string') return [];
	const cats = categories.split(',').map(c => c.trim().replace(/[<>'";&]/g, '')).filter(Boolean);
	return cats;
}

export function validateEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

export function validateRequired(value) {
	return typeof value === 'string' && value.trim().length > 0;
}