import Link from "next/link";
import { Theme } from "../../types";
import currentPath from "../../utils/current-path";

export default function VerbosityToggle({ theme }: { theme: Theme }) {
  const { verbosity, vibe, color, tense } = currentPath(theme);

  return (
    <div>
      <Link
        href={`${vibe}${color}${tense}` || "/"}
        className={verbosity === "" ? "underline" : ""}
      >
        Short
      </Link>
      {" | "}
      <Link
        href={`${vibe}${color}${tense}/long`}
        className={verbosity === "/long" ? "underline" : ""}
      >
        Long
      </Link>
    </div>
  );
}
