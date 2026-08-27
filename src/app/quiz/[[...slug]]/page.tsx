import QuizPageClient from "../../components/pages/quiz-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";
import { Metadata } from "next";

const TOPIC_NAMES: Record<string, string> = {
  "agentic-harness": "Agentic Harness",
  "cloud-digital-leader": "Cloud Digital Leader",
  "associate-cloud-engineer": "Associate Cloud Engineer",
  "professional-cloud-architect": "Professional Cloud Architect",
  "professional-data-engineer": "Professional Data Engineer",
  "professional-cloud-security-engineer":
    "Professional Cloud Security Engineer",
  "ai-token-economics": "AI Token Economics (FinOps)",
  "ai-token-economics-finops": "AI Token Economics (FinOps)",
};

export async function generateMetadata({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { theme, topic } = pathParser(params.slug);

  let icon = "/favicons/smiling-face.svg";
  if (theme.vibe === "professional") {
    icon = "/favicons/briefcase.svg";
  } else if (theme.vibe === "fun") {
    icon = "/favicons/party-popper.svg";
  }

  const topicName = topic ? TOPIC_NAMES[topic] : undefined;
  const title = topicName
    ? `${topicName} Quiz | Luke Schlangen`
    : "Interactive Quiz Creator | Luke Schlangen";
  const description = topicName
    ? `Test your knowledge on ${topicName} with interactive 9:16 presentation quizzes.`
    : "Create, format, and present interactive 9:16 quizzes designed for YouTube Shorts.";

  return {
    title,
    description,
    icons: {
      icon: icon,
    },
  };
}

export default async function Page({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await paramsPromise;
  const { theme, remainingSlug, deploymentConfiguration, topic } = pathParser(
    params.slug,
  );

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
  return (
    <QuizPageClient
      theme={{ ...theme, page: "quiz" }}
      deploymentConfiguration={deploymentConfiguration}
      initialTopic={topic}
    />
  );
}
