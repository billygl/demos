/**
 * Base-path-safe URL builder.
 *
 * The site deploys under `/demos/` (GitHub Pages project repo), so a
 * hand-written `href="/imax/"` resolves to `/imax/` in production and 404s.
 * Relative `./imax/` is worse — it silently changes meaning per page depth.
 *
 * Always route internal links through this.
 *   href('/')       -> '/demos/'
 *   href('/imax')   -> '/demos/imax/'
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/demos'
  const clean = `/${path}`.replace(/\/+/g, '/');            // collapse slashes
  const withBase = `${base}${clean}`;
  // trailingSlash: 'always' — keep it consistent, except for files.
  return /\.[a-z0-9]+$/i.test(withBase) || withBase.endsWith('/')
    ? withBase
    : `${withBase}/`;
}
