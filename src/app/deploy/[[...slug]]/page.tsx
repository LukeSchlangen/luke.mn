import {
  generateMetadataHelper,
  generateStaticParamsHelper,
} from "../../utils/metadata-helper";
import SharedPage from "../../components/shared-page";

export const generateMetadata = generateMetadataHelper;

export async function generateStaticParams() {
  return generateStaticParamsHelper("deploy");
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  return <SharedPage params={params} basePage="deploy" />;
}
