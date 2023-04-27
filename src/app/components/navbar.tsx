import { Roboto } from 'next/font/google'
import Link from 'next/link'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const voiceMap = new Map<string, { tense: 'first-person' | 'third-person', verbosity: 'short' | 'long' }>();

voiceMap.set('third-person-short', { tense: 'third-person', verbosity: 'short' });
voiceMap.set('first-person-long', { tense: 'first-person', verbosity: 'long' });
voiceMap.set('third-person-long', { tense: 'third-person', verbosity: 'long' });

export default function Navbar({ theme }: { theme: { vibe: string; color: string; voice: string; } }) {
  const { vibe, color, voice } = theme;
  const currentVibePath = vibe === 'standard' ? '' : `/${vibe}`;
  const currentColorPath = color === 'light' ? '' : '/dark';
  const currentVoicePath = voice === 'first-person-short' ? '' : `/${voice}`;
  const voiceObject = voiceMap.get(voice) || { tense: 'first-person', verbosity: 'short' };
  return (
    <nav>
      <div>
        {'Color toggle -> '}
        {/* color toggle */}
        {/* Whatever vibe and voice it is right now, flipped to the other color */}
        <Link href={`${currentVibePath}${currentVoicePath}` || '/'}>
          Light
        </Link>
        {' | '}
        <Link href={`${currentVibePath}/dark${currentVoicePath}`}>
          Dark
        </Link>
      </div>

      <div>
        {/* vibe navigation */}
        {/* Whatever color and voice it is right now, flipped to the two other vibes */}

        {'Vibe toggle -> '}
        <Link href={`/professional${currentColorPath}${currentVoicePath}` || '/'}>
          Professional
        </Link>
        {' | '}
        <Link href={`${currentColorPath}${currentVoicePath}` || '/'}>
          Standard
        </Link>
        {' | '}
        <Link href={`/fun${currentColorPath}${currentVoicePath}`}>
          Fun
        </Link>
      </div>


      <div>
        {'Tense toggle -> '}
        <Link href={`${currentVibePath}${currentColorPath}${voiceObject.verbosity === 'short' ? '' : '/first-person-long'}` || '/'}>
          First Person
        </Link>
        {' | '}
        <Link href={`${currentVibePath}${currentColorPath}/third-person-${voiceObject.verbosity}`}>
          Third Person
        </Link>
      </div>


      <div>
        {'Length toggle -> '}
        <Link href={`${currentVibePath}${currentColorPath}${voiceObject.tense === 'first-person' ? '' : '/third-person-short'}` || '/'}>
          Short
        </Link>
        {' | '}
        <Link href={`${currentVibePath}${currentColorPath}/${voiceObject.tense}-long`}>
          Long
        </Link>
      </div>
    </nav>
  )
}
