import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    page: "home",
    tense: "third-person",
    vibe: "professional",
    color: "light",
    verbosity: "short",
  };
  return <HomePage theme={theme} />;
}
