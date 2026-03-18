import Image from "next/image";
import { Theme } from "../types";

import blackSuit from "../../../public/headshots/luke-schlangen-headshot-black-suit-no-background.png";
import greySweater from "../../../public/headshots/luke-schlangen-headshot-grey-sweater-no-background.png";
import yellowSweater from "../../../public/headshots/luke-schlangen-headshot-yellow-sweater-no-background.png";

export default function ProfileImage({ theme }: { theme: Theme }) {
  // Common classes to keep the images stacked and centered
  const imgBaseClass = "absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500";

  return (
    /* relative: acts as the anchor for absolute children */
    /* flex + justify-center: ensures the container itself stays centered in its parent */
    <div className="relative flex justify-center h-[400px] w-full overflow-hidden">
      
      <Image 
        className={`${imgBaseClass} ${theme.vibe !== 'professional' ? 'translate-y-100' : 'translate-y-0'}`} 
        src={blackSuit} 
        alt="Luke Schlangen in a Black Suit" 
        height={400} 
        priority 
      />
      
      <Image 
        className={`${imgBaseClass} ${theme.vibe !== 'standard' ? 'translate-y-100' : 'translate-y-0'}`} 
        src={greySweater} 
        alt="Luke Schlangen in a Grey Sweater" 
        height={400} 
        priority 
      />
      
      <Image 
        className={`${imgBaseClass} ${theme.vibe !== 'fun' ? 'translate-y-100' : 'translate-y-0'}`} 
        src={yellowSweater} 
        alt="Luke Schlangen in a Yellow Sweater" 
        height={400} 
        priority 
      />

    </div>
  );
}