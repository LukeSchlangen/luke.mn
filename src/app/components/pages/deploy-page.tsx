import { DeploymentConfiguration, Theme } from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";
import CommandList from "../command-list";

export default function DeployPage({ theme, deploymentConfiguration }: { theme: Theme, deploymentConfiguration: DeploymentConfiguration }) {
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
            <h1 className="m-2 text-4xl">Deploy</h1>
            <h2 className="m-2">Let's share your application with the world.</h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                What are you trying to deploy?
              </h3>
              <label>
                <p className="mt-4">
                  Framework
                </p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {deploymentConfiguration.framework}
                  </summary>
                  <p>
                    {/* TODO create list of links for other frameworks */}
                  </p>
                </details>
              </label>
              <label>
                <p className="mt-4">
                  Deployment Target
                </p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {deploymentConfiguration.target}
                  </summary>
                  <p>
                    {/* TODO create list of links for other deployment targets, ?filtered by framework? */}
                  </p>
                </details>
              </label>
              <label>
                <p className="mt-4">
                  Code Source Location
                </p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {deploymentConfiguration.source}
                  </summary>
                  <p>
                    {/* TODO create list of links for other deployment targets, ?filtered by framework and deployment targets? */}
                  </p>
                </details>
              </label>
            </section>
          </ProseContainer>
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                Deployment Steps
                <CopyLinkIcon id="software-career" />
              </h3>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Pre-requisites
                  <CopyLinkIcon id="create-application" />
                </summary>
                <CommandList
                  steps={['curl https://webi.sh/node@lts | sh', 'curl https://sdk.cloud.google.com | bash']}
                />
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Create application
                  <CopyLinkIcon id="create-application" />
                </summary>
                <CommandList
                  steps={['npx @angular/cli new angular-app --ssr', 'cd angular-app']}
                />
              </details>
              <details className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Run application locally
                  <CopyLinkIcon id="create-application" />
                </summary>
                <CommandList
                  steps={['npm start']}
                />
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Deploy application
                  <CopyLinkIcon id="deploy-app" />
                </summary>
                <CommandList
                  steps={['gcloud run deploy angular-app --allow-unauthenticated --region=us-central1 --source=.']}
                />
              </details>
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
