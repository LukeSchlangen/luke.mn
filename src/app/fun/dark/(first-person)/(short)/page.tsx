import { Theme } from '../../../../types'
import FunPage from '../../../../components/pages/fun-page'

export default function Page() {
  const theme: Partial<Theme> = {
    color: 'dark',
  }
  return (
    <FunPage theme={theme} />
  )
}
