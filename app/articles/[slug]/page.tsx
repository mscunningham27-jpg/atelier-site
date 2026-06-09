import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs } from '@/lib/articles'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'

export const dynamicParams = true
export const revalidate = 60

const SECTION_CONFIG: Record<string, {
  fontVar: string
  accentColor: string
  roomBg: string
  ornament: string
  path: string
}> = {
  'the-assignment': {
    fontVar: 'var(--font-assignment)',
    accentColor: 'var(--accent-assignment)',
    roomBg: 'var(--room-assignment)',
    ornament: '✦',
    path: '/the-assignment',
  },
  'the-craft': {
    fontVar: 'var(--font-craft)',
    accentColor: 'var(--accent-craft)',
    roomBg: 'var(--room-craft)',
    ornament: '⚒',
    path: '/the-craft',
  },
  'the-archive': {
    fontVar: 'var(--font-archive)',
    accentColor: 'var(--accent-archive)',
    roomBg: 'var(--room-archive)',
    ornament: '◈',
    path: '/the-archive',
  },
  'the-altar': {
    fontVar: 'var(--font-altar)',
    accentColor: 'var(--accent-altar)',
    roomBg: 'var(--room-altar)',
    ornament: '†',
    path: '/the-altar',
  },
  'the-guild': {
    fontVar: 'var(--font-guild)',
    accentColor: 'var(--accent-guild)',
    roomBg: 'var(--room-guild)',
    ornament: '◎',
    path: '/the-guild',
  },
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

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} — The Atelier & The Altar`,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      images: article.heroImage ? [article.heroImage] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const config = SECTION_CONFIG[article.section] ?? SECTION_CONFIG['the-assignment']

  const markdownComponents: Components = {
    p: ({ children }) => (
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(15px, 1.6vw, 17px)',
        fontWeight: 300,
        color: 'var(--ink)',
        lineHeight: 1.85,
        margin: '0 0 28px',
      }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 style={{
        fontFamily: config.fontVar,
        fontSize: 'clamp(20px, 2.4vw, 28px)',
        fontWeight: 400,
        color: 'var(--ink)',
        margin: '48px 0 16px',
        lineHeight: 1.2,
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{
        fontFamily: config.fontVar,
        fontSize: 'clamp(17px, 2vw, 22px)',
        fontWeight: 400,
        color: 'var(--ink-mid)',
        margin: '36px 0 12px',
        lineHeight: 1.3,
      }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{
        borderLeft: `2px solid ${config.accentColor}`,
        margin: '36px 0',
        padding: '4px 0 4px 24px',
      }}>
        <div style={{
          fontFamily: config.fontVar,
          fontSize: 'clamp(18px, 2.2vw, 24px)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.5,
        }}>
          {children}
        </div>
      </blockquote>
    ),
    em: ({ children }) => (
      <em style={{ fontStyle: 'italic', color: 'inherit' }}>{children}</em>
    ),
    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</strong>
    ),
    a: ({ href, children }) => (
      <a href={href} style={{ color: config.accentColor, textDecoration: 'underline', textDecorationColor: 'transparent', transition: 'text-decoration-color 0.2s' }}>
        {children}
      </a>
    ),
    hr: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '40px 0' }}>
        <div style={{ height: '0.5px', background: 'var(--border)', flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{config.ornament}</span>
        <div style={{ height: '0.5px', background: 'var(--border)', flex: 1 }} />
      </div>
    ),
  }

  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>

      {/* ── Header ─────────────────────────────────────────────── */}
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
                  <span key={i} className="masthead-letter" style={{ fontSize: `clamp(${Math.round(28 * l.scale)}px, ${(4.5 * l.scale).toFixed(2)}vw, ${Math.round(58 * l.scale)}px)`, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal', color: l.color, position: 'relative', top: `${l.offset}px`, letterSpacing: '0.01em' }}>
                    {l.char}
                  </span>
                ))}
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--hearthgold)', lineHeight: 1, position: 'relative', top: 'clamp(6px, 1.2vw, 16px)', margin: '0 clamp(4px, 0.8vw, 10px)' }}>&</span>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'clamp(4px, 0.6vw, 8px)', marginLeft: 'clamp(2px, 0.4vw, 6px)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px, 2.2vw, 26px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-mid)' }}>The</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4.5vw, 58px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.015em' }}>Altar</span>
              </span>
            </Link>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 300, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '10px 0 0', opacity: 0.65 }}>
              Faith · Craft · The Life Between
            </p>
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px, 3vw, 40px)', padding: '16px 0' }}>
            {SECTIONS.map((s) => (
              <Link key={s.name} href={s.path} className="nav-link">{s.name}</Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '740px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Breadcrumb ───────────────────────────────────────── */}
        <div style={{ padding: '24px 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href={config.path} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: config.accentColor, textDecoration: 'none', opacity: 0.8 }}>
            {article.sectionLabel}
          </Link>
          <span style={{ color: 'var(--border-strong)', fontSize: '10px' }}>›</span>
        </div>

        {/* ── Article header ───────────────────────────────────── */}
        <header style={{ padding: '20px 0 36px', borderBottom: '0.5px solid var(--border)' }}>
          <h1 style={{
            fontFamily: config.fontVar,
            fontSize: 'clamp(30px, 5vw, 54px)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.15,
            margin: '0 0 20px',
            letterSpacing: article.section === 'the-altar' ? '0.04em' : '0.01em',
          }}>
            {article.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            fontWeight: 300,
            color: 'var(--ink-mid)',
            lineHeight: 1.65,
            margin: '0 0 24px',
          }}>
            {article.dek}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="section-pill" style={{ background: `color-mix(in srgb, ${config.accentColor} 12%, transparent)`, color: config.accentColor }}>
              {config.ornament} {article.sectionLabel}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
              {article.readTime}
            </span>
            {article.publishDate && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-muted)', opacity: 0.6 }}>
                {new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
          </div>
        </header>

        {/* ── Hero image ───────────────────────────────────────── */}
        {article.heroImage && (
          <div style={{ margin: '36px 0', borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/9' }}>
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* ── Article body ─────────────────────────────────────── */}
        <article style={{ paddingTop: article.heroImage ? '0' : '36px' }}>
          <ReactMarkdown components={markdownComponents}>
            {article.content}
          </ReactMarkdown>
        </article>

        {/* ── Section divider ──────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '56px 0 48px' }}>
          <div className="divider-line" />
          <span className="rule-ornament">{config.ornament}</span>
          <div className="divider-line" />
        </div>

        {/* ── Newsletter CTA ───────────────────────────────────── */}
        <div style={{ background: 'var(--parchment-mid)', border: '0.5px solid var(--border)', borderRadius: '2px', padding: 'clamp(28px, 4vw, 48px)', textAlign: 'center' }}>
          <p className="rule-ornament" style={{ marginBottom: '12px' }}>The Weekly Offering</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.2 }}>
            One piece like this. Every Sunday.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.7, margin: '0 auto 28px', maxWidth: '380px' }}>
            Quietly, no noise. Faith and craft, made by hand.
          </p>
          <Link href="/#newsletter" className="read-btn">
            Join the Offering →
          </Link>
        </div>

        {/* ── Back to section ──────────────────────────────────── */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href={config.path} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
            ← Back to {article.sectionLabel}
          </Link>
        </div>

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
