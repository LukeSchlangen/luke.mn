import HomePage from "../../../../../components/pages/home-page";
import { Theme } from "../../../../../types";

export default function Page() {
  const theme: Theme = {
    vibe: "fun",
    color: "light",
    tense: "first-person",
    verbosity: "short",
  };
  return <HomePage theme={theme} />;
}
