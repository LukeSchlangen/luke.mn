# TypeScript 7.0 Migration Plan

This document outlines the migration of the Luke Schlangen Portfolio website to TypeScript 7.0, leveraging the major advancements introduced in the 2026 release of TypeScript.

## Key Changes in TypeScript 7.0

### 1. High Performance Native Port (tsc in Go)
TypeScript 7.0 introduces a native compiler written in Go, offering significant speed improvements:
- **Build Speeds:** 8x to 12x faster overall build compilation times.
- **Memory Consumption:** Substantial reduction in peak memory consumption.
- **Multithreading:** Introduces parallel parsing, type-checking, and emitting.
- **Watch Mode:** Replaced file watcher with a robust implementation based on Parcel's watcher, resulting in a dramatic reduction in idle CPU usage.

### 2. Side-by-Side Compatibility Strategy (TS 6 & TS 7)
Because TypeScript 7.0 does not ship with a stable programmatic compiler API (to be introduced in v7.1), major tools (like Next.js and ESLint/typescript-eslint) require programmatic access to the compiler.

Following the canonical TypeScript team recommendations, we configure a side-by-side environment using npm aliases:
- `@typescript/native`: Installs `typescript` at `^7.0.2` (native TS 7 compiler). This provides the `tsc` binary (accessible via `npx tsc`).
- `typescript`: Aliased to `@typescript/typescript6@^6.0.2` (compatible TS 6 compiler API). This ensures Next.js and other tools can import the compiler API without errors.

### 3. Breaking Changes & Deprecations
The following legacy configurations are no longer supported in TS 7 and produce hard errors:
- **Target `es5`:** Support for compiling directly to ES5 has been removed. We must upgrade `target` to at least `es2022` or `esnext`.
- **Module Resolution `node` (Node10):** Support has been dropped. Maintainers are directed to use `bundler` or `nodenext`.
- **Defaults:**
  - `strict` is now `true` by default.
  - `module` is `esnext` by default.
  - `noUncheckedSideEffectImports` is `true` by default.
  - `rootDir` defaults to `./` instead of nested inner source folders.
  - `types` defaults to `[]` instead of auto-including all `@types` packages.

## Migration Steps for this Repository

1. **Update `package.json` with npm Aliases:**
   ```json
   {
     "devDependencies": {
       "@typescript/native": "npm:typescript@^7.0.2",
       "typescript": "npm:@typescript/typescript6@^6.0.2"
     }
   }
   ```

2. **Modify `tsconfig.json`:**
   - Change `"target": "es5"` to `"target": "es2022"`.
   - Change `"moduleResolution": "node"` to `"moduleResolution": "bundler"`.
   - Ensure `"strict": true` is explicitly configured.
   - Set `"types": ["node"]` to explicitly load required node types.

3. **Compilation Verification:**
   Run `pnpm tsc --noEmit` to ensure compatibility and verify all source files compile cleanly on native TypeScript 7.0.2.
