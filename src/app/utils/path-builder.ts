import { DeploymentConfiguration, Theme } from "../types";

export default function pathBuilder({
  page,
  vibe,
  color,
  tense,
  verbosity,
  framework,
  target,
  source,
}: Theme & DeploymentConfiguration) {
  const pagePath = page === "home" ? "" : `/${page}`;
  const vibePath = vibe === "standard" ? "" : `/${vibe}`;
  const colorPath = color === "light" ? "" : `/${color}`;
  const tensePath = tense === "first-person" ? "" : `/${tense}`;
  const verbosityPath = verbosity === "medium" ? "" : `/${verbosity}`;
  const frameworkPath = framework === "angular-ssr" ? "" : `/${framework}`;
  const targetPath = target === "cloud-run" ? "" : `/${target}`;
  const sourcePath = source === "local" ? "" : `/${source}`;
  return (
    `${pagePath}${vibePath}${colorPath}${tensePath}${verbosityPath}${frameworkPath}${targetPath}${sourcePath}` ||
    "/"
  );
}
