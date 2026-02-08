import { Suspense } from "react";
import { cachedPathParser } from "../utils/path-parser";
import NotFoundPage from "./pages/not-found-page";
import { DeploymentConfiguration, Theme, PageOption } from "../types";

interface SharedPageProps {
  paramsPromise: Promise<{ slug: string[] }>;
  pageType: PageOption;
  Component: React.ComponentType<{
    theme: Theme;
    deploymentConfiguration: DeploymentConfiguration;
  }>;
}

export default function SharedPage({ paramsPromise, pageType, Component }: SharedPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <PageContent
        paramsPromise={paramsPromise}
        pageType={pageType}
        Component={Component}
      />
    </Suspense>
  );
}

async function PageContent({ paramsPromise, pageType, Component }: SharedPageProps) {
  const params = await paramsPromise;
  const { theme, remainingSlug, deploymentConfiguration } = await cachedPathParser(params.slug);

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
    <Component
      theme={{ ...theme, page: pageType }}
      deploymentConfiguration={deploymentConfiguration}
    />
  );
}
