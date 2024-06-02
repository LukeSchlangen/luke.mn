import { Theme } from "../../types";
import HomePage from "../../components/pages/home-page";
import pathParser from "../../utils/path-parser";
import NotFoundPage from "../../components/pages/not-found-page";

export default function Page({
  params = { slug: [] },
}: {
  params: { slug: string[] };
}) {
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
