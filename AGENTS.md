# AGENTS.md

## Stack

SvelteKit 2.x + Svelte 5 (Runes) + Tailwind CSS 4 + Supabase + Cloudflare Pages.  
Package manager: **pnpm** (`engine-strict=true`). Not a monorepo.

## Commands

```bash
pnpm dev                  # Vite dev server
pnpm build                # Production build (Cloudflare Pages)
pnpm lint                 # prettier --check . && eslint .
pnpm format               # prettier --write .
```

Run `pnpm lint` before committing. No test suite exists.

## Code style (non-default)

Prettier config (`.prettierrc`): **tabs**, single quotes, no trailing commas, 100 char width.  
Svelte files use `parser: "svelte"` override. Respect existing style—no semicolons, no extra comments.

## Svelte 5 Runes

Runes mode is forced project-wide in `svelte.config.js` (`compilerOptions.runes`).  
Use `$state`, `$derived`, `$effect`—not Svelte 4 reactive syntax (`$:`).  
No TypeScript—project uses JS with `jsconfig.json` extending SvelteKit's generated tsconfig.

## Environment variables

Required in `.env` (see `.env.example`):
- `PUBLIC_SUPABASE_URL` — Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `ADMIN_EMAIL` — Email for admin access (also set in `wrangler.toml` for prod)

`ADMIN_EMAIL` is injected into client via `vite.config.js` `define` (`process.env.ADMIN_EMAIL`).

## Auth & Admin (critical context)

- `src/hooks.server.js` creates Supabase server client, sets cookies, exposes `getSession`, `getUser`, `isAdmin`, `setAdminCookie` on `locals`.
- Admin check: `src/routes/admin/+layout.server.js` calls `getUser()`, compares `user.email` against `platform?.env?.ADMIN_EMAIL || fallback`. Sets `is_admin` cookie on success.
- `+layout.server.js` at root reads `is_admin` cookie to pass `isAdmin` to all layouts.
- **KNOWN BUG**: Admin auth works locally but fails in Cloudflare Pages production. Cookie propagation issue suspected. Multiple approaches tried—avoid re-attempting same fixes without investigation.

## Database (Supabase)

Tables: `recursos`, `cursos`, `videos`, `favoritos`, `cursos_favoritos`, `videos_favoritos`, `reportes`, `contacto`.  
Schema reference: `src/lib/sql-queries.sql`.

`videos` has `idioma` column for language filtering (added Jun 2026).

## Key files

- `src/hooks.server.js` — Server middleware, Supabase client setup, cookie config
- `src/lib/supabase.js` — Browser Supabase client (custom cookie handling)
- `src/lib/sanitizer.js` — Input sanitization (client-side)
- `src/routes/admin/` — Admin panel (protected by email check)
- `src/routes/cursos/+page.svelte` — Client-side filtering/pagination with `$derived`
- `src/routes/videos/+page.svelte` — Videos with category + language filters
- `src/lib/components/cardCurso.svelte`, `cardResource.svelte` — Image `onerror` fallback to placeholder

## Known issues

- **Admin in production**: Redirects to home despite valid session. Cookie-related. See `src/hooks.server.js` and `src/routes/admin/+layout.server.js`.
- **406 errors on favorites**: Console noise in production, non-blocking.

## Scripts (local only, not in git)

`scripts/` is gitignored. Contains `import-content.mjs` for scraping URLs and importing to Supabase.  
Usage: `node scripts/import-content.mjs <file.json>` (requires `.env` with Supabase credentials).
