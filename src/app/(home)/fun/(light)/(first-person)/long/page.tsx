import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    verbosity: 'long',
    vibe: 'standard',
    color: 'dark',
    tense: 'third-person'
  }
  return (
    <FunPage theme={theme} />
  )
}
