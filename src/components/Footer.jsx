import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  { label: 'Work',    href: '#works'   },
  { label: 'About',  href: '#about'   },
  { label: 'Skills', href: '#skills'  },
  { label: 'Video',  href: '#video'   },
  { label: 'Contact',href: '#contact' },
]

export default function Footer() {
  const footerRef  = useRef(null)
  const bigTextRef = useRef(null)

  useEffect(() => {
    // Big text reveal
    gsap.fromTo(
      bigTextRef.current,
      { y: '40%', opacity: 0 },
      {
        y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: bigTextRef.current, start: 'top 90%' },
      }
    )
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--black)',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Giant name strip */}
      <div style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <div
          ref={bigTextRef}
          style={{
            padding: 'clamp(2rem,4vw,4rem) clamp(1.5rem,5vw,5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: 'clamp(3.5rem,10vw,10rem)',
              color: 'transparent',
              WebkitTextStroke: '1px var(--border)',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              transition: 'color 0.4s, -webkit-text-stroke-color 0.4s',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--bone)'
              e.target.style.WebkitTextStrokeColor = 'transparent'
            }}
            onMouseLeave={e => {
              e.target.style.color = 'transparent'
              e.target.style.WebkitTextStrokeColor = 'var(--border)'
            }}
          >
            {/* REPLACE with your name */}
            YOURNAME
          </h2>

          {/* Back to top */}
          <button
            onClick={backToTop}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px solid var(--border)',
              padding: '1rem',
              cursor: 'none',
              transition: 'border-color 0.3s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 16V4M4 10l6-6 6 6" stroke="var(--bone)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--dim)' }}>
              Top
            </span>
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          padding: '1.8rem clamp(1.5rem,5vw,5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        {/* Copyright */}
        <p style={{ fontSize: '0.72rem', color: 'var(--dim)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} {/* REPLACE */}YourName. All rights reserved.
        </p>

        {/* Footer nav */}
        <nav>
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', flexWrap: 'wrap' }}>
            {footerLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.7rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--dim)',
                    cursor: 'none',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--bone)'}
                  onMouseLeave={e => e.target.style.color = 'var(--dim)'}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Made with */}
        <p style={{ fontSize: '0.68rem', color: 'var(--border)', letterSpacing: '0.06em' }}>
          Built with React + GSAP
        </p>
      </div>
    </footer>
  )
}