import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

// ── Placeholder content ────────────────────────────────────────────
// These will be replaced by dynamic MDX reads once the publish
// pipeline is complete. Structure stays the same; data source changes.

const FEATURED = {
  section: 'The Archive',
  headline: 'The Hymn Written in a Shipwreck',
  dek: 'What Horatio Spafford sent across the water in 1873 — and why we still cannot stop singing it.',
  readTime: '8 min read',
  slug: '/archive/hymn-written-in-a-shipwreck',
}

const ASSIGNMENT_ARTICLES = [
  {
    headline: 'Is It Vain to Want My Work to Be Beautiful?',
    dek: 'On aesthetic hunger, calling, and the one question most Christian artists are afraid to ask out loud.',
    readTime: '6 min',
    slug: '/assignment/is-it-vain-to-want-beauty',
  },
  {
    headline: 'The Work Before the Work',
    dek: 'Why formation matters more than output — and how the saints understood something we keep forgetting.',
    readTime: '5 min',
    slug: '/assignment/the-work-before-the-work',
  },
]

const ALTAR_ARTICLES = [
  {
    headline: "When the Prayer Doesn't Come",
    dek: 'On silence, lament, and the psalmist who kept writing anyway.',
    readTime: '5 min',
    slug: '/altar/when-the-prayer-doesnt-come',
  },
  {
    headline: 'Disappointed With God',
    dek: "Philip Yancey asked the question in 1988. It hasn't gotten easier to answer. Here's where we land.",
    readTime: '7 min',
    slug: '/altar/disappointed-with-god',
  },
]

