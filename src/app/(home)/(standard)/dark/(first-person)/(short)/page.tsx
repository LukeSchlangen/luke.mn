import { Theme } from '../../../../../types'
import StandardPage from '../../../../../components/pages/standard-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    vibe: 'standard',
    tense: 'third-person',
    verbosity: 'long'
  }
  return (
    <StandardPage theme={theme} />
  )
}
