import { Theme } from "../types";
import WorkoutPage from "../components/pages/workout-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    verbosity: "short",
    vibe: "standard",
    color: "light",
    tense: "first-person",
  };
  return <WorkoutPage theme={theme} />;
}
