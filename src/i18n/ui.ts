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

    // "Negative" is film jargon. Everything on this page is measured against it,
    // so it gets defined before any number that references it.
    negativeTermTitle: 'Primero: ¿qué es "el negativo"?',
    // Paragraphs as an array rather than one string with newlines: the template
    // renders one <p> each, and there is no escaping to get wrong.
    negativeTermBody: [
      'El negativo es la tira de película que se expone dentro de la cámara: la imagen original, física, tal como la capturó el lente. No es un archivo ni una copia — es el material del que sale todo lo demás.',
      'La Odisea se filmó completa en cámaras IMAX de 70mm, así que su negativo tiene forma 1.43:1: más alto, en proporción, que la pantalla de un cine normal. Ese cuadro es el techo — ninguna sala puede mostrarte más de lo que ahí quedó grabado, solo menos.',
      'Por eso todo en esta página se mide "contra el negativo": es el 100% del que se parte.',
    ],
    negativeTermAside:
      'Dos cosas distintas se pueden perder: el ENCUADRE (qué parte del cuadro se recorta) y el DETALLE (cuánta resolución alcanza a resolver el proyector). Una sala puede conservar todo el encuadre y aun así perder la mayor parte del detalle.',

    loupeFilm: (px: string) => `${px} · grano`,
    loupeDigital: (px: string) => `${px} · pixeles`,
    loupeRef: 'negativo',
    // Says what to look FOR, not how the view is built. The previous caption
    // described the mechanism, which answered a question nobody was asking.
    loupeCompare: 'Mira la nitidez a la derecha',
    loupeSame: 'Sin pérdida: los dos lados iguales',
    loupeHint: 'Arrastra sobre la imagen para mover la lupa',

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

    negativeTermTitle: 'First: what is "the negative"?',
    negativeTermBody: [
      'The negative is the strip of film exposed inside the camera: the original, physical image as the lens captured it. Not a file, not a copy — the material everything else is made from.',
      'The Odyssey was shot entirely on 70mm IMAX cameras, so its negative is 1.43:1 — taller, in proportion, than an ordinary cinema screen. That frame is the ceiling: no venue can show you more than what was recorded there, only less.',
      'So everything on this page is measured "against the negative": it is the 100% we start from.',
    ],
    negativeTermAside:
      'Two different things can be lost: FRAMING (how much of the frame is cropped away) and DETAIL (how much resolution the projector can actually resolve). A venue can keep all the framing and still lose most of the detail.',

    loupeFilm: (px: string) => `${px} · grain`,
    loupeDigital: (px: string) => `${px} · pixels`,
    loupeRef: 'negative',
    loupeCompare: 'Watch the sharpness on the right',
    loupeSame: 'No loss — both sides identical',
    loupeHint: 'Drag on the image to move the loupe',

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
