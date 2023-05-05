import { Theme } from '../../../../../types'
import StandardPage from '../../../../../components/pages/standard-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    tense: 'third-person',
    vibe: 'standard',
    verbosity: 'long'
  }
  return (
    <StandardPage theme={theme} />
  )
}
