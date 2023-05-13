import { Theme } from "../../../../../types";
import ProfessionalPage from "../../../../../components/pages/professional-page";

export default function Page() {
  const theme: Theme = {
    tense: "third-person",
    vibe: "professional",
    color: "light",
    verbosity: "short",
  };
  return <ProfessionalPage theme={theme} />;
}
