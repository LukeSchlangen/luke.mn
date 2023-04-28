import { Theme } from '../../../../types'
import ProfessionalPage from '../../../../components/pages/professional-page'

export default function Page() {
  const theme: Partial<Theme> = {
    tense: 'third-person',
    verbosity: 'long',
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
