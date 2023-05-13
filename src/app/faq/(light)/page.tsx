import { Theme } from "../../types";
import FAQPage from "../../components/pages/faq-page";

const theme: Theme = {
  color: "light",
  vibe: "standard",
  tense: "first-person",
  verbosity: "short",
};
export default function Page() {
  return <FAQPage theme={theme} />;
}
