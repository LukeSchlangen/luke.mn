import { TrendingSnapshot } from "../types";

/**
 * Dynamic module loader for Trending Snapshots.
 *
 * To add a new trending snapshot:
 * Simply create a new file in `src/app/trending/snapshots/YYYY-MM-DD.ts`.
 * Do NOT modify index.ts!
 *
 * `require.context` automatically imports all date snapshot files matching
 * `YYYY-MM-DD.ts` at build time. This ensures that any number of snapshots
 * can be added across multiple feature branches without causing merge conflicts.
 */

interface RequireContext {
  keys(): string[];
  (id: string): Record<string, unknown>;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once"
  ): RequireContext;
}

declare const require: NodeRequire;

function isTrendingSnapshot(val: unknown): val is TrendingSnapshot {
  return (
    val !== null &&
    typeof val === "object" &&
    "date" in val &&
    "topics" in val &&
    Array.isArray((val as TrendingSnapshot).topics)
  );
}

function loadSnapshots(): TrendingSnapshot[] {
  const context = require.context(".", false, /^\.\/\d{4}-\d{2}-\d{2}\.ts$/);
  const snapshots: TrendingSnapshot[] = [];

  for (const key of context.keys()) {
    const mod = context(key);
    const candidate = isTrendingSnapshot(mod.default)
      ? mod.default
      : Object.values(mod).find(isTrendingSnapshot);

    if (candidate) {
      snapshots.push(candidate);
    }
  }

  // Sort snapshots by date descending (latest date first)
  return snapshots.sort((a, b) => b.date.localeCompare(a.date));
}

export const ALL_SNAPSHOTS: TrendingSnapshot[] = loadSnapshots();
