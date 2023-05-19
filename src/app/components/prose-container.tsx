import { Theme } from "../types";
import colorValues from "../utils/color-values";

export default function ProseContainer({
  children,
  theme,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const { textBackgroundColorClass } = colorValues(theme);

  return (
    <div className="m-auto max-w-prose">
      <div
        className={`m-2 w-fit rounded-lg border p-2 drop-shadow-xl ${textBackgroundColorClass}`}
      >
        {children}
      </div>
    </div>
  );
}
