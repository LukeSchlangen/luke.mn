# Architectural Blueprint: Migrating to Effect & Effect Schema

This document provides a comprehensive, production-ready architectural blueprint to migrate this Next.js 16 portfolio and quiz codebase to **Effect**, including migrating any existing type checks, schemas, and validators to **Effect Schema** (`@effect/schema`).

---

## 1. Executive Summary & Why Effect?

While TypeScript provides static compilation safety, web applications inevitably interact with runtime uncertainty (dynamic URL routes, user-configured forms, and external client API integrations).

Integrating **Effect** and **Effect Schema** into this Next.js codebase delivers several key advantages:

| Feature                  | Legacy / Manual TS Approach                                    | Zod Approach                                                              | Effect + Effect Schema Approach                                                                            |
| :----------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| **Parsing & Validation** | Hand-written type guards and `Array.includes` checks.          | Robust runtime schemas; returns throwing errors or unsafe result objects. | Highly performant runtime schemas; integrates natively with Effect pipelines.                              |
| **Error Handling**       | Untracked exceptions, try/catch blocks, implicit `any` errors. | Throwing or `safeParse` result branches.                                  | Fully type-safe errors mapped explicitly in the function signature `Effect<Success, Error, Requirements>`. |
| **Dependency Injection** | Manual prop-drilling or React Context.                         | Class-based or manual module-level singletons.                            | Native, composable `Layer` and `Context` mechanisms for clean separation of concerns.                      |
| **Asynchronous Flow**    | Promises, async/await with fragile concurrency control.        | Promises with manual race-conditions or abort controllers.                | High-performance fibers, native timeout/retry policies, and declarative concurrency.                       |

This blueprint guides the team in transitioning manual slug parsing (`path-parser.ts`), structural static definitions (`types/index.ts`), and route configurations into a cohesive, type-safe functional architecture.

---

## 2. Dependency and Workspace Changes

To support Effect and `@effect/schema` in this project, add the necessary packages and adjust the compiler settings.

### 2.1 Dependencies Installation

Run the following commands to add the packages to your monorepo/workspace:

```bash
pnpm add effect @effect/schema
```

### 2.2 Compiler & TS Config Alignment

Ensure that `tsconfig.json` supports modern module resolution and strict checks required for Effect:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true
  }
}
```

---

## 3. Structural Type & Schema Migration

Let's convert our custom types and options in `src/app/types/index.ts` into native `@effect/schema` representation. This gives us both Compile-Time types and Runtime validations.

### 3.1 Constants and Option Litmus Schemas

#### Before (TypeScript manual declarations):

```typescript
export const PAGE_OPTIONS = [
  "home",
  "faq",
  "deploy",
  "short",
  "not-found",
  "qr",
  "quiz",
] as const;
export type PageOption = (typeof PAGE_OPTIONS)[number];

export const VIBE_OPTIONS = ["standard", "professional", "fun"] as const;
export type VibeOption = (typeof VIBE_OPTIONS)[number];

// ... (other options)
```

#### After (Effect Schema):

```typescript
import { Schema } from "@effect/schema";

export const PageOption = Schema.Union(
  Schema.Literal("home"),
  Schema.Literal("faq"),
  Schema.Literal("deploy"),
  Schema.Literal("short"),
  Schema.Literal("not-found"),
  Schema.Literal("qr"),
  Schema.Literal("quiz"),
);
export type PageOption = Schema.Schema.Type<typeof PageOption>;

export const VibeOption = Schema.Union(
  Schema.Literal("standard"),
  Schema.Literal("professional"),
  Schema.Literal("fun"),
);
export type VibeOption = Schema.Schema.Type<typeof VibeOption>;

export const ColorOption = Schema.Union(
  Schema.Literal("light"),
  Schema.Literal("dark"),
);
export type ColorOption = Schema.Schema.Type<typeof ColorOption>;

