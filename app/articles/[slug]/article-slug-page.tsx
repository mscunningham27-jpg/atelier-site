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
  'the-assignment': { fontVar: 'var(--font-assignment)', accentColor: 'var(--accent-assignment)', roomBg: 'var(--room-assignment)', ornament: '✦', path: '/the-assignment' },
  'the-craft':      { fontVar: 'var(--font-craft)',      accentColor: 'var(--accent-craft)',      roomBg: 'var(--room-craft)',      ornament: '✦', path: '/the-craft'      },
  'the-archive':    { fontVar: 'var(--font-archive)',    accentColor: 'var(--accent-archive)',    roomBg: 'var(--room-archive)',    ornament: '◈', path: '/the-archive'    },
  'the-altar':      { fontVar: 'var(--font-altar)',      accentColor: 'var(--accent-altar)',      roomBg: 'var(--room-altar)',      ornament: '†', path: '/the-altar'      },
  'the-guild':      { fontVar: 'var(--font-guild)',      accentColor: 'var(--accent-guild)',      roomBg: 'var(--room-guild)',      ornament: '◎', path: '/the-guild'      },
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

  // ── Drop cap: inject first-letter styling into the first paragraph
  let firstParagraphDone = false

  const markdownComponents: Components = {
    p: ({ children }) => {
      if (!firstParagraphDone) {
        firstParagraphDone = true
        return (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.6vw,17px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.85, margin: '0 0 28px' }}
            className="article-first-paragraph">
            {children}
          </p>
        )
      }
      return (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px,1.6vw,17px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.85, margin: '0 0 28px' }}>
          {children}
        </p>
      )
    },
    h2: ({ children }) => (
      <h2 style={{ fontFamily: config.fontVar, fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 400, color: 'var(--ink)', margin: '56px 0 18px', lineHeight: 1.2 }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ fontFamily: config.fontVar, fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, color: 'var(--ink-mid)', margin: '40px 0 14px', lineHeight: 1.3 }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: `2px solid ${config.accentColor}`, margin: '40px 0 40px 0', padding: '2px 0 2px 28px' }}>
        <div style={{ fontFamily: config.fontVar, fontSize: 'clamp(18px,2.2vw,24px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.55 }}>
          {children}
        </div>
      </blockquote>
    ),
    em:     ({ children }) => <em style={{ fontStyle: 'italic', color: 'inherit' }}>{children}</em>,
    strong: ({ children }) => <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</strong>,
    a:      ({ href, children }) => (
      <a href={href} style={{ color: config.accentColor, textDecoration: 'underline', textDecorationColor: 'rgba(0,0,0,0.2)', transition: 'text-decoration-color 0.2s' }}>
        {children}
      </a>
    ),
    hr: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '52px 0' }}>
        <div style={{ height: '0.5px', background: 'var(--border)', flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--ink-muted)' }}>{config.ornament}</span>
        <div style={{ height: '0.5px', background: 'var(--border)', flex: 1 }} />
      </div>
    ),
  }

  const publishedDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <SiteShell activePath={config.path} mastheadState="whisper">

      {/* Drop cap CSS injected globally for this page */}
      <style>{`
        .article-first-paragraph::first-letter {
          font-family: ${config.fontVar};
          font-size: clamp(56px, 8vw, 80px);
          font-weight: 400;
          line-height: 0.82;
          float: left;
          margin: 4px 10px -4px 0;
          color: ${config.accentColor};
          font-style: italic;
        }
      `}</style>

      {/* ── Reading chamber wrapper ─────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Breadcrumb + issue tag ───────────────────────── */}
        <div style={{ padding: '28px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href={config.path} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: config.accentColor, textDecoration: 'none', opacity: 0.8 }}>
              {article.sectionLabel}
            </Link>
            <span style={{ color: 'var(--border-strong)', fontSize: '10px' }}>›</span>
          </div>
          {article.issueNumber && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.6 }}>
              Issue {article.issueNumber} · {article.issueTheme}
            </span>
          )}
        </div>

        {/* ── Article header ───────────────────────────────── */}
        <header style={{ padding: 'clamp(28px,4vw,48px) 0 clamp(24px,3vw,40px)', borderBottom: '0.5px solid var(--border)', maxWidth: '720px' }}>

          {/* Mood tag */}
          {article.mood && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: config.accentColor, margin: '0 0 16px', opacity: 0.8 }}>
              {article.mood}
            </p>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: config.fontVar,
            fontSize: 'clamp(32px,5.5vw,60px)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.1,
            margin: '0 0 22px',
            letterSpacing: article.section === 'the-altar' ? '0.03em' : '0.01em',
          }}>
            {article.title}
          </h1>

          {/* Dek */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.6, margin: '0 0 28px', maxWidth: '580px' }}>
            {article.dek}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span className="section-pill" style={{ background: `color-mix(in srgb, ${config.accentColor} 12%, transparent)`, color: config.accentColor }}>
              {config.ornament} {article.sectionLabel}
            </span>
            {article.author && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-mid)' }}>
                {article.author}
              </span>
            )}
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
              {article.readTime}
            </span>
            {publishedDate && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-muted)', opacity: 0.6 }}>
                {publishedDate}
              </span>
            )}
          </div>
        </header>

        {/* ── Hero image — gallery whitespace ─────────────── */}
        {article.heroImage && (
          <div style={{ margin: 'clamp(40px,5vw,72px) 0 clamp(32px,4vw,56px)', position: 'relative' }}>
            {/* Gallery margin — extra breathing room */}
            <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
              <img
                src={article.heroImage}
                alt={article.heroImageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Caption — curator note style */}
            {article.heroImageCaption && (
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', fontStyle: 'italic', color: 'var(--ink-muted)', margin: '12px 0 0', paddingLeft: '1px', lineHeight: 1.5, opacity: 0.8 }}>
                {article.heroImageCaption}
              </p>
            )}
          </div>
        )}

        {/* ── Reading chamber: article + pull quote rail ───── */}
        <div style={{ display: 'grid', gridTemplateColumns: article.pullQuote ? '1fr 200px' : '1fr', gap: '0 48px', alignItems: 'start' }}>

          {/* Article body */}
          <article style={{ paddingTop: article.heroImage ? '0' : 'clamp(28px,4vw,48px)', minWidth: 0 }}>
            <ReactMarkdown components={markdownComponents}>
              {article.content}
            </ReactMarkdown>
          </article>

          {/* Pull quote rail — marginal whitespace */}
          {article.pullQuote && (
            <aside style={{ paddingTop: 'clamp(28px,4vw,48px)', position: 'sticky', top: '32px' }}>
              <div style={{ borderTop: `2px solid ${config.accentColor}`, paddingTop: '16px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', lineHeight: '0.5', color: config.accentColor, display: 'block', marginBottom: '10px', opacity: 0.6 }}>&ldquo;</span>
                <p style={{ fontFamily: config.fontVar, fontSize: 'clamp(14px,1.4vw,16px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.6, margin: '0 0 10px' }}>
                  {article.pullQuote}
                </p>
                <div style={{ height: '0.5px', background: config.accentColor, opacity: 0.3, margin: '12px 0' }} />
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>
                  {article.sectionLabel}
                </p>
              </div>
            </aside>
          )}
        </div>

        {/* ── Monastic whitespace before closing ───────────── */}
        <div style={{ height: 'clamp(48px,6vw,80px)' }} />

        {/* ── Section ornament divider ─────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div className="divider-line" />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--ink-muted)' }}>{config.ornament}</span>
          <div className="divider-line" />
        </div>

        {/* ── Studio Wall closing ritual ───────────────────── */}
        {article.studioWall && (
          <div style={{ background: config.roomBg, border: '0.5px solid var(--border)', padding: 'clamp(28px,4vw,48px)', marginBottom: 'clamp(32px,4vw,48px)', maxWidth: '680px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: config.accentColor, margin: '0 0 14px', opacity: 0.85 }}>
              {article.closingRitual ?? 'For the Studio Wall'}
            </p>
            <p style={{ fontFamily: config.fontVar, fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
              {article.studioWall}
            </p>
          </div>
        )}

        {/* ── Tags — Filed Under ───────────────────────────── */}
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.7 }}>Filed under</span>
            {article.tags.map(tag => (
              <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: config.accentColor, border: `0.5px solid ${config.accentColor}`, padding: '3px 10px', opacity: 0.8 }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Newsletter CTA ───────────────────────────────── */}
        <section style={{ background: '#3a2e20', padding: 'clamp(32px,4vw,52px) clamp(24px,4vw,48px)', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
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

        {/* ── Back to section ──────────────────────────────── */}
        <div style={{ textAlign: 'center' }}>
          <Link href={config.path} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
            ← Back to {article.sectionLabel}
          </Link>
        </div>

      </div>
    </SiteShell>
  )
}
