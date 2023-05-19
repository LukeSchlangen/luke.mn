import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function TenseToggle({ theme }: { theme: Theme }) {
  const { tense } = theme;

  return (
    <div>
      <Link
        href={pathBuilder({ ...theme, tense: "first-person" })}
        className={tense === "first-person" ? "underline" : ""}
      >
        1st Person
      </Link>
      {" | "}
      <Link
        href={pathBuilder({ ...theme, tense: "third-person" })}
        className={tense === "third-person" ? "underline" : ""}
      >
        3rd Person
      </Link>
    </div>
  );
}
