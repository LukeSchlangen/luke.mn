import { Theme } from '../../../../types'
import StandardPage from '../../../../components/pages/standard-page'

export default function Page() {
  const theme: Partial<Theme> = {
    color: 'dark',
    tense: 'third-person',
  }
  return (
    <StandardPage theme={theme} />
  )
}
