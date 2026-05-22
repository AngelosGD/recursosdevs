# devRekursos

Directorio de recursos para desarrolladores - una colección curada de herramientas, cursos, tutoriales y videos de programación.

## Stack

- **Framework**: SvelteKit 2.x + Svelte 5 (Runes)
- **Estilos**: Tailwind CSS 4
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Despliegue**: Cloudflare Pages

## Estructura

```
src/
├── lib/
│   ├── components/     # Componentes reutilizables
│   │   ├── cardResource.svelte
│   │   ├── cardCurso.svelte
│   │   ├── Navbar.svelte
│   │   ├── Footer.svelte
│   │   └── ...
│   ├── sanitizer.js    # Funciones de sanitización
│   ├── supabase.js     # Cliente Supabase
│   └── theme.js        # Estado del tema
├── routes/
│   ├── +page.svelte           # Home (recursos)
│   ├── cursos/               # Cursos
│   ├── videos/               # Videos
│   ├── submit/               # Sugerir recurso/curso/video
│   ├── login/                # Login/Registro
│   ├── favoritos/            # Favoritos (requiere auth)
│   ├── admin/                # Panel admin
│   └── ...
└── hooks.server.js           # Middleware autenticación
```

## Variables de entorno

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
ADMIN_EMAIL=tu-email@gmail.com
```

## Scripts

```bash
pnpm dev          # Desarrollo
pnpm build        # Producción
pnpm preview      # Previsualizar build
pnpm lint         # Verificar código
pnpm format       # Formatear código
node scripts/import-content.mjs # Importar contenido desde JSON
```

## Base de datos

Tablas principales (ver `src/lib/sql-queries.sql`):
- `recursos` - Recursos diversos
- `cursos` - Cursos de programación
- `videos` - Videos de conceptos/tips
- `favoritos` / `cursos_favoritos` / `videos_favoritos` - Favoritos por usuario
- `reportes` - Reportes de recursos
- `contacto` - Mensajes de contacto

## Características

- Filtros por categoría, nivel e idioma (barra lateral)
- Sistema de favoritos para usuarios registrados
- Panel de administración para aprobar/gestionar contenido
- Tema claro/oscuro
- Diseño responsive (mobile-first)

## Notas para desarrollo

- El admin está protegido por email en variable de entorno ADMIN_EMAIL
- Los inputs se sanitizan en cliente con `src/lib/sanitizer.js`
- Rutas `/favoritos` y `/admin` requieren autenticación