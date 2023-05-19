import Image, { StaticImageData } from "next/image";
import { Theme } from "../types";

import blackSuitWhiteBackground from "../../../public/headshots/luke-schlangen-headshot-black-suit-white-background-banner.jpg";
import blackSuitBlackBackground from "../../../public/headshots/luke-schlangen-headshot-black-suit-black-background-banner.jpg";
import greySweater from "../../../public/headshots/luke-schlangen-headshot-grey-sweater-banner.jpg";
import yellowSweater from "../../../public/headshots/luke-schlangen-headshot-yellow-sweater-banner.jpg";
import colorValues from "../utils/color-values";

const profileImageMap = {
  blackSuitWhiteBackground: {
    src: blackSuitWhiteBackground,
    alt: "Luke Schlangen in a Black Suit with a White Background",
  },
  blackSuitBlackBackground: {
    src: blackSuitBlackBackground,
    alt: "Luke Schlangen in a Black Suit with a Black Background",
  },
  greySweater: {
    src: greySweater,
    alt: "Luke Schlangen in a Yellow Sweater",
  },
  yellowSweater: {
    src: yellowSweater,
    alt: "Luke Schlangen in a Yellow Sweater",
  },
};

const profileImageSelector = (
  theme: Theme
): { src: StaticImageData; alt: string } => {
  if (theme.vibe === "fun") return profileImageMap.yellowSweater;
  if (theme.vibe === "standard") return profileImageMap.greySweater;
  if (theme.color === "light") return profileImageMap.blackSuitWhiteBackground;
  return profileImageMap.blackSuitBlackBackground;
};

export default function ProfileImage({ theme }: { theme: Theme }) {
  const { src } = profileImageSelector(theme).src;
  const backgroundColor = colorValues(theme).bodyBackgroundColor;
  return (
    // <Image className="rounded-lg drop-shadow-xl" src={src} alt={alt} priority />
    <div
      className="h-96 w-full"
      style={{
        // backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0) 90%, ${backgroundColor} 100%), url(${src})`,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "49% 30%",
      }}
    />
  );
}
