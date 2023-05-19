import { Theme } from "../../../../../types";
import FaqPage from "../../../../../components/pages/faq-page";

export default function Page() {
  const theme: Theme = {
    page: "faq",
    color: "dark",
    verbosity: "long",
    vibe: "professional",
    tense: "first-person",
  };
  return <FaqPage theme={theme} />;
}
