import { DEFAULT_LANG, type Lang } from '../i18n/ui';

/**
 * Base-path- and locale-safe URL builder.
 *
 * The site deploys under `/demos/`, so a hand-written `href="/imax/"` works in
 * dev and 404s in production. Spanish is the default locale and stays
 * unprefixed; English gets an `/en/` segment.
 *
 *   href('/')          -> '/demos/'
 *   href('/imax')      -> '/demos/imax/'
 *   href('/imax','en') -> '/demos/en/imax/'
 */
export function href(path: string, lang: Lang = DEFAULT_LANG): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  const clean = `/${path}`.replace(/\/+/g, '/');
  const url = `${base}${prefix}${clean}`.replace(/\/+/g, '/');
  return /\.[a-z0-9]+$/i.test(url) || url.endsWith('/') ? url : `${url}/`;
}

/**
 * The current path expressed in another locale — used by the language switcher
 * so switching keeps you on the same page instead of dumping you at the root.
 */
export function switchLocale(pathname: string, to: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let rest = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  rest = rest.replace(/^\/(es|en)(?=\/|$)/, '') || '/';
  return href(rest, to);
}
