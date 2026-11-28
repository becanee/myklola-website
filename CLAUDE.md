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

On Windows without Node on PATH, `bun x tsc --noEmit` works where `npx` is unavailable.

Docker: three alpine stages — `oven/bun:1-alpine` install → `node:22-alpine` build → `node:22-alpine` standalone runner on port 3000, running as `node` with a `HEALTHCHECK` on `/`. `.dockerignore` excludes `*.md` and `.env*` (except `.env.example`), so the image never carries local secrets. **No build args**: the gateway env vars are read at request time, so one image promotes across environments.

[docker-compose.yml](docker-compose.yml) runs the built site alongside the `ghcr.io/uptimekit/worker` service with a shared `.env` and a `worker-events` volume.

The image is ~28MB of app, but `public/` adds ~276MB — almost all of it `public/products-video/` (269MB). That is the dominant cost of a deploy, not the dependencies.

**One `next dev` per repo.** A second instance refuses to start (`Another next dev server is already running`) even on a different port — the lock is in `.next/`. Kill the existing process before starting a new one.

## Stack notes

- Next.js 16 App Router, React 19, TypeScript 7, Tailwind CSS v4.
- **Tailwind v4 is CSS-first: there is no `tailwind.config.ts`.** All design tokens live in [src/app/globals.css](src/app/globals.css) under `:root` (values) and `@theme inline` (mapping them to `--color-*`, `--font-*`, `--radius-*` utility namespaces). To add a color/font/radius token, add it to both blocks.
- shadcn/ui, `new-york` style, `@/components/ui`. `components.json` registers `@beui` → `https://beui.dev/r/{name}.json` as a component registry.
- `motion` v14, imported as `motion/react` (not `framer-motion`).
- Forms use `react-hook-form` + `zodResolver`; the beUI `Input` primitive is controlled via `value` / `onChange(value: string)`, not RHF `register`.
- **Only four `ui/` primitives exist**: button, checkbox, label, textarea. There is no accordion, tabs, card, badge, or separator — build with plain elements or add one deliberately.
- `text-warning` is used in [hero-section.tsx](src/modules/landing/hero-section.tsx) but is **not defined** in `globals.css`, so that phrase renders uncoloured. Use `text-primary`, `text-muted-foreground`, `font-display`; don't add `text-warning` to new code without defining the token.

## Architecture

Two-tier composition. `src/app/**` holds routes only — thin files that assemble sections and export `metadata`. Real UI lives in `src/modules/**`, one folder per domain.

| Route | Module | Notes |
|---|---|---|
| `/` | `landing/` | Navigation + 6 sections + Footer |
| `/contact` | `contacts/` | Owns its chrome (no Navigation/Footer) |
| `/request-demo` | `request-demo/` | Same split chrome as contact |
| `/about`, `/clients`, `/careers`, `/company` | `about/`, `clients/`, `careers/`, `company/` | Each renders Navigation + module + Footer |
| `/privacy`, `/terms` | `privacy/`, `terms/` | Both render through the shared `legal/` shell |
| `/products` + 4 sub-pages | `products/` | Data-driven; see below |
| `/login` | `auth/login/` | Owns its chrome |
| `/dash` | route only | Protected placeholder, noindex |

`Navigation` and `FooterSection` are **not** in a layout. Each route that wants them renders `<Navigation />` and `<FooterSection />` itself. `/login`, `/dash`, `/contact`, and `/request-demo` deliberately do not.

### Products — the data-driven reference implementation

[content.ts](src/modules/products/_comp/content.ts) is the single source for each product's copy, icons, image, video and CTA (`ProductContent`). [atoms.tsx](src/modules/products/_comp/atoms.tsx) holds the shared shells; [sections.tsx](src/modules/products/_comp/sections.tsx) wraps them so each product's `_comp/{hero,video,features,cta}.tsx` is a thin wrapper.

To add a product: add a `ProductContent` entry, a `<slug>/` module with those four wrappers, and a route. Do not copy markup.

