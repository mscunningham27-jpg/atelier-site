'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire to Resend API via /api/subscribe route
    if (email) setSubmitted(true)
  }

  if (submitted) {
    return (
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '18px',
        fontStyle: 'italic',
        color: 'var(--warmgold)',
        margin: 0,
      }}>
        You're on the list. See you Sunday.
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '8px',
        maxWidth: '420px',
        margin: '0 auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ flex: 1, minWidth: '200px' }}
      />
      <button
        type="submit"
        style={{
          background: 'var(--hearthgold)',
          color: 'var(--ember)',
          border: 'none',
          borderRadius: '2px',
          padding: '10px 24px',
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        Subscribe →
      </button>
    </form>
  )
}
