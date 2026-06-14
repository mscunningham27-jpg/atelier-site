import { getArticlesBySection } from '@/lib/articles'
import SectionPage from '@/components/SectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Guild — The Atelier & The Altar',
  description: 'Community, spotlights, and the wider movement. Where makers are seen, the HearthLight family gathers, and the creative and spiritual life meet.',
}

export default function TheGuildPage() {
  return (
    <SectionPage
      config={{
        path: '/the-guild',
        label: 'The Guild',
        ornament: '✦',
        description: 'Community, spotlights, and the wider movement. Where makers are seen, the HearthLight family gathers, and the creative and spiritual life meet.',
        fontVar: 'var(--font-guild)',
        accentVar: 'var(--accent-guild)',
        roomBg: 'var(--room-guild)',
        emptyMessage: 'The Guild is gathering.',
      }}
      articles={getArticlesBySection('the-guild')}
    />
  )
}
