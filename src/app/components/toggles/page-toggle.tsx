import Link from "next/link";
import { Theme } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function PageToggle({ theme }: { theme: Theme }) {
  const { page } = theme;

  return (
    <div className="space-x-2 p-1">
      <Link
        href={pathBuilder({ ...theme, page: "home" })}
        className={page === "home" ? "" : "opacity-50 hover:opacity-100"}
      >
        🏠
      </Link>
      <Link
        href={pathBuilder({ ...theme, page: "faq" })}
        className={page === "faq" ? "" : "opacity-50 hover:opacity-100"}
      >
        ❓
      </Link>
    </div>
  );
}
