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

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  // Hide on scroll down, show on scroll up
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

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return
    if (open) {
      gsap.to(menuRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' })
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.45, ease: 'power3.in' })
      document.body.style.overflow = ''
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
        .nav-cta-desktop    { display: inline-flex; }
        .nav-cta-mobile     { display: none; }
        .nav-hamburger      { display: none; }

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
          top: 0,
          left: 0,
          right: 0,
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

        {/* Desktop links — hidden on mobile */}
        <ul
          className="nav-desktop-links"
          style={{
            gap: '2.5rem',
            listStyle: 'none',
            alignItems: 'center',
          }}
        >
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  cursor: 'none',
                  transition: 'color 0.25s',
                  padding: '0.2rem 0',
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

        {/* Mobile right side — CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>

          {/* Mobile CTA button — visible only on mobile */}
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

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="nav-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
              flexShrink: 0,
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

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'var(--surface)',
          transform: 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem clamp(2rem, 6vw, 5rem)',
          overflowY: 'auto',
        }}
      >
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(2.8rem, 10vw, 6rem)',
                  color: 'var(--bone)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  lineHeight: 1.1,
                  transition: 'color 0.2s',
                  display: 'block',
                  textAlign: 'left',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--bone)'}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '2.5rem', color: 'var(--dim)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          {/* REPLACE */}
          yourname@email.com
        </p>
      </div>
    </>
  )
}