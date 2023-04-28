import { Theme } from '../../../../types'
import FunPage from '../../../../components/pages/fun-page'

export default function Page() {
  const theme: Partial<Theme> = {
    verbosity: 'long',
  }
  return (
    <FunPage theme={theme} />
  )
}
