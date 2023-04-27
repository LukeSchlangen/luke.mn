import Link from 'next/link'

export default function ShortFirstPersonBio() {
  return (
    <>
      <p>
        {'I am a '}
        <Link href="https://cloud.google.com/developers/advocates/luke-schlangen?hl=en">
          developer advocate at Google
        </Link>
        .
      </p>
      <p>
        {'I am a co-founder of '}
        <Link href="https://www.codechampionship.com/">
          Code Championship
        </Link>
        .
      </p>
      <p>
        {'I believe '}
        <Link href="https://youtu.be/n4L4gWoZJBU">
          learning follows excitement
        </Link>
        .
      </p>
    </>
  )
}
