import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import Image from 'next/image'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body style={{ backgroundColor: 'black', color: 'white' }}>
      {children}
    </body>
  )
}
