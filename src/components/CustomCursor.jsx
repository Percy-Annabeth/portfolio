import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const labelRef = useRef(null)

  // Detect touch device — if true, render nothing at all
  const isTouch = typeof window !== 'undefined'
    ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
    : false

  useEffect(() => {
    // On touch devices do nothing — elements aren't rendered
    if (isTouch) return

    const dot  = dotRef.current
    const ring = ringRef.current

    // Start off-screen so cursor doesn't flash in center before first mouse move
    gsap.set([dot, ring], { x: -100, y: -100, opacity: 0 })

    let hasMovedOnce = false

    const onMove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      // First move — fade elements in
      if (!hasMovedOnce) {
        hasMovedOnce = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }

      gsap.to(dot, {
        x: mouseX, y: mouseY,
        duration: 0.08, ease: 'power3.out',
      })
      gsap.to(ring, {
        x: mouseX, y: mouseY,
        duration: 0.45, ease: 'power3.out',
      })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3 })
      gsap.to(dot,  { scale: 0, duration: 0.2 })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }

    const onEnterWork = () => {
      const label = labelRef.current
      label.style.display = 'flex'
      gsap.to(ring,  { scale: 4, opacity: 0.15, duration: 0.4 })
      gsap.to(dot,   { scale: 0, duration: 0.2 })
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 })
    }
    const onLeaveWork = () => {
      const label = labelRef.current
      gsap.to(ring,  { scale: 1, opacity: 1, duration: 0.4 })
      gsap.to(dot,   { scale: 1, duration: 0.2 })
      gsap.to(label, {
        opacity: 0, scale: 0.7, duration: 0.2,
        onComplete: () => { label.style.display = 'none' },
      })
    }

    window.addEventListener('mousemove', onMove)

    const addListeners = () => {
      document.querySelectorAll('a, button, .btn-outline, .btn-solid, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
      document.querySelectorAll('.work-card, .proj-card').forEach(el => {
        el.addEventListener('mouseenter', onEnterWork)
        el.addEventListener('mouseleave', onLeaveWork)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [isTouch])

  // Render nothing on touch devices
  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none', zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '36px', height: '36px', borderRadius: '50%',
          border: '1px solid var(--bone)',
          pointerEvents: 'none', zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform', opacity: 0.7,
        }}
      />

      {/* View label on work cards */}
      <div
        ref={labelRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'var(--accent)',
          display: 'none',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', zIndex: 99997,
          transform: 'translate(-50%, -50%) scale(0.7)',
          opacity: 0,
          fontSize: '0.6rem', fontWeight: 600,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--black)',
          willChange: 'transform',
        }}
      >
        VIEW
      </div>
    </>
  )
}