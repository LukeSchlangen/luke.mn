import { DeploymentConfiguration, Theme } from "../types";
import LongInstructions from "./instructions-text/long-instructions";
import MediumInstructions from "./instructions-text/medium-instructions";
import ShortInstructions from "./instructions-text/short-instructions";
import TenseToggle from "./toggles/tense-toggle";
import VerbosityToggle from "./toggles/verbosity-toggle";

const instructionsTextLookup = {
  long: LongInstructions,
  medium: MediumInstructions,
  short: ShortInstructions,
};

export default function Instructions({
  theme,
  prerequisites,
  createApplication,
  runLocally,
  deployApplication,
}: {
  theme: Theme;
  prerequisites: string[];
  createApplication: string[];
  runLocally: string[];
  deployApplication: string[];
}) {
  const InstructionsText = instructionsTextLookup[theme.verbosity];

  return (
    <InstructionsText
      prerequisites={prerequisites}
      createApplication={createApplication}
      runLocally={runLocally}
      deployApplication={deployApplication}
    />
  );
}
