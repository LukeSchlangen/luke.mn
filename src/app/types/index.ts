export const PAGES = ["home", "faq", "deploy", "not-found"] as const;
export type Page = (typeof PAGES)[number];

export const VIBES = ["standard", "professional", "fun"] as const;
export type Vibe = (typeof VIBES)[number];

export const COLORS = ["light", "dark"] as const;
export type Color = (typeof COLORS)[number];

export const TENSES = ["first-person", "third-person"] as const;
export type Tense = (typeof TENSES)[number];

export const VERBOSITIES = ["short", "long"] as const;
export type Verbosity = "short" | "long";

export type Theme = {
  page: Page;
  vibe: Vibe;
  color: Color;
  tense: Tense;
  verbosity: Verbosity;
};

export const FRAMEWORKS = ["angular-ssr"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const TARGETS = ["cloud-run"] as const;
export type Target = (typeof TARGETS)[number];

export const SOURCES = ["local"] as const;
export type Source = (typeof SOURCES)[number];

// TODO: add framework details
// export const FRAMEWORK_DETAILS = new Map({

// }) as const;

export type DeploymentConfiguration = {
  framework: Framework;
  target: Target;
  source: Source;
};

export type Workout = {
  [key: string]: string;
};
