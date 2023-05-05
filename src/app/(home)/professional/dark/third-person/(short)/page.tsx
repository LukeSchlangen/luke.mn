import { Theme } from '../../../../../types'
import ProfessionalPage from '../../../../../components/pages/professional-page'

export default function Page() {
  const theme: Theme = {
    color: 'dark',
    tense: 'third-person',
    vibe: 'standard',
    verbosity: 'long'
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
