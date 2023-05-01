import Bio from '../bio'
import Footer from '../footer'
import { Theme } from '../../types'
import yellowSweater from '../../../../public/headshots/luke-schlangen-headshot-yellow-sweater.jpg'
import Header from '../header'

export default function Fun({ theme: partialTheme }: { theme?: Partial<Theme> }) {
  const theme: Theme = {
    vibe: partialTheme?.vibe || 'fun',
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
      <div className='m-auto w-fit'>
        <Header theme={theme} imageSrc={yellowSweater} alt="Luke Schlangen in a yellow sweater" />
        <main className='block md:hidden'>
          <Bio theme={theme} />
        </main>
      </div>
      <Footer />
    </div>
  )
}
