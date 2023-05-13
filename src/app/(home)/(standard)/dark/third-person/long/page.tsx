import { Theme } from "../../../../../types";
import StandardPage from "../../../../../components/pages/standard-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    tense: "third-person",
    verbosity: "long",
    vibe: "standard",
  };
  return <StandardPage theme={theme} />;
}
