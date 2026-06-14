import { getArticlesBySection } from '@/lib/articles'
import SectionPage from '@/components/SectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Craft — The Atelier & The Altar',
  description: 'Practical guidance for the working artist — pricing, process, burnout, discipline, and the dignity of calling underneath all of it.',
}

export default function TheCraftPage() {
  return (
    <SectionPage
      config={{
        path: '/the-craft',
        label: 'The Craft',
        ornament: '✦',
        description: 'Practical guidance for the working artist — pricing, process, burnout, discipline, and the dignity of calling underneath all of it.',
        fontVar: 'var(--font-craft)',
        accentVar: 'var(--accent-craft)',
        roomBg: 'var(--room-craft)',
        emptyMessage: 'The first pieces are on their way.',
      }}
      articles={getArticlesBySection('the-craft')}
    />
  )
}
