# Contexto para agentes - devRekursos

## Estado actual del proyecto

Proyecto SvelteKit con Supabase funcionando en producción (Cloudflare Pages).

## Últimas mejoras aplicadas (21 Mayo 2026)

### Script de importación automatizado
- Creado `scripts/import-content.mjs` - scraper que extrae metadata de URLs (OG tags, YouTube oEmbed)
- Inserta directamente a Supabase con `aprobado: true`
- Soporta modo interactivo, por JSON, o CLI directo
- Detecta YouTube y usa `hqdefault.jpg` como fallback si `maxresdefault.jpg` no existe
- Uso: `node scripts/import-content.mjs archivo.json`

### Importación masiva de cursos
- Agregados 15 cursos vía script (desde YouTube: Fazt, midulive, Fernando Herrera, MoureDev)
- Thumbnails corregidos: `maxresdefault.jpg` → `hqdefault.jpg` para 6 cursos que daban 404
- Script ahora verifica disponibilidad de thumbnail antes de asignarlo

### Fallback visual en cards
- `cardCurso.svelte` y `cardResource.svelte`: `onerror` en imágenes + estado `imgError`
- Si una imagen falla al cargar, muestra el placeholder SVG en lugar del icono roto

### Paginación y filtros corregidos
- `cursos/+page.js`: ahora carga **todos** los cursos aprobados (sin paginación server-side)
- `cursos/+page.svelte`:
  - Reactividad arreglada con `$derived` en lugar de asignación directa
  - Filtros (categoría, nivel, precio, búsqueda) aplican sobre el total de cursos
  - Paginación 100% cliente con estado local (`paginaActual`), sin recargar
  - Navegación por página instantánea al cambiar filtros o página

## Bugs pendientes (NO RESUELTOS)

### PROBLEMA CRÍTICO: Admin no funciona en producción
- En local funciona correctamente
- En producción, al intentar acceder a /admin con sesión de admin, se queda en home
- **Causa probable**: Cookies de sesión de Supabase no se propagan correctamente en Cloudflare Pages
- **Intentos fallidos**:
  - Usar getUser() en lugar de getSession()
  - Agregar fallback de ADMIN_EMAIL
  - Renombrar a +page.server.js
  - Configurar cookies con partitioned y secure
  - Cambiar sameSite de 'lax' a 'strict'

### Error 406 en favoritos (producción)
- Múltiples errores 406 (Not Acceptable) en console al cargar favoritos
- No bloquea la funcionalidad pero llena la consola

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
- `ADMIN_EMAIL` (en Cloudflare Pages Settings)

## Archivos clave modificados

- `src/hooks.server.js` - Configuración de cookies para Supabase
- `src/routes/admin/+page.server.js` - Verificación de admin
- `src/routes/login/+layout.server.js` - Bloqueo de acceso con sesión
- `src/routes/login/+page.svelte` - Redirección post-login
- `src/lib/components/Navbar.svelte` - isAdmin con fallback
- `src/app.css` - CSS duplicado eliminado
- `src/routes/cursos/+page.js` - Carga todos los cursos, filtros server-side removidos
- `src/routes/cursos/+page.svelte` - Paginación y filtros 100% cliente con $derived
- `src/lib/components/cardCurso.svelte` - onerror handler para imágenes rotas
- `src/lib/components/cardResource.svelte` - onerror handler para imágenes rotas
- `scripts/import-content.mjs` - Script de scraping + importación a Supabase

## Siguientes tareas para la siguiente sesión

1. **Investigar y solucionar el problema del admin en producción**
   - Opciones: revisar config de cookies en Supabase, usar método alternativo de verificación

2. **Investigar error 406 en favoritos**

3. **Mejoras visuales (opcional)**
   - Loading states / skeleton loaders
   - Toast notifications

## Comandos útiles

```bash
pnpm dev                  # Desarrollo
pnpm build                # Build producción
pnpm lint                 # Verificar código
node scripts/import-content.mjs <archivo.json>  # Importar contenido
```