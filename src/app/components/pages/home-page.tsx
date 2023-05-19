import Bio from "../bio";
import Footer from "../footer";
import { Theme } from "../../types";
import colorValues from "../../utils/color-values";
import ProfileImage from "../profile-image";
import Navbar from "../navbar";

export default function HomePage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} />
      <ProfileImage theme={theme} />
      <div className="m-auto w-full px-2">
        <header>
          <div
            className={`m-auto -mt-8 max-w-prose rounded-lg p-2 drop-shadow-xl md:p-4 ${textBackgroundColorClass}`}
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
