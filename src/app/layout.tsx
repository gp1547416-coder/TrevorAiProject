import './global.css'; // Make sure this matches the filename above!

export const metadata = {
  title: 'Trevor AI',
  description: 'Learning Machine AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