// From the Scene — populated daily by the scene-feed-agent
// Hardcoded here to match current Notion drafts; will be dynamic later
const SCENE_ITEMS = [
  {
    source: 'r/ChristianMusic',
    summary:
      "The Steve Taylor conversation is back — and the question it keeps opening is the right one: what does prophetic satire sound like when the church can't hear itself?",
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
  {
    source: 'r/ChristianMusic',
    summary:
      "Augustin SMTH's new single sits at the intersection of pop and something harder to name. Worth three listens before you decide what to call it.",
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
  {
    source: 'r/ChristianMusic',
    summary:
      'Aaron Christopher\'s acoustic release "Silhouette" is the kind of restraint that takes more courage than noise. Indie artists who sustain output — this is what discipline looks like.',
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
]

const SECTIONS = [
  { name: 'The Assignment', path: '/assignment' },
  { name: 'The Craft',      path: '/craft' },
  { name: 'The Archive',    path: '/archive' },
  { name: 'The Altar',      path: '/altar' },
  { name: 'The Guild',      path: '/guild' },
]

// ── Page ─────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ backgroundColor: 'var(--ember)', minHeight: '100vh' }}>

      {/* ── Masthead & Nav ─────────────────────────────────────── */}
      <header style={{ borderBottom: '0.5px solid var(--border)' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '28px 24px 0',
          textAlign: 'center',
        }}>
          {/* Top rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div className="divider-line" />
            <span className="rule-ornament">· HearthLight Media ·</span>
            <div className="divider-line" />
          </div>

          {/* Masthead */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px, 5vw, 48px)',
              fontWeight: 400,
              color: 'var(--warmgold)',
              letterSpacing: '0.03em',
              margin: 0,
              lineHeight: 1,
            }}>
              The Atelier & The Altar
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--muted-amber)',
              margin: '8px 0 24px',
            }}>
              Faith · Craft · The Life Between
            </p>
          </Link>

          {/* Section nav */}
          <nav style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 40px)',
            paddingBottom: '20px',
          }}>
            {SECTIONS.map((s) => (
              <Link key={s.name} href={s.path} className="nav-link">
                {s.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Hero Feature ────────────────────────────────────── */}
        <section style={{ padding: '56px 0 48px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            {/* Editorial image placeholder */}
            <div style={{
              background: 'linear-gradient(160deg, #1f1006 0%, #2d1a07 40%, #0f0a05 100%)',
              border: '0.5px solid var(--border)',
              borderRadius: '2px',
              aspectRatio: '4 / 3',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Atmospheric grain overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(200,130,10,0.015) 2px,
                  rgba(200,130,10,0.015) 4px
                )`,
              }} />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
              }}>
                <span className="section-pill">{FEATURED.section}</span>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="section-pill" style={{ marginBottom: '20px' }}>
                {FEATURED.section}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                fontWeight: 600,
                color: 'var(--warmgold)',
                lineHeight: 1.1,
                margin: '12px 0 18px',
                letterSpacing: '-0.01em',
              }}>
                {FEATURED.headline}
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--midgold)',
                lineHeight: 1.7,
                margin: '0 0 28px',
              }}>
                {FEATURED.dek}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  color: 'var(--muted-amber)',
                  letterSpacing: '0.08em',
                }}>
                  {FEATURED.readTime}
                </span>
                <Link href={FEATURED.slug} className="read-btn">
                  Read →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Divider ─────────────────────────────────── */}
        <SectionRule label="Latest" />

        {/* ── Two-column article grid ──────────────────────────── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '56px',
          padding: '40px 0 56px',
        }}>
          {/* The Assignment */}
          <ArticleColumn
            label="From The Assignment"
            articles={ASSIGNMENT_ARTICLES}
          />
          {/* The Altar */}
          <ArticleColumn
            label="From The Altar"
            articles={ALTAR_ARTICLES}
          />
        </section>

        {/* ── From the Scene ───────────────────────────────────── */}
        <section style={{ marginBottom: '56px' }}>
          <SectionRule label="From the Scene" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
            marginTop: '28px',
          }}>
            {SCENE_ITEMS.map((item, i) => (
              <Link key={i} href={item.link} className="scene-card">
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-amber)',
                  margin: '0 0 10px',
                }}>
                  📡 {item.source}
                </p>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'var(--midgold)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Weekly Offering CTA ──────────────────────────────── */}
        <section style={{
          background: 'var(--surface)',
          border: '0.5px solid var(--border)',
          borderRadius: '2px',
          padding: 'clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)',
          textAlign: 'center',
          marginBottom: '64px',
        }}>
          <p className="rule-ornament" style={{ marginBottom: '14px' }}>
            The Weekly Offering
          </p>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--warmgold)',
            margin: '0 0 14px',
            lineHeight: 1.2,
          }}>
            One piece like this. Every Sunday.
          </h3>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--midgold)',
            lineHeight: 1.7,
            margin: '0 auto 32px',
            maxWidth: '440px',
          }}>
            Quietly, no noise. Faith and craft, made by hand.
            Join the readers who have been waiting for this.
          </p>
          <NewsletterForm />
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{
        borderTop: '0.5px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '15px',
          fontStyle: 'italic',
          color: 'var(--muted-amber)',
          margin: '0 0 6px',
        }}>
          The Atelier & The Altar
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted-amber)',
          opacity: 0.55,
          margin: 0,
        }}>
          A HearthLight Media Publication · Truth. Expressed. Fully.
        </p>
      </footer>

    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────

function SectionRule({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div className="divider-line" />
      <span className="rule-ornament">· {label} ·</span>
      <div className="divider-line" />
    </div>
  )
}

function ArticleColumn({
  label,
  articles,
}: {
  label: string
  articles: { headline: string; dek: string; readTime: string; slug: string }[]
}) {
  return (
    <div>
      <p className="rule-ornament" style={{ marginBottom: '24px' }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {articles.map((article, i) => (
          <Link key={i} href={article.slug} className="article-card-link">
            <div style={{
              borderBottom: '0.5px solid var(--border)',
              paddingBottom: '28px',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--warmgold)',
                lineHeight: 1.2,
                margin: '0 0 10px',
                transition: 'color 0.2s',
              }}>
                {article.headline}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: 'var(--midgold)',
                lineHeight: 1.65,
                margin: '0 0 12px',
              }}>
                {article.dek}
              </p>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                letterSpacing: '0.1em',
                color: 'var(--muted-amber)',
                textTransform: 'uppercase',
              }}>
                {article.readTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
