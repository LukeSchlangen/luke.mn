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
  return (
    <div className="relative m-auto flex h-[400px] justify-center overflow-hidden">
      {(
        Object.entries(profileImageMap) as [
          keyof typeof profileImageMap,
          { src: StaticImageData; alt: string },
        ][]
      ).map(([vibe, { src, alt }]) => {
        const isActive = theme.vibe === vibe;
        return (
          <Image
            key={vibe}
            className="absolute transition-all duration-700 ease-in-out"
            src={src}
            alt={alt}
            height={400}
            priority
            style={{
              transform: isActive ? "translateY(0)" : "translateY(400px)",
              zIndex: isActive ? 5 : 0,
              pointerEvents: isActive ? "auto" : "none",
              viewTransitionName: `profile-pic-${vibe}`,
              width: "auto",
              height: "400px",
              objectFit: "contain",
            }}
          />
        );
      })}
    </div>
  );
}
