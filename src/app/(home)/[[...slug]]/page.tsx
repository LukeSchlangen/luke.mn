import { Theme } from "../../types";
import HomePage from "../../components/pages/home-page";
import pathParser from "../../utils/path-parser";
import NotFoundPage from "../../components/pages/not-found-page";
import { Metadata } from "next";

export async function generateMetadata({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { theme } = pathParser(params.slug);

  let icon = "/favicons/smiling-face.svg";
  if (theme.vibe === "professional") {
    icon = "/favicons/briefcase.svg";
  } else if (theme.vibe === "fun") {
    icon = "/favicons/party-popper.svg";
  }

  return {
    title:
      theme.vibe === "professional"
        ? "Luke Schlangen | Professional Portfolio"
        : theme.vibe === "fun"
          ? "Luke Schlangen | 🎉 Let's build something!"
          : "Luke Schlangen | Developer Advocate",
    description:
      "The personal website of Luke Schlangen, a Developer Advocate at Google and Co-Founder of Code Championship.",
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
  const { theme, remainingSlug, deploymentConfiguration } = pathParser(
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
    <HomePage
      theme={{ ...theme, page: "home" }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
