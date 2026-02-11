import {
  COLOR_OPTIONS,
  FRAMEWORK_OPTIONS,
  PAGE_OPTIONS,
  SOURCE_OPTIONS,
  TARGET_OPTIONS,
  TENSE_OPTIONS,
  VERBOSITY_OPTIONS,
  VIBE_OPTIONS,
} from "../types";

export function getAllPossibleSlugs(): string[][] {
  const categories = [
    PAGE_OPTIONS,
    VIBE_OPTIONS,
    COLOR_OPTIONS,
    TENSE_OPTIONS,
    VERBOSITY_OPTIONS,
    FRAMEWORK_OPTIONS,
    TARGET_OPTIONS,
    SOURCE_OPTIONS,
  ];

  let slugs: string[][] = [[]];

  for (const options of categories) {
    const nextSlugs: string[][] = [];
    for (const slug of slugs) {
      // Option 1: Skip this category
      nextSlugs.push(slug);
      // Option 2: Include one of the options
      for (const option of options) {
        nextSlugs.push([...slug, option]);
      }
    }
    slugs = nextSlugs;
  }

  return slugs;
}

export function getSlugsForPage(baseRoute?: "faq" | "deploy") {
  const allSlugs = getAllPossibleSlugs();

  if (baseRoute) {
    // For specialized routes (/faq, /deploy), we only want slugs
    // that don't have an explicit page segment at the start to avoid
    // redundant paths like /faq/faq or /faq/home.
    return allSlugs.filter(
      (slug) => slug.length === 0 || !PAGE_OPTIONS.includes(slug[0] as any),
    );
  }

  // For the root/home catch-all, we include slugs that don't start
  // with specialized routes (faq, deploy) to avoid routing conflicts.
  return allSlugs.filter(
    (slug) =>
      slug.length === 0 || (slug[0] !== "faq" && slug[0] !== "deploy"),
  );
}
