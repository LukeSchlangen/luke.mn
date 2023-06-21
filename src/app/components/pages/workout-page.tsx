import { Theme } from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import WorkoutHistory from "../workout-history";

export default function WorkoutPage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <main>
        <WorkoutHistory />
      </main>
    </div>
  );
}
