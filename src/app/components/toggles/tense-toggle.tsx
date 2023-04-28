import Link from 'next/link'
import { Theme } from '../../types';
import currentPath from '../../utils/current-path';

export default function TenseToggle({ theme }: { theme: Theme }) {
  const { tense, color, vibe, verbosity } = currentPath(theme);

  return (
    <div>
      <Link href={`${vibe}${color}${verbosity}` || '/'} className={tense === '' ? 'underline' : ''}>
        1st Person
      </Link>
      {' | '}
      <Link href={`${vibe}${color}/third-person${verbosity}`} className={tense === '/third-person' ? 'underline' : ''}>
        3rd Person
      </Link>
    </div>
  )
}
