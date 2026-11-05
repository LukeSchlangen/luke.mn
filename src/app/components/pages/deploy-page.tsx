"use client";

import {
  DeploymentConfiguration,
  FRAMEWORK_DETAILS,
  FRAMEWORK_OPTIONS,
  Theme,
  TARGET_DETAILS,
  TARGET_OPTIONS,
} from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";
import pathBuilder from "../../utils/path-builder";
import { useState } from "react";
import VerbosityToggle from "../toggles/verbosity-toggle";
import Instructions from "../instructions";
import ThemeStyle from "../theme-style";

export default function DeployPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, textBackgroundColorClass } = colorValues(theme);

  const allSteps = FRAMEWORK_DETAILS[deploymentConfiguration.framework];

  const [customAppName, setCustomAppName] = useState<string | null>(null);
  const appName = customAppName ?? allSteps.defaultApplicationName;

  const errorMessage = allSteps.targets[deploymentConfiguration.target].sources[
    deploymentConfiguration.source
  ].errorMessage({ framework: deploymentConfiguration.framework });

  const prerequisites = [
    ...allSteps.prerequisites({ appName }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].prerequisites({
      appName,
    }),
  ];
  const createApplication = [
    ...allSteps.createApplication({ appName }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].createApplication({
      appName,
    }),
  ];
  const runLocally = [
    ...allSteps.runLocally({ appName }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].runLocally({
      appName,
    }),
  ];
  const deployApplication = [
    ...allSteps.deployApplication({ appName }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].deployApplication({
      appName,
    }),
  ];

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <ThemeStyle theme={theme} />
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            <h1 className="m-2 text-4xl">Deploy</h1>
            <h2 className="m-2">
              Let&apos;s share your application with the world.
            </h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">What are you trying to deploy?</h3>
              <div>
                <p className="mt-4">Framework</p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {FRAMEWORK_DETAILS[deploymentConfiguration.framework].name}
                  </summary>
                  <ul>
                    {FRAMEWORK_OPTIONS.map((framework) => {
                      const { name } = FRAMEWORK_DETAILS[framework];
                      const isCurrent =
                        deploymentConfiguration.framework === framework;
                      return (
                        <li key={framework}>
                          <Link
                            href={pathBuilder({
                              ...theme,
                              ...deploymentConfiguration,
                              framework,
                            })}
                            prefetch={false}
                            aria-current={isCurrent ? "page" : undefined}
                            className={isCurrent ? "underline" : ""}
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </div>
              <div>
                <p className="mt-4">Deployment Target</p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {TARGET_DETAILS[deploymentConfiguration.target].name}
                  </summary>
                  <ul>
                    {TARGET_OPTIONS.map((target) => {
                      const { name } = TARGET_DETAILS[target];
                      const isCurrent =
                        deploymentConfiguration.target === target;
                      return (
                        <li key={target}>
                          <Link
                            href={pathBuilder({
                              ...theme,
                              ...deploymentConfiguration,
                              target,
                            })}
                            prefetch={false}
                            aria-current={isCurrent ? "page" : undefined}
                            className={isCurrent ? "underline" : ""}
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </div>
              {/* <label>
                <p className="mt-4">Code Source Location</p>
                <details className="space-y-4 border p-2 pl-4">
                  <summary className="-ml-2 text-xl">
                    {SOURCE_DETAILS[deploymentConfiguration.source].name}
                  </summary>
                  <ul>
                    {SOURCE_OPTIONS.map((source) => {
                      const { name } = SOURCE_DETAILS[source];
                      return (
                        <li key={source}>
                          <Link
                            href={pathBuilder({
                              ...theme,
                              ...deploymentConfiguration,
                              source,
                            })}
                            className={
                              deploymentConfiguration.source === source
                                ? "underline"
                                : ""
                            }
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </label> */}
              <div>
                <label htmlFor="deploy-app-name" className="mt-4 block">
                  Application Name
                </label>
                <input
                  id="deploy-app-name"
                  type="text"
                  value={appName}
                  onChange={(e) => setCustomAppName(e.target.value)}
                  className={`border w-full py-2 px-3 text-xl ${textBackgroundColorClass}`}
                />
              </div>
            </section>
          </ProseContainer>
          {errorMessage ? (
            <ProseContainer theme={theme}>
              <p className="text-5xl text-red-500">{errorMessage}</p>
            </ProseContainer>
          ) : (
            <ProseContainer theme={theme}>
              <section className="space-y-4">
                <div className="mb-4 flex justify-between text-sm font-light">
                  <h3 className="text-3xl">
                    Deployment Steps
                    <CopyLinkIcon id="deployment-steps" />
                  </h3>
                  <VerbosityToggle
                    theme={theme}
                    deploymentConfiguration={deploymentConfiguration}
                  />
                </div>
                <Instructions
                  theme={theme}
                  prerequisites={prerequisites}
                  createApplication={createApplication}
                  runLocally={runLocally}
                  deployApplication={deployApplication}
                />
              </section>
            </ProseContainer>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
