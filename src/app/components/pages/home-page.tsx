import Bio from "../bio";
import { DeploymentConfiguration, Theme } from "../../types";
import SharedPage from "../shared-page";

export default function HomePage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  return (
    <SharedPage theme={theme} deploymentConfiguration={deploymentConfiguration}>
      <header>
        <h1 className="mb-2 md:flex">
          <div className="pr-3 text-4xl sm:text-7xl">Luke Schlangen</div>
        </h1>
      </header>
      <main>
        <Bio
          theme={theme}
          deploymentConfiguration={deploymentConfiguration}
        />
      </main>
    </SharedPage>
  );
}
