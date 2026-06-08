import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

const FEATURED = {
  section: 'The Archive',
  headline: 'The Hymn Written in a Shipwreck',
  dek: 'What Horatio Spafford sent across the water in 1873 — and why we still cannot stop singing it.',
  readTime: '8 min read',
  slug: '/articles/hymn-written-in-a-shipwreck',
}

const ASSIGNMENT_ARTICLES = [
  {
    headline: 'Is It Vain to Want My Work to Be Beautiful?',
    dek: 'On aesthetic hunger, calling, and the one question most Christian artists are afraid to ask out loud.',
    readTime: '6 min',
    slug: '/articles/is-it-vain-to-want-my-work-to-be-beautiful',
  },
  {
    headline: 'The Work Before the Work',
    dek: 'Why formation matters more than output — and how the saints understood something we keep forgetting.',
    readTime: '5 min',
    slug: '/articles/the-work-before-the-work',
  },
]

const ALTAR_ARTICLES = [
  {
    headline: "When the Prayer Doesn't Come",
    dek: 'On silence, lament, and the psalmist who kept writing anyway.',
    readTime: '5 min',
    slug: '/articles/when-the-prayer-doesnt-come',
  },
  {
    headline: 'Disappointed With God',
    dek: "Philip Yancey asked the question in 1988. It hasn't gotten easier to answer. Here's where we land.",
    readTime: '7 min',
    slug: '/articles/disappointed-with-god',
  },
]

