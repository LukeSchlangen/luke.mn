import HomePage from "../../components/pages/home-page";
import pathParser from "../../utils/path-parser";
import NotFoundPage from "../../components/pages/not-found-page";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SHORT_LINKS } from "../../components/pages/short-page";

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
    title: "Luke Schlangen | Lead AI Builder Advocate",
    description:
      "Luke Schlangen's personal website. Developer Advocate at Google focused on builders, helping people turn ideas into real, helpful tools with Google AI Studio, Firebase, and Cloud Run.",
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

  if (
    remainingSlug.length === 1 &&
    Object.hasOwn(SHORT_LINKS, remainingSlug[0])
  ) {
    redirect(SHORT_LINKS[remainingSlug[0]]);
  }

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
