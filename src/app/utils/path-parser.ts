import {
  COLOR_OPTIONS,
  ColorOption,
  DeploymentConfiguration,
  FRAMEWORK_OPTIONS,
  FrameworkOption,
  PAGE_OPTIONS,
  PageOption,
  SOURCE_OPTIONS,
  SourceOption,
  TARGET_OPTIONS,
  TENSE_OPTIONS,
  TargetOption,
  TenseOption,
  Theme,
  VERBOSITY_OPTIONS,
  VIBE_OPTIONS,
  VerbosityOption,
  VibeOption,
} from "../types";

export async function cachedPathParser(slug?: string[]) {
  "use cache";
  return pathParser(slug);
}

export default function pathParser(slug?: string[]) {
  let theme: Theme = {
    page: "not-found",
    vibe: "standard",
    color: "light",
    tense: "first-person",
    verbosity: "medium",
  };

  let deploymentConfiguration: DeploymentConfiguration = {
    framework: "angular-ssr",
    target: "cloud-run",
    source: "local",
  };

  if (!slug) return { theme, deploymentConfiguration, remainingSlug: [] };

  let remainingSlug = [...slug];

  // index seems like a default path added by Next.js for the home route
  if (remainingSlug[0] === "index") {
    theme.page = "home";
    remainingSlug.shift();
  }
  if (PAGE_OPTIONS.includes(remainingSlug[0])) {
    theme.page = remainingSlug[0] as PageOption;
    remainingSlug.shift();
  }
  if (VIBE_OPTIONS.includes(remainingSlug[0])) {
    theme.vibe = remainingSlug[0] as VibeOption;
    remainingSlug.shift();
  }
  if (COLOR_OPTIONS.includes(remainingSlug[0])) {
    theme.color = remainingSlug[0] as ColorOption;
    remainingSlug.shift();
  }
  if (TENSE_OPTIONS.includes(remainingSlug[0])) {
    theme.tense = remainingSlug[0] as TenseOption;
    remainingSlug.shift();
  }
  if (VERBOSITY_OPTIONS.includes(remainingSlug[0])) {
    theme.verbosity = remainingSlug[0] as VerbosityOption;
    remainingSlug.shift();
  }
  if (FRAMEWORK_OPTIONS.includes(remainingSlug[0])) {
    deploymentConfiguration.framework = remainingSlug[0] as FrameworkOption;
    remainingSlug.shift();
  }
  if (TARGET_OPTIONS.includes(remainingSlug[0])) {
    deploymentConfiguration.target = remainingSlug[0] as TargetOption;
    remainingSlug.shift();
  }
  if (SOURCE_OPTIONS.includes(remainingSlug[0])) {
    deploymentConfiguration.source = remainingSlug[0] as SourceOption;
    remainingSlug.shift();
  }

  return { theme, deploymentConfiguration, remainingSlug };
}
