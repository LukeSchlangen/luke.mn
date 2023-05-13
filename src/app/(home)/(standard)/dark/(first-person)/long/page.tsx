import { Theme } from "../../../../../types";
import StandardPage from "../../../../../components/pages/standard-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    verbosity: "long",
    vibe: "standard",
    tense: "first-person",
  };
  return <StandardPage theme={theme} />;
}
