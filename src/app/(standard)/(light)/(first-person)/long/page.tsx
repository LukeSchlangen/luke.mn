import Bio from '../../../../components/bio'
import Footer from '../../../../components/footer'
import Navbar from '../../../../components/navbar'
import Image from 'next/image'
import { Theme } from '../../../../types'

export default function Page() {
  const theme: Theme = {
    vibe: 'standard',
    color: 'light',
    tense: 'first-person',
    verbosity: 'long'
  }
  return (
    <>
      <Navbar theme={theme} />
      Standard Home (Light)
      <Image
        src="/luke-schlangen-headshot-grey-sweater.jpg"
        alt="Luke Schlangen in a gray sweater with yellow background"
        height={150}
        width={100}
        priority
      />
      <Bio theme={theme} />
      <Footer />
    </>
  )
}
