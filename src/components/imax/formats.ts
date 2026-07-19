import type { Lang } from '../../i18n/ui';

/**
 * The Odyssey (Nolan, 2026) — release format matrix.
 *
 * The film was shot ENTIRELY on IMAX film cameras at 1.43:1, so that ratio is
 * the negative itself, not a crop of something wider. Every other presentation
 * is a subtraction from it: wider formats do not add width, they remove height.
 * 2.39:1 Scope feels like the widest, most cinematic option — and it is the
 * SMALLEST view of the captured image.
 *
 * Geometry is shared; only prose is localized. Keeping the numbers in one place
 * means the Spanish and English versions cannot drift apart — a bug that would
 * stay invisible until someone compared the two side by side.
 */

/** The source negative. All crop math is relative to this. */
export const SOURCE_RATIO = 1.43;

/**
 * Approximate horizontal resolution of the 15-perf 70mm negative, used as the
 * detail baseline. Film has no pixel grid, so this is an equivalence, not a
 * measurement — see the note on `detailPx`.
 */
export const SOURCE_DETAIL_PX = 18000;

interface Geometry {
  id: string;
  ratio: number;
  ratioLabel: string;
  /** Effective resolution of this presentation, shown as a live stat. */
  resolution: string;
  /**
   * Approximate horizontal resolution in pixels, for the detail bar.
   *
   * Framing and detail are INDEPENDENT losses, and conflating them was a bug:
   * IMAX with Laser keeps 100% of the frame while resolving roughly a quarter
   * of the negative's detail, so a single "kept" number read as "loses
   * nothing". For photochemical formats these are commonly-cited equivalences,
   * not pixel counts — film has no grid.
   */
  detailPx: number;
  /**
   * Photochemical, i.e. no pixel grid at all. Drives the loupe: film formats
   * are drawn with random grain, digital ones with a sampling grid. A 35mm
   * print resolves less than a 4K projector yet still has no grid — which is
   * the distinction the resolution number alone cannot express.
   */
  isFilm: boolean;
}

const GEOMETRY: Geometry[] = [
  { id: 'imax70',      ratio: 1.43,   ratioLabel: '1.43:1', resolution: '~18K',  detailPx: 18000, isFilm: true },
  // Dual laser stacks two projectors for light output, NOT for resolution:
  // it is 4K, not 8K. Labelling it "4K ×2" invited exactly that misreading.
  { id: 'imaxlaser',   ratio: 1.43,   ratioLabel: '1.43:1', resolution: '4K',    detailPx: 4096, isFilm: false },
  { id: 'imaxdigital', ratio: 1.90,   ratioLabel: '1.90:1', resolution: '2K–4K', detailPx: 2048, isFilm: false },
  { id: 'dolbyflat',   ratio: 1.85,   ratioLabel: '1.85:1', resolution: '4K',    detailPx: 4096, isFilm: false },
  { id: 'std70',       ratio: 2.20,   ratioLabel: '2.20:1', resolution: '~8K',   detailPx: 8000, isFilm: true },
  { id: 'scope',       ratio: 2.39,   ratioLabel: '2.39:1', resolution: '~4K',   detailPx: 4000, isFilm: true },
  { id: 'uhd',         ratio: 16 / 9, ratioLabel: '1.78:1', resolution: '4K',    detailPx: 3840, isFilm: false },
  { id: 'vertical',    ratio: 9 / 16, ratioLabel: '0.56:1', resolution: '1080p', detailPx: 1080, isFilm: false },
];

/** Share of the negative's linear detail this presentation resolves. */
export function detailFraction(detailPx: number) {
  return Math.min(1, detailPx / SOURCE_DETAIL_PX);
}

interface FormatText {
  cat: string;
  name: string;
  venue: string;
  /**
   * The single most interesting fact about this presentation, shown ALWAYS,
   * under the stage — the scarcity story is the point of the page, so it
   * cannot sit one click away behind a dialog.
   */
  headline: string;
  note: string;
}

