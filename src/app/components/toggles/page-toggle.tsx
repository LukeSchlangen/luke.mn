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
        prefetch={false}
        aria-label="Home"
        aria-current={page === "home" ? "page" : undefined}
        className={page === "home" ? "" : "opacity-50 hover:opacity-100"}
      >
        <span aria-hidden="true">🏠</span>
      </Link>
      <Link
        href={pathBuilder({
          ...theme,
          page: "faq",
          ...deploymentConfiguration,
        })}
        prefetch={false}
        aria-label="Frequently Asked Questions"
        aria-current={page === "faq" ? "page" : undefined}
        className={page === "faq" ? "" : "opacity-50 hover:opacity-100"}
      >
        <span aria-hidden="true">❓</span>
      </Link>
      <Link
        href={pathBuilder({
          ...theme,
          page: "deploy",
          ...deploymentConfiguration,
        })}
        prefetch={false}
        aria-label="Deploy"
        aria-current={page === "deploy" ? "page" : undefined}
        className={page === "deploy" ? "" : "opacity-50 hover:opacity-100"}
      >
        <span aria-hidden="true">🚀</span>
      </Link>
    </div>
  );
}
