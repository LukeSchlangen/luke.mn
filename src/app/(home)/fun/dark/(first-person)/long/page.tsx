import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    verbosity: "long",
    vibe: "fun",
    tense: "first-person",
  };
  return <HomePage theme={theme} />;
}
