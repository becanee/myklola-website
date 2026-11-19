# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Bun is the package manager (`bun.lock`); the Dockerfile installs with `bun install`.

```bash
bun dev          # next dev — http://localhost:3000
bun build        # next build (standalone output)
bun start        # next start
npx tsc --noEmit # type check — the ONLY check that exists
```

**No lint script, no ESLint config, and `next.config.mjs` sets `typescript.ignoreBuildErrors: true`.** `next build` will not fail on type errors — run `npx tsc --noEmit` yourself before declaring work done. There is no test suite.

Docker: multi-stage, `oven/bun` install → `node:22-bookworm-slim` build → standalone runner on port 3000.

## Stack notes

- Next.js 16 App Router, React 19, TypeScript 7, Tailwind CSS v4.
- **Tailwind v4 is CSS-first: there is no `tailwind.config.ts`.** All design tokens live in [src/app/globals.css](src/app/globals.css) under `:root` (values) and `@theme inline` (mapping them to `--color-*`, `--font-*`, `--radius-*` utility namespaces). To add a color/font/radius token, add it to both blocks.
- shadcn/ui, `new-york` style, `@/components/ui`. `components.json` registers `@beui` → `https://beui.dev/r/{name}.json` as a component registry.
- `motion` v13, imported as `motion/react` (not `framer-motion`).

## Architecture

Two-tier composition. `src/app/**` holds routes only — thin files that assemble sections and export `metadata`. Real UI lives in `src/modules/**`, one folder per domain: `landing/` (one file per page section) and `contacts/`.

```
src/app/layout.tsx      fonts, site metadata, <html>/<body>
src/app/page.tsx        landing = Navigation + 6 sections + Footer
src/app/contact/page.tsx
src/app/not-found.tsx
src/app/{sitemap,robots,manifest}.ts   generated metadata routes

src/modules/landing/*   HeroSection, ServicesSection, ProductSections,
                        TeamSection, ClientsSection, CtaSection,
                        FooterSection, Navigation, AnimatedWave
src/modules/contacts/   index.tsx (page body), comp-form.tsx (RHF + zod form)

src/components/ui/      shadcn primitives (button, checkbox, label, textarea)
src/components/motion/  beUI-registry motion primitives (input, select-morph,
                        text-reveal) + motion/not-found/
src/lib/ease.ts         shared easing curves & spring configs
src/lib/hooks/          use-hover-capable
src/lib/utils.ts        cn()
```

Section components are client components (`"use client"`) and are referenced by name from pages. `Navigation` and `FooterSection` are reused across all three routes; each route renders its own `<Navigation />` and `<FooterSection />` rather than getting them from a layout.

### Animation conventions

Import named easing/spring tokens from [src/lib/ease.ts](src/lib/ease.ts) instead of inlining cubic-beziers or spring numbers — `EASE_OUT`, `EASE_IN_OUT`, `SPRING_PRESS`, `SPRING_PANEL`, `SPRING_LAYOUT`, etc.

- Gate hover-only effects behind `useHoverCapable()`; touch devices fire phantom sticky hovers.
- **Never branch `initial` on `useReducedMotion()`** — the server can't know the preference, so the two renders disagree and React logs a hydration mismatch. Keep `initial` static and collapse `duration`/`delay` to 0 instead (see `TextReveal` and the login form). The older `initial={prefersReduced ? false : {...}}` pattern in the landing sections is the same bug and worth fixing when touched.
- Scroll entrances use `whileInView` + `viewport={{ once: true }}`; staggered reveals in the contact module use a local `IntersectionObserver` `ScrollReveal` wrapper.
- CSS keyframe utilities (`.marquee`, `.line-reveal`, `.animate-char-in`, `.noise-overlay`, `.border-sketch`, `.text-stroke`) are defined in the `@layer utilities` block of `globals.css`.

### Design language

Editorial/print: Instrument Sans body, Instrument Serif display (`font-display` class), JetBrains Mono for eyebrows, indices and labels. Navy `#0B3464` on a near-white `oklch(0.985 0.002 90)` background; `--radius: 0.25rem` (deliberately sharp). Sections use numbered eyebrows, `max-w-[1400px]` containers, and `py-28 lg:py-36` rhythm. Landing copy is Indonesian; UI chrome and the contact page are English.

