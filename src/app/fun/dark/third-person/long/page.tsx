import { Theme } from '../../../../types'
import FunPage from '../../../../components/pages/fun-page'

export default function Page() {
  const theme: Partial<Theme> = {
    color: 'dark',
    tense: 'third-person',
    verbosity: 'long',
  }
  return (
    <FunPage theme={theme} />
  )
}
