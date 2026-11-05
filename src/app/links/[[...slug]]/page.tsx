import LinksPage from "../../components/pages/links-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";
import { Metadata } from "next";
import { buildPageMetadata } from "../../utils/metadata";

export async function generateMetadata({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { theme } = pathParser(params.slug);

  return buildPageMetadata({
    title: "Links | Luke Schlangen",
    description: "A list of short links that redirect to other pages.",
    vibe: theme.vibe,
  });
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
    <LinksPage
      theme={{ ...theme, page: "links" }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
