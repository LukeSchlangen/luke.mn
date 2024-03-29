import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    page: "home",
    color: "dark",
    tense: "third-person",
    verbosity: "long",
    vibe: "professional",
  };
  return <HomePage theme={theme} />;
}
