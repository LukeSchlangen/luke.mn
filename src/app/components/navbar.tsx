import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { Theme } from '../types';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})



export default function Navbar({ theme }: { theme: Theme }) {
  const { vibe, color, tense, verbosity } = theme;
  const currentVibePath = vibe === 'standard' ? '' : `/${vibe}`;
  const currentColorPath = color === 'light' ? '' : `/${color}`;
  const currentTensePath = tense === 'first-person' ? '' : `/${tense}`;
  const currentVerbosityPath = verbosity === 'short' ? '' : `/${verbosity}`;

  return (
    <nav>
      <div>
        {'Color toggle -> '}
        {/* color toggle */}
        {/* Whatever vibe and voice it is right now, flipped to the other color */}
        <Link href={`${currentVibePath}${currentTensePath}${currentVerbosityPath}` || '/'}>
          Light
        </Link>
        {' | '}
        <Link href={`${currentVibePath}/dark${currentTensePath}${currentVerbosityPath}`}>
          Dark
        </Link>
      </div>

      <div>
        {/* vibe navigation */}
        {/* Whatever color and voice it is right now, flipped to the two other vibes */}

        {'Vibe toggle -> '}
        <Link href={`/professional${currentColorPath}${currentTensePath}${currentVerbosityPath}` || '/'}>
          Professional
        </Link>
        {' | '}
        <Link href={`${currentColorPath}${currentTensePath}${currentVerbosityPath}` || '/'}>
          Standard
        </Link>
        {' | '}
        <Link href={`/fun${currentColorPath}${currentTensePath}${currentVerbosityPath}`}>
          Fun
        </Link>
      </div>


      <div>
        {'Tense toggle -> '}
        <Link href={`${currentVibePath}${currentColorPath}${currentVerbosityPath}` || '/'}>
          First Person
        </Link>
        {' | '}
        <Link href={`${currentVibePath}${currentColorPath}/third-person${currentVerbosityPath}`}>
          Third Person
        </Link>
      </div>


      <div>
        {'Length toggle -> '}
        <Link href={`${currentVibePath}${currentColorPath}${currentTensePath}` || '/'}>
          Short
        </Link>
        {' | '}
        <Link href={`${currentVibePath}${currentColorPath}${currentTensePath}/long`}>
          Long
        </Link>
      </div>
    </nav>
  )
}
