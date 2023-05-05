import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    verbosity: 'short',
    vibe: 'standard',
    color: 'light',
    tense: 'first-person'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
