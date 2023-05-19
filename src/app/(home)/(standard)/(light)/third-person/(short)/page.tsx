import HomePage from "../../../../../components/pages/home-page";
import { Theme } from "../../../../../types";

export default function Page() {
  const theme: Theme = {
    tense: "third-person",
    vibe: "standard",
    color: "light",
    verbosity: "short",
  };
  return <HomePage theme={theme} />;
}
