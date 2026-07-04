#!/usr/bin/env bash
# Nightly Postgres dump → Cloudflare R2 via rclone.
#
# NOTE: on Dokploy, prefer the built-in scheduled database backups
# (Database → Backups → S3 destination pointed at R2). This script is the
# fallback for a standalone Postgres container on a plain Docker host,
# if you'd rather manage backups yourself.
#
# Setup on the host:
#   1. Install rclone: `curl https://rclone.org/install.sh | sudo bash`
#   2. Configure R2 remote: `rclone config` → new → Amazon S3 →
#      provider Cloudflare R2 → fill access key + secret + endpoint
#   3. Drop this script in /root/lhf/backup-db.sh, chmod +x.
#   4. Cron: `0 2 * * * DB_CONTAINER=<name> /root/lhf/backup-db.sh >> /var/log/lhf-backup.log 2>&1`
#   5. Lifecycle rule on the R2 bucket: delete after 30 days.

set -euo pipefail

BUCKET="${R2_BACKUP_BUCKET:-lhf-ethiopia-backups}"
TS="$(date -u +%Y%m%dT%H%M%SZ)"
NAME="lhf-${TS}.sql.gz"
TMP="/tmp/${NAME}"

# The database runs as a standalone container, detached from the app stack.
# Find its name with: docker ps --format '{{.Names}}' | grep -i postgres
DB_CONTAINER="${DB_CONTAINER:?Set DB_CONTAINER to the Postgres container name}"

docker exec -i "${DB_CONTAINER}" pg_dump -U "${POSTGRES_USER:-lhf}" "${POSTGRES_DB:-lhf}" \
  | gzip > "${TMP}"

rclone copy "${TMP}" "r2:${BUCKET}/" --quiet
rm -f "${TMP}"

echo "[$(date -u)] Uploaded ${NAME} to r2:${BUCKET}/"