### Content & data

Page content is co-located as module-level `const` arrays inside each section file (`products`, `services`, `channels`, `navLinks`).

**The contact form has no backend.** `onSubmit` in [comp-form.tsx](src/modules/contacts/comp-form.tsx) validates with zod and sets a success state; a `ponytail:` comment marks where the submission call belongs. Keep those `ponytail:` markers — they name deliberate simplifications and their upgrade path.

### Postbase (backend)

Postbase is the self-hosted BaaS (`postbasejs`, Supabase-shaped API: `from()`, `auth`, `storage`, `rpc`). Two clients live in `src/services/postbase/`:

| File | Key | Use |
|---|---|---|
| [client.ts](src/services/postbase/client.ts) → `getPostbaseClient()` | `NEXT_PUBLIC_POSTBASE_ANON_KEY` | Browser-safe, RLS-enforced. Default choice. |
| [server.ts](src/services/postbase/server.ts) → `getPostbaseAdmin()` | `POSTBASE_SERVICE_KEY` | Server only, **bypasses RLS**. Guarded by `import "server-only"`. |

Both are lazy singletons — `createClient` starts a token-refresh timer, so a per-call client would schedule duplicate refreshes.

- `createClient(url, key, options)` — the third argument is an **options object** (`{ projectId }`), not a bare project ID. Passing a string is silently accepted and yields `projectId: ""`, which builds broken `/api/auth/v1//token` URLs.
- Env lives in `.env.local` (gitignored); `.env.example` documents the names. `POSTBASE_SERVICE_KEY` must never gain a `NEXT_PUBLIC_` prefix or be imported from a Client Component.
- `.dockerignore` keeps `.env*` out of the image — otherwise the service key ships inside it.
- Auth: `auth.signInWithPassword({ email, password, rememberMe })` returns `{ data: { user, session }, error }`. Wired up in [form.tsx](src/modules/auth/login/_comp/form.tsx).
- **Three clients, three jobs** — don't collapse them: `client.ts` (browser, anon key), `server.ts` (admin, service key), `server-session.ts` (per-request, anon key + cookie adapter, read-only `setAll`). The last one is what Server Components use to identify the user.

### Route protection (Proxy)

Next.js 16 renamed Middleware to Proxy. The guard is [src/proxy.ts](src/proxy.ts) exporting `proxy` (not `middleware`), with [src/routes.ts](src/routes.ts) as the single source of truth for `PUBLIC_ROUTES` / `PROTECTED_ROUTES`.

- Add new paths to `src/routes.ts` **before** creating them. Anything not listed is neither public nor protected — it simply passes through unguarded.
- `isProtectedRoute` is checked first, so public routes never pay for the `getSession()` network round-trip. Keep it that way; the proxy runs per-request.
- Matching is segment-aware: `/dash` covers `/dash` and `/dash/settings`, never `/dashx`.
- The `matcher` excludes `_next/static`, `_next/image`, favicon and image/video extensions. Without that, the proxy intercepts CSS/JS and redirects break the pages being guarded.
- **The cookie bridge is load-bearing.** The browser SDK keeps the refresh token in `localStorage` and cannot write an httpOnly cookie. On sign-in it POSTs the session to `/api/auth/callback` ([route.ts](src/app/api/auth/callback/route.ts)), which writes `postbase-session`. The proxy reads *only* that cookie — remove the callback route or `syncEndpoint` and every signed-in user is redirected straight back to `/login`.
- The proxy redirect is an optimistic check, not authorization. Server Components still call `getPostbaseSession()` and must verify inside Server Functions too — a matcher change can silently drop proxy coverage.

### SEO

`metadataBase` is `https://myklola.cloud`. Site name/description/keywords/OpenGraph live in `layout.tsx`; per-route titles use the `%s | Klola Indonesia` template. Adding a route means adding its URL to [src/app/sitemap.ts](src/app/sitemap.ts).

### Images

`next.config.mjs` sets `images.unoptimized: true`, so `next/image` gets no optimization pipeline — large JPEGs in `public/` ship at full size.