const TEXT: Record<Lang, Record<string, FormatText>> = {
  // ── Español: escrito para un lector en Perú / Latinoamérica ─────────
  es: {
    imax70: {
      cat: 'Completa, como se filmó', name: 'IMAX 70mm (15 perforaciones)',
      venue: 'Proyección en película IMAX',
      headline: 'Solo ~40 de las ~1,800 salas IMAX del mundo pueden proyectarla. Ninguna está en Latinoamérica.',
      note: 'El negativo completo. Quince perforaciones por cuadro, con la película corriendo horizontalmente por el proyector, sobre una pantalla de piso a techo. No hay recorte porque no existe nada fuera de este cuadro: esto es lo que capturó la cámara.',
    },
    imaxlaser: {
      cat: 'Encuadre completo, menos detalle', name: 'IMAX con Láser (algunas salas)',
      venue: 'IMAX digital, dos proyectores láser 4K',
      headline: 'No pierdes nada de encuadre — pero son 4K contra ~18K: apenas un 23% del detalle del negativo.',
      note: 'El único camino digital que conserva la altura completa de 1.43:1: ves cada centímetro de la composición. Ojo con el "doble láser": los dos proyectores suman luz y contraste, no resolución — sigue siendo 4K, no 8K. Y la única IMAX del Perú es de esta clase, con pantalla de 752 pulgadas frente a las ~1,700 de una IMAX real.',
    },
    imaxdigital: {
      cat: 'Recortada para la sala', name: 'IMAX Digital',
      venue: 'IMAX digital estándar',
      headline: 'Se vende como IMAX, pero un cuarto del cuadro ya se perdió antes de que encienda el proyector.',
      note: 'La experiencia "IMAX" más común. Lleva la marca IMAX, pero un cuarto de la imagen capturada desaparece por arriba y por abajo antes de proyectarse.',
    },
    dolbyflat: {
      cat: 'Recortada para la sala', name: 'Dolby Cinema / Flat',
      venue: 'Salas Dolby con pantalla flat',
      headline: 'El recorte más suave que vas a encontrar en un cine — y aun así descarta el 23% del negativo.',
      note: 'Dolby proyecta en la relación para la que se construyó la sala. Las salas flat reciben 1.85:1: el más leve de los recortes, pero recorte al fin.',
    },
    std70: {
      cat: 'Recortada para la sala', name: '70mm estándar',
      venue: 'Película 70mm no IMAX',
      headline: 'Hasta 3× la resolución de una proyección digital estándar, mostrando dos tercios del cuadro.',
      note: 'Proyección fotoquímica preciosa, hasta tres veces la resolución del digital estándar — mostrando apenas dos tercios del cuadro. Resolución e integridad no son lo mismo.',
    },
    scope: {
      cat: 'Recortada para la sala', name: '35mm / Scope',
      venue: 'Película 35mm, pantallas scope, Dolby scope',
      headline: 'Una copia en 35mm pesa una fracción de los 270 kg de una IMAX 70mm — y muestra 40% menos imagen.',
      note: 'La proyección más ancha y a la vez la más pequeña. Se siente la más "cinematográfica" justamente porque es la más recortada: una forma que el público aprendió a leer como épica.',
    },
    uhd: {
      cat: 'En casa y en el celular', name: 'TV / Streaming',
      venue: '4K UHD, Blu-ray, streaming',
      headline: 'Tu televisor conserva más de esta película que la mayoría de cines cerca de ti.',
      note: 'La eventual edición doméstica. Más cerca del negativo que Scope — un caso raro donde la sala te da menos imagen que tu propia casa.',
    },
    vertical: {
      cat: 'En casa y en el celular', name: 'Celular, recorte vertical',
      venue: 'Clips en TikTok, Reels, Shorts',
      headline: 'Así es como la mayoría verá una toma de esta película: con el 39% de lo que se capturó.',
      note: 'Aquí el cuadro es más angosto que el negativo, así que el recorte cambia de eje: en vez de perder arriba y abajo, pierdes los costados.',
    },
  },

  // ── English ────────────────────────────────────────────────────────
  en: {
    imax70: {
      cat: 'Complete, as shot', name: 'IMAX 70mm (15-perf film)',
      venue: 'IMAX film projection',
      headline: "Only ~40 of the world's ~1,800 IMAX screens can run this. None of them are in Latin America.",
      note: 'The full negative. Fifteen perforations per frame, running horizontally through the projector, filling a floor-to-ceiling screen. Nothing is cropped because there is nothing outside this frame — this is what the camera captured.',
    },
    imaxlaser: {
      cat: 'Full frame, less detail', name: 'IMAX with Laser (select)',
      venue: 'Digital IMAX, two 4K laser projectors',
      headline: "You lose no framing at all — but this is 4K against ~18K: roughly 23% of the negative's detail.",
      note: `The only digital path that preserves full 1.43:1 height — you see every inch of the composition. Note what "dual laser" does and does not mean: the two projectors stack light and contrast, not resolution. It is 4K, not 8K. Peru's only IMAX is this class, at 752 inches against ~1,700 for true IMAX.`,
    },
    imaxdigital: {
      cat: 'Cropped for the venue', name: 'IMAX Digital',
      venue: 'Standard digital IMAX',
      headline: 'Sold as IMAX, but a quarter of the frame is gone before the projector starts.',
      note: 'The most common "IMAX" experience. Branded IMAX, but a quarter of the captured image disappears from top and bottom before projection.',
    },
    dolbyflat: {
      cat: 'Cropped for the venue', name: 'Dolby Cinema / Flat',
      venue: 'Dolby auditoriums with flat screens',
      headline: 'The gentlest crop you will find in a cinema — and it still discards 23% of the negative.',
      note: 'Dolby presents at whichever ratio the auditorium was built for. Flat houses get 1.85:1 — the mildest of the crops, but a crop all the same.',
    },
    std70: {
      cat: 'Cropped for the venue', name: 'Standard 70mm',
      venue: 'Non-IMAX 70mm film',
      headline: 'Up to 3× the resolution of standard digital projection, showing two thirds of the frame.',
      note: 'Beautiful photochemical projection, up to three times the resolution of standard digital — showing barely two thirds of the frame. Resolution and completeness are different things.',
    },
    scope: {
      cat: 'Cropped for the venue', name: '35mm / Scope',
      venue: '35mm film, scope screens, Dolby scope houses',
      headline: "A 35mm print weighs a fraction of IMAX 70mm's 270 kg — and shows 40% less of the image.",
      note: 'The widest presentation and the smallest one. It feels the most "cinematic" precisely because it is the most severely cut — a shape audiences learned to read as epic.',
    },
    uhd: {
      cat: 'At home & on a phone', name: 'TV / Streaming',
      venue: '4K UHD, Blu-ray, streaming',
      headline: 'Your television preserves more of this film than most cinemas near you.',
      note: 'The eventual home release. Closer to the negative than Scope — a rare case where the cinema down the road gives you less than your living room.',
    },
    vertical: {
      cat: 'At home & on a phone', name: 'Phone, vertical crop',
      venue: 'Clips on TikTok, Reels, Shorts',
      headline: 'How most people will ever see a shot from this film — at 39% of what was captured.',
      note: 'Here the frame is narrower than the negative, so the crop flips axis: instead of losing top and bottom, you lose the sides.',
    },
  },
};

