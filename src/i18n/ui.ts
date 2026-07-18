/**
 * UI strings. Spanish is the source of truth — it is the default locale, and
 * the Spanish copy is not a translation of the English but its own version,
 * written for a reader in Peru / Latin America.
 */

export const LOCALES = ['es', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'es';

export const LANG_NAMES: Record<Lang, string> = { es: 'Español', en: 'English' };

export const UI = {
  es: {
    siteTitle: 'Mini Demos',
    siteBlurb:
      'Experimentos de una sola página. Una idea cada uno, sin instalar nada — mira el código y llévate lo que sirva.',
    allDemos: 'todos los demos',
    demoCount: (n: number) => `${n} demo${n === 1 ? '' : 's'} · vienen más.`,
    builtWith: 'Hecho con Astro · sin framework de cliente',

    howWatching: 'Cómo lo estás viendo',
    framing: 'Encuadre',
    detail: 'Detalle',
    resolution: 'Resolución',
    cutFrom: 'Recorte',
    vsNegative: 'vs. negativo',
    cutNothing: 'Nada',
    cutVertical: 'Arriba y abajo',
    cutHorizontal: 'Izquierda y derecha',
    more: 'más',
    whyTitle: '¿Por qué 70mm en película?',
    whyCta: '¿Por qué 70mm? →',
    close: 'Cerrar',
    prevFormat: 'Formato anterior',
    nextFormat: 'Formato siguiente',
    formatGroup: 'Formato de exhibición',

    fullNegative: 'Negativo completo — nada recortado, todo el detalle',
    // Full framing but reduced resolution: the case that used to read as "loses nothing".
    detailOnly: (d: number) => `Encuadre completo, pero solo ~${d}% del detalle del negativo`,
    lossTag: (p: number, d: number) => `${p}% de la imagen no llega a la pantalla · ~${d}% del detalle`,

    disclaimer:
      'El cuadro de este demo es una ilustración original compuesta para 1.43:1, no un fotograma de la película — el mástil, el banderín y la estela están puestos a propósito en las franjas que un recorte más ancho descarta. Además, una proyección Scope real es un reencuadre pensado por los cineastas, no el recorte central ciego que se simula aquí.',
  },

  en: {
    siteTitle: 'Mini Demos',
    siteBlurb:
      'Small single-page experiments. One idea each, no install — view source and take what is useful.',
    allDemos: 'all demos',
    demoCount: (n: number) => `${n} demo${n === 1 ? '' : 's'} · more coming.`,
    builtWith: 'Built with Astro · no client framework',

    howWatching: "How you're watching it",
    framing: 'Framing',
    detail: 'Detail',
    resolution: 'Resolution',
    cutFrom: 'Cut from',
    vsNegative: 'vs. negative',
    cutNothing: 'Nothing',
    cutVertical: 'Top & bottom',
    cutHorizontal: 'Left & right',
    more: 'more',
    whyTitle: 'Why 70mm film at all?',
    whyCta: 'Why 70mm at all? →',
    close: 'Close',
    prevFormat: 'Previous format',
    nextFormat: 'Next format',
    formatGroup: 'Release format',

    fullNegative: 'Full negative — nothing cropped, all the detail',
    detailOnly: (d: number) => `Full framing, but only ~${d}% of the negative's detail`,
    lossTag: (p: number, d: number) => `${p}% of the image never reaches the screen · ~${d}% detail`,

    disclaimer:
      'The frame in this demo is an original illustration composed for 1.43:1, not a still from the film — the mast, pennant and wake sit deliberately in the bands a wider crop discards. A real Scope presentation is also a considered reframe by the filmmakers, not the blind centre-cut simulated here.',
  },
} as const;

export const t = (lang: Lang) => UI[lang];

/** Narrow an arbitrary string to a supported locale. */
export function toLang(value: string | undefined): Lang {
  return LOCALES.includes(value as Lang) ? (value as Lang) : DEFAULT_LANG;
}
