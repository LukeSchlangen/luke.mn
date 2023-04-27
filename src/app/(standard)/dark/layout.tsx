export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className="bg-slate-900 text-slate-100">
      {children}
    </body>
  )
}
