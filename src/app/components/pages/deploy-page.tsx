"use client";

import {
  DeploymentConfiguration,
  FRAMEWORK_DETAILS,
  FRAMEWORK_OPTIONS,
  SOURCE_DETAILS,
  SOURCE_OPTIONS,
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
import CommandList from "../command-list";
import pathBuilder from "../../utils/path-builder";
import { useState } from "react";

export default function DeployPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  const allSteps = FRAMEWORK_DETAILS[deploymentConfiguration.framework];

  const [appName, setAppName] = useState(allSteps.defaultApplicationName);
  const [projectId, setProjectId] = useState(
    allSteps.targets[deploymentConfiguration.target].defaultProjectId,
  );

  const errorMessage =
    allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].errorMessage;

  const prerequisites = [
    ...allSteps.prerequisites({ appName, projectId }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].prerequisites({
      appName,
      projectId,
    }),
  ];
  const createApplication = [
    ...allSteps.createApplication({ appName, projectId }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].createApplication({
      appName,
      projectId,
    }),
  ];
  const runLocally = [
    ...allSteps.runLocally({ appName, projectId }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].runLocally({
      appName,
      projectId,
    }),
  ];
  const deployApplication = [
    ...allSteps.deployApplication({ appName, projectId }),
    ...allSteps.targets[deploymentConfiguration.target].sources[
      deploymentConfiguration.source
    ].deployApplication({
      appName,
      projectId,
    }),
  ];

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
              <label>
                <p className="mt-4">Application Name</p>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className={`border w-full py-2 px-3 text-xl ${textBackgroundColorClass}`}
                />
              </label>
              {/* <label>
                <p className="mt-4">Project ID</p>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className={`border w-full py-2 px-3 text-xl ${textBackgroundColorClass}`}
                />
              </label> */}
            </section>
          </ProseContainer>
          {errorMessage && (
            <ProseContainer theme={theme}>
              <p className="text-5xl text-red-500">{errorMessage}</p>
            </ProseContainer>
          )}
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
                <CommandList steps={prerequisites} />
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Create application
                  <CopyLinkIcon id="create-application" />
                </summary>
                <CommandList steps={createApplication} />
              </details>
              <details className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Run application locally
                  <CopyLinkIcon id="create-application" />
                </summary>
                <CommandList steps={runLocally} />
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Deploy application
                  <CopyLinkIcon id="deploy-app" />
                </summary>
                <CommandList steps={deployApplication} />
              </details>
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
