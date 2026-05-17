# Contexto para agentes - devRekursos

## Estado actual del proyecto

Proyecto SvelteKit con Supabase funcionando en producción (Cloudflare Pages).

## Ultimas mejoras aplicadas

1. **Navbar modernizado** - Diseño con backdrop-blur, nuevo logo,添加 opción Videos
2. **Nueva página /videos** - Listado de videos con filtros y thumbnails de YouTube
3. **Formulario submit actualizado** - Ahora permite sugerir recursos, cursos y videos
4. **Panel admin expandido** - Gestión de videos junto a recursos y cursos
5. **Favicon personalizado** - Logo "dr" en azul
6. **Seguridad** - Sanitización de inputs (`src/lib/sanitizer.js`), protección de rutas con variable de entorno ADMIN_EMAIL
7. **Filtros avanzados** - Barra lateral con filtros por categoría, nivel e idioma (recursos/cursos)

## Base de datos

Tablas creadas en Supabase:
- `recursos` - Recursos (sitios, herramientas, guías)
- `cursos` - Cursos
- `videos` - Videos (YouTube principalmente)
- `favoritos`, `cursos_favoritos`, `videos_favoritos` - Favoritos por usuario
- `reportes`, `contacto` - Reportes y mensajes

## Variables de entorno requeridas

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL` (en Cloudflare vars)

## Siguientes mejoras sugeridas

1. Loading states / skeleton loaders
2. Toast notifications
3. Scroll infinito (reemplazar paginación)
4. Favoritos de cursos/videos en página dedicada
5. Búsqueda avanzada
6. Perfil de usuario
7. Optimización SEO (meta tags, sitemap)

## Comandos útiles

```bash
pnpm dev        # Desarrollo
pnpm build      # Build producción
pnpm lint       # Verificar código
```