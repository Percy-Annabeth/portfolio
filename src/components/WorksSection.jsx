import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

/*
  ANIMATION:
  - Normal page scroll — nothing unusual, no pinning, no trapping
  - Each project card starts off-screen (left or right)
  - As you scroll down and the card enters view → it slides in
  - As you scroll back up → it slides back out the same side
  - Desktop: 2 cards per row, left card from left, right card from right
  - Mobile:  1 card per row, alternates left/right per row
*/

function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

export default function WorksSection() {
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 88%' },
      }
    )
  }, [])

  const rows = chunk(projects, 2)

  return (
    <section id="works" style={{ background: 'var(--black)', overflowX: 'hidden' }}>

      {/* Heading */}
      <div
        ref={headingRef}
        style={{
          padding: 'clamp(2.5rem,6vw,6rem) clamp(1.2rem,5vw,5rem) clamp(1.5rem,3vw,3rem)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <p className="text-label" style={{ marginBottom: '0.8rem' }}>
            <span style={{ color: 'var(--accent)', marginRight: '8px' }}>02</span>
            Selected Work
          </p>
          <h2 className="text-large" style={{ color: 'var(--bone)', lineHeight: 0.95 }}>
            FEATURED<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--dim)' }}>
              PROJECTS
            </span>
          </h2>
        </div>
        <p style={{ color: 'var(--dim)', fontSize: '0.82rem', maxWidth: '260px', lineHeight: 1.7 }}>
          A selection of work across photography, film, and creative direction.
        </p>
      </div>

      {/* Cards */}
      <div style={{ padding: '0 clamp(1.2rem,5vw,5rem) clamp(2rem,4vw,4rem)' }}>
        {rows.map((pair, rowIndex) => (
          <ProjectRow key={rowIndex} pair={pair} rowIndex={rowIndex} />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '0 clamp(1.2rem,5vw,5rem) clamp(2.5rem,5vw,4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(1.5rem,3vw,2.5rem)',
      }}>
        <p style={{ color: 'var(--dim)', fontSize: '0.78rem' }}>More projects coming soon.</p>
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="btn-outline"
          style={{ fontSize: '0.7rem', padding: '0.6rem 1.4rem' }}
        >
          Start a project
        </a>
      </div>
    </section>
  )
}

// ── One row: 2 cards desktop, stacked mobile ─────────────────
function ProjectRow({ pair, rowIndex }) {
  const rowRef = useRef(null)

  useEffect(() => {
    const row = rowRef.current
    // Select direct card children
    const cards = row.querySelectorAll('.proj-card')

    cards.forEach((card, cardIndex) => {
      /*
        Direction logic:
        Desktop — cardIndex 0 = left card → comes from LEFT (-120vw)
                  cardIndex 1 = right card → comes from RIGHT (+120vw)
        Mobile  — row is single column, so cardIndex is always 0.
                  We alternate by rowIndex instead:
                  even row → from LEFT, odd row → from RIGHT

        We use a CSS media query approach: set both xFrom values
        and let the matchMedia pick the right one.
      */
      const mm = gsap.matchMedia()

      // Desktop: position in row determines direction
      mm.add('(min-width: 601px)', () => {
        const xFrom = cardIndex === 0 ? '-110%' : '110%'

        gsap.fromTo(card,
          { x: xFrom, opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 95%',   // start when row top is near bottom of screen
              end:   'top 25%',   // fully in by the time row reaches upper quarter
              scrub: 0.6,         // smooth, tied to scroll
            },
          }
        )
        return () => {}
      })

      // Mobile: alternate by rowIndex
      mm.add('(max-width: 600px)', () => {
        // On mobile each row has 1 card (cardIndex always 0)
        // Alternate direction by rowIndex
        const xFrom = rowIndex % 2 === 0 ? '-110%' : '110%'

        gsap.fromTo(card,
          { x: xFrom, opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,     // trigger on each individual card on mobile
              start: 'top 95%',
              end:   'top 20%',
              scrub: 0.6,
            },
          }
        )
        return () => {}
      })

      return () => mm.revert()
    })
  }, [rowIndex])

  return (
    <div
      ref={rowRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginBottom: '1rem',
        overflow: 'visible',   // cards slide in from outside, parent must not clip
      }}
      className="proj-row"
    >
      <style>{`
        @media (max-width: 600px) {
          .proj-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {pair.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      {/* Fill last slot if odd count */}
      {pair.length === 1 && (
        <div
          className="proj-card"
          style={{
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8rem',
            padding: '2rem',
            minHeight: '280px',
            background: 'var(--surface)',
          }}
        >
          <p className="text-medium" style={{ color: 'var(--dim)', lineHeight: 1, textAlign: 'center' }}>
            MORE<br /><span style={{ color: 'var(--accent)' }}>SOON</span>
          </p>
        </div>
      )}
    </div>
  )
}

// ── Single project card ───────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="proj-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: '1px solid',
        borderColor: hovered ? 'var(--accent)' : 'var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.35s',
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        aspectRatio: '16/10',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--border)',
      }}>
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(8,8,8,0.45)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: '0.82rem', letterSpacing: '0.22em',
            color: 'var(--bone)',
            border: '1px solid rgba(232,224,208,0.45)',
            padding: '0.5rem 1.2rem',
          }}>
            View Project
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '1.1rem 1.2rem 1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--accent)',
          }}>
            {project.category}
          </span>
          <span style={{ fontSize: '0.6rem', color: 'var(--dim)' }}>{project.year}</span>
        </div>
        <h3 style={{
          fontFamily: "'Bebas Neue',cursive",
          fontSize: 'clamp(1.3rem,2.5vw,2rem)',
          color: hovered ? 'var(--accent)' : 'var(--bone)',
          lineHeight: 1, marginBottom: '0.45rem',
          transition: 'color 0.3s',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: '0.78rem', color: 'var(--dim)',
          lineHeight: 1.6, marginBottom: '0.8rem',
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '0.57rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--dim)',
              border: '1px solid var(--border)', padding: '0.2rem 0.5rem',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}