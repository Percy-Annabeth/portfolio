import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stats — replace with your own numbers
const stats = [
  { value: '5+',  label: 'Years Active'       },
  { value: '80+', label: 'Projects Completed' },
  { value: '12+', label: 'Brands Worked With' },
  { value: '3',   label: 'Awards'             },
]

export default function AboutSection() {
  const sectionRef  = useRef(null)
  const imgRef      = useRef(null)
  const textRef     = useRef(null)
  const statsRef    = useRef(null)
  const lineRefs    = useRef([])

  const addLineRef = (el) => {
    if (el && !lineRefs.current.includes(el)) lineRefs.current.push(el)
  }

  useEffect(() => {
    const section = sectionRef.current

    // Image reveal
    gsap.fromTo(
      imgRef.current,
      { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: imgRef.current, start: 'top 80%' },
      }
    )

    // Subtle parallax on portrait
    gsap.to(imgRef.current.querySelector('img'), {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: imgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Text lines stagger
    lineRefs.current.forEach((line, i) => {
      gsap.fromTo(
        line,
        { y: '110%' },
        {
          y: '0%',
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
          delay: i * 0.1,
        }
      )
    })

    // Stats count-up
    const statEls = statsRef.current.querySelectorAll('.stat-value')
    statEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          delay: 0.1,
        }
      )
    })

  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section"
      style={{ background: 'var(--black)' }}
    >
      <div className="container-wide">

        {/* Label */}
        <p className="text-label" style={{ marginBottom: 'clamp(2rem,4vw,4rem)' }}>
          <span style={{ color: 'var(--accent)', marginRight: '8px' }}>01</span>
          About
        </p>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem,6vw,7rem)',
            alignItems: 'center',
          }}
        >

          {/* Left — portrait */}
          <div
            ref={imgRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '3/4',
              maxHeight: '620px',
            }}
          >
            {/* REPLACE: your portrait/about photo */}
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=85"
              alt="Portrait"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                willChange: 'transform',
              }}
            />

            {/* Floating accent box */}
            <div style={{
              position: 'absolute',
              bottom: '2rem',
              right: '-1rem',
              background: 'var(--accent)',
              padding: '1rem 1.5rem',
              zIndex: 2,
            }}>
              <p style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '2.5rem',
                color: 'var(--black)',
                lineHeight: 1,
              }}>
                {/* REPLACE: your city/base */}
                NEW<br />DELHI
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div ref={textRef}>
            <div style={{ overflow: 'hidden', marginBottom: '0.2em' }}>
              <h2
                ref={addLineRef}
                className="text-large"
                style={{ color: 'var(--bone)', display: 'block' }}
              >
                NOT JUST
              </h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '0.2em' }}>
              <h2
                ref={addLineRef}
                className="text-large"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--dim)',
                  display: 'block',
                }}
              >
                A LENS.
              </h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
              <h2
                ref={addLineRef}
                className="text-large"
                style={{ color: 'var(--accent)', display: 'block' }}
              >
                A VISION.
              </h2>
            </div>

            {/* Bio paragraphs — REPLACE with your own */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <p style={{ color: 'var(--bone)', fontSize: 'clamp(0.9rem,1.3vw,1.05rem)', lineHeight: 1.8, fontWeight: 300 }}>
                I'm <strong style={{ fontWeight: 500 }}>Tanishq</strong> — a filmmaker and photographer based in New Delhi.
                I work at the intersection of visual storytelling and creative strategy.
              </p>
              <p style={{ color: 'var(--dim)', fontSize: 'clamp(0.85rem,1.2vw,0.95rem)', lineHeight: 1.8, fontWeight: 300 }}>
                From commercial shoots to personal documentary work, every project starts
                with the same question: <em>what feeling should this leave behind?</em>
                I build visual systems that answer that question clearly.
              </p>
              <p style={{ color: 'var(--dim)', fontSize: 'clamp(0.85rem,1.2vw,0.95rem)', lineHeight: 1.8, fontWeight: 300 }}>
                Available for collaborations, commissions, and long-term creative partnerships.
              </p>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-outline"
            >
              Work with me
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1px',
            marginTop: 'clamp(3rem,6vw,7rem)',
            borderTop: '1px solid var(--border)',
            borderLeft: '1px solid var(--border)',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '2rem 1.5rem',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <p
                className="stat-value"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(2.5rem,5vw,4rem)',
                  color: 'var(--bone)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}