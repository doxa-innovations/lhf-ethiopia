# LHF Ethiopia — deploy runbook

Two modes:

- **Frontend-only** *(current ship target)* — `ENABLE_ADMIN` unset. The
  public marketing site renders the baked-in `defaultValue` for every
  `<EditableText>`. No Postgres, no auth, no admin UI. This is what you
  deploy to Yegara today while the CMS work continues locally.
- **Full** — `ENABLE_ADMIN=true` plus `DATABASE_URL` + `AUTH_SECRET`.
  Adds `/admin` and `/admin/edit/*`, NextAuth, edit-in-place CMS,
  publish workflow.

You can flip from one to the other by changing env vars — no code
changes needed.

---

## Frontend-only on Yegara

### 1. Provision

- One small Linux VM on Yegara (≥ 1 GB RAM, ≥ 1 vCPU is fine for a
  marketing site).
- Ubuntu 22.04 or 24.04 LTS.
- Open inbound: `22, 80, 443`.
- A-record: `lhfethiopia.org → <vm-ip>` (root) **and**
  `www.lhfethiopia.org → <vm-ip>` (so both resolve). The nginx config
  below redirects www → apex.

### 2. Install runtime

```bash
ssh ubuntu@<vm-ip>
sudo apt update && sudo apt -y upgrade

# Node 20 LTS (matches engines in package.json — Node 22/24 also OK)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt -y install nodejs git nginx

# pm2 to keep `next start` alive across reboots and crashes
sudo npm i -g pm2
```

### 3. Clone + build

```bash
sudo mkdir -p /srv && sudo chown ubuntu:ubuntu /srv
cd /srv
git clone https://github.com/doxa-innovations/lhf-ethiopia.git
cd lhf-ethiopia
npm ci

# Frontend-only env — no DB, no auth.
cat > .env.production <<'EOF'
NODE_ENV=production
# Leave ENABLE_ADMIN unset — admin routes will 404.
# NEXT_PUBLIC_SERVER_URL only matters if you generate canonical links.
NEXT_PUBLIC_SERVER_URL=https://lhfethiopia.org
EOF

npm run build
```

### 4. Run

```bash
pm2 start "npm run start -- --port 3000" --name lhf-ethiopia
pm2 save
pm2 startup systemd            # follow the printed command to enable on boot
```

### 5. Reverse proxy + TLS

```nginx
# /etc/nginx/sites-available/lhf-ethiopia
server {
  listen 80;
  server_name www.lhfethiopia.org;
  return 301 https://lhfethiopia.org$request_uri;
}

server {
  listen 80;
  server_name lhfethiopia.org;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/lhf-ethiopia /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# TLS — both names so the www→apex redirect can run over HTTPS too
sudo apt -y install certbot python3-certbot-nginx
sudo certbot --nginx -d lhfethiopia.org -d www.lhfethiopia.org
```

### 6. Smoke test

```bash
curl -I https://lhfethiopia.org/             # 200
curl -I https://lhfethiopia.org/about        # 200
curl -I https://lhfethiopia.org/podcast      # 200
curl -I https://lhfethiopia.org/admin        # 404 ← gated
curl -I https://lhfethiopia.org/admin/login  # 404 ← gated
curl -I https://lhfethiopia.org/api/auth/csrf # 404 ← gated
```

### 7. Updating

```bash
cd /srv/lhf-ethiopia
git pull
npm ci
npm run build
pm2 restart lhf-ethiopia
```

---

## Flipping on the admin later

When the CMS work is ready:

1. Provision Postgres (on the same VM, on the Doxa Postgres host, or
   keep using Neon temporarily).
2. Generate a real auth secret: `openssl rand -base64 32`.
3. Append to `.env.production`:
   ```env
   ENABLE_ADMIN=true
   DATABASE_URL=postgres://user:pass@host:5432/lhf
   AUTH_SECRET=<the openssl-generated value>
   NEXTAUTH_URL=https://lhfethiopia.org
   ```
4. `npm run db:push` (creates `users`, `cms_elements`, `media` tables).
5. `npm run seed` (creates the admin user + ~750 microcopy rows).
6. **Rotate the seeded admin password immediately** — log in at
   `/admin/login` with `admin@lhfethiopia.org / ChangeMe!2026`, then
   change it at `/admin/account`.
7. `npm run build && pm2 restart lhf-ethiopia`.

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
