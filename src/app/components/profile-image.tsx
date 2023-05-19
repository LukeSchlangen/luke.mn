import Image, { StaticImageData } from "next/image";
import { Theme } from "../types";

import blackSuit from "../../../public/headshots/luke-schlangen-headshot-black-suit-no-background.png";
import greySweater from "../../../public/headshots/luke-schlangen-headshot-grey-sweater-no-background.png";
import yellowSweater from "../../../public/headshots/luke-schlangen-headshot-yellow-sweater-no-background.png";

const profileImageMap = {
  professional: {
    src: blackSuit,
    alt: "Luke Schlangen in a Black Suit with a Black Background",
  },
  standard: {
    src: greySweater,
    alt: "Luke Schlangen in a Grey Sweater",
  },
  fun: {
    src: yellowSweater,
    alt: "Luke Schlangen in a Yellow Sweater",
  },
};

export default function ProfileImage({ theme }: { theme: Theme }) {
  const { src, alt } = profileImageMap[theme.vibe];
  return <Image className="m-auto" src={src} alt={alt} height="400" priority />;
}
