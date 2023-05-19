import Bio from "../bio";
import Footer from "../footer";
import { Theme } from "../../types";
import colorValues from "../../utils/color-values";
import ProfileImage from "../profile-image";
import VibeToggle from "../toggles/vibe-toggle";
import ColorToggle from "../toggles/color-toggle";

export default function HomePage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 col-start-1 row-span-2 row-start-1">
          <ProfileImage theme={theme} />
        </div>
        <nav className="col-span-2 col-start-1 row-start-1 text-3xl md:text-4xl">
          <div className="m-auto max-w-3xl">
            <div className="flex justify-between">
              <VibeToggle theme={theme} />
              <ColorToggle theme={theme} />
            </div>
          </div>
        </nav>
      </div>
      <div className="m-auto w-full px-2">
        <header>
          <div
            className={`m-auto -mt-8 max-w-prose rounded-lg border p-2 drop-shadow-xl md:p-4 ${textBackgroundColorClass}`}
          >
            <h1 className="mb-2 md:flex">
              <div className="pr-3 text-4xl sm:text-7xl">Luke Schlangen</div>
            </h1>
            <Bio theme={theme} />
          </div>
        </header>
      </div>
      <Footer />
    </div>
  );
}
