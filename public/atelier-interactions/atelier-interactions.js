/**
 * The Atelier & The Altar — Restrained Interactions
 * Phase 6: scroll-reveal, candleline, parallax, caption expand
 *
 * All motion respects prefers-reduced-motion.
 * No dependencies. Runs after DOMContentLoaded.
 */

(function () {
  'use strict'

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── 1. Scroll-reveal via IntersectionObserver ──────────────────────
  function initReveal() {
    if (prefersReducedMotion) {
      // Make all reveal elements immediately visible
      document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
        el.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // fire once
          }
        })
      },
      {
        threshold: 0.12,      // trigger when 12% visible
        rootMargin: '0px 0px -40px 0px', // slight offset from bottom
      }
    )

    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
      observer.observe(el)
    })
  }

  // ── 2. Candleline reading progress ────────────────────────────────
  function initCandleline() {
    const article = document.querySelector('[data-reading-chamber]')
    if (!article) return

    const line = document.createElement('div')
    line.className = 'candleline'
    document.body.appendChild(line)

    let ticking = false
    window.addEventListener('scroll', () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const articleTop    = article.getBoundingClientRect().top + window.scrollY
        const articleBottom = articleTop + article.offsetHeight
        const scrolled      = window.scrollY
        const windowH       = window.innerHeight
        const pct = Math.min(
          100,
          Math.max(0, ((scrolled + windowH * 0.5 - articleTop) / (articleBottom - articleTop)) * 100)
        )
        document.documentElement.style.setProperty('--scroll-pct', pct.toFixed(1) + '%')
        ticking = false
      })
    }, { passive: true })
  }

  // ── 3. Hero image parallax ─────────────────────────────────────────
  function initParallax() {
    if (prefersReducedMotion) return

    const wraps = document.querySelectorAll('.parallax-wrap')
    if (!wraps.length) return

    let ticking = false
    window.addEventListener('scroll', () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        wraps.forEach(wrap => {
          const img = wrap.querySelector('.parallax-img')
          if (!img) return
          const rect   = wrap.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const vhCenter = window.innerHeight / 2
          // Max travel: ±20px. Divide by 8 for subtlety.
          const offset = ((center - vhCenter) / window.innerHeight) * 20
          img.style.setProperty('--parallax-y', offset.toFixed(2) + 'px')
        })
        ticking = false
      })
    }, { passive: true })
  }

  // ── 4. Expandable captions ─────────────────────────────────────────
  function initCaptions() {
    document.querySelectorAll('.caption-wrap').forEach(wrap => {
      const toggle = wrap.querySelector('.caption-toggle')
      if (!toggle) return
      toggle.addEventListener('click', () => {
        const isExpanded = wrap.classList.toggle('is-expanded')
        toggle.textContent = isExpanded ? 'Less' : 'More'
        toggle.setAttribute('aria-expanded', String(isExpanded))
      })
    })
  }

  // ── 5. Section divider auto-reveal ────────────────────────────────
  // Automatically add .reveal to section dividers that don't have it
  function autoRevealDividers() {
    document.querySelectorAll('.divider-line').forEach(el => {
      const parent = el.closest('div')
      if (parent && !parent.classList.contains('reveal')) {
        parent.classList.add('reveal')
      }
    })
  }

  // ── Init ───────────────────────────────────────────────────────────
  function init() {
    autoRevealDividers()
    initReveal()
    initCandleline()
    initParallax()
    initCaptions()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
