import { TrendingSnapshot } from "../types";
import { snapshot20260911 } from "./2026-09-11";
import { snapshot20260910 } from "./2026-09-10";
import { snapshot20260909 } from "./2026-09-09";
import { snapshot20260907 } from "./2026-09-07";
import { snapshot20260905 } from "./2026-09-05";
import { snapshot20260903 } from "./2026-09-03";
import { snapshot20260901 } from "./2026-09-01";
import { snapshot20260508 } from "./2026-05-08";

/**
 * CONFLICT MINIMIZATION GUIDELINES FOR ADDING NEW SNAPSHOTS:
 * 1. Create a new file in `src/app/trending/snapshots/YYYY-MM-DD.ts`.
 * 2. Import your snapshot here in `index.ts`.
 * 3. Add your snapshot export to `ALL_SNAPSHOTS` below.
 *
 * Leaving spaced comment buffers or placing imports/array entries in distinct
 * sections prevents multi-branch git merge conflicts.
 */

// --- SNAPSHOT IMPORTS (RECENT) ---
// Reserved space for new 2026+ snapshot imports across feature branches:
// [Branch slot A]: import { snapshotYYYYMMDD } from "./YYYY-MM-DD";
// [Branch slot B]: import { snapshotYYYYMMDD } from "./YYYY-MM-DD";

export const ALL_SNAPSHOTS: TrendingSnapshot[] = [
  // --- RECENT SNAPSHOTS ---
  snapshot20260911,
  snapshot20260910,
  snapshot20260909,
  snapshot20260907,
  snapshot20260905,
  snapshot20260903,
  snapshot20260901,

  // --- HISTORICAL ARCHIVES ---
  snapshot20260508,

  // Reserved buffer for additional historical or parallel feature branch snapshots
];
