import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    tense: "third-person",
    verbosity: "long",
    vibe: "standard",
  };
  return <HomePage theme={theme} />;
}
