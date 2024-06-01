import { DeploymentConfiguration, Theme } from "../types";
import ColorToggle from "./toggles/color-toggle";
import PageToggle from "./toggles/page-toggle";
import VibeToggle from "./toggles/vibe-toggle";

export default function Navbar({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  return (
    <nav className="m-auto min-w-fit max-w-3xl text-3xl md:text-4xl">
      <div className="flex justify-between">
        <VibeToggle
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
        <PageToggle
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
        <ColorToggle
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
      </div>
    </nav>
  );
}
