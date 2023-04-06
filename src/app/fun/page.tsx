import Image from 'next/image'

export default function Professional() {
  return (
    <main>
      <div>
        Professional
        <Image
          src="/luke-schlangen-headshot-yellow-sweater.jpg"
          alt="Luke Schlangen in a yellow sweater with a yellow background"
          height={150}
          width={100}
          priority
        />
      </div>
    </main>
  )
}