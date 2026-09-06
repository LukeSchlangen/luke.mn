import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";
import {
  getLatestSnapshot,
  getSnapshot,
  getSnapshotDates,
  TRENDING_SNAPSHOTS,
  LATEST_SNAPSHOT_DATE,
  TrendingTopic,
} from "../../trending/data";

export interface TrendingPageProps {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  mode?: "latest" | "history" | "snapshot";
  snapshotDate?: string;
}

export default function TrendingPage({
  theme,
  deploymentConfiguration,
  mode = "latest",
  snapshotDate,
}: TrendingPageProps) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);
  const allSnapshotDates = getSnapshotDates();

  // Mode: History view
  if (mode === "history") {
    return (
      <div className={`w-full min-h-screen ${textColorClass}`}>
        <style>{`body { background-color: ${bodyBackgroundColor} }`}</style>
        <Navbar
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
        <div className="m-auto max-w-prose">
          <header className="my-16">
            <ProseContainer theme={theme}>
              <div className="mb-4">
                <Link
                  href="/trending"
                  className="inline-flex items-center text-sm opacity-80 hover:opacity-100 hover:underline gap-1"
                >
                  &larr; Back to Latest Trending Topics
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="m-2 text-4xl">Trending Topics History</h1>
                <span className="rounded bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-500 border border-amber-500/30">
                  Vault Archives
                </span>
              </div>
              <h2 className="m-2">
                A historical log of trending technical topics and content idea
                snapshots over time.
              </h2>
            </ProseContainer>
          </header>
          <main className="space-y-6">
            <ProseContainer theme={theme}>
              <div className="space-y-4">
                {allSnapshotDates.map((date) => {
                  const snapshot = TRENDING_SNAPSHOTS[date];
                  const isLatest = date === LATEST_SNAPSHOT_DATE;
                  return (
                    <div
                      key={date}
                      className="border p-5 space-y-3 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">{date}</span>
                          {isLatest ? (
                            <span className="rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold">
                              Current
                            </span>
                          ) : (
                            <span className="rounded bg-gray-500/20 text-gray-400 border border-gray-500/30 px-2 py-0.5 text-xs font-semibold">
                              Archived
                            </span>
                          )}
                        </div>
                        <span className="text-xs rounded border px-2 py-0.5 opacity-80">
                          {snapshot.topics.length} Topics
                        </span>
                      </div>
                      <p className="text-sm opacity-90 leading-relaxed">
                        {snapshot.description}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/trending/${date}`}
                          className="text-sm font-semibold hover:underline flex items-center gap-1"
                        >
                          View Snapshot &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ProseContainer>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine active snapshot for snapshot or latest mode
  const targetDate = mode === "snapshot" ? snapshotDate : LATEST_SNAPSHOT_DATE;
  const snapshot =
    (targetDate ? getSnapshot(targetDate) : undefined) || getLatestSnapshot();
  const isHistorical = snapshot.date !== LATEST_SNAPSHOT_DATE;

  // Maximum of 5 topics enforced for latest view
  const displayTopics: TrendingTopic[] =
    mode === "latest" ? snapshot.topics.slice(0, 5) : snapshot.topics;

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <style>{`body { background-color: ${bodyBackgroundColor} }`}</style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            {isHistorical && (
              <div className="mb-4 flex items-center justify-between text-sm">
                <Link
                  href="/trending"
                  className="opacity-80 hover:opacity-100 hover:underline"
                >
                  &larr; Back to Current Trending
                </Link>
                <Link
                  href="/trending/history"
                  className="opacity-80 hover:opacity-100 hover:underline"
                >
                  View All History &rarr;
                </Link>
              </div>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="m-2 text-4xl">
                {isHistorical
                  ? `Trending Topics (${snapshot.date})`
                  : "Trending Topics"}
              </h1>
              <span className="rounded bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-500 border border-amber-500/30">
                {isHistorical ? "Historical Snapshot" : "Luke's Idea Vault"}
              </span>
              <Link
                href="/trending/history"
                className="rounded bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/30 hover:underline flex items-center gap-1"
              >
                📜 History
              </Link>
            </div>
            <h2 className="m-2">
              {snapshot.description}
            </h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-6">
              {displayTopics.map((topic) => (
                <details
                  key={topic.id}
                  open
                  className="space-y-4 border p-4 transition-colors"
                >
                  <summary className="cursor-pointer text-xl font-bold flex flex-wrap items-center justify-between gap-2 list-none">
                    <span className="flex items-center gap-2">
                      <span>{topic.title}</span>
                      <CopyLinkIcon id={topic.id} />
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded border px-2 py-0.5 opacity-80">
                        {topic.category}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 font-semibold ${
                          topic.status === "Hot"
                            ? "bg-red-500/20 text-red-500 border border-red-500/30"
                            : topic.status === "Emerging"
                            ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                        }`}
                      >
                        {topic.status}
                      </span>
                    </div>
                  </summary>

                  <p className="text-sm opacity-90 leading-relaxed mt-2">
                    {topic.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-dashed border-current/20">
                    <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">
                      Key Technical Focus:
                    </h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
                      {topic.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-dashed border-current/20">
                    <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70">
                      Potential Content Ideas:
                    </h4>
                    <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
                      {topic.contentIdeas.map((idea, i) => (
                        <li key={i} className="font-medium">
                          &ldquo;{idea}&rdquo;
                        </li>
                      ))}
                    </ul>
                  </div>

                  {topic.sourceUrl && (
                    <div className="pt-2 border-t border-dashed border-current/20 text-xs opacity-75">
                      <span className="font-medium">Web Grounding: </span>
                      <a
                        href={topic.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-100"
                      >
                        {topic.sourceUrl}
                      </a>
                    </div>
                  )}
                </details>
              ))}
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
