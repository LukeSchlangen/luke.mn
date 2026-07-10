# Effect.ts v4.0 Migration Plan

This document outlines the introduction and migration of application logic to Effect v4 (`4.0.0-beta.97`), the modern TypeScript standard library for building production-grade software in 2026.

## What is Effect?
Effect provides a unified, highly-optimized standard library for TypeScript. It simplifies building pipelines, handling errors functionally, and orchestrating complex tasks without relying on exceptions or mutations.

## Why Migrate to Effect v4 in this Project?
While this personal portfolio does not perform complex network or database operations, migrating our core theme and configuration parsing logic to Effect offers several benefits:
- **Declarative Operations:** Eliminates complex `if-else` branching and mutation logic.
- **Stronger Typing:** Better type inference and functional pipeline models.
- **Robust Schema Parsing:** Future-proofing parsing using standard Functional Programming paradigms.

## Migration Design: Path Parser (`path-parser.ts`)

Currently, `pathParser` manually checks and shifts parts of the `slug` array to populate theme toggles and deployment choices.

We will refactor this using Effect v4:
1. Wrap the slug array and intermediate state inside an immutable object.
2. Build an Effect pipeline that processes theme components sequentially (page, vibe, color, tense, verbosity, framework, target, source) using Effect operators.
3. Run the Effect synchronously using `Effect.runSync` to retrieve the parsed configuration.

## Migration Steps

1. **Add Dependency:**
   Install `effect` at version `4.0.0-beta.97`.

2. **Refactor `src/app/utils/path-parser.ts`:**
   - Import necessary modules from `"effect"`.
   - Implement the parsing logic as a functional pipeline.
   - Retain the signature `pathParser(slug?: string[])` so that Next.js pages require no breaking API changes.

3. **Verify:**
   Verify code compiles correctly and runs identical logic across all slug combinations.
