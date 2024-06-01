import DeployPage from "../../components/pages/deploy-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";

export default function Page({
  params = { slug: [] },
}: {
  params: { slug: string[] };
}) {
  const { theme, remainingSlug, deploymentConfiguration } = pathParser(
    params.slug
  );

  if (remainingSlug.length > 0) {
    return (
      <NotFoundPage
        theme={{ ...theme, page: "not-found" }}
        deploymentConfiguration={deploymentConfiguration}
        remainingSlug={remainingSlug}
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
