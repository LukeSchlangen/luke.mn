import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";
import colorValues from "../../utils/color-values";

export default function VibeToggle({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textBackgroundColorClass } = colorValues(theme);
  const { vibe } = theme;

  return (
    <div
      className={`space-x-2 rounded-br-lg p-1 drop-shadow-xl md:rounded-b-lg ${textBackgroundColorClass}`}
    >
      <Link
        href={pathBuilder({
          ...theme,
          vibe: "professional",
          ...deploymentConfiguration,
        })}
        className={
          vibe === "professional" ? "" : "opacity-50 hover:opacity-100"
        }
      >
        💼
      </Link>{" "}
      <Link
        href={pathBuilder({
          ...theme,
          vibe: "standard",
          ...deploymentConfiguration,
        })}
        className={vibe === "standard" ? "" : "opacity-50 hover:opacity-100"}
      >
        😃
      </Link>{" "}
      <Link
        href={pathBuilder({
          ...theme,
          vibe: "fun",
          ...deploymentConfiguration,
        })}
        className={vibe === "fun" ? "" : "opacity-50 hover:opacity-100"}
      >
        🎉
      </Link>
    </div>
  );
}
