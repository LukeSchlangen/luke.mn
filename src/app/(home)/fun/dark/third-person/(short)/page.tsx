import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    tense: "third-person",
    vibe: "fun",
    verbosity: "short",
  };
  return <HomePage theme={theme} />;
}
