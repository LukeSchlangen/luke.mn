import HomePage from "../../components/pages/home-page";
import SharedPage from "../../components/shared-page";
import { generateMetadataShared, generateStaticParamsShared } from "../../utils/metadata-helper";

export const generateMetadata = generateMetadataShared;
export const generateStaticParams = generateStaticParamsShared;

export default function Page({
  params: paramsPromise = Promise.resolve({ slug: [] }),
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return (
    <SharedPage
      paramsPromise={paramsPromise}
      pageType="home"
      Component={HomePage}
    />
  );
}
