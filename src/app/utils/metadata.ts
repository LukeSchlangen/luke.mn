import type { Metadata } from "next";
import type { VibeOption } from "../types";

export function getVibeIcon(vibe: VibeOption): string {
  if (vibe === "professional") {
    return "/favicons/briefcase.svg";
  }
  if (vibe === "fun") {
    return "/favicons/party-popper.svg";
  }
  return "/favicons/smiling-face.svg";
}

export function buildPageMetadata({
  title,
  description,
  vibe,
}: {
  title: string;
  description: string;
  vibe: VibeOption;
}): Metadata {
  return {
    title,
    description,
    icons: {
      icon: getVibeIcon(vibe),
    },
  };
}
