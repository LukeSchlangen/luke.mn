export const metadata = {
  title: 'Frequently Asked Questions | Luke Schlangen',
  description: 'A list of questions I\'ve been asked more than once',
  icons: {
    icon: '/favicons/question-mark.svg',
  },
}

export default function StandardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
