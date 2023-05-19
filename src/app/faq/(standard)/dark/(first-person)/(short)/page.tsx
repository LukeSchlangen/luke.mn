import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    color: "dark",
    vibe: "standard",
    tense: "first-person",
    verbosity: "short",
  };
  return <FaqPage theme={theme} />;
}
