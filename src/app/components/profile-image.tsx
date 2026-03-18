import Image from "next/image";
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
  return (
    <div className="relative m-auto flex h-[400px] justify-center">
      {(
        Object.entries(profileImageMap) as [
          keyof typeof profileImageMap,
          { src: any; alt: string },
        ][]
      ).map(([vibe, { src, alt }]) => {
        const isActive = theme.vibe === vibe;
        return (
          <Image
            key={vibe}
            className={`${isActive ? "relative" : "absolute"}`}
            src={src}
            alt={alt}
            height="400"
            priority
            style={{
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? "auto" : "none",
              viewTransitionName: isActive ? "profile-pic" : "none",
              width: "auto", // Ensure width is calculated from height
            }}
          />
        );
      })}
    </div>
  );
}
