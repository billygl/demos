// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages, PROJECT repo -> served under /demos/.
// `site` + `base` together make Astro rewrite every internal URL it generates.
// Anything you hand-write must go through BASE_URL — see src/lib/url.ts.
export default defineConfig({
  // The user site (billygl.github.io) has a custom domain, and GitHub cascades
  // it to project Pages — so this repo serves from billygrados.com, not
  // github.io. `base` is unaffected by the domain.
  site: 'https://www.billygrados.com',
  base: '/demos',
  trailingSlash: 'always',
  // Spanish is the default and stays unprefixed; English lives under /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
