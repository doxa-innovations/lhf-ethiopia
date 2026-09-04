FROM node:24.20.0-alpine3.24 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24.20.0-alpine3.24 AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# ENABLE_ADMIN is intentionally non-secret. Setting it at build time ensures
# the full CMS/admin server bundle is present; database/auth secrets remain
# runtime-only and are never baked into the image.
ARG ENABLE_ADMIN=true
ENV ENABLE_ADMIN=${ENABLE_ADMIN}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.20.0-alpine3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    ENABLE_ADMIN=true

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

RUN mkdir -p /app/public/uploads && chown -R node:node /app/public/uploads
USER node
EXPOSE 3000
CMD ["node", "server.js"]
