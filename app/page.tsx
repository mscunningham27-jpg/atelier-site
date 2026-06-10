import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

// ── Data ────────────────────────────────────────────────────────────────────

const FEATURED = {
  section: 'The Archive',
  sectionPath: '/the-archive',
  headline: 'The Hymn Written in a Shipwreck',
  dek: 'What Horatio Spafford sent across the water in 1873 — and why we still cannot stop singing it.',
  readTime: '8 min read',
  slug: '/articles/hymn-written-in-a-shipwreck',
  image: '/images/what-makes-sacred-art-sacred.png',
}

const ASSIGNMENT_ARTICLES = [
  {
    headline: 'Is It Vain to Want My Work to Be Beautiful?',
    dek: 'On aesthetic hunger, calling, and the one question most Christian artists are afraid to ask out loud.',
    readTime: '6 min',
    slug: '/articles/is-it-vain-to-want-my-work-to-be-beautiful',
    pullQuote: "Wanting your work to be beautiful isn't vanity. Beauty is one of the oldest ways the church has said true out loud.",
  },
  {
    headline: 'The Work Before the Work',
    dek: 'Why formation matters more than output — and how the saints understood something we keep forgetting.',
    readTime: '5 min',
    slug: '/articles/the-work-before-the-work',
    pullQuote: null,
  },
]

const ALTAR_ARTICLES = [
  {
    headline: "When the Prayer Doesn't Come",
    dek: 'On silence, lament, and the psalmist who kept writing anyway.',
    readTime: '5 min',
    slug: '/articles/when-the-prayer-doesnt-come',
    pullQuote: "Some prayers don't get answered on the timeline we'd choose. The psalmist knew that, and wrote it all down anyway. The honesty was the faith.",
  },
  {
    headline: 'Disappointed With God',
    dek: "Philip Yancey asked the question in 1988. It hasn't gotten easier to answer. Here's where we land.",
    readTime: '7 min',
    slug: '/articles/disappointed-with-god',
    pullQuote: null,
  },
]

const CRAFT_FEATURE = {
  headline: "How Do You Stay Creative When Your Art Isn't Paying the Bills?",
  dek: "Paul made tents. That didn't make him less an apostle.",
  readTime: '5 min',
  slug: '/articles/how-do-you-stay-creative-when-your-art-isnt-paying-the-bills',
  image: '/images/how-do-you-stay-creative-when-art-isnt-paying.png',
  pullQuote: "Paul made tents. That didn't make him less an apostle. Your day job is not a confession of failure.",
}

const ARCHIVE_ARTICLES = [
  {
    date: 'Constantinople, 532 A.D.',
    headline: 'What the Hagia Sophia Was Actually For',
    dek: 'Not a monument. A machine for making heaven feel present on earth.',
    slug: '/articles/what-the-hagia-sophia-was-actually-for',
  },
  {
    date: 'London, 1861',
    headline: 'The Hymn That Was Written in a Shipwreck',
    dek: 'How \u201cIt Is Well With My Soul\u201d became the hardest honest thing a father ever wrote.',
    slug: '/articles/hymn-written-in-a-shipwreck',
  },
  {
    date: 'Florence, 1495',
    headline: 'What Makes Sacred Art "Sacred"?',
    dek: 'Five centuries of altarpieces and the question still has no easy answer.',
    slug: '/articles/what-makes-sacred-art-sacred',
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
    summary: 'Aaron Christopher\'s "Silhouette" is the kind of acoustic restraint that takes more courage than noise.',
    link: 'https://www.reddit.com/r/ChristianMusic',
  },
]

const GUILD_SPOTLIGHT = {
  makerName: 'Sara Chen',
  makerRole: 'Ceramicist',
  quote: "I kept waiting for permission to call what I made worship. Then I stopped waiting.",
  excerpt: "Chen spent three years making functional pottery before she understood that the repetition wasn't separate from her prayer life — it was the form her prayer life had taken.",
  slug: '/the-guild/sara-chen',
}

