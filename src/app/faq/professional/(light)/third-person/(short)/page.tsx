import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    tense: "third-person",
    vibe: "professional",
    color: "light",
    verbosity: "short",
  };
  return <FaqPage theme={theme} />;
}
