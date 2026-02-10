import { Suspense } from "react";
import FaqPage from "../../components/pages/faq-page";
import NotFoundPage from "../../components/pages/not-found-page";
import { cachedPathParser } from "../../utils/path-parser";
import {
  generateStaticMetadata,
  generateStaticParams as sharedGenerateStaticParams,
} from "../../utils/metadata-helper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  return generateStaticMetadata(slug);
}

export async function generateStaticParams() {
  return sharedGenerateStaticParams("faq");
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const { theme, remainingSlug, deploymentConfiguration } = await cachedPathParser(slug);

  if (remainingSlug.length > 0) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage
          theme={{ ...theme, page: "not-found" }}
          remainingSlug={remainingSlug}
          deploymentConfiguration={deploymentConfiguration}
          slug={slug}
        />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FaqPage
        theme={{ ...theme, page: "faq" }}
        deploymentConfiguration={deploymentConfiguration}
      />
    </Suspense>
  );
}
