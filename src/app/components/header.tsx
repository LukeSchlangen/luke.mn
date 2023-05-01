import { StaticImageData } from 'next/image';
import { Theme } from '../types';
import NotificationBar from './notification-bar';
import ProfileImage from './profile-image';
import Navbar from './navbar';
import Bio from './bio';

export default function Header({ theme, imageSrc, alt }: { theme: Theme, imageSrc: StaticImageData, alt: string }) {

  const isLight = theme.color === 'light';

  return (
    <header>
      <span className='block md:hidden'>
        <NotificationBar theme={theme} />
      </span>
      <div className='flex max-w-fit m-1 md:m-auto'>
        <div>
          <div>
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
              <Navbar theme={theme} />
            </div>
          </div>
          <div className='hidden md:block'>
            <Bio theme={theme} />
          </div>
        </div>
        <div className='max-w-10'>
          <ProfileImage
            src={imageSrc}
            alt={alt}
          />
        </div>
      </div>
    </header>
  )
}
