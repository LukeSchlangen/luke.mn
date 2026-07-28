import { Schema } from "effect";
import { Effect, Option } from "effect";
import {
  PageOptionSchema,
  VibeOptionSchema,
  ColorOptionSchema,
  TenseOptionSchema,
  VerbosityOptionSchema,
  FrameworkOptionSchema,
  TargetOptionSchema,
  SourceOptionSchema,
  Theme,
  DeploymentConfiguration,
  PageOption,
  VibeOption,
  ColorOption,
  TenseOption,
  VerbosityOption,
  FrameworkOption,
  TargetOption,
  SourceOption,
} from "../types";

export interface PathParserResult {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  remainingSlug: string[];
}

// Helper to safely parse and advance a slug array
export const consumeOption = <A>(
  slugs: string[],
  schema: Schema.Schema<A, any, never>,
): { result: Option.Option<A>; remaining: string[] } => {
  if (slugs.length === 0) {
    return { result: Option.none(), remaining: slugs };
  }

  const current = slugs[0];
  const decodeResult = Schema.decodeUnknownOption(schema)(current);

  if (Option.isSome(decodeResult)) {
    return { result: decodeResult, remaining: slugs.slice(1) };
  }

  return { result: Option.none(), remaining: slugs };
};

export const parseSlugEffect = (
  slug?: string[],
): Effect.Effect<PathParserResult, never, never> => {
  return Effect.gen(function* () {
    const remaining = slug ? [...slug] : [];

    const theme = {
      page: "not-found" as PageOption,
      vibe: "standard" as VibeOption,
      color: "light" as ColorOption,
      tense: "first-person" as TenseOption,
      verbosity: "medium" as VerbosityOption,
    };

    const deploymentConfiguration = {
      framework: "angular-ssr" as FrameworkOption,
      target: "cloud-run" as TargetOption,
      source: "local" as SourceOption,
    };

    let workingSlugs = remaining;

    // Handle 'index' root route slug
    if (workingSlugs[0] === "index") {
      theme.page = "home";
      workingSlugs = workingSlugs.slice(1);
    }

    // Sequentially decode each option
    const pageCons = consumeOption(workingSlugs, PageOptionSchema);
    if (Option.isSome(pageCons.result)) {
      theme.page = pageCons.result.value as PageOption;
      workingSlugs = pageCons.remaining;
    }

    const vibeCons = consumeOption(workingSlugs, VibeOptionSchema);
    if (Option.isSome(vibeCons.result)) {
      theme.vibe = vibeCons.result.value as VibeOption;
      workingSlugs = vibeCons.remaining;
    }

    const colorCons = consumeOption(workingSlugs, ColorOptionSchema);
    if (Option.isSome(colorCons.result)) {
      theme.color = colorCons.result.value as ColorOption;
      workingSlugs = colorCons.remaining;
    }

    const tenseCons = consumeOption(workingSlugs, TenseOptionSchema);
    if (Option.isSome(tenseCons.result)) {
      theme.tense = tenseCons.result.value as TenseOption;
      workingSlugs = tenseCons.remaining;
    }

    const verbosityCons = consumeOption(workingSlugs, VerbosityOptionSchema);
    if (Option.isSome(verbosityCons.result)) {
      theme.verbosity = verbosityCons.result.value as VerbosityOption;
      workingSlugs = verbosityCons.remaining;
    }

    const frameworkCons = consumeOption(workingSlugs, FrameworkOptionSchema);
    if (Option.isSome(frameworkCons.result)) {
      deploymentConfiguration.framework = frameworkCons.result
        .value as FrameworkOption;
      workingSlugs = frameworkCons.remaining;
    }

    const targetCons = consumeOption(workingSlugs, TargetOptionSchema);
    if (Option.isSome(targetCons.result)) {
      deploymentConfiguration.target = targetCons.result.value as TargetOption;
      workingSlugs = targetCons.remaining;
    }

    const sourceCons = consumeOption(workingSlugs, SourceOptionSchema);
    if (Option.isSome(sourceCons.result)) {
      deploymentConfiguration.source = sourceCons.result.value as SourceOption;
      workingSlugs = sourceCons.remaining;
    }

    return {
      theme,
      deploymentConfiguration,
      remainingSlug: workingSlugs,
    };
  });
};

export default function pathParser(slug?: string[]) {
  return Effect.runSync(parseSlugEffect(slug));
}
