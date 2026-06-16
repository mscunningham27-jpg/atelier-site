'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

// ── Restrained interactions — wired here so they run after every React render ──
function useAtelierInteractions() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1. Scroll-reveal
    const revealEls = document.querySelectorAll('.reveal, .reveal-group')
    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'))
    } else {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) } }),
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
      )
      revealEls.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }
  }, [])

  // 2. Candleline reading progress
  useEffect(() => {
    const article = document.querySelector('[data-reading-chamber]') as HTMLElement | null
    if (!article) return
    let line = document.querySelector('.candleline') as HTMLElement | null
    if (!line) {
      line = document.createElement('div')
      line.className = 'candleline'
      document.body.appendChild(line)
    }
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const top    = article.getBoundingClientRect().top + window.scrollY
        const bottom = top + article.offsetHeight
        const pct    = Math.min(100, Math.max(0, ((window.scrollY + window.innerHeight * 0.5 - top) / (bottom - top)) * 100))
        document.documentElement.style.setProperty('--scroll-pct', pct.toFixed(1) + '%')
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      line?.remove()
      document.documentElement.style.removeProperty('--scroll-pct')
    }
  }, [])

  // 3. Parallax
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const wraps = document.querySelectorAll('.parallax-wrap')
    if (!wraps.length) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        wraps.forEach(wrap => {
          const img = wrap.querySelector('.parallax-img') as HTMLElement | null
          if (!img) return
          const rect   = wrap.getBoundingClientRect()
          const offset = ((rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight) * 20
          img.style.setProperty('--parallax-y', offset.toFixed(2) + 'px')
        })
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 4. Expandable captions
  useEffect(() => {
    const handlers: Array<[Element, EventListener]> = []
    document.querySelectorAll('.caption-wrap').forEach(wrap => {
      const toggle = wrap.querySelector('.caption-toggle')
      if (!toggle) return
      const handler: EventListener = () => {
        const expanded = wrap.classList.toggle('is-expanded')
        toggle.textContent = expanded ? 'Less' : 'More'
        toggle.setAttribute('aria-expanded', String(expanded))
      }
      toggle.addEventListener('click', handler)
      handlers.push([toggle, handler])
    })
    return () => handlers.forEach(([el, h]) => el.removeEventListener('click', h))
  }, [])
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
  { name: 'The Assignment', path: '/the-assignment', accent: 'var(--accent-assignment)' },
  { name: 'The Craft',      path: '/the-craft',      accent: 'var(--accent-craft)'      },
  { name: 'The Archive',    path: '/the-archive',    accent: 'var(--accent-archive)'    },
  { name: 'The Altar',      path: '/the-altar',      accent: 'var(--accent-altar)'      },
  { name: 'The Guild',      path: '/the-guild',      accent: 'var(--accent-guild)'      },
]

export type MastheadState = 'ceremonial' | 'condensed' | 'whisper'

interface SiteShellProps {
  children: React.ReactNode
  activePath?: string
  mastheadState?: MastheadState
  issueLabel?: string   // e.g. "Issue I · Beauty Under Judgment"
}

export default function SiteShell({
  children,
  activePath,
  mastheadState = 'condensed',
  issueLabel,
}: SiteShellProps) {
  useAtelierInteractions()
  return (
    <div style={{ backgroundColor: 'var(--parchment)', minHeight: '100vh' }}>
      {mastheadState === 'ceremonial' && (
        <CeremonialMasthead activePath={activePath} issueLabel={issueLabel} />
      )}
      {mastheadState === 'condensed' && (
        <CondensedMasthead activePath={activePath} />
      )}
      {mastheadState === 'whisper' && (
        <WhisperMasthead activePath={activePath} />
      )}
      {children}
      <Footer />
    </div>
  )
}

// ── State 1: Full Ceremonial ─────────────────────────────────────────────────
// Homepage, issue front. Grand opening. Issue metadata. Publication descriptor.

