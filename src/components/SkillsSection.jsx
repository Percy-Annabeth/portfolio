import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsSection() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const listRef     = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    // Heading
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      }
    )

    // Skill rows stagger in
    const rows = listRef.current.querySelectorAll('.skill-row')
    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
          delay: i * 0.1,
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section"
      style={{
        background: 'var(--surface)',
        isolation: 'isolate',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide">

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(3rem,6vw,8rem)',
            alignItems: 'start',
          }}
        >

          {/* Left — sticky on desktop only */}
          <div
            ref={headingRef}
            className="skills-heading-col"
          >
            <style>{`
              .skills-heading-col {
                position: sticky;
                top: 120px;
              }
              @media (max-width: 767px) {
                .skills-heading-col {
                  position: static !important;
                  top: auto !important;
                }
                .skills-preview-box {
                  display: none !important;
                }
              }
            `}</style>

            <p className="text-label" style={{ marginBottom: '0.8rem' }}>
              <span style={{ color: 'var(--accent)', marginRight: '8px' }}>04</span>
              What I Do
            </p>
            <h2 className="text-large" style={{ color: 'var(--bone)', lineHeight: 0.95, marginBottom: '2rem' }}>
              SKILLS &amp;<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--dim)' }}>
                SERVICES
              </span>
            </h2>
            <p style={{ color: 'var(--dim)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '280px' }}>
              End-to-end creative. From pre-production concept to final export.
              Every deliverable built to perform.
            </p>

            <div
              className="skills-preview-box"
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                border: '1px solid var(--border)',
                background: 'var(--black)',
              }}
            >
              <p style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '1.1rem',
                color: 'var(--accent)',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem',
              }}>
                {skills[active].title}
              </p>
              <p style={{ color: 'var(--dim)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                {skills[active].description}
              </p>
            </div>
          </div>

          {/* Right — skill rows */}
          <div ref={listRef}>
            {skills.map((skill, i) => (
              <SkillRow
                key={skill.number}
                skill={skill}
                index={i}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}

            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v14M1 8l7 7 7-7" stroke="var(--black)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p style={{ color: 'var(--dim)', fontSize: '0.78rem', lineHeight: 1.6 }}>
                Every project is different. Let's talk about yours.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Single skill row ─────────────────────────────────────────
function SkillRow({ skill, isActive, onClick }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!bodyRef.current) return
    gsap.to(bodyRef.current, {
      height: isActive ? 'auto' : 0,
      opacity: isActive ? 1 : 0,
      duration: 0.45,
      ease: 'power3.inOut',
    })
  }, [isActive])

  return (
    <div
      className="skill-row"
      style={{
        borderBottom: '1px solid var(--border)',
        cursor: 'none',
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            color: isActive ? 'var(--accent)' : 'var(--dim)',
            transition: 'color 0.3s',
            minWidth: '20px',
          }}>
            {skill.number}
          </span>
          <span style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
            color: isActive ? 'var(--bone)' : 'var(--dim)',
            letterSpacing: '0.02em',
            transition: 'color 0.3s',
            lineHeight: 1,
          }}>
            {skill.title}
          </span>
        </div>

        <div style={{
          width: '32px',
          height: '32px',
          border: '1px solid',
          borderColor: isActive ? 'var(--accent)' : 'var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'border-color 0.3s, transform 0.4s',
          transform: isActive ? 'rotate(45deg)' : 'none',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke={isActive ? 'var(--accent)' : 'var(--dim)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      <div
        ref={bodyRef}
        style={{ height: 0, overflow: 'hidden', opacity: 0 }}
      >
        <p style={{
          color: 'var(--dim)',
          fontSize: '0.85rem',
          lineHeight: 1.8,
          paddingBottom: '1.5rem',
          maxWidth: '480px',
        }}>
          {skill.description}
        </p>
      </div>
    </div>
  )
}