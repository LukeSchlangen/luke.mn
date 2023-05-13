import Link from "next/link";
import { Theme } from "../../types";
import currentPath from "../../utils/current-path";

export default function ColorToggle({ theme }: { theme: Theme }) {
  const { color, vibe, tense, verbosity } = currentPath(theme);

  return (
    <div className="space-x-2 p-1">
      <Link
        href={`${vibe}${tense}${verbosity}` || "/"}
        className={color === "" ? "" : "opacity-50 hover:opacity-100"}
      >
        ☀️
      </Link>
      <Link
        href={`${vibe}/dark${tense}${verbosity}`}
        className={color === "/dark" ? "" : "opacity-50 hover:opacity-100"}
      >
        🌙
      </Link>
    </div>
  );
}
