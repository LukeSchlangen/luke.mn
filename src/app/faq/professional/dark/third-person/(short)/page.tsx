import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    color: "dark",
    tense: "third-person",
    vibe: "professional",
    verbosity: "short",
  };
  return <FaqPage theme={theme} />;
}
