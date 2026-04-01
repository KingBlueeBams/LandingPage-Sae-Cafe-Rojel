'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

/* ───────────────────────────────────────────────
   HeadlineLine: splits text into individual letter <span>s
   for the macOS Dock proximity-scaling effect.
   ─────────────────────────────────────────────── */
function HeadlineLine({ text, id, style }) {
  return (
    <span id={id} className="headline-line" style={{ ...style, display: 'block' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="headline-char"
          style={{
            display: 'inline-block',
            transition: 'transform 0.15s ease-out, color 0.25s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof gsap === 'undefined') return

    const ctx = gsap.context(() => {
      /* ── Initial hidden states ── */
      gsap.set('.headline-char', { opacity: 0, y: 20 })
      gsap.set(['#hero-tag', '#hero-sub', '#hero-btns', '#hero-stats'], {
        autoAlpha: 0, y: 20,
      })

      /* ── Entrance Timeline ── */
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: 'power3.out' },
      })

      tl.to('#hero-tag', { autoAlpha: 1, y: 0, duration: 0.6 })
        .to('.headline-char', {
          opacity: 1,
          y: 0,
          stagger: 0.018,
          ease: 'back.out(1.7)',
          duration: 0.6,
        }, '-=0.3')
        .to('#hero-sub', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('#hero-btns', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('#hero-stats', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.2')
        .fromTo('#hero-bg-img',
          { scale: 1.08 },
          { scale: 1, duration: 2.5, ease: 'power2.out' },
          0  // starts at same time as timeline
        )

      /* ── Gold glow parallax ── */
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to('#hero-glow', {
          y: -80, x: 30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    /* ── macOS Dock Effect (desktop only) ── */
    let handleMouseMove = null
    if (window.innerWidth >= 1024) {
      handleMouseMove = (e) => {
        const chars = document.querySelectorAll('.headline-char')
        chars.forEach((char) => {
          const rect = char.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)

          const maxDist = 120
          if (dist < maxDist) {
            const scale = 1 + (1 - dist / maxDist) * 0.35
            gsap.to(char, {
              scale,
              color: 'var(--gold-light)',
              duration: 0.25,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          } else {
            gsap.to(char, {
              scale: 1,
              clearProps: 'color',
              duration: 0.45,
              ease: 'power2.inOut',
              overwrite: 'auto',
            })
          }
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      ctx.revert()
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero — SaeCafeRojel"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 3rem 4rem',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          id="hero-bg-img"
          src="/images/cafe/Outdoor View Malam.JPG"
          alt="SaeCafeRojel malam hari — suasana premium outdoor"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.92) 55%, rgba(10,10,10,0.6) 100%)',
        }} />
      </div>

      {/* Gold glow */}
      <div
        id="hero-glow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%', right: '10%',
          transform: 'translateY(-50%)',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
        {/* Tag */}
        <div id="hero-tag" className="section-tag" style={{ marginBottom: '1.5rem' }}>
          Lumajang, Jawa Timur
        </div>

        {/* Headline with macOS Dock Effect */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}
        >
          <HeadlineLine
            text="Rasa Premium,"
            id="hero-h1-1"
            style={{ color: 'var(--white)' }}
          />
          <HeadlineLine
            text="Suara Premium."
            id="hero-h1-2"
            style={{ fontStyle: 'italic', color: 'var(--gold)', whiteSpace: 'nowrap' }}
          />
          <HeadlineLine
            text="Ruang untuk"
            id="hero-h1-3"
            style={{ color: 'var(--white)' }}
          />
        </h1>

        {/* Sub copy */}
        <p
          id="hero-sub"
          style={{
            fontWeight: 300,
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.9,
            maxWidth: '400px',
            marginBottom: '2rem',
          }}
        >
          Mini-Concert &amp; Lifestyle Hub di jantung Lumajang — tempat kopi
          premium, comfort food berkelas, dan Hi-Fi sound system stadium
          melebur dalam satu ruang yang welcoming.
        </p>

        {/* CTA Buttons */}
        <div
          id="hero-btns"
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
        >
          <a href="#menu" className="btn-primary" aria-label="Jelajahi menu SaeCafeRojel">
            Jelajahi Menu
          </a>
          <a href="#reservasi" className="btn-ghost" aria-label="Buat reservasi meja">
            Reservasi Meja →
          </a>
        </div>

        {/* Stats */}
        <div
          id="hero-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(201,168,76,0.12)',
          }}
        >
          {[
            { num: '4.7', label: 'Rating Google' },
            { num: '118+', label: 'Pilihan Menu' },
            { num: '2024', label: 'Berdiri Sejak' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'left' }}>
              <div
                className="font-display"
                style={{ fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}
              >
                {stat.num}
              </div>
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: '0.4rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <div style={{
          fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>scroll</div>
        <div style={{
          width: '1px', height: '3rem',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
        }} />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section { padding: 7rem 1.5rem 3rem !important; }
          #hero-stats { grid-template-columns: repeat(3, 1fr) !important; gap: 1rem !important; }
        }
      `}</style>
    </section>
  )
}
