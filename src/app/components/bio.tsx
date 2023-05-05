import { Theme } from '../types';
import LongBio from './bio-text/long-bio';
import ShortBio from './bio-text/short-bio';
import ProseContainer from './prose-container';
import TenseToggle from './toggles/tense-toggle';
import VerbosityToggle from './toggles/verbosity-toggle';

const bioTextLookup = {
  long: LongBio,
  short: ShortBio,
}

export default function Bio({ theme }: { theme: Theme }) {

  const BioText = bioTextLookup[theme.verbosity];

  return (
    <div className='-mt-6 sm:-mt-20 md:mt-0 '>
      <ProseContainer theme={theme}>
        <div className='flex justify-between mb-4 text-sm sm:text-base font-light'>
          <TenseToggle theme={theme} />
          <VerbosityToggle theme={theme} />
        </div>
        <div className={`sm:text-xl md:text-2xl lg:text-3xl ${theme.verbosity === 'short' ? 'whitespace-nowrap' : 'space-y-4'}`}>
          <BioText tense={theme.tense} />
        </div>
      </ProseContainer>
    </div>
  );
}
