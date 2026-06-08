import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Atelier & The Altar — Faith, Craft, and the Life Between',
  description:
    'A faith-culture magazine for people who take both God and craft seriously. Beauty, depth, and honesty — without having to choose.',
  openGraph: {
    title: 'The Atelier & The Altar',
    description:
      'A faith-culture magazine for people who take both God and craft seriously.',
    siteName: 'The Atelier & The Altar',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
