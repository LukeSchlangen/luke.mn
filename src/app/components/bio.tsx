import ShortFirstPersonBio from './bio-text/short-first-person-bio';
import LongThirdPersonBio from './bio-text/long-third-person-bio';
import ShortThirdPersonBio from './bio-text/short-third-person-bio';
import LongFirstPersonBio from './bio-text/long-first-person-bio';

export default function Bio({ voice }: {voice: string}) {
  switch (voice) {
    case 'third-person-short':
      return <ShortThirdPersonBio />;
    case 'third-person-long':
      return <LongThirdPersonBio />;
    case 'first-person-long':
      return <LongFirstPersonBio />;
    default:
      return <ShortFirstPersonBio />;
  }
}
