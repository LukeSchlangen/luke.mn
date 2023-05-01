import Bio from '../bio'
import Footer from '../footer'
import Navbar from '../navbar'
import { Theme } from '../../types'
import NotificationBar from '../notification-bar'
import ProfileImage from '../profile-image'
import greySweater from '../../../../public/headshots/luke-schlangen-headshot-grey-sweater.jpg'
import Header from '../header'

export default function StandardPage({ theme: partialTheme }: { theme?: Partial<Theme> }) {
  const theme: Theme = {
    vibe: partialTheme?.vibe || 'standard',
    color: partialTheme?.color || 'light',
    tense: partialTheme?.tense || 'first-person',
    verbosity: partialTheme?.verbosity || 'short'
  }

  const isLight = theme.color === 'light';

  return (
    <div className={`min-h-screen min-w-screen p-2 ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {isLight ? 'body { background-color: #e5e7eb }' : 'body { background-color: #1f2937 }'}
      </style>
      <Header theme={theme} imageSrc={greySweater} alt="Luke Schlangen in a grey sweater" />
      <main className='block md:hidden'>
        <Bio theme={theme} />
      </main>
      <Footer />
    </div>
  )
}
