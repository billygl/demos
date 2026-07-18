// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages, PROJECT repo -> served under /demos/.
// `site` + `base` together make Astro rewrite every internal URL it generates.
// Anything you hand-write must go through BASE_URL — see src/lib/url.ts.
export default defineConfig({
  site: 'https://billygl.github.io',
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
