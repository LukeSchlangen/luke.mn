import Bio from '../bio'
import Footer from '../footer'
import Navbar from '../navbar'
import Image from 'next/image'
import { Theme } from '../../types'

export default function StandardPage({ theme: partialTheme }: { theme?: Partial<Theme> }) {
  const theme: Theme = {
    vibe: partialTheme?.vibe || 'standard',
    color: partialTheme?.color || 'light',
    tense: partialTheme?.tense || 'first-person',
    verbosity: partialTheme?.verbosity || 'short'
  }

  const isLight = theme.color === 'light';

  return (
    <body className={isLight ? 'bg-slate-200 text-slate-900' : 'bg-slate-800 text-slate-100'}>
      <main className='max-w-prose m-auto mt-2'>
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
          <Image
            className='rounded-lg drop-shadow-xl mx-2'
            src="/luke-schlangen-headshot-grey-sweater.jpg"
            alt="Luke Schlangen in a gray sweater with yellow background"
            height={300}
            width={200}
            priority
          />
        </div>
        <Bio className={isLight ? 'bg-slate-50' : 'bg-slate-950'} theme={theme} />
      </main>
      <Footer />
    </body>
  )
}
