import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    verbosity: 'long',
    vibe: 'fun',
    color: 'light',
    tense: 'first-person'
  }
  return (
    <FunPage theme={theme} />
  )
}
