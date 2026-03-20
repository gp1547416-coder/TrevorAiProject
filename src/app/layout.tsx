import './globals.css'; // Make sure this matches your filename!

export const metadata = {
  title: 'Trevor AI',
  description: 'A learning AI bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
