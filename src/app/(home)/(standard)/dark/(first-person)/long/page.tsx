import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    page: "home",
    color: "dark",
    verbosity: "long",
    vibe: "standard",
    tense: "first-person",
  };
  return <HomePage theme={theme} />;
}
