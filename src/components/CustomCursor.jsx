import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    // Mouse position tracker
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Set initial positions
    gsap.set([dot, ring], { x: mouseX, y: mouseY })

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power3.out',
      })

      // Ring follows with lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,
        ease: 'power3.out',
      })
    }

    // Hover states
    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    // View project hover
    const onEnterWork = (e) => {
      const label = labelRef.current
      label.style.display = 'flex'
      gsap.to(ring, { scale: 4, opacity: 0.15, duration: 0.4 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 })
    }
    const onLeaveWork = () => {
      const label = labelRef.current
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.2, onComplete: () => { label.style.display = 'none' } })
    }

    window.addEventListener('mousemove', onMove)

    // Attach hover listeners
    const addListeners = () => {
      document.querySelectorAll('a, button, .btn-outline, .btn-solid, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
      document.querySelectorAll('.work-card').forEach(el => {
        el.addEventListener('mouseenter', onEnterWork)
        el.addEventListener('mouseleave', onLeaveWork)
      })
    }

    // Run once DOM is ready, then observe for new elements
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid var(--bone)',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: 0.7,
        }}
      />

      {/* "View" label that appears on work cards */}
      <div
        ref={labelRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 99997,
          transform: 'translate(-50%, -50%) scale(0.7)',
          opacity: 0,
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--black)',
          willChange: 'transform',
        }}
      >
        VIEW
      </div>
    </>
  )
}