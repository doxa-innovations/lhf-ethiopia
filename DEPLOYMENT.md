# LHF Ethiopia — deploy runbook

Two modes:

- **Frontend-only** *(current ship target)* — `ENABLE_ADMIN` unset. The
  public marketing site renders the baked-in `defaultValue` for every
  `<EditableText>`. No Postgres, no auth, no admin UI. This is what
  ships on Vercel today while the CMS work continues locally.
- **Full** — `ENABLE_ADMIN=true` plus `DATABASE_URL` + `AUTH_SECRET`.
  Adds `/admin` and `/admin/edit/*`, NextAuth, edit-in-place CMS,
  publish workflow.

You can flip from one to the other by changing env vars — no code
changes needed.

---

## Full mode on Dokploy (database detached from the app)

Two **separate native Dokploy services** — no docker-compose, no
Dockerfile. The repo intentionally ships neither: this is a standard
Next.js app, so Dokploy's builders (Nixpacks / Railpack) build it from
`package.json` alone. Postgres is a standalone service with its own
volume and lifecycle — redeploy, rebuild, or delete the app without
touching the data. The only link between the two is the `DATABASE_URL`
env var.

### 1. Database service

In your project: *Create Service → Database → PostgreSQL* (16.x).
Set database/user to `lhf`, generate a strong password. Dokploy manages
the volume and shows an **Internal Connection URL** — copy it for
step 2.

Leave the database internal-only (no External Port) — the app reaches
Postgres over Dokploy's internal Docker network. For remote
psql/pgAdmin, use an SSH tunnel, or temporarily enable an External Port
with IP allowlisting.

### 2. Application service (builder, not Dockerfile)

*Create Service → Application*, source = this Git repo, branch `main`.
Build type: **Nixpacks** (Dokploy's default; Railpack works the same
way). The builder auto-detects Next.js and respects
`"engines": { "node": ">=20.9.0" }` from `package.json`:

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start`

Environment tab — set these **before the first build** (Next.js inlines
`NEXT_PUBLIC_*` at build time, so changing it later needs a rebuild):

```env
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://lhfethiopia.org
ENABLE_ADMIN=true
DATABASE_URL=<Internal Connection URL from step 1>
AUTH_SECRET=<openssl rand -base64 32>
NEXTAUTH_URL=https://lhfethiopia.org
```

Domains tab: add `lhfethiopia.org` (container port 3000, HTTPS on).
Dokploy's Traefik terminates TLS — no Caddy or nginx needed.

**Uploads volume**: admin image uploads are written to
`public/uploads/cms/` at runtime. Add a volume mount in the app's
*Advanced → Volumes*: volume name `lhf-uploads`, mount path
`/app/public/uploads`. Without it, uploaded media disappears on every
redeploy. (Nothing in the repo ships inside `public/uploads/`, so the
mount shadows nothing.)

### 3. Schema + seed (first deploy only)

From a machine that can reach the DB (SSH tunnel or temporary External
Port):

```bash
DATABASE_URL=postgres://lhf:<password>@<host>:5432/lhf npm run db:push
DATABASE_URL=postgres://lhf:<password>@<host>:5432/lhf npm run seed
```

Then rotate the seeded admin password immediately (see step 6 in
"Flipping on the admin later" below).

### 4. Backups

Use Dokploy's scheduled database backups (*Database → Backups*, S3
destination — works with Cloudflare R2). `scripts/backup-db.sh` remains
as a cron fallback for a plain Docker host: it dumps any standalone
Postgres container by name (`DB_CONTAINER=<name>`) and uploads to R2
via rclone.

---

## Frontend-only on Dokploy (or Vercel)

Same application service as "Full mode" step 2, minus the database:
leave `ENABLE_ADMIN`, `DATABASE_URL`, and `AUTH_SECRET` unset. Admin
routes 404 and the site renders the checked-in content. Vercel works
identically — import the repo, set `NEXT_PUBLIC_SERVER_URL`, deploy.

Smoke test either way:

```bash
curl -I https://lhfethiopia.org/             # 200
curl -I https://lhfethiopia.org/about        # 200
curl -I https://lhfethiopia.org/podcast      # 200
curl -I https://lhfethiopia.org/admin        # 404 ← gated
curl -I https://lhfethiopia.org/admin/login  # 404 ← gated
curl -I https://lhfethiopia.org/api/auth/csrf # 404 ← gated
```

---

## Flipping on the admin later

When the CMS work is ready:

1. Create the standalone Postgres database service in Dokploy
   (see "Full mode on Dokploy" step 1), or keep using Neon
   temporarily.
2. Generate a real auth secret: `openssl rand -base64 32`.
3. Add to the app's Environment tab:
   ```env
   ENABLE_ADMIN=true
   DATABASE_URL=<Internal Connection URL from the database service>
   AUTH_SECRET=<the openssl-generated value>
   NEXTAUTH_URL=https://lhfethiopia.org
   ```
4. `npm run db:push` (creates `users`, `cms_elements`, `media` tables).
5. `npm run seed` (creates the admin user + ~750 microcopy rows).
6. **Rotate the seeded admin password immediately** — log in at
   `/admin/login` with `admin@lhfethiopia.org / ChangeMe!2026`, then
   change it at `/admin/account`.
7. Redeploy the application in Dokploy (env changes need a rebuild
   so Next.js picks them up).

---

## Local development with admin on

```bash
# .env.local
DATABASE_URL=postgres://...   # Neon or local Postgres
AUTH_SECRET=dev-only-auth-secret-replace-in-prod-please-32-chars-min
ENABLE_ADMIN=true
```

Then `npm run dev`. `/admin` and `/admin/edit/<page>` light up.

Without `ENABLE_ADMIN=true`, the dev server behaves like the
frontend-only deploy and admin routes 404 locally too — useful for
double-checking the prod shape.
