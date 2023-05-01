import Link from 'next/link'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  weight: '400',
  subsets: ['latin'],
})

export default function CoFounderOfCodeChampionship() {
  return (
    <Link href="https://www.codechampionship.com/" className='underline'>
    {'co-founder of '}
    <span className={`text-sm sm:text-base lg:text-xl ${orbitron.className}`}>
      Code Championship
    </span>
  </Link>
  )
}
