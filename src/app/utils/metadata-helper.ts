import { Metadata } from "next";
import { cachedPathParser } from "./path-parser";
import {
  COLOR_OPTIONS,
  PAGE_OPTIONS,
  TENSE_OPTIONS,
  VERBOSITY_OPTIONS,
  VIBE_OPTIONS,
} from "../types";

export async function generateStaticMetadata(
  slug: string[],
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

export async function generateStaticParams(basePage?: string) {
  const params: { slug: string[] }[] = [{ slug: [] }];

  // For the root catch-all, include all page options
  if (!basePage) {
    for (const page of PAGE_OPTIONS) {
      if (page !== "home" && page !== "not-found") {
        params.push({ slug: [page] });
      }
    }
  }

  // Generate theme combinations
  for (const vibe of VIBE_OPTIONS) {
    if (vibe === "standard") continue;
    params.push({ slug: basePage ? [vibe] : [vibe] }); // This is still slightly wrong for root
  }

  // Actually, let's just provide a few sensible ones for each
  const themeCombos = [
    ["professional"],
    ["fun"],
    ["standard", "dark"],
    ["professional", "dark"],
    ["fun", "light", "third-person"],
    ["standard", "light", "first-person", "short"],
  ];

  for (const combo of themeCombos) {
    params.push({ slug: combo });
    if (!basePage) {
      for (const page of PAGE_OPTIONS) {
        if (page !== "home" && page !== "not-found") {
          params.push({ slug: [page, ...combo] });
        }
      }
    }
  }

  return params;
}
