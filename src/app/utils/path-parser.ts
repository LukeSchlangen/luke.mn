import { Effect, pipe } from "effect";
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

interface ParserState {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  remainingSlug: string[];
}

const processIndex = (state: ParserState): ParserState => {
  if (state.remainingSlug[0] === "index") {
    return {
      ...state,
      theme: { ...state.theme, page: "home" },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processPage = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (PAGE_OPTIONS.includes(head as any)) {
    return {
      ...state,
      theme: { ...state.theme, page: head as PageOption },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processVibe = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (VIBE_OPTIONS.includes(head as any)) {
    return {
      ...state,
      theme: { ...state.theme, vibe: head as VibeOption },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processColor = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (COLOR_OPTIONS.includes(head as any)) {
    return {
      ...state,
      theme: { ...state.theme, color: head as ColorOption },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processTense = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (TENSE_OPTIONS.includes(head as any)) {
    return {
      ...state,
      theme: { ...state.theme, tense: head as TenseOption },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processVerbosity = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (VERBOSITY_OPTIONS.includes(head as any)) {
    return {
      ...state,
      theme: { ...state.theme, verbosity: head as VerbosityOption },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processFramework = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (FRAMEWORK_OPTIONS.includes(head as any)) {
    return {
      ...state,
      deploymentConfiguration: {
        ...state.deploymentConfiguration,
        framework: head as FrameworkOption,
      },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processTarget = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (TARGET_OPTIONS.includes(head as any)) {
    return {
      ...state,
      deploymentConfiguration: {
        ...state.deploymentConfiguration,
        target: head as TargetOption,
      },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

const processSource = (state: ParserState): ParserState => {
  const head = state.remainingSlug[0];
  if (SOURCE_OPTIONS.includes(head as any)) {
    return {
      ...state,
      deploymentConfiguration: {
        ...state.deploymentConfiguration,
        source: head as SourceOption,
      },
      remainingSlug: state.remainingSlug.slice(1),
    };
  }
  return state;
};

export default function pathParser(slug?: string[]) {
  const theme: Theme = {
    page: "not-found",
    vibe: "standard",
    color: "light",
    tense: "first-person",
    verbosity: "medium",
  };

  const deploymentConfiguration: DeploymentConfiguration = {
    framework: "angular-ssr",
    target: "cloud-run",
    source: "local",
  };

  if (!slug) return { theme, deploymentConfiguration, remainingSlug: [] };

  const initialState: ParserState = {
    theme,
    deploymentConfiguration,
    remainingSlug: [...slug],
  };

  const pipeline = pipe(
    Effect.succeed(initialState),
    Effect.map(processIndex),
    Effect.map(processPage),
    Effect.map(processVibe),
    Effect.map(processColor),
    Effect.map(processTense),
    Effect.map(processVerbosity),
    Effect.map(processFramework),
    Effect.map(processTarget),
    Effect.map(processSource),
  );

  return Effect.runSync(pipeline);
}
