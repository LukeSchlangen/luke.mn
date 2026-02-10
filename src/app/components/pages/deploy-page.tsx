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
import pathBuilder from "../../utils/path-builder";
import { useState } from "react";
import VerbosityToggle from "../toggles/verbosity-toggle";
import Instructions from "../instructions";
import SharedPage from "../shared-page";

export default function DeployPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textBackgroundColorClass } = colorValues(theme);

  const allSteps = FRAMEWORK_DETAILS[deploymentConfiguration.framework];

  const [appName, setAppName] = useState(allSteps.defaultApplicationName);

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
    <SharedPage theme={theme} deploymentConfiguration={deploymentConfiguration}>
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
            <label>
              <p className="mt-4">Framework</p>
              <details className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  {FRAMEWORK_DETAILS[deploymentConfiguration.framework].name}
                </summary>
                <ul>
                  {FRAMEWORK_OPTIONS.map((framework) => {
                    const { name } = FRAMEWORK_DETAILS[framework];
                    return (
                      <li key={framework}>
                        <Link
                          href={pathBuilder({
                            ...theme,
                            ...deploymentConfiguration,
                            framework,
                          })}
                          className={
                            deploymentConfiguration.framework === framework
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
            </label>
            <label>
              <p className="mt-4">Deployment Target</p>
              <details className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  {TARGET_DETAILS[deploymentConfiguration.target].name}
                </summary>
                <ul>
                  {TARGET_OPTIONS.map((target) => {
                    const { name } = TARGET_DETAILS[target];
                    return (
                      <li key={target}>
                        <Link
                          href={pathBuilder({
                            ...theme,
                            ...deploymentConfiguration,
                            target,
                          })}
                          className={
                            deploymentConfiguration.target === target
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
            </label>
            <label>
              <p className="mt-4">Application Name</p>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className={`border w-full py-2 px-3 text-xl ${textBackgroundColorClass}`}
              />
            </label>
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
    </SharedPage>
  );
}
