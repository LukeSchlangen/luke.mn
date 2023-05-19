import FaqPage from "../../../../../components/pages/faq-page";
import { Theme } from "../../../../../types";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    tense: "third-person",
    vibe: "standard",
    color: "light",
    verbosity: "short",
  };
  return <FaqPage theme={theme} />;
}
