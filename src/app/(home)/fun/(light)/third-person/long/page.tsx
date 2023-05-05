import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    tense: 'third-person',
    verbosity: 'long',
    vibe: 'standard',
    color: 'light'
  }
  return (
    <FunPage theme={theme} />
  )
}
