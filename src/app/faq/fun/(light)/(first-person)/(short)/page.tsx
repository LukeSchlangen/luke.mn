import FaqPage from "../../../../../components/pages/faq-page";
import { Theme } from "../../../../../types";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    vibe: "fun",
    color: "light",
    tense: "first-person",
    verbosity: "short",
  };
  return <FaqPage theme={theme} />;
}
