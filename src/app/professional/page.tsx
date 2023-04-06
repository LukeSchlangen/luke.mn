import Image from 'next/image'

export default function Professional() {
  return (
    <main>
      <div>
        Professional
        <Image
          src="/luke-schlangen-headshot-black-suit-white-background.jpg"
          alt="Luke Schlangen in a black suit with a white background"
          height={150}
          width={100}
          priority
        />
      </div>
    </main>
  )
}
