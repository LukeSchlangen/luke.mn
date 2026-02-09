import SharedPage from "../../components/shared-page";
import {
  generateMetadataForSlug,
  getStaticParamsForRoute,
} from "../../utils/metadata-helper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return generateMetadataForSlug(slug);
}

export async function generateStaticParams() {
  return getStaticParamsForRoute();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <SharedPage page="deploy" params={params} />;
}
