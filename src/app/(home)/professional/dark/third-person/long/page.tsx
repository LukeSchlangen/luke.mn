import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    tense: 'third-person',
    verbosity: 'long',
    vibe: 'standard'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