export const TenseOption = Schema.Union(
  Schema.Literal("first-person"),
  Schema.Literal("third-person"),
);
export type TenseOption = Schema.Schema.Type<typeof TenseOption>;

export const VerbosityOption = Schema.Union(
  Schema.Literal("short"),
  Schema.Literal("medium"),
  Schema.Literal("long"),
);
export type VerbosityOption = Schema.Schema.Type<typeof VerbosityOption>;
```

### 3.2 Main Theme Struct

We can aggregate individual schemas into a consolidated object schema (`Schema.Struct`).

#### Before:

```typescript
export type Theme = {
  page: PageOption;
  vibe: VibeOption;
  color: ColorOption;
  tense: TenseOption;
  verbosity: VerbosityOption;
};
```

#### After:

```typescript
export const ThemeSchema = Schema.Struct({
  page: PageOption,
  vibe: VibeOption,
  color: ColorOption,
  tense: TenseOption,
  verbosity: VerbosityOption,
});
export type Theme = Schema.Schema.Type<typeof ThemeSchema>;
```

---

## 4. Migrating Path Parsing to Effect

Currently, `path-parser.ts` manually processes slugs and returns a theme configuration. This manual indexing and mutating is prone to error. We can re-engineer this process into a composable Effect stream, giving us standard schema-based transformations.

Let's model the parsing process as an **Effect pipeline** that safely parses the URL slug.

### 4.1 Schema-Based Option Matchers

To parse options safely from a string list, we can define direct parsers using `@effect/schema` or simple helper logic:

```typescript
import { Schema } from "@effect/schema";
import { Effect, Option } from "effect";

// Helper to safely parse and advance a slug array
export const consumeOption = <A>(
  slugs: string[],
  schema: Schema.Schema<A, string>,
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
```

### 4.2 Rebuilding `pathParser` using Effect

Let's map out the `pathParser` transformation using functional primitives. If an option is present, we consume it and apply it to our theme object; otherwise, we return defaults.

```typescript
import { Schema } from "@effect/schema";
import { Effect, Option } from "effect";
import {
  PageOption,
  VibeOption,
  ColorOption,
  TenseOption,
  VerbosityOption,
  ThemeSchema,
  Theme,
} from "../types";

export interface PathParserResult {
  theme: Theme;
  remainingSlug: string[];
}

export const parseSlugEffect = (
  slug?: string[],
): Effect.Effect<PathParserResult, never, never> => {
  return Effect.gen(function* () {
    const remaining = slug ? [...slug] : [];

    // Default Fallback state
    const currentTheme: Theme = {
      page: "not-found",
      vibe: "standard",
      color: "light",
      tense: "first-person",
      verbosity: "medium",
    };

    let workingSlugs = remaining;

    // Handle 'index' root route slug
    if (workingSlugs[0] === "index") {
      currentTheme.page = "home";
      workingSlugs = workingSlugs.slice(1);
    }

    // Sequentially decode PageOption
    const pageCons = consumeOption(workingSlugs, PageOption);
    if (Option.isSome(pageCons.result)) {
      currentTheme.page = pageCons.result.value;
      workingSlugs = pageCons.remaining;
    }

    // Sequentially decode VibeOption
    const vibeCons = consumeOption(workingSlugs, VibeOption);
    if (Option.isSome(vibeCons.result)) {
      currentTheme.vibe = vibeCons.result.value;
      workingSlugs = vibeCons.remaining;
    }

    // Sequentially decode ColorOption
    const colorCons = consumeOption(workingSlugs, ColorOption);
    if (Option.isSome(colorCons.result)) {
      currentTheme.color = colorCons.result.value;
      workingSlugs = colorCons.remaining;
    }

    // Sequentially decode TenseOption
    const tenseCons = consumeOption(workingSlugs, TenseOption);
    if (Option.isSome(tenseCons.result)) {
      currentTheme.tense = tenseCons.result.value;
      workingSlugs = tenseCons.remaining;
    }

    // Sequentially decode VerbosityOption
    const verbosityCons = consumeOption(workingSlugs, VerbosityOption);
    if (Option.isSome(verbosityCons.result)) {
      currentTheme.verbosity = verbosityCons.result.value;
      workingSlugs = verbosityCons.remaining;
    }

    return {
      theme: currentTheme,
      remainingSlug: workingSlugs,
    };
  });
};
```

This ensures our logic is extremely robust, has no unhandled errors, and utilizes schema definitions at runtime.

---

## 5. Integrating Effect with Next.js 16 (App Router)

To integrate Effect with Next.js 16, we want a clean execution context. Next.js pages are mostly asynchronous components or client components.

### 5.1 Next.js Server Components Execution

Server components can natively resolve and execute effects using `Effect.runPromise`:

```tsx
// src/app/quiz/[[...slug]]/page.tsx
import { parseSlugEffect } from "@/app/utils/path-parser";
import { Effect } from "effect";
import QuizPageClient from "@/app/components/pages/quiz-page";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Execute Effect to resolve Theme configuration
  const { theme, remainingSlug } = await Effect.runPromise(
    parseSlugEffect(slug),
  );

  return <QuizPageClient initialTheme={theme} remainingSlug={remainingSlug} />;
}
```

### 5.2 Next.js Route Handlers (APIs) with Layer Injection

For backend services, like resolving FAQs or saving user configurations, we can define **Services** and **Layers** to inject database connectors or logging.

Let's define a service interface for fetching site FAQs:

```typescript
// src/app/services/faq.ts
import { Context, Effect, Layer } from "effect";

