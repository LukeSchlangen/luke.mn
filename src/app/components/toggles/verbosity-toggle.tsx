import Link from "next/link";
import { DeploymentConfiguration, Theme, VerbosityOption } from "../../types";
import pathBuilder from "../../utils/path-builder";

export default function VerbosityToggle({
  theme,
  deploymentConfiguration,
  wordCounts,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  wordCounts?: Record<VerbosityOption, number>;
}) {
  const { verbosity, color } = theme;
  const isLight = color === "light";

  const options: { label: string; value: VerbosityOption }[] = [
    { label: "Short", value: "short" },
    { label: "Medium", value: "medium" },
    { label: "Long", value: "long" },
  ];

  return (
    <div className="flex items-center space-x-1">
      {options.map((opt, idx) => (
        <span key={opt.value} className="inline-flex items-center">
          {idx > 0 && <span className="mx-1 opacity-60">|</span>}
          <span className="relative group inline-flex items-center">
            <Link
              href={pathBuilder({
                ...theme,
                ...deploymentConfiguration,
                verbosity: opt.value,
              })}
              prefetch={false}
              title={wordCounts ? `${wordCounts[opt.value]} words` : undefined}
              className={verbosity === opt.value ? "underline" : ""}
            >
              {opt.label}
            </Link>
            {wordCounts && (
              <span
                role="tooltip"
                className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 text-xs px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-30 font-sans font-normal ${
                  isLight
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                {wordCounts[opt.value]} words
              </span>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
