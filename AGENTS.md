# Contexto para agentes - devRekursos

## Estado actual del proyecto

Proyecto SvelteKit con Supabase funcionando en producción (Cloudflare Pages).

## Ultimas mejoras aplicadas (17 Mayo 2026)

### Favoritos unificados
- Página /favoritos con 3 pestañas (Recursos, Cursos, Videos)
- Botón de guardar videos en página /videos
- Nuevo componente `videoActions.svelte` para toggle de favoritos de videos
- Carga de favoritos desde 3 tablas: favoritos, cursos_favoritos, videos_favoritos

### Mejoras visuales en cards
- Efecto hover con borde de color (azul recursos, púrpura cursos)
- Sombra con tinte de color al hover
- Animación de escala (scale-105)
- Flecha "Ver recurso/curso" con transición animada hacia adelante

### Filtros avanzados y sección de Videos (sesión anterior)
- Barra lateral con filtros por categoría, nivel e idioma
- Filtros por nivel (Principiante, Intermedio, Avanzado, Variado)
- Filtros por idioma (Español, Inglés, Variado)
- Filtros por precio en cursos (Gratis, De pago, Freemium)
- Nueva sección /videos con thumbnails de YouTube

### Seguridad
- Módulo `src/lib/sanitizer.js` para sanitizar inputs
- Validación de URLs (http/https obligatorio)
- Protección de ruta /admin con variable de entorno ADMIN_EMAIL

## Bugs conocidos por corregir

1. **Email de admin hardcodeado** - En Navbar.svelte líneas 43 y 83
   - Uso directo de `angelde9919@gmail.com` en lugar de variable ADMIN_EMAIL
2. **CSS duplicado** - En app.css líneas 31-39 y 122-130
3. **Typo CSS** - En submit/+page.svelte línea 437: `dark:bg-gray800` → `dark:bg-gray-800`

## Base de datos

Tablas en Supabase:
- `recursos` - Recursos (sitios, herramientas, guías)
- `cursos` - Cursos
- `videos` - Videos (YouTube principalmente)
- `favoritos` - Favoritos de recursos por usuario
- `cursos_favoritos` - Favoritos de cursos por usuario
- `videos_favoritos` - Favoritos de videos por usuario
- `reportes` - Reportes de recursos
- `contacto` - Mensajes de contacto

## Variables de entorno requeridas

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL` (en Cloudflare vars)

## Siguientes mejoras sugeridas

### Alta prioridad
1. Loading states / skeleton loaders
2. Toast notifications para feedback de acciones
3. Corregir email hardcodeado del admin

### Media prioridad
4. Scroll infinito (reemplazar paginación)
5. SEO: meta tags, sitemap, Open Graph
6. Perfil de usuario

### Baja prioridad
7. Búsqueda avanzada
8. Optimizar favicon para todas las plataformas

## Comandos útiles

```bash
pnpm dev        # Desarrollo
pnpm build      # Build producción
pnpm lint       # Verificar código
```