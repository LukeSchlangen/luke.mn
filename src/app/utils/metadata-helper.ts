import { Metadata } from "next";
import { cachedPathParser } from "./path-parser";
import { VIBE_OPTIONS } from "../types";

export async function generateMetadataForSlug(
  slug?: string[],
): Promise<Metadata> {
  const { theme } = await cachedPathParser(slug);

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

export async function getStaticParamsForRoute() {
  return [
    { slug: [] },
    ...VIBE_OPTIONS.map((vibe) => ({ slug: [vibe] })),
  ];
}