- Each product module `index.tsx` **must** keep `"use client"`. Without it the server component passes lucide icon components into client children and every page throws "Functions cannot be passed directly to Client Components".
- Section order is `<Hero /> <Video /> <Features /> <Cta />`. The hero holds the **image** plate; the video is its own band below it.
- `Eyebrow` draws a hairline that scales in while the label animates **transform only, never opacity** — that keeps the chrome visible if JS never runs. `layout.tsx` carries a `<noscript>` rule forcing `main *` visible.
- The overview's sticky specimen must not sit inside a transformed, filtered, or `overflow-hidden` ancestor. It is driven by `onMouseEnter` **and** `onFocus`.

### Product assets

- `public/products/{hris,payroll,pm,recplus}-hero.png` — 774×678, alpha 0 at all four corners (cut-outs), so they sit on the page with no card behind them.
- `public/products/{…}-cta.png` — **all four byte-identical** (one studio shot on pure black). `CtaBand` uses it as a desaturated backdrop under a navy wash with a per-product crop, never as a product screenshot.
- `public/products-video/*.mp4` — **note the plural folder**; the filenames contain spaces and are served through `encodeURI`. 46–81MB each, so `SpecimenVideo` uses `preload="metadata"`, the hero image as poster, muted looped `playsInline` playback started from an effect (never an `autoPlay` prop), and an always-visible pause button.
- There is no features illustration; Employee Self-Service is told on the HRIS page as an `EssBand` tile grid. ESS is **part of HRIS**, not a route.

### Legal pages

`privacy/` and `terms/` each export a `LegalDocument` from their `content.tsx` and render it through [legal-page.tsx](src/modules/legal/_comp/legal-page.tsx), which owns the masthead, the sticky contents rail, scroll progress and the block renderers (`paragraph`, `clause`, `list`, `definitions`).

**The legal copy is reproduced verbatim from approved text — never reword, merge or "tidy" a clause.** The content files say so at the top; keep that comment.

### Animation conventions

Import easing/spring tokens from [src/lib/ease.ts](src/lib/ease.ts) — `EASE_OUT`, `EASE_IN_OUT`, `SPRING_PRESS`, `SPRING_PANEL`, `SPRING_LAYOUT` — instead of inlining cubic-beziers or spring numbers.

- **Never branch `initial` on `useReducedMotion()`** — the server cannot know the preference, so the renders disagree and React logs a hydration mismatch. Keep `initial` static and collapse `duration`/`delay` to 0 (the `const dur = (d) => (reduce ? 0 : d)` pattern). Newer modules in `products/`, `about/`, `clients/`, `careers/`, `company/`, `legal/`, `contacts/` all follow this. `landing/` and `not-found/` still use the old `initial={prefersReduced ? false : …}` form — fix it when you touch those files, don't copy it.
- Gate hover-only effects behind `useHoverCapable()`; touch devices fire phantom sticky hovers.
- Scroll entrances use `whileInView` + `viewport={{ once: true }}`.
- CSS utilities (`.marquee`, `.line-reveal`, `.animate-char-in`, `.noise-overlay`, `.border-sketch`, `.text-stroke`) live in the `@layer utilities` block of `globals.css`.

**Static captures of `whileInView` content read as blank below the fold.** Scroll the page before judging a screenshot, or you will "fix" animation state as if it were a layout bug.

### Design language

Editorial/print: Instrument Sans body, Instrument Serif display (`font-display`), JetBrains Mono for eyebrows, indices and labels. Navy `#0B3464` on near-white `oklch(0.985 0.002 90)`; `--radius: 0.25rem` (deliberately sharp). Numbered eyebrows with a hairline rule, `max-w-[1400px]` containers, `px-6 lg:px-10`, `py-28 lg:py-36`, hairlines at `border-foreground/10`.

**All user-facing copy is Indonesian**, including nav, buttons, form labels, validation messages and page metadata. Technical proper nouns stay as-is (phrases like *Payroll*, *9 Grid Matrix*, industry names). When adding a page, translate the `metadata` too.

### Content & data

Page content is co-located as module-level `const` in each module — either inside the section file (`landing/`) or in a `content.tsx` beside `index.tsx` (`about`, `clients`, `careers`, `company`, `privacy`, `terms`).

