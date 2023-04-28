import Link from 'next/link'
import { Theme } from '../../types';
import currentPath from '../../utils/current-path';

export default function VibeToggle({ theme }: { theme: Theme }) {
  const { vibe, color, tense, verbosity } = currentPath(theme);

  return (
    <div>
      <Link href={`/professional${color}${tense}${verbosity}`} className={vibe === '/professional' ? '' : 'opacity-50 hover:opacity-100'}>
        💼
      </Link>
      {' '}
      <Link href={`${color}${tense}${verbosity}` || '/'} className={vibe === '' ? '' : 'opacity-50 hover:opacity-100'}>
        😃
      </Link>
      {' '}
      <Link href={`/fun${color}${tense}${verbosity}`} className={vibe === '/fun' ? '' : 'opacity-50 hover:opacity-100'}>
        🎉
      </Link>
    </div>
  )
}
