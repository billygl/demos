import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * The `demos` collection stores METADATA ONLY.
 *
 * Pages are hand-written (src/pages/<slug>/index.astro) because demos differ
 * too much to share one template. The collection exists so the root linktree
 * can be generated instead of hand-maintained — add a .md here and the card
 * appears in both languages. The entry id must match the page directory.
 */

/** Localized string: one key per supported locale. */
const i18nText = z.object({ es: z.string(), en: z.string() });

const demos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/demos' }),
  schema: z.object({
    title: i18nText,
    blurb: i18nText,
    /** Short mono glyph for the card's square badge, e.g. "1.43". */
    badge: z.string().max(5),
    tags: z.array(z.string()).default([]),
    /** Ascending sort on the index. Lower = higher on the page. */
    order: z.number().default(999),
    /** Hide from the index without deleting the entry. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { demos };
