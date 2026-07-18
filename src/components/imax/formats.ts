/**
 * Dataset for the Format Canvas Explorer.
 *
 * Imported in the component frontmatter and serialized into the client script
 * via `define:vars`, so it must stay JSON-safe — plain data only, no functions,
 * no Dates, no undefined.
 */

export interface Format {
  id: string;
  /** optgroup heading in the selector. */
  cat: string;
  name: string;
  /** Native pixel dimensions, or scan-equivalent for photochemical formats. */
  w: number;
  h: number;
  /** Short qualifier shown next to the category. */
  note: string;
  use: string;
}

export const FORMATS: Format[] = [
  // ── Large Format Cinema ──────────────────────────────────
  {
    id: 'imax70', cat: 'Large Format Cinema', name: 'IMAX 70mm (15-perf Film)',
    w: 12000, h: 8391, note: '~12K–18K scan equivalent',
    use: 'The tallest commercial format in use. Reserved for premium, massive-scale theatrical releases. Fifteen perforations per frame running horizontally through 70mm stock — roughly 10× the negative area of standard 35mm.',
  },
  {
    id: 'imaxlaser', cat: 'Large Format Cinema', name: 'IMAX Dual Laser (GT)',
    w: 4096, h: 2864, note: '4K dual-projector',
    use: 'Digital IMAX at full 1.43:1 height. Two synchronized 4K laser projectors stack light for higher brightness and contrast — the only digital path that preserves the full-height IMAX frame.',
  },
  {
    id: 'imaxxenon', cat: 'Large Format Cinema', name: 'IMAX Digital (Xenon)',
    w: 2048, h: 1080, note: '2K projection',
    use: 'The widely-deployed retrofit. A 1.90:1 crop at 2K — noticeably shorter and lower-resolution than film IMAX, but present in far more multiplexes.',
  },

  // ── Standard Cinema (DCI) ────────────────────────────────
  {
    id: 'dci4kscope', cat: 'Standard Cinema (DCI)', name: 'DCI 4K Scope',
    w: 4096, h: 1716, note: '2.39:1 anamorphic',
    use: 'The default look of modern wide-release cinema. Shot anamorphic or cropped in post; the widest of the standard theatrical containers.',
  },
  {
    id: 'dci4kflat', cat: 'Standard Cinema (DCI)', name: 'DCI 4K Flat',
    w: 4096, h: 2160, note: '1.85:1 spherical',
    use: 'Standard theatrical "flat" projection. Common for comedy and drama, where the taller frame better serves faces and interiors.',
  },

  // ── Broadcast & Web ──────────────────────────────────────
  {
    id: 'uhd', cat: 'Broadcast & Web', name: '4K Ultra HD',
    w: 3840, h: 2160, note: '16:9 UHD-1',
    use: 'The consumer delivery standard — streaming, Blu-ray, broadcast, and virtually every modern TV panel.',
  },
  {
    id: 'fhd', cat: 'Broadcast & Web', name: 'Full HD',
    w: 1920, h: 1080, note: '16:9 1080p',
    use: 'Still the workhorse for web video, live streaming, and legacy broadcast. Exactly one quarter the pixels of UHD.',
  },
  {
    id: 'ultrawide', cat: 'Broadcast & Web', name: 'Ultrawide Video',
    w: 3440, h: 1440, note: '21:9 monitor native',
    use: 'Native ultrawide monitor resolution. Used for sim racing, productivity timelines, and cinematic-feel gameplay capture.',
  },
  {
    id: 'portrait', cat: 'Broadcast & Web', name: 'Social Portrait',
    w: 1080, h: 1920, note: '9:16 vertical',
    use: 'TikTok, Reels, Shorts. The only mainstream format taller than it is wide — designed for a phone held one-handed.',
  },
];

/**
 * Human-readable labels for ratios whose reduced fraction is unhelpful.
 * 3440×1440 reduces to 43:18, which tells nobody anything; "21:9" does.
 * Matched by decimal within tolerance.
 */
export const RATIO_NAMES = [
  { r: 1.43,  label: '1.43:1', frac: '≈ 143:100 (IMAX full height)' },
  { r: 1.90,  label: '1.90:1', frac: '≈ 19:10' },
  { r: 1.85,  label: '1.85:1', frac: '≈ 37:20 (Flat)' },
  { r: 2.39,  label: '2.39:1', frac: '≈ 239:100 (Scope)' },
  { r: 16/9,  label: '1.78:1', frac: '16:9' },
  { r: 21/9,  label: '2.33:1', frac: '21:9 marketing · 43:18 actual' },
  { r: 9/16,  label: '0.56:1', frac: '9:16 (vertical)' },
  { r: 4/3,   label: '1.33:1', frac: '4:3 (Academy)' },
  { r: 1,     label: '1.00:1', frac: '1:1 (square)' },
];

/** Default comparison outline on first paint. */
export const DEFAULT_GHOST_ID = 'dci4kscope';
