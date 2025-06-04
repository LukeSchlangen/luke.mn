import DeployPage from "../../components/pages/deploy-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";

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
        deploymentConfiguration={deploymentConfiguration}
        remainingSlug={remainingSlug}
        slug={params.slug}
      />
    );
  }
  return (
    <DeployPage
      theme={{ ...theme, page: "deploy" }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
