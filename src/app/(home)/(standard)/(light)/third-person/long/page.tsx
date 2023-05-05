import { Theme } from '../../../../../types'
import StandardPage from '../../../../../components/pages/standard-page'

export default function Page() {
  const theme: Theme = {
    tense: 'third-person',
    verbosity: 'long',
    vibe: 'standard',
    color: 'light'
  }
  return (
    <StandardPage theme={theme} />
  )
}
