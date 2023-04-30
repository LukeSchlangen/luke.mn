export const metadata = {
  title: 'Luke Schlangen Being A Professional',
  description: 'A personal website without the frills and absurdity of my other personal website.',
  icons: {
    icon: '/favicons/briefcase.svg',
  },
}

export default function ProfessionalLayout({
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
