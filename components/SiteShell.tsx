import Link from 'next/link'

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
  { name: 'The Assignment', path: '/the-assignment', accent: 'var(--accent-assignment)' },
  { name: 'The Craft',      path: '/the-craft',      accent: 'var(--accent-craft)'      },
  { name: 'The Archive',    path: '/the-archive',    accent: 'var(--accent-archive)'    },
  { name: 'The Altar',      path: '/the-altar',      accent: 'var(--accent-altar)'      },
  { name: 'The Guild',      path: '/the-guild',      accent: 'var(--accent-guild)'      },
]

interface SiteShellProps {
  children: React.ReactNode
  activePath?: string
}

export default function SiteShell({ children, activePath }: SiteShellProps) {
  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>

      {/* ── Masthead ─────────────────────────────────────────────── */}
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
              <Link
                key={s.name}
                href={s.path}
                className="nav-link"
                style={activePath === s.path ? {
                  color: s.accent,
                  borderBottom: `1px solid ${s.accent}`,
                  paddingBottom: '2px',
                } : {}}
              >
                {s.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Page content ─────────────────────────────────────────── */}
      {children}

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ borderTop: '0.5px solid var(--border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'var(--ink-muted)', margin: 0, opacity: 0.7 }}>The Atelier & The Altar</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.45, margin: 0 }}>A HearthLight Media Publication · Truth. Expressed. Fully.</p>
        </div>
      </footer>

    </div>
  )
}
