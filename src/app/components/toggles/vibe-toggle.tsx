import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";
import colorValues from "../../utils/color-values";

export default function VibeToggle({ theme }: { theme: Theme }) {
  const { textBackgroundColorClass } = colorValues(theme);
  const { vibe } = theme;

  return (
    <div
      className={`space-x-2 rounded-br-lg p-1 drop-shadow-xl md:rounded-b-lg ${textBackgroundColorClass}`}
    >
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
