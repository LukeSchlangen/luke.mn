import Image, { StaticImageData } from "next/image";
import { Theme } from "../types";

import blackSuitWhiteBackground from "../../../public/headshots/luke-schlangen-headshot-black-suit-white-background.jpg";
import blackSuitBlackBackground from "../../../public/headshots/luke-schlangen-headshot-black-suit-black-background.jpg";
import greySweater from "../../../public/headshots/luke-schlangen-headshot-grey-sweater.jpg";
import yellowSweater from "../../../public/headshots/luke-schlangen-headshot-yellow-sweater.jpg";

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
  const { src, alt } = profileImageSelector(theme);
  return (
    <div className="max-w-10">
      <Image
        className="mx-2 w-52 rounded-lg drop-shadow-xl sm:w-80"
        src={src}
        alt={alt}
        priority
      />
    </div>
  );
}
