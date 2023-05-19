import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    tense: "third-person",
    verbosity: "long",
    vibe: "standard",
    color: "light",
  };
  return <FaqPage theme={theme} />;
}
