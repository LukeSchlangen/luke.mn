import TrendingPage from "../../components/pages/trending-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";
import { getSnapshot } from "../data";
import { Metadata } from "next";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function generateMetadata({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const rawSlugs = params.slug || [];

  const isHistory = rawSlugs.includes("history");
  const dateMatch = rawSlugs.find((s) => ISO_DATE_REGEX.test(s));

  const cleanedSlug = rawSlugs.filter(
    (s) => s !== "history" && !ISO_DATE_REGEX.test(s),
  );
  const { theme } = pathParser(cleanedSlug);

  let icon = "/favicons/smiling-face.svg";
  if (theme.vibe === "professional") {
    icon = "/favicons/briefcase.svg";
  } else if (theme.vibe === "fun") {
    icon = "/favicons/party-popper.svg";
  }

  let title = "Trending Topics | Luke Schlangen";
  let description =
    "A curated list of trending topics and content ideas relevant to Luke Schlangen's work.";

  if (isHistory) {
    title = "Trending Topics History | Luke Schlangen";
    description =
      "A historical archive of trending topics and content idea snapshots over time.";
  } else if (dateMatch) {
    title = `Trending Topics (${dateMatch}) | Luke Schlangen`;
    description = `Snapshot of trending technical topics from ${dateMatch}.`;
  }

  return {
    title,
    description,
    icons: {
      icon,
    },
  };
}

export default async function Page({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await paramsPromise;
  const rawSlugs = params.slug || [];

  const isHistory = rawSlugs.includes("history");
  const dateMatch = rawSlugs.find((s) => ISO_DATE_REGEX.test(s));

  const cleanedSlug = rawSlugs.filter(
    (s) => s !== "history" && !ISO_DATE_REGEX.test(s),
  );

  const { theme, remainingSlug, deploymentConfiguration } =
    pathParser(cleanedSlug);

  if (remainingSlug.length > 0) {
    return (
      <NotFoundPage
        theme={{ ...theme, page: "not-found" }}
        remainingSlug={remainingSlug}
        deploymentConfiguration={deploymentConfiguration}
        slug={params.slug}
      />
    );
  }

  if (dateMatch) {
    const snapshot = getSnapshot(dateMatch);
    if (!snapshot) {
      return (
        <NotFoundPage
          theme={{ ...theme, page: "not-found" }}
          remainingSlug={[dateMatch]}
          deploymentConfiguration={deploymentConfiguration}
          slug={params.slug}
        />
      );
    }
    return (
      <TrendingPage
        theme={{ ...theme, page: "trending" }}
        deploymentConfiguration={deploymentConfiguration}
        mode="snapshot"
        snapshotDate={dateMatch}
      />
    );
  }

  if (isHistory) {
    return (
      <TrendingPage
        theme={{ ...theme, page: "trending" }}
        deploymentConfiguration={deploymentConfiguration}
        mode="history"
      />
    );
  }

  return (
    <TrendingPage
      theme={{ ...theme, page: "trending" }}
      deploymentConfiguration={deploymentConfiguration}
      mode="latest"
    />
  );
}
