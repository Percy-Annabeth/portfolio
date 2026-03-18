import { marqueeItems } from '../data/projects'

// direction: 'left' (default) or 'right'
export default function MarqueeStrip({ direction = 'left', color = 'var(--bone)', bg = 'transparent', bordered = false }) {

  // Double the items so the loop is seamless
  const doubled = [...marqueeItems, ...marqueeItems]

  const trackStyle = {
    display: 'flex',
    gap: '2.5rem',
    whiteSpace: 'nowrap',
    animation: `marquee${direction === 'right' ? 'Rev' : ''} 24s linear infinite`,
    willChange: 'transform',
  }

  return (
    <>
      <style>{`
        @keyframes marquee    { from { transform: translateX(0) }  to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>

      <div
        style={{
          overflow: 'hidden',
          padding: '1.1rem 0',
          background: bg,
          borderTop:    bordered ? '1px solid var(--border)' : 'none',
          borderBottom: bordered ? '1px solid var(--border)' : 'none',
        }}
      >
        <div style={trackStyle}>
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: item === '✦' ? 'serif' : "'DM Sans', sans-serif",
                fontSize: item === '✦' ? '0.7rem' : '0.72rem',
                fontWeight: 500,
                letterSpacing: item === '✦' ? '0' : '0.18em',
                textTransform: 'uppercase',
                color: item === '✦' ? 'var(--accent)' : color,
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}