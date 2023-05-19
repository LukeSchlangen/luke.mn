import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    tense: "third-person",
    verbosity: "long",
    vibe: "fun",
    color: "light",
  };
  return <HomePage theme={theme} />;
}
