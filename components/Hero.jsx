'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof gsap === 'undefined') return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(['#hero-tag', '#hero-h1-1', '#hero-h1-2', '#hero-h1-3', '#hero-sub', '#hero-btns', '#hero-stats'], {
        autoAlpha: 0,
      })
      gsap.set(['#hero-h1-1', '#hero-h1-2', '#hero-h1-3'], { y: 40 })

      // Hero entrance timeline
      gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })
        .to('#hero-tag',   { autoAlpha: 1, duration: 0.6 })
        .to('#hero-h1-1',  { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.2')
        .to('#hero-h1-2',  { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.45')
        .to('#hero-h1-3',  { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.45')
        .to('#hero-sub',   { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to('#hero-btns',  { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#hero-stats', { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, '-=0.2')

      // Gold glow parallax on scroll
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to('#hero-glow', {
          y: -80,
          x: 30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
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
      {/* Background Photo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/cafe/Outdoor View Malam.JPG"
          alt="SaeCafeRojel malam hari — suasana premium outdoor"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          quality={85}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(10,10,10,0.92) 55%, rgba(10,10,10,0.6) 100%)',
        }} />
      </div>

      {/* Gold glow decoration */}
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

      {/* Vertical gold line removed */}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
        {/* Tag */}
        <div id="hero-tag" className="section-tag" style={{ marginBottom: '1.5rem' }}>
          Lumajang, Jawa Timur
        </div>

        {/* Headline 3 baris */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}
        >
          <span id="hero-h1-1" style={{ display: 'block', color: 'var(--white)' }}>
            Rasa Premium,
          </span>
          <span
            id="hero-h1-2"
            className="font-display"
            style={{ display: 'block', fontStyle: 'italic', color: 'var(--gold)', whiteSpace: 'nowrap' }}
          >
            Suara Premium.
          </span>
          <span id="hero-h1-3" style={{ display: 'block', color: 'var(--white)' }}>
            Ruang untuk
          </span>
        </h1>

        {/* Sub copy */}
        <p
          id="hero-sub"
          style={{
            fontWeight: 300,
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.9,
            maxWidth: '370px',
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
          <a
            href="#menu"
            className="btn-primary"
            aria-label="Jelajahi menu SaeCafeRojel"
          >
            Jelajahi Menu
          </a>
          <a
            href="#reservasi"
            className="btn-ghost"
            aria-label="Buat reservasi meja"
          >
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
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginTop: '0.4rem',
                }}
              >
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
