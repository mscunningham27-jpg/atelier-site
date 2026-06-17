import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Jost,
  EB_Garamond,
  Libre_Baskerville,
  IM_Fell_English,
  Cinzel,
  Lora,
} from 'next/font/google'
import './globals.css'

// ── Masthead & body serif ─────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

// ── Navigation & UI ───────────────────────────────────────────────
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
  display: 'swap',
})

// ── The Assignment — humanist theological journal ─────────────────
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-assignment',
  display: 'swap',
})

// ── The Craft — sturdy craftsman serif ────────────────────────────
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-craft',
  display: 'swap',
})

// ── The Archive — antiquarian, aged ───────────────────────────────
const imFellEnglish = IM_Fell_English({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-archive',
  display: 'swap',
})

// ── The Altar — liturgical, inscriptional ─────────────────────────
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-altar',
  display: 'swap',
})

// ── The Guild — warm, human, inviting ─────────────────────────────
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-guild',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Atelier & The Altar — Faith, Craft, and the Life Between',
  description:
    'A faith-culture magazine for people who take both God and craft seriously. Beauty, depth, and honesty — without having to choose.',
  openGraph: {
    title: 'The Atelier & The Altar',
    description: 'A faith-culture magazine for people who take both God and craft seriously.',
    siteName: 'The Atelier & The Altar',
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          url: 'https://www.atelierandaltar.com/feed.xml',
          title: 'The Atelier & The Altar RSS Feed',
        },
      ],
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        cormorant.variable,
        jost.variable,
        ebGaramond.variable,
        libreBaskerville.variable,
        imFellEnglish.variable,
        cinzel.variable,
        lora.variable,
      ].join(' ')}
    >
      <body>
        {children}
      </body>
    </html>
  )
}
