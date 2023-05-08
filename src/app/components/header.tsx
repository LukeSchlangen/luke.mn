import { Theme } from '../types';
import NotificationBar from './notification-bar';
import ProfileImage from './profile-image';
import Bio from './bio';
import VibeToggle from './toggles/vibe-toggle';
import ColorToggle from './toggles/color-toggle';

export default function Header({ theme }: { theme: Theme }) {

  const isLight = theme.color === 'light';

  return (
    <>
      <span className='block md:hidden'>
        <NotificationBar theme={theme} />
      </span>
      <div className='flex max-w-fit m-1 md:m-auto'>
        <div>
          <header>
            <span className='hidden md:block'>
              <NotificationBar theme={theme} />
            </span>
            <div className={`rounded-lg drop-shadow-xl border mt-16 md:mt-12 -mr-4 p-4 sm:pr-8 ${isLight ? 'bg-gray-50' : 'bg-gray-950'}`}>
              <h1 className='mb-2 md:flex'>
                <div className='text-6xl pr-3 sm:text-7xl'>
                  Luke
                </div>
                <div className='text-3xl sm:text-5xl md:text-7xl'>
                  Schlangen
                </div>
              </h1>
              <nav className='text-xl space-y-3 sm:text-3xl md:text-4xl sm:flex sm:justify-between sm:space-y-0'>
                <VibeToggle theme={theme} />
                <ColorToggle theme={theme} />
              </nav>
            </div>
          </header>
          <div className='hidden md:block'>
            <Bio theme={theme} />
          </div>
        </div>
        <ProfileImage theme={theme} />
      </div>
    </>
  )
}
