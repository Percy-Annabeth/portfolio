import { useEffect, useState } from 'react'
import { projects, extraWork, DRIVE_FOLDER_ID, DRIVE_API_KEY, MORE_WORK_URL } from '../data/projects'
import { useAllWorkOpen, closeAllWork } from '../hooks/allWorkRoute'
import VideoModal from './VideoModal'

/*
  ALL WORK PAGE
  - Opens over the site (under the normal navbar) when the URL hash is  #/work
  - Shows every video in your Google Drive folder, 4 per row on desktop
  - With a (free) Drive API key it reads the folder live; without one it shows
    the videos listed in data/projects.js  (projects + extraWork)
*/

const API_KEY = import.meta.env.VITE_DRIVE_API_KEY || DRIVE_API_KEY
const STATIC_LIST = [...projects, ...extraWork]

let cachedList = null // remember the folder listing so re-opening the page is instant

// "Faheem ( BLR Highlight )_v1.mp4"  →  "Faheem (BLR Highlight)"
const prettyTitle = (name) =>
  name
    .replace(/\.[a-z0-9]{2,4}$/i, '')
    .replace(/_/g, ' ')
    .replace(/\s*\bv\d+\s*$/i, '')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s{2,}/g, ' ')
    .trim()

async function fetchFolderVideos() {
  const out = []
  let pageToken = ''
  do {
    const params = new URLSearchParams({
      q: `'${DRIVE_FOLDER_ID}' in parents and trashed = false and mimeType contains 'video/'`,
      fields: 'nextPageToken, files(id, name)',
      orderBy: 'createdTime desc',
      pageSize: '200',
      key: API_KEY,
    })
    if (pageToken) params.set('pageToken', pageToken)
    const res = await fetch('https://www.googleapis.com/drive/v3/files?' + params.toString())
    if (!res.ok) throw new Error('Drive API ' + res.status)
    const data = await res.json()
    out.push(...(data.files || []))
    pageToken = data.nextPageToken || ''
  } while (pageToken)
  return out.map((f) => ({ id: f.id, title: prettyTitle(f.name), driveId: f.id }))
}

export default function AllWorkPage() {
  const open = useAllWorkOpen()
  return open ? <AllWorkContent /> : null
}

function AllWorkContent() {
  // null = still loading
  const [items, setItems] = useState(() => cachedList ?? (API_KEY ? null : STATIC_LIST))
  const [failed, setFailed] = useState(false)
  const [active, setActive] = useState(null)

  // Load the Drive folder
  useEffect(() => {
    if (!API_KEY || cachedList) return
    let cancelled = false
    fetchFolderVideos()
      .then((list) => {
        cachedList = list
        if (!cancelled) setItems(list)
      })
      .catch(() => {
        if (!cancelled) { setFailed(true); setItems(STATIC_LIST) }
      })
    return () => { cancelled = true }
  }, [])

  // Freeze the site behind this page while it is open
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = prev }
  }, [])

  return (
    <div
      data-lenis-prevent
      style={{
        position: 'fixed', inset: 0, zIndex: 900,   // just under the navbar (1000)
        background: 'var(--black)',
        overflowY: 'auto', overscrollBehavior: 'contain',
        paddingTop: '76px',                          // room for the navbar
      }}
    >
      <style>{`
        .aw-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        @media (max-width: 1000px) { .aw-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .aw-grid { grid-template-columns: repeat(2, 1fr); gap: 0.7rem; } }
        @media (max-width: 380px)  { .aw-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ padding: 'clamp(1.5rem,3vw,2.5rem) clamp(1.2rem,5vw,5rem) clamp(3rem,6vw,5rem)' }}>

        {/* Back + heading */}
        <button
          onClick={closeAllWork}
          className="btn-outline"
          style={{ fontSize: '0.68rem', padding: '0.55rem 1.1rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
        }}>
          <div>
            <p className="text-label" style={{ marginBottom: '0.8rem' }}>
              <span style={{ color: 'var(--accent)', marginRight: '8px' }}>+</span>
              Complete Archive
            </p>
            <h2 className="text-large" style={{ color: 'var(--bone)', lineHeight: 0.95 }}>
              ALL <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--dim)' }}>WORK</span>
            </h2>
          </div>
          {items && (
            <p style={{ color: 'var(--dim)', fontSize: '0.78rem' }}>
              {items.length} {items.length === 1 ? 'video' : 'videos'}
            </p>
          )}
        </div>

        {/* Notices */}
        {failed && (
          <p style={{ color: 'var(--dim)', fontSize: '0.8rem', marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Couldn&apos;t load the full folder right now — showing featured videos.{' '}
            <a href={MORE_WORK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              Open the folder in Google Drive ↗
            </a>
          </p>
        )}

        {items === null && (
          <p style={{ color: 'var(--dim)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Loading…
          </p>
        )}

        {items && items.length === 0 && (
          <p style={{ color: 'var(--dim)', fontSize: '0.85rem' }}>No videos found in the folder yet.</p>
        )}

        {/* Grid — 4 per row */}
        {items && items.length > 0 && (
          <div className="aw-grid">
            {items.map((v) => (
              <MiniCard key={v.id} video={v} onPlay={setActive} />
            ))}
          </div>
        )}

        {/* Bottom back button */}
        {items && items.length > 0 && (
          <div style={{ marginTop: 'clamp(2rem,4vw,3.5rem)', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={closeAllWork}
              className="btn-outline"
              style={{ fontSize: '0.68rem', padding: '0.55rem 1.1rem' }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to site
            </button>
          </div>
        )}
      </div>

      {active && <VideoModal project={active} onClose={() => setActive(null)} />}
    </div>
  )
}

// ── Small video card ──────────────────────────────────────────
function MiniCard({ video, onPlay }) {
  const [hovered, setHovered] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)
  const thumb = `https://drive.google.com/thumbnail?id=${video.driveId}&sz=w600`
  const play = () => onPlay(video)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title}`}
      onClick={play}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play() } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface)',
        border: '1px solid',
        borderColor: hovered ? 'var(--accent)' : 'var(--border)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--border)', overflow: 'hidden' }}>
        {!thumbFailed && (
          <img
            src={thumb}
            alt={video.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setThumbFailed(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
            }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(8,8,8,0.45)' : 'rgba(8,8,8,0.2)',
          transition: 'background 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            width: '42px', height: '42px', borderRadius: '50%',
            border: '1px solid rgba(232,224,208,0.6)',
            background: hovered ? 'var(--accent)' : 'rgba(8,8,8,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={hovered ? 'var(--black)' : 'var(--bone)'} style={{ marginLeft: '2px' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>

      <div style={{ padding: '0.7rem 0.8rem 0.8rem' }}>
        <h3 style={{
          fontFamily: "'Bebas Neue',cursive",
          fontSize: 'clamp(1rem,1.4vw,1.2rem)',
          color: hovered ? 'var(--accent)' : 'var(--bone)',
          lineHeight: 1.1, transition: 'color 0.3s',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {video.title}
        </h3>
      </div>
    </div>
  )
}
