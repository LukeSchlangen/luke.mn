import { Theme } from "../types";

export default function ProseContainer({
  children,
  theme,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const isLight = theme.color === "light";

  return (
    <div className="m-auto max-w-prose">
      <div
        className={`
        m-2 w-fit rounded-lg border p-2 drop-shadow-xl sm:p-4 md:w-[32rem] lg:w-[40rem]
        ${isLight ? "bg-gray-50" : "bg-gray-950"}
      `}
      >
        {children}
      </div>
    </div>
  );
}
