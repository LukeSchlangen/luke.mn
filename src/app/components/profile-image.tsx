"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import { Theme, VibeOption } from "../types";
import { notifyViewTransitionReady } from "../utils/view-transition";

import blackSuit from "../../../public/headshots/luke-schlangen-headshot-black-suit-no-background.png";
import greySweater from "../../../public/headshots/luke-schlangen-headshot-grey-sweater-no-background.png";
import yellowSweater from "../../../public/headshots/luke-schlangen-headshot-yellow-sweater-no-background.png";

const HEADSHOTS: Record<
  VibeOption,
  { src: typeof blackSuit; alt: string }
> = {
  professional: {
    src: blackSuit,
    alt: "Luke Schlangen in a Black Suit",
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
  useLayoutEffect(() => {
    notifyViewTransitionReady();
  }, [theme.vibe]);

  const activeHeadshot = HEADSHOTS[theme.vibe] ?? HEADSHOTS.standard;

  return (
    <div className="relative flex justify-center h-[400px] w-full overflow-hidden">
      {/* Active profile image participating in View Transition */}
      <Image
        key={theme.vibe}
        className="profile-image absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-auto"
        src={activeHeadshot.src}
        alt={activeHeadshot.alt}
        height={400}
        priority
      />

      {/* Preload inactive headshots so switches have zero decoding/loading latency */}
      {theme.vibe !== "professional" && (
        <Image
          className="hidden"
          src={blackSuit}
          alt="Luke Schlangen in a Black Suit preload"
          height={400}
          priority
        />
      )}
      {theme.vibe !== "standard" && (
        <Image
          className="hidden"
          src={greySweater}
          alt="Luke Schlangen in a Grey Sweater preload"
          height={400}
          priority
        />
      )}
      {theme.vibe !== "fun" && (
        <Image
          className="hidden"
          src={yellowSweater}
          alt="Luke Schlangen in a Yellow Sweater preload"
          height={400}
          priority
        />
      )}
    </div>
  );
}
