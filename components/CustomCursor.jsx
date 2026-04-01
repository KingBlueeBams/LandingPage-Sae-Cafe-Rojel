'use client'
import { useEffect, useRef } from 'react'

/**
 * Custom gold cursor: dot (10px) + trailing ring (38px)
 * Handles hover scaling on interactive elements
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rx = 0, ry = 0, mx = 0, my = 0
    let isHovering = false

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY

      if (typeof gsap !== 'undefined') {
        gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' })
      } else {
        dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`
      }
    }

    const ticker = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (typeof gsap !== 'undefined') {
        gsap.set(ring, { x: rx, y: ry })
      }
    }

    const onEnter = () => {
      isHovering = true
      if (typeof gsap !== 'undefined') {
        gsap.to(dot, { scale: 2, duration: 0.3 })
        gsap.to(ring, { scale: 1.5, opacity: 0.9, duration: 0.3 })
      }
    }

    const onLeave = () => {
      isHovering = false
      if (typeof gsap !== 'undefined') {
        gsap.to(dot, { scale: 1, duration: 0.3 })
        gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 })
      }
    }

    document.addEventListener('mousemove', onMove)

    const interactiveEls = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, .menu-card, .tab-btn'
    )
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    let tickerId
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(ticker)
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      if (typeof gsap !== 'undefined') {
        gsap.ticker.remove(ticker)
      }
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
