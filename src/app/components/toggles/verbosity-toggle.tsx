import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function VerbosityToggle({ theme, deploymentConfiguration }: { theme: Theme, deploymentConfiguration: DeploymentConfiguration }) {
  const { verbosity } = theme;

  return (
    <div>
      <Link
        href={pathBuilder({ ...theme, verbosity: "short", ...deploymentConfiguration })}
        className={verbosity === "short" ? "underline" : ""}
      >
        Short
      </Link>
      {" | "}
      <Link
        href={pathBuilder({ ...theme, verbosity: "long", ...deploymentConfiguration })}
        className={verbosity === "long" ? "underline" : ""}
      >
        Long
      </Link>
    </div>
  );
}
