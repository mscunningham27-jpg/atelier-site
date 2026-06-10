import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs } from '@/lib/articles'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import SiteShell from '@/components/SiteShell'
import NewsletterForm from '@/components/NewsletterForm'

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
    <SiteShell activePath={config.path}>
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
        <section style={{ background: '#3a2e20', padding: 'clamp(32px,4vw,52px) clamp(24px,4vw,48px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(60px,10vw,140px)', fontWeight: 600, fontStyle: 'italic', color: 'rgba(255,240,200,0.04)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>Offering</div>
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a7d3a', margin: '0 0 12px' }}>The Weekly Offering</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px,2.5vw,32px)', fontWeight: 400, fontStyle: 'italic', color: '#f0e8d4', margin: '0 0 12px', lineHeight: 1.2 }}>
              One piece like this, once a week. Quietly, no noise.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'rgba(200,180,140,0.75)', lineHeight: 1.7, margin: '0 auto 24px', maxWidth: '360px' }}>
              Faith, craft, and the life between — in your inbox Sunday mornings.
            </p>
            <NewsletterForm />
          </div>
        </section>

        {/* ── Back to section ──────────────────────────────────── */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link href={config.path} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
            ← Back to {article.sectionLabel}
          </Link>
        </div>

      </main>
    </SiteShell>
  )
}
