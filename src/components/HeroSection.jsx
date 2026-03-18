import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const loaderRef     = useRef(null)
  const loaderTextRef = useRef(null)
  const heroRef       = useRef(null)
  const line1Ref      = useRef(null)
  const line2Ref      = useRef(null)
  const line3Ref      = useRef(null)
  const subRef        = useRef(null)
  const ctaRef        = useRef(null)
  const scrollRef     = useRef(null)
  const imgRef        = useRef(null)
  const overlayRef    = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(loaderTextRef.current, {
      y: -60, opacity: 0, duration: 0.6, ease: 'power3.in', delay: 0.8,
    })
    .to(loaderRef.current, {
      yPercent: -100, duration: 0.9, ease: 'power4.inOut',
    }, '-=0.1')
    .fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(subRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3'
    )
    .fromTo(imgRef.current,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
      '<-0.8'
    )

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.to(imgRef.current, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(overlayRef.current, {
        opacity: 0.7, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '60% top', scrub: true },
      })
    })

    gsap.to(scrollRef.current.querySelector('.scroll-arrow'), {
      y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut',
    })

    return () => mm.revert()
  }, [])

  const scrollToWork = () => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* Page Loader */}
      <div ref={loaderRef} className="loader">
        <div ref={loaderTextRef} className="loader-text">
          Loading<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
      </div>

      <section
        ref={heroRef}
        id="hero"
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '600px',
          display: 'grid',
          gridTemplateRows: '70px 1fr',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        {/* Background image */}
        <div
          ref={imgRef}
          style={{
            position: 'absolute', inset: 0,
            willChange: 'transform', overflow: 'hidden', zIndex: 0,
          }}
        >
          {/* REPLACE: your hero image — put in /public/images/ and use src="/images/yourfile.jpg" */}
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85"
            alt="Hero"
            style={{
              width: '100%', height: '115%',
              objectFit: 'cover', objectPosition: 'center', display: 'block',
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 55%, rgba(8,8,8,0.05) 100%)',
            opacity: 0.55,
          }}
        />

        {/* Row 1 — navbar spacer */}
        <div style={{ zIndex: 2 }} />

        {/* Row 2 — text content */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '0 clamp(1.2rem,5vw,5rem) clamp(2.5rem,5vw,5rem)',
            overflow: 'visible',   /* KEY: must be visible so pill isn't clipped */
          }}
        >
          {/* Label */}
          <p className="text-label" style={{ marginBottom: '0.8rem' }}>
            <span style={{
              display: 'inline-block', width: '20px', height: '1px',
              background: 'var(--accent)', verticalAlign: 'middle', marginRight: '8px',
            }} />
            Creative Portfolio
          </p>

          {/* Line 1 — YOUR */}
          <div style={{ overflow: 'hidden', marginBottom: '0.03em' }}>
            <h1
              ref={line1Ref}
              className="text-huge"
              style={{ color: 'var(--bone)', display: 'block' }}
            >
              YOUR
            </h1>
          </div>

          {/*
            Line 2 — NAME + pill image
            KEY FIXES:
            1. The wrapper div does NOT have overflow:hidden — pill is taller than text
            2. Pill uses a fixed aspect ratio and objectFit:cover so image never distorts
            3. lineHeight:1 on h1 so the text and pill align naturally
          */}
          <div style={{ marginBottom: '0.03em' }}>
            <h1
              ref={line2Ref}
              className="text-huge"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px var(--bone)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.5rem,1.5vw,1.2rem)',
                lineHeight: 1,
                overflow: 'visible',
              }}
            >
              {/* REPLACE with your name */}
              NAME

              {/* Pill image — replace src with your photo */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width:  'clamp(55px,9vw,130px)',
                  height: 'clamp(145px,5vw,75px)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  verticalAlign: 'middle',
                  /* slight border so it reads against dark backgrounds */
                  border: '1px solid rgba(232,224,208,0.15)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85"
                  alt="profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',  /* show face not chest */
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
              </span>
            </h1>
          </div>

          {/* Line 3 — HERE */}
          <div style={{ overflow: 'hidden', marginBottom: 'clamp(1.2rem,2.5vw,2rem)' }}>
            <h1
              ref={line3Ref}
              className="text-huge"
              style={{ color: 'var(--accent)', display: 'block' }}
            >
              HERE
            </h1>
          </div>

          {/* Sub + CTA */}
          <div style={{
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}>
            <p
              ref={subRef}
              style={{
                fontSize: 'clamp(0.8rem,1.5vw,1rem)',
                color: 'var(--dim)', maxWidth: '300px',
                lineHeight: 1.7, fontWeight: 300,
              }}
            >
              {/* REPLACE with your tagline */}
              Filmmaker · Photographer · Storyteller.<br />
              Based in New Delhi.
            </p>

            <div ref={ctaRef} style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                onClick={scrollToWork}
                className="btn-solid"
                style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem' }}
              >
                See My Work
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.75rem 1.5rem' }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          onClick={scrollToWork}
          style={{
            position: 'absolute',
            right: 'clamp(1.2rem,4vw,4rem)',
            bottom: 'clamp(2rem,4vw,4rem)',
            zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '8px', cursor: 'pointer',
          }}
        >
          <span style={{
            fontSize: '0.55rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--dim)', writingMode: 'vertical-rl',
          }}>
            Scroll
          </span>
          <svg className="scroll-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v14M1 8l7 7 7-7" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>
    </>
  )
}