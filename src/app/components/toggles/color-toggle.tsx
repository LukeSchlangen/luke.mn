import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function ColorToggle({ theme }: { theme: Theme }) {
  const { color } = theme;

  return (
    <div className="space-x-2 p-1">
      <Link
        href={pathBuilder({ ...theme, color: "light" })}
        className={color === "light" ? "" : "opacity-50 hover:opacity-100"}
      >
        ☀️
      </Link>
      <Link
        href={pathBuilder({ ...theme, color: "dark" })}
        className={color === "dark" ? "" : "opacity-50 hover:opacity-100"}
      >
        🌙
      </Link>
    </div>
  );
}
