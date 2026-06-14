import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'
import SiteShell from '@/components/SiteShell'
import { getAllArticles } from '@/lib/articles'
import type { Article } from '@/lib/articles'

// ── Issue identity ───────────────────────────────────────────────────────────
const ISSUE = {
  number:    'I',
  theme:     'Beauty Under Judgment',
  season:    'Summer 2026',
  edition:   'Digital · Sunday Edition',
  epigraph:  'Beauty is one of the oldest ways the church has said true out loud.',
}

// ── Placement order for the tableaux ────────────────────────────────────────
const PLACEMENT_ORDER: Article['featuredPlacement'][] = [
  'opening-essay',
  'object-feature',
  'hard-question',
  'respite',
  'guild-feature',
  'closing-note',
]

const PLACEMENT_LABELS: Record<string, string> = {
  'opening-essay':  'Opening Essay',
  'object-feature': 'Object & Image',
  'hard-question':  'The Hard Question',
  'respite':        'Respite',
  'guild-feature':  'From the Guild',
  'closing-note':   'Closing Reflection',
}

// ── Scene items (From the Scene) ─────────────────────────────────────────────
const SCENE_ITEMS = [
  { source: 'r/ChristianMusic',     summary: "The Steve Taylor conversation is back — and the question it keeps opening is the right one: what does prophetic satire sound like when the church can't hear itself?", link: 'https://www.reddit.com/r/ChristianMusic' },
  { source: 'Christianity Today',   summary: "Augustin SMTH's new single sits at the intersection of pop and something harder to name. Worth three listens before you decide what to call it.",                      link: 'https://www.christianitytoday.com' },
  { source: 'Ekstasis Magazine',    summary: "Aaron Christopher's \"Silhouette\" is the kind of acoustic restraint that takes more courage than noise.",                                                            link: 'https://ekstasismagazine.com' },
]

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const all = getAllArticles()

  // Build tableaux: one article per placement slot, in editorial order
  const tableaux = PLACEMENT_ORDER.flatMap(placement => {
    const match = all.find(a => a.featuredPlacement === placement)
    return match ? [{ placement, article: match }] : []
  })

  // Pull quotes from tableaux articles for the rotator
  const pullQuotes = tableaux
    .filter(t => t.article.pullQuote)
    .map(t => ({ text: t.article.pullQuote!, source: t.article.title }))

  // Remaining articles not in tableaux (for the full contents listing)
  const tableauxSlugs = new Set(tableaux.map(t => t.article.slug))
  const remaining = all.filter(a => !tableauxSlugs.has(a.slug))

  return (
    <SiteShell mastheadState="ceremonial" issueLabel={`Issue ${ISSUE.number} · ${ISSUE.theme} · ${ISSUE.season}`}>
      <main>

        {/* ── Issue identity band ─────────────────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ borderLeft: '0.5px solid var(--border)', borderRight: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', padding: 'clamp(32px,5vw,64px) clamp(24px,4vw,56px)', textAlign: 'center', background: 'var(--parchment)', position: 'relative', overflow: 'hidden' }}>
            {/* Watermark */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(80px,16vw,220px)', fontWeight: 600, fontStyle: 'italic', color: 'rgba(200,130,10,0.045)', lineHeight: 1, whiteSpace: 'nowrap' }}>Issue {ISSUE.number}</span>
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 14px', opacity: 0.7 }}>
                Issue {ISSUE.number} · {ISSUE.season} · {ISSUE.edition}
              </p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4.5vw,62px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', margin: '0 0 18px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                {ISSUE.theme}
              </h2>
              <div style={{ width: '40px', height: '0.5px', background: 'var(--hearthgold)', margin: '0 auto 18px', opacity: 0.6 }} />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', margin: 0, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                "{ISSUE.epigraph}"
              </p>
            </div>
          </div>
        </div>

        {/* ── Issue Tableaux ─────────────────────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          {tableaux.map(({ placement, article }, idx) => (
            <TableauxEntry
              key={article.slug}
              article={article}
              placement={placement!}
              placementLabel={PLACEMENT_LABELS[placement!]}
              idx={idx}
            />
          ))}
        </div>

        {/* ── Pull quote rotator ─────────────────────────────── */}
        {pullQuotes.length > 0 && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <PullQuoteRotator quotes={pullQuotes} />
          </div>
        )}

        {/* ── Latest — for returning readers ────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <LatestStrip articles={all.slice(0, 3)} />
        </div>

        {/* ── From the Scene ────────────────────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <Divider label="↗ From the Scene" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '0.5px solid var(--border)', background: 'var(--room-guild)', marginBottom: '0' }}>
            {SCENE_ITEMS.map((item, i) => (
              <Link key={i} href={item.link} className="scene-card" style={{ borderRight: i < 2 ? '0.5px solid var(--border)' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 9px' }}>{item.source}</p>
                <p style={{ fontFamily: 'var(--font-guild)', fontSize: '13px', color: 'var(--ink-mid)', lineHeight: 1.6, margin: 0 }}>{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── In this issue — contents listing ──────────────── */}
        {remaining.length > 0 && (
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            <Divider label="Also in This Issue" />
            <div style={{ border: '0.5px solid var(--border)' }}>
              {remaining.map((article, i) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="article-link" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', padding: '18px 24px', borderBottom: i < remaining.length - 1 ? '0.5px solid var(--border)' : 'none', background: i % 2 === 0 ? 'var(--parchment)' : 'var(--parchment-mid)', textDecoration: 'none' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: '6px' }}>{article.sectionLabel}</span>
                    <h3 className="article-headline" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', margin: '0 0 4px', lineHeight: 1.3 }}>{article.title}</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 300, color: 'var(--ink-mid)', margin: 0, lineHeight: 1.5 }}>{article.dek}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', paddingLeft: '20px', paddingTop: '2px', whiteSpace: 'nowrap' }}>{article.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Weekly Offering ───────────────────────────────── */}
        <div style={{ maxWidth: '1100px', margin: '24px auto 0', padding: '0 24px 64px' }}>
          <section id="newsletter" style={{ border: '0.5px solid var(--border)', padding: 'clamp(36px,5vw,64px) clamp(24px,4vw,56px)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: '#3a2e20' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-serif)', fontSize: 'clamp(80px,14vw,200px)', fontWeight: 600, fontStyle: 'italic', color: 'rgba(255,240,200,0.04)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>Offering</div>
            <div style={{ position: 'relative' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9a7d3a', margin: '0 0 12px' }}>The Weekly Offering</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3vw,38px)', fontWeight: 400, fontStyle: 'italic', color: '#f0e8d4', margin: '0 0 12px', lineHeight: 1.2 }}>One piece like this, once a week. Quietly, no noise.</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'rgba(200,180,140,0.75)', lineHeight: 1.7, margin: '0 auto 28px', maxWidth: '400px' }}>Faith, craft, and the life between — in your inbox Sunday mornings.</p>
              <NewsletterForm />
            </div>
          </section>
        </div>

      </main>
    </SiteShell>
  )
}

// ── TableauxEntry ────────────────────────────────────────────────────────────

const PLACEMENT_FONT: Record<string, string> = {
  'opening-essay':  'var(--font-assignment)',
  'object-feature': 'var(--font-archive)',
  'hard-question':  'var(--font-altar)',
  'respite':        'var(--font-guild)',
  'guild-feature':  'var(--font-guild)',
  'closing-note':   'var(--font-altar)',
}

const PLACEMENT_ACCENT: Record<string, string> = {
  'opening-essay':  'var(--accent-assignment)',
  'object-feature': 'var(--accent-archive)',
  'hard-question':  'var(--accent-altar)',
  'respite':        'var(--accent-guild)',
  'guild-feature':  'var(--accent-guild)',
  'closing-note':   'var(--accent-altar)',
}

const PLACEMENT_BG: Record<string, string> = {
  'opening-essay':  'var(--room-assignment)',
  'object-feature': 'var(--room-archive)',
  'hard-question':  'var(--room-altar)',
  'respite':        'var(--room-guild)',
  'guild-feature':  'var(--room-guild)',
  'closing-note':   'var(--room-altar)',
}

function TableauxEntry({ article, placement, placementLabel, idx }: {
  article: Article
  placement: string
  placementLabel: string
  idx: number
}) {
  const font   = PLACEMENT_FONT[placement]   ?? 'var(--font-serif)'
  const accent = PLACEMENT_ACCENT[placement] ?? 'var(--hearthgold)'
  const bg     = PLACEMENT_BG[placement]     ?? 'var(--parchment)'
  const isFirst = idx === 0
  const isImageLeft = !!(article.heroImage) && idx % 2 === 0

  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article style={{
        display: 'grid',
        gridTemplateColumns: article.heroImage ? (isImageLeft ? '380px 1fr' : '1fr 380px') : '1fr',
        border: '0.5px solid var(--border)',
        borderTop: idx === 0 ? '0.5px solid var(--border)' : 'none',
        minHeight: isFirst ? 'clamp(300px,38vw,440px)' : 'clamp(200px,22vw,280px)',
        background: bg,
      }}>
        {/* Image — left for even, right for odd */}
        {article.heroImage && isImageLeft && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={article.heroImage} alt={article.heroImageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.1)' }} />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: isFirst ? 'clamp(32px,4vw,56px)' : 'clamp(24px,3vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Placement label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ height: '0.5px', width: '20px', background: accent, opacity: 0.6 }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, opacity: 0.9 }}>{placementLabel}</span>
          </div>

          {/* Title */}
          <h2 className="article-headline" style={{
            fontFamily: font,
            fontSize: isFirst ? 'clamp(24px,3.2vw,44px)' : 'clamp(20px,2.4vw,32px)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.15,
            margin: '0 0 14px',
            letterSpacing: placement === 'hard-question' || placement === 'closing-note' ? '0.02em' : '0',
          }}>
            {article.title}
          </h2>

          {/* Dek */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: isFirst ? 'clamp(14px,1.5vw,17px)' : '14px', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.65, margin: '0 0 18px', maxWidth: '480px' }}>
            {article.dek}
          </p>

          {/* Mood tag + read time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {article.mood && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, opacity: 0.75 }}>{article.mood}</span>
            )}
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{article.readTime}</span>
          </div>
        </div>

        {/* Image — right for odd */}
        {article.heroImage && !isImageLeft && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={article.heroImage} alt={article.heroImageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.1)' }} />
          </div>
        )}
      </article>
    </Link>
  )
}

