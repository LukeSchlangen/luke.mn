export const PAGE_OPTIONS = ["home", "faq", "deploy", "not-found"] as const;
export type PageOption = (typeof PAGE_OPTIONS)[number];

export const VIBE_OPTIONS = ["standard", "professional", "fun"] as const;
export type VibeOption = (typeof VIBE_OPTIONS)[number];

export const COLOR_OPTIONS = ["light", "dark"] as const;
export type ColorOption = (typeof COLOR_OPTIONS)[number];

export const TENSE_OPTIONS = ["first-person", "third-person"] as const;
export type TenseOption = (typeof TENSE_OPTIONS)[number];

export const VERBOSITY_OPTIONS = ["short", "long"] as const;
export type VerbosityOption = "short" | "long";

export type Theme = {
  page: PageOption;
  vibe: VibeOption;
  color: ColorOption;
  tense: TenseOption;
  verbosity: VerbosityOption;
};

// TODO: add framework details
// export const FRAMEWORK_DETAILS = {
//   'angular-ssr': {
    
//   }
// } as const;

export const FRAMEWORK_OPTIONS = ["angular-ssr"] as const;
export type FrameworkOption = (typeof FRAMEWORK_OPTIONS)[number];

export const TARGET_OPTIONS = ["cloud-run"] as const;
export type TargetOption = (typeof TARGET_OPTIONS)[number];

export const SOURCE_OPTIONS = ["local"] as const;
export type SourceOption = (typeof SOURCE_OPTIONS)[number];

export type DeploymentConfiguration = {
  framework: FrameworkOption;
  target: TargetOption;
  source: SourceOption;
};

export type Workout = {
  [key: string]: string;
};
