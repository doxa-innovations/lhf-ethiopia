# LHF Ethiopia — VPS deployment runbook

The full stack (Next.js + Payload admin + Postgres + Caddy) runs as one
Docker Compose project on a single Linux VPS.

## 1. Provision the VPS

- Provider: **Hetzner CX22** (€4/mo) in **Frankfurt** for best latency to
  Ethiopia. DigitalOcean / Linode equivalents work too — 1 GB RAM minimum.
- Image: **Ubuntu 24.04 LTS**.
- Add your SSH public key during creation. Open inbound ports **22, 80,
  443**; close everything else (`ufw allow OpenSSH; ufw allow 80,443/tcp;
  ufw enable`).

```bash
ssh root@<vps-ip>
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
apt install -y docker-compose-plugin git ufw rclone
ufw allow OpenSSH && ufw allow 80,443/tcp && ufw --force enable
```

## 2. DNS

Point an A-record at the VPS public IP:
- `ethiopia.lhfmissions.org → <vps-ip>` (production)
- Until that's confirmed with the parent LHF org, use a temporary
  hostname like `lhf-ethiopia.your-domain.example`.

Caddy auto-issues TLS once the A-record resolves to the VPS IP.

## 3. Clone repo + configure

```bash
mkdir -p /opt && cd /opt
git clone https://github.com/doxa-innovations/lhf-ethiopia.git
cd lhf-ethiopia

cp .env.example .env.production
```

Fill `.env.production` with real values:

```env
NEXT_PUBLIC_SERVER_URL=https://ethiopia.lhfmissions.org

# 32-byte random — generate with `openssl rand -base64 32`
PAYLOAD_SECRET=...

# Container-local Postgres (recommended); the compose db service uses these.
DATABASE_URI=postgres://payload:CHANGE_ME@db:5432/payload
POSTGRES_USER=payload
POSTGRES_PASSWORD=CHANGE_ME            # match the DATABASE_URI
POSTGRES_DB=payload

# Cloudflare R2 (required for production media uploads)
R2_BUCKET=lhf-ethiopia-media
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_REGION=auto
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_PUBLIC_URL=https://media.lhfethiopia.org   # or the direct R2 URL
```

## 4. Edit the Caddyfile

Replace the domain in `Caddyfile` with your actual hostname.

## 5. First run

```bash
docker compose up -d --build
docker compose logs -f app          # watch the first boot
```

The `app` container will:
1. Connect to `db` (waits for `pg_isready` healthcheck).
2. Run Payload schema push on first boot — collections + locales + globals
   get created automatically.
3. Serve `/` (public site) and `/admin` (Payload admin).

## 6. Seed the database

```bash
docker compose exec app npm run seed
```

This populates Languages, Publications, Projects, Events, News, Values,
Stories, Podcast Episodes, and the SiteSettings global with the content
from `src/content/{en,am,om}.json` — all three locales in one go.

## 7. Create the first admin user

Visit `https://<your-domain>/admin` — Payload will show the
"Create First User" form. Fill in name + email + password. After that
user is created, set their `role` to `admin` (only admins can create
more users from the UI).

## 8. Smoke test

- Log in to `/admin`, edit a News doc.
- Toggle the locale dropdown (top of the form) — confirm the Amharic
  `body` field has the Amharic text from the seed.
- Visit the public page for that doc, switch the site language to
  Afaan Oromoo, confirm content updates.

## 9. Nightly backups

```bash
crontab -e
# Add:
0 2 * * * /opt/lhf-ethiopia/scripts/backup-db.sh >> /var/log/lhf-backup.log 2>&1
```

R2 lifecycle rule: delete objects older than 30 days. Test restores
quarterly:
```bash
docker compose exec -T db psql -U payload payload < <(gunzip < latest.sql.gz)
```

## 10. Deploying new code

```bash
ssh root@<vps-ip>
cd /opt/lhf-ethiopia
git pull
docker compose up -d --build app    # rebuild + restart only `app`
```

Schema changes auto-apply on `app` startup. Content (collections/docs) is
preserved across rebuilds because it's in the `db` volume.

## Common runbook

| Task | Command |
|---|---|
| Tail app logs | `docker compose logs -f app` |
| Restart everything | `docker compose restart` |
| Wipe the DB (destructive) | `docker compose exec app npm run migrate:fresh` then `npm run seed` |
| Add a user | Log in as admin → Site → Users → Create |
| Rotate `PAYLOAD_SECRET` | Update `.env.production`, restart `app` — all existing admin sessions invalidate |
| Recover from a bad deploy | `git reset --hard HEAD~1 && docker compose up -d --build app` |
