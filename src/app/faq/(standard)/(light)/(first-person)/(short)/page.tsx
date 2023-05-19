import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    verbosity: "short",
    vibe: "standard",
    color: "light",
    tense: "first-person",
  };
  return <FaqPage theme={theme} />;
}
