# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

# This Dockerfile is configured for Bun lockfile installs with a Node.js build
# For npm/pnpm or yarn, refer to the Dockerfile instead

FROM oven/bun:1 AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json bun.lock* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --no-save

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM node:22-bookworm-slim AS builder

# Set working directory
WORKDIR /app

# Ensure public dir exists in image even when empty/untracked
RUN mkdir -p public

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* is inlined into the browser bundle at BUILD time. Without it
# here, `process.env.NEXT_PUBLIC_POSTBASE_*` stays a runtime lookup in client
# code, resolves to undefined, and getPostbaseClient() throws the instant it is
# called — the login form dies before any request leaves the browser.
# Pass with `docker build --build-arg NEXT_PUBLIC_POSTBASE_URL=...`.
ARG NEXT_PUBLIC_POSTBASE_URL
ARG NEXT_PUBLIC_POSTBASE_ANON_KEY
ARG NEXT_PUBLIC_POSTBASE_PROJECT_ID
ENV NEXT_PUBLIC_POSTBASE_URL=$NEXT_PUBLIC_POSTBASE_URL
ENV NEXT_PUBLIC_POSTBASE_ANON_KEY=$NEXT_PUBLIC_POSTBASE_ANON_KEY
ENV NEXT_PUBLIC_POSTBASE_PROJECT_ID=$NEXT_PUBLIC_POSTBASE_PROJECT_ID

# Fail here rather than shipping a dead auth client.
RUN test -n "$NEXT_PUBLIC_POSTBASE_URL" \
 && test -n "$NEXT_PUBLIC_POSTBASE_ANON_KEY" \
 && test -n "$NEXT_PUBLIC_POSTBASE_PROJECT_ID" \
 || { echo "ERROR: missing NEXT_PUBLIC_POSTBASE_* build args"; exit 1; }

# Build Next.js application
RUN npx next build

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM node:22-bookworm-slim AS runner

# Set working directory
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the run time.
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy production assets
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# If you want to persist the fetch cache generated during the build so that
# cached responses are available immediately on startup, uncomment this line:
# COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER node

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Origin publik untuk URL share (set sesuai domain, mis. https://zipt.site)
# ENV APP_URL=

# Start Next.js standalone server
CMD ["node", "server.js"]