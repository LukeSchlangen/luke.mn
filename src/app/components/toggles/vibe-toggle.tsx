"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";
import colorValues from "../../utils/color-values";
import { triggerViewTransition } from "../../utils/view-transition";

export default function VibeToggle({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const router = useRouter();
  const { textBackgroundColorClass } = colorValues(theme);
  const { vibe } = theme;

  const handleVibeClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetVibe: Theme["vibe"],
    href: string,
  ) => {
    if (vibe === targetVibe) {
      e.preventDefault();
      return;
    }

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      e.preventDefault();
      triggerViewTransition(() => {
        router.push(href);
      });
    }
  };

  const professionalHref = pathBuilder({
    ...theme,
    vibe: "professional",
    ...deploymentConfiguration,
  });

  const standardHref = pathBuilder({
    ...theme,
    vibe: "standard",
    ...deploymentConfiguration,
  });

  const funHref = pathBuilder({
    ...theme,
    vibe: "fun",
    ...deploymentConfiguration,
  });

  return (
    <div
      className={`space-x-2 rounded-br-lg p-1 drop-shadow-xl md:rounded-b-lg ${textBackgroundColorClass}`}
    >
      <Link
        href={professionalHref}
        prefetch={false}
        onClick={(e) => handleVibeClick(e, "professional", professionalHref)}
        className={
          vibe === "professional" ? "" : "opacity-50 hover:opacity-100"
        }
      >
        💼
      </Link>{" "}
      <Link
        href={standardHref}
        prefetch={false}
        onClick={(e) => handleVibeClick(e, "standard", standardHref)}
        className={vibe === "standard" ? "" : "opacity-50 hover:opacity-100"}
      >
        😃
      </Link>{" "}
      <Link
        href={funHref}
        prefetch={false}
        onClick={(e) => handleVibeClick(e, "fun", funHref)}
        className={vibe === "fun" ? "" : "opacity-50 hover:opacity-100"}
      >
        🎉
      </Link>
    </div>
  );
}

