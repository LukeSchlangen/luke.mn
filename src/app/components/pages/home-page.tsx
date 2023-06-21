import Bio from "../bio";
import Footer from "../footer";
import { Theme } from "../../types";
import colorValues from "../../utils/color-values";
import ProfileImage from "../profile-image";
import Navbar from "../navbar";
import SocialIconBar from "../social-icon-bar";

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
      <div className="m-auto  -mt-20 w-full px-2 max-w-prose">
        <SocialIconBar theme={theme} />
        <div
          className={`rounded-lg p-2 drop-shadow-xl md:p-4 ${textBackgroundColorClass}`}
        >
          <header>
            <h1 className="mb-2 md:flex">
              <div className="pr-3 text-4xl sm:text-7xl">Luke Schlangen</div>
            </h1>
          </header>
          <main>
            <Bio theme={theme} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
