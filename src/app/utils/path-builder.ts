import { Theme } from "../types";

export default function pathBuilder({
  page,
  vibe,
  color,
  tense,
  verbosity,
}: Theme) {
  const pagePath = page === "home" ? "" : `/${page}`;
  const vibePath = vibe === "standard" ? "" : `/${vibe}`;
  const colorPath = color === "light" ? "" : `/${color}`;
  const tensePath = tense === "first-person" ? "" : `/${tense}`;
  const verbosityPath = verbosity === "short" ? "" : `/${verbosity}`;
  return `${pagePath}${vibePath}${colorPath}${tensePath}${verbosityPath}`;
}
