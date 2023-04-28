import { Theme } from '../types';
import LongBio from './bio-text/long-bio';
import ShortBio from './bio-text/short-bio';
import TenseToggle from './toggles/tense-toggle';
import VerbosityToggle from './toggles/verbosity-toggle';

function bioText(theme: Theme) {
  if (theme.verbosity === 'long') {
    return <LongBio tense={theme.tense} />;
  }
  return <ShortBio tense={theme.tense} />;
}

export default function Bio({ theme, className }: { theme: Theme, className: string }) {
  return (
    <div className={`rounded-lg drop-shadow-xl border -mt-8 mx-1 p-4 w-fit ${theme.verbosity === 'short' && 'whitespace-nowrap'} ${className}`}>
      <div className='flex justify-between mb-4 text-sm font-light'>
        <TenseToggle theme={theme} />
        <VerbosityToggle theme={theme} />
      </div>
      <div className={`text-md md:text-lg ${theme.verbosity === 'short' ? '' : 'space-y-4'}`}>
        {bioText(theme)}
      </div>
    </div>
  );
}
