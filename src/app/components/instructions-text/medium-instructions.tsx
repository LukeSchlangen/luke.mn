import CommandList from "../command-list";
import CopyLinkIcon from "../copy-link-icon";

export default function MediumBio({
  prerequisites,
  createApplication,
  runLocally,
  deployApplication,
}: {
  prerequisites: string[];
  createApplication: string[];
  runLocally: string[];
  deployApplication: string[];
}) {
  return (
    <>
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
    </>
  );
}
