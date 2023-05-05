'use client'

import { Theme } from "../../types";
import FAQPage from "../../components/pages/faq-page";
import { usePathname } from 'next/navigation';
const theme: Theme = {
  color: 'dark',
  vibe: "standard",
  tense: "first-person",
  verbosity: "short"
}
export default function Page() {
  const pathname = usePathname();
  return (
    <FAQPage theme={theme} pathname={pathname} />
  )
}
