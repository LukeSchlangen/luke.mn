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

export default function Bio({ theme }: { theme: Theme }) {

  const isLight = theme.color === 'light';

  return (
    <div className='max-w-prose m-auto'>
      <div className={`rounded-lg drop-shadow-xl border -mt-8 sm:-mt-20 lg:mt-2 mx-2 p-4 w-fit ${theme.verbosity === 'short' && 'whitespace-nowrap'} ${isLight ? 'bg-gray-50' : 'bg-gray-950'}`}>
        <div className='flex justify-between mb-4 text-sm sm:text-base font-light'>
          <TenseToggle theme={theme} />
          <VerbosityToggle theme={theme} />
        </div>
        <div className={`text-md sm:text-lg lg:text-2xl ${theme.verbosity === 'short' ? '' : 'space-y-4'}`}>
          {bioText(theme)}
        </div>
      </div>
    </div>
  );
}
