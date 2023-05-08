import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    vibe: 'professional',
    tense: 'third-person',
    verbosity: 'long'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
