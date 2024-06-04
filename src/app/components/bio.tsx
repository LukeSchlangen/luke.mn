import { DeploymentConfiguration, Theme } from "../types";
import LongBio from "./bio-text/long-bio";
import MediumBio from "./bio-text/medium-bio";
import ShortBio from "./bio-text/short-bio";
import ProseContainer from "./prose-container";
import TenseToggle from "./toggles/tense-toggle";
import VerbosityToggle from "./toggles/verbosity-toggle";

const bioTextLookup = {
  long: LongBio,
  medium: MediumBio,
  short: ShortBio,
};

export default function Bio({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const BioText = bioTextLookup[theme.verbosity];

  return (
    <>
      <div className="mb-4 flex justify-between text-sm font-light">
        <TenseToggle
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
        <VerbosityToggle
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
      </div>
      <div
        className={`sm:text-lg md:text-2xl lg:text-3xl ${
          theme.verbosity === "short" ? "whitespace-nowrap" : "space-y-4"
        }`}
      >
        <BioText tense={theme.tense} />
      </div>
    </>
  );
}
