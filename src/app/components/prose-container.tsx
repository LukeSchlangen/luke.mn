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
    <div className="w-full max-w-prose">
      <div
        className={`m-2 rounded-lg p-2 drop-shadow-xl md:p-4 ${textBackgroundColorClass}`}
      >
        {children}
      </div>
    </div>
  );
}
