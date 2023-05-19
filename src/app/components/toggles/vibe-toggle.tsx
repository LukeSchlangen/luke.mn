import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function VibeToggle({ theme }: { theme: Theme }) {
  const { vibe } = theme;

  return (
    <div className="space-x-2 p-1">
      <Link
        href={pathBuilder({ ...theme, vibe: "professional" })}
        className={
          vibe === "professional" ? "" : "opacity-50 hover:opacity-100"
        }
      >
        💼
      </Link>{" "}
      <Link
        href={pathBuilder({ ...theme, vibe: "standard" })}
        className={vibe === "standard" ? "" : "opacity-50 hover:opacity-100"}
      >
        😃
      </Link>{" "}
      <Link
        href={pathBuilder({ ...theme, vibe: "fun" })}
        className={vibe === "fun" ? "" : "opacity-50 hover:opacity-100"}
      >
        🎉
      </Link>
    </div>
  );
}
