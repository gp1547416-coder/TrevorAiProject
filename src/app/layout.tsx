import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trevor AI",
  description: "A standalone AI with a custom vocabulary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
