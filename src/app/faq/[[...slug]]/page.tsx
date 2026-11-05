import FaqPage from "../../components/pages/faq-page";
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
    title: "FAQ | Luke Schlangen",
    description: "Frequently asked questions about Luke Schlangen.",
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
    <FaqPage
      theme={{ ...theme, page: "faq" }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
