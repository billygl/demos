# Mini Demos

A shelf of small, single-page interactive demos. Astro, no client framework.

Live: `https://<user>.github.io/demos/`

## Architecture

| Decision | Choice | Why |
|---|---|---|
| Demo shape | Content collection (metadata) + hand-written pages | Demos differ too much to share a template; the index shouldn't be hand-maintained |
| Interactivity | Vanilla `<script>`, no framework | Zero hydration cost — the build ships 0 KB of framework JS |
| Styling | Tailwind v4 via `@tailwindcss/vite` | Build-time, purged; shared tokens in `src/styles/global.css` |
| Deploy | GitHub Pages, project repo | Served under `/demos/`, hence `base` in `astro.config.mjs` |

### The base-path rule

The site deploys under `/demos/`, so **every internal link must go through
`href()` from `src/lib/url.ts`**. A hand-written `href="/imax/"` works in dev
and 404s in production — the single most common way this setup breaks.

```astro
---
import { href } from '../lib/url';
---
<a href={href('/imax')}>…</a>   <!-- ✅ -->
<a href="/imax/">…</a>          <!-- ❌ 404 in prod -->
```

## Adding a demo

1. `src/content/demos/<slug>.md` — metadata only:

   ```yaml
   ---
   title: My Demo
   blurb: One line, shown on the index card
   badge: "◆"        # max 5 chars, shown in the square
   tags: [thing]
   order: 2          # ascending; lower is higher on the page
   draft: false
   ---
   ```

2. `src/pages/<slug>/index.astro` — the page. Wrap it in `Base`.
3. `src/components/<slug>/` — the demo's component + data module.

The index card appears automatically. The directory name **must** match the
markdown filename, since that's what `href('/' + demo.id)` builds.

### Data pattern

Datasets live in a typed `.ts` module next to the component. The component
imports it in frontmatter (for server-rendered initial HTML) and passes it to
the client with `define:vars`. That script is **inline** — plain JS, no imports,
no TypeScript inside.

## Commands

```
npm run dev       # localhost:4321/demos/
npm run build     # -> dist/
npm run preview   # serve dist/
npm run check     # typecheck .astro + .ts
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes on push to `main`.
One-time: repo **Settings → Pages → Source = GitHub Actions**.