const PULL_QUOTES = [
  ...ASSIGNMENT_ARTICLES.filter(a => a.pullQuote).map(a => ({ text: a.pullQuote!, source: a.headline })),
  { text: CRAFT_FEATURE.pullQuote, source: CRAFT_FEATURE.headline },
  ...ALTAR_ARTICLES.filter(a => a.pullQuote).map(a => ({ text: a.pullQuote!, source: a.headline })),
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

// ── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>

      {/* ── Masthead ──────────────────────────────────────────────── */}
      <header style={{ borderBottom: '0.5px solid var(--border)', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 0 0' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div className="divider-line" />
            <span className="rule-ornament" style={{ fontSize: '8px', letterSpacing: '0.28em' }}>HearthLight Media</span>
            <div className="divider-line" />
          </div>

          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(9px,1.2vw,13px)', fontWeight: 300, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginRight: 'clamp(6px,1vw,14px)', position: 'relative', top: '-4px' }}>THE</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', marginRight: 'clamp(6px,1.2vw,16px)' }}>
              {ATELIER_LETTERS.map((l, i) => (
                <span key={i} className="masthead-letter" style={{ fontSize: `clamp(${Math.round(28*l.scale)}px,${(4.5*l.scale).toFixed(2)}vw,${Math.round(58*l.scale)}px)`, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal', color: l.color, position: 'relative', top: `${l.offset}px`, letterSpacing: '0.01em' }}>
                  {l.char}
                </span>
              ))}
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,80px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--hearthgold)', lineHeight: 1, position: 'relative', top: 'clamp(6px,1.2vw,16px)', margin: '0 clamp(4px,0.8vw,10px)' }}>&</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'clamp(4px,0.6vw,8px)', marginLeft: 'clamp(2px,0.4vw,6px)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,2.2vw,26px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-mid)' }}>The</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4.5vw,58px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.015em' }}>Altar</span>
            </span>
          </Link>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 300, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '10px 0 0', opacity: 0.65 }}>
            Faith · Craft · The Life Between
          </p>

          <nav style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px,3vw,40px)', padding: '18px 0' }}>
            {SECTIONS.map((s) => (
              <Link key={s.name} href={s.path} className="nav-link">{s.name}</Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero — full-bleed Archive feature ─────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ position: 'relative', minHeight: 'clamp(300px,42vw,480px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: '#100c08' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${FEATURED.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.45 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.97) 0%, rgba(10,8,6,0.6) 40%, rgba(10,8,6,0.15) 75%, transparent 100%)' }} />
          <div style={{ position: 'absolute', top: '20px', right: '28px', fontFamily: 'var(--font-archive)', fontSize: 'clamp(40px,6vw,80px)', fontStyle: 'italic', color: 'rgba(200,130,10,0.07)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>Archive</div>
          <div style={{ position: 'relative', padding: 'clamp(24px,4vw,48px)', maxWidth: '640px' }}>
            <Link href={FEATURED.sectionPath} style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8A040', background: 'rgba(200,130,10,0.18)', padding: '3px 10px', marginBottom: '16px', textDecoration: 'none' }}>
              {FEATURED.section}
            </Link>
            <h1 style={{ fontFamily: 'var(--font-archive)', fontSize: 'clamp(26px,4vw,52px)', fontWeight: 400, fontStyle: 'italic', color: '#E8C060', lineHeight: 1.15, margin: '0 0 14px' }}>
              {FEATURED.headline}
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(220,190,130,0.85)', lineHeight: 1.6, margin: '0 0 22px', maxWidth: '480px' }}>
              {FEATURED.dek}
            </p>
            <Link href={FEATURED.slug} style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8820A', textDecoration: 'none', border: '0.5px solid rgba(200,130,10,0.4)', padding: '7px 18px', display: 'inline-block' }}>
              Read → &nbsp;{FEATURED.readTime}
            </Link>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <SectionDivider label="From the Rooms" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '0.5px solid var(--border)' }}>
          <div style={{ background: 'var(--room-assignment)', padding: 'clamp(24px,3vw,40px)', borderRight: '0.5px solid var(--border)' }}>
            <RoomHeader ornament="✦" label="The Assignment" subtitle="Theology of Creativity & Calling" accentVar="var(--accent-assignment)" fontVar="var(--font-assignment)" />
            {ASSIGNMENT_ARTICLES.map((a, i) => (
              <ArticleItem key={i} article={a} fontVar="var(--font-assignment)" isLast={i === ASSIGNMENT_ARTICLES.length - 1} />
            ))}
          </div>
          <div style={{ background: 'var(--room-altar)', padding: 'clamp(24px,3vw,40px)' }}>
            <RoomHeader ornament="†" label="The Altar" subtitle="Prayer, Scripture & the Inner Life" accentVar="var(--accent-altar)" fontVar="var(--font-altar)" />
            {ALTAR_ARTICLES.map((a, i) => (
              <ArticleItem key={i} article={a} fontVar="var(--font-altar)" isLast={i === ALTAR_ARTICLES.length - 1} letterSpacing="0.02em" />
            ))}
          </div>
        </div>

        <Link href={CRAFT_FEATURE.slug} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '220px 1fr', border: '0.5px solid var(--border)', borderTop: 'none', background: 'var(--room-craft)', minHeight: '170px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', backgroundImage: `url(${CRAFT_FEATURE.image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '170px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.18)' }} />
            <span style={{ position: 'absolute', bottom: '10px', left: '12px', fontFamily: 'var(--font-sans)', fontSize: '7px', letterSpacing: '0.16em', color: 'rgba(255,240,200,0.55)', textTransform: 'uppercase' }}>The Craft</span>
          </div>
          <div style={{ padding: 'clamp(20px,2.5vw,32px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-craft)', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-craft)', display: 'block', marginBottom: '10px' }}>The Craft</span>
            <h3 className="article-headline" style={{ fontFamily: 'var(--font-craft)', fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, margin: '0 0 8px' }}>
              {CRAFT_FEATURE.headline}
            </h3>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'var(--ink-mid)', margin: '0 0 10px' }}>{CRAFT_FEATURE.dek}</p>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{CRAFT_FEATURE.readTime}</span>
          </div>
        </Link>

        <PullQuoteRotator quotes={PULL_QUOTES} />

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', margin: '40px 0 16px' }}>
            <h2 style={{ fontFamily: 'var(--font-archive)', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', margin: 0 }}>The Archive</h2>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Historic Art, Music & Material Culture</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '0.5px solid var(--border)' }}>
            {ARCHIVE_ARTICLES.map((a, i) => (
              <Link key={i} href={a.slug} style={{ textDecoration: 'none', padding: '20px 22px 24px', borderRight: i < 2 ? '0.5px solid var(--border)' : 'none', background: i === 1 ? 'var(--room-archive)' : 'var(--parchment)', display: 'block' }}>
                <p style={{ fontFamily: 'var(--font-archive)', fontSize: '9.5px', fontStyle: 'italic', color: 'var(--ink-muted)', margin: '0 0 8px' }}>{a.date}</p>
                <h3 className="article-headline" style={{ fontFamily: 'var(--font-archive)', fontSize: 'clamp(15px,1.6vw,18px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.3, margin: '0 0 8px' }}>{a.headline}</h3>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontStyle: 'italic', color: 'var(--ink-mid)', lineHeight: 1.45, margin: 0 }}>{a.dek}</p>
              </Link>
            ))}
          </div>
        </div>

        <SectionDivider label="↗ From the Scene" topMargin="40px" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '0.5px solid var(--border)', background: 'var(--room-guild)', marginBottom: '40px' }}>
          {SCENE_ITEMS.map((item, i) => (
            <Link key={i} href={item.link} className="scene-card" style={{ borderRight: i < 2 ? '0.5px solid var(--border)' : 'none', borderRadius: 0 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 9px' }}>{item.source}</p>
              <p style={{ fontFamily: 'var(--font-guild)', fontSize: '13px', fontWeight: 400, color: 'var(--ink-mid)', lineHeight: 1.6, margin: 0 }}>{item.summary}</p>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', border: '0.5px solid var(--border)', background: 'var(--room-guild)', marginBottom: '40px' }}>
          <div style={{ padding: 'clamp(24px,3vw,36px)', borderRight: '0.5px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-guild)', fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 4px' }}>The Guild</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>Community & Maker Spotlights</p>
            </div>
            <Link href="/the-guild" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--hearthgold)', textDecoration: 'none' }}>All Spotlights →</Link>
          </div>
          <div style={{ padding: 'clamp(24px,3vw,36px)' }}>
            <p style={{ fontFamily: 'var(--font-guild)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 10px' }}>
              Maker Spotlight · {GUILD_SPOTLIGHT.makerName}, {GUILD_SPOTLIGHT.makerRole}
            </p>
            <Link href={GUILD_SPOTLIGHT.slug} style={{ textDecoration: 'none' }}>
              <blockquote style={{ fontFamily: 'var(--font-guild)', fontSize: 'clamp(15px,1.8vw,19px)', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.5, margin: '0 0 12px', borderLeft: 'none', padding: 0 }}>
                "{GUILD_SPOTLIGHT.quote}"
              </blockquote>
            </Link>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.6, margin: 0 }}>{GUILD_SPOTLIGHT.excerpt}</p>
          </div>
        </div>

        <section id="newsletter" style={{ border: '0.5px solid var(--border)', padding: 'clamp(36px,5vw,64px) clamp(24px,4vw,56px)', textAlign: 'center', marginBottom: '64px', position: 'relative', overflow: 'hidden', background: '#3a2e20' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(80px,14vw,200px)', fontWeight: 600, fontStyle: 'italic', color: 'rgba(255,240,200,0.04)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>Offering</div>
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a7d3a', margin: '0 0 12px' }}>The Weekly Offering</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,38px)', fontWeight: 400, fontStyle: 'italic', color: '#f0e8d4', margin: '0 0 12px', lineHeight: 1.2 }}>One piece like this, once a week. Quietly, no noise.</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'rgba(200,180,140,0.75)', lineHeight: 1.7, margin: '0 auto 28px', maxWidth: '400px' }}>Faith, craft, and the life between — in your inbox Sunday mornings.</p>
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

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionDivider({ label, topMargin = '0' }: { label: string; topMargin?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: `${topMargin} 0 0`, marginBottom: '20px', marginTop: topMargin !== '0' ? topMargin : '24px' }}>
      <div className="divider-line" />
      <span className="rule-ornament">{label}</span>
      <div className="divider-line" />
    </div>
  )
}

function RoomHeader({ ornament, label, subtitle, accentVar, fontVar }: {
  ornament: string; label: string; subtitle: string; accentVar: string; fontVar: string
}) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <span style={{ fontFamily: fontVar, fontSize: '12px', color: accentVar, opacity: 0.5, display: 'block', marginBottom: '8px' }}>{ornament}</span>
      <h2 style={{ fontFamily: fontVar, fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 400, color: 'var(--ink)', margin: '0 0 4px', lineHeight: 1 }}>{label}</h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accentVar, opacity: 0.7, margin: '6px 0 16px' }}>{subtitle}</p>
      <div style={{ height: '0.5px', background: accentVar, opacity: 0.2 }} />
    </div>
  )
}

function ArticleItem({ article, fontVar, isLast, letterSpacing = '0' }: {
  article: { headline: string; dek: string; readTime: string; slug: string }
  fontVar: string; isLast: boolean; letterSpacing?: string
}) {
  return (
    <Link href={article.slug} className="article-link" style={{ display: 'block', marginBottom: isLast ? 0 : '22px' }}>
      <div style={{ borderBottom: isLast ? 'none' : '0.5px solid var(--border)', paddingBottom: isLast ? 0 : '22px' }}>
        <h3 className="article-headline" style={{ fontFamily: fontVar, fontSize: 'clamp(17px,1.9vw,22px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, margin: '0 0 8px', letterSpacing }}>
          {article.headline}
        </h3>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.5, margin: '0 0 8px' }}>
          {article.dek}
        </p>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          {article.readTime}
        </span>
      </div>
    </Link>
  )
}

function PullQuoteRotator({ quotes }: { quotes: { text: string; source: string }[] }) {
  const first = quotes[0]
  return (
    <div
      id="pull-quote-rotator"
      data-quotes={JSON.stringify(quotes)}
      style={{ padding: 'clamp(36px,5vw,56px) clamp(48px,8vw,120px)', textAlign: 'center', borderLeft: '0.5px solid var(--border)', borderRight: '0.5px solid var(--border)' }}
    >
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', lineHeight: '0.6', color: 'var(--hearthgold)', display: 'block', marginBottom: '14px', opacity: 0.65 }}>&ldquo;</span>
      <p id="pq-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,2.2vw,26px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.55, maxWidth: '600px', margin: '0 auto 18px' }}>
        {first.text}
      </p>
      <div style={{ width: '28px', height: '0.5px', background: 'var(--hearthgold)', margin: '0 auto 12px', opacity: 0.55 }} />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hearthgold)', margin: '0 0 4px' }}>— The Atelier & The Altar</p>
      <p id="pq-source" style={{ fontFamily: 'var(--font-sans)', fontSize: '7.5px', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.5, margin: '0 0 16px' }}>
        From: {first.source}
      </p>
      <div id="pq-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {quotes.map((_, i) => (
          <span key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: i === 0 ? 'var(--hearthgold)' : 'rgba(200,130,10,0.25)', display: 'inline-block', cursor: 'pointer' }} data-index={i} />
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var el = document.getElementById('pull-quote-rotator');
          if (!el) return;
          var quotes = JSON.parse(el.dataset.quotes);
          var current = 0;
          function go(idx, animate) {
            current = idx;
            var textEl = document.getElementById('pq-text');
            var srcEl  = document.getElementById('pq-source');
            var dotsEl = document.getElementById('pq-dots');
            if (!textEl || !srcEl || !dotsEl) return;
            if (animate) { textEl.style.opacity = '0'; }
            setTimeout(function() {
              textEl.textContent = quotes[idx].text;
              srcEl.textContent  = 'From: ' + quotes[idx].source;
              textEl.style.opacity = '1';
              var dots = dotsEl.querySelectorAll('span');
              dots.forEach(function(d, i) {
                d.style.background = i === idx ? 'var(--hearthgold)' : 'rgba(200,130,10,0.25)';
              });
            }, animate ? 220 : 0);
            dotsEl.querySelectorAll('span').forEach(function(d) {
              d.onclick = function() { go(parseInt(d.dataset.index), true); clearInterval(timer); };
            });
          }
          textEl = document.getElementById('pq-text');
          if (textEl) textEl.style.transition = 'opacity 0.3s';
          var timer = setInterval(function() { go((current + 1) % quotes.length, true); }, 6000);
          go(0, false);
        })();
      ` }} />
    </div>
  )
}