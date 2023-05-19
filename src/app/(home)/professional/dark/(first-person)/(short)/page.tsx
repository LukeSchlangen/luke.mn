import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    color: "dark",
    vibe: "professional",
    tense: "first-person",
    verbosity: "short",
  };
  return <HomePage theme={theme} />;
}
