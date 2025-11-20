import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yonatan Resume',
  description: 'Professional resume website built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}