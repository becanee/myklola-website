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

Docker: multi-stage, `oven/bun` install → `node:22-bookworm-slim` build → standalone runner on port 3000. `.dockerignore` excludes `*.md` and `.env*` (except `.env.example`), so the image never carries local secrets.

## Stack notes

- Next.js 16 App Router, React 19, TypeScript 7, Tailwind CSS v4.
- **Tailwind v4 is CSS-first: there is no `tailwind.config.ts`.** All design tokens live in [src/app/globals.css](src/app/globals.css) under `:root` (values) and `@theme inline` (mapping them to `--color-*`, `--font-*`, `--radius-*` utility namespaces). To add a color/font/radius token, add it to both blocks.
- shadcn/ui, `new-york` style, `@/components/ui`. `components.json` registers `@beui` → `https://beui.dev/r/{name}.json` as a component registry.
- `motion` v14, imported as `motion/react` (not `framer-motion`).
- Forms use `react-hook-form` + `zodResolver`; the beUI `Input` primitive is controlled via `value` / `onChange(value: string)`, not RHF `register`.

## Architecture

Two-tier composition. `src/app/**` holds routes only — thin files that assemble sections and export `metadata`. Real UI lives in `src/modules/**`, one folder per domain: `landing/` (one file per page section), `contacts/`, and `auth/`.

```
src/app/layout.tsx      fonts, site metadata, <html>/<body>
src/app/page.tsx        landing = Navigation + 6 sections + Footer
src/app/contact/page.tsx
src/app/login/page.tsx  auth/login module (split banner + form)
src/app/dash/page.tsx   protected placeholder; noindex
src/app/not-found.tsx
src/app/{sitemap,robots,manifest}.ts   generated metadata routes

src/modules/landing/*   HeroSection, ServicesSection, ProductSections,
                        TeamSection, ClientsSection, CtaSection,
                        FooterSection, Navigation, AnimatedWave
src/modules/contacts/   index.tsx (page body), comp-form.tsx (RHF + zod form)
src/modules/auth/login/ index.tsx (split layout), _comp/{banner,form}.tsx,
                        _logic.tsx (loginUser + useLogin)
src/modules/auth/_comp/ logout-button.tsx

src/components/ui/      shadcn primitives (button, checkbox, label, textarea)
src/components/motion/  beUI-registry motion primitives (input, select-morph,
                        text-reveal) + motion/not-found/
src/lib/ease.ts         shared easing curves & spring configs
src/lib/hooks/          use-hover-capable
src/lib/utils.ts        cn()
```

Section components are client components (`"use client"`) and are referenced by name from pages. `Navigation` and `FooterSection` are reused across the landing, contact, and not-found routes; each route renders its own `<Navigation />` and `<FooterSection />` rather than getting them from a layout. `/login` and `/dash` intentionally do not use them.

### Animation conventions

Import named easing/spring tokens from [src/lib/ease.ts](src/lib/ease.ts) instead of inlining cubic-beziers or spring numbers — `EASE_OUT`, `EASE_IN_OUT`, `SPRING_PRESS`, `SPRING_PANEL`, `SPRING_LAYOUT`, etc.

- Gate hover-only effects behind `useHoverCapable()`; touch devices fire phantom sticky hovers.
- **Never branch `initial` on `useReducedMotion()`** — the server can't know the preference, so the two renders disagree and React logs a hydration mismatch. Keep `initial` static and collapse `duration`/`delay` to 0 instead (see `TextReveal`, the login form, and the login banner). The older `initial={prefersReduced ? false : {...}}` pattern in the landing sections is the same bug and worth fixing when touched.
- Scroll entrances use `whileInView` + `viewport={{ once: true }}`; staggered reveals in the contact module use a local `IntersectionObserver` `ScrollReveal` wrapper.
- CSS keyframe utilities (`.marquee`, `.line-reveal`, `.animate-char-in`, `.noise-overlay`, `.border-sketch`, `.text-stroke`) are defined in the `@layer utilities` block of `globals.css`.

### Design language

Editorial/print: Instrument Sans body, Instrument Serif display (`font-display` class), JetBrains Mono for eyebrows, indices and labels. Navy `#0B3464` on a near-white `oklch(0.985 0.002 90)` background; `--radius: 0.25rem` (deliberately sharp). Sections use numbered eyebrows, `max-w-[1400px]` containers, and `py-28 lg:py-36` rhythm. Landing copy is Indonesian; UI chrome and the contact page are English.

### Content & data

Page content is co-located as module-level `const` arrays inside each section file (`products`, `services`, `channels`, `navLinks`).

