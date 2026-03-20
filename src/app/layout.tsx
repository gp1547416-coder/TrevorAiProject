import './globals.css'; // This MUST match your filename exactly

export const metadata = {
  title: 'Trevor AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950">{children}</body>
    </html>
  )
}
