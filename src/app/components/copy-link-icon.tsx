"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function CopyLinkIcon({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const copyToClipboard = async () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    try {
      await navigator.clipboard.writeText(`${origin}${pathname}#${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write errors in restricted contexts
    }
  };

  return (
    <span id={id} className="inline-flex items-center">
      {" "}
      <button
        type="button"
        aria-label={copied ? `Copied link to ${id}` : `Copy link to ${id}`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void copyToClipboard();
        }}
        className="ml-1 cursor-pointer text-xs opacity-50 hover:opacity-100 focus-visible:opacity-100"
      >
        <span aria-live="polite">{copied ? "Copied" : "🔗"}</span>
      </button>
    </span>
  );
}
