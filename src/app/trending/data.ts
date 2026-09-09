import { TrendingTopic, TrendingSnapshot } from "./types";
import { ALL_SNAPSHOTS } from "./snapshots";

export type { TrendingTopic, TrendingSnapshot };

export const TRENDING_SNAPSHOTS: Record<string, TrendingSnapshot> =
  ALL_SNAPSHOTS.reduce(
    (acc, snapshot) => {
      acc[snapshot.date] = snapshot;
      return acc;
    },
    {} as Record<string, TrendingSnapshot>,
  );

export const LATEST_SNAPSHOT_DATE: string = Object.keys(TRENDING_SNAPSHOTS).sort(
  (a, b) => b.localeCompare(a),
)[0] || "";

export function getLatestSnapshot(): TrendingSnapshot {
  return TRENDING_SNAPSHOTS[LATEST_SNAPSHOT_DATE];
}

export function getSnapshot(date: string): TrendingSnapshot | undefined {
  return TRENDING_SNAPSHOTS[date];
}

export function getSnapshotDates(): string[] {
  return Object.keys(TRENDING_SNAPSHOTS).sort((a, b) => b.localeCompare(a));
}
