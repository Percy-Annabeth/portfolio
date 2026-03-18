import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
//  FORMSPREE SETUP (free, no backend needed):
//  1. Go to https://formspree.io and create a free account
//  2. Create a new form — it gives you an endpoint like:
//     https://formspree.io/f/xabcdefg
//  3. Paste that full URL into FORMSPREE_URL below
// ─────────────────────────────────────────────────────────────
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'

// REPLACE with your actual social links
const socials = [
  { label: 'Instagram', href: 'https://instagram.com/yourhandle' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/yourprofile' },
  { label: 'YouTube',   href: 'https://youtube.com/@yourchannel' },
  { label: 'Behance',   href: 'https://behance.net/yourprofile' },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef    = useRef(null)

  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      }
    )
    gsap.fromTo(
      formRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
        delay: 0.2,
      }
    )
  }, [])

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      style={{ background: 'var(--surface)' }}
    >
      <div className="container-wide">

        {/* Big heading */}
        <div ref={headingRef} style={{ marginBottom: 'clamp(3rem,6vw,7rem)' }}>
          <p className="text-label" style={{ marginBottom: '0.8rem' }}>
            <span style={{ color: 'var(--accent)', marginRight: '8px' }}>05</span>
            Get In Touch
          </p>
          <h2
            className="text-huge"
            style={{
              color: 'var(--bone)',
              lineHeight: 0.92,
              maxWidth: '900px',
            }}
          >
            LET'S MAKE<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--dim)' }}>
              SOMETHING
            </span>
            <br />
            <span style={{ color: 'var(--accent)' }}>GREAT.</span>
          </h2>
        </div>

        {/* Two column — form + info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(3rem,6vw,8rem)',
            alignItems: 'start',
          }}
        >

          {/* Left — form */}
          <form ref={formRef} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '0.6rem' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="form-field"
                />
              </div>

              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '0.6rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  placeholder="john@email.com"
                  className="form-field"
                />
              </div>

              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '0.6rem' }}>
                  Tell Me About Your Project
                </label>
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  required
                  placeholder="I need a brand film for..."
                  rows={5}
                  className="form-field"
                  style={{ resize: 'none', lineHeight: 1.7 }}
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-solid"
                  style={{
                    opacity: status === 'sending' ? 0.6 : 1,
                    transition: 'opacity 0.3s, background 0.3s, transform 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : "Let's Talk"}
                  {status !== 'sending' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {/* Status messages */}
                {status === 'success' && (
                  <p style={{
                    marginTop: '1rem',
                    color: '#4ade80',
                    fontSize: '0.82rem',
                    letterSpacing: '0.05em',
                  }}>
                    ✓ Message sent! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{
                    marginTop: '1rem',
                    color: 'var(--accent)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.05em',
                  }}>
                    Something went wrong. Email me directly instead.
                  </p>
                )}
              </div>
            </div>
          </form>

          {/* Right — contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* Direct email */}
            <div>
              <p className="text-label" style={{ marginBottom: '0.8rem' }}>Direct Email</p>
              <a
                href="mailto:your@email.com"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(1.2rem,2.5vw,2rem)',
                  color: 'var(--bone)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  display: 'block',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--bone)'}
              >
                {/* REPLACE with your email */}
                YOUR@EMAIL.COM
              </a>
            </div>

            {/* Phone (optional) */}
            <div>
              <p className="text-label" style={{ marginBottom: '0.8rem' }}>WhatsApp / Phone</p>
              <a
                href="tel:+919999999999"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(1.2rem,2.5vw,2rem)',
                  color: 'var(--bone)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                  display: 'block',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--bone)'}
              >
                {/* REPLACE with your number */}
                +91 99999 99999
              </a>
            </div>

            {/* Socials */}
            <div>
              <p className="text-label" style={{ marginBottom: '1.2rem' }}>Follow</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      color: 'var(--dim)',
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textDecoration: 'none',
                      transition: 'color 0.25s',
                      width: 'fit-content',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--bone)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '1px',
                      background: 'var(--accent)',
                    }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.6rem 1.2rem',
              border: '1px solid var(--border)',
              width: 'fit-content',
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'pulse 2s infinite',
              }} />
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)' }}>
                Available for work
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}