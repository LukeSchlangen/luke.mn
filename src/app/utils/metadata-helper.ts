import { Metadata } from "next";
import { cachedPathParser } from "./path-parser";

export async function generateMetadataShared({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { theme } = await cachedPathParser(params.slug);

  let icon = "/favicons/smiling-face.svg";
  if (theme.vibe === "professional") {
    icon = "/favicons/briefcase.svg";
  } else if (theme.vibe === "fun") {
    icon = "/favicons/party-popper.svg";
  }

  return {
    icons: {
      icon: icon,
    },
  };
}

export async function generateStaticParamsShared() {
  return [{ slug: [] }, { slug: ["professional"] }, { slug: ["fun"] }];
}
