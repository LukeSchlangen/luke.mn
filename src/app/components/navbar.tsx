import { Roboto } from 'next/font/google'
import Link from 'next/link'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
  return (
    <nav>
      <div>First Person Short</div>
      <div>
        <Link href="/professional">
          Professional (Light)
        </Link>

        <Link href="/">
          Standard (Light)
        </Link>

        <Link href="/fun">
          Fun (Light)
        </Link>
      </div>

      <div>

        <Link href="/professional/dark">
          Professional (Dark)
        </Link>

        <Link href="/dark">
          Standard (Dark)
        </Link>

        <Link href="/fun/dark">
          Fun (Dark)
        </Link>
      </div>

      <div>Third Person Short</div>
      <div>
        <Link href="/professional/third-person-short">
          Professional (Light)
        </Link>

        <Link href="/third-person-short">
          Standard (Light)
        </Link>

        <Link href="/fun/third-person-short">
          Fun (Light)
        </Link>
      </div>

      <div>

        <Link href="/professional/dark/third-person-short">
          Professional (Dark)
        </Link>

        <Link href="/dark/third-person-short">
          Standard (Dark)
        </Link>

        <Link href="/fun/dark/third-person-short">
          Fun (Dark)
        </Link>
      </div>



      <div>Third Person Long</div>
      <div>
        <Link href="/professional/third-person-long">
          Professional (Light)
        </Link>

        <Link href="/third-person-long">
          Standard (Light)
        </Link>

        <Link href="/fun/third-person-long">
          Fun (Light)
        </Link>
      </div>

      <div>

        <Link href="/professional/dark/third-person-long">
          Professional (Dark)
        </Link>

        <Link href="/dark/third-person-long">
          Standard (Dark)
        </Link>

        <Link href="/fun/dark/third-person-long">
          Fun (Dark)
        </Link>
      </div>


      <div>First Person Long</div>
      <div>
        <Link href="/professional/first-person-long">
          Professional (Light)
        </Link>

        <Link href="/first-person-long">
          Standard (Light)
        </Link>

        <Link href="/fun/first-person-long">
          Fun (Light)
        </Link>
      </div>

      <div>

        <Link href="/professional/dark/first-person-long">
          Professional (Dark)
        </Link>

        <Link href="/dark/first-person-long">
          Standard (Dark)
        </Link>

        <Link href="/fun/dark/first-person-long">
          Fun (Dark)
        </Link>
      </div>
    </nav>
  )
}
