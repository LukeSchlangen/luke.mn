import { Theme } from "../../../../../types";
import HomePage from "../../../../../components/pages/home-page";

export default function Page() {
  const theme: Theme = {
    page: "home",
    verbosity: "long",
    vibe: "professional",
    color: "light",
    tense: "first-person",
  };
  return <HomePage theme={theme} />;
}
