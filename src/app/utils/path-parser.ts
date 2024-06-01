import {
  COLORS,
  Color,
  DeploymentConfiguration,
  FRAMEWORKS,
  Framework,
  PAGES,
  Page,
  SOURCES,
  Source,
  TARGETS,
  TENSES,
  Target,
  Tense,
  Theme,
  VERBOSITIES,
  VIBES,
  Verbosity,
  Vibe,
} from "../types";

export default function pathParser(slug?: string[]) {
  let theme: Theme = {
    page: "not-found",
    vibe: "standard",
    color: "light",
    tense: "first-person",
    verbosity: "short",
  };

  let deploymentConfiguration: DeploymentConfiguration = {
    framework: "angular-ssr",
    target: "cloud-run",
    source: "local",
  };

  if (!slug) return { theme, deploymentConfiguration, remainingSlug: [] };

  let remainingSlug = [...slug];

  // index seems like a default path added by Next.js for the home route
  if (remainingSlug[0] === 'index') {
    theme.page = 'home';
    remainingSlug.shift();
  }
  if (PAGES.includes(remainingSlug[0])) {
    theme.page = remainingSlug[0] as Page;
    remainingSlug.shift();
  }
  if (VIBES.includes(remainingSlug[0])) {
    theme.vibe = remainingSlug[0] as Vibe;
    remainingSlug.shift();
  }
  if (COLORS.includes(remainingSlug[0])) {
    theme.color = remainingSlug[0] as Color;
    remainingSlug.shift();
  }
  if (TENSES.includes(remainingSlug[0])) {
    theme.tense = remainingSlug[0] as Tense;
    remainingSlug.shift();
  }
  if (VERBOSITIES.includes(remainingSlug[0])) {
    theme.verbosity = remainingSlug[0] as Verbosity;
    remainingSlug.shift();
  }
  if (FRAMEWORKS.includes(remainingSlug[0])) {
    deploymentConfiguration.framework = remainingSlug[0] as Framework;
    remainingSlug.shift();
  }
  if (TARGETS.includes(remainingSlug[0])) {
    deploymentConfiguration.target = remainingSlug[0] as Target;
    remainingSlug.shift();
  }
  if (SOURCES.includes(remainingSlug[0])) {
    deploymentConfiguration.source = remainingSlug[0] as Source;
    remainingSlug.shift();
  }

  return { theme, deploymentConfiguration, remainingSlug };
}
