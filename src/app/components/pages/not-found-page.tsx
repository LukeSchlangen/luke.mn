import { DeploymentConfiguration, Theme } from "../../types";

import ProseContainer from "../prose-container";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";

export default function NotFoundPage({
  theme,
  deploymentConfiguration,
  remainingSlug,
  slug,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
  remainingSlug: string[];
  slug: string[];
}) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            <h1 className="m-2 text-4xl">404</h1>
            <h2 className="m-2">This page does not exist!</h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                There were unrecognized pieces of the URL
              </h3>
              <p>I am not sure what these mean:</p>
              <pre>{JSON.stringify(remainingSlug, null, 2)}</pre>
              <p>The full path was:</p>
              <pre>{JSON.stringify(slug, null, 2)}</pre>
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
