import Link from "next/link";
import { DeploymentConfiguration, Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function TenseToggle({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { tense } = theme;

  return (
    <div>
      <Link
        href={pathBuilder({
          ...theme,
          tense: "first-person",
          ...deploymentConfiguration,
        })}
        className={tense === "first-person" ? "underline" : ""}
      >
        1st Person
      </Link>
      {" | "}
      <Link
        href={pathBuilder({
          ...theme,
          tense: "third-person",
          ...deploymentConfiguration,
        })}
        className={tense === "third-person" ? "underline" : ""}
      >
        3rd Person
      </Link>
    </div>
  );
}
