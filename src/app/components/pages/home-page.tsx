import Bio from "../bio";
import Footer from "../footer";
import { DeploymentConfiguration, Theme } from "../../types";
import colorValues from "../../utils/color-values";
import ProfileImage from "../profile-image";
import Navbar from "../navbar";
import SocialIconBar from "../social-icon-bar";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("../confetti"));

export default function HomePage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <ProfileImage theme={theme} />
      <div className="m-auto  -mt-20 w-full max-w-prose px-2">
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
            <Bio
              theme={theme}
              deploymentConfiguration={deploymentConfiguration}
            />
          </main>
        </div>
      </div>
      {theme.vibe === "fun" && <Confetti />}
      <Footer />
    </div>
  );
}
