import { DeploymentConfiguration, Theme } from "../types";
import colorValues from "../utils/color-values";
import Navbar from "./navbar";
import ProfileImage from "./profile-image";
import SocialIconBar from "./social-icon-bar";
import Footer from "./footer";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Confetti = dynamic(() => import("./confetti"));

export default function SharedPage({
  theme,
  deploymentConfiguration,
  children,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  children: ReactNode;
}) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <ProfileImage theme={theme} />
      <div className="m-auto -mt-20 w-full max-w-prose px-2">
        <SocialIconBar theme={theme} />
        <div
          className={`rounded-lg p-2 drop-shadow-xl md:p-4 ${textBackgroundColorClass}`}
        >
          {children}
        </div>
      </div>
      {theme.vibe === "fun" && <Confetti />}
      <Footer />
    </div>
  );
}
