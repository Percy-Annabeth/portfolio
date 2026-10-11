import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// ── Video player popup ────────────────────────────────────────
// Plays the Google Drive video in an embedded player. Close with ✕, Esc, or by clicking outside.
export default function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    // Freeze the page behind the popup while it is open
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 20000,
        background: 'rgba(8,8,8,0.93)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0.8rem,4vw,3rem)',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{ width: 'min(1100px, 100%)' }}>
        {/* Title + close */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', marginBottom: '0.8rem',
        }}>
          <p style={{
            fontFamily: "'Bebas Neue',cursive",
            fontSize: 'clamp(1.1rem,2.5vw,1.6rem)',
            color: 'var(--bone)', lineHeight: 1,
          }}>
            {project.title}
          </p>
          <button
            onClick={onClose}
            aria-label="Close video"
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--bone)', width: '38px', height: '38px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Player */}
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16/9',
          background: '#000', border: '1px solid var(--border)',
        }}>
          <iframe
            src={`https://drive.google.com/file/d/${project.driveId}/preview`}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>

        <a
          href={`https://drive.google.com/file/d/${project.driveId}/view`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', marginTop: '0.8rem',
            fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--dim)', textDecoration: 'none',
          }}
        >
          Not loading? Open in Google Drive ↗
        </a>
      </div>
    </div>,
    document.body
  )
}
