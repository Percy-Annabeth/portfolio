import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
//  REPLACE with your own videos.
//
//  For self-hosted: put .mp4 in /public/videos/ → use src="/videos/yourfile.mp4"
//  For YouTube:     set type:'youtube' and paste your video ID in src
//  For Vimeo:       set type:'vimeo'   and paste your video ID in src
// ─────────────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    title: 'Showreel 2024',
    category: 'Film',
    type: 'youtube',               // 'youtube' | 'vimeo' | 'local'
    src: 'dQw4w9WgXcQ',           // YouTube video ID (the part after ?v=)
    poster: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80',
  },
  {
    id: 2,
    title: 'Brand Film — Client',
    category: 'Commercial',
    type: 'youtube',
    src: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=80',
  },
  {
    id: 3,
    title: 'Documentary Short',
    category: 'Documentary',
    type: 'youtube',
    src: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  },
]

export default function VideoSection() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const [active, setActive] = useState(null) // which video is playing

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      }
    )

    const cards = sectionRef.current.querySelectorAll('.video-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          delay: i * 0.12,
        }
      )
    })
  }, [])

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const getEmbedUrl = (video) => {
    if (video.type === 'youtube') return `https://www.youtube.com/embed/${video.src}?autoplay=1&rel=0`
    if (video.type === 'vimeo')   return `https://player.vimeo.com/video/${video.src}?autoplay=1`
    return null
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="video"
        className="section"
        style={{ background: 'var(--black)' }}
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
              marginBottom: 'clamp(2.5rem,5vw,5rem)',
            }}
          >
            <div>
              <p className="text-label" style={{ marginBottom: '0.8rem' }}>
                <span style={{ color: 'var(--accent)', marginRight: '8px' }}>04</span>
                Moving Image
              </p>
              <h2 className="text-large" style={{ color: 'var(--bone)', lineHeight: 0.95 }}>
                FILM &amp;<br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--dim)' }}>
                  VIDEO
                </span>
              </h2>
            </div>
            <p style={{ color: 'var(--dim)', fontSize: '0.82rem', maxWidth: '280px', lineHeight: 1.7 }}>
              Stories that move. Click any thumbnail to watch.
            </p>
          </div>

          {/* Video grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {videos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onPlay={() => setActive(video)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(8,8,8,0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

          {/* Close button */}
          <button
            onClick={() => setActive(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--bone)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              fontSize: '1.2rem',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            ✕
          </button>

          {/* Embed iframe */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '960px',
              aspectRatio: '16/9',
              background: '#000',
            }}
          >
            {(active.type === 'youtube' || active.type === 'vimeo') ? (
              <iframe
                src={getEmbedUrl(active)}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={active.title}
              />
            ) : (
              <video
                src={active.src}
                controls
                autoPlay
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

// ── Video Card ───────────────────────────────────────────────
function VideoCard({ video, index, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="video-card"
      style={{ cursor: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'var(--surface)',
        marginBottom: '1rem',
      }}>
        <img
          src={video.poster}
          alt={video.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8,8,8,0.3)',
          transition: 'background 0.3s',
          background: hovered ? 'rgba(8,8,8,0.55)' : 'rgba(8,8,8,0.25)',
        }} />

        {/* Play button */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: hovered ? '64px' : '52px',
            height: hovered ? '64px' : '52px',
            borderRadius: '50%',
            background: hovered ? 'var(--accent)' : 'rgba(232,224,208,0.15)',
            border: '1px solid',
            borderColor: hovered ? 'var(--accent)' : 'rgba(232,224,208,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <svg
              width="18" height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ marginLeft: '3px' }}
            >
              <path
                d="M5 3l10 6-10 6V3z"
                fill={hovered ? 'var(--black)' : 'var(--bone)'}
                transition="fill 0.3s"
              />
            </svg>
          </div>
        </div>

        {/* Category badge */}
        <span style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          fontSize: '0.6rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--bone)',
          background: 'rgba(8,8,8,0.6)',
          backdropFilter: 'blur(8px)',
          padding: '0.3rem 0.7rem',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {video.category}
        </span>
      </div>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: 'clamp(1.2rem,2vw,1.6rem)',
          color: hovered ? 'var(--bone)' : 'var(--dim)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          transition: 'color 0.3s',
        }}>
          {video.title}
        </h3>
        <svg
          width="20" height="20"
          viewBox="0 0 20 20"
          fill="none"
          style={{
            transition: 'transform 0.3s, opacity 0.3s',
            transform: hovered ? 'translate(4px,-4px)' : 'none',
            opacity: hovered ? 1 : 0.3,
          }}
        >
          <path d="M4 16L16 4M16 4H8M16 4v8"
            stroke={hovered ? 'var(--accent)' : 'var(--bone)'}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}