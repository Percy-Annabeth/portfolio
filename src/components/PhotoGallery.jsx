import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE with your own photos
const photos = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'Photo 1', span: 'tall'   },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Photo 2', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', alt: 'Photo 3', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', alt: 'Photo 4', span: 'wide'   },
  { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', alt: 'Photo 5', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Photo 6', span: 'tall'   },
  { src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', alt: 'Photo 7', span: 'normal' },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', alt: 'Photo 8', span: 'normal' },
]

/*
  ANIMATION CONCEPT:
  Each photo cell has overflow:hidden (the "frame").
  The image inside starts translated outside the frame (below),
  and scrubs into position as you scroll down.
  Scrolling back up reverses it — image retreats out of frame again.
  Each photo gets a different entry direction and speed for variety.
*/

// Entry directions per photo index — alternates for visual rhythm
const entryConfig = [
  { from: 'bottom', speed: 1.0 },  // 0
  { from: 'top',    speed: 0.8 },  // 1
  { from: 'bottom', speed: 1.2 },  // 2
  { from: 'left',   speed: 0.9 },  // 3  (wide photo)
  { from: 'bottom', speed: 1.1 },  // 4
  { from: 'top',    speed: 0.85 }, // 5
  { from: 'right',  speed: 1.0 },  // 6
  { from: 'bottom', speed: 0.95 }, // 7
]

export default function PhotoGallery() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    // Heading scrub in
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      }
    )

    const items = gridRef.current.querySelectorAll('.photo-item')

    items.forEach((item, i) => {
      const img    = item.querySelector('img')
      const cfg    = entryConfig[i] || { from: 'bottom', speed: 1 }

      // The CELL (frame) starts clipped shut — opens as you scroll in
      // toggleActions: 'play reverse play reverse' makes it fully bidirectional
      gsap.fromTo(
        item,
        {
          clipPath: cfg.from === 'bottom' ? 'inset(100% 0% 0% 0%)' :
                    cfg.from === 'top'    ? 'inset(0% 0% 100% 0%)' :
                    cfg.from === 'left'   ? 'inset(0% 100% 0% 0%)' :
                                           'inset(0% 0% 0% 100%)',  // right
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            end:   'top 20%',
            scrub: cfg.speed,         // higher = more lag = feels heavier
          },
        }
      )

      // The IMAGE inside moves at a different rate — creates depth/parallax
      // Image moves opposite to clip direction so it "arrives" from outside
      const startY = cfg.from === 'bottom' ?  60 :
                     cfg.from === 'top'    ? -60 : 0
      const startX = cfg.from === 'left'   ? -60 :
                     cfg.from === 'right'  ?  60 : 0

      gsap.fromTo(
        img,
        { y: startY, x: startX },
        {
          y: 0, x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            end:   'top 20%',
            scrub: cfg.speed * 0.8,   // slightly faster than clip = snappy
          },
        }
      )

      // After fully revealed — subtle continuous parallax on scroll
      gsap.to(img, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 1.5,
        },
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section"
      style={{
        background: 'var(--surface)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      <div className="container-wide">

        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(2rem,5vw,5rem)',
          }}
        >
          <div>
            <p className="text-label" style={{ marginBottom: '0.8rem' }}>
              <span style={{ color: 'var(--accent)', marginRight: '8px' }}>03</span>
              Photography
            </p>
            <h2 className="text-large" style={{ color: 'var(--bone)', lineHeight: 0.95 }}>
              STILL<br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--dim)' }}>
                FRAMES
              </span>
            </h2>
          </div>
          <p style={{ color: 'var(--dim)', fontSize: '0.82rem', maxWidth: '280px', lineHeight: 1.7 }}>
            Moments captured before they disappear. Every frame a decision.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="photo-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: 'clamp(160px, 22vw, 300px)',
            gap: '0.6rem',
            width: '100%',
          }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`photo-item ${
                photo.span === 'tall' ? 'photo-tall' :
                photo.span === 'wide' ? 'photo-wide' : ''
              }`}
              style={{
                gridRow:    photo.span === 'tall' ? 'span 2' : 'span 1',
                gridColumn: photo.span === 'wide' ? 'span 2' : 'span 1',
                overflow: 'hidden',
                background: 'var(--border)',
                position: 'relative',
                /*
                  Will-change helps browser prep the layer for clipping animation.
                  Don't add it to too many elements — 8 photos is fine.
                */
                willChange: 'clip-path',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '120%',      /* extra height for parallax travel */
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  willChange: 'transform',
                }}
              />

              {/* Hover overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(8,8,8,0)',
                  transition: 'background 0.4s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '0.8rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(8,8,8,0.5)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(8,8,8,0)'}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: '0.85rem',
                  letterSpacing: '0.2em',
                  color: 'var(--bone)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                  ref={el => {
                    if (el) {
                      el.parentElement.addEventListener('mouseenter', () => el.style.opacity = '1')
                      el.parentElement.addEventListener('mouseleave', () => el.style.opacity = '0')
                    }
                  }}
                >
                  {photo.alt}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}