**The contact form has no backend.** `onSubmit` in [comp-form.tsx](src/modules/contacts/comp-form.tsx) validates with zod and sets a success state; a `ponytail:` comment marks where the submission call belongs. Keep those `ponytail:` markers — they name deliberate simplifications and their upgrade path.

### Auth & API routes

Next.js sits between the browser and the Klola gateway: tokens are written to httpOnly cookies by our own route handlers and **never** reach client JavaScript.

| Route | Purpose |
|---|---|
| [POST /api/v1/login](src/app/api/v1/login/route.ts) | Forwards credentials to `{GATEWAY_URL}/{PROJECT_ID}/token`, sets the three cookies. |
| [GET /api/v1/session](src/app/api/v1/session/route.ts) | Forwards the refresh token to `.../session`, reissues rotated cookies. Returns 401 when the gateway answers `{session: null}`. |
| [POST /api/v1/logout](src/app/api/v1/logout/route.ts) | Best-effort gateway revocation, then clears all three cookies. Never blocks sign-out on a gateway failure. |

- All `/api/v1` responses go through `success()` / `failed()` in [responseWrapper.ts](src/lib/responseWrapper.ts) — one envelope (`success`, `httpCode`, `author`, `message`, `data`). Never hand-roll `NextResponse.json`, and never return tokens in the body.
- Cookie names live in [auth-cookies.ts](src/lib/auth-cookies.ts): `__klola_access_token`, `__klola_refresh_token`, `__klola_user`. Route and proxy both import from there so they cannot drift.
- Env is server-only: `GATEWAY_URL`, `PROJECT_ID`, `GATEWAY_API_KEY` have **no** `NEXT_PUBLIC_` prefix, so `next build` needs none of them and a Docker image without build args still works. Set them at container runtime; [.env.example](.env.example) documents the names.
- The gateway requires `Authorization: Bearer $GATEWAY_API_KEY`; without it every call returns `401 {"error":"Missing API key"}`. A gateway `401` therefore means *our key is bad* (a 500 to the user), never *wrong password* — the login route maps `400` → "Invalid email or password", `429` → rate limited, `5xx` → unavailable.
- The `/session` endpoint does **not** return `refreshTokenExpiresAt` (login does). The session route decodes the refresh JWT's `exp` claim instead — otherwise the refresh cookie degrades to a session cookie on every check.
- "Keep me signed in" is expressed purely as cookie `maxAge`: unchecked omits it, producing session cookies. Both routes must agree on `path`/`secure`/`sameSite` or the browser stores a duplicate cookie instead of replacing it.
- Client side: [\_logic.tsx](src/modules/auth/login/_logic.tsx) exports `loginUser()` and `useLogin()`. `loginUser` never throws for expected failures; it returns a discriminated `LoginResult`. The form, not the hook, owns post-login navigation.

### Route protection (Proxy)

Next.js 16 renamed Middleware to Proxy. The guard is [src/proxy.ts](src/proxy.ts) exporting `proxy` (not `middleware`), with [src/routes.ts](src/routes.ts) as the single source of truth for `PUBLIC_ROUTES` / `PROTECTED_ROUTES`.

- Add new paths to `src/routes.ts` **before** creating them. Anything not listed is neither public nor protected — it simply passes through unguarded.
- `isProtectedRoute` is checked first, so public routes never run the session check. Keep it that way; the proxy runs per-request.
- Matching is segment-aware: `/dash` covers `/dash` and `/dash/settings`, never `/dashx`.
- **`/api` is excluded from the matcher.** The proxy calls `/api/v1/session` itself; matching it would recurse until the request dies. Protected pages never live under `/api`.
- The proxy verifies by calling that session route with the incoming `Cookie` header and forwards the rotated `Set-Cookie` onto its own response — skip that and the browser keeps a refresh token the gateway already rotated away.
- A gateway error fails **closed** (redirect to `/login`), never open.
- The redirect is a UX gate, not authorization. When a page starts reading sensitive data, verify again in the Server Component or Server Function — a matcher change silently drops proxy coverage.

### SEO

`metadataBase` is `https://myklola.cloud`. Site name/description/keywords/OpenGraph live in `layout.tsx`; per-route titles use the `%s | Klola Indonesia` template. Adding a public route means adding its URL to [src/app/sitemap.ts](src/app/sitemap.ts) — `/login` and `/dash` are deliberately absent and set `robots: { index: false }`.

### Images

`next.config.mjs` sets `images.unoptimized: true`, so `next/image` gets no optimization pipeline — large JPEGs and the `klola.mp4` clip in `public/` ship at full size.
