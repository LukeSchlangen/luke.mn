import CommandList from "../command-list";
import CopyLinkIcon from "../copy-link-icon";

export default function ShortInstructions({
  prerequisites,
  createApplication,
  deployApplication,
}: {
  prerequisites: string[];
  createApplication: string[];
  deployApplication: string[];
}) {
  const shortInstructions = [
    ...prerequisites,
    ...createApplication,
    ...deployApplication,
  ];
  return <CommandList steps={shortInstructions} />;
}
