import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    verbosity: "short",
    vibe: "professional",
    color: "light",
    tense: "first-person",
  };
  return <HomePage theme={theme} />;
}
