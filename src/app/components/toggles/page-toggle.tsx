import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";
import colorValues from "../../utils/color-values";

export default function PageToggle({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textBackgroundColorClass } = colorValues(theme);
  const { page } = theme;

  return (
    <div
      className={`space-x-2 rounded-b-lg p-1 drop-shadow-xl ${textBackgroundColorClass}`}
    >
      <Link
        href={pathBuilder({
          ...theme,
          page: "home",
          ...deploymentConfiguration,
        })}
        className={
          page === "home" ? "" : "underline opacity-50 hover:opacity-100"
        }
      >
        🏠
      </Link>
      <Link
        href={pathBuilder({
          ...theme,
          page: "faq",
          ...deploymentConfiguration,
        })}
        className={page === "faq" ? "" : "opacity-50 hover:opacity-100"}
      >
        ❓
      </Link>
      <Link
        href={pathBuilder({
          ...theme,
          page: "deploy",
          ...deploymentConfiguration,
        })}
        className={page === "deploy" ? "" : "opacity-50 hover:opacity-100"}
      >
        🚀
      </Link>
    </div>
  );
}
