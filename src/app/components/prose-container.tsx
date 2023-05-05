import { Theme } from '../types';

export default function ProseContainer({ children, theme }: { theme: Theme, children: React.ReactNode }) {

  const isLight = theme.color === 'light';

  return (
    <div className='max-w-prose m-auto'>
      <div 
      className={`
        rounded-lg drop-shadow-xl border m-2 p-4 w-fit md:w-[32rem] lg:w-[40rem]
        ${isLight ? 'bg-gray-50' : 'bg-gray-950'}
      `}
      >
        {children}
      </div>
    </div>
  );
}
