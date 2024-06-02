import FaqPage from "../../components/pages/faq-page";
import NotFoundPage from "../../components/pages/not-found-page";
import pathParser from "../../utils/path-parser";

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
    <FaqPage
      theme={{ ...theme, page: "faq" }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
