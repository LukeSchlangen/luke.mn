import { Roboto } from 'next/font/google'
import Link from 'next/link'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
  return (
    <nav>
      <Link
        href="/professional"
      >
        <h2 className={roboto.className}>
          Professional <span>-&gt;</span>
        </h2>
        <p className={roboto.className}>
          Luke in a suit
        </p>
      </Link>

      <Link
        href="/"
      >
        <h2 className={roboto.className}>
          Standard <span>-&gt;</span>
        </h2>
        <p className={roboto.className}>
          Luke in a sweater
        </p>
      </Link>
      <Link
        href="/fun"
      >
        <h2 className={roboto.className}>
          Fun <span>-&gt;</span>
        </h2>
        <p className={roboto.className}>
          Luke in a yellow sweater
        </p>
      </Link>
    </nav>
  )
}
