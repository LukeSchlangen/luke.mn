export const metadata = {
  title: 'Luke Schlangen Having Fun!',
  description: 'I believe learning follows excitement! This is a silly version of my personal website.',
  icons: {
    icon: '/favicons/party-popper.svg',
  },
}

export default function FunLayout({
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
