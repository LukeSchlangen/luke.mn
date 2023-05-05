'use client'

import { Theme } from "../../types";
import FAQPage from "../../components/pages/faq-page";
import { useRouter } from "next/router";
const theme: Theme = {
  color: 'dark',
  vibe: "standard",
  tense: "first-person",
  verbosity: "short"
}
export default function Page() {
  const {pathname} = useRouter();
  return (
    <FAQPage theme={theme} pathname={pathname} />
  )
}
