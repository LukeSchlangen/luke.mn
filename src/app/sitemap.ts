import { MetadataRoute } from "next";
import { QUIZ_TOPIC_SLUGS } from "./utils/path-parser";
import { getSnapshotDates } from "./trending/data";

const BASE_URL = "https://www.luke.mn";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/faq",
    "/deploy",
    "/links",
    "/qr",
    "/quiz",
    "/trending",
    "/trending/history",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route.startsWith("/trending") ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const quizEntries: MetadataRoute.Sitemap = QUIZ_TOPIC_SLUGS.map((slug) => ({
    url: `${BASE_URL}/quiz/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const trendingEntries: MetadataRoute.Sitemap = getSnapshotDates().map(
    (date) => ({
      url: `${BASE_URL}/trending/${date}`,
      lastModified: new Date(`${date}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...quizEntries, ...trendingEntries];
}
