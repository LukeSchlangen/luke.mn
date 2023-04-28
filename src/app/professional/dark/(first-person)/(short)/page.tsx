import { Theme } from '../../../../types'
import ProfessionalPage from '../../../../components/pages/professional-page'

export default function Page() {
  const theme: Partial<Theme> = {
    color: 'dark',
  }
  return (
    <ProfessionalPage theme={theme} />
  )
}
