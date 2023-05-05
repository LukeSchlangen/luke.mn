import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    tense: 'third-person',
    vibe: 'standard',
    verbosity: 'long'
  }
  return (
    <FunPage theme={theme} />
  )
}
