import Bio from '../bio'
import Footer from '../footer'
import Navbar from '../navbar'
import { Theme } from '../../types'
import NotificationBar from '../notification-bar'
import ProfileImage from '../profile-image'

export default function ProfessionalPage({ theme: partialTheme }: { theme?: Partial<Theme> }) {
  const theme: Theme = {
    vibe: partialTheme?.vibe || 'professional',
    color: partialTheme?.color || 'light',
    tense: partialTheme?.tense || 'first-person',
    verbosity: partialTheme?.verbosity || 'short'
  }

  const isLight = theme.color === 'light';

  return (
    <div className={`min-h-100 min-w-100 pt-2 ${isLight ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-slate-100'}`}>
      <main className='max-w-prose m-auto'>
        <NotificationBar theme={theme} />
        <div className='flex w-100'>
          <div className={`rounded-lg drop-shadow-xl border mt-16 sm:mt-20 ml-4 -mr-4 p-4 ${isLight ? 'bg-slate-50' : 'bg-slate-950'}`}>
            <h1 className='mb-2'>
              <div className='text-6xl sm:text-7xl'>
                Luke
              </div>
              <div className='text-2xl sm:text-4xl'>
                Schlangen
              </div>
            </h1>
            <Navbar theme={theme} />
          </div>
          {isLight ? (
            <ProfileImage
              src="/luke-schlangen-headshot-black-suit-white-background.jpg"
              alt="Luke Schlangen in a black suit with white background"
            />
          ) : (

            <ProfileImage
              src="/luke-schlangen-headshot-black-suit-black-background.jpg"
              alt="Luke Schlangen in a black suit with black background"
            />
          )}
        </div>
        <Bio className={isLight ? 'bg-slate-50' : 'bg-slate-950'} theme={theme} />
      </main>
      <Footer />
    </div>
  )
}
