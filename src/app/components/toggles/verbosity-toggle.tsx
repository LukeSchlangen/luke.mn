import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function VerbosityToggle({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { verbosity } = theme;

  return (
    <div>
      <Link
        href={pathBuilder({
          ...theme,
          ...deploymentConfiguration,
          verbosity: "short",
        })}
        prefetch={false}
        className={verbosity === "short" ? "underline" : ""}
      >
        Short
      </Link>
      {" | "}
      <Link
        href={pathBuilder({
          ...theme,
          ...deploymentConfiguration,
          verbosity: "medium",
        })}
        prefetch={false}
        className={verbosity === "medium" ? "underline" : ""}
      >
        Medium
      </Link>
      {" | "}
      <Link
        href={pathBuilder({
          ...theme,
          ...deploymentConfiguration,
          verbosity: "long",
        })}
        prefetch={false}
        className={verbosity === "long" ? "underline" : ""}
      >
        Long
      </Link>
    </div>
  );
}