const SCENE_ITEMS = [
  {
    source: 'r/ChristianMusic',
    summary: "The Steve Taylor conversation is back — and the question it keeps opening is the right one: what does prophetic satire sound like when the church can't hear itself?",
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
  {
    source: 'r/ChristianMusic',
    summary: "Augustin SMTH's new single sits at the intersection of pop and something harder to name. Worth three listens before you decide what to call it.",
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
  {
    source: 'r/ChristianMusic',
    summary: "Aaron Christopher's \"Silhouette\" is the kind of acoustic restraint that takes more courage than noise.",
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
]

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

export default function HomePage() {
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

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section style={{ padding: '48px 0 40px' }}>
          <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', minHeight: 'clamp(300px, 42vw, 500px)', display: 'flex', alignItems: 'flex-end', background: 'linear-gradient(155deg, #251407 0%, #1a0e05 30%, #0f0a05 60%, #0a0806 100%)', boxShadow: '0 4px 32px rgba(26,18,8,0.18)' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `repeating-linear-gradient(-45deg, transparent 0px, transparent 3px, rgba(200,130,10,0.012) 3px, rgba(200,130,10,0.012) 4px), repeating-linear-gradient(45deg, transparent 0px, transparent 5px, rgba(200,130,10,0.008) 5px, rgba(200,130,10,0.008) 6px)` }} />
            <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,130,10,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(10,8,6,0.97) 0%, rgba(10,8,6,0.55) 35%, rgba(10,8,6,0.1) 65%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: '20px', right: '24px', fontFamily: 'var(--font-archive)', fontSize: 'clamp(48px, 7vw, 96px)', fontStyle: 'italic', color: 'rgba(200,130,10,0.07)', lineHeight: 1, userSelect: 'none' }}>Archive</div>
            <div style={{ position: 'relative', padding: 'clamp(24px, 4vw, 48px)', maxWidth: '640px' }}>
              <span className="section-pill" style={{ background: 'rgba(200,130,10,0.22)', color: '#E8C060', marginBottom: '14px', display: 'inline-block' }}>{FEATURED.section}</span>
              <h2 style={{ fontFamily: 'var(--font-archive)', fontSize: 'clamp(28px, 4.5vw, 58px)', fontWeight: 400, fontStyle: 'italic', color: '#E8C060', lineHeight: 1.1, margin: '0 0 16px' }}>{FEATURED.headline}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 300, color: '#C8A040', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '460px' }}>{FEATURED.dek}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', color: '#9A6A1A', letterSpacing: '0.08em' }}>{FEATURED.readTime}</span>
                <Link href={FEATURED.slug} style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8820A', textDecoration: 'none', border: '0.5px solid rgba(200,130,10,0.4)', padding: '6px 16px', borderRadius: '20px' }}>Read →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Two-room section grid ─────────────────────────────── */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div className="divider-line" />
            <span className="rule-ornament">· From the Rooms ·</span>
            <div className="divider-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', border: '0.5px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>

            {/* The Assignment */}
            <div style={{ background: 'var(--room-assignment)', padding: 'clamp(28px, 3.5vw, 48px)', borderRight: '0.5px solid var(--border)' }}>
              <RoomHeader
                label="The Assignment"
                ornament="✦"
                description="Theology of creativity & calling"
                accentColor="var(--accent-assignment)"
                fontVar="var(--font-assignment)"
              />
              {ASSIGNMENT_ARTICLES.map((a, i) => (
                <ArticleCard key={i} article={a} fontVar="var(--font-assignment)" isLast={i === ASSIGNMENT_ARTICLES.length - 1} />
              ))}
            </div>

            {/* The Altar */}
            <div style={{ background: 'var(--room-altar)', padding: 'clamp(28px, 3.5vw, 48px)', borderLeft: '0.5px solid var(--border)', borderTop: 'none' }}>
              <RoomHeader
                label="The Altar"
                ornament="†"
                description="Prayer, Scripture & the inner life"
                accentColor="var(--accent-altar)"
                fontVar="var(--font-altar)"
              />
              {ALTAR_ARTICLES.map((a, i) => (
                <ArticleCard key={i} article={a} fontVar="var(--font-altar)" isLast={i === ALTAR_ARTICLES.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── From the Scene ───────────────────────────────────── */}
        <section style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div className="divider-line" />
            <span className="rule-ornament">📡 From the Scene</span>
            <div className="divider-line" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', border: '0.5px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
            {SCENE_ITEMS.map((item, i) => (
              <Link key={i} href={item.link} className="scene-card">
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 10px' }}>{item.source}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.65, margin: 0 }}>{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Weekly Offering ──────────────────────────────────── */}
        <section id="newsletter" style={{ border: '0.5px solid var(--border)', borderRadius: '2px', padding: 'clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)', textAlign: 'center', marginBottom: '64px', position: 'relative', overflow: 'hidden', background: 'var(--parchment-mid)' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(80px, 14vw, 200px)', fontWeight: 600, fontStyle: 'italic', color: 'rgba(26,18,8,0.03)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>Offering</div>
          <div style={{ position: 'relative' }}>
            <p className="rule-ornament" style={{ marginBottom: '14px' }}>The Weekly Offering</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', margin: '0 0 14px', lineHeight: 1.15 }}>One piece like this. Every Sunday.</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: '420px' }}>Quietly, no noise. Faith and craft, made by hand. Join the readers who have been waiting for this.</p>
            <NewsletterForm />
          </div>
        </section>
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

function RoomHeader({ label, ornament, description, accentColor, fontVar }: {
  label: string; ornament: string; description: string; accentColor: string; fontVar: string
}) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontFamily: fontVar, fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: '0.06em', color: accentColor, opacity: 0.8, display: 'block', marginBottom: '4px' }}>
          {ornament}
        </span>
        <h2 style={{
          fontFamily: fontVar,
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 400,
          color: 'var(--ink)',
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: fontVar.includes('cinzel') ? '0.06em' : '0.01em',
        }}>
          {label}
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 300,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: accentColor,
          opacity: 0.7,
          margin: '6px 0 0',
        }}>
          {description}
        </p>
      </div>
      <div style={{ height: '0.5px', background: accentColor, opacity: 0.25, marginTop: '14px' }} />
    </div>
  )
}

function ArticleCard({ article, fontVar, isLast }: {
  article: { headline: string; dek: string; readTime: string; slug: string }
  fontVar: string
  isLast: boolean
}) {
  return (
    <Link href={article.slug} className="article-link" style={{ display: 'block', marginBottom: isLast ? 0 : '28px' }}>
      <div style={{ borderBottom: isLast ? 'none' : '0.5px solid var(--border)', paddingBottom: isLast ? 0 : '28px' }}>
        <h3 className="article-headline" style={{
          fontFamily: fontVar,
          fontSize: 'clamp(18px, 2vw, 24px)',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.25,
          margin: '0 0 10px',
          letterSpacing: fontVar.includes('cinzel') ? '0.04em' : '0',
        }}>
          {article.headline}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.65, margin: '0 0 10px' }}>
          {article.dek}
        </p>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          {article.readTime}
        </span>
      </div>
    </Link>
  )
}
