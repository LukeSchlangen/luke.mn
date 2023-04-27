export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className="bg-slate-100 text-slate-900">
      {children}
    </body>
  )
}
