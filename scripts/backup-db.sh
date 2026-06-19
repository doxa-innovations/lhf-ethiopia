#!/usr/bin/env bash
# Nightly Postgres dump → Cloudflare R2 via rclone.
#
# Setup on the VPS:
#   1. Install rclone: `curl https://rclone.org/install.sh | sudo bash`
#   2. Configure R2 remote: `rclone config` → new → Amazon S3 →
#      provider Cloudflare R2 → fill access key + secret + endpoint
#   3. Drop this script in /root/lhf/backup-db.sh, chmod +x.
#   4. Cron: `0 2 * * * /root/lhf/backup-db.sh >> /var/log/lhf-backup.log 2>&1`
#   5. Lifecycle rule on the R2 bucket: delete after 30 days.

set -euo pipefail

BUCKET="${R2_BACKUP_BUCKET:-lhf-ethiopia-backups}"
TS="$(date -u +%Y%m%dT%H%M%SZ)"
NAME="lhf-${TS}.sql.gz"
TMP="/tmp/${NAME}"

cd "$(dirname "$0")/.."

# Dump from the compose stack's `db` service.
docker compose exec -T db pg_dump -U "${POSTGRES_USER:-payload}" "${POSTGRES_DB:-payload}" \
  | gzip > "${TMP}"

rclone copy "${TMP}" "r2:${BUCKET}/" --quiet
rm -f "${TMP}"

echo "[$(date -u)] Uploaded ${NAME} to r2:${BUCKET}/"
