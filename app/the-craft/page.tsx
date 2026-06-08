import Link from 'next/link'
import { getArticlesBySection } from '@/lib/articles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Craft — The Atelier & The Altar',
  description: 'Practical guidance for the working artist — pricing, process, burnout, discipline, and the dignity of calling underneath all of it.',
}

const ATELIER_LETTERS = [
  { char: 'A', weight: 300, scale: 0.91, italic: false, offset: 3,  color: '#8C6830' },
  { char: 'T', weight: 700, scale: 1.07, italic: false, offset: 0,  color: '#1C1008' },
  { char: 'E', weight: 400, scale: 0.96, italic: true,  offset: -2, color: '#3A2810' },
  { char: 'L', weight: 600, scale: 1.03, italic: false, offset: 0,  color: '#1C1008' },
  { char: 'I', weight: 300, scale: 0.89, italic: false, offset: 4,  color: '#C8820A' },
  { char: 'E', weight: 500, scale: 1.05, italic: true,  offset: -1, color: '#3A2810' },
  { char: 'R', weight: 400, scale: 0.98, italic: false, offset: 0,  color: '#1C1008' },
]

const SECTIONS = [
  { name: 'The Assignment', path: '/the-assignment' },
  { name: 'The Craft',      path: '/the-craft' },
  { name: 'The Archive',    path: '/the-archive' },
  { name: 'The Altar',      path: '/the-altar' },
  { name: 'The Guild',      path: '/the-guild' },
]

export default function TheCraftPage() {
  const articles = getArticlesBySection('the-craft')
  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '0.5px solid var(--border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div className="divider-line" />
            <span className="rule-ornament" style={{ fontSize: '8px', letterSpacing: '0.28em' }}>HearthLight Media</span>
            <div className="divider-line" />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(9px, 1.2vw, 13px)', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginRight: 'clamp(6px, 1vw, 14px)', position: 'relative', top: '-4px' }}>THE</span>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', marginRight: 'clamp(6px, 1.2vw, 16px)' }}>
                {ATELIER_LETTERS.map((l, i) => (
                  <span key={i} className="masthead-letter" style={{ fontSize: `clamp(${Math.round(28 * l.scale)}px, ${(4.5 * l.scale).toFixed(2)}vw, ${Math.round(58 * l.scale)}px)`, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal', color: l.color, position: 'relative', top: `${l.offset}px`, letterSpacing: '0.01em' }}>{l.char}</span>
                ))}
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--hearthgold)', lineHeight: 1, position: 'relative', top: 'clamp(6px, 1.2vw, 16px)', margin: '0 clamp(4px, 0.8vw, 10px)' }}>&</span>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'clamp(4px, 0.6vw, 8px)', marginLeft: 'clamp(2px, 0.4vw, 6px)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px, 2.2vw, 26px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-mid)' }}>The</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4.5vw, 58px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.015em' }}>Altar</span>
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 300, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '10px 0 0', opacity: 0.65 }}>Faith · Craft · The Life Between</p>
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px, 3vw, 40px)', padding: '16px 0' }}>
            {SECTIONS.map((s) => (
              <Link key={s.name} href={s.path} className="nav-link" style={s.path === '/the-craft' ? { color: 'var(--accent-craft)', borderBottomColor: 'var(--accent-craft)' } : {}}>{s.name}</Link>
            ))}
          </nav>
        </div>
      </header>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--room-craft)', borderBottom: '0.5px solid var(--border)', padding: 'clamp(40px, 5vw, 72px) 24px clamp(32px, 4vw, 56px)', textAlign: 'center', margin: '0 -24px 48px' }}>
          <span style={{ fontFamily: 'var(--font-craft)', fontSize: '14px', color: 'var(--accent-craft)', opacity: 0.8, display: 'block', marginBottom: '8px' }}>⚒</span>
          <h1 style={{ fontFamily: 'var(--font-craft)', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 16px', lineHeight: 1.05 }}>The Craft</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.7, margin: '0 auto', maxWidth: '520px' }}>Practical guidance for the working artist — pricing, process, burnout, discipline, and the dignity of calling underneath all of it.</p>
        </div>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontFamily: 'var(--font-craft)', fontSize: '22px', fontStyle: 'italic', color: 'var(--ink-muted)' }}>The first pieces are on their way.</p>
          </div>
        ) : (
          <div style={{ border: '0.5px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="article-link" style={{ borderBottom: i < articles.length - 1 ? '0.5px solid var(--border)' : 'none', display: 'grid', gridTemplateColumns: article.heroImage ? '200px 1fr' : '1fr', minHeight: '160px' }}>
                {article.heroImage && <div style={{ overflow: 'hidden' }}><img src={article.heroImage} alt={article.heroImageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>}
                <div style={{ padding: 'clamp(20px, 3vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className="article-headline" style={{ fontFamily: 'var(--font-craft)', fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2, margin: '0 0 12px' }}>{article.title}</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.65, margin: '0 0 16px', maxWidth: '560px' }}>{article.dek}</p>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <footer style={{ borderTop: '0.5px solid var(--border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'var(--ink-muted)', margin: 0, opacity: 0.7 }}>The Atelier & The Altar</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.45, margin: 0 }}>A HearthLight Media Publication · Truth. Expressed. Fully.</p>
        </div>
      </footer>
    </div>
  )
}
