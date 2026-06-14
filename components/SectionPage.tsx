import Link from 'next/link'
import SiteShell from './SiteShell'
import type { Article } from '@/lib/articles'

interface SectionConfig {
  path: string
  label: string
  ornament: string
  description: string
  fontVar: string
  accentVar: string
  roomBg: string
  emptyMessage: string
}

interface SectionPageProps {
  config: SectionConfig
  articles: Article[]
}

export default function SectionPage({ config, articles }: SectionPageProps) {
  const { path, label, ornament, description, fontVar, accentVar, roomBg, emptyMessage } = config

  // Split articles into feature (first) and the rest
  const [feature, ...rest] = articles

  return (
    <SiteShell activePath={path} mastheadState="condensed">
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Section header band ───────────────────────────────── */}
        <div style={{
          background: roomBg,
          borderBottom: '0.5px solid var(--border)',
          padding: 'clamp(48px,6vw,80px) 24px clamp(36px,4vw,56px)',
          textAlign: 'center',
          margin: '0 -24px 0',
        }}>
          <span style={{ fontFamily: fontVar, fontSize: '13px', color: accentVar, opacity: 0.5, display: 'block', marginBottom: '10px' }}>{ornament}</span>
          <h1 style={{ fontFamily: fontVar, fontSize: 'clamp(40px,5.5vw,72px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 18px', lineHeight: 1.05, letterSpacing: fontVar.includes('cinzel') ? '0.04em' : '0.01em' }}>
            {label}
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.7, margin: '0 auto', maxWidth: '520px' }}>
            {description}
          </p>
        </div>

        {articles.length === 0 ? (

          /* ── Empty state ───────────────────────────────────────── */
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ fontFamily: fontVar, fontSize: '22px', fontStyle: 'italic', color: 'var(--ink-muted)', opacity: 0.6 }}>{emptyMessage}</p>
          </div>

        ) : (
          <div>

            {/* ── Feature article — full width ──────────────────── */}
            {feature && (
              <Link
                href={`/articles/${feature.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: feature.heroImage ? '1fr 1fr' : '1fr',
                  border: '0.5px solid var(--border)',
                  borderTop: 'none',
                  minHeight: '280px',
                  background: roomBg,
                }}>
                  {feature.heroImage && (
                    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
                      <img
                        src={feature.heroImage}
                        alt={feature.heroImageAlt || feature.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.08)' }} />
                    </div>
                  )}
                  <div style={{ padding: 'clamp(32px,4vw,56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accentVar, display: 'block', marginBottom: '16px' }}>
                      {label} · Featured
                    </span>
                    <h2 className="article-headline" style={{ fontFamily: fontVar, fontSize: 'clamp(24px,3vw,38px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2, margin: '0 0 14px', letterSpacing: fontVar.includes('cinzel') ? '0.03em' : '0' }}>
                      {feature.title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,1.4vw,16px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.65, margin: '0 0 20px', maxWidth: '440px' }}>
                      {feature.dek}
                    </p>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                      {feature.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* ── Remaining articles ────────────────────────────── */}
            {rest.length > 0 && (
              <div style={{ border: '0.5px solid var(--border)', borderTop: 'none' }}>
                {rest.map((article, i) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="article-link"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: article.heroImage ? '200px 1fr' : '1fr',
                      borderBottom: i < rest.length - 1 ? '0.5px solid var(--border)' : 'none',
                      minHeight: '160px',
                      background: i % 2 === 0 ? 'var(--parchment)' : roomBg,
                      textDecoration: 'none',
                    }}
                  >
                    {article.heroImage && (
                      <div style={{ overflow: 'hidden' }}>
                        <img
                          src={article.heroImage}
                          alt={article.heroImageAlt || article.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    )}
                    <div style={{ padding: 'clamp(20px,2.5vw,32px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h2 className="article-headline" style={{ fontFamily: fontVar, fontSize: 'clamp(18px,2.2vw,26px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, margin: '0 0 10px', letterSpacing: fontVar.includes('cinzel') ? '0.03em' : '0' }}>
                        {article.title}
                      </h2>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.6, margin: '0 0 12px', maxWidth: '560px' }}>
                        {article.dek}
                      </p>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                        {article.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        )}
      </main>
    </SiteShell>
  )
}
