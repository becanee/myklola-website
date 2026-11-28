# syntax=docker/dockerfile:1

# Next.js standalone image, sized for Dokploy.
#
# Three stages, and the runtime stage carries only the standalone server plus
# the modules Next traced into it — no devDependencies, no source, no build
# tools. No build args are required: GATEWAY_URL / PROJECT_ID /
# GATEWAY_API_KEY are read inside the route handlers at request time, so one
# image runs in every environment and the build never sees a secret.

# ---- dependencies ----------------------------------------------------------
FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --no-save

# ---- build -----------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx next build

# ---- runtime ---------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

# PORT is honoured by the standalone server. HOSTNAME must be 0.0.0.0 or the
# container listens on loopback only and the reverse proxy cannot reach it.
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Every copy is node-owned, so no chown or root step is needed at runtime.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# Actionable readiness probe. Docker's HEALTHCHECK does not expand ${PORT} in
# the shell-free CMD form, so the port is written literally — if you change
# PORT above, change it here too.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]