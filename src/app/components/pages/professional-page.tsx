import Bio from '../bio'
import Footer from '../footer'
import { Theme } from '../../types'
import blackSuitWhiteBackground from '../../../../public/headshots/luke-schlangen-headshot-black-suit-white-background.jpg'
import blackSuitBlackBackground from '../../../../public/headshots/luke-schlangen-headshot-black-suit-black-background.jpg'
import Header from '../header'

export default function ProfessionalPage({ theme }: { theme: Theme }) {

  const isLight = theme.color === 'light';

  return (
    <div className={`min-h-screen min-w-screen p-2 ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {isLight ? 'body { background-color: #e5e7eb }' : 'body { background-color: #1f2937 }'}
      </style>
      <Header theme={theme} />
      <main className='block md:hidden'>
        <Bio theme={theme} />
      </main>
      <Footer />
    </div>
  )
}
