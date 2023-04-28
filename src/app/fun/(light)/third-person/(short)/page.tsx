import { Theme } from '../../../../types'
import FunPage from '../../../../components/pages/fun-page'

export default function Page() {
  const theme: Partial<Theme> = {
    tense: 'third-person',
  }
  return (
    <FunPage theme={theme} />
  )
}
