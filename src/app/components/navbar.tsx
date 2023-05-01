import { Theme } from '../types';
import VibeToggle from './toggles/vibe-toggle';
import ColorToggle from './toggles/color-toggle';

export default function Navbar({ theme }: { theme: Theme }) {
  return (
    <nav className='text-xl space-y-3 sm:text-3xl md:text-4xl sm:flex sm:justify-between sm:space-y-0'>
      <VibeToggle theme={theme} />
      <ColorToggle theme={theme} />
    </nav>
  )
}