- [client-logos.ts](src/lib/client-logos.ts) is the single roster: 19 ids, logos served from `public/clients/<id>.png`. `landing/clients-section.tsx` renders the first 9, `clients/` renders all, `company/` shows 6. Add a client by dropping the PNG in and appending the id.
- **Neither form has a backend.** `contacts/_comp/comp-form.tsx` and `request-demo/_comp/comp-form.tsx` validate with zod and set a success state; a `ponytail:` comment marks where the submission call belongs. Keep those markers — they name deliberate simplifications and their upgrade path.
- `careers/content.tsx` holds 10 dummy listings. Replace `JOBS` with a real feed when the ATS exists.

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
- The gateway requires `Authorization: Bearer $GATEWAY_API_KEY`; without it every call returns `401 {"error":"Missing API key"}`. A gateway `401` therefore means *our key is bad* (a 500 to the user), never *wrong password* — login maps `400` → "Invalid email or password", `429` → rate limited, `5xx` → unavailable.
- `/session` does **not** return `refreshTokenExpiresAt` (login does). The session route decodes the refresh JWT's `exp` claim instead — otherwise the refresh cookie degrades to a session cookie on every check.
- "Keep me signed in" is purely cookie `maxAge`: unchecked omits it, producing session cookies. Both routes must agree on `path`/`secure`/`sameSite` or the browser stores a duplicate instead of replacing.
- Client side: [\_logic.tsx](src/modules/auth/login/_logic.tsx) exports `loginUser()` and `useLogin()`. `loginUser` never throws for expected failures; it returns a discriminated `LoginResult`. The form, not the hook, owns post-login navigation.

### Route protection (Proxy)

Next.js 16 renamed Middleware to Proxy. The guard is [src/proxy.ts](src/proxy.ts) exporting `proxy` (not `middleware`), with [src/routes.ts](src/routes.ts) as the single source of truth.

- `PUBLIC_ROUTES` currently lists only `/`, `/contact`, `/login`. Everything else that is not `PROTECTED_ROUTES` passes through unguarded — the marketing routes rely on that and are **not** listed, so this file does not need editing for each new page.
- `isProtectedRoute` is checked first, so public routes never run the session check. Keep it that way; the proxy runs per-request.
- Matching is segment-aware: `/dash` covers `/dash` and `/dash/settings`, never `/dashx`.
- **`/api` is excluded from the matcher.** The proxy calls `/api/v1/session` itself; matching it would recurse until the request dies.
- The proxy verifies by calling that session route with the incoming `Cookie` header and forwards the rotated `Set-Cookie` onto its own response — skip that and the browser keeps a refresh token the gateway already rotated away.
- A gateway error fails **closed** (redirect to `/login`), never open.
- The redirect is a UX gate, not authorization. Verify again in the Server Component when a page starts reading sensitive data.

### SEO

`metadataBase` and every generated metadata route use `https://myklola.app` (`layout.tsx`, `robots.ts`, `sitemap.ts`). Per-route titles use the `%s | Klola Indonesia` template, so a route exports only its own title.

Adding a public route means adding its URL to [src/app/sitemap.ts](src/app/sitemap.ts). Currently listed: `/`, `/contact`, `/request-demo`, `/products` and the four sub-pages. **`/about`, `/clients`, `/careers`, `/company`, `/privacy`, `/terms` are missing** — add them when touching SEO. `/login` and `/dash` are deliberately absent and set `robots: { index: false }`.

### Images & media

`next.config.mjs` sets `images.unoptimized: true`, so `next/image` gets no optimization pipeline — assets ship at full size. Notable weights: `public/hero-image.png` 1.5MB, `public/products/*.png` 340–570KB, `public/products-video/*.mp4` 46–81MB. Re-encoding the videos (~720p, 2–3 Mbps) would cut them to roughly a tenth with no visible loss for a screen recording.

Use `next/image` for any image inside the layout flow (explicit `width`/`height`, `sizes`, `priority` on the hero). Use a plain `<img>` for absolutely-positioned backdrops, where the optimization pass buys nothing.