import { Theme } from "../../types";
import HomePage from "../../components/pages/home-page";
import pathParser from "../../utils/path-parser";
import NotFoundPage from "../../components/pages/not-found-page";
import { Metadata } from "next";
import { getSlugsForPage } from "../../utils/static-params";

export async function generateStaticParams() {
  const slugs = getSlugsForPage();
  return slugs.map((slug) => ({ slug }));
}

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
