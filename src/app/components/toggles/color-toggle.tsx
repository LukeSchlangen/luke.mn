import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";
import colorValues from "../../utils/color-values";

export default function ColorToggle({ theme, deploymentConfiguration }: { theme: Theme, deploymentConfiguration: DeploymentConfiguration }) {
  const { textBackgroundColorClass } = colorValues(theme);
  const { color } = theme;

  return (
    <div
      className={`space-x-2 rounded-bl-lg p-1 drop-shadow-xl md:rounded-b-lg ${textBackgroundColorClass}`}
    >
      <Link
        href={pathBuilder({ ...theme, color: "light", ...deploymentConfiguration })}
        className={color === "light" ? "" : "opacity-50 hover:opacity-100"}
      >
        ☀️
      </Link>
      <Link
        href={pathBuilder({ ...theme, color: "dark", ...deploymentConfiguration })}
        className={color === "dark" ? "" : "opacity-50 hover:opacity-100"}
      >
        🌙
      </Link>
    </div>
  );
}
