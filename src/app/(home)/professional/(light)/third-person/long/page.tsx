import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    tense: 'third-person',
    verbosity: 'long',
    vibe: 'standard',
    color: 'light'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
