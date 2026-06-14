import { getArticlesBySection } from '@/lib/articles'
import SectionPage from '@/components/SectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Assignment — The Atelier & The Altar',
  description: 'Theology of creativity and calling. The why beneath the work — for artists, makers, and anyone who has wondered if their creative life is a sacred one.',
}

export default function TheAssignmentPage() {
  return (
    <SectionPage
      config={{
        path: '/the-assignment',
        label: 'The Assignment',
        ornament: '✦',
        description: 'Theology of creativity and calling. The why beneath the work — for the artist who wonders whether making things is a sacred act.',
        fontVar: 'var(--font-assignment)',
        accentVar: 'var(--accent-assignment)',
        roomBg: 'var(--room-assignment)',
        emptyMessage: 'The first pieces are on their way.',
      }}
      articles={getArticlesBySection('the-assignment')}
    />
  )
}
