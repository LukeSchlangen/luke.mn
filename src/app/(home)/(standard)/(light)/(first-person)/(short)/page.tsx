import { Theme } from '../../../../../types'
import StandardPage from '../../../../../components/pages/standard-page'

export default function Page() {
  const theme: Theme = {
    verbosity: 'long',
    vibe: 'standard',
    color: 'light',
    tense: 'first-person'
  }
  return (
    <StandardPage theme={theme} />
  )
}
