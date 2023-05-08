import { Theme } from '../../../../../types'
import StandardPage from '../../../../../components/pages/standard-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    vibe: 'standard',
    tense: 'first-person',
    verbosity: 'short'
  }
  return (
    <StandardPage theme={theme} />
  )
}
