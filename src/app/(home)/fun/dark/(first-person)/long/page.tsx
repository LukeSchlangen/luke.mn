import { Theme } from '../../../../../types'
import FunPage from '../../../../../components/pages/fun-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    verbosity: 'long',
    vibe: 'standard',
    tense: 'third-person'
  }
  return (
    <FunPage theme={theme} />
  )
}
