import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    verbosity: 'long',
    vibe: 'standard',
    color: 'light',
    tense: 'first-person'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
