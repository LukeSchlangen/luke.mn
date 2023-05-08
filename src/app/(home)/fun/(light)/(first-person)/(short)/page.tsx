import FunPage from '../../../../../components/pages/fun-page'
import { Theme } from '../../../../../types'

export default function Page() {
  const theme: Theme = {
    vibe: 'fun',
    color: 'light',
    tense: 'first-person',
    verbosity: 'short'
  }
  return (
    <FunPage theme={theme} />
  )
}
