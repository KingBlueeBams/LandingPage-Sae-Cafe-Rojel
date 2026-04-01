'use client'
import { useEffect, useRef } from 'react'

const SCHEDULE = [
  {
    day: 'Senin',
    genre: 'Classic Rock',
    vibe: 'Nostalgia & Berenergi\nSemangat awal minggu',
    icon: '🎸',
    color: '#E8A87C',
    target: 'Pecinta retro & orang tua',
  },
  {
    day: 'Rabu',
    genre: 'Jazz',
    vibe: 'Elegan · Rileks · Sophisticated\nOasis pertengahan minggu',
    icon: '🎷',
    color: '#87CEEB',
    target: 'Keluarga & mahasiswa nugas malam',
  },
  {
    day: 'Jumat',
    genre: 'Pop Alternative',
    vibe: 'Fresh · Hype · Ekspresif\nLepas penat akhir pekan',
    icon: '🎵',
    color: 'var(--gold)',
    target: 'Gen Z & tongkrongan kampus',
  },
  {
    day: 'Sabtu',
    genre: 'Funk / Full Band',
    vibe: 'Groovy · Energi Maksimal\nPuncak akhir pekan',
    icon: '🎺',
    color: '#B5A1E0',
    target: 'Keluarga besar & grup pertemanan',
  },
]

export default function LiveMusic() {
  const sectionRef = useRef(null)

  const getTodayHighlight = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[new Date().getDay()]
  }

  const today = getTodayHighlight()

  useEffect(() => {
    if (typeof gsap === 'undefined') return

    const ctx = gsap.context(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
      }

      gsap.fromTo(
        '#music-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo(
        '.music-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.music-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="musik"
      ref={sectionRef}
      aria-label="Jadwal Live Music SaeCafeRojel"
      style={{ background: 'var(--gray-dark)', padding: '6rem 3rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div id="music-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Live Music</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '0.75rem' }}
          >
            4× Seminggu,{' '}
            <em style={{ color: 'var(--gold)' }}>Selalu Berkelas</em>
          </h2>
          <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.85rem', maxWidth: '480px', margin: '0 auto' }}>
            Sistem Hi-Fi berkualitas konser — bass empuk di dada, vokal jernih,
            setiap instrumen terdengar seolah artis ada di depan meja Anda.
          </p>
        </div>

        {/* Schedule grid */}
        <div
          className="music-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}
        >
          {SCHEDULE.map((item) => {
            const isToday = item.day === today
            return (
              <div
                key={item.day}
                className="music-card"
                style={{
                  background: isToday ? 'rgba(201,168,76,0.06)' : 'var(--card-bg)',
                  border: `1px solid ${isToday ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.08)'}`,
                  padding: '1.75rem 1.5rem',
                  position: 'relative',
                  transition: 'transform 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = isToday ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.08)'
                }}
              >
                {isToday && (
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: 'var(--gold)',
                    color: 'var(--black)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.5rem',
                    fontWeight: 600,
                  }}>
                    Malam Ini
                  </div>
                )}

                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>

                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginBottom: '0.4rem',
                }}>
                  {item.day}
                </div>

                <h3
                  className="font-display"
                  style={{ fontSize: '1.3rem', color: item.color, marginBottom: '0.75rem', lineHeight: 1.2 }}
                >
                  {item.genre}
                </h3>

                <p style={{
                  fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 300,
                  lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '1rem',
                }}>
                  {item.vibe}
                </p>

                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.6)', borderTop: '1px solid rgba(201,168,76,0.1)',
                  paddingTop: '0.75rem',
                }}>
                  {item.target}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sound system call-out */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem 2.5rem',
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '2.5rem' }}>🔊</div>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.4rem' }}>
              Hi-Fi Sound System
            </div>
            <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.85rem' }}>
              <em style={{ color: 'var(--white)' }}>"Seolah artisnya ada di depan meja Anda"</em>
              {' '}— Ear-Friendly Acoustics · Bass Empuk · Vokal Jernih
            </p>
          </div>
          <a
            href="#reservasi"
            className="btn-primary"
            style={{ marginLeft: 'auto', flexShrink: 0 }}
            aria-label="Reservasi meja untuk malam live music"
          >
            Reservasi Sekarang
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .music-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .music-grid { grid-template-columns: 1fr !important; }
          section { padding: 4rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
