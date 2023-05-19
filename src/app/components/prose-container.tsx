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
        className={`m-2 w-fit rounded-lg border p-2 drop-shadow-xl sm:p-4 md:w-[32rem] lg:w-[40rem] ${textBackgroundColorClass}`}
      >
        {children}
      </div>
    </div>
  );
}
