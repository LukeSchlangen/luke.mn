import { PageOption } from "../types";
import { cachedPathParser } from "../utils/path-parser";
import HomePage from "./pages/home-page";
import FaqPage from "./pages/faq-page";
import DeployPage from "./pages/deploy-page";
import NotFoundPage from "./pages/not-found-page";
import { Suspense } from "react";

export default async function SharedPage({
  params: paramsPromise,
  basePage,
}: {
  params: Promise<{ slug: string[] }>;
  basePage: PageOption;
}) {
  const params = await paramsPromise;
  const { theme, remainingSlug, deploymentConfiguration } =
    await cachedPathParser(params.slug);

  // If the first element of the slug is the same as the basePage,
  // it might be a redundant slug (e.g., /faq/faq).
  // However, pathParser already shifts the slug if it matches a PAGE_OPTION.
  // In our new structure, the page-specific catch-all [[...slug]] won't include the basePage in the slug
  // unless the user explicitly types it again.

  const renderPage = () => {
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

    switch (basePage) {
      case "home":
        return (
          <HomePage
            theme={{ ...theme, page: "home" }}
            deploymentConfiguration={deploymentConfiguration}
          />
        );
      case "faq":
        return (
          <FaqPage
            theme={{ ...theme, page: "faq" }}
            deploymentConfiguration={deploymentConfiguration}
          />
        );
      case "deploy":
        return (
          <DeployPage
            theme={{ ...theme, page: "deploy" }}
            deploymentConfiguration={deploymentConfiguration}
          />
        );
      default:
        return (
          <NotFoundPage
            theme={{ ...theme, page: "not-found" }}
            remainingSlug={remainingSlug}
            deploymentConfiguration={deploymentConfiguration}
            slug={params.slug}
          />
        );
    }
  };

  return <Suspense fallback={null}>{renderPage()}</Suspense>;
}
