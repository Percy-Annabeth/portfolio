import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'Work',    href: '#works'   },
  { label: 'About',  href: '#about'   },
  { label: 'Skills', href: '#skills'  },
  { label: 'Contact',href: '#contact' },
]

export default function Navbar() {
  const navRef   = useRef(null)
  const menuRef  = useRef(null)
  const [open, setOpen] = useState(false)
  const lastY    = useRef(0)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastY.current && currentY > 120) {
        gsap.to(navRef.current, { y: -90, duration: 0.4, ease: 'power2.inOut' })
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.inOut' })
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuRef.current) return
    if (open) {
      // Slide down from above navbar
      gsap.to(menuRef.current, { y: '0%', duration: 0.4, ease: 'power3.out' })
      // Do NOT lock body scroll — website stays scrollable behind menu
    } else {
      gsap.to(menuRef.current, { y: '-110%', duration: 0.35, ease: 'power3.in' })
    }
  }, [open])

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-cta-desktop   { display: inline-flex; }
        .nav-cta-mobile    { display: none; }
        .nav-hamburger     { display: none; }

        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta-desktop   { display: none !important; }
          .nav-cta-mobile    { display: inline-flex !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>

      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.1rem clamp(1.2rem, 4vw, 4rem)',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(8,8,8,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: '1.5rem',
            letterSpacing: '0.05em',
            color: 'var(--bone)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          YOUR<span style={{ color: 'var(--accent)' }}>NAME</span>
        </a>

        {/* Desktop links */}
        <ul
          className="nav-desktop-links"
          style={{ gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--dim)', cursor: 'none',
                  transition: 'color 0.25s', padding: '0.2rem 0',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--bone)'}
                onMouseLeave={e => e.target.style.color = 'var(--dim)'}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
          className="btn-outline nav-cta-desktop"
          style={{ fontSize: '0.7rem', padding: '0.55rem 1.3rem' }}
        >
          Let's Talk
        </a>

        {/* Mobile: CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="nav-cta-mobile"
            style={{
              fontSize: '0.65rem',
              padding: '0.5rem 1rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'var(--accent)',
              color: 'var(--black)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              textDecoration: 'none',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Let's Talk
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="nav-hamburger"
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px', padding: '4px', flexShrink: 0,
            }}
            aria-label="Menu"
          >
            <span style={{
              display: 'block', width: '22px', height: '1px',
              background: 'var(--bone)',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '1px',
              background: 'var(--bone)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.3s',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '1px',
              background: 'var(--bone)',
              transition: 'transform 0.3s',
              transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel — drops from navbar, only as tall as needed */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: '57px',        /* sits right below navbar */
          left: 0,
          right: 0,
          bottom: 'auto',     /* does NOT cover full screen */
          zIndex: 999,
          background: 'rgba(17,17,17,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          transform: 'translateY(-110%)',  /* slides down from top, not from right */
          display: 'flex',
          flexDirection: 'column',
          padding: '1.2rem clamp(1.5rem, 6vw, 2.5rem) 1.5rem',
          overflowY: 'auto',
        }}
      >
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.1rem',
        }}>
          {links.map((l) => (
            <li key={l.label} style={{ borderBottom: '1px solid var(--border)' }}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(1.8rem, 8vw, 3rem)',  /* fits 4 items on any phone */
                  color: 'var(--bone)',
                  background: 'none', border: 'none',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.6rem 0',
                  textAlign: 'left',
                }}
                onTouchStart={e => e.currentTarget.style.color = 'var(--accent)'}
                onTouchEnd={e => e.currentTarget.style.color = 'var(--bone)'}
              >
                {l.label}
                {/* Arrow */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M4 14L14 4M14 4H7M14 4v7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Email at bottom */}
        <p style={{
          marginTop: '2rem',
          color: 'var(--dim)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
        }}>
          {/* REPLACE */}
          yourname@email.com
        </p>
      </div>
    </>
  )
}