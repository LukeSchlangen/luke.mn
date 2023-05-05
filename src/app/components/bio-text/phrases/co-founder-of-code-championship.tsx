import Link from 'next/link'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

export default function CoFounderOfCodeChampionship() {
  return (
    <Link href="https://www.codechampionship.com/" className='underline decoration-blue-400 hover:decoration-blue-600'>
      {'co-founder of '}
      <span className={orbitron.className}>
        Code Championship
      </span>
    </Link>
  )
}