// ── Divider ──────────────────────────────────────────────────────────────────

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '36px 0 18px' }}>
      <div className="divider-line" />
      <span className="rule-ornament">{label}</span>
      <div className="divider-line" />
    </div>
  )
}

// ── Latest strip ─────────────────────────────────────────────────────────────

const SECTION_FONT_MAP: Record<string, string> = {
  'the-assignment': 'var(--font-assignment)',
  'the-craft':      'var(--font-craft)',
  'the-archive':    'var(--font-archive)',
  'the-altar':      'var(--font-altar)',
  'the-guild':      'var(--font-guild)',
}

const SECTION_ACCENT_MAP: Record<string, string> = {
  'the-assignment': 'var(--accent-assignment)',
  'the-craft':      'var(--accent-craft)',
  'the-archive':    'var(--accent-archive)',
  'the-altar':      'var(--accent-altar)',
  'the-guild':      'var(--accent-guild)',
}

function LatestStrip({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null

  // Format date as relative if within 14 days, otherwise short date
  function freshLabel(dateStr: string): string {
    if (!dateStr) return ''
    const published = new Date(dateStr)
    const now = new Date()
    const days = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 8)  return `${days} days ago`
    if (days < 15) return 'This week'
    return published.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div style={{ marginBottom: '0' }}>
      <Divider label="Latest" />
      <div style={{ border: '0.5px solid var(--border)' }}>
        {articles.map((article, i) => {
          const font   = SECTION_FONT_MAP[article.section]   ?? 'var(--font-serif)'
          const accent = SECTION_ACCENT_MAP[article.section] ?? 'var(--hearthgold)'
          const isLast = i === articles.length - 1
          return (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="article-link"
              style={{
                textDecoration: 'none',
                display: 'grid',
                gridTemplateColumns: article.heroImage ? '120px 1fr auto' : '1fr auto',
                alignItems: 'stretch',
                borderBottom: isLast ? 'none' : '0.5px solid var(--border)',
                background: i === 0 ? 'var(--parchment-mid)' : 'var(--parchment)',
                minHeight: '100px',
              }}
            >
              {/* Thumbnail */}
              {article.heroImage && (
                <div style={{ overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ padding: 'clamp(16px,2vw,24px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: accent }}>{article.sectionLabel}</span>
                  {article.mood && (
                    <>
                      <span style={{ color: 'var(--border-strong)', fontSize: '8px' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.7 }}>{article.mood}</span>
                    </>
                  )}
                </div>
                <h3
                  className="article-headline"
                  style={{ fontFamily: font, fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25, margin: '0 0 7px' }}
                >
                  {article.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', fontStyle: 'italic', fontWeight: 300, color: 'var(--ink-mid)', lineHeight: 1.5, margin: 0 }}>
                  {article.dek}
                </p>
              </div>

              {/* Meta — right column */}
              <div style={{ padding: 'clamp(16px,2vw,24px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '80px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '0.1em', color: 'var(--hearthgold)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  {freshLabel(article.publishDate)}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                  {article.readTime}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Pull quote rotator ───────────────────────────────────────────────────────

function PullQuoteRotator({ quotes }: { quotes: { text: string; source: string }[] }) {
  const first = quotes[0]
  return (
    <div
      id="pull-quote-rotator"
      data-quotes={JSON.stringify(quotes)}
      style={{ padding: 'clamp(36px,5vw,56px) clamp(48px,8vw,120px)', textAlign: 'center', borderLeft: '0.5px solid var(--border)', borderRight: '0.5px solid var(--border)' }}
    >
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '52px', lineHeight: '0.6', color: 'var(--hearthgold)', display: 'block', marginBottom: '14px', opacity: 0.65 }}>&ldquo;</span>
      <p id="pq-text" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,2.2vw,26px)', fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.55, maxWidth: '600px', margin: '0 auto 18px', transition: 'opacity 0.3s' }}>
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
          var textEl = document.getElementById('pq-text');
          if (textEl) textEl.style.transition = 'opacity 0.3s';
          function go(idx, animate) {
            current = idx;
            var tEl = document.getElementById('pq-text');
            var sEl = document.getElementById('pq-source');
            var dEl = document.getElementById('pq-dots');
            if (!tEl || !sEl || !dEl) return;
            if (animate) tEl.style.opacity = '0';
            setTimeout(function() {
              tEl.textContent = quotes[idx].text;
              sEl.textContent = 'From: ' + quotes[idx].source;
              if (animate) tEl.style.opacity = '1';
              dEl.querySelectorAll('span').forEach(function(d, i) {
                d.style.background = i === idx ? 'var(--hearthgold)' : 'rgba(200,130,10,0.25)';
              });
            }, animate ? 220 : 0);
            dEl.querySelectorAll('span').forEach(function(d) {
              d.onclick = function() { go(parseInt(d.dataset.index), true); clearInterval(timer); };
            });
          }
          var timer = setInterval(function() { go((current + 1) % quotes.length, true); }, 6000);
          go(0, false);
        })();
      ` }} />
    </div>
  )
}
