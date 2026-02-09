import { Suspense } from "react";
import { cachedPathParser } from "../utils/path-parser";
import { PageOption } from "../types";
import HomePage from "./pages/home-page";
import DeployPage from "./pages/deploy-page";
import FaqPage from "./pages/faq-page";
import NotFoundPage from "./pages/not-found-page";

type SharedPageProps = {
  page: PageOption;
  params: Promise<{ slug: string[] }>;
};

async function PageContent({ page, params }: SharedPageProps) {
  const { slug } = await params;
  const { theme, remainingSlug, deploymentConfiguration } =
    await cachedPathParser(slug);

  if (remainingSlug.length > 0) {
    return (
      <NotFoundPage
        theme={{ ...theme, page: "not-found" }}
        remainingSlug={remainingSlug}
        deploymentConfiguration={deploymentConfiguration}
        slug={slug}
      />
    );
  }

  const commonProps = {
    theme: { ...theme, page },
    deploymentConfiguration,
  };

  switch (page) {
    case "home":
      return <HomePage {...commonProps} />;
    case "deploy":
      return <DeployPage {...commonProps} />;
    case "faq":
      return <FaqPage {...commonProps} />;
    default:
      return (
        <NotFoundPage
          {...commonProps}
          remainingSlug={remainingSlug}
          slug={slug}
        />
      );
  }
}

export default function SharedPage(props: SharedPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen w-full" />}>
      <PageContent {...props} />
    </Suspense>
  );
}
