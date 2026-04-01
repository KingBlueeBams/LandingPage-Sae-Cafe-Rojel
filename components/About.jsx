'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const USPs = [
  {
    title: 'Mini-Concert & Lifestyle Hub',
    desc: 'Hi-Fi Sound System berkualitas konser — setiap instrumen terdengar nyata, bass empuk, vokal jernih. Bukan sekadar musik latar.',
  },
  {
    title: 'Zona Adaptif Me-Time & We-Time',
    desc: 'Single-seater untuk WFC & nugas tanpa gangguan, sofa oversized untuk keluarga dan quality time lintas generasi.',
  },
  {
    title: 'Live Music 4× Seminggu',
    desc: 'Classic Rock · Jazz · Pop Alternative · Funk — setiap minggu ada vibe berbeda yang menyambut Anda.',
  },
]

const reviews = [
  {
    text: '"Tempatnya cozy banget, soundnya mantap! Bikin betah berjam-jam."',
    author: 'Fadhil R.',
  },
  {
    text: '"Kopi dan makanannya lezat, live musik malam Rabu bikin suasana makin sempurna."',
    author: 'Sari W.',
  },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        '#about-left',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '#about-left', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
      gsap.fromTo(
        '#about-right',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '#about-right', start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      aria-label="Tentang SaeCafeRojel"
      style={{
        background: 'var(--gray-dark)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left column */}
        <div id="about-left">
          <div className="section-tag">Tentang Kami</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, marginBottom: '0.5rem' }}
          >
            Bukan Sekadar{' '}
            <em style={{ color: 'var(--gold)' }}>Kopi Biasa</em>
          </h2>
          <div className="gold-rule" />
          <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.9, marginBottom: '2rem' }}>
            SaeCafeRojel hadir sebagai <strong style={{ color: 'var(--white)' }}>Mini-Concert &amp; Lifestyle Hub</strong> di
            Lumajang — memadukan gastronomi berkelas, ergonomi ruang adaptif, dan tata suara Hi-Fi berkualitas konser
            dalam satu ruang yang bersih, modern, dan welcoming untuk semua kalangan.
          </p>

          {/* USP list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {USPs.map((usp, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0,
                  width: '2px', height: '2.5rem',
                  background: 'var(--gold)',
                  marginTop: '0.2rem',
                }} />
                <div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.3rem' }}>
                    {usp.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7 }}>
                    {usp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div id="about-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Cafe photo */}
          <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3' }}>
            <Image
              src="/images/cafe/view logo indoor.png"
              alt="Interior SaeCafeRojel — suasana cozy premium"
              fill
              style={{ objectFit: 'cover' }}
              quality={80}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.5), transparent)',
            }} />
          </div>

          {/* Review card */}
          <div
            style={{
              background: '#1E1E1E',
              border: '1px solid rgba(201,168,76,0.12)',
              padding: '1.75rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Watermark */}
            <div
              aria-hidden="true"
              className="font-display"
              style={{
                position: 'absolute',
                bottom: '-1rem', right: '-0.5rem',
                fontSize: '6rem',
                color: 'rgba(201,168,76,0.04)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              SCR
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ color: 'var(--gold)', fontSize: '1rem' }}>★★★★★</div>
              <span className="font-display" style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>4.7</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>GOOGLE REVIEWS</span>
            </div>

            {/* Reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {reviews.map((r, i) => (
                <div key={i}>
                  {i > 0 && <div className="divider" style={{ margin: '0 0 1.25rem' }} />}
                  <p style={{ fontSize: '0.82rem', color: 'var(--white)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7, marginBottom: '0.5rem' }}>
                    {r.text}
                  </p>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    — {r.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          section { padding: 4rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
