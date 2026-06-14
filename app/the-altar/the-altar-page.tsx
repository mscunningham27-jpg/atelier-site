import { getArticlesBySection } from '@/lib/articles'
import SectionPage from '@/components/SectionPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Altar — The Atelier & The Altar',
  description: 'Prayer, Scripture, lament, and the inner life. For the honest questions — the ones you bring to God and the ones you are afraid to.',
}

export default function TheAltarPage() {
  return (
    <SectionPage
      config={{
        path: '/the-altar',
        label: 'The Altar',
        ornament: '†',
        description: 'Prayer, Scripture, lament, and the inner life. For the honest questions — the ones you bring to God and the ones you are afraid to.',
        fontVar: 'var(--font-altar)',
        accentVar: 'var(--accent-altar)',
        roomBg: 'var(--room-altar)',
        emptyMessage: 'The first pieces are on their way.',
      }}
      articles={getArticlesBySection('the-altar')}
    />
  )
}
