import { Metadata } from "next";
import pathParser from "./path-parser";
import {
  COLOR_OPTIONS,
  FRAMEWORK_OPTIONS,
  PageOption,
  SOURCE_OPTIONS,
  TARGET_OPTIONS,
  TENSE_OPTIONS,
  VERBOSITY_OPTIONS,
  VIBE_OPTIONS,
} from "../types";

export async function generateMetadataHelper({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await paramsPromise;
  const { theme } = pathParser(params.slug);

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

export function generateStaticParamsHelper(basePage?: PageOption) {
  const params: { slug: string[] }[] = [{ slug: [] }];

  for (const vibe of VIBE_OPTIONS) {
    params.push({ slug: [vibe] });
    for (const color of COLOR_OPTIONS) {
      params.push({ slug: [vibe, color] });
      for (const tense of TENSE_OPTIONS) {
        params.push({ slug: [vibe, color, tense] });
        for (const verbosity of VERBOSITY_OPTIONS) {
          params.push({ slug: [vibe, color, tense, verbosity] });
          for (const framework of FRAMEWORK_OPTIONS) {
            params.push({ slug: [vibe, color, tense, verbosity, framework] });
            for (const target of TARGET_OPTIONS) {
              params.push({
                slug: [vibe, color, tense, verbosity, framework, target],
              });
              for (const source of SOURCE_OPTIONS) {
                params.push({
                  slug: [
                    vibe,
                    color,
                    tense,
                    verbosity,
                    framework,
                    target,
                    source,
                  ],
                });
              }
            }
          }
        }
      }
    }
  }

  // If basePage is provided, we don't need to do anything special here
  // because the catch-all is already under the [basePage] directory.
  // Actually, if we are in /faq/[[...slug]], and the user goes to /faq/faq,
  // pathParser might interpret the first slug as the page.
  // The memory said: "prevent redundant slugs (e.g., /faq/faq) in nested routes"

  return params;
}
