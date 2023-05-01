import Link from 'next/link';
import { Theme } from '../types'

export default function NotificationBar({ theme: partialTheme }: { theme?: Partial<Theme> }) {
  const theme: Theme = {
    vibe: partialTheme?.vibe || 'fun',
    color: partialTheme?.color || 'light',
    tense: partialTheme?.tense || 'first-person',
    verbosity: partialTheme?.verbosity || 'short'
  }

  const isLight = theme.color === 'light';

  return (
    <div className={`rounded-lg drop-shadow-xl border mx-1 mb-8 mt-4 p-4 flex justify-between ${isLight ? 'bg-lime-200' : 'bg-emerald-800'}`}>
      <h2 className='text-xl font-bold sm:flex'>
        <div className='mr-2'>
          {'Derby Day Link: '}
        </div>
        <div>
          <Link href='https://derby-day.firebaseapp.com/' className='underline'>
            derby-day.firebaseapp.com
          </Link>
        </div>
      </h2>
      <div className='text-3xl font-bold'>🐎</div>
    </div>
  )
}
