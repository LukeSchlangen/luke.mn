import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    vibe: 'professional',
    tense: 'first-person',
    verbosity: 'short'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
