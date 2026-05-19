# Contexto para agentes - devRekursos

## Estado actual del proyecto

Proyecto SvelteKit con Supabase funcionando en producción (Cloudflare Pages).

## Ultimas mejoras aplicadas (18 Mayo 2026)

### Corrección de bugs de seguridad y CSS
- Email de admin ahora usa variable de entorno ADMIN_EMAIL con fallback
- CSS duplicado eliminado en app.css
- Typo corregido en submit: `gray800` → `gray-800`

### Mejoras en autenticación
- Login ahora redirige correctamente al home después de iniciar sesión
- Si el usuario ya tiene sesión, al acceder a /login redirige a /
- Verificación de admin usa getUser() en lugar de getSession()

### Cambios en estructura
- `admin/+page.js` renombrado a `admin/+page.server.js` para acceso a locals
- `login/+layout.server.js` creado para bloquear acceso cuando hay sesión
- Cookies configuradas con `partitioned` para producción

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

## Siguientes tareas para la siguiente sesión

1. **Investigar y solucionar el problema del admin en producción**
   - Opciones: revisar config de cookies en Supabase, usar método alternativo de verificación
   - Alternativa: trabajar solo en local temporalmente

2. **Investigar error 406 en favoritos**

3. ** Mejoras visuales (opcional)**
   - Loading states / skeleton loaders
   - Toast notifications

## Comandos útiles

```bash
pnpm dev        # Desarrollo
pnpm build      # Build producción
pnpm lint       # Verificar código
```