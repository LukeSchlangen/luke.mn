import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main>
        <div style={{width: '10px'}}>
        Standard (Home)
        <Image
          src="/luke-schlangen-headshot-grey-sweater.jpg"
          alt="Luke Schlangen in a gray sweater with yellow background"
          height={150}
          width={100}
          priority
        />
      </div>
    </main >
    </>
  )
}
