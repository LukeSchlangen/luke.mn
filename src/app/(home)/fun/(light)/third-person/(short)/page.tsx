import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    tense: 'third-person',
    vibe: 'fun',
    color: 'light',
    verbosity: 'short'
  }
  return (
    <FunPage theme={theme} />
  )
}
