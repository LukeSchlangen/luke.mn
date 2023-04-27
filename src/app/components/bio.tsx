import FirstPersonShortBio from './bio-text/first-person-short-bio';
import ThirdPersonLongBio from './bio-text/third-person-long-bio';
import ThirdPersonShortBio from './bio-text/third-person-short-bio';
import FirstPersonLongBio from './bio-text/first-person-long-bio';
import { Theme } from '../types';

export default function Bio({ theme }: {theme: Theme}) {
  if (theme.tense === 'third-person') {
    if (theme.verbosity === 'long') return <ThirdPersonLongBio />;
    return <ThirdPersonShortBio />
  }
  if (theme.verbosity === 'long') return <FirstPersonLongBio />;
  return <FirstPersonShortBio />;
}
