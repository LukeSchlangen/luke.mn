import { Theme } from "../types";
import ColorToggle from "./toggles/color-toggle";
import PageToggle from "./toggles/page-toggle";
import VibeToggle from "./toggles/vibe-toggle";

export default function Navbar({
  theme,
  children,
}: {
  theme: Theme;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {children}
      <nav className="col-span-2 col-start-1 row-start-1 text-3xl md:text-4xl">
        <div className="m-auto max-w-3xl">
          <div className="flex justify-between">
            <VibeToggle theme={theme} />
            <PageToggle theme={theme} />
            <ColorToggle theme={theme} />
          </div>
        </div>
      </nav>
    </div>
  );
}
