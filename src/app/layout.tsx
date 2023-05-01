import Image from 'next/image'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-amber-200 overscroll-none'>
        {children}
      </body>
    </html>
  )
}
