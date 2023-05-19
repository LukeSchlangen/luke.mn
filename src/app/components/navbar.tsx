import { Theme } from "../types";
import ColorToggle from "./toggles/color-toggle";
import PageToggle from "./toggles/page-toggle";
import VibeToggle from "./toggles/vibe-toggle";

export default function Navbar({ theme }: { theme: Theme }) {
  return (
    <nav className="m-auto min-w-fit max-w-3xl text-3xl md:text-4xl">
      <div className="flex justify-between">
        <VibeToggle theme={theme} />
        <PageToggle theme={theme} />
        <ColorToggle theme={theme} />
      </div>
    </nav>
  );
}
