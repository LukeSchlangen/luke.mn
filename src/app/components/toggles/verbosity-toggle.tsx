import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function VerbosityToggle({ theme }: { theme: Theme }) {
  const { verbosity } = theme;

  return (
    <div>
      <Link
        href={pathBuilder({ ...theme, verbosity: "short" })}
        className={verbosity === "short" ? "underline" : ""}
      >
        Short
      </Link>
      {" | "}
      <Link
        href={pathBuilder({ ...theme, verbosity: "long" })}
        className={verbosity === "long" ? "underline" : ""}
      >
        Long
      </Link>
    </div>
  );
}