export interface FaqService {
  readonly getFaqs: () => Effect.Effect<string[], Error, never>;
}

export const FaqService = Context.GenericTag<FaqService>("FaqService");

// Live implementation
export const FaqServiceLive = Layer.succeed(
  FaqService,
  FaqService.of({
    getFaqs: () =>
      Effect.succeed([
        "What is Google Cloud Run?",
        "How do I deploy this layout?",
        "Is WebMCP supported site-wide?",
      ]),
  }),
);
```

Then, in Next.js API Routes (Route Handlers), resolve this program cleanly:

```typescript
// src/app/api/faqs/route.ts
import { Effect } from "effect";
import { FaqService, FaqServiceLive } from "@/app/services/faq";
import { NextResponse } from "next/server";

export async function GET() {
  const program = Effect.gen(function* () {
    const faqService = yield* FaqService;
    return yield* faqService.getFaqs();
  }).pipe(Effect.provide(FaqServiceLive));

  try {
    const faqs = await Effect.runPromise(program);
    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to resolve FAQs" },
      { status: 500 },
    );
  }
}
```

---

## 6. Incremental Migration & Rollout Strategy

A full rewrite can introduce regressions. We recommend a phased approach:

### Phase 1: Dual Types & Schema Coexistence

- Install `@effect/schema` and `effect`.
- Port simple domain configurations (`PageOption`, `VibeOption`, etc.) to `@effect/schema` and export their TypeScript types.
- Ensure existing files use these new types without changes to their logical loops.

### Phase 2: Schema Parsing in Utility Functions

- Migrate `pathParser` to use `@effect/schema` decoding under the hood, wrapping it with `Effect.runSync`.
- This ensures zero change is needed to consumer files while strengthening path validation.

### Phase 3: Layer-based Service Extraction

- Extract static data providers (such as lists of frameworks or deployment options) into Effect `Layer`s.
- This allows dynamic testing and mocking of responses.

---

## 7. Conclusion

By adopting this architectural blueprint, the portfolio website gains robust, state-of-the-art type and runtime validation, resilient asynchronous processing, and a maintainable service injection layer. Both the quiz interactive experiences and standard layouts will run on a deterministic, fully-typed engine.
