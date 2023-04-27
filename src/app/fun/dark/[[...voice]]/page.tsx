import Bio from '../../../components/bio'
import Footer from '../../../components/footer'
import Navbar from '../../../components/navbar'
import Image from 'next/image'
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function Voice({ params }: { params: { voice: string } }) {
  const voice = params.voice && params.voice[0]
  if (voice && !['first-person-short', 'third-person-short', 'first-person-long', 'third-person-long'].includes(voice)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      Fun
      <Image
        src="/luke-schlangen-headshot-yellow-sweater.jpg"
        alt="Luke Schlangen in a yellow sweater with a yellow background"
        height={150}
        width={100}
        priority
      />
      <Bio voice={voice} />
      <Footer />
    </>
  )
}