export interface ReleaseFormat extends Geometry, FormatText {}

/** Geometry joined with prose for one locale. */
export function getFormats(lang: Lang): ReleaseFormat[] {
  return GEOMETRY.map((g) => ({ ...g, ...TEXT[lang][g.id] }));
}

export const DEFAULT_FORMAT_ID = 'imax70';

/* ────────────────────────────────────────────────────────────
   Context for the "why film" dialog.
   The crop is only half the story. The other half is that IMAX 70mm is a
   fundamentally different imaging chain, with no pixel grid anywhere in it.
   ──────────────────────────────────────────────────────────── */

export interface Fact { stat: string; label: string; body: string }

/** `es|en` marks a stat that is a word rather than a number, so needs translating. */
const FACT_STATS = ['40 / 1,800', '270 kg', '~18K', '3×', 'Sin grilla|No grid', '1,700 in', '4K ≠ 8K'];

const FACT_TEXT: Record<Lang, Array<{ label: string; body: string }>> = {
  es: [
    { label: 'Salas que pueden proyectarla',
      body: 'De unas 1,800 pantallas IMAX en el mundo, cerca de 40 pueden proyectar película de 70mm con 15 perforaciones. No hay ninguna en Latinoamérica, y probablemente no la haya: las instalaciones son carísimas y la logística es brutal.' },
    { label: 'Peso de una sola copia',
      body: 'Una copia IMAX 70mm de un largometraje pesa más de 270 kilos. Mover la película es un problema de carga, no de mensajería, y eso explica buena parte de por qué tan pocas salas la reciben.' },
    { label: 'Resolución efectiva',
      body: 'Un cuadro de 70mm con 15 perforaciones resuelve alrededor de 18K. Ningún sensor de cine digital captura con fiabilidad ese nivel de detalle — y aunque existiera, todavía tendría que sobrevivir a la proyección.' },
    { label: 'Frente al 70mm estándar',
      body: 'IMAX corre la película en horizontal con 15 perforaciones por cuadro, contra 5 del 70mm convencional. Tres veces las perforaciones son tres veces el área de cuadro — y unas diez veces el área de un cuadro de 35mm.' },
    { label: 'Por qué película y no sensor',
      body: 'Un proyector digital es un chip cubierto de millones de espejos en filas y columnas perfectas; cada espejo es un pixel, así que el proyector le pone techo a toda la cadena por muy buena que fuera la cámara. La película no tiene grilla: la luz atraviesa millones de cristales en posiciones aleatorias y llega a la pantalla sin ningún procesamiento digital de por medio.' },
    { label: 'Tamaño de pantalla',
      body: 'Una pantalla IMAX real llega a unas 1,700 pulgadas, de piso a techo. Para comparar: la única IMAX del Perú es láser digital 4K, con pantalla de 752 pulgadas a 1.90:1 — espectacular, pero no es el formato en el que se filmó.' },
    { label: 'Dos proyectores no son el doble de resolución',
      body: 'En IMAX con doble láser, los dos proyectores se superponen para sumar luz, contraste y rango dinámico — no píxeles. La imagen sigue siendo 4K, no 8K. Por eso una sala así puede conservar el 100% del encuadre y aun así resolver cerca de una cuarta parte del detalle del negativo: son dos pérdidas distintas e independientes.' },
  ],
  en: [
    { label: 'Theaters that can show it',
      body: 'Of roughly 1,800 IMAX screens worldwide, about 40 can run 15-perf 70mm film. There is not one in Latin America, and there probably never will be — the installations are enormously expensive and the logistics are punishing.' },
    { label: 'Weight of a single print',
      body: 'One IMAX 70mm print of a feature weighs over 270 kilograms. Shipping the film is a freight problem, not a courier problem, which is a large part of why so few venues carry it.' },
    { label: 'Effective resolution',
      body: 'A 15-perf 70mm frame resolves somewhere around 18K. No digital cinema sensor reliably captures that much detail — and even if one did, it would still have to survive projection.' },
    { label: 'Versus standard 70mm',
      body: 'IMAX runs the film horizontally at 15 perforations per frame, against 5 for conventional 70mm. Three times the perforations means three times the frame area — and about ten times the area of a standard 35mm frame.' },
    { label: 'Why film, not a sensor',
      body: 'A digital projector is a chip covered in millions of mirrors in perfect rows and columns; each mirror is one pixel, so the projector caps the entire chain no matter how good the camera was. Film has no grid — light passes through millions of randomly positioned crystals and lands on the screen with no digital processing in between.' },
    { label: 'Screen size',
      body: 'True IMAX screens reach around 1,700 inches, floor to ceiling. For contrast, the only IMAX in Peru is a 4K digital laser house: a 752-inch screen at 1.90:1 — spectacular, but not the format the film was made in.' },
    { label: 'Two projectors is not twice the resolution',
      body: 'In dual-laser IMAX the two projectors superimpose to stack light, contrast and dynamic range — not pixels. The image is still 4K, not 8K. That is why such a house can keep 100% of the framing and still resolve about a quarter of the negative’s detail: these are two separate, independent losses.' },
  ],
};

export function getFacts(lang: Lang): Fact[] {
  return FACT_TEXT[lang].map((f, i) => {
    const raw = FACT_STATS[i];
    const stat = raw.includes('|') ? raw.split('|')[lang === 'es' ? 0 : 1] : raw;
    return { stat, ...f };
  });
}

/**
 * Fraction of the negative that survives a target ratio.
 * Wider target -> full width kept, height sacrificed.
 * Narrower target -> full height kept, width sacrificed.
 */
export function cropFractions(targetRatio: number) {
  return targetRatio >= SOURCE_RATIO
    ? { width: 1, height: SOURCE_RATIO / targetRatio }
    : { width: targetRatio / SOURCE_RATIO, height: 1 };
}
