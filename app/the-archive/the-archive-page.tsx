import { getArticlesBySection } from '@/lib/articles'
import SectionPage from '@/components/SectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Archive — The Atelier & The Altar',
  description: 'Historic artists, works, and material culture of the faith. The story behind the work — from the painters, composers, and poets who made things for God.',
}

export default function TheArchivePage() {
  return (
    <SectionPage
      config={{
        path: '/the-archive',
        label: 'The Archive',
        ornament: '◈',
        description: 'Historic artists, works, and material culture of the faith. The story behind the work — from the painters, composers, and poets who made things for God.',
        fontVar: 'var(--font-archive)',
        accentVar: 'var(--accent-archive)',
        roomBg: 'var(--room-archive)',
        emptyMessage: 'The archive is being assembled.',
      }}
      articles={getArticlesBySection('the-archive')}
    />
  )
}
