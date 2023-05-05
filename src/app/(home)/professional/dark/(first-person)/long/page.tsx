import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    verbosity: 'long',
    vibe: 'standard',
    tense: 'third-person'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
