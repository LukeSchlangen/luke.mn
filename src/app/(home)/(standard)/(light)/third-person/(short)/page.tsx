import StandardPage from "../../../../../components/pages/standard-page"
import { Theme } from "../../../../../types"


export default function Page() {
  const theme: Theme = {
    tense: 'third-person',
    vibe: "standard",
    color: "light",
    verbosity: "short"
  }
  return (
    <StandardPage theme={theme} />
  )
}
