import { DeploymentConfiguration, Theme } from "../../types";
import ProseContainer from "../prose-container";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";
import Link from "next/link";

export const SHORT_LINKS: Record<string, string> = {
  li: "https://www.linkedin.com/in/lukeschlangen/",
};

export default function ShortPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <style>
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            <h1 className="m-2 text-4xl">Short Links</h1>
            <h2 className="m-2">
              A list of short links that redirect to other pages.
            </h2>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <ul className="space-y-4">
              {Object.entries(SHORT_LINKS).map(([shortId, url]) => (
                <li key={shortId} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-bold">/{shortId}</span>
                  <span className="hidden sm:inline">→</span>
                  <Link href={url} className="underline break-all">
                    {url}
                  </Link>
                </li>
              ))}
            </ul>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