function CeremonialMasthead({ activePath, issueLabel }: { activePath?: string; issueLabel?: string }) {
  return (
    <header style={{ borderBottom: '0.5px solid var(--border)', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 0 0' }}>

        {/* HearthLight rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div className="divider-line" />
          <span className="rule-ornament" style={{ fontSize: '8px', letterSpacing: '0.28em' }}>HearthLight Media</span>
          <div className="divider-line" />
        </div>

        {/* Collage wordmark */}
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

        {/* Publication descriptor */}
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 300, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '8px 0 0', opacity: 0.65 }}>
          A Faith-Culture Magazine for Serious Christian Creatives
        </p>

        {/* Issue metadata */}
        {issueLabel && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--hearthgold)', margin: '6px 0 0', opacity: 0.8 }}>
            {issueLabel}
          </p>
        )}

        <nav style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(14px,3vw,40px)', padding: '18px 0' }}>
          {SECTIONS.map((s) => (
            <Link key={s.name} href={s.path} className="nav-link"
              style={activePath === s.path ? { color: s.accent, borderBottom: `1px solid ${s.accent}`, paddingBottom: '2px' } : {}}>
              {s.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

// ── State 2: Condensed ───────────────────────────────────────────────────────
// Section pages, archive pages. Editorial continuity without pageantry.

function CondensedMasthead({ activePath }: { activePath?: string }) {
  return (
    <header style={{ borderBottom: '0.5px solid var(--border)', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '18px 0 0' }}>

        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(8px,1vw,10px)', fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginRight: '10px', position: 'relative', top: '-3px' }}>THE</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', marginRight: 'clamp(4px,1vw,12px)' }}>
            {ATELIER_LETTERS.map((l, i) => (
              <span key={i} className="masthead-letter" style={{ fontSize: `clamp(${Math.round(18*l.scale)}px,${(2.8*l.scale).toFixed(2)}vw,${Math.round(36*l.scale)}px)`, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal', color: l.color, position: 'relative', top: `${Math.round(l.offset * 0.6)}px`, letterSpacing: '0.01em' }}>
                {l.char}
              </span>
            ))}
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px,3.8vw,48px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--hearthgold)', lineHeight: 1, position: 'relative', top: 'clamp(3px,0.8vw,9px)', margin: '0 clamp(3px,0.6vw,8px)' }}>&</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'clamp(3px,0.5vw,6px)', marginLeft: 'clamp(2px,0.3vw,5px)' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(10px,1.5vw,18px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-mid)' }}>The</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px,3vw,38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.015em' }}>Altar</span>
          </span>
        </Link>

        <nav style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(12px,2.5vw,36px)', padding: '14px 0' }}>
          {SECTIONS.map((s) => (
            <Link key={s.name} href={s.path} className="nav-link"
              style={activePath === s.path ? { color: s.accent, borderBottom: `1px solid ${s.accent}`, paddingBottom: '2px' } : {}}>
              {s.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

// ── State 3: Whisper ─────────────────────────────────────────────────────────
// Article pages. Compact horizontal bar, sticky on scroll, attention on reading.

function WhisperMasthead({ activePath }: { activePath?: string }) {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 80
        header.style.boxShadow = scrolled
          ? '0 1px 12px rgba(26,18,8,0.08)'
          : 'none'
        header.style.background = scrolled
          ? 'rgba(242,237,224,0.97)'
          : 'var(--parchment)'
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '0.5px solid var(--border)',
        background: 'var(--parchment)',
        transition: 'box-shadow 0.3s, background 0.3s',
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>

        {/* Whisper wordmark — left */}
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 0, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '8px', fontWeight: 300, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginRight: '6px', position: 'relative', top: '-2px' }}>THE</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            {ATELIER_LETTERS.map((l, i) => (
              <span key={i} className="masthead-letter" style={{ fontSize: `${Math.round(14*l.scale)}px`, fontWeight: l.weight, fontStyle: l.italic ? 'italic' : 'normal', color: l.color, position: 'relative', top: `${Math.round(l.offset * 0.35)}px`, letterSpacing: '0.01em' }}>
                {l.char}
              </span>
            ))}
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: 'var(--hearthgold)', lineHeight: 1, position: 'relative', top: '3px', margin: '0 4px' }}>&</span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '3px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '11px', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-mid)' }}>The</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: 'var(--ink)', letterSpacing: '0.015em' }}>Altar</span>
          </span>
        </Link>

        {/* Nav — right */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'clamp(10px,2vw,28px)' }}>
          {SECTIONS.map((s) => (
            <Link key={s.name} href={s.path} className="nav-link"
              style={activePath === s.path ? { color: s.accent, borderBottom: `1px solid ${s.accent}`, paddingBottom: '1px', fontSize: '9px' } : { fontSize: '9px' }}>
              {s.name}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'var(--ink-muted)', margin: 0, opacity: 0.7 }}>The Atelier & The Altar</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', opacity: 0.45, margin: 0 }}>A HearthLight Media Publication · Truth. Expressed. Fully.</p>
      </div>
    </footer>
  )
}
