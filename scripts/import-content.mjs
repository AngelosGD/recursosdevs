#!/usr/bin/env node
/**
 * Importa contenido a Supabase.
 * Modo interactivo:  node scripts/import-content.mjs
 * Modo JSON:         node scripts/import-content.mjs <archivo.json>
 * Modo directo:      node scripts/import-content.mjs --url <url> --type <tipo>
 *
 * JSON format: [{ "url": "https://...", "type": "curso|recurso|video", "titulo": "..." }]
 * Si falta titulo/descripcion/imagen, el script scrapea la URL.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

// ─── Config ────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const NIVELES = ['Principiante', 'Intermedio', 'Avanzado', 'Variado'];
const IDIOMAS = ['Español', 'Inglés', 'Variado'];
const TIPOS_RECURSO = ['Pagina', 'Gratis', 'De pago', 'Herramienta', 'Descargable'];
const PRECIOS = ['Gratis', 'De pago', 'Freemium'];

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractYouTubeId(url) {
	const m = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
	);
	return m ? m[1] : null;
}

async function fetchYouTubeOembed(videoId) {
	try {
		const res = await fetch(
			`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
			{
				headers: { 'User-Agent': 'Mozilla/5.0' }
			}
		);
		return res.ok ? await res.json() : null;
	} catch {
		return null;
	}
}

function htmlDecode(str) {
	if (!str) return str;
	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&#x27;/g, "'")
		.replace(/&#x2F;/g, '/')
		.replace(/&#x60;/g, '`');
}

async function scrapeUrl(url) {
	const isYouTube = extractYouTubeId(url);
	let data = { title: '', description: '', image: '', canal: '', sitio: '' };

	if (isYouTube) {
		const oembed = await fetchYouTubeOembed(isYouTube);
		if (oembed) {
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;
			data.canal = htmlDecode(oembed.author_name || '');
		}
		// Try maxresdefault, fallback to hqdefault
		const tryImg = async (size) => {
			const url = `https://img.youtube.com/vi/${isYouTube}/${size}.jpg`;
			try {
				const r = await fetch(url, { method: 'HEAD' });
				return r.ok ? url : null;
			} catch {
				return null;
			}
		};
		data.image =
			(await tryImg('maxresdefault')) ||
			(await tryImg('hqdefault')) ||
			`https://img.youtube.com/vi/${isYouTube}/hqdefault.jpg`;
		try {
			const res = await fetch(`https://www.youtube.com/watch?v=${isYouTube}`, {
				headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
			});
			const html = await res.text();
			const dm = html.match(/<meta name="description" content="([^"]+)"/);
			if (dm) data.description = htmlDecode(dm[1]);
		} catch (e) {
			console.error(`  ⚠️ Error scraping YouTube: ${e.message}`);
		}
		return data;
	}

	try {
		const res = await fetch(url, {
			headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
		});
		const html = await res.text();

		const og = (prop) => {
			const r = new RegExp(
				`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']+)["']`,
				'i'
			);
			const m = html.match(r);
			return m ? htmlDecode(m[1]) : null;
		};
		const tw = (prop) => {
			const r = new RegExp(
				`<meta[^>]+name=["']twitter:${prop}["'][^>]+content=["']([^"']+)["']`,
				'i'
			);
			const m = html.match(r);
			return m ? htmlDecode(m[1]) : null;
		};
		const meta = (name) => {
			const r = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i');
			const m = html.match(r);
			return m ? htmlDecode(m[1]) : null;
		};
		const titleTag = () => {
			const m = html.match(/<title>([^<]+)<\/title>/i);
			return m ? htmlDecode(m[1].trim()) : null;
		};

		data.title = og('title') || tw('title') || titleTag() || '';
		data.description = og('description') || tw('description') || meta('description') || '';
		data.image = og('image') || tw('image') || '';
		try {
			data.sitio = new URL(url).hostname.replace('www.', '');
		} catch {
			// URL inválida, ignorar
		}
	} catch (e) {
		console.error(`  ⚠️ Error scraping: ${e.message}`);
	}

	return data;
}

// ─── Interactive helpers ─────────────────────────────────────────────────────

function rl() {
	return createInterface({ input: process.stdin, output: process.stdout });
}

function ask(prompt, defaultValue = '') {
	return new Promise((resolve) => {
		const i = rl();
		i.question(`  ${prompt}${defaultValue ? ` [${defaultValue}]: ` : ': '}`, (a) => {
			i.close();
			resolve(a.trim() || defaultValue);
		});
	});
}

// ─── Inserters ──────────────────────────────────────────────────────────────

function parseCats(str) {
	if (Array.isArray(str)) return str;
	return (str || '')
		.split(',')
		.map((c) => c.trim())
		.filter(Boolean);
}

async function insertRecurso(data) {
	const { data: result, error } = await supabase
		.from('recursos')
		.insert({
			titulo: data.titulo,
			descripcion: data.descripcion || '',
			url: data.url,
			image_url: data.image_url || data.image || null,
			tipo: data.tipo || 'Pagina',
			nivel: data.nivel || 'Variado',
			idioma: data.idioma || 'Español',
			categorias: parseCats(data.categorias),
			aprobado: true,
			autor_nombre: ADMIN_EMAIL
		})
		.select()
		.single();
	if (error) throw error;
	return result;
}

async function insertCurso(data) {
	const { data: result, error } = await supabase
		.from('cursos')
		.insert({
			titulo: data.titulo,
			descripcion: data.descripcion || '',
			url: data.url,
			instructor: data.instructor || data.canal || '',
			precio: data.precio || 'Gratis',
			nivel: data.nivel || 'Variado',
			categorias: parseCats(data.categorias),
			imagen: data.imagen || data.image || null,
			aprobado: true,
			autor_nombre: ADMIN_EMAIL
		})
		.select()
		.single();
	if (error) throw error;
	return result;
}

async function insertVideo(data) {
	const { data: result, error } = await supabase
		.from('videos')
		.insert({
			titulo: data.titulo,
			descripcion: data.descripcion || '',
			url: data.url,
			canal: data.canal || '',
			duracion: data.duracion || null,
			nivel: data.nivel || 'Variado',
			categorias: parseCats(data.categorias),
			thumbnail: data.image || null,
			aprobado: true,
			autor_nombre: ADMIN_EMAIL
		})
		.select()
		.single();
	if (error) throw error;
	return result;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function processItem(item) {
	// Scrape if missing data
	if (!item.titulo && item.url) {
		console.log(`\n🔍 Scrapeando: ${item.url}`);
		const scraped = await scrapeUrl(item.url);
		item.titulo = item.titulo || scraped.title || '';
		item.descripcion = item.descripcion || scraped.description || '';
		item.image = item.image || scraped.image || '';
		item.canal = item.canal || scraped.canal || '';
		item.sitio = item.sitio || scraped.sitio || '';
		console.log(`  📄 Título: ${(item.titulo || '').slice(0, 80)}`);
	}

	if (!item.titulo) throw new Error('❌ No se pudo determinar el título');

	let result;
	switch (item.type) {
		case 'curso':
			result = await insertCurso(item);
			console.log(`✅ Curso #${result.id}: ${result.titulo}`);
			break;
		case 'video':
			result = await insertVideo(item);
			console.log(`✅ Video #${result.id}: ${result.titulo}`);
			break;
		default:
			result = await insertRecurso(item);
			console.log(`✅ Recurso #${result.id}: ${result.titulo}`);
			break;
	}
	return result;
}

async function interactiveSingle(url) {
	const scraped = await scrapeUrl(url);
	console.log('\n📋 Datos extraídos:');
	console.log(`  Título:       ${scraped.title || '(vacío)'}`);
	console.log(`  Descripción:  ${(scraped.description || '(vacío)').slice(0, 100)}`);
	console.log(`  Imagen:       ${scraped.image || '(ninguna)'}`);
	if (scraped.canal) console.log(`  Canal:        ${scraped.canal}`);

	const type = await ask('Tipo (curso/recurso/video)', 'recurso');

	const item = { ...scraped, url, type };
	if (type === 'curso') {
		item.titulo = await ask('Título', scraped.title);
		item.descripcion = await ask('Descripción', scraped.description || '');
		item.instructor = await ask('Instructor / Plataforma', scraped.canal || scraped.sitio || '');
		item.precio = await ask(`Precio (${PRECIOS.join('/')})`, 'Gratis');
		item.nivel = await ask(`Nivel (${NIVELES.join('/')})`, 'Variado');
		item.categorias = await ask('Categorías (separadas por coma)');
		item.imagen = await ask('URL de imagen', scraped.image || '');
	} else if (type === 'video') {
		item.titulo = await ask('Título', scraped.title);
		item.descripcion = await ask('Descripción', scraped.description || '');
		item.canal = await ask('Canal / Creador', scraped.canal || scraped.sitio || '');
		item.duracion = await ask('Duración (opcional)');
		item.nivel = await ask(`Nivel (${NIVELES.join('/')})`, 'Variado');
		item.categorias = await ask('Categorías (separadas por coma)');
	} else {
		item.titulo = await ask('Título', scraped.title);
		item.descripcion = await ask('Descripción', scraped.description || '');
		item.tipo = await ask(`Tipo (${TIPOS_RECURSO.join('/')})`, 'Pagina');
		item.nivel = await ask(`Nivel (${NIVELES.join('/')})`, 'Variado');
		item.idioma = await ask(`Idioma (${IDIOMAS.join('/')})`, 'Español');
		item.categorias = await ask('Categorías (separadas por coma)');
		item.image_url = await ask('URL de imagen', scraped.image || '');
	}

	const ok = await ask('¿Insertar? (s/n)', 's');
	if (!['s', 'si'].includes(ok.toLowerCase())) {
		console.log('❌ Cancelado');
		return;
	}
	console.log(`\n${'='.repeat(60)}`);
	try {
		await processItem(item);
	} catch (e) {
		console.error(`❌ Error: ${e.message}`);
	}
	console.log(`\n${'='.repeat(60)}\n🎉 Hecho!`);
}

async function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		const url = await ask('URL del contenido');
		if (!url) {
			console.log('👋 Bye');
			return;
		}
		await interactiveSingle(url);
		return;
	}

	let items;
	if (args[0] === '--url') {
		items = [
			{
				url: args[1],
				type: args.indexOf('--type') !== -1 ? args[args.indexOf('--type') + 1] : 'recurso'
			}
		];
	} else {
		const filePath = args[0];
		if (!existsSync(filePath)) {
			console.error(`❌ No encontrado: ${filePath}`);
			process.exit(1);
		}
		items = JSON.parse(readFileSync(filePath, 'utf-8'));
	}

	for (let i = 0; i < items.length; i++) {
		console.log(`\n${'='.repeat(60)}\n📦 Item ${i + 1}/${items.length}`);
		try {
			await processItem(items[i]);
		} catch (e) {
			console.error(`❌ Error: ${e.message}`);
		}
	}

	console.log(`\n${'='.repeat(60)}\n🎉 Hecho!`);
}

main().catch(console.error);
