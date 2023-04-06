import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <Link
          href="/professional"
        >
          <h2 className={inter.className}>
            Professional <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Luke in a suit
          </p>
        </Link>

        <Link
          href="/"
        >
          <h2 className={inter.className}>
            Regular <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Luke in a sweater
          </p>
        </Link>
        <Link
          href="/fun"
        >
          <h2 className={inter.className}>
            Fun <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Luke in a yellow sweater
          </p>
        </Link>
      </div>
    </main>
  )
